import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis } from '../_common/app.constants'
import { FooterAddAtom, loaderAtom, TermsListAtom, DisclaimersListAtom, PrivacyListAtom } from '../_state';
import { useSetAtom } from 'jotai';


const useFooterActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setFooterError = useSetAtom(FooterAddAtom);
  const loader = useSetAtom(loaderAtom)
  const setTermsList = useSetAtom(TermsListAtom);
  const setDisclaimersList = useSetAtom(DisclaimersListAtom);
  const setPrivacyList = useSetAtom(PrivacyListAtom);

  const add = (data) => {
    loader(true);
    return fetchWrapper
      .post(`${Apis.Footer}`, data)
      .then((res) => {
        loader(false);
        if (res && (res.statusCode === 200 || res.result_code === 1)) {
          alertActions.success(Labels.Footer_Email || "please check your email");
          setFooterError(true);
        } else {
          alertActions.error(res?.message || res?.msg || "Something went wrong.");
        }
        return res;
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
        alertActions.error("Network error. Please try again.");
      });
  };

  const TermsList =  () => {
    return fetchWrapper.get(Apis.Terms_List)
        .then(res => {
            if (res.statusCode === 200) {
              setTermsList([...res.data])

            } 
        }).catch((err)=>{console.warn(err)})
}

const DisclaimersList =  () => {
  return fetchWrapper.get(Apis.Disclaimers_List)
      .then(res => {
          if (res.statusCode === 200) {
            setDisclaimersList([...res.data])

          } 
      }).catch((err)=>{console.warn(err)})
}

const PrivacyList =  () => {
  return fetchWrapper.get(Apis.Privacy_List)
      .then(res => {
          if (res.statusCode === 200) {
            setPrivacyList([...res.data])

          } 
      }).catch((err)=>{console.warn(err)})
}

  return {
    add,
    TermsList,
    DisclaimersList,
    PrivacyList
  }

}
export { useFooterActions };
