import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis } from '../_common/app.constants'
import { FooterAddAtom, loaderAtom, TermsListAtom, DisclaimersListAtom } from '../_state';
import { useSetRecoilState } from 'recoil';


const useFooterActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setFooterError = useSetRecoilState(FooterAddAtom);
  const loader = useSetRecoilState(loaderAtom)
  const setTermsList = useSetRecoilState(TermsListAtom);
  const setDisclaimersList = useSetRecoilState(DisclaimersListAtom);

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

  return {
    add,
    TermsList,
    DisclaimersList
  }

}
export { useFooterActions };
