import { useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  bannerListAtom, homeBannerAtom } from '../_state';
import { useAlertActions } from './alert.actions';

const bannerListActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setBanner = useSetRecoilState(bannerListAtom);
    const HomeBanner = useSetRecoilState(homeBannerAtom);

    const get =  () => {
        return fetchWrapper.get(Apis.Banner_List)
            .then(res => {
                if (res.statusCode === 200) {
                    setBanner([...res.data])
                    // alertActions.success("Logged In Successfully");
                    // navigate("/")
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
       
    return{
        get,
        homeBannerList
    }
}

export{ bannerListActions }