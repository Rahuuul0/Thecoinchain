import {  useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis, RoutesName } from '../_common/app.constants'
import { homePageAtom } from '../_state/';
import {homeAtom} from '../_state/home';

const useHomeActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setHomePageData = useSetRecoilState(homePageAtom);
  // const   sethome = useSetRecoilState(homeAtom);

  const categoriesData = async () => {
      
    return fetchWrapper.get(Apis.Categories_Data)
        .then(res => {
         if (res.statusCode === 200) {
         console.log(res,'categoriesData');
         } else {
             alertActions.error(Labels.Error);
         }
     }).catch((err)=>{console.warn(err)})
}

const categoryData = async () => {
  
    return fetchWrapper.post(Apis.Category_Data,)
        .then(res => {
         if (res.statusCode === 200) {
              console.log(res, 'category')
         } else {
             alertActions.error(Labels.Error);
         }
     }).catch((err)=>{console.warn(err)})
}

const latestListing = async () => {
   return  fetchWrapper.get(Apis.Latest_Listings)
        .then(res => {
         if (res.statusCode === 200) {
          return res.data.data
         } else {
             alertActions.error(Labels.Error);
         }
     }).catch((err)=>{console.warn(err)})
}


  return {
    categoriesData,
    categoryData,
    latestListing,

  }

}
export { useHomeActions };
