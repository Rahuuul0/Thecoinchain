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
        alertActions.success("Logged In Successfully");
        navigate('/home')
            
    }
   
    const passwordRecovery = ({ email }) => {
        console.warn("called ",email)
        navigate('/login')
       alertActions.success('We have sent you the password reset link on your email.')
    }

    const create = ({email, mobile, password, confirm_password }) => {
       
        alertActions.success("Please select an option");
        navigate("/confirm-account")
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
        passwordRecovery,
        resetPassword, 
        createPassword,
    }

}
export { useUserActions };
