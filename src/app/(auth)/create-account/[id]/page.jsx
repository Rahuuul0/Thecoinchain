import CreateAccount from "@/views/CreateAccount";

export const metadata = {
  title: "Create Account",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CreateAccount />;
}
