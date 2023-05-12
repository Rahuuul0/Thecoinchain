import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { authAtom } from '../_state';
import { useAlertActions } from '../_actions/alert.actions';
import { Labels, Apis,RoutesName } from '../_common/app.constants'

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
   
    const passwordRecovery = ({ email }) => {
        navigate('/login')
       alertActions.success('We have sent you the password reset link on your email.')
    }

    const create = ({ username, email, password, confirm_password }) => {
       
        alertActions.success("Successfully Created Account");
        navigate("/login")
    }

    return {
        login,passwordRecovery,create,
    }

}
export { useUserActions };
