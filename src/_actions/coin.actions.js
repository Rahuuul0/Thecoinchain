import { useSetRecoilState } from "recoil";
import { useAlertActions } from "./alert.actions";
import { Labels } from "../_common/app.constants";
import {
  coinsAtom,
  coinCategoryAtom,
  selectedCategoryAtom,
  cardCoinsAtom,
  loaderAtom,
  categoryCoinsAtom,
} from "../_state/";

import { fetchCoinGecko } from "../_helpers";

const MARKET_REFRESH_INTERVAL = 60 * 1000;

/**
 * ============================================================
 * Market Cache
 * ============================================================
 */

const marketCache = {};
const marketRequests = {};

/**
 * ============================================================
 * Search Cache
 * ============================================================
 */

const searchCache = {};
const searchRequests = {};

/**
 * ============================================================
 * Normalize Coin
 * ============================================================
 */

const normalizeCoin = (coin) => ({
  id: coin.id,
  name: coin.name,
  symbol: coin.symbol?.toUpperCase(),
  image: coin.image,
  slug: coin.id,

  cmc_rank: coin.market_cap_rank,

  price: coin.current_price,

  percent_change_24h:
    coin.price_change_percentage_24h,

  percent_change_1h:
    coin.price_change_percentage_1h_in_currency,

  percent_change_7d:
    coin.price_change_percentage_7d_in_currency,

  percent_change_30d:
    coin.price_change_percentage_30d_in_currency,

  sparkline:
    coin.sparkline_in_7d?.price || [],

  volume_24h:
    coin.total_volume,

  market_cap:
    coin.market_cap,

  high_24h:
    coin.high_24h,

  low_24h:
    coin.low_24h,

  total_supply:
    coin.total_supply,

  circulating_supply:
    coin.circulating_supply,

  max_supply:
    coin.max_supply,

  ath:
    coin.ath,
});

/**
 * ============================================================
 * Get Market Coins
 * ============================================================
 */

const getMarketCoins = async (
  page = 1,
  perPage = 100
) => {
  const now = Date.now();

  const cacheKey = `${page}_${perPage}`;

  /**
   * Return cached data if it is less than 60 seconds old
   */
  if (
    marketCache[cacheKey] &&
    now - marketCache[cacheKey].fetchedAt <
    MARKET_REFRESH_INTERVAL
  ) {
    return marketCache[cacheKey].data;
  }

  /**
   * Prevent duplicate requests
   */
  if (marketRequests[cacheKey]) {
    return marketRequests[cacheKey];
  }

  const endpoint =
    `/coins/markets` +
    `?vs_currency=usd` +
    `&sparkline=true` +
    `&price_change_percentage=1h,7d,30d` +
    `&per_page=${perPage}` +
    `&page=${page}`;

  marketRequests[cacheKey] = fetchCoinGecko(endpoint)
    .then(async (response) => {
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid CoinGecko market response"
        );
      }

      /**
       * Save response in cache
       */
      marketCache[cacheKey] = {
        data,
        fetchedAt: Date.now(),
      };

      return data;
    })
    .finally(() => {
      delete marketRequests[cacheKey];
    });

  return marketRequests[cacheKey];
};

/**
 * ============================================================
 * Search Market Coins
 * ============================================================
 */

const searchMarketCoins = async (query) => {
  const cleanQuery = (query || "")
    .trim()
    .toLowerCase();

  if (!cleanQuery) {
    return [];
  }

  const now = Date.now();

  /**
   * Return cached search result
   */
  if (
    searchCache[cleanQuery] &&
    now - searchCache[cleanQuery].fetchedAt <
    MARKET_REFRESH_INTERVAL
  ) {
    return searchCache[cleanQuery].data;
  }

  /**
   * Prevent duplicate search requests
   */
  if (searchRequests[cleanQuery]) {
    return searchRequests[cleanQuery];
  }

  searchRequests[cleanQuery] = (async () => {
    try {
      /**
       * --------------------------------------------------------
       * Step 1: Search CoinGecko
       * --------------------------------------------------------
       */

      const searchRes = await fetchCoinGecko(
        `/search?query=${encodeURIComponent(
          cleanQuery
        )}`
      );

      const searchData = await searchRes.json();

      const coins = searchData?.coins || [];

      /**
       * No results
       */
      if (!coins.length) {
        searchCache[cleanQuery] = {
          data: [],
          fetchedAt: Date.now(),
        };

        return [];
      }

      /**
       * --------------------------------------------------------
       * Step 2: Take top 50 matching coins
       * --------------------------------------------------------
       */

      const topCoins = coins.slice(0, 50);

      const ids = topCoins
        .map((coin) => coin.id)
        .filter(Boolean)
        .join(",");

      if (!ids) {
        return [];
      }

      /**
       * --------------------------------------------------------
       * Step 3: Get live market data
       * --------------------------------------------------------
       */

      const marketsRes =
        await fetchCoinGecko(
          `/coins/markets` +
          `?vs_currency=usd` +
          `&sparkline=true` +
          `&price_change_percentage=1h,7d,30d` +
          `&ids=${encodeURIComponent(ids)}`
        );

      const marketsData =
        await marketsRes.json();

      if (!Array.isArray(marketsData)) {
        return [];
      }

      /**
       * --------------------------------------------------------
       * Step 4: Normalize data
       * --------------------------------------------------------
       */

      const normalized =
        marketsData.map(normalizeCoin);

      /**
       * --------------------------------------------------------
       * Step 5: Sort by market cap rank
       * --------------------------------------------------------
       */

      normalized.sort((a, b) => {
        const rankA =
          a.cmc_rank != null
            ? a.cmc_rank
            : 999999;

        const rankB =
          b.cmc_rank != null
            ? b.cmc_rank
            : 999999;

        return rankA - rankB;
      });

      /**
       * --------------------------------------------------------
       * Step 6: Save search cache
       * --------------------------------------------------------
       */

      searchCache[cleanQuery] = {
        data: normalized,
        fetchedAt: Date.now(),
      };

      return normalized;
    } catch (error) {
      console.warn(
        "searchMarketCoins error:",
        error
      );

      return [];
    } finally {
      delete searchRequests[cleanQuery];
    }
  })();

  return searchRequests[cleanQuery];
};

