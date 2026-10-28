import { useSetAtom } from 'jotai';
import { useRouter } from "next/navigation";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { useAtomValue, useAtom } from "jotai";
import {  guidesAtom, guideListSingleAtom, blogListAtom, blogimgAtom, blogVideoAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const guidesAnalysisActions = () => {
    const router = useRouter();
    const setBlogimg = useSetAtom(blogListAtom);
    const setBlognew = useSetAtom(blogimgAtom);
    const setBlogvideo = useSetAtom(blogVideoAtom);
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setGuides = useSetAtom(guidesAtom);
    const setGuideListSingle = useSetAtom(guideListSingleAtom);

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
            }).catch((err) => { router.push("/page-not-found"); console.warn(err) })
    }
       
    return{
        get,
        getSingle
    }
}

export{ guidesAnalysisActions }