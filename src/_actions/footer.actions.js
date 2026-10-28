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
    loader(true)
    return fetchWrapper.post(`${Apis.Footer}`, data)
      .then(res => {
        loader(false)
        if (res.statusCode === 200) {
          alertActions.success(Labels.Footer_Email);
          setFooterError(true)
        } else {
          alertActions.error(res.msg);
        }
      }).catch((err)=>{console.warn(err)
        loader(false)
      })
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
