"use client";

import dayjs from "dayjs";
import parse from "html-react-parser";
import { useAtomValue } from "jotai";
import { CalendarDays, ChartColumn, ChevronRight, Cookie, FileText, Settings, Shield, User, Users, UsersRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useFooterActions } from "@/_actions";
import { PrivacyListAtom } from "@/_state";
import { Container } from "@/components/ui";

const ICON = "size-[22px]";

/** Icon + colours for a definition card, picked from the term. */
function definitionBadge(term = "") {
  const t = term.toLowerCase();
  if (t.includes("personal")) return { className: "bg-[#F3E8FF] text-[#9333EA] dark:bg-[rgba(147,51,234,0.2)] dark:text-[#C084FC]", icon: <User className={ICON} /> };
  if (t.includes("usage")) return { className: "bg-[#E0F2FE] text-[#0284C7] dark:bg-[rgba(2,132,199,0.2)] dark:text-[#38BDF8]", icon: <ChartColumn className={ICON} /> };
  if (t.includes("cookie")) return { className: "bg-[#FEF3C7] text-[#D97706] dark:bg-[rgba(217,119,6,0.2)] dark:text-[#FBBF24]", icon: <Cookie className={ICON} /> };
  if (t.includes("controller")) return { className: "bg-[#DCFCE7] text-[#16A34A] dark:bg-[rgba(22,163,74,0.2)] dark:text-[#4ADE80]", icon: <Settings className={ICON} /> };
  if (t.includes("processor") || t.includes("provider"))
    return { className: "bg-[#FCE7F3] text-[#DB2777] dark:bg-[rgba(219,39,119,0.2)] dark:text-[#F472B6]", icon: <UsersRound className={ICON} /> };
  if (t.includes("subject") || t.includes("user")) return { className: "bg-[#EDE9FE] text-[#6366F1] dark:bg-[rgba(99,102,241,0.2)] dark:text-[#818CF8]", icon: <Shield className={ICON} /> };
  return { className: "bg-[#EFF6FF] text-primary dark:bg-[rgba(37,99,235,0.2)] dark:text-white", icon: <FileText className={ICON} /> };
}

/**
 * Splits the CMS HTML on <h3> into intro / definitions / standard sections.
 * Every bit of the original HTML is kept.
 */
function parseHtmlSections(html) {
  if (!html) return [];
  const raw = html.split(/(?=<h3>)/i).filter((s) => s.trim());
  if (raw.length === 0) return [{ type: "raw", content: html }];

  return raw.map((sec, idx) => {
    const heading = sec.match(/<h3>(?:<strong>)?([\s\S]*?)(?:<\/strong>)?<\/h3>/i);
    if (!heading) return { type: "raw", content: sec };

    const headingText = heading[1].replace(/<[^>]+>/g, "").trim();
    let body = sec.slice(heading[0].length).trim();

    if (headingText.toLowerCase().includes("operates the") || idx === 0) {
      // Keep the heading text in the body so nothing is dropped.
      return { type: "intro", title: "Introduction", content: `<p>${heading[1].trim()}</p>${body}` };
    }

    if (headingText.toLowerCase().includes("definition")) {
      const paragraphs = [...body.matchAll(/<p>([\s\S]*?)<\/p>/gi)].map((m) => m[1].trim());
      const pairs = [];
      for (let i = 0; i < paragraphs.length; i += 2) if (paragraphs[i]) pairs.push({ term: paragraphs[i], defText: paragraphs[i + 1] || "" });

      // Show "Data Subject" + "User" as one card.
      const defs = [];
      for (let i = 0; i < pairs.length; i++) {
        const next = pairs[i + 1];
        if (pairs[i].term.toLowerCase().includes("data subject") && next?.term.toLowerCase() === "user") {
          defs.push({ term: "Data Subject / User", defText: `${pairs[i].defText} ${next.defText}` });
          i++;
        } else {
          defs.push(pairs[i]);
        }
      }
      if (defs.length) return { type: "definitions", title: headingText, defs };
    }

    return { type: "standard", title: headingText, content: body };
  });
}

const bodyHtml =
  "text-[0.95rem] leading-[1.75] text-[#334155] dark:text-[#CBD5E1] [&_p]:mb-4 [&_p]:leading-[1.75] [&_p]:text-[#334155] dark:[&_p]:text-[#CBD5E1] [&_a]:font-medium [&_a]:text-primary [&_a]:no-underline hover:[&_a]:text-[#1D4ED8] hover:[&_a]:underline dark:[&_a]:text-white dark:hover:[&_a]:text-[#93C5FD] [&_b]:font-semibold [&_b]:text-[#0F172A] dark:[&_b]:text-white [&_strong]:font-semibold [&_strong]:text-[#0F172A] dark:[&_strong]:text-white [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1.5 [&_li]:leading-[1.6]";

function SectionTitle({ children, accent = "bg-[linear-gradient(90deg,#3B82F6_0%,#8B5CF6_100%)]" }) {
  return (
    <div className="mb-5">
      <h2 className="mb-2 tracking-[-0.01em] text-[#0F172A] dark:text-white">{children}</h2>
      <div className={`h-1 w-12 rounded-sm ${accent}`} />
    </div>
  );
}

function TrustItem({ icon, title, children, className }) {
  return (
    <div className={`flex items-start gap-5 ${className || ""}`}>
      <div className="flex size-12 min-w-12 items-center justify-center rounded-full bg-[#DBEAFE] text-primary dark:bg-[rgba(37,99,235,0.2)] dark:text-white">{icon}</div>
      <div>
        <p className="mb-1 font-semibold text-[#0F172A]! dark:text-white!">{title}</p>
        <p className="leading-[1.55] text-[#475569]! dark:text-[#94A3B8]!">{children}</p>
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  const footerActions = useFooterActions();
  const privacyList = useAtomValue(PrivacyListAtom);

  useEffect(() => {
    footerActions.PrivacyList();
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastUpdated = useMemo(() => {
    const raw = privacyList?.[0]?.updated_at || privacyList?.[0]?.created_at;
    const parsed = raw && dayjs(raw);
    return parsed?.isValid() ? parsed.format("MMMM D, YYYY") : null;
  }, [privacyList]);

  return (
    <div className="mt-16 min-h-screen bg-[#F8FAFC] pb-24 text-[#334155] transition-colors md:mt-20 dark:bg-[#0E1015] dark:text-[#F1F5F9]">
      <Container>
        <nav aria-label="breadcrumb" className="flex items-center justify-start gap-1 py-5 text-sm min-[1025px]:justify-end">
          <Link href="/" className="font-medium text-[#64748B]! no-underline hover:text-[#2563EB]! dark:text-[#94A3B8]! dark:hover:text-[#60A5FA]!">
            Home
          </Link>
          <ChevronRight className="size-[18px] text-[#94A3B8] dark:text-[#64748B]" />
          <span className="font-semibold text-[#0F172A] dark:text-white">Privacy Policy</span>
        </nav>

        {/* Hero */}
        <div className="relative mb-8 overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-[linear-gradient(135deg,#fff4c0_0%,#ffffff_45%,#fff3bb_100%)] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] sm:p-8 md:rounded-[28px] md:p-12 dark:border-white/8 dark:bg-[radial-gradient(ellipse_at_85%_35%,rgba(59,130,246,0.18)_0%,rgba(139,92,246,0.12)_40%,rgba(15,23,42,0.2)_75%),linear-gradient(135deg,#151824_0%,#12141F_50%,#161526_100%)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          <div className="grid grid-cols-1 items-center justify-between gap-8 md:grid-cols-[6.5fr_5.5fr]">
            <div>
              <h1 className="mb-4 font-semibold! tracking-[-0.025em] text-[#0F172A] dark:text-white">
                Privacy <span className="text-[#EAB308]">Policy</span>
              </h1>
              <p className={`max-w-[540px] leading-[1.65] text-[#475569]! dark:text-[#94A3B8]! ${lastUpdated ? "mb-5" : ""}`}>
                Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit The Coin Chain.
              </p>
              {lastUpdated && (
                <div className="inline-flex items-center gap-2 rounded-[20px] border border-[#CBD5E1] bg-white/90 px-4 py-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.03)] backdrop-blur-[8px] dark:border-white/12 dark:bg-[rgba(30,41,59,0.75)]">
                  <CalendarDays className="size-4 text-primary dark:text-white" />
                  <p className="leading-[1.2] font-medium text-[#1E293B]! dark:text-[#E2E8F0]!">Last Updated: {lastUpdated}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/assets/images/Privacy Policy.png"
                alt="The Coin Chain Privacy Protection"
                className="h-auto w-full max-w-[340px] rounded-[20px] object-contain drop-shadow-[0_12px_28px_rgba(37,99,235,0.12)] transition-transform duration-300 [mask-image:radial-gradient(ellipse_92%_92%_at_50%_50%,black_72%,transparent_100%)] hover:scale-[1.02] sm:max-w-[440px] md:max-w-[520px] dark:drop-shadow-[0_12px_28px_rgba(59,130,246,0.25)]"
              />
            </div>
          </div>
        </div>

        {/* Commitment / trust */}
        <div className="mb-10 rounded-[20px] border border-[#E0EAFF] bg-[linear-gradient(135deg,#EEF4FD_0%,#F3F5FC_100%)] p-5 sm:p-6 md:p-7 dark:border-white/8 dark:bg-[linear-gradient(135deg,#151924_0%,#181C29_100%)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <TrustItem icon={<FileText className="size-6" />} title="Our Commitment">
              We are committed to protecting your personal data and being transparent about how we handle your information.
            </TrustItem>
            <TrustItem icon={<Users className="size-6" />} title="Your Trust Matters" className="md:border-l md:border-[#D8E2F0] md:pl-6 dark:md:border-white/8">
              We use your data only to provide and improve our services, and we never sell your personal information.
            </TrustItem>
          </div>
        </div>

        {/* Policy text from the CMS */}
        {privacyList?.map((item, itemIndex) => {
          const sections = parseHtmlSections(item.description);
          return (
            <div key={item.id || itemIndex} className="mb-12">
              {sections.length === 1 && sections[0].type === "raw" ? (
                <div className="mb-10">
                  <SectionTitle>{item.title}</SectionTitle>
                  <div className={bodyHtml}>{parse(item.description || "")}</div>
                </div>
              ) : (
                sections.map((section, i) => {
                  if (section.type === "intro") {
                    return (
                      <div key={i} className="mb-12">
                        <SectionTitle accent="bg-[linear-gradient(90deg,#3772ff_0%,#0435a8_100%)] dark:bg-[linear-gradient(90deg,#b9c7ff_0%,#ffffff_100%)]">{section.title}</SectionTitle>
                        <div className="grid grid-cols-1 items-center justify-between gap-8 md:grid-cols-[8fr_4fr]">
                          <div className={bodyHtml}>{parse(section.content)}</div>
                          <div className="hidden items-center justify-center sm:flex">
                            <img
                              src="/assets/images/pr.png"
                              alt="Policy Document"
                              className="h-auto w-full max-w-[270px] rounded-2xl object-contain mix-blend-multiply drop-shadow-[0_12px_24px_rgba(37,99,235,0.12)] transition-transform duration-300 hover:-translate-y-1 dark:border dark:border-white/8 dark:bg-white/4 dark:p-3 dark:mix-blend-normal dark:drop-shadow-[0_12px_24px_rgba(59,130,246,0.2)]"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (section.type === "definitions") {
                    return (
                      <div key={i} className="mb-12">
                        <SectionTitle>{section.title}</SectionTitle>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                          {section.defs.map((def, d) => {
                            const badge = definitionBadge(def.term);
                            return (
                              <div
                                key={d}
                                className="flex h-full items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] dark:border-white/8 dark:bg-[#161922] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25)] dark:hover:border-[rgba(59,130,246,0.5)] dark:hover:shadow-[0_8px_24px_rgba(59,130,246,0.2)]"
                              >
                                <div className={`flex size-11 min-w-11 items-center justify-center rounded-full ${badge.className}`}>{badge.icon}</div>
                                <div className="flex-1">
                                  <p className="mb-1.5 font-bold text-[#0F172A]! dark:text-white!">{parse(def.term)}</p>
                                  <p className="leading-[1.6] text-[#475569]! dark:text-[#94A3B8]!">{parse(def.defText)}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className="mb-12">
                      <SectionTitle>{section.title}</SectionTitle>
                      <div className={bodyHtml}>{parse(section.content || "")}</div>
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </Container>
    </div>
  );
}
