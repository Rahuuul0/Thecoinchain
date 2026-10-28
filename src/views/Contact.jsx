"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import parse from "html-react-parser";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FileText, Mail, MapPin, MessageCircle, Send, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import * as Yup from "yup";
import { useContactActions, useTutorialActions } from "@/_actions";
import { useAlertActions } from "@/_actions/alert.actions";
import { RoutesName } from "@/_common/app.constants";
import { blogimgAtom, blogListAtom, contact_AddAtom, contactBlogListAtom, switchDarkModeAtom } from "@/_state";
import CryptoTickerMarquee from "@/components/CryptoTickerMarquee";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/ui/BrandIcons";
import { cn, Container, Spinner } from "@/components/ui";
import { IMAGE_URL } from "@/lib/content";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email Address is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid"
    )
    .trim(),
  subject: Yup.string().trim().required("Subject is required"),
  msg: Yup.string().trim().required("Message is required").max(1000, "Message cannot exceed 1000 characters"),
});

const squash = (value) => value.replace(/\s+/g, value.length > 1 ? " " : "");

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_reCAPTCHA_SITE_KEY;

const SOCIALS = [
  { title: "X (Twitter)", href: "https://x.com/thecoinchain01", className: "bg-black dark:border dark:border-[#334155]", icon: <XIcon className="size-3.5 text-white" /> },
  { title: "Facebook", href: "https://www.facebook.com/thecoinchain", className: "bg-[#1877F2]", icon: <FacebookIcon className="size-[15px] text-white" /> },
  { title: "Instagram", href: "https://www.instagram.com/thecoinchain01/", className: "bg-[linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)]", icon: <InstagramIcon className="size-[15px] text-white" /> },
  {
    title: "YouTube",
    href: "https://www.youtube.com/",
    className: "bg-[#FF0000]",
    icon: (
      <svg viewBox="0 0 24 24" className="size-[15px] fill-white" aria-hidden="true">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
      </svg>
    ),
  },
  { title: "LinkedIn", href: "https://www.linkedin.com/", className: "bg-[#0A66C2]", icon: <LinkedInIcon className="size-3.5 text-white" /> },
];

function InfoCard({ className, iconClassName, icon, label, children, note }) {
  return (
    <div className={cn("flex items-center gap-[18px] rounded-2xl border px-5 py-4 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5", className)}>
      <div className={cn("flex size-[46px] shrink-0 items-center justify-center rounded-full", iconClassName)}>{icon}</div>
      <div>
        <p className="mb-0.5 leading-[1.2] font-medium text-[#64748B]! dark:text-[#94A3B8]!">{label}</p>
        {children}
        {note && <p className="mt-0.5 leading-[1.2] text-[#94A3B8]! dark:text-[#64748B]!">{note}</p>}
      </div>
    </div>
  );
}

function FormField({ id, label, icon, error, multiline, ...props }) {
  const Field = multiline ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-[#1E293B] dark:text-[#E2E8F0]">
        {label} <span className="text-[#EF4444]">*</span>
      </label>
      <div
        className={cn(
          "flex gap-2 rounded-xl border-[1.5px] bg-white px-3.5 transition-colors dark:bg-[#13151D]",
          multiline ? "items-start py-3" : "h-12 items-center",
          error
            ? "border-[#EF4444]"
            : "border-[#E2E8F0] focus-within:border-[#4F46E5] hover:border-[#CBD5E1] dark:border-[#2E3344] dark:focus-within:border-[#818CF8] dark:hover:border-[#475569]"
        )}
      >
        <span className={cn("shrink-0 text-[#94A3B8] dark:text-[#64748B]", multiline && "mt-0.5")}>{icon}</span>
        <Field
          id={id}
          rows={multiline ? 4 : undefined}
          className="min-w-0 flex-1 resize-y bg-transparent text-sm leading-[1.5] text-[#0F172A] outline-none placeholder:text-[#94A3B8] dark:text-white dark:placeholder:text-[#64748B]"
          {...props}
        />
      </div>
    </div>
  );
}

const FieldMessage = ({ children }) => (children ? <span className="mt-1 block text-xs text-[#EF4444]">{children}</span> : null);

