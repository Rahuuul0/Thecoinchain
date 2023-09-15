import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../_common/app.constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAlertActions } from "../../_actions/alert.actions";
import { switchAtom, loginDataAtom } from "../../_state/users";
import { useUserActions } from "../../_actions/user.actions";
import {
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Button,
  InputAdornment,
} from "@mui/material";
import { RoutesName } from "../../_common/app.constants";
import IconButton from "@mui/material/IconButton";
import LogoLight from "../../../public/assets/images/logo-light.svg";
import LogoDark from "../../../public/assets/images/logo.svg";
import AuthBg from "../../../public/assets/images/auth-bg.svg";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import OTPInput from "otp-input-react";
import { KeyboardArrowLeft } from "@mui/icons-material/";
import LoadingButton from '@mui/lab/LoadingButton';
import PhoneInput, { formatPhoneNumber,isPossiblePhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';


const ForgotPasswordPhone = () => {
  const navigate = useNavigate();
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const [Soption, setSoption] = useRecoilState(switchAtom);
  const [loginData, setLoginData] = useRecoilState(loginDataAtom);
  const [OTP, setOTP] = useState("");
  const [mobile_value, setMobile_value] = useState();
  const [phone_hide, setPhone_hide] = useState(false);
  const [timer, setTimer] = useState(60);

  // form validation rules
  const validationSchema = Yup.object().shape({
    // phone: Yup.string().trim().required("Phone number is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset, watch } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmitFun = async () => {
    if(mobile_value && isValidPhoneNumber(mobile_value)) {
      formData.phone = mobile_value;
    setLoginData({ ...loginData, phone: formData.phone, email: "" });
    await userActions.forgotPassword({ phone: formData.phone });
  };
  }

  const onSubmitFunOTP = async () => {
    if (OTP.length < 4) {
      alertActions.error("Fill OTP first");
    } else {
      setLoginData({ ...loginData, otp: OTP });
      await userActions.forgotPasswordVerify(OTP);
    }
  };

  const formData = watch();

  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = function () {
    if (!timer) {
      setTimer(60);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" className="auth-wrapper" maxWidth="fluid">
          <Box
            className="auth-header"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box className="auth-header-logo">
              <Link
                onClick={() => {
                  navigate("/");
                  setSoption(true);
                }}
              >
                <img src={LogoLight} alt="Coin Guru" className="desktop" />
              </Link>
              <Link
                onClick={() => {
                  navigate("/");
                  setSoption(true);
                }}
              >
                <img src={LogoDark} alt="Coin Guru" className="ipad" />
              </Link>
            </Box>
            <Box className="dont-have-acc">
              <Typography
                component="p"
                variant="body2"
                sx={{ fontSize: "14px", color: "#2B2B2B;" }}
              >
                Don’t have an account?{" "}
                <Link
                  onClick={() => {
                    navigate("/create-account");
                    setSoption(true);
                  }}
                >
                  Sign up for free
                </Link>
              </Typography>
            </Box>
          </Box>
          <Box className="auth-wrapper-inner">
            <Box className="auth-wrapper-bg">
              <img src={AuthBg} alt="Auth bg" />
            </Box>
            <Box className="auth-wrapper-form">
              <Box position="absolute" sx={{ top: { xs: '0px', sm: '30px', md: '90px' } }}>
                <IconButton
                  onClick={() => {
                    navigate("/login");
                    setSoption(true);
                  }}
                  aria-label="delete"
                  className="btn-primary btn"
                  variant="outlined"
                  sx={{
                    padding: "4px 4px !important",
                    margin: "0px !important",
                  }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </Box>
              {Soption ? (
                <Box className="auth-wrapper-form-inner">
                  <Typography component="h3" variant="h3">
                    Forgot password
                  </Typography>
                  <Typography
                    component="small"
                    variant="body2"
                    sx={{
                      color: "#777E91",
                      textAlign: "center",
                      display: "block",
                    }}
                  >
                    For security purposes, no withdrawals are permitted for 24
                    hours after password changed.
                  </Typography>
                  <Box className="devider" />

                  <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmitFun)}
                    noValidate
                  >
                    <Box className="auth-form">
                      <div className="custom-mobile">
                        <PhoneInput
                           className="PhoneInput2"
                          placeholder="Enter Mobile number"
                          value={mobile_value}
                          onChange={(e)=>{setMobile_value(e);setPhone_hide(true)}}
                          error={mobile_value ? (isValidPhoneNumber(mobile_value) ? undefined : 'Invalid Mobile number') : 'Mobile number is required'}
                        />
                        {phone_hide&&<div className="frm-message" style={{color:"red"}}>
                              {mobile_value && isValidPhoneNumber(mobile_value) ? "" : mobile_value>0?'Mobile number is not valid.':'Mobile number is required.'}
                              </div> 
                        }
                        <label id="phone_label_id">Mobile *</label>
                      </div>
                      <LoadingButton
                        type="submit"
                        loading={isSubmitting}
                        loadingPosition="end"
                        variant="contained"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        onClick={()=>{setPhone_hide(true)}}
                      >
                        {isSubmitting ? <span className="spinner-border spinner-border-sm mr-1">Loading</span> : "Continue"}
                      </LoadingButton>
                      <Typography
                        onClick={() => {
                          navigate("/login");
                        }}
                        component="p"
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          textAlign: "center",
                          fontWeight: "700",
                          marginTop: "24px",
                        }}
                      >
                        <Link
                          onClick={() => {
                            navigate("/login");
                          }}
                          sx={{ color: "#23262F !important" }}
                        >
                          {" "}
                          Nevermind, I got it{" "}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  onSubmit={handleSubmit(onSubmitFunOTP)}
                  noValidate
                  component="div"
                  className="auth-wrapper-form-inner forgot-password"
                >
                  <Typography component="h3" variant="h3">
                    Security verification
                  </Typography>
                  <Box className="open-id">
                    <Typography
                      component="small"
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        color: "#353945",
                        display: "block",
                        marginBottom: "20px",
                      }}
                    >
                      To secure your account, please complete the following
                      verification.
                    </Typography>
                    <Typography
                      component="p"
                      variant="body-caption"
                      sx={{
                        textAlign: "center",
                        color: "#777E90",
                        display: "block",
                        marginBottom: "20px",
                      }}
                    >
                      Enter the 4 digit code received by <br />
                      <span style={{ color: "#23262F" }}>{formData.phone}</span>
                    </Typography>
                  </Box>
                  <Box noValidate component="form" sx={{ mt: "24px" }}>
                    <Box
                      justifyContent={"center"}
                      display={"flex"}
                      component="div"
                      className="auth-form auth-otp"
                    >
                      <OTPInput
                        id="otp1"
                        autoFocus
                        type="number"
                        variant="filled"
                        value={OTP}
                        onChange={setOTP}
                        OTPLength={4}
                        otpType="number"
                        disabled={false}
                      />
                    </Box>
                    <Box component="div" className="auth-otp-cta">
                      {timer > 0 && (
                        <Button
                          disabled
                          style={{ background: "#ccc" }}
                          variant="outlined"
                          className="btn btn-outlined-secondary"
                        >
                          Resend Code ({timer})
                        </Button>
                      )}
                      {timer < 1 && (
                        <Button
                          type="button"
                          variant="outlined"
                          className="btn btn-outlined-secondary"
                          onClick={() => {
                            userActions.forgotPassword({
                              phone: formData.phone,
                            });
                            resetTimer();
                          }}
                        >
                          Resend Code
                        </Button>
                      )}
                      <Button
                        disabled={OTP.length !== 4 ? true : false}
                        type="submit"
                        variant="contained"
                        className={
                          OTP.length !== 4
                            ? "btn btn-outlined-secondary"
                            : "btn btn-primary"
                        }
                      >
                        Continue
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ForgotPasswordPhone;
