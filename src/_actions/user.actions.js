import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { authAtom } from '../_state';
import { switchAtom } from '../_state';

import { useAlertActions } from '../_actions/alert.actions';
import { Labels, Apis,RoutesName } from '../_common/app.constants'

const useUserActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [auth, setAuth] = useRecoilState(authAtom);
    const [Soption, setSoption] = useRecoilState(switchAtom);
   
    const login = ({ email, password }) => {
        return fetchWrapper.post(Apis.Login, { email, password })
            .then(res => {
                if (res.statusCode === 200) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    let { data } = res;
                    data['role_name'] = (data.userRoleType === Labels.Role_Type_Admin) ? Labels.Text_Admin : Labels.Text_Sam
                    data['access_token'] = res.access_token;
                    localStorage.setItem(Labels.Local_Storage_User, JSON.stringify(data));
                    localStorage.setItem(Labels.Local_Storage_LeadSourceId, JSON.stringify(data));
                    setAuth(data);
                    // get return url from location state or default to home page
                    alertActions.success(Labels.Login_Success);
                    (data.userRoleType == Labels.Role_Type_Admin)
                        ? navigate(RoutesName.Admin) : navigate(RoutesName.Sam)
                } else {
                    alertActions.error(res.msg);
                }
            })
    }
            

    const forgotPassword = (email) => {
           return fetchWrapper.post(Apis.Forgot_Password, { email })
           .then(res => {
            if (res.statusCode === 200) {
                alertActions.success("We have sent you the code");          
                setSoption(false)
            } else {
                alertActions.error("error");
            }
        }).catch((err)=>{console.warn(err)})

        }


        const forgotPasswordVerify = (otp) => {
            return fetchWrapper.post(Apis.Forgot_Password_Verify, { otp })
            .then(res => {
             if (res.statusCode === 200) {
                 alertActions.success("Success");
                 navigate("/reset-password")
             } else {
                 alertActions.error("error");
             }
         }).catch((err)=>{console.warn(err)})
 
         }


    const create = ({email, mobile, password, confirm_password }) => {
       
        alertActions.success("Please select an option");
        navigate("/confirm-account")
    }

       
    const resetPassword = ({ password}) => {
        const email = localStorage.getItem("email")
        const newPassword = password;
        return fetchWrapper.post(Apis.Reset_Password, { email, newPassword })
            .then(res => {
             if (res.statusCode === 200) {
                alertActions.success('Password Reset Successfully');
                 navigate("/login")
             } else {
                 alertActions.error("error");
             }
         }).catch((err)=>{console.warn(err)})
    }

    const createPassword = ({ newPassword, confirmPassword }) => {
                alertActions.success('New Password Created Successfully');
                navigate('/login');
               
    }

    return {
        login,
        create,
        forgotPassword,
        forgotPasswordVerify,
        resetPassword, 
        createPassword,
    }

}
export { useUserActions };
