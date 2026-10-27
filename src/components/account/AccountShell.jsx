"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { cn, Container, Select } from "@/components/ui";

const ICONS = "/assets/images/icons";

const NAV = [
  [
    { href: "/account/profile", label: "Profile", light: "user-light.svg", dark: "user.svg", match: ["/account", "/account/profile"] },
    { href: "/account/referrals", label: "Referrals", light: "share-light.svg", dark: "share-dark.svg" },
    { href: "/account/forecast-subscription", label: "Subscriptions", light: "subs-ic.svg", dark: "subs-ic-dark.svg", tight: true },
  ],
  [
    { href: "/account/session-and-history", label: "Sessions & login history", light: "session-light.svg", dark: "session-dark.svg" },
    { href: "/account/2fa-enable", label: "2FA", light: "fa-light.svg", dark: "fa-dark.svg" },
    { href: "/account/change-account-password", label: "Change password", light: "lock-light.svg", dark: "lock-dark.svg" },
  ],
];

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (item) => (item.match || [item.href]).includes(pathname);
  const items = NAV.flat();

  return (
    <div className="max-md:pt-4">
      <div className="flex flex-col gap-4 max-md:hidden">
        {NAV.map((group, g) => (
          <div key={g} className={g === 0 ? "border-b border-line pb-4" : "pt-4"}>
            {group.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 font-display text-sm font-bold no-underline",
                    item.tight ? "pb-4" : "pb-8",
                    active ? "text-fg!" : "text-n4!"
                  )}
                >
                  <img src={`${ICONS}/${active ? item.dark : item.light}`} alt="" className={cn("size-6 max-h-6 max-w-6", active && "dark:invert")} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <Select
        className="hidden max-md:block"
        value={items.find(isActive)?.href ?? ""}
        onChange={(href) => router.push(href)}
        options={items.map((item) => ({
          value: item.href,
          label: item.label,
          icon: <img src={`${ICONS}/${item.dark}`} alt="" className="size-5 dark:invert" />,
        }))}
      />
    </div>
  );
}

/** Account area: page title + breadcrumbs, then sidebar nav beside a content card. */
export default function AccountShell({ title, crumb, children, contentClassName }) {
  return (
    <div className="mt-16 bg-page">
      <Container>
        <PageHeader title={title} crumbs={[{ label: "Home", href: "/" }, { label: crumb ?? title }]} />
      </Container>
      <div className="border-t border-line bg-n7 pt-20 pb-[136px] max-[1025px]:pb-8 max-md:bg-page max-md:pt-0 max-md:pb-[34px] dark:bg-n1">
        <Container>
          <div className="grid grid-cols-[220px_1fr] gap-[200px] max-[1025px]:gap-8 max-md:grid-cols-1">
            <Sidebar />
            <div className={cn("rounded-2xl bg-n8 p-10 shadow-[0_64px_64px_-48px_rgba(15,15,15,0.1)] max-[992px]:px-6 max-md:p-4 dark:bg-ink", contentClassName)}>
              {children}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

/** Section heading inside the account card. */
export function AccountCardHead({ children, aside }) {
  return (
    <div className="flex flex-col items-start justify-between gap-5 pb-6 max-md:py-8">
      <h5 className="flex items-center gap-2.5 text-2xl! font-semibold text-fg">{children}</h5>
      {aside}
    </div>
  );
}
