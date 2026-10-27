import { useSetAtom } from 'jotai';
import { useRouter } from "next/navigation";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  academyAtom, masterAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const academyActions = () => {
    const router = useRouter();
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setAbout = useSetAtom(academyAtom);
    const setMaster = useSetAtom(masterAtom);

    const academyGetList =  () => {
        return fetchWrapper.get(Apis.About_Crypto_List)
            .then(res => {
                if (res.statusCode === 200) {
                    setAbout([...res.data])
                    // alertActions.success("Logged In Successfully");
                    // router.push("/")
                } else {
                    // alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }

    const masterCourseGetList =  () => {
        return fetchWrapper.get(Apis.master_Course_List)
            .then(res => {
                if (res.statusCode === 200) {
                    setMaster([...res.data])
                    // alertActions.success("Logged In Successfully");
                    // router.push("/")
                } else {
                    // alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }
       
    return{
        academyGetList,
        masterCourseGetList
    }
}

export{ academyActions }