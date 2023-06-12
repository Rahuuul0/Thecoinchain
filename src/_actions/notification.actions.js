import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { useAlertActions } from '../_actions/alert.actions';
import {notificationAtom} from '../_state/notifications';

const notificationActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [notificationLists, setNotification] = useRecoilState(notificationAtom);

    const notificationList = () => {
        return fetchWrapper.get(Apis.Guides_analysis)
            .then(res => {
                if (res.statusCode === 200) {
                    // setNotification([...res.data])
                    alertActions.success(" Successfully");
                
                } else {
                    // alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }

    const markAllread = () => {
        return fetchWrapper.get(Apis.Guides_analysis)
            .then(res => {
                if (res.statusCode === 200) {
                    // setNotification([...res.data])
                    alertActions.success("Mark all Read Successfully");
                
                } else {
                    // alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }

    const clearData = () => {
    
        // return fetchWrapper.delete(`${Apis.User_Delete}/${id}`)
        //     .then((res) => {
        //         if (res.statusCode === 200) {                
                    alertActions.success('Clear all Data Successfully');
                    //   setNotification([...res.data])
            //     }
            // });
    }
       
    return {

        notificationList,
        markAllread,
        clearData,
    }
}

export{ notificationActions }
