import ResetPassword from "@/views/ResetPassword";

export const metadata = {
  title: "Reset Password",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ResetPassword />;
}
