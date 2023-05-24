import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "../../_common/app.constants";
import { useUserActions } from "../../_actions/user.actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  Checkbox,
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Button,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import OTPInput, { ResendOTP } from "otp-input-react";
import IconButton from "@mui/material/IconButton";
import LogoLight from "../../../public/assets/images/logo-light.svg";
import LogoDark from '../../../public/assets/images/logo.svg';
import AuthBg from "../../../public/assets/images/auth-bg.svg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useAlertActions } from '../../_actions/alert.actions';

const AccountConfirm = () => {
  const navigate = useNavigate();
  const userActions = useUserActions();
  const [radioOption, setRadioOption] = useState("by_email");
  const [switchOption, setSwitchOption] = useState(true);
  const onSubmitFun = async () => {
    if (radioOption == "by_email") {
      userActions.getOtp();
      setSwitchOption(false);
    }
    else {
      // code for 
    }
  }
  const handleOtpSubmit = async () => {
    // await userActions.
  }
  const [OTP, setOTP] = useState("");
  const { register, handleSubmit, formState, reset, watch } = useForm();
  const { errors, isSubmitting } = formState;
  const alertActions = useAlertActions();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" className="auth-wrapper" maxWidth="fluid">
          <Box
            component="div"
            className="auth-header"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box className='auth-header-logo' >
              <img src={LogoLight} alt='Coin Guru' className='desktop' />
              <img src={LogoDark} alt='Coin Guru' className='ipad' />
            </Box>
            <Box component="div" className="dont-have-acc">
              <Typography
                component="p"
                variant="body2"
                sx={{ fontSize: "14px", color: "#2B2B2B;" }}
              >
                Already have an account?{" "}
                <Link
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
          <Box component="div" className="auth-wrapper-inner">
            <Box component="div" className="auth-wrapper-bg">
              <img src={AuthBg} alt="Auth bg" />
            </Box>
            <Box component="div" className="auth-wrapper-form">
              {switchOption ? (
                <Box component="div" className="auth-wrapper-form-inner">
                  <Typography component="h3" variant="h3">
                    Let’s confirm it’s really you
                  </Typography>
                  <Box component="div" className="open-id">
                    <Typography
                      component="small"
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        color: "#777E91",
                        display: "block",
                        marginBottom: "20px",
                      }}
                    >
                      Help us secure your account.
                      <br />
                      Please complete the verifications below
                    </Typography>
                  </Box>
                  <Box noValidate onSubmit={handleSubmit(onSubmitFun)} component="form" sx={{ mt: "24px" }}>
                    <Box component="div" className="auth-form">
                      <FormControl className="confirm-account">
                        <RadioGroup
                          aria-labelledby="confirm account"
                          // defaultValue="by_mobile"
                          value={radioOption}
                          name="radio-buttons-group"
                          onChange={(e) => {
                            setRadioOption(e.target.value);
                          }}
                        >
                          <FormControlLabel
                            value="by_mobile"
                            control={<Radio />}
                            label={`Get the code by text message (SM) at ${localStorage.getItem("phone")}`}
                          />
                          <Box component="div" className="devider" />
                          <FormControlLabel
                            value="by_email"
                            control={<Radio />}
                            label={`Get the code by email at ${localStorage.getItem("email")}`}
                          />
                        </RadioGroup>
                      </FormControl>

                      <Button
                        type="submit"
                        variant="contained"
                        className="btn btn-primary"
                        endIcon={<KeyboardArrowRightIcon />}
                      >
                        Continue
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box component="div" className="auth-wrapper-form-inner">
                  <Typography component="h3" variant="h3">
                    Enter your security code
                  </Typography>
                  <Box component="div" className="open-id">
                    <Typography
                      component="small"
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        color: "#777E91",
                        display: "block",
                        marginBottom: "20px",
                      }}
                    >
                      {radioOption !== "by_email"
                        ? `We have sent the code by text message (SM) at ${localStorage.getItem("phone")}`
                        : `We have sent the code by email at ${localStorage.getItem("email")}`}
                    </Typography>
                  </Box>
                  <Box noValidate onSubmit={handleOtpSubmit} component="form" sx={{ mt: "24px" }}>
                    <Box component="div" display={"flex"} justifyContent={"center"} className="auth-form auth-otp">

                      <OTPInput id="otp1" autoFocus type='number' variant="filled" value={OTP} onChange={setOTP} OTPLength={4} otpType="number" disabled={false} />

                    </Box>
                    <Box component="div" className='auth-otp-cta' >
                      <Button onClick={() => { userActions.getOtp() }} variant="outlined" className='btn btn-outlined-secondary'>
                        Resend Code
                      </Button>
                      <Button type="button" variant="contained" className='btn btn-primary' onClick={() => { if (OTP.length !== 4) { alertActions.error("Fill OTP First"); } else { userActions.verifyRegisterOtp(OTP) } }}>
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

export default AccountConfirm;
