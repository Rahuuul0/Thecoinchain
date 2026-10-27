import ForgotPasswordPhone from "@/views/ForgotPasswordPhone";

export const metadata = {
  title: "Password Recovery",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ForgotPasswordPhone />;
}
