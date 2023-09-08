import { useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { analyticAtom, analyticListSingleAtom, blogListAtom, blogimgAtom, blogVideoAtom } from '../_state';
import { useRecoilValue, useRecoilState } from "recoil";
import { useAlertActions } from '../_actions/alert.actions';

const analyticsActions = () => {
    const navigate = useNavigate()
    const setBlogimg = useSetRecoilState(blogListAtom);
    const setBlognew = useSetRecoilState(blogimgAtom);
    const setBlogvideo = useSetRecoilState(blogVideoAtom);
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setAnalytic = useSetRecoilState(analyticAtom);
    const setAnalyticsListSingle = useSetRecoilState(analyticListSingleAtom);

    const get = () => {
        return fetchWrapper.get(Apis.Analytics)
            .then(res => {
                if (res.statusCode === 200) {
                    setAnalytic([...res.data])

                }
            }).catch((err) => { console.warn(err) })
    }

    const getSingle = (title) => {
        return fetchWrapper.get(`${Apis.Analytics}?slug=${title}`)
            .then(res => {
                if (res.statusCode === 200) {
                    setBlogimg(res.data)
                    setBlognew(true)
                    setBlogvideo(false)
                }
            }).catch((err) => { navigate("/page-not-found"); console.warn(err) })
    }

    return {
        get,
        getSingle
    }
}

export { analyticsActions }