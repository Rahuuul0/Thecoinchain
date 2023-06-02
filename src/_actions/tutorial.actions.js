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
      .get(Apis.Tutorial_Video)
      .then((res) => {
        console.log(res, "api response");
        if (res.statusCode === Labels.Success_Status_Code) {
          setTutorialData((currentState) => ({
            ...currentState,
            ...res.data,
          }));
          return res.data;
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
        console.log(res, "api response");
        if (res.statusCode === Labels.Success_Status_Code) {
          setBlogData(res.data);
          return res.data;
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
