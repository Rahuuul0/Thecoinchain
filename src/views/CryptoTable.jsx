"use client";

import { useAtom, useAtomValue } from "jotai";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { subscriptionActions, useCoinActions } from "@/_actions";
import { authAtom, coinsAtom, forecastSubAtom, loaderAtom } from "@/_state";
import CryptoChartModal from "@/components/CryptoChartModal";
import CryptoMarketStatsModal from "@/components/CryptoMarketStatsModal";
import LiveSparkline from "@/components/LiveSparkline";
import { cn, LoadingOverlay, Pagination, Spinner } from "@/components/ui";
import { RoutesName } from "@/_common/app.constants";

const PREDICTION_PATH = RoutesName.Prediction_Dashboard || "/prediction-dashboard";
const MARKET_PATH = RoutesName.Market || "/market";
const VIEW_ALL_PATH = RoutesName.Prediction_Dashboard;

const formatPercentage = (value) => (Number.isFinite(value) ? `${value.toFixed(2)}%` : "—");

/** Rounds to a sensible number of decimals for the coin's magnitude. */
const displayPrice = (price) => {
  if (price > 1) return Math.round(price * 100) / 100;
  if (price < 1 && price >= 0.1) return (Math.round(price * 10000) / 10000).toFixed(2);
  if (price < 0.1 && price > 0.01) return (Math.round(price * 1000000) / 1000000).toFixed(6);
  if (price < 0.01) return (Math.round(price * 100000000) / 100000000).toFixed(8);
  return price;
};

const Change = ({ value, children }) => <span className={value < 0 ? "text-danger" : "text-success"}>{children}</span>;

/** Pill badge used for the 24 hr change column. */
function ChangeBadge({ value }) {
  const n = Number(value);
  const down = n < 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-[Inter] text-[16px] font-medium leading-none",
        down ? "bg-[#FDECEC] text-[#E5484D]" : "bg-[#E6F8EF] text-[#16A66A]"
      )}
    >
      <svg width="9" height="8" viewBox="0 0 9 7" fill="currentColor" aria-hidden="true">
        {down ? <path d="M4.5 7 0 0h9z" /> : <path d="M4.5 0 9 7H0z" />}
      </svg>
      {Number.isFinite(n) ? `${Math.abs(n).toFixed(2)}%` : "—"}
    </span>
  );
}

/**
 * Coin price table. Columns and paging depend on the page it is on:
 * home (top 10 + View buttons + "Market Trends" heading), /market (top 10, extra columns),
 * /prediction-dashboard (100 per page, 1h/24h/7d columns).
 */
