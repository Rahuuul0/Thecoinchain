import { useSetRecoilState, useRecoilState } from "recoil";
import { useFetchWrapper } from "../_helpers";
import { useAlertActions } from "./alert.actions";
import { Labels, Apis, RoutesName } from "../_common/app.constants";
import { coinsAtom, coinCategoryAtom, selectedCategoryAtom } from "../_state/";
import { useLocation } from "react-router-dom";

const useCoinActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setCoinList = useSetRecoilState(coinsAtom);
  const [categoryList, setCoinsCategory] = useRecoilState(coinCategoryAtom);
  const setSelectedCategory = useSetRecoilState(selectedCategoryAtom);
  const location = useLocation();

  const categoriesList = async () => {
    return fetchWrapper
      .get(Apis.Categories_Data)
      .then((res) => {
        if (res.statusCode === 200) {
          setCoinsCategory([...res.data.data]);
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const coinListbByCategoty = async (id) => {
    setSelectedCategory(id);
    return fetchWrapper
      .post(Apis.Category_Data, { categories_id: id })
      .then((res) => {
        if (res.statusCode === 200) {
          let coinsArry = [];
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
            coinsArry.push(coin);
          });
          setCoinList(coinsArry);
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const latestListing = async (params) => {
    setSelectedCategory(0);
    categoryList.length <= 0 ? categoriesList() : "";
    return fetchWrapper
      .get(`${Apis.Latest_Listings}?${params}`)

      .then((res) => {
        if (res.statusCode === 200) {
          let coinArr = [];
          for (let key in res.data) {
            let firstItem = "";
            firstItem = res.data[key];
            if (!Array.isArray(res.data[key])) {
              coinArr.push(firstItem);
            }
          }

          setCoinList(coinArr);
          return res.data.data;
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return {
    categoriesList,
    coinListbByCategoty,
    latestListing,
  };
};
export { useCoinActions };
