import { useFetchWrapper } from "../_helpers";
import { tutorialAtom, blogAtom, loaderAtom, tutorialCategoryAtom, marketBlogListAtom } from "../_state";
import { Apis } from "../_common/app.constants";
import { useSetRecoilState } from "recoil";

const useTutorialActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setTutorialData = useSetRecoilState(tutorialAtom);
  const setBlogData = useSetRecoilState(blogAtom);
  const loader = useSetRecoilState(loaderAtom);
  const tutorialCategory = useSetRecoilState(tutorialCategoryAtom);
  const marketBlogLists = useSetRecoilState(marketBlogListAtom);

  const tutorialData = () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Tutorial_Video)
      .then((res) => {
        if (res.statusCode === 200) {
          setTutorialData(res.data);
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  const blogData = () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Blog_List)
      .then((res) => {
        if (res.statusCode === 200) {
          setBlogData(res.data);
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  const categoryList = () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Category_List)
      .then((res) => {
        if (res.statusCode === 200) {
          tutorialCategory(res.data);
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  const marketBlogList = () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Market_Blog_List)
      .then((res) => {
        if (res.statusCode === 200) {
          marketBlogLists(res.data);
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  return {
    tutorialData,
    blogData,
    categoryList,
    marketBlogList,
  };
};
export { useTutorialActions };
