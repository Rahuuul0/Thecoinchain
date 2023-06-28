import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../_common/app.constants";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Breadcrumbs,
  InputAdornment,
  TextField,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material/";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from './Components/Sidebar';
import { authAtom } from '../../_state/'
import { useRecoilValue } from "recoil";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const Referrals = () => {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const userDetail = useRecoilValue(authAtom);
  const [personName, setPersonName] = useState([]);
  const [linkCopy, setLinkCopy] = useState(false);
  const [codeCopy, setCodeCopy] = useState(false);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to="/">
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      Referrals
    </Typography>,
  ];

  const handleLink = () => {
    navigator.clipboard.writeText(
      "http://dly1vyq5d0op3.cloudfront.net/create-account/" +
      userDetail.referral_code
    );
    setLinkCopy(true);
    setTimeout(() => {
      setLinkCopy(false);
    }, 3000);
  };
  const handleRefCode = () => {
    navigator.clipboard.writeText(userDetail.referral_code);
    setCodeCopy(true);
    setTimeout(() => {
      setCodeCopy(false);
    }, 3000);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          className="subscription-wrapper bredcrum-div"
          sx={{ mt: 8 }}
        >
          <Container maxWidth="lg">
            <Box className="subscription-wrapper-head">
              <Typography component="h2" variant="h2">
                Referrals
              </Typography>

              <Box className="" sx={{ color: "#777E90", fontWeight: "500", paddingTop: { xs: '10px', md: '0px' } }}>
                <Box>
                  <Breadcrumbs
                    separator={<NavigateNext fontSize="small" />}
                    aria-label="breadcrumb"
                    className="center-breadcrum"
                  >
                    {breadcrumbs}
                  </Breadcrumbs>
                </Box>
              </Box>
            </Box>
          </Container>

          <Box className="subscription-steps account-main">
            <Container maxWidth="lg">
              <Box className="subscription-steps-inner">
                <Sidebar />
                <Box className="subscription-steps-col-details">
                  <Box className="main-box">
                    <Box className="inner-box">
                      <Typography
                        component="h6"
                        variant="h6"
                        className="body-caption"
                        paddingBottom={1}
                      >
                        Total rewards
                      </Typography>
                      <Typography
                        component="h3"
                        variant="h3"
                        className="secondary-font green-span"
                        fontWeight={700}
                        paddingBottom={2}
                      >
                        {userDetail.total_earning !== ""
                          ? Number(userDetail.total_earning)?.toFixed(2) + " "
                          : "0.00"}
                        <span className="green-color secondary-font">USD</span>
                      </Typography>
                      <Typography
                        component="p"
                        variant="p"
                        className="secondary-color small-caption "
                        paddingBottom={3}
                      >
                        You're earning 20% of the subscription plan your
                        <br />
                        referrals pay. Learn more
                      </Typography>
                      <Box
                        className="center-box refferal-form"
                        padding={3}
                        marginY={2}
                        sx={{
                          backgroundColor: "#F1F2F4",
                          borderRadius: "10px",
                        }}
                      >
                        <Typography
                          component="h6"
                          variant="h6"
                          paddingBottom={0}
                          fontWeight={600}
                          className="body-large mobile-body-large"
                        >
                          Invite friends to earn 20%
                        </Typography>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="REFERRAL LINK"
                              className="black-label form-control white-input-box copied-adorement"
                              // InputProps={{
                              //   shrink: true,
                              // endAdornment: (
                              //   <InputAdornment
                              //     sx={{ cursor: "pointer" }}
                              //     onClick={handleLink}
                              //     position="end"
                              //   >
                              //     {linkCopy === true ? "copied" : "copy"}
                              //   </InputAdornment>
                              // ),
                              // }}
                              variant="standard"
                              margin="normal"
                              required
                              fullWidth
                              id="link"
                              // value={
                              //   "http://dly1vyq5d0op3.cloudfront.net/create-account/" +
                              //   userDetail.referral_code
                              // }
                              // placeholder="link"
                              name="link"
                              autoComplete="off"
                              // size="small"
                              disabled
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="REFERRAL CODE"
                              // value={userDetail.referral_code}
                              // InputProps={{
                              //   endAdornment: (
                              //     <InputAdornment
                              //       sx={{ cursor: "pointer" }}
                              //       onClick={handleRefCode}
                              //       position="end"
                              //     >
                              //       {codeCopy === true ? "copied" : "copy"}
                              //     </InputAdornment>
                              //   ),
                              // }}
                              className="black-label form-control white-input-box copied-adorement"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="standard"
                              margin="normal"
                              required
                              fullWidth
                              id="code"
                              // placeholder='Link'
                              name="code"
                              autoComplete="off"
                              disabled
                            // size="small"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Button
                        onClick={() => {
                          navigate("/");
                        }}
                        variant="outlined"
                        sx={{ marginY: "30px" }}
                        className="referrals-btn btn btn-outlined-secondary"
                      >
                        My dashboard
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Referrals;
