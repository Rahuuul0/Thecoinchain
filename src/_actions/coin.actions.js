import { useSetRecoilState, useRecoilState } from "recoil";
import { useFetchWrapper } from "../_helpers";
import { useAlertActions } from "./alert.actions";
import { Labels, Apis, RoutesName } from "../_common/app.constants";
import { coinsAtom, coinCategoryAtom, selectedCategoryAtom } from "../_state/";

const useCoinActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setCoinList = useSetRecoilState(coinsAtom);
  const [categoryList, setCoinsCategory] = useRecoilState(coinCategoryAtom);
  const setSelectedCategory = useSetRecoilState(selectedCategoryAtom);

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
          setCoinList(res.data.data.coins);
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const latestListing = async () => {
    setSelectedCategory(0);
    categoryList.length <= 0 ? categoriesList() : "";
    return fetchWrapper
      .get(Apis.Latest_Listings)
      .then((res) => {
        if (res.statusCode === 200) {
          let coinArr = [];
          for (const key in res.data.data) {
            let slug = "";
            let firstItem = [];
            if (key === "BTC") {
              slug = "bitcoin";
            }
            if (key === "BTH") {
              slug = "bithereum";
            }
            if (key === "ETH") {
              slug = "ethereum";
            }
            if (key === "LINK") {
              slug = "chainlink";
            }
            if (key === "XRP") {
              slug = "xrp";
            }
            firstItem = res.data.data[key].filter((data) => {
              return data.slug === slug;
            });
            console.log(firstItem, "firstItem");
            if (firstItem.length === 1) coinArr.push(firstItem[0]);
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
