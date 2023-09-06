import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import {  promotionAtom, promotionAtomSingle, blogListAtom, blogimgAtom, blogVideoAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const promotionsActions = () => {
    const navigate = useNavigate()
    const setBlogimg = useSetRecoilState(blogListAtom);
    const setBlognew = useSetRecoilState(blogimgAtom);
    const setBlogvideo = useSetRecoilState(blogVideoAtom);
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setPromotion = useSetRecoilState(promotionAtom);
    const setPromotionListSingle = useSetRecoilState(promotionAtomSingle);
  

    const get =  () => {
        return fetchWrapper.get(Apis.Promotions)
            .then(res => {
                if (res.statusCode === 200) {
                    setPromotion([...res.data])
                } 
            }).catch((err)=>{console.warn(err)})
    }

    const getSingle = (title) => {
        return fetchWrapper.get(`${Apis.Promotions}?slug=${title}`)
            .then(res => {
                if (res.statusCode === 200) {
                    setBlogimg(res.data)
                    setBlognew(true)
                    setBlogvideo(false)
                }
            }).catch((err) => { navigate("/PageNotFound"); console.warn(err) })
    }
       
    return{
        get,
        getSingle
    }
}

export{ promotionsActions }