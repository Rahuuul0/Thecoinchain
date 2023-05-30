import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis } from '../_common/app.constants'


const useContactActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();

  const add = (data) => {
    return fetchWrapper.post(`${Apis.Contact}`, data)
      .then(res => {
        if (res.statusCode === 200) {
          alertActions.success(Labels.Success);
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
