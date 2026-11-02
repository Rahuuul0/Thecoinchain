"use client";

import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FirstToKnow() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_REGEX.test(value)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "", message: "" });

      // TODO: yahan apni subscribe API call lagao, e.g.
      // await subscribeActions.subscribe({ email: value });

      setStatus({ type: "success", message: "Thanks for subscribing!" });
      setEmail("");
    } catch (err) {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white pb-[35px] transition-colors sm:pb-[40px] lg:pb-[50px] dark:bg-[#141416]">
      <div className="mx-auto container px-3 md:px-0">
        <div
          className="relative overflow-hidden rounded-2xl bg-[url('/assets/images/coinchain-img/Be-the-first-to.png')] bg-cover bg-center bg-no-repeat px-4 py-12 text-center sm:px-8 sm:py-14 lg:py-[80px]"
        >
          <h2 className="m-0 font-[Manrope] text-[24px] font-extrabold leading-tight text-[#111318] md:text-[28px] lg:text-[32px]">
            Be the first to know
          </h2>
          <p className="text-center mb-0 mt-3 font-[Inter] font-normal leading-normal text-[#667085] text-[16px]">
            Subscribe for the latest crypto news and insights
          </p>

          {/* ---------- Form ---------- */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-[36px] flex w-full max-w-[480px] items-center gap-2 rounded-full border border-[#D0D5DD] bg-white p-1.5 shadow-[0px_2px_10px_0px_#0000001A] focus-within:border-[#C9A13B]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-10 min-w-0 flex-1 rounded-full border-0 bg-transparent px-4 font-[Inter] text-[14px] font-normal text-[#111318] outline-none placeholder:text-[#667085] sm:text-[14px] md:text-[16px]"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 cursor-pointer rounded-full bg-[linear-gradient(270deg,#D7AE42_0%,#F0D667_33%,#F0D667_65.7%,#D7AE42_100%)] px-5 py-[12px]
              font-[Manrope] text-[14px] font-semibold text-[#111318] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:px-[36px] sm:text-[16px] border border-transparent hover:border-[#010101]"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>

          {status.message && (
            <p
              role="status"
              className={`mb-0 mt-3 font-[Inter] text-[14px] font-medium ${
                status.type === "success" ? "text-[#16A66A]" : "text-[#E5484D]"
              }`}
            >
              {status.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default FirstToKnow;