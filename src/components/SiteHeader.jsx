"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useAtomValue } from "jotai";
import {
  Bell,
  BookOpen,
  ChartColumn,
  ChevronDown,
  Circle,
  CircleDollarSign,
  Coins,
  Bitcoin,
  Contact,
  FileText,
  Gavel,
  Globe,
  Info,
  Landmark,
  Megaphone,
  Menu as MenuIcon,
  Moon,
  Newspaper,
  NotebookPen,
  Search,
  ShieldCheck,
  Smile,
  Sun,
  TrendingUp,
  TriangleAlert,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { notificationActions } from "@/_actions/notification.actions";
import { useUserActions } from "@/_actions/user.actions";
import { RoutesName } from "@/_common/app.constants";
import { useDarkMode } from "@/_helpers/useDarkMode";
import { authAtom, notificationAtom, notificationCountAtom } from "@/_state";
import { Accordion, Badge, Button, cn, Drawer, Dropdown, DropdownItem, IconButton, Tooltip } from "@/components/ui";
import SiteLogo, { useSiteLogo } from "./SiteLogo";
import { useRouter } from "next/navigation";
const icon = (Icon) => <Icon className="size-[18px] shrink-0 text-n4" />;

// Navigation for visitors.
const PUBLIC_NAV = {
  home: { label: "Crypto", href: RoutesName.User_Dashboard },
  groups: [
    {
      label: "News",
      items: [
        { label: "Latest News", href: RoutesName.Latest_News, icon: Newspaper },
        { label: "Bitcoin", href: RoutesName.Bitcoin, icon: Bitcoin },
        { label: "Ethereum", href: RoutesName.Ethereum, icon: CircleDollarSign },
        { label: "Altcoin", href: RoutesName.Altcoin, icon: Coins },
        { label: "Global News", href: RoutesName.Global_News, icon: Globe },
      ],
    },
    {
      label: "Analysis",
      items: [
        { label: "Price Analysis", href: RoutesName.Price_Prediction, icon: ChartColumn },
        { label: "Stock Price Analysis", href: RoutesName.Crypto_Stock_Price_Prediction, icon: TrendingUp },
        { label: "Bitcoin Analysis", href: RoutesName.Bitcoin_Analysis, icon: Bitcoin },
        { label: "Ethereum Analysis", href: RoutesName.Ethereum_Analysis, icon: CircleDollarSign },
        { label: "Memecoin Analysis", href: RoutesName.Memecoin_Analysis, icon: Smile },
      ],
    },
    {
      label: "Information",
      items: [
        { label: "Explain", href: RoutesName.Explain, icon: BookOpen },
        { label: "Finance", href: RoutesName.Finance, icon: Landmark },
        { label: "Press Release", href: RoutesName.Press_Release, icon: Megaphone },
      ],
    },
  ],
  // Screenshot shows a chevron on these two. Currently plain links: move them into
  // `groups` (with items) if they should open a dropdown.
  links: [
    { label: "Learn Crypto", href: RoutesName.Learn_Cypto, chevron: true },
    { label: "Markets", href: RoutesName.Prediction_Dashboard, chevron: true },
  ],
  // Desktop: single "contact" link (no chevron, like the design).
  // Mobile: still shows the full Contact accordion below.
  // contact: { label: "contact", href: RoutesName.Contact_Us },
  trailingGroups: [
    {
      label: "Contact",
      items: [
        { label: "Contact Us", href: RoutesName.Contact_Us, icon: Contact },
        { label: "Privacy Policy", href: RoutesName.Privacy_Policy, icon: ShieldCheck },
        { label: "Terms of Use", href: RoutesName.Terms_of_Use, icon: Gavel },
        { label: "Disclaimers", href: RoutesName.Disclaimer, icon: TriangleAlert },
      ],
    },
  ],
};

// Navigation for signed-in users.
const MEMBER_NAV = {
  home: { label: "Crypto", href: RoutesName.Learn_Cypto },
  groups: [
    {
      label: "News",
      items: [{ label: "Latest News", href: RoutesName.Latest_News, icon: Newspaper }],
    },
    {
      label: "Information",
      items: [
        { label: "Information", href: RoutesName.Information, icon: Info },
        { label: "Research Report", href: RoutesName.Research_Report, icon: FileText },
        { label: "Press Release", href: RoutesName.Press_Release, icon: Megaphone },
        { label: "Guest Post", href: RoutesName.Guest_Post, icon: NotebookPen },
        { label: "Sponsored", href: RoutesName.Sponsored, icon: CircleDollarSign },
        { label: "Crypto Regulation", href: RoutesName.Crypto_Regulation, icon: Gavel },
      ],
    },
    {
      label: "Analysis",
      items: [
        { label: "Price Analysis", href: RoutesName.Price_Analysis, icon: ChartColumn },
        { label: "Crypto Stock Price Prediction", href: RoutesName.Crypto_Stock_Price_Prediction, icon: TrendingUp },
      ],
    },
  ],
  links: [
    { label: "Community", href: RoutesName.Community },
    { label: "Prediction", href: RoutesName.Prediction_Dashboard },
    { label: "Market", href: RoutesName.Market },
  ],
  contact: null,
  trailingGroups: [],
};

const ACCOUNT_LINKS = [
  { label: "Profile", hint: "Important account details", href: "/account/profile", img: "/assets/images/icons/user.svg" },
  { label: "Referrals", hint: "Invite your friends and earn rewards", href: "/account/referrals" },
  { label: "2FA security", hint: "Setup 2FA for more security", href: "/account/2fa-enable" },
  { label: "Settings", hint: "View additional settings", href: "/account/profile" },
];

// Font color #353942, medium weight, no uppercase/capitalize (matches the design).
const navButton =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 font-nav font-medium leading-none text-[#353942] no-underline transition-colors hover:text-primary xl:px-3.5 xl:text-[14px] dark:text-white dark:hover:text-primary focus:outline-none";

function NavDropdown({ group }) {
  return (
    <Dropdown
      anchor="bottom start"
      buttonClassName={cn(navButton, "group")}
      button={
        <>
          {group.label}
          <ChevronDown className="size-3.5 transition-transform group-data-open:rotate-180" strokeWidth={1.75} />
        </>
      }
    >
      {group.items.map((item) => (
        <DropdownItem key={item.href} href={item.href} className="rounded-none border-b border-n6 py-2.5 last:border-0 dark:border-white/10">
          {icon(item.icon)}
          {item.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

function ThemeToggle({ className }) {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  return (
    <IconButton onClick={toggleDarkMode} aria-label="Toggle theme" className={cn("text-n2 dark:text-gold", className)}>
      {isDarkMode ? <Sun className="size-[22px]" /> : <Moon className="size-[22px]" />}
    </IconButton>
  );
}

function SearchButton({ className }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e, close) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`); // apna search route yahan lagao
    setQuery("");
    close(); // search ke baad input band
  };

  return (
    <Popover className="relative">
      <PopoverButton
        aria-label="Search"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5 focus:outline-none data-open:bg-black/5 dark:text-white dark:hover:bg-white/10 dark:data-open:bg-white/10",
          className
        )}
      >
        <Search className="size-5" strokeWidth={2} />
      </PopoverButton>

      <PopoverPanel
        anchor="bottom end"
        transition
        className="z-[1250] w-[250] max-w-80 rounded-xl bg-white p-2 shadow-[0px_0px_10px_0px_#0000001A] [--anchor-gap:10px] transition duration-150 data-closed:-translate-y-1 data-closed:opacity-0 dark:bg-[#1c1c1f]"
      >
        {({ close }) => (
          <form onSubmit={(e) => handleSubmit(e, close)} className="flex items-center gap-2">
            {/* <Search className="ml-2 size-4 shrink-0 text-[#353942] dark:text-white/70" /> */}
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search"
              className="h-9 w-full bg-transparent text-sm text-[#353942] outline-none placeholder:text-[#353942]/50 dark:text-white dark:placeholder:text-white/40"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Search
            </button>
          </form>
        )}
      </PopoverPanel>
    </Popover>
  );
}

function MobileMenu({ nav, open, onClose, isMember }) {
  const logoSrc = useSiteLogo();
  const rowLink = "flex items-center gap-2 border-b border-n6 py-2 text-fg! no-underline last:border-0 dark:border-white/10";

  return (
    <Drawer open={open} onClose={onClose} className="h-dvh w-full max-w-none bg-white p-5 dark:bg-black">
      <div className="flex items-center justify-between">
        <Link href="/" onClick={onClose}>
          {logoSrc && <img src={logoSrc} alt="The Coin Chain" className="w-[170px]" />}
        </Link>
        <IconButton onClick={onClose} aria-label="Close menu" className="text-fg">
          <X className="size-6" />
        </IconButton>
      </div>

      <div className="mt-3 flex items-center gap-2 sm:mt-14">
        <ThemeToggle className="border border-n4" />
      </div>

      <nav className="mt-4 flex flex-col font-nav font-bold">
        <Link href={nav.home.href} onClick={onClose} className="py-3 text-base text-fg! no-underline">
          {nav.home.label}
        </Link>
        {nav.groups.map((group) => (
          <Accordion key={group.label} title={group.label} className="border-t border-b-0 border-n6 dark:border-white/10" buttonClassName="font-bold">
            <div className="flex flex-col font-nav font-normal">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose} className={rowLink}>
                  {icon(item.icon)}
                  {item.label}
                </Link>
              ))}
            </div>
          </Accordion>
        ))}
        {nav.links.map((link) => (
          <Link key={link.href} href={link.href} onClick={onClose} className="border-t border-n6 py-3 text-fg! no-underline dark:border-white/10">
            {link.label}
          </Link>
        ))}
        {nav.trailingGroups.map((group) => (
          <Accordion key={group.label} title={group.label} className="border-t border-b-0 border-n6 dark:border-white/10" buttonClassName="font-bold">
            <div className="flex flex-col font-nav font-normal">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose} className={rowLink}>
                  {icon(item.icon)}
                  {item.label}
                </Link>
              ))}
            </div>
          </Accordion>
        ))}
      </nav>

      {isMember && (
        <div className="mt-auto pt-6 pb-5">
          <Button variant="outlined" href={RoutesName.Profile} onClick={onClose}>
            Profile settings
          </Button>
        </div>
      )}
    </Drawer>
  );
}

function NotificationsMenu() {
  const notificationAction = notificationActions();
  const notifications = useAtomValue(notificationAtom);
  const notificationCount = useAtomValue(notificationCountAtom);

  useEffect(() => {
    notificationAction.notificationList();
    notificationAction.notificationList_View();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Popover className="relative">
      <PopoverButton className="rounded-full p-2 text-n4 hover:bg-black/5 dark:hover:bg-white/10" aria-label="Notifications">
        <Badge content={notificationCount}>
          <Bell className="size-6" />
        </Badge>
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        transition
        className="z-[1250] w-80 rounded-2xl bg-surface p-4 text-fg shadow-[0_2px_8px_rgba(0,0,0,0.32)] [--anchor-gap:12px] transition duration-150 data-closed:opacity-0"
      >
        {({ close }) => (
          <>
            {notifications.length > 0 ? (
              <>
                <p className="text-2xl! font-semibold text-fg!">Notifications</p>
                <ul className="mt-2 divide-y divide-line">
                  {notifications.slice(0, 5).map((item) => (
                    <li key={item.ct_notiy_id}>
                      <button
                        type="button"
                        onClick={() => notificationAction.notificationSingleread(item.ct_notiy_id)}
                        className="flex w-full flex-col gap-1 py-3 text-left"
                      >
                        <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                          {item.ct_notify_title}
                          <Circle className="size-2.5 shrink-0 fill-success text-success" />
                        </span>
                        <span className="text-[10px] text-muted">{item.ct_notify_created_At}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <span className="text-sm">No New Notifications Available</span>
            )}
            <div className="flex justify-between pt-4">
              <Button href="/notifications" onClick={close}>
                View all
              </Button>
              {notifications.length > 0 && (
                <Button variant="outlined" onClick={() => notificationAction.clearNotifications({ action: "all_read" })}>
                  Clear all
                </Button>
              )}
            </div>
          </>
        )}
      </PopoverPanel>
    </Popover>
  );
}

function AccountMenu({ user }) {
  const userActions = useUserActions();
  const name = user?.user_name || user?.email?.split("@")[0] || "";

  return (
    <Dropdown
      className="w-72"
      buttonClassName="ml-2 rounded-full"
      button={
        <Tooltip title={name} placement="bottom">
          <img src="/assets/images/avatarUser.svg" alt="" className="size-10" />
        </Tooltip>
      }
      >
      {ACCOUNT_LINKS.map((link) => (
        <DropdownItem key={link.label} href={link.href} className="flex-col items-start gap-0.5 border-b border-line py-2.5">
          <span className="flex items-center gap-2 font-bold">
            <img src={link.img || "/assets/images/icons/share-square.svg"} alt="" className="size-5 dark:invert" />
            {link.label}
          </span>
          <span className="pl-7 text-xs text-muted">{link.hint}</span>
        </DropdownItem>
      ))}
      <DropdownItem onClick={() => userActions.logout()} className="font-bold">
        <img src="/assets/images/icons/share-square.svg" alt="" className="size-5 dark:invert" />
        Logout
      </DropdownItem>
    </Dropdown>
  );
}

/** Fixed top navigation. Shows the member variant when signed in. */
export default function SiteHeader() {
  const auth = useAtomValue(authAtom);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMember = !!auth;
  const nav = isMember ? MEMBER_NAV : PUBLIC_NAV;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[1100] bg-white shadow-[0px_0px_10px_0px_#0000001A] transition-colors duration-300 dark:bg-[rgba(20,20,22,0.95)] dark:shadow-none dark:backdrop-blur-[10px]">
        <div className="mx-auto flex min-h-16 container items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 xl:px-[5%]">
          <SiteLogo className="shrink-0 sm:w-[150px] lg:w-[192px]" />

          <div className="flex items-center justify-end gap-1 lg:gap-2">
            {/* Desktop nav: lg and up */}
              <nav className="hidden items-center font-nav lg:flex">
                {nav.groups.map((group) => (
                  <NavDropdown key={group.label} group={group} />
                ))}
                {nav.links.map((link) => (
                  <Link key={link.href} href={link.href} className={navButton}>
                    {link.label}
                  </Link>
                ))}
                {nav.trailingGroups.map((group) => (
                  <NavDropdown key={group.label} group={group} />
                ))}
              </nav>

            <SearchButton />
            <ThemeToggle className="hidden lg:inline-flex" />

            {isMember && <NotificationsMenu />}
            {isMember && (
              <Button variant="outlined" href="/account" className="ml-1 hidden border border-current px-4 py-1.5 lg:inline-flex">
                Account
              </Button>
            )}
            {isMember && <AccountMenu user={auth} />}

            <IconButton onClick={() => setMobileOpen(true)} aria-label="Open menu" className="text-[#353942] lg:hidden dark:text-white">
              <MenuIcon className="size-6" />
            </IconButton>
          </div>
        </div>
      </header>
      <MobileMenu nav={nav} open={mobileOpen} onClose={() => setMobileOpen(false)} isMember={isMember} />
    </>
  );
}