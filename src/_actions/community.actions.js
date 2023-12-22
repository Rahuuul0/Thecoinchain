import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  communityAtom, loaderAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const communityActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [Community, setcommunity] = useRecoilState(communityAtom);
    const loader = useSetRecoilState(loaderAtom);

    const community =  () => {
        loader(true);
        return fetchWrapper.get(Apis.Community_List)
            .then(res => {
                if (res.statusCode === 200) {
                    setcommunity([...res.data])
                    loader(false);
                } else {
                  
                }
            }).catch((err)=>{console.warn(err); loader(false);})
    }
       
    return{
        community
    }
}

export{ communityActions }
