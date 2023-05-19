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
               
                    alertActions.success("Logged In Successfully");
                    navigate("/")
                } else {
                    alertActions.error(res.msg);
                }
            })
    }
            
    
   
    const passwordRecovery = ({ email }) => {
        console.warn("called ",email)
        navigate('/login')
       alertActions.success('We have sent you the password reset link on your email.')
    }

    const create = async ({email, mobile, password, confirm_password }) => {
        const phone = mobile;
        return fetchWrapper.post(Apis.Create, { email, phone, password, confirm_password })
            .then(res => {
                if (res.statusCode === 200) {
                    alertActions.success("Please select an option");
                    localStorage.setItem("email",res.data.email)
                    navigate("/confirm-account")
                } else {
                    alertActions.error("error");
                }
            })
    }

    const getOtp = async () => {
       const  email = localStorage.getItem("email")
        return fetchWrapper.post(Apis.GetOtp, { email })
            .then(res => {
                if (res.statusCode === 200) {
                    alertActions.success("We have sent you the code ");
                } else {
                    alertActions.error("Error");
                }
            })
    }
    const verifyRegisterOtp = async (otp) => {
        return fetchWrapper.post(Apis.VerifyRegisterOtp, { otp })
            .then(res => {
                if (res.statusCode === 200) {
                    alertActions.success("Verified Successfully ");
                    navigate("/login")
                } else {
                    alertActions.error("Error Verifying");
                }
            })
    }

    const resetPassword = ({ oldpassword, password, confirmpassword}) => {
       alertActions.success('Password Reset Successfully');
       navigate('/login')
    }

    const createPassword = ({ newPassword, confirmPassword }) => {
                alertActions.success('New Password Created Successfully');
                navigate('/login');
               
    }

    return {
        login,
        create,
        getOtp,
        verifyRegisterOtp,
        passwordRecovery,
        resetPassword, 
        createPassword,
    }

}
export { useUserActions };
