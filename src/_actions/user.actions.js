import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useFetchWrapper } from "../_helpers";
import {
  switchAtom,
  userErrorAtom,
  authAtom,
  loaderAtom,
  forecastSubAtom,
  loginDataAtom,
} from "../_state";
import { useAlertActions } from "../_actions/alert.actions";
import { Labels, Apis } from "../_common/app.constants";

const useUserActions = () => {
  const router = useRouter();
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const [Soption, setSoption] = useAtom(switchAtom);
  const setUserError = useSetAtom(userErrorAtom);
  const [auth, setAuth] = useAtom(authAtom);
  const [loader, setLoader] = useAtom(loaderAtom);
  const subscription = useSetAtom(forecastSubAtom);
  const [loginData, setLoginData] = useAtom(loginDataAtom);



  const login = async ({ email, password, phone }) => {
    return fetchWrapper
      .post(Apis.Login, { email, password, phone })
      .then((res) => {
        if (res.statusCode === 200) {
          let { data, access_token, login_attempt } = res;
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...data,
              access_token,
              login_attempt,
              isSubscribed: true,
            })
          );
          setAuth({ ...data, access_token, login_attempt, isSubscribed: true });
          res.data.is_profile_completed == 0
            ? router.push("/account/profile")
            : router.push("/");
          setLoader(false);
          alertActions.success(Labels.Login_Success);
        } else {
          setUserError(true);
          alertActions.error(res.msg);
        }
      })
      .catch((err) => {
        setUserError(true);
        console.warn(err);
        setLoader(false);
      });
  };

  const loginAuth = async (data) => {
    let authData = {};
    authData.type = "google";
    authData.name = data.name;
    authData.google_id = data.id;
    authData.email = data.email;
    authData.referral_code = localStorage.getItem("refToken");
    return fetchWrapper
      .post(Apis.Social_Media_Login, authData)
      .then((res) => {
        if (res.statusCode === 200) {
          let { data, access_token, login_attempt } = res;
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...data,
              access_token,
              login_attempt,
              isSubscribed: true,
            })
          );
          setAuth({ ...data, access_token, login_attempt, isSubscribed: true });
          alertActions.success(Labels.Login_Success);
          res.data.is_profile_completed == 0
            ? router.push("/account/profile")
            : router.push("/");
        } else {
          alertActions.error(res.msg);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  // Both Google flows fetch the profile and then sign in with it.
  const googleSignIn = (user) =>
    fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`, {
      headers: { Authorization: `Bearer ${user.access_token}`, Accept: "application/json" },
    })
      .then((res) => res.json())
      .then(loginAuth)
      .catch((err) => console.log(err));

  const googleAuth = googleSignIn;
  const googleLogin = googleSignIn;

  const loginMobile = ({ number, passwordMob }) => {};

  const forgotPassword = async (data) => {
    return fetchWrapper
      .post(Apis.Forgot_Password, data)
      .then((res) => {
        if (res.statusCode === 200) {
          alertActions.success(
            Labels.Password_Reset_Email.replaceAll(
              Labels.Replce_Text,
              data.email ? data.email : data.phone
            )
          );
          setSoption(false);
          data.email
            ? localStorage.setItem("email", data.email)
            : localStorage.setItem("phone", data.phone);
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const forgotPasswordVerify = async (otp) => {
    return fetchWrapper
      .post(Apis.Forgot_Password_Verify, { otp })
      .then((res) => {
        if (res.statusCode === 200) {
          alertActions.success(Labels.Success);
          router.push("/reset-password");
          setSoption(true);
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const create = async ({ email, mobile, password, confirm_password }) => {
    const phone = mobile;
    const type = "website";
    const name = "Unknown Name";
    return fetchWrapper
      .post(Apis.Create, {
        email,
        phone,
        password,
        confirm_password,
        type,
        name,
        referral_code: localStorage.getItem("refToken"),
      })
      .then((res) => {
        if (res.statusCode === 200) {
          alertActions.success(Labels.Create);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("phone", res.data.phone);
          setSoption(true);
          router.push("/confirm-account");
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOtp = async () => {
    const email = localStorage.getItem("email");
    return fetchWrapper
      .post(Apis.GetOtp, { email })
      .then((res) => {
        if (res.statusCode === 200) {
          setSoption("email");
          alertActions.success(Labels.GetOtp);
        } else {
        
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        setUserError(true);
      });
  };

  const verifyRegisterOtp = async (otp) => {
    return fetchWrapper
      .post(Apis.VerifyRegisterOtp, { otp })
      .then((res) => {
        if (res.statusCode === 200) {
          alertActions.success(Labels.Verified);
          router.push("/login");
        } else {
         
          alertActions.error(Labels.verify_Register_Otp_Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  const resetPassword = async ({ password }) => {
    const { email, phone } = loginData;
    const newPassword = password;
    return fetchWrapper
      .post(Apis.Reset_Password, { email, phone, newPassword })
      .then((res) => {
        if (res.statusCode === 200) {
          alertActions.success(Labels.Password_Reset_Success);
          router.push("/login");
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const changePassword = async ({ old_password, new_password }) => {
    return fetchWrapper
      .post(Apis.Change_Password, { old_password, new_password })
      .then((res) => {
        if (res.statusCode === 200) {
          alertActions.success(Labels.Change_Password);
          router.push("/login");
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const createPassword = ({ newPassword, confirmPassword }) => {
    alertActions.success(Labels.Create_Password);
    router.push("/login");
  };

  const updateUser = ({ name, email, mobile, password }) => {
    const phone = mobile;
    return fetchWrapper
      .post(`${Apis.Update_User}`, { name, email, phone, password })
      .then((res) => {
        if (res.statusCode === 200) {
          let { data } = res;
          localStorage.setItem("user", JSON.stringify({ ...auth, ...data }));
          setAuth((currentState) => ({
            ...currentState,
            ...res.data,
          }));
          alertActions.success(Labels.Update_User);
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const logout = () => {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem(Labels.Local_Storage_User);
    router.push("/");
    alertActions.success(Labels.Logout_Success);
    setTimeout(() => {
      setAuth(null);
      subscription({ status: "expired" });
    }, 1000);
  };

  const getOtpPhone = async (phone) => {
    return fetchWrapper
      .post(Apis.Get_Otp_Phone, { phone })
      .then((res) => {
        if (res.statusCode === 200) {
          setSoption("phone");
          alertActions.success(Labels.get_Otp_Phone);
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        setUserError(true);
      });
  };

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
    getOtpPhone,
  };
};
export { useUserActions };
