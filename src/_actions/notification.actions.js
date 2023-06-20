import { useSetRecoilState,useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { useAlertActions } from '../_actions/alert.actions';
import {notificationAtom, notificationCountAtom} from '../_state';

const notificationActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const test=useRecoilValue(notificationAtom);
    const notificationLists = useSetRecoilState(notificationAtom);
    const notificationCount = useSetRecoilState(notificationCountAtom);


    const notificationList = () => {
        return fetchWrapper.get(Apis.Notifications_List)
            .then(res => {
                if (res.statusCode === 200) {
                    notificationLists([...res.data])
                    notificationCount(res.nofications_count)


                } 
            }).catch((err)=>{console.warn(err)})
    }

    const notificationSingleread = (notId, userId) => {
        return fetchWrapper.post(Apis.Notifications_Single_Read, 
            {
                "read":"1",
                "notify_id": `${notId}`,
                "user_id":`${userId}`
            },
          )
            .then(res => {
                if (res.statusCode === 200) {
                    notificationList()
                    return res.data
                    alertActions.success("Mark all Read Successfully");
                } else {
                    alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }


    const categoryNotifications = (categoryArr) => {
        const param = categoryArr.reduce((cat,curr)=> (cat[curr]=curr,cat),{});
        return fetchWrapper.post(Apis.Category_Notifications,param,)
            .then(res => {
                if (res.statusCode === 200) {
                  
                } 
            }).catch((err)=>{console.warn(err)})
    }

    const clearNotifications = () => {
    
        return fetchWrapper.post(Apis.Notification_All_Clear, 
            {
                "all_clear":"1",
            })
            .then((res) => {
                if (res.statusCode === 200) {  
                    notificationList()        
                    alertActions.success('Clear all Data Successfully');
                }
            });
    }
       
    return {

        notificationList,
        notificationSingleread,
        clearNotifications,
        categoryNotifications,
    }
}

export{ notificationActions }
