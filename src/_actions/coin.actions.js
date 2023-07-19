import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { useFetchWrapper } from "../_helpers";
import { useAlertActions } from "./alert.actions";
import { Labels, Apis, RoutesName } from "../_common/app.constants";
import {
  coinsAtom,
  coinCategoryAtom,
  selectedCategoryAtom,
  cardCoinsAtom,
  loaderAtom,
  predictionAtom,
} from "../_state/";
import { useLocation } from "react-router-dom";
import axios from "axios";

const useCoinActions = () => {
  let coinsArr = [];
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setCoinList = useSetRecoilState(coinsAtom);
  const [categoryList, setCoinsCategory] = useRecoilState(coinCategoryAtom);
  const setSelectedCategory = useSetRecoilState(selectedCategoryAtom);
  const location = useLocation();
  const setCardCoins = useSetRecoilState(cardCoinsAtom);
  const loader = useSetRecoilState(loaderAtom);
  const prediction = useRecoilValue(predictionAtom);

  const categoriesList = async () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Categories_Data)
      .then((res) => {
        if (res.statusCode === 200) {
          setCoinsCategory([...res.data.data]);
        } else {
          alertActions.error(Labels.Error);
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const coinListbByCategoty = async (id) => {
    // loader(true);
    setSelectedCategory(id);
    return fetchWrapper
      .post(Apis.Category_Data, { categories_id: id })
      .then((res) => {
        if (res.statusCode === 200) {
          coinsArr = [];
          res.data.data.coins.map((itm, key) => {
            let coin = {};
            coin.id = itm.id;
            coin.name = itm.name;
            coin.symbol = itm.symbol;
            coin.slug = itm.slug;
            coin.cmc_rank = itm.cmc_rank;
            coin.price = itm?.quote?.USD?.price;
            coin.percent_change_24h = itm?.quote?.USD?.percent_change_24h;
            if (location.pathname === "/market") {
              coin.percent_change_7d = itm?.quote?.USD?.percent_change_7d;
              coin.market_cap = itm?.quote?.USD?.market_cap;
              coin.volume_24h = itm?.quote?.USD?.volume_24h;
            }
            coinsArr.push(coin);
          });
          setCoinList(
            location.pathname === "/" ? coinsArr.slice(0, 5) : coinsArr
          );
        } else {
          alertActions.error(Labels.Error);
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  const latestListing = async (params) => {
    setSelectedCategory(0);
    categoryList.length <= 0 ? categoriesList() : "";
    return axios
      .get(Apis.Prediction)
      .then((res) => {
        loader(false);
        if (res.status === 200) {
          coinsArr = [];
          res.data.live_data.data.map((itm, key) => {
            let coin = {};
            coin.id = itm.id;
            coin.name = itm.name;
            coin.symbol = itm.symbol;
            coin.price = itm.quote.USD.price;
            coin.percent_change_24h = itm.quote.USD.percent_change_24h;
            coin.percent_change_7d = itm.quote.USD.percent_change_7d;
            coin.volume_24h = itm.quote.USD.volume_24h;
            coin.market_cap = itm.quote.USD.market_cap;
            coinsArr.push(coin);
          });
          setCardCoins(coinsArr);
          setCoinList(coinsArr);
        } else {
          console.log(Error);
        }
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  const predictionListing = (params) => {
    return axios
      .get(Apis.Prediction)
      .then((res) => {
        const mergedList = res.data.live_data.data.map((t1) => ({
          ...t1,
          ...res.data.prediction.find((t2) => t2.ct_symbol === t1.symbol),
        }));
        coinsArr = [];
        mergedList.map((itm, key) => {
          let coin = {};
          coin.id = itm.id;
          coin.name = itm.name;
          coin.symbol = itm.ct_symbol;
          coin.ct_day_1_current = itm.ct_day_1_current;
          coin.ct_hour_1_current = itm.ct_hour_1_current;
          coin.ct_hours_4_current = itm.ct_hours_4_current;
          coin.ct_min_15_current = itm.ct_min_15_current;
          coin.ct_accuracy = itm.ct_accuracy;
          coin.price = itm.quote.USD.price;
          coin.percent_change_7d = itm.quote.USD.percent_change_7d;
          coin.percent_change_7d = itm.quote.USD.percent_change_7d;
          coin.market_cap = itm.quote.USD.market_cap;

          coinsArr.push(coin);
        });
        setCoinList(coinsArr);
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  return {
    categoriesList,
    coinListbByCategoty,
    latestListing,
    predictionListing,
  };
};
export { useCoinActions };