export default function Contact() {
  const router = useRouter();
  const contactActions = useContactActions();
  const tutorialActions = useTutorialActions();
  const alertActions = useAlertActions();
  const [contactError, setContactError] = useAtom(contact_AddAtom);
  const contactBlogs = useAtomValue(contactBlogListAtom);
  const isDarkMode = useAtomValue(switchDarkModeAtom);
  const setBlogImg = useSetAtom(blogListAtom);
  const setBlogNew = useSetAtom(blogimgAtom);
  const captchaRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState, reset, setValue, watch } = useForm({ resolver: yupResolver(validationSchema) });
  const { errors } = formState;
  const messageLength = (watch("msg") || "").length;

  useEffect(() => {
    if (contactError) setIsSubmitting(false);
  }, [contactError]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    tutorialActions.categoryList();
    contactActions.contactBlogList();
    contactActions.contactList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    const token = captchaRef.current?.getValue();
    if (!token) {
      alertActions.error("reCAPTCHA is mandatory");
      return;
    }
    captchaRef.current.reset();
    setIsSubmitting(true);
    setContactError(false);
    try {
      await contactActions.add({ ...data, category: "general", question: data.subject || "General Inquiry" });
      reset({ email: "", subject: "", msg: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openBlog = (item) => {
    setBlogImg(item);
    setBlogNew(true);
    router.push(`${RoutesName.Contact_Detail}/contact/${item.slug}`);
  };

  const field = (name) => ({ ...register(name), onChange: (e) => setValue(name, squash(e.target.value)) });

  return (
    <div className="min-h-screen bg-[#FAFCFF] pb-12 transition-colors md:pb-20 dark:bg-[#0E1015]">
      <div className="relative z-[1] mt-14 sm:mt-16">
        <CryptoTickerMarquee />
      </div>

      {/* Hero + form */}
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_95%_8%,rgba(224,231,255,0.55)_0%,rgba(243,232,255,0.35)_30%,transparent_60%),radial-gradient(circle_at_5%_45%,rgba(219,234,254,0.45)_0%,rgba(254,243,199,0.25)_30%,transparent_60%)] pt-8 pb-12 transition-[background] sm:pt-12 md:pt-16 dark:bg-[radial-gradient(circle_at_95%_8%,rgba(79,70,229,0.20)_0%,rgba(147,51,234,0.12)_35%,transparent_60%),radial-gradient(circle_at_5%_45%,rgba(37,99,235,0.16)_0%,transparent_50%),#0E1015]">
        <div className="pointer-events-none absolute top-10 right-5 hidden h-[180px] w-[140px] bg-[radial-gradient(#93C5FD_1.5px,transparent_1.5px)] bg-size-[16px_16px] opacity-35 lg:block dark:bg-[radial-gradient(#6366F1_1.5px,transparent_1.5px)] dark:opacity-20" />

        <Container className="relative z-[2]">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="md:max-w-[520px]">
              <div className="mb-3 flex items-center gap-3">
                <p className="font-bold tracking-[1.5px] text-primary! uppercase">CONTACT US</p>
                <span className="h-0.5 w-7 rounded-sm bg-[linear-gradient(90deg,#3772ff,rgba(79,70,229,0.1))] dark:bg-[linear-gradient(90deg,#6b78ee,rgba(129,140,248,0.1))]" />
              </div>

              <h1 className="mb-5 text-[32px]! leading-[1.15] font-extrabold tracking-[-0.025em] text-[#0F172A] sm:text-[42px]! md:text-[48px]! dark:text-white">
                Get in Touch <br />
                with <span className="text-[#EAB308]">The Coin</span> Chain
              </h1>

              <p className="mb-8 leading-[1.65] text-[#64748B]! dark:text-[#94A3B8]!">
                Have a question, partnership idea, or feedback? We’d love to hear from you. Our team will get back to you as soon as possible.
              </p>

              <div className="mb-8 flex flex-col gap-[18px]">
                <InfoCard
                  className="border-[#E2ECFE] bg-[#F3F7FF] hover:shadow-[0_8px_20px_-6px_rgba(59,130,246,0.15)] dark:border-[#252D40] dark:bg-[#171B26] dark:hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)]"
                  iconClassName="bg-[#DBEAFE] dark:bg-[rgba(37,99,235,0.2)]"
                  icon={<Mail className="size-6 text-[#2563EB] dark:text-[#60A5FA]" />}
                  label="Email Us"
                  note="We usually respond within 24 hours."
                >
                  <a href="mailto:contact@thecoinchain.com" className="block text-[15px] leading-[1.3] font-bold text-[#0F172A]! no-underline hover:text-[#60A5FA]! dark:text-white!">
                    contact@thecoinchain.com
                  </a>
                </InfoCard>

                <InfoCard
                  className="border-[#DCFCE7] bg-[#F0FDF4] hover:shadow-[0_8px_20px_-6px_rgba(34,197,94,0.15)] dark:border-[#1E382C] dark:bg-[#13211B] dark:hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)]"
                  iconClassName="bg-[#DCFCE7] dark:bg-[rgba(22,163,74,0.2)]"
                  icon={<MapPin className="size-6 text-[#16A34A] dark:text-[#4ADE80]" />}
                  label="Our Address"
                  note="Headquarters"
                >
                  <p className="leading-[1.3] font-bold text-[#0F172A]! dark:text-white!">Dubai Digital Park - Nadd Hessa - Dubai Silicon Oasis - Dubai - United Arab Emirates</p>
                </InfoCard>

                <InfoCard
                  className="border-[#F3E8FF] bg-[#FAF5FF] hover:shadow-[0_8px_20px_-6px_rgba(168,85,247,0.15)] dark:border-[#332646] dark:bg-[#1E1929] dark:hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)]"
                  iconClassName="bg-[#F3E8FF] dark:bg-[rgba(147,51,234,0.2)]"
                  icon={<Share2 className="size-[22px] text-[#9333EA] dark:text-[#C084FC]" />}
                  label="Follow Us"
                >
                  <div className="mt-1.5 flex items-center gap-2.5">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.title}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.title}
                        className={cn("flex size-8 items-center justify-center rounded-full transition-transform hover:scale-[1.12]", s.className)}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </InfoCard>
              </div>

              <div className="flex justify-center pt-2 md:justify-start">
                <img
                  src="/assets/images/Contact us fotter image.png"
                  alt="The Coin Chain Crypto Graphic"
                  className="h-auto w-full max-w-[280px] object-contain drop-shadow-[0_15px_25px_rgba(234,179,8,0.12)] sm:max-w-[420px] md:max-w-[560px] dark:brightness-95 dark:drop-shadow-[0_15px_25px_rgba(234,179,8,0.2)]"
                />
              </div>
            </div>

            {/* Form card */}
            <div className="relative rounded-[22px] border border-[#EEF2F6] bg-white px-5 py-[26px] shadow-[0_20px_45px_-15px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.02)] transition-colors sm:rounded-[28px] sm:px-8 sm:py-9 md:px-[38px] md:py-10 dark:border-[#282C3A] dark:bg-[#181A22] dark:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)]">
              <div className="mb-7 flex items-center gap-4">
                <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] dark:bg-[rgba(79,70,229,0.25)]">
                  <Send className="mt-[-2px] ml-[2px] size-6 -rotate-[25deg] text-primary dark:text-white" />
                </div>
                <div>
                  <h3 className="text-[25px]! leading-[1.25] font-bold text-[#0F172A] sm:text-[28px]! dark:text-white">Send us a Message</h3>
                  <p className="mt-0.5 leading-[1.4] text-[#64748B]! dark:text-[#94A3B8]!">Fill out the form below and we’ll get back to you soon.</p>
                </div>
              </div>

              <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div>
                  <FormField id="email" label="Email Address" type="email" placeholder="yourname@example.com" autoComplete="off" icon={<Mail className="size-5" />} error={errors.email} {...field("email")} />
                  <FieldMessage>{errors.email?.message}</FieldMessage>
                </div>
                <div>
                  <FormField id="subject" label="Subject" placeholder="Subject" autoComplete="off" icon={<FileText className="size-5" />} error={errors.subject} {...field("subject")} />
                  <FieldMessage>{errors.subject?.message}</FieldMessage>
                </div>
                <div>
                  <FormField id="message" label="Message" multiline placeholder="Write your message here..." icon={<MessageCircle className="size-[18px]" />} error={errors.msg} {...field("msg")} />
                  <div className="mt-1 flex items-center justify-between">
                    <FieldMessage>{errors.msg?.message}</FieldMessage>
                    <span className="ml-auto text-xs text-[#94A3B8] dark:text-[#64748B]">{messageLength}/1000</span>
                  </div>
                </div>

                {RECAPTCHA_SITE_KEY && (
                  <div className="mb-1 flex justify-start">
                    <ReCAPTCHA key={isDarkMode ? "dark" : "light"} theme={isDarkMode ? "dark" : "light"} ref={captchaRef} sitekey={RECAPTCHA_SITE_KEY} />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(135deg,#566cff_0%,#5662ff_100%)] text-base font-semibold text-white shadow-[0_10px_22px_-5px_rgba(79,70,229,0.45)] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_14px_28px_-5px_rgba(79,70,229,0.55)] disabled:bg-[#94A3B8] disabled:bg-none dark:shadow-[0_10px_22px_-5px_rgba(99,102,241,0.4)]"
                >
                  {isSubmitting ? (
                    <Spinner size={24} className="text-white" />
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-1 size-[18px] -rotate-[20deg]" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>

      {/* Learn crypto center slider */}
      {contactBlogs?.length > 0 && (
        <div className="swiper-arrows-center pt-10">
          <Container maxWidth="xs">
            <p className="pb-8 text-center text-[#64748B]! dark:text-[#94A3B8]!">Before asking for an answer, you may find it in our learn crypto center</p>
          </Container>
          <Swiper
            slidesPerView={1}
            navigation
            spaceBetween={0}
            breakpoints={{ 480: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1080: { slidesPerView: 4 } }}
            modules={[Navigation]}
          >
            {contactBlogs.map((item, idx) => (
              <SwiperSlide key={item.id || idx}>
                <div onClick={() => openBlog(item)} className="relative cursor-pointer overflow-hidden rounded-2xl border border-n6 bg-white dark:border-[#282C3A] dark:bg-[#181A22]">
                  <span className="absolute top-[15px] right-[15px] flex h-5 w-full max-w-[60px] items-center justify-center rounded-[5px] bg-danger text-sm leading-[1.8] font-semibold text-white uppercase">
                    New
                  </span>
                  <img className="h-[170px] w-full max-w-[99%] bg-n7 object-fill" src={`${IMAGE_URL}/${item.image}`} alt={item.title} />
                  <div className="p-5 pt-8">
                    <p className="max-h-[30px] overflow-hidden pb-4 font-medium text-n1! dark:text-white!">{item.title}</p>
                    <div className="max-h-[85px] overflow-hidden text-sm text-n4 dark:text-[#94A3B8]">{parse(item.description || "")}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
