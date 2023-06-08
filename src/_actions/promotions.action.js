import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  promotionAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const promotionsActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [analyticList, setPromotion] = useRecoilState(promotionAtom);

    const get =  () => {
        return fetchWrapper.get(Apis.Promotions)
            .then(res => {
                if (res.statusCode === 200) {
                    setPromotion([...res.data])
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

export{ promotionsActions }