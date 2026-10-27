import AuthGuard from "@/components/AuthGuard";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