export default function CryptoTable({ isIt, search }) {
  const pathname = usePathname();
  const coinActions = useCoinActions();
  const subscriptionAction = subscriptionActions();
  const coinsList = useAtomValue(coinsAtom);
  const userDetail = useAtomValue(authAtom);
  const subscriptionDetails = useAtomValue(forecastSubAtom);
  const [loader, setLoader] = useAtom(loaderAtom);

  const isPrediction = pathname === PREDICTION_PATH;
  const isMarket = pathname === MARKET_PATH;
  const isHomePage = pathname === "/" || isIt === false;
  const limit = isPrediction ? 100 : 10; // home ab 10 coins dikhata hai (design ke hisaab se)

  const [page, setPage] = useState(1);
  const [chartCoin, setChartCoin] = useState(null);
  const [statsCoin, setStatsCoin] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  // Search: local match plus a debounced API search across all coins.
  const searchTerm = (search || "").trim().toLowerCase();
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }
    let active = true;
    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await coinActions.searchCoins(searchTerm);
        if (active) setSearchResults(results || []);
      } catch (err) {
        console.warn("Search coins error:", err);
        if (active) setSearchResults([]);
      } finally {
        if (active) setIsSearching(false);
      }
    }, 400);
    return () => {
      active = false;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const displayCoins = useMemo(() => {
    if (!searchTerm) return coinsList;
    const matches = (c) => c?.name?.toLowerCase().includes(searchTerm) || c?.symbol?.toLowerCase().includes(searchTerm);
    if (searchResults === null) return coinsList.filter(matches);

    const byId = new Map(searchResults.filter((c) => c?.id).map((c) => [c.id, c]));
    coinsList.forEach((c) => c?.id && !byId.has(c.id) && matches(c) && byId.set(c.id, c));
    return [...byId.values()].sort((a, b) => (a.cmc_rank ?? 999999) - (b.cmc_rank ?? 999999));
  }, [coinsList, searchTerm, searchResults]);

  const visibleCoins = isPrediction ? displayCoins : displayCoins.slice((page - 1) * limit, page * limit);

  const loadListing = (p = page) =>
    isPrediction ? coinActions.predictionListing(`?page=${p}&limit=100`) : coinActions.latestListing("?limit=10");

  useEffect(() => {
    if (userDetail && !subscriptionDetails.id) subscriptionAction.subscribedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoader(true);
    loadListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionDetails, pathname]);

  // Refresh prices every minute.
  useEffect(() => {
    const interval = setInterval(() => loadListing(), 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, subscriptionDetails, page]);

  const handlePageChange = async (newPage) => {
    setPage(newPage);
    setLoader(true);
    try {
      if (isPrediction) await coinActions.predictionListing(`?page=${newPage}&limit=100`);
      else await coinActions.latestListing(`?page=${newPage}&limit=${isMarket ? 20 : 10}`);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoader(false);
    }
    document.getElementById("crypto-list-table")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Home: Price left, Change/Chart/View centered. Elsewhere numbers are right-aligned.
  const num = isHomePage ? "text-left" : "text-right";
  const mid = isHomePage ? "text-center" : "text-right";
  const th =
    "whitespace-nowrap border-b border-r border-[#EAECF0] bg-[#F8F9FB] px-4 py-3.5 font-[Manrope] text-[16px] font-medium text-[#111318] last:border-r-0 dark:border-white/10 dark:bg-white/5 dark:text-white";
  const td =
    "border-b border-r border-[#EAECF0] px-4 py-3 font-[Manrope] text-[16px] font-normal text-[#111318] last:border-r-0 dark:border-white/10 dark:text-white";

  const tableBlock = (
    <>
      <LoadingOverlay open={loader} />
      <div id="crypto-list-table" className="scroll-mt-24">
        <div className="overflow-hidden rounded-lg border border-[#EAECF0] bg-white dark:border-white/10 dark:bg-[#141416]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr>
                  <th className={cn(th, "w-[60px] sm:w-[80px] text-center")}>{isPrediction ? "#" : "Sr. No."}</th>
                  <th className={cn(th, "text-left")}>Name</th>
                  <th className={cn(th, num)}>Price</th>
                  {isPrediction ? (
                    <>
                      <th className={cn(th, num)}>1h</th>
                      <th className={cn(th, num)}>24h</th>
                      <th className={cn(th, num)}>7d</th>
                      <th className={cn(th, num)}>Volume (24h)</th>
                      <th className={cn(th, num)}>Marketcap</th>
                    </>
                  ) : isMarket ? (
                    <>
                      <th className={cn(th, num)}>24h Change</th>
                      <th className={cn(th, num)}>7d %</th>
                      <th className={cn(th, num)}>Marketcap</th>
                      <th className={cn(th, num)}>Volume(24h)</th>
                    </>
                  ) : (
                    <th className={cn(th, mid)}>24 hr Change</th>
                  )}
                  <th className={cn(th, mid)}>Chart</th>
                  {isHomePage && <th className={cn(th, "text-center")}>View</th>}
                </tr>
              </thead>
              <tbody>
                {displayCoins.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="py-12 text-center">
                      {isSearching ? (
                        <span className="flex items-center justify-center gap-3 py-4 font-medium text-n4">
                          <Spinner size={22} />
                          Searching all cryptocurrencies...
                        </span>
                      ) : (
                        <span className="font-medium text-n4">{searchTerm ? `No cryptocurrency found matching "${search}"` : "No cryptocurrency available"}</span>
                      )}
                    </td>
                  </tr>
                ) : (
                  visibleCoins.map((item, index) => (
                    <tr
                      key={item.id ?? index}
                      className="transition-colors even:bg-[#F8F9FB] hover:bg-[#FFFBF0] last:[&>td]:border-b-0 dark:even:bg-white/[0.03] dark:hover:bg-white/5"
                    >
                      <td className={cn(td, "text-center")}>
                        {item.cmc_rank || (searchTerm ? index + 1 : (page - 1) * 100 + index + 1)}{isPrediction ? "" : "."}
                      </td>
                      <td
                        className={cn(td, !isHomePage && "group cursor-pointer")}
                        onClick={!isHomePage ? () => setStatsCoin(item) : undefined}
                      >
                        {isPrediction ? (
                          <div className="flex items-center justify-between gap-3 max-w-[220px]">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.symbol} className="size-6 shrink-0 rounded-full object-contain" />
                              <span className="font-semibold text-fg group-hover:text-primary group-hover:underline">{item.name}</span>
                            </div>
                            <span className="text-xs font-medium uppercase text-[#667085] dark:text-[#a0a5b5]">{item.symbol}</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.symbol} className="size-6 shrink-0 rounded-full object-contain" />
                              <span className="group-hover:text-primary group-hover:underline">{item.name}</span>
                            </div>
                            {!isHomePage && <span className="mt-0.5 block pl-9 text-xs uppercase text-[#667085]">{item.symbol}</span>}
                          </>
                        )}
                      </td>
                      <td className={cn(td, num)}>${displayPrice(item?.price)?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>

                      {isPrediction ? (
                        <>
                          <td className={cn(td, num)}>
                            <Change value={item.percent_change_1h}>{formatPercentage(item.percent_change_1h)}</Change>
                          </td>
                          <td className={cn(td, num)}>
                            <Change value={item.percent_change_24h}>{formatPercentage(item.percent_change_24h)}</Change>
                          </td>
                          <td className={cn(td, num)}>
                            <Change value={item.percent_change_7d}>{formatPercentage(item.percent_change_7d)}</Change>
                          </td>
                          <td className={cn(td, num)}>{item.volume_24h?.toLocaleString() || "—"}</td>
                          <td className={cn(td, num)}>{item.market_cap?.toLocaleString() || "—"}</td>
                        </>
                      ) : isMarket ? (
                        <>
                          <td className={cn(td, num)}>
                            <Change value={item.percent_change_24h}>{formatPercentage(item.percent_change_24h)}</Change>
                          </td>
                          <td className={cn(td, num)}>
                            <Change value={item.percent_change_7d}>{item.percent_change_7d?.toFixed(2)}%</Change>
                          </td>
                          <td className={cn(td, num)}>${Math.round((item.market_cap * 100) / 100)?.toLocaleString()}</td>
                          <td className={cn(td, num)}>{Math.round((item.volume_24h * 100) / 100)?.toLocaleString()}</td>
                        </>
                      ) : (
                        <td className={cn(td, mid)}>
                          <ChangeBadge value={item.percent_change_24h} />
                        </td>
                      )}

                      <td className={cn(td, mid, "cursor-pointer")} onClick={() => setChartCoin(item)}>
                        <span className={cn("inline-block align-middle", !isHomePage && "float-right")}>
                          <LiveSparkline prices={item.sparkline} change={item.percent_change_24h} />
                        </span>
                      </td>

                      {isHomePage && (
                        <td className={cn(td, "text-center")}>
                          <button
                            type="button"
                            onClick={() => setStatsCoin(item)}
                            aria-label={`View ${item.name}`}
                            className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full border border-[#D7AE42]/60 bg-[linear-gradient(180deg,#F0D667_0%,#D7AE42_100%)] text-[#111318] shadow-[0px_1px_3px_0px_#0000002E] transition-transform hover:scale-110"
                          >
                            <ArrowRight className="size-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {isPrediction && (
            <div
              id="prediction-pagination"
              className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-[rgba(119,126,144,0.15)] px-2 py-5 sm:justify-between sm:px-4"
            >
              <p className="flex items-center gap-2 text-[0.88rem]! font-medium text-n4!">
                {searchTerm ? (
                  <>
                    Found <span className="font-bold text-fg">{displayCoins.length}</span> result{displayCoins.length === 1 ? "" : "s"} for &quot;{search}&quot;
                    {isSearching && <Spinner size={14} />}
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-bold text-fg">
                      {(page - 1) * 100 + 1}–{(page - 1) * 100 + coinsList.length}
                    </span>{" "}
                    of <span className="font-bold text-fg">1,000</span> Cryptocurrencies (100 per page)
                  </>
                )}
              </p>
              {!searchTerm && (
                <Pagination
                  count={10}
                  page={page}
                  onChange={handlePageChange}
                  showFirstLast
                  itemClassName="h-9 min-w-9 rounded-[10px] border border-[rgba(119,126,144,0.2)] px-1.5 text-[0.9rem] font-semibold text-n4 hover:border-[rgba(55,114,255,0.4)] hover:bg-[rgba(55,114,255,0.12)] hover:text-primary"
                  activeClassName="border-primary bg-primary text-white shadow-[0_4px_12px_rgba(55,114,255,0.4)] hover:bg-primary hover:text-white"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {isHomePage ? (
        <section className="bg-white py-[35px] transition-colors sm:py-[40px] lg:py-[50px] dark:bg-[#141416]">
          <div className="mx-auto container px-3 md:px-0">
            {/* ---------- Heading ---------- */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
              <div className="min-w-0 flex-1">
                <h2 className="m-0 font-[Manrope] text-[26px] font-extrabold leading-tight text-[#111318] sm:text-[32px] dark:text-white">
                  Market <span className="text-[#F58A07]">Trends</span>
                </h2>
                <p className="mb-0 mt-3 max-w-[640px] font-[Inter] text-[14px] font-normal leading-normal text-[#667085] sm:text-[16px] dark:text-white/60">
                  Live prices and performance of leading cryptocurrencies.
                </p>
              </div>

              <Link
                href={VIEW_ALL_PATH}
                onClick={() => setIsNavigating(true)}
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[linear-gradient(270deg,#D7AE42_0%,#F0D667_33%,#F0D667_65.7%,#D7AE42_100%)] px-4 py-2.5 font-[Manrope] text-[14px] font-semibold text-[#111318] no-underline transition-opacity hover:opacity-90 border border-transparent hover:border-[#010101] dark:hover:border-white"
              >
                View All
                {isNavigating ? (
                  <Loader2 className="size-4 animate-spin text-[#111318]" />
                ) : (
                  <ArrowRight className="size-4" />
                )}
              </Link>
            </div>

            {tableBlock}
          </div>
        </section>
      ) : (
        <div className="py-4">{tableBlock}</div>
      )}

      <CryptoChartModal open={!!chartCoin} onClose={() => setChartCoin(null)} coin={chartCoin} />
      <CryptoMarketStatsModal open={!!statsCoin} onClose={() => setStatsCoin(null)} coin={statsCoin} onOpenChart={setChartCoin} />
    </>
  );
}