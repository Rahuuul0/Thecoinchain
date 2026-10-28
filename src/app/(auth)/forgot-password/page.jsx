import ForgotPassword from "@/views/ForgotPassword";

export const metadata = {
  title: "Forgot Password",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ForgotPassword />;
}
