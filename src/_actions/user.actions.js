import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { authAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';
import { Labels, Apis } from '../_common/app.constants'

const useUserActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [auth, setAuth] = useRecoilState(authAtom);

    const login = ({ email, password }) => {
        return fetchWrapper.post(Apis.Login, { email, password })
            .then(res => {
                if (res.statusCode === 200) {
                    setAuth(data);
                    // get return url from location state or default to home page
                    alertActions.success(Labels.Login_Success);
                } else {
                    alertActions.error(res.msg);
                }
            })
    }
    const create = ({ username, email, password, confirm_password }) => {
        return fetchWrapper.post(Apis.Login, { username, email, password, confirm_password })
            .then(res => {
                if (res.statusCode === 200) {
                    setAuth(data);
                    // get return url from location state or default to home page
                    alertActions.success(Labels.Login_Success);
                } else {
                    alertActions.error(res.msg);
                }
            })
    }

    return {
        login,create,
    }

}
export { useUserActions };
