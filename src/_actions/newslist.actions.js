import { useSetAtom } from 'jotai';
import { useRouter } from "next/navigation";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { newsListAtom, newsListAtomSingle, blogListAtom, blogimgAtom, blogVideoAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';
import { useAtomValue, useAtom } from "jotai";

const newsListActions = () => {
    const router = useRouter();
    const setBlogimg = useSetAtom(blogListAtom);
    const setBlognew = useSetAtom(blogimgAtom);
    const setBlogvideo = useSetAtom(blogVideoAtom);
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setNewsList = useSetAtom(newsListAtom);
    const setNewsListSingle = useSetAtom(newsListAtomSingle);

    const get = () => {
        return fetchWrapper.get(Apis.News_list)
            .then(res => {
                if (res.statusCode === 200) {
                    setNewsList([...res.data])
                }
            }).catch((err) => {console.warn(err) })
    }

    const getSingle = (title) => {
        return fetchWrapper.get(`${Apis.News_list}?slug=${title}`)
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

export { newsListActions }