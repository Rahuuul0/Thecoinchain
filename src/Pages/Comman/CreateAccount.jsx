import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../_common/app.constants";
import {
  Checkbox,
  Container,
  Box,
  TextField,
  Typography,
  Link,
  Button,
  FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useUserActions } from "../../_actions/user.actions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlertActions } from "../../_actions/alert.actions";
import { KeyboardArrowLeft } from "@mui/icons-material/";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as Yup from "yup";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LogoLight from "../../../public/assets/images/logo-light.svg";
import LogoDark from "../../../public/assets/images/logo.svg";
import AuthBg from "../../../public/assets/images/auth-bg.svg";
import AppleIcon from "@mui/icons-material/Apple";
import ReCAPTCHA from "react-google-recaptcha";
import MuiPhoneNumber from "material-ui-phone-number";

import GoogleAuth from "./GoogleAuth.jsx";

const CreateAccount = () => {
    const navigate = useNavigate();
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const [phone, setPhone] = useState('');
    const captchaRef = useRef(null);
    const param = useParams();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email must be a valid email")
            .trim()
            .required("Email Address is required"),
        mobile: Yup.string()
            .required("Mobile Number is required"),
        password: Yup.string()
            .trim()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."),
        confirm_password: Yup.string()
            .trim()
            .required("Confirm Password is required").oneOf(
                [Yup.ref("password"), null],
                "Passwords must match."
            ),
        agree: Yup.bool().oneOf([true], "You must accept the terms and conditions")       
    });
 
  //password eye IconButton
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showCnfrmPassword, setShowCnfrmPassword] = useState(false);

  const handleClickShowCnfrmPassword = () =>
    setShowCnfrmPassword((show) => !show);

  //yup validation
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset, watch } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const formData = watch();
  const SITE_KEY = process.env.REACT_APP_reCAPTCHA_SITE_KEY;
  const handleChange = (value) => {
    console.log("Captcha value:", value);
  };

  // Mobile contry code
  const handlePhone = (newPhone) => {
    setPhone(newPhone);
  };

  const asyncScriptOnLoad = () => {
    console.log("scriptLoad - reCaptcha Ref-");
  };

  const submitForm = () => {
    const token = captchaRef.current.getValue();
    if (token) {
      captchaRef.current.reset();
      return userActions.create(formData);
    } else {
      alertActions.error("reCAPTCHA is mandatory");
    }
  };

  useEffect(() => {
    if (param.id) {
      localStorage.setItem("refToken", param.id);
      navigate("/create-account");
    }
  }, []);

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
                }}
              >
                {" "}
                <img src={LogoLight} alt="Coin Guru" className="desktop" />
              </Link>
              <Link
                onClick={() => {
                  navigate("/");
                }}
              >
                {" "}
                <img src={LogoDark} alt="Coin Guru" className="ipad" />
              </Link>
            </Box>
            <Box className="dont-have-acc">
              <Typography
                component="p"
                position="relative"
                zIndex="2"
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
          <Box className="auth-wrapper-inner">
            <Box className="auth-wrapper-bg">
              <img src={AuthBg} alt="Auth bg" />
            </Box>
            <Box className="auth-wrapper-form" position="relative">
              <Box position="absolute" sx={{ top: "90px" }}>
                <IconButton
                  onClick={() => {
                    navigate("/");
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
              <Box className="auth-wrapper-form-inner">
                <Typography component="h3" variant="h3">
                  Sign up
                </Typography>
                <Box className="open-id">
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
                    Use Your OpenID to Sign up
                  </Typography>
                  <Box component="div" className="open-id-btn-wrapper">
                    <GoogleOAuthProvider
                      clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                    >
                      <GoogleAuth />
                    </GoogleOAuthProvider>
                    <Button
                      variant="contained"
                      className="btn btn-secondary"
                      startIcon={<AppleIcon />}
                    >
                      Apple
                    </Button>
                  </Box>
                </Box>
                <Box className="devider" />
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
                  Or continue with email
                </Typography>
                <Box
                  noValidate
                  component="form"
                  sx={{ mt: "24px" }}
                  onSubmit={handleSubmit(submitForm)}
                >
                  <Box className="auth-form">
                    <TextField
                      label="Email *"
                      className="form-control"
                      type="email"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      placeholder="Email address"
                      name="email"
                      autoComplete="off"
                      size="small"
                      autoFocus
                      {...register("email")}
                      onChange={(e) =>
                        reset({
                          ...formData,
                          email: e.target.value.replace(
                            /\s+/g,
                            e.target.value.length > 1 ? " " : ""
                          ),
                        })
                      }
                    />
                    <div className="frm-message">{errors.email?.message}</div>
                    <MuiPhoneNumber
                      label="Mobile *"
                      className="form-control white-input-box"
                      fullWidth
                      variant="standard"
                      margin="normal"
                      required
                      autoComplete="off"
                      defaultCountry={"us"}
                      value={formData.mobile}
                      onChange={(value) =>
                        reset({ ...formData, mobile: value })
                      }
                    />
                    <div className="frm-message"> {errors.mobile?.message}</div>
                    <TextField
                      margin="normal"
                      required
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      id="password"
                      label="Password *"
                      placeholder="Password"
                      name="password"
                      autoComplete="off"
                      size="small"
                      className="form-control"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? (
                                <VisibilityOutlinedIcon />
                              ) : (
                                <VisibilityOffOutlinedIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      {...register("password")}
                      onChange={(e) =>
                        reset({
                          ...formData,
                          password: e.target.value.replace(
                            /\s+/g,
                            e.target.value.length > 1 ? " " : ""
                          ),
                        })
                      }
                    />
                    <div className="frm-message">
                      {" "}
                      {errors.password?.message}
                    </div>
                    <TextField
                      margin="normal"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      type={showCnfrmPassword ? "text" : "password"}
                      fullWidth
                      id="confirm_password"
                      label="Confirm Password *"
                      placeholder="Confirm Password"
                      name="confirm_password"
                      autoComplete="off"
                      size="small"
                      className="form-control"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowCnfrmPassword}>
                              {showCnfrmPassword ? (
                                <VisibilityOutlinedIcon />
                              ) : (
                                <VisibilityOffOutlinedIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      {...register("confirm_password")}
                      onChange={(e) =>
                        reset({
                          ...formData,
                          confirm_password: e.target.value.replace(
                            /\s+/g,
                            e.target.value.length > 1 ? " " : ""
                          ),
                        })
                      }
                    />
                    <div className="frm-message">
                      {" "}
                      {errors.confirm_password?.message}
                    </div>

                    <FormControlLabel
                      className="auth-checkbox"
                      display="flex"
                      control={<Checkbox {...register("agree")} />}
                      label="* By signing up I agree that I’m 18 <b> years</b> of age or older, to the User Agreements, Privacy Policy, Cookie Policy, E-Sign Consent."
                    />
                    <div className="frm-message"> {errors.agree?.message}</div>
                    <ReCAPTCHA
                      style={{
                        margin: "10px auto",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      theme="light"
                      ref={captchaRef}
                      sitekey={SITE_KEY}
                      onChange={handleChange}
                      asyncScriptOnLoad={asyncScriptOnLoad}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Sign up
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CreateAccount;
