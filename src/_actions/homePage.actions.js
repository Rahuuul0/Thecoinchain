import {  useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis, RoutesName } from '../_common/app.constants'
import { homePageAtom, marketTrendAtom, cryptoTraderAtom, cryptoNewsAtom } from '../_state';
import {homeAtom} from '../_state/home';

const useHomeActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setmarketTrend = useSetRecoilState(homePageAtom);
  const sethome = useSetRecoilState(homeAtom);
  const setMarketTrend = useSetRecoilState(marketTrendAtom);
  const setCtyptoTrader = useSetRecoilState(cryptoTraderAtom);
  const setCtyptoNews = useSetRecoilState(cryptoNewsAtom);

  const categoriesData = async () => {
      
    return fetchWrapper.get(Apis.Categories_Data)
        .then(res => {
         if (res.statusCode === 200) {
         } else {
             alertActions.error(Labels.Error);
         }
     }).catch((err)=>{console.warn(err)})
  }

  const categoryData = async () => {
  
    return fetchWrapper.post(Apis.Category_Data,)
        .then(res => {
         if (res.statusCode === 200) {
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

  const marketTrend = async () => {
    return  fetchWrapper.get(Apis.Market_Trend)
         .then(res => {
          if (res.statusCode === 200) {
            setMarketTrend(res.data);
          } else {
              alertActions.error(Labels.Error);
          } 
      }).catch((err)=>{console.warn(err)})
   }

   const cryptoTrader = async () => {
  
    return fetchWrapper.get(Apis.Crypto_Trader)
        .then(res => {
         if (res.statusCode === 200) {
          setCtyptoTrader(res.data)
         } else {
             alertActions.error(Labels.Error);
         }
     }).catch((err)=>{console.warn(err)})
  }

  const cryptoNews = async () => {
  
    return fetchWrapper.get(Apis.Crypto_News)
        .then(res => {
         if (res.statusCode === 200) {
          setCtyptoNews(res.data)
         } else {
             alertActions.error(Labels.Error);
         }
     }).catch((err)=>{console.warn(err)})
  }
   
  return {
    categoriesData,
    categoryData,
    latestListing,
    marketTrend,
    cryptoTrader,
    cryptoNews
  }

}
export { useHomeActions };
