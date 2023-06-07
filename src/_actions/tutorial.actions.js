import { useFetchWrapper } from "../_helpers";
import { tutorialAtom, blogAtom } from "../_state";
import { Apis } from "../_common/app.constants";
import { useSetRecoilState } from "recoil";

const useTutorialActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setTutorialData = useSetRecoilState(tutorialAtom);
  const setBlogData = useSetRecoilState(blogAtom);

  const tutorialData = () => {
    return fetchWrapper
      .get(Apis.Tutorial_Video)
      .then((res) => {
        if (res.statusCode === 200) {
          setTutorialData(res.data);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const blogData = () => {
    return fetchWrapper
      .get(Apis.Blog_List)
      .then((res) => {
        if (res.statusCode === 200) {
          setBlogData(res.data);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return {
    tutorialData,
    blogData,
  };
};
export { useTutorialActions };
