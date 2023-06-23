import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  historicalAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';
import { useSetRecoilState } from 'recoil';

const quotesHistoricalActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setHistorical = useSetRecoilState(historicalAtom);

    const add = (data) => {
        let params = {
            symbol : data
        }
        return fetchWrapper.post(`${Apis.Quotes_Historical}`,params)
            .then(res => {
                if (res.statusCode === 200) {
                    setHistorical({...res.data})
                } else {
                 
                }
            }).catch((err)=>{console.warn(err)})
    }    

    return{
        add
    }
}

export{ quotesHistoricalActions }