import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import OTPInput, { ResendOTP } from "otp-input-react";
import IconButton from "@mui/material/IconButton";
import LogoLight from "../../../public/assets/images/logo-light.svg";
import AuthBg from "../../../public/assets/images/auth-bg.svg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const AccountConfirm = () => {
  const navigate = useNavigate();
  const [radioOption, setRadioOption] = useState("by_email");
  const [switchOption, setSwitchOption] = useState(true);
  const [OTP, setOTP] = useState("");
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
            <Box component="div" className="auth-header-logo">
              <img src={LogoLight} alt="Coin Guru" />
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
                  <Box noValidate component="form" sx={{ mt: "24px" }}>
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
                            label="Get the code by text message (SM) at +1 234 567 890"
                          />
                          <Box component="div" className="devider" />
                          <FormControlLabel
                            value="by_email"
                            control={<Radio />}
                            label="Get the code by email at tranm••••••••••••@gm•••.com"
                          />
                        </RadioGroup>
                      </FormControl>

                      <Button
                        type="submit"
                        variant="contained"
                        className="btn btn-primary"
                        onClick={() => {
                          setSwitchOption(false);
                        }}
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
                        ? "We have sent the code by text message (SM) at +1 234 567 890"
                        : "We have sent the code by email at tranm••••••••••••@gm•••.com"}
                    </Typography>
                  </Box>
                  <Box noValidate component="form" sx={{ mt: "24px" }}>
                    <Box component="div" className="auth-form auth-otp">
                      <TextField
                        autoComplete="off"
                        autoFocus={true}
                        id="otp1"
                        type="number"
                        onKeyDown={(evt) => {
                          if (evt.target.value <= 1) {
                            ["e", "E", "+", "-"].includes(evt.key) &&
                              evt.preventDefault()
                          }
                          else {
                            evt.preventDefault()
                          }
                        }}
                        variant="filled"
                      />
                      <TextField
                        autoComplete="off"
                        id="otp2"
                        type="number"
                        onKeyDown={(evt) => {
                          if (evt.target.value <= 1) {
                            ["e", "E", "+", "-"].includes(evt.key) &&
                              evt.preventDefault()
                          }
                          else {
                            evt.preventDefault()
                          }
                        }}
                        variant="filled"
                      />
                      <TextField
                        autoComplete="off"
                        id="otp3"
                        type="number"
                        onKeyDown={(evt) => {
                          if (evt.target.value <= 1) {
                            ["e", "E", "+", "-"].includes(evt.key) &&
                              evt.preventDefault()
                          }
                          else {
                            evt.preventDefault()
                          }
                        }}
                        variant="filled"
                      />
                      <TextField
                        autoComplete="off"
                        id="otp4"
                        type="number"
                        onKeyDown={(evt) => {
                          if (evt.target.value <= 1) {
                            ["e", "E", "+", "-"].includes(evt.key) &&
                              evt.preventDefault()
                          }
                          else {
                            evt.preventDefault()
                          }
                        }}
                        variant="filled"
                      />
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
