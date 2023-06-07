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
      .get(`${Apis.Latest_Listings}?page_name=page_name`)

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
