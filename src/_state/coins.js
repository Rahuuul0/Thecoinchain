import { atom } from "recoil";
const coinsAtom = atom({
  key: "coinsAtom",
  default: [],
});

const coinsErrorAtom = atom({
  key: "coinsErrorAtom",
  default: false,
});

const selectedCategoryAtom = atom({
  key: "categoryName",
  default: 0 /* 0 for all */,
});

const coinCategoryAtom = atom({
  key: "categoryListAtom",
  default: [],
});

const cardCoinsAtom = atom({
  key: "cardCoinsAtom",
  default: [],
});

const predictionAtom = atom({
  key: "predictionAtom",
  default: [
    // {
    //   ct_min_15_current: 12.0,
    //   ct_min_15_previous: 12.0,
    //   ct_hour_1_previous: 12.0,
    //   ct_hours_4_previous: 12.0,
    //   ct_day_1_previous: 12.0,
    //   ct_created_At: "2023-07-07T07:57:12",
    //   ct_prediction_id: 1,
    //   ct_hour_1_current: 12.0,
    //   ct_hours_4_current: 12.0,
    //   ct_day_1_current: 12.0,
    //   ct_symbol: "BTC",
    //   ct_updated_At: "2023-07-07T07:57:12",
    //   live_data: [
    //     {
    //       id: 1,
    //       name: "Bitcoin",
    //       symbol: "BTC",
    //       slug: "bitcoin",
    //       num_market_pairs: 10327,
    //       date_added: "2010-07-13T00:00:00.000Z",
    //       tags: [
    //         { slug: "mineable", name: "Mineable", category: "OTHERS" },
    //         { slug: "pow", name: "PoW", category: "ALGORITHM" },
    //         { slug: "sha-256", name: "SHA-256", category: "ALGORITHM" },
    //         {
    //           slug: "store-of-value",
    //           name: "Store Of Value",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "state-channel",
    //           name: "State Channel",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "coinbase-ventures-portfolio",
    //           name: "Coinbase Ventures Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "three-arrows-capital-portfolio",
    //           name: "Three Arrows Capital Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "polychain-capital-portfolio",
    //           name: "Polychain Capital Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "binance-labs-portfolio",
    //           name: "Binance Labs Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "blockchain-capital-portfolio",
    //           name: "Blockchain Capital Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "boostvc-portfolio",
    //           name: "BoostVC Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "cms-holdings-portfolio",
    //           name: "CMS Holdings Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "dcg-portfolio",
    //           name: "DCG Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "dragonfly-capital-portfolio",
    //           name: "DragonFly Capital Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "electric-capital-portfolio",
    //           name: "Electric Capital Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "fabric-ventures-portfolio",
    //           name: "Fabric Ventures Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "framework-ventures-portfolio",
    //           name: "Framework Ventures Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "galaxy-digital-portfolio",
    //           name: "Galaxy Digital Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "huobi-capital-portfolio",
    //           name: "Huobi Capital Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "alameda-research-portfolio",
    //           name: "Alameda Research Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "a16z-portfolio",
    //           name: "a16z Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "1confirmation-portfolio",
    //           name: "1Confirmation Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "winklevoss-capital-portfolio",
    //           name: "Winklevoss Capital Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "usv-portfolio",
    //           name: "USV Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "placeholder-ventures-portfolio",
    //           name: "Placeholder Ventures Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "pantera-capital-portfolio",
    //           name: "Pantera Capital Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "multicoin-capital-portfolio",
    //           name: "Multicoin Capital Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "paradigm-portfolio",
    //           name: "Paradigm Portfolio",
    //           category: "CATEGORY",
    //         },
    //         {
    //           slug: "bitcoin-ecosystem",
    //           name: "Bitcoin Ecosystem",
    //           category: "PLATFORM",
    //         },
    //       ],
    //       max_supply: 21000000,
    //       circulating_supply: 19422418,
    //       total_supply: 19422418,
    //       is_active: 1,
    //       infinite_supply: false,
    //       platform: null,
    //       cmc_rank: 1,
    //       is_fiat: 0,
    //       self_reported_circulating_supply: null,
    //       self_reported_market_cap: null,
    //       tvl_ratio: null,
    //       last_updated: "2023-07-07T13:11:00.000Z",
    //       quote: {
    //         USD: {
    //           price: 30184.10039597266,
    //           volume_24h: 17811518467.13628,
    //           volume_change_24h: 4.7674,
    //           percent_change_1h: 0.09598034,
    //           percent_change_24h: -1.42228698,
    //           percent_change_7d: -2.47982993,
    //           percent_change_30d: 12.76504099,
    //           percent_change_60d: 8.55477458,
    //           percent_change_90d: 7.77350939,
    //           market_cap: 586248214844.5465,
    //           market_cap_dominance: 49.9214,
    //           fully_diluted_market_cap: 633866108315.43,
    //           tvl: null,
    //           last_updated: "2023-07-07T13:11:00.000Z",
    //         },
    //       },
    //     },
    //   ],
    // },
  ],
});

export {
  coinsAtom,
  coinsErrorAtom,
  coinCategoryAtom,
  selectedCategoryAtom,
  cardCoinsAtom,
  predictionAtom,
};
