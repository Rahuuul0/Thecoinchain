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
        return fetchWrapper.post(Apis.Password_Recovery, { email })
            .then(res => {
                if (res.status === Labels.Success) {
                    alertActions.success(Labels.Password_Reset_Email.replaceAll(Labels.Replce_Text, email));
                    navigate(RoutesName.Login)
                } else {
                    alertActions.error(res.msg);
                }
            })
    }

    const resetPassword = ({ oldpassword, password, confirmpassword}) => {
        return fetchWrapper.post(Apis.Reset_Password, { oldpassword, password, confirmpassword })
            .then(res => {
                if (res.status === Labels.Success) {
                    alertActions.success(Labels.Password_Reset_Success);
                    navigate(RoutesName.Login)
                } else {
                    alertActions.error(res.msg);
                }
            });
    }

    const createPassword = ({ newPassword, confirmPassword }) => {
                alertActions.success('New Password Created Successfully');
                navigate('/login');
               
    }

    return {
        login,
        passwordRecovery,
        resetPassword, 
        createPassword,
    }

}
export { useUserActions };
