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

// This is intentionally a module-level cache: Home and Market can both mount
// components that need prices, but CoinGecko should receive only one request
// per minute for the whole browser session.
const COINGECKO_MARKETS_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h,7d,30d&x_cg_demo_api_key=CG-sxwitfwabJ6rxwXCVPJymjH9";
const MARKET_REFRESH_INTERVAL = 60 * 1000;
const marketCache = {};
const marketRequests = {};

const getMarketCoins = async (page = 1, perPage = 100) => {
  const now = Date.now();
  const cacheKey = `${page}_${perPage}`;

  if (marketCache[cacheKey] && now - marketCache[cacheKey].fetchedAt < MARKET_REFRESH_INTERVAL) {
    return marketCache[cacheKey].data;
  }

  if (marketRequests[cacheKey]) return marketRequests[cacheKey];

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h,7d,30d&per_page=${perPage}&page=${page}&x_cg_demo_api_key=CG-sxwitfwabJ6rxwXCVPJymjH9`;

  marketRequests[cacheKey] = fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`CoinGecko request failed (${response.status})`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid CoinGecko market response");

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

const normalizeCoin = (coin) => ({
  id: coin.id,
  name: coin.name,
  symbol: coin.symbol?.toUpperCase(),
  image: coin.image,
  slug: coin.id,
  cmc_rank: coin.market_cap_rank,
  price: coin.current_price,
  percent_change_24h: coin.price_change_percentage_24h,
  percent_change_1h: coin.price_change_percentage_1h_in_currency,
  percent_change_7d: coin.price_change_percentage_7d_in_currency,
  percent_change_30d: coin.price_change_percentage_30d_in_currency,
  sparkline: coin.sparkline_in_7d?.price || [],
  volume_24h: coin.total_volume,
  market_cap: coin.market_cap,
  high_24h: coin.high_24h,
  low_24h: coin.low_24h,
  total_supply: coin.total_supply,
  circulating_supply: coin.circulating_supply,
  max_supply: coin.max_supply,
  ath: coin.ath,
});

const requestedLimit = (params) => {
  const match = String(params || "").match(/[?&]?limit=(\d+)/);
  return match ? Number(match[1]) : 100;
};

const requestedPage = (params) => {
  const match = String(params || "").match(/[?&]?page=(\d+)/);
  return match ? Number(match[1]) : 1;
};

const useCoinActions = () => {
  const alertActions = useAlertActions();
  const setCoinList = useSetRecoilState(coinsAtom);
  const setCoinsCategory = useSetRecoilState(coinCategoryAtom);
  const setSelectedCategory = useSetRecoilState(selectedCategoryAtom);
  const setCardCoins = useSetRecoilState(cardCoinsAtom);
  const setCategoryCoins = useSetRecoilState(categoryCoinsAtom);
  const setLoader = useSetRecoilState(loaderAtom);

  const loadMarkets = async (params) => {
    try {
      const page = requestedPage(params);
      const limit = requestedLimit(params);
      const perPage = limit > 100 ? 100 : limit < 5 ? 5 : limit;
      const markets = await getMarketCoins(page, perPage);
      const coins = markets.map(normalizeCoin);
      const visibleCoins = limit && limit < coins.length ? coins.slice(0, limit) : coins;

      setCoinList(visibleCoins);
      if (page === 1) {
        setCardCoins(coins.slice(0, 5));
      }
      return visibleCoins;
    } catch (error) {
      console.warn(error);
      alertActions.error(Labels.Error);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  // CoinGecko's /coins/markets response has no category payload. Keep these
  // actions for existing components, but use the same live market source.
  const categoriesList = async () => {
    setCoinsCategory([]);
    setCategoryCoins([]);
    setSelectedCategory(0);
    return loadMarkets();
  };

  const coinListbByCategoty = async () => {
    setSelectedCategory(0);
    return loadMarkets();
  };

  const latestListing = async (params) => {
    setSelectedCategory(0);
    return loadMarkets(params);
  };

  // The prediction dashboard is a public live-market view backed by CoinGecko.
  const predictionListing = async (params = "?page=1&limit=100") => loadMarkets(params);

  return {
    categoriesList,
    coinListbByCategoty,
    latestListing,
    predictionListing,
  };
};

export { useCoinActions };