/**
 * ============================================================
 * URL Parameter Helpers
 * ============================================================
 */

const requestedLimit = (params) => {
  const match = String(params || "").match(
    /[?&]?limit=(\d+)/
  );

  return match ? Number(match[1]) : 100;
};

const requestedPage = (params) => {
  const match = String(params || "").match(
    /[?&]?page=(\d+)/
  );

  return match ? Number(match[1]) : 1;
};

/**
 * ============================================================
 * Coin Actions
 * ============================================================
 */

const useCoinActions = () => {
  const alertActions = useAlertActions();

  const setCoinList =
    useSetRecoilState(coinsAtom);

  const setCoinsCategory =
    useSetRecoilState(coinCategoryAtom);

  const setSelectedCategory =
    useSetRecoilState(selectedCategoryAtom);

  const setCardCoins =
    useSetRecoilState(cardCoinsAtom);

  const setCategoryCoins =
    useSetRecoilState(categoryCoinsAtom);

  const setLoader =
    useSetRecoilState(loaderAtom);

  /**
   * ==========================================================
   * Load Markets
   * ==========================================================
   */

  const loadMarkets = async (params) => {
    try {
      const page = requestedPage(params);

      const limit = requestedLimit(params);

      const perPage =
        limit > 100
          ? 100
          : limit < 5
            ? 5
            : limit;

      /**
       * Get live market data
       */
      const markets =
        await getMarketCoins(
          page,
          perPage
        );

      /**
       * Normalize coins
       */
      const coins =
        markets.map(normalizeCoin);

      /**
       * Apply requested limit
       */
      const visibleCoins =
        limit && limit < coins.length
          ? coins.slice(0, limit)
          : coins;

      /**
       * Update main coin list
       */
      setCoinList(visibleCoins);

      /**
       * First 5 coins for cards
       */
      if (page === 1) {
        setCardCoins(
          coins.slice(0, 5)
        );
      }

      return visibleCoins;
    } catch (error) {
      console.warn(
        "loadMarkets error:",
        error
      );

      alertActions.error(
        Labels.Error
      );

      throw error;
    } finally {
      setLoader(false);
    }
  };

  /**
   * ==========================================================
   * Categories List
   * ==========================================================
   */

  const categoriesList = async () => {
    setCoinsCategory([]);

    setCategoryCoins([]);

    setSelectedCategory(0);

    return loadMarkets();
  };

  /**
   * ==========================================================
   * Coin List By Category
   * ==========================================================
   */

  const coinListbByCategoty = async () => {
    setSelectedCategory(0);

    return loadMarkets();
  };

  /**
   * ==========================================================
   * Latest Listing
   * ==========================================================
   */

  const latestListing = async (params) => {
    setSelectedCategory(0);

    return loadMarkets(params);
  };

  /**
   * ==========================================================
   * Prediction Listing
   * ==========================================================
   */

  const predictionListing = async (
    params = "?page=1&limit=100"
  ) => {
    return loadMarkets(params);
  };

  /**
   * ==========================================================
   * Search Coins
   * ==========================================================
   */

  const searchCoins = async (query) => {
    return searchMarketCoins(query);
  };

  return {
    categoriesList,
    coinListbByCategoty,
    latestListing,
    predictionListing,
    searchCoins,
  };
};

export { useCoinActions };