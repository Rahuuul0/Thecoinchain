import { useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { useRecoilValue, useRecoilState } from "recoil";
import {  guidesAtom, guideListSingleAtom, blogListAtom, blogimgAtom, blogVideoAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const guidesAnalysisActions = () => {
    const navigate = useNavigate()
    const setBlogimg = useSetRecoilState(blogListAtom);
    const setBlognew = useSetRecoilState(blogimgAtom);
    const setBlogvideo = useSetRecoilState(blogVideoAtom);
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setGuides = useSetRecoilState(guidesAtom);
    const setGuideListSingle = useSetRecoilState(guideListSingleAtom);

    const get =  () => {
        return fetchWrapper.get(Apis.Guides_analysis)
            .then(res => {
                if (res.statusCode === 200) {
                    setGuides([...res.data])
                }
            }).catch((err)=>{console.warn(err)})
    }


    const getSingle = (title) => {
        return fetchWrapper.get(`${Apis.Guides_analysis}?slug=${title}`)
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

export{ guidesAnalysisActions }