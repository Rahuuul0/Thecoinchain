import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  newsListAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const newsListActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [newsList, setNewsList] = useRecoilState(newsListAtom);

    const get =  () => {
        return fetchWrapper.get(Apis.News_list )
            .then(res => {
                if (res.statusCode === 200) {
                    setNewsList([...res.data])
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

export{ newsListActions }