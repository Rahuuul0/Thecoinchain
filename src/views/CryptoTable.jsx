"use client";

import { useAtom, useAtomValue } from "jotai";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { subscriptionActions, useCoinActions } from "@/_actions";
import { authAtom, coinsAtom, forecastSubAtom, loaderAtom } from "@/_state";
import CryptoChartModal from "@/components/CryptoChartModal";
import CryptoMarketStatsModal from "@/components/CryptoMarketStatsModal";
import LiveSparkline from "@/components/LiveSparkline";
import { cn, LoadingOverlay, Pagination, Spinner } from "@/components/ui";

const PREDICTION_PATH = "/prediction-dashboard";
const MARKET_PATH = "/market";

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

/**
 * Coin price table. Columns and paging depend on the page it is on:
 * home (top 5 + View buttons), /market (top 10, extra columns),
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
  const limit = isPrediction ? 100 : isHomePage ? 5 : 10;

  const [page, setPage] = useState(1);
  const [chartCoin, setChartCoin] = useState(null);
  const [statsCoin, setStatsCoin] = useState(null);

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
    isPrediction ? coinActions.predictionListing(`?page=${p}&limit=100`) : coinActions.latestListing(isMarket ? "?limit=10" : "?limit=5");

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

  // Home aligns every column left; elsewhere numbers are right-aligned.
  const num = isHomePage ? "text-left" : "text-right";
  const th = cn("border-b border-[rgba(224,224,224,1)] px-4 py-4 text-sm font-medium text-n3 dark:border-n3 dark:text-[#B1B5C3]");
  const td = "border-b border-[rgba(224,224,224,1)] px-4 py-4 text-sm text-n2 dark:border-n3 dark:text-n8";

  return (
    <>
      <div className={isHomePage ? "pt-10 pb-0 max-md:mb-8 max-md:pt-8" : "py-4"}>
        <LoadingOverlay open={loader} />
        <div id="crypto-list-table" className="scroll-mt-24 border border-[#6b656540] py-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse">
              <thead>
                <tr>
                  <th className={cn(th, "text-left")}>#</th>
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
                    <th className={cn(th, num)}>24h Change</th>
                  )}
                  <th className={cn(th, num)}>Chart</th>
                  {isHomePage && <th className={cn(th, num)}>View</th>}
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
                    <tr key={item.id ?? index} className="transition-colors last:[&>td]:border-0 hover:bg-black/4 dark:hover:bg-white/4">
                      <td className={td}>{item.cmc_rank || (searchTerm ? index + 1 : (page - 1) * 100 + index + 1)}</td>
                      <td
                        className={cn(td, !isHomePage && "group cursor-pointer")}
                        onClick={!isHomePage ? () => setStatsCoin(item) : undefined}
                      >
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.symbol} width={33} />
                          <span className="group-hover:text-primary group-hover:underline">{item.name}</span>
                        </div>
                        <span className="mt-0.5 block text-xs text-n4 uppercase">{item.symbol}</span>
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
                      ) : (
                        <td className={cn(td, num)}>
                          <Change value={item.percent_change_24h}>{Math.round((item.percent_change_24h + Number.EPSILON) * 100) / 100}%</Change>
                        </td>
                      )}

                      {isMarket && (
                        <>
                          <td className={cn(td, num)}>
                            <Change value={item.percent_change_7d}>{item.percent_change_7d?.toFixed(2)}</Change>
                          </td>
                          <td className={cn(td, num)}>${Math.round((item.market_cap * 100) / 100)?.toLocaleString()}</td>
                          <td className={cn(td, num)}>{Math.round((item.volume_24h * 100) / 100)?.toLocaleString()}</td>
                        </>
                      )}

                      <td className={cn(td, num, "cursor-pointer")} onClick={() => setChartCoin(item)}>
                        <span className={cn("inline-block", !isHomePage && "float-right")}>
                          <LiveSparkline prices={item.sparkline} change={item.percent_change_24h} />
                        </span>
                      </td>

                      {isHomePage && (
                        <td className={cn(td, num)}>
                          <button
                            type="button"
                            onClick={() => setStatsCoin(item)}
                            className="h-[30px] rounded-full border-2 border-line px-[15px] font-display text-xs font-bold text-fg hover:border-fg sm:h-[35px]"
                          >
                            View
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
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-[rgba(119,126,144,0.15)] px-2 pt-5 sm:justify-between sm:px-4">
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

      <CryptoChartModal open={!!chartCoin} onClose={() => setChartCoin(null)} coin={chartCoin} />
      <CryptoMarketStatsModal open={!!statsCoin} onClose={() => setStatsCoin(null)} coin={statsCoin} onOpenChart={setChartCoin} />
    </>
  );
}
