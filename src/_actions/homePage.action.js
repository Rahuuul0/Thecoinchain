import {  useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis, RoutesName } from '../_common/app.constants'
import { homePageAtom } from '../_state/';

const useHomeActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setHomePageData = useSetRecoilState(homePageAtom);
  const getData = () => {
    return fetchWrapper.get(Apis.Home).then((res) => {
      if (res.statusCode === Labels.Success_Status_Code) {
        homePageAtom((currentState) =>({
          ...currentState,
          ...res.data,
        }))
        return res.data;
      } else {
        alertActions.error(res.msg);
      }
    });
  };

  return {
    getData,
  }

}
export { useHomePageActions };
