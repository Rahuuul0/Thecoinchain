import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from '../_helpers';
import { switchAtom, userErrorAtom ,authAtom} from '../_state';
import { useAlertActions } from '../_actions/alert.actions';
import { Labels, Apis } from '../_common/app.constants'
import axios from 'axios';

const useUserActions = () => {
    const navigate = useNavigate()
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [Soption, setSoption] = useRecoilState(switchAtom);
    const setUserError = useSetRecoilState(userErrorAtom);
    const [auth,setAuth] = useRecoilState(authAtom);
    
    const login = async ({email, password}) => {
        return fetchWrapper.post(Apis.Login, { email, password })
            .then(res => {
                if (res.statusCode === 200) {
                    let {data,access_token} = res;                      
                    localStorage.setItem("user",JSON.stringify({...data,access_token}))     
                    setAuth({...data,access_token});   
                    setUserError(true);
                    alertActions.success(Labels.Login_Success);
                    (data.login_attempt>0)?navigate("/account/profile"):navigate("/"); 
                } else {
                    alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }

    const loginAuth = async (data) => {
        let authData = {}
        authData.type = 'google';
        authData.name = data.name;
        authData.google_id = data.id;
        authData.email = data.email;
        return fetchWrapper.post(Apis.Social_Media_Login, authData)
            .then(res => {
                if (res.statusCode === 200) {    
                    let {data,access_token} = res;               
                    localStorage.setItem("user",JSON.stringify({...data,access_token}))     
                    setAuth({...data,access_token});    
                    alertActions.success(Labels.Login_Success);
                    (data.login_attempt>0)?navigate("/account/profile"):navigate("/");                 
                } else {
                    alertActions.error(res.msg);
                }
            }).catch((err)=>{console.warn(err)})
    }

    const googleAuth = async (user) => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {                
                loginAuth(res.data);
            })            
            .catch((err) => console.log(err));
    }

    const googleLogin = async (user) => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {                     
                loginAuth(res.data);
            })
            .catch((err) => console.log(err));
    }
       
    const loginMobile = ({ number, passwordMob }) => {
            alertActions.success("called"+ number +" "+passwordMob);
    }

    const forgotPassword = async (email) => {
           return fetchWrapper.post(Apis.Forgot_Password, { email })
           .then(res => {
            if (res.statusCode === 200) {
                alertActions.success(Labels.Password_Reset_Email.replaceAll(Labels.Replce_Text, email));        
                setSoption(false)
            } else {
                alertActions.error(Labels.Error);
            }
        }).catch((err)=>{console.warn(err)})

        }

    const forgotPasswordVerify = async(otp) => {
        return fetchWrapper.post(Apis.Forgot_Password_Verify, { otp })
        .then(res => {
            if (res.statusCode === 200) {
                alertActions.success(Labels.Success);
                navigate("/reset-password")
            } else {
                alertActions.error(Labels.Error);
            }
        }).catch((err)=>{console.warn(err)})
    }

    const create = async ({email, mobile, password, confirm_password }) => {
        const phone = mobile;
        const type = "website";
        const name = "Unknown Name";
        return fetchWrapper.post(Apis.Create,{email, phone, password, confirm_password ,type, name } )
            .then(res => {
                if (res.statusCode === 200) {
                    alertActions.success("Please select an option");
                    localStorage.setItem("email", res.data.email)
                    localStorage.setItem("phone", res.data.phone)
                    setSoption(true);
                    navigate("/confirm-account")
                } else {
                    alertActions.error(Labels.Error);
                }
            }).catch((err) => { console.log(err); });
    }    
    
    const getOtp = async () => {
       const  email = localStorage.getItem("email")
        return fetchWrapper.post(Apis.GetOtp, { email })
            .then(res => {
                if (res.statusCode === 200) {
                    setSoption(false)
                    alertActions.success("We have sent you the code");
                } else {
                    alertActions.error(Labels.Error);
                }
            }).catch((err)=>{console.log(err);});
    }

    const verifyRegisterOtp = async (otp) => {
        return fetchWrapper.post(Apis.VerifyRegisterOtp, { otp })
            .then(res => {
                if (res.statusCode === 200) {
                    alertActions.success(Labels.Verified);
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
                alertActions.success(Labels.Password_Reset_Success);
                 navigate("/login")
             } else {
                 alertActions.error(Labels.Error);
             }
         }).catch((err)=>{console.warn(err)})
    }

    const changePassword = async ({old_password, new_password}) => {
        const email = localStorage.getItem("email")
        return fetchWrapper.post(Apis.Reset_Password, { old_password, new_password })
            .then(res => {
             if (res.statusCode === 200) {
                alertActions.success('Password Reset Successfully');
                 navigate("/login")
             } else {
                 alertActions.error(Labels.Error);
             }
         }).catch((err)=>{console.warn(err)})
    }

    const createPassword = ({ newPassword, confirmPassword }) => {
                alertActions.success('New Password Created Successfully');
                navigate('/login');
               
    }

    const updateUser =({name,email, phone})=>{      
      return fetchWrapper.post(`${Apis.Update_User}`,{name,email,phone})
      .then(res=>{
        if(res.statusCode === 200){  
            let {data} = res;               
            localStorage.setItem("user",JSON.stringify({...auth,...data})) 
            setAuth((currentState) => ({
                ...currentState,
                ...res.data,
              }));
            alertActions.success('Update User is Successfully' )
        } else{
            alertActions.error("error");
        }
      }).catch((err)=>{console.warn(err)})       
    }

    const logout = () => {
        // remove user from local storage, set auth state to null and redirect to login page
        localStorage.removeItem(Labels.Local_Storage_User);
        setAuth(null);
        alertActions.success(Labels.Logout_Success);
        navigate('/');
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
        googleAuth,
        googleLogin,
        loginAuth,
        logout,


    }

}
export { useUserActions };
