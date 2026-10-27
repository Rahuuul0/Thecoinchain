import { useSetAtom } from 'jotai';
import { useRouter } from "next/navigation";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { historyAtom } from '../_state'; 

const userLoginHistoryActions = () => {
    const router = useRouter();
    const fetchWrapper = useFetchWrapper();

    const setHistory = useSetAtom(historyAtom);

    const getAll =  () => {
        return fetchWrapper.get(Apis.User_Login_History )
            .then(res => {
                if (res.statusCode === 200) {
                    const dataa = res.data;
                    setHistory({ ...dataa });
                    return dataa
                } else {
        
                }
            }).catch((err)=>{console.warn(err)})
    }
       
    return{
        getAll
    }
}

export{ userLoginHistoryActions }