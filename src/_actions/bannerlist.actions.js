import { useSetAtom } from 'jotai';
import { useRouter } from "next/navigation";
import { useFetchWrapper } from '../_helpers';
import { Apis, Labels } from '../_common/app.constants';
import {  bannerListAtom, homeBannerAtom, MarketBannerAtom, setLogoListAtom } from '../_state';
import { useAlertActions } from './alert.actions';

const bannerListActions = () => {
    const router = useRouter();
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setBanner = useSetAtom(bannerListAtom);
    const HomeBanner = useSetAtom(homeBannerAtom);
    const setMarketBanner = useSetAtom(MarketBannerAtom);
    const setLogoList = useSetAtom(setLogoListAtom)

    const get =  () => {
        return fetchWrapper.get(Apis.Banner_List)
            .then(res => {
                if (res.statusCode === 200) {
                    setBanner([...res.data])
                    // alertActions.success("Logged In Successfully");
                    // router.push("/")
                } else {
                    // alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }

    const homeBannerList = async () => {
        return  fetchWrapper.get(Apis.Home_Banner_List)
             .then(res => {
              if (res.statusCode === 200) {
                HomeBanner(res.data);
              } else {
                  alertActions.error(Labels.Error);
              } 
          }).catch((err)=>{console.warn(err)})
       }
       
       const marketBannerList = async () => {
        return  fetchWrapper.get(Apis.Market_Banner_List)
             .then(res => {
              if (res.statusCode === 200) {
                setMarketBanner(res.data);
              } else {
                  alertActions.error(Labels.Error);
              } 
          }).catch((err)=>{console.warn(err)})
       }

       const logoList = async () => {
        return  fetchWrapper.get(Apis.Logo_List)
             .then(res => {
              if (res.statusCode === 200) {
                setLogoList(res.data);
              } else {
                  alertActions.error(Labels.Error);
              } 
          }).catch((err)=>{console.warn(err)})
       }

    return{
        get,
        homeBannerList,
        marketBannerList,
        logoList
    }
}

export{ bannerListActions }