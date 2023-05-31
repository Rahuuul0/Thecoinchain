import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis } from '../_common/app.constants'
import { contact_AddAtom } from '../_state';
import { useSetRecoilState } from 'recoil';


const useContactActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setContactError = useSetRecoilState(contact_AddAtom);

  const add = (data) => {
    return fetchWrapper.post(`${Apis.Contact}`, data)
      .then(res => {
        if (res.statusCode === 200) {
          alertActions.success(Labels.Success);
          setContactError(true)
        } else {
          alertActions.error(res.msg);
        }
      })
  };

  return {
    add,
  }

}
export { useContactActions };
