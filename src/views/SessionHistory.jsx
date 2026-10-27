"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useDeviceData } from "react-device-detect";
import { userLoginHistoryActions } from "@/_actions";
import { RoutesName } from "@/_common/app.constants";
import AccountShell from "@/components/account/AccountShell";
import { Button, cn } from "@/components/ui";

const formatDate = (value) => dayjs(value).format("MM/DD/YY - HH:mm:ss");
const cell = "border-b border-[rgba(224,224,224,1)] px-4 py-4 text-sm dark:border-n3";
const tag = "inline-flex items-center gap-1 rounded px-2.5 py-px font-display text-sm font-bold";

function HistoryTable({ title, columns, rows, renderRow, footer }) {
  return (
    <div className="mb-10">
      <h5>{title}</h5>
      <div className="max-h-60 overflow-auto pr-[18px] sm:max-h-[440px]">
        <table className="w-full min-w-[250px] border-collapse md:min-w-[650px]">
          <thead className="sticky top-0 bg-n8 dark:bg-ink">
            <tr>
              {columns.map((col, i) => (
                <th key={col} className={cn(cell, "font-semibold", i === columns.length - 1 ? "text-right" : "text-left")}>
                  <small className="text-sm font-semibold">{col}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&>tr:last-child>td]:border-0">{rows.map(renderRow)}</tbody>
        </table>
      </div>
      <div className="mt-8 flex justify-end">{footer}</div>
    </div>
  );
}

export default function SessionHistory() {
  const historyActions = userLoginHistoryActions();
  const device = useDeviceData();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    historyActions.getAll().then((res) => setHistory([...(res || [])].reverse()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccountShell title="Sessions & login history">
      <HistoryTable
        title="Active sessions"
        columns={["Date / time", "Device", "Location"]}
        rows={history}
        renderRow={(item, i) => (
          <tr key={item.id ?? i}>
            <td className={cell}>
              <p className="text-sm! font-medium">{formatDate(item.created_at)}</p>
            </td>
            <td className={cell}>
              <p className="text-sm! font-medium">{device?.device?.model}</p>
              <p className="text-sm!">{device?.os?.name}</p>
            </td>
            <td className={cn(cell, "text-right")}>
              <span className={cn(tag, "bg-fg text-inverse")}>
                <ReactCountryFlag countryCode={item.country_code} />
                {item.country_code}
              </span>
            </td>
          </tr>
        )}
        footer={
          <Button variant="outlined" className="px-[15px] py-[9px]">
            Log out all other devices
          </Button>
        }
      />

      <HistoryTable
        title="Login history"
        columns={["Date / time", "IP address", "Used 2FA"]}
        rows={history}
        renderRow={(item, i) => (
          <tr key={item.id ?? i}>
            <td className={cell}>
              <p className="text-sm! font-medium">{formatDate(item.created_at)}</p>
              <p className="text-sm! text-n4!">{item.time}</p>
            </td>
            <td className={cell}>
              <p className="text-sm! font-medium">{item.ip_address}</p>
            </td>
            <td className={cn(cell, "text-right")}>
              <span className={cn(tag, item.cta === "NO" ? "bg-danger text-n8" : "bg-success text-white")}>{item.cta} Yes</span>
            </td>
          </tr>
        )}
        footer={
          <Button variant="outlined" href={RoutesName.Contact_Us} className="px-[15px] py-[9px]">
            Contact us
          </Button>
        }
      />
    </AccountShell>
  );
}
