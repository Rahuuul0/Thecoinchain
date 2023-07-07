import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { useAlertActions } from '../_actions/alert.actions';
import { notificationAtom, notificationCountAtom, notificationViewAtom } from '../_state';

const notificationActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const test = useRecoilValue(notificationAtom);
    const notificationLists = useSetRecoilState(notificationAtom);
    const notificationLists_View = useSetRecoilState(notificationViewAtom);
    const notificationCount = useSetRecoilState(notificationCountAtom);
    
    const notificationList = () => {
        return fetchWrapper.get(Apis.Notifications_List)
            .then(res => {
                if (res.statusCode === 200) {
                    notificationLists([...res.data])
                    notificationCount(res.nofications_count)
                }
            }).catch((err) => { console.warn(err) })
    }

    const notificationList_View = () => {
        return fetchWrapper.get(Apis.Notifications_List_view)
            .then(res => {
                if (res.statusCode === 200) {
                    notificationLists_View([...res.data])
                    notificationList()
                }
            }).catch((err) => { console.warn(err) })
    }

    const notificationSingleread = (notId) => {
        return fetchWrapper.post(Apis.Notifications_Single_Read,
            {
                "read": 1,
                "notify_id": `${notId}`,
            },
        )
            .then(res => {
                if (res.statusCode === 200) {
                    notificationList()
                    notificationList_View()
                    return res.data
                    alertActions.success("Mark all Read Successfully");
                } else {
                    alertActions.error(res.msg);
                }
            }).catch((err) => { console.warn(err) })
    }

    const categoryNotifications = (categoryArr) => {
        const param = categoryArr.reduce((cat, curr) => (cat[curr] = curr, cat), {});
        return fetchWrapper.post(Apis.Category_Notifications, param,)
            .then(res => {
                if (res.statusCode === 200) {
                    console.log(res, "res")
                    notificationLists(res.data)
                    notificationLists_View(res.data)
                }
            }).catch((err) => { console.warn(err) })
    }

    const clearNotifications = (data) => {
        
        return fetchWrapper.post(Apis.Notification_All_Clear, data)
        
            .then((res) => {
                if (res.statusCode === 200) {  
                    notificationList_View() 
                    notificationList()   
                    data.action === "all_read" ? 
                        alertActions.success('Mark  all Read Successfully'): 
                    
                        alertActions.success('Clear all Data Successfully');
                }
            }).catch((err) => { console.warn(err) })
    }

    return {

        notificationList,
        notificationSingleread,
        clearNotifications,
        categoryNotifications,
        notificationList_View,

    }
}

export { notificationActions }
