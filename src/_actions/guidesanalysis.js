import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  guidesAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const guidesAnalysisActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [newsList, setGuides] = useRecoilState(guidesAtom);

    const get =  () => {
        return fetchWrapper.get(Apis.Guides_analysis)
            .then(res => {
                if (res.statusCode === 200) {
                    setGuides([...res.data])
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

export{ guidesAnalysisActions }