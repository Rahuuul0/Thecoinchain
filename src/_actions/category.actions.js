import { useFetchWrapper } from "../_helpers";
import { loaderAtom, tutorialCategoryAtom } from "../_state";
import { Apis } from "../_common/app.constants";
import { useSetRecoilState } from "recoil";

const useCategoryActions = () => {
  const fetchWrapper = useFetchWrapper();
  const loader = useSetRecoilState(loaderAtom);
  const tutorialCategory = useSetRecoilState(tutorialCategoryAtom);

  const categoryList = () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Category_List)
      .then((res) => {
        tutorialCategory(
          res.data.filter((items) => {
            return items.type === "Tutorial";
          })
        );
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  return {
    categoryList,
  };
};
export { useCategoryActions };
