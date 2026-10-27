import { useSetAtom } from 'jotai';
import { useRouter } from "next/navigation";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { analyticAtom, analyticListSingleAtom, blogListAtom, blogimgAtom, blogVideoAtom } from '../_state';
import { useAtomValue, useAtom } from "jotai";
import { useAlertActions } from '../_actions/alert.actions';

const analyticsActions = () => {
    const router = useRouter();
    const setBlogimg = useSetAtom(blogListAtom);
    const setBlognew = useSetAtom(blogimgAtom);
    const setBlogvideo = useSetAtom(blogVideoAtom);
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setAnalytic = useSetAtom(analyticAtom);
    const setAnalyticsListSingle = useSetAtom(analyticListSingleAtom);

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
            }).catch((err) => { router.push("/page-not-found"); console.warn(err) })
    }

    return {
        get,
        getSingle
    }
}

export { analyticsActions }