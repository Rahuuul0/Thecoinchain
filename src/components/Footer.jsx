"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAtomValue } from "jotai";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useFooterActions } from "@/_actions";
import { useAlertActions } from "@/_actions/alert.actions";
import { RoutesName } from "@/_common/app.constants";
import { loaderAtom } from "@/_state";
import { Container, Tooltip } from "@/components/ui";
import SiteLogo from "./SiteLogo";

const EMAIL = "contact@thecoinchain.com";
const ADDRESS = "Dubai Digital Park - Nadd Hessa - Dubai Silicon Oasis - Dubai - United Arab Emirates";

const LINK_COLUMNS = [
  {
    title: "News",
    links: [
      ["Latest News", RoutesName.Latest_News],
      ["Bitcoin", RoutesName.Bitcoin],
      ["Ethereum", RoutesName.Ethereum],
      ["Altcoin", RoutesName.Altcoin],
      ["Global News", RoutesName.Global_News],
    ],
  },
  {
    title: "Analysis",
    links: [
      ["Price Analysis", RoutesName.Price_Prediction],
      ["Stock Price Analysis", RoutesName.Crypto_Stock_Price_Prediction],
      ["Bitcoin Analysis", RoutesName.Bitcoin_Analysis],
      ["Ethereum Analysis", RoutesName.Ethereum_Analysis],
      ["Memecoin Analysis", RoutesName.Memecoin_Analysis],
    ],
  },
  {
    title: "Information",
    links: [
      ["Explain", RoutesName.Explain],
      ["Finance", RoutesName.Finance],
      ["Press Release", RoutesName.Press_Release],
    ],
  },
  {
    title: "Contact",
    links: [
      ["Contact Us", RoutesName.Contact_Us],
      ["Privacy Policy", RoutesName.Privacy_Policy],
      ["Terms of Use", RoutesName.Terms_of_Use],
      ["Disclaimers", RoutesName.Disclaimer],
    ],
  },
];

const SOCIAL = [
  { title: "facebook", href: "https://www.facebook.com/thecoinchain", icon: "facebook.svg" },
  { title: "X", href: "https://x.com/thecoinchain01", icon: "x.svg" },
  { title: "instagram", href: "https://www.instagram.com/thecoinchain01/", icon: "instagram.svg" },
  { title: "behance", href: "https://www.behance.net", icon: "behance.svg" },
];

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email Address is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid"
    )
    .email("Email must be a valid email")
    .trim(),
});

const columnHeading = "pb-6 font-display text-base! font-bold uppercase";
const column = "border-line px-3 py-6 sm:px-4 md:border-r md:px-3 md:py-16 lg:px-4 max-md:border-b";

function ContactLink({ href, external, icon, label, copyText, copyType, copiedType, onCopy, children }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-start gap-2.5 font-display text-muted! no-underline transition-colors hover:text-primary!"
    >
      <Tooltip title={copiedType === copyType ? "Copied!" : `Click to copy ${copyType}`}>
        <span
          role="button"
          aria-label={`Copy ${copyType}`}
          onClick={(e) => onCopy(e, copyText, copyType)}
          className="flex size-7 min-w-7 items-center justify-center rounded-full border border-line bg-n7 transition-all duration-200 hover:scale-110 group-hover:-translate-y-px group-hover:border-primary group-hover:bg-primary/8 dark:border-white/10 dark:bg-white/5 dark:group-hover:bg-primary/15"
        >
          <img
            src={`/assets/images/icons/${icon}`}
            alt={label}
            className="block size-3.5 transition-all group-hover:[filter:brightness(0)_saturate(100%)_invert(35%)_sepia(85%)_saturate(2250%)_hue-rotate(213deg)_brightness(101%)_contrast(101%)]"
          />
        </span>
      </Tooltip>
      {children}
    </a>
  );
}

export default function Footer() {
  const footerActions = useFooterActions();
  const alertActions = useAlertActions();
  const pathname = usePathname();
  const loader = useAtomValue(loaderAtom);
  const [copiedType, setCopiedType] = useState(null);

  const { register, handleSubmit, formState, reset, setValue } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors } = formState;

  useEffect(() => {
    reset({ email: "" });
  }, [pathname, reset]);

  const onSubmit = (data) => {
    setTimeout(() => reset({ email: "" }), 2000);
    return footerActions.add(data);
  };

  const handleCopy = (e, text, type) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    alertActions.success(type === "email" ? "Email address copied to clipboard!" : "Address copied to clipboard!");
    setTimeout(() => setCopiedType(null), 2000);
  };

  const emailField = register("email");

  return (
    <footer className="border-t border-line bg-page">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-[2.3fr_1.6fr_2.1fr_1.6fr_1.9fr_2.5fr] lg:grid-cols-[2.1fr_1.6fr_2.1fr_1.6fr_1.9fr_2.7fr]">
          <div className="col-span-2 pt-8 pb-6 sm:col-span-4 sm:pt-16 md:col-span-1 md:pr-2 md:pb-16">
            <SiteLogo className="h-auto w-[250px] md:w-auto" />
            <div className="mt-5 flex flex-col gap-3">
              <ContactLink href={`mailto:${EMAIL}`} icon="mail.svg" label="Email" copyText={EMAIL} copyType="email" copiedType={copiedType} onCopy={handleCopy}>
                <span className="text-base font-medium break-all">{EMAIL}</span>
              </ContactLink>
              <ContactLink
                href="https://www.google.com/maps"
                external
                icon="location.svg"
                label="Location"
                copyText={ADDRESS}
                copyType="address"
                copiedType={copiedType}
                onCopy={handleCopy}
              >
                <span className="text-base leading-[1.3] font-medium">{ADDRESS}</span>
              </ContactLink>
            </div>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.title} className={column}>
              <h6 className={columnHeading}>{col.title}</h6>
              <ul className="flex flex-col gap-4">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="font-display font-bold text-muted! no-underline hover:text-primary! lg:whitespace-nowrap">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 px-3 py-6 sm:col-span-4 sm:px-4 md:col-span-1 md:px-4 md:py-16 lg:pl-6">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <h6 className={`${columnHeading} pb-8`}>Be the first to know</h6>
              <p className="text-sm!">Crypto currency forecast and analysis straight to your inbox! No b.s.!</p>
              <div className="mt-4 mb-2 flex items-center rounded-[40px] border-2 border-line py-[7px] pr-[5px] pl-4 focus-within:border-primary">
                <input
                  type="email"
                  id="footer-email"
                  placeholder="Enter your email here"
                  autoComplete="off"
                  required
                  className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-n4"
                  {...emailField}
                  onChange={(e) => setValue("email", e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : ""))}
                />
                <button
                  type="submit"
                  disabled={loader}
                  aria-label="Subscribe"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-n8 disabled:opacity-60"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
              {errors.email?.message && <div className="text-sm text-red-600">{errors.email.message}</div>}
            </form>
          </div>
        </div>
      </Container>

      <div className="my-6 border-b border-line sm:my-0" />

      <Container>
        <div className="flex flex-col pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="py-6 text-xs! text-[#6c757d]!">
            Copyright © {new Date().getFullYear()} | <b>thecoinchain</b> All rights reserved
          </p>
          <div className="flex gap-4 sm:py-6">
            {SOCIAL.map((s) => (
              <a key={s.title} title={s.title} href={s.href} target="_blank" rel="noopener noreferrer">
                <img src={`/assets/images/icons/${s.icon}`} alt={s.title} className="size-6" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
