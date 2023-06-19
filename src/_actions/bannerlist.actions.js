import { useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  bannerListAtom } from '../_state';
import { useAlertActions } from './alert.actions';

const bannerListActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setBanner = useSetRecoilState(bannerListAtom);

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
       
    return{
        get
    }
}

export{ bannerListActions }