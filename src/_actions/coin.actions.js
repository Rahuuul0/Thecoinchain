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
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h,7d&x_cg_demo_api_key=CG-sxwitfwabJ6rxwXCVPJymjH9";
const MARKET_REFRESH_INTERVAL = 60 * 1000;

let cachedMarkets = [];
let lastMarketFetchAt = 0;
let marketRequest;

const getMarketCoins = async () => {
  const now = Date.now();

  if (cachedMarkets.length && now - lastMarketFetchAt < MARKET_REFRESH_INTERVAL) {
    return cachedMarkets;
  }

  if (marketRequest) return marketRequest;

  marketRequest = fetch(COINGECKO_MARKETS_URL)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`CoinGecko request failed (${response.status})`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid CoinGecko market response");

      cachedMarkets = data;
      lastMarketFetchAt = Date.now();
      return cachedMarkets;
    })
    .finally(() => {
      marketRequest = undefined;
    });

  return marketRequest;
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
  sparkline: coin.sparkline_in_7d?.price || [],
  volume_24h: coin.total_volume,
  market_cap: coin.market_cap,
});

const requestedLimit = (params) => {
  const match = String(params || "").match(/[?&]?limit=(\d+)/);
  return match ? Number(match[1]) : undefined;
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
      const markets = await getMarketCoins();
      const coins = markets.map(normalizeCoin);
      const limit = requestedLimit(params);
      const visibleCoins = limit ? coins.slice(0, limit) : coins;

      setCoinList(visibleCoins);
      setCardCoins(coins.slice(0, 5));
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
  const predictionListing = async () => loadMarkets();

  return {
    categoriesList,
    coinListbByCategoty,
    latestListing,
    predictionListing,
  };
};

export { useCoinActions };
