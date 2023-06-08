import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  faqAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const faqActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [faq, setFaq] = useRecoilState(faqAtom);

    const get =  () => {
        return fetchWrapper.get(Apis.FAQ )
            .then(res => {
                if (res.statusCode === 200) {
                    setFaq([...res.data])
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

export{ faqActions }