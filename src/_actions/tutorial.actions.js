import { useFetchWrapper } from "../_helpers";
import { tutorialAtom } from "../_state";
import { Labels, Apis } from "../_common/app.constants";
import { useSetRecoilState } from "recoil";

const useTutorialActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setTutorialData = useSetRecoilState(tutorialAtom);
  const tutorialData = () => {
    console.log(tutorialAtom, "data api");
    return fetchWrapper
      .get(Apis.tutorial_video)
      .then((res) => {
        console.log(res, "api response");
        if (res.statusCode === 200) {
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

  return {
    tutorialData,
  };
};
export { useTutorialActions };
