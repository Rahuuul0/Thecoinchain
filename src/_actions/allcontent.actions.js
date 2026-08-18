import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { Apis } from '../_common/app.constants';
import { allContentAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';

const allContentActions = () => {
    const navigate = useNavigate();
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [allContent, setAllContent] = useRecoilState(allContentAtom);

    // Get Content List by Type
    const get = (type) => {
        return fetchWrapper
            .get(Apis.ALL_CONTENT(type))
            .then((res) => {
                if (res.statusCode === 200) {
                    setAllContent(res.data || []);
                } else {
                    // alertActions.error(res.msg);
                }
                return res;
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    // Get Blog Detail by Id
    const getDetail = (id) => {
        return fetchWrapper
            .get(Apis.BLOG_DETAIL(id))
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    // Get Profile Detail by Id
    const getProfileDetail = (id) => {
        return fetchWrapper
            .get(Apis.PROFILE_DETAIL(id))
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.warn(err);
            });
    }

    return {
        get,
        getDetail,
        getProfileDetail,
    };
};

export { allContentActions };