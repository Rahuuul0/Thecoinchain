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
   
    const login = async ({ email, password }) => {
        return fetchWrapper.post(Apis.Login, { email, password })
            .then(res => {
                if (res.statusCode === 200) {
                    localStorage.setItem("email",res.data.email)
                    localStorage.setItem("id",res.data.id)
                    alertActions.success("Logged In Successfully");
                    navigate("/")
                } else {
                    alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }
       
    const loginMobile = ({ number, passwordMob }) => {

            alertActions.success("called"+ number +" "+passwordMob);
    }
            
            

    const forgotPassword = async (email) => {
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


        const forgotPasswordVerify = async(otp) => {
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


    const create = async ({email, mobile, password, confirm_password }) => {
        const phone = mobile;
        return fetchWrapper.post(Apis.Create, { email, phone, password, confirm_password })
            .then(res => {
                if (res.statusCode === 200) {
                    alertActions.success("Please select an option");
                    localStorage.setItem("email",res.data.email)
                    localStorage.setItem("phone",res.data.phone)
                    navigate("/confirm-account")
                } else {
                    alertActions.error("error");
                }
            }).catch((err)=>{console.log(err);});
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
            }).catch((err)=>{console.log(err);});
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
            }).catch((err)=>{console.log(err);});
    }

       
    const resetPassword = async ({ password}) => {
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

    const changePassword = async ({old_password, new_password}) => {
    
        return fetchWrapper.post(Apis.Change_Password, { old_password, new_password })
            .then(res => {
             if (res.statusCode === 200) {
                alertActions.success('Password Change Successfully');
                //  navigate("/login")
             } else {
                 alertActions.error("error");
             }
         }).catch((err)=>{console.warn(err)})
    }

    const createPassword = ({ newPassword, confirmPassword }) => {
                alertActions.success('New Password Created Successfully');
                navigate('/login');
               
    }
    const updateUser =(id,{name,email, mobile})=>{
        const phone = mobile;
      return fetchWrapper.post(`${Apis.Update_User}?id=${id}`,{name,email,phone})
      .then(res=>{
        if(res.statusCode === 200){
            alertActions.success('Update User is Successfully' )
        } else{
            alertActions.error("error");
        }
      }).catch((err)=>{console.warn(err)})
       
    }

    return {
        login,
        loginMobile,
        create,
        forgotPassword,
        changePassword,
        forgotPasswordVerify,
        getOtp,
        verifyRegisterOtp,
        resetPassword, 
        createPassword,
        updateUser,
    }

}
export { useUserActions };
