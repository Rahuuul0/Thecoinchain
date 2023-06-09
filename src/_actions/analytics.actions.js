import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  analyticAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const analyticsActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [analyticList, setAnalytic] = useRecoilState(analyticAtom);

    const get =  () => {
        return fetchWrapper.get(Apis.Analytics)
            .then(res => {
                if (res.statusCode === 200) {
                    setAnalytic([...res.data])
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

export{ analyticsActions }