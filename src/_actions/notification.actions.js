import { useRecoilState,useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { useAlertActions } from '../_actions/alert.actions';
import {notificationAtom} from '../_state/notifications';

const notificationActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const notificationLists = useSetRecoilState(notificationAtom);

    const notificationList = () => {
        return fetchWrapper.get(Apis.Notifications_List)
            .then(res => {
                if (res.statusCode === 200) {
                    notificationLists([...res.data])

                } else {

                }
            }).catch((err)=>{console.warn(err)})
    }

    

    const notificationSingleread = (notId, userId) => {
        // return fetchWrapper.post(Apis.Notifications_single_read)
        return fetchWrapper.post(Apis.Notifications_Single_Read, 
            {
                "read":"1",
                "notify_id": `${notId}`,
                "user_id":`${userId}`
            },
          )
            .then(res => {
                if (res.statusCode === 200) {
                    setNotification([...res.data])
                    return res.data
                    console.log(res.data,'sdfdddddddddd')
                    alertActions.success("Mark all Read Successfully");
                
                } else {
                    // alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }


    const categoryNotifications = (category,user_id) => {
        return fetchWrapper.get(Apis.Category_Notifications)
            // {
            //   "category":`${category}`,
            //   "user_id":`${userId}`
            // },
        
            .then(res => {
                if (res.statusCode === 200) {
                    // setNotification([...res.data])

                    console.log(res, "category notification ")
                } else {
                    // alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }

    const clearNotifications = () => {
    
        // return fetchWrapper.post(`${Apis.Notification_All_Clear}/${id}`)
        return fetchWrapper.post(Apis.Notification_All_Clear, 
            {
                "all_clear":"1",
            })
            .then((res) => {
                if (res.statusCode === 200) {  
                    return res.data  
                    notificationList()
                    // console.log(res.data``,'dfgdfgfgdfgg')            
                    alertActions.success('Clear all Data Successfully');
                    //   setNotification([...res.data])
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
