import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from "next/navigation";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  communityAtom, loaderAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const communityActions = () => {
    const router = useRouter();
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [Community, setcommunity] = useAtom(communityAtom);
    const loader = useSetAtom(loaderAtom);

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
