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
        alertActions.success("Logged In Successfully");
        navigate('/')
            
    }
    const create = ({ username, email, password, confirm_password }) => {
       
        alertActions.success("Successfully Created Account");
        navigate("/login")
    }

    return {
        login,create,
    }

}
export { useUserActions };
