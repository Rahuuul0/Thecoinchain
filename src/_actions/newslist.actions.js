import { useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { newsListAtom, newsListAtomSingle, blogListAtom, blogimgAtom, blogVideoAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';
import { useRecoilValue, useRecoilState } from "recoil";

const newsListActions = () => {
    const navigate = useNavigate()
    const setBlogimg = useSetRecoilState(blogListAtom);
    const setBlognew = useSetRecoilState(blogimgAtom);
    const setBlogvideo = useSetRecoilState(blogVideoAtom);
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setNewsList = useSetRecoilState(newsListAtom);
    const setNewsListSingle = useSetRecoilState(newsListAtomSingle);

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
            }).catch((err) => { navigate("/PageNotFound"); console.warn(err) })
    }

    return {
        get,
        getSingle
    }
}

export { newsListActions }