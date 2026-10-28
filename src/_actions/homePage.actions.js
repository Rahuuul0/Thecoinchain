import {  useSetAtom } from 'jotai';
import { useFetchWrapper } from '../_helpers';
import { useAlertActions } from './alert.actions';
import { Labels, Apis, RoutesName } from '../_common/app.constants'
import { homePageAtom, marketTrendAtom, cryptoTraderAtom, cryptoNewsAtom, WorkListAtom, headingListAtom } from '../_state';
import {homeAtom} from '../_state/home';

const useHomeActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setmarketTrend = useSetAtom(homePageAtom);
  const sethome = useSetAtom(homeAtom);
  const setMarketTrend = useSetAtom(marketTrendAtom);
  const setCtyptoTrader = useSetAtom(cryptoTraderAtom);
  const setCtyptoNews = useSetAtom(cryptoNewsAtom);
  const setWorkList = useSetAtom(WorkListAtom);
  const setHeadingList = useSetAtom(headingListAtom);

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

  const crytoWorkList = async () => {
    return fetchWrapper
      .get(Apis.Cryto_Work_List)
      .then((res) => {
        if (res?.statusCode === 200) {
          setWorkList(res.data);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const headingList = async () => {
    return fetchWrapper
      .get(Apis.Heading_List)
      .then((res) => {
        if (res?.statusCode === 200) {
          setHeadingList(res.data);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };
   
  return {
    categoriesData,
    categoryData,
    latestListing,
    marketTrend,
    cryptoTrader,
    cryptoNews,
    crytoWorkList,
    headingList
  }

}
export { useHomeActions };
