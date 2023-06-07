import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis } from '../_common/app.constants'
import { FooterAddAtom } from '../_state';
import { useSetRecoilState } from 'recoil';


const useFooterActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setFooterError = useSetRecoilState(FooterAddAtom);

  const add = (data) => {
    return fetchWrapper.post(`${Apis.Footer}`, data)
      .then(res => {
        if (res.statusCode === 200) {
          alertActions.success(Labels.Footer_Email);
          setFooterError(true)
        } else {
          alertActions.error(res.msg);
        }
      }).catch((err)=>{console.warn(err)})
  };

  return {
    add,
  }

}
export { useFooterActions };
