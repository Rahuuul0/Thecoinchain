import { useFetchWrapper } from "../_helpers";
import { tutorialAtom, blogAtom } from "../_state";
import { Labels, Apis } from "../_common/app.constants";
import { useSetRecoilState } from "recoil";

const useTutorialActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setTutorialData = useSetRecoilState(tutorialAtom);
  const setBlogData = useSetRecoilState(blogAtom);

  const tutorialData = () => {
    console.log(tutorialAtom, "data api");
    return fetchWrapper
      .get(Apis.tutorial_list)
      .then((res) => {
        console.log(res, "api response");
        if (res.statusCode === 200) {
          setTutorialData(res.data);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const blogData = () => {
    console.log(tutorialAtom, "data api");
    return fetchWrapper
      .get(Apis.blog_list)
      .then((res) => {
        console.log(res, "api response");
        if (res.statusCode === Labels.Success_Status_Code) {
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
