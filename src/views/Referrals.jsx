"use client";

import { useAtomValue } from "jotai";
import { RoutesName } from "@/_common/app.constants";
import { authAtom } from "@/_state";
import AccountShell from "@/components/account/AccountShell";
import { Button, TextField } from "@/components/ui";

const whiteBox = "border-n8 bg-n8 dark:border-n3 dark:bg-n3";

export default function Referrals() {
  const user = useAtomValue(authAtom);
  if (!user) return null;

  const earnings = user.total_earning !== "" ? `${Number(user.total_earning)?.toFixed(2)} ` : "0.00";

  return (
    <AccountShell title="Referrals">
      <h6 className="pb-2 text-sm!">Total rewards</h6>
      <h3 className="pb-4 font-display font-bold max-md:text-[32px]!">
        {earnings}
        <span className="ml-2 font-display text-success">USD</span>
      </h3>
      <p className="pb-6 text-xs! text-n4!">
        You&apos;re earning 20% of the subscription plan your
        <br />
        referrals pay. Learn more
      </p>

      <div className="my-4 rounded-[10px] bg-[#F1F2F4] p-6 dark:bg-n2">
        <h6 className="text-2xl! font-semibold max-md:text-base!">Invite friends to earn 20%</h6>
        <div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 sm:gap-x-4 md:gap-x-6">
          {/* Link/code values are not wired up yet. */}
          <TextField label="REFERRAL LINK" className="mt-4 mb-2" boxClassName={whiteBox} id="link" name="link" autoComplete="off" disabled />
          <TextField label="REFERRAL CODE" className="mt-4 mb-2" boxClassName={whiteBox} id="code" name="code" autoComplete="off" disabled />
        </div>
      </div>

      <Button variant="outlined" href={RoutesName.User_Dashboard} className="my-[30px] px-[15px] py-[9px]">
        My dashboard
      </Button>
    </AccountShell>
  );
}
