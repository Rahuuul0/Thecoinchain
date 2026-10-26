import * as React from 'react';

import { Box, Grid, Container, Typography, Link, Stack, TextField, InputAdornment, IconButton, Button, Tooltip } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { useFooterActions } from '../../../_actions';
import { useAlertActions } from '../../../_actions/alert.actions';
import { RoutesName } from '../../../_common/app.constants';
import { loaderAtom, setLogoListAtom, switchDarkModeAtom } from '../../../_state';
import * as Yup from "yup";
import Darklogo from "../../../../public/assets/images/cg.svg";
import BehanceIcon from "../../../../public/assets/images/icons/behance.svg";
import FacebookIcon from "../../../../public/assets/images/icons/facebook.svg";
import InstagramIcon from "../../../../public/assets/images/icons/instagram.svg";
import XIcon from "../../../../public/assets/images/icons/x.svg";
import MailIcon from "../../../../public/assets/images/icons/mail.svg";
import LocationIcon from "../../../../public/assets/images/icons/location.svg";
const Footer = () => {
  const useFooterAddActions = useFooterActions()
  const alertActions = useAlertActions();
  const [copiedType, setCopiedType] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const loader = useRecoilValue(loaderAtom);
  const LogoList = useRecoilValue(setLogoListAtom)
  const isDarkMode = useRecoilValue(switchDarkModeAtom);

  // form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email Address is required").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is invalid")
      .email("Email must be a valid email")
      .trim(),
  });

  //yup validation
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset, watch } = useForm(formOptions);
  const { errors } = formState;


  const formData = watch();

  useEffect(() => {
    reset({ email: "" })
    errors.email = "";
  }, [location])

  const handleFormSubmit = (data) => {
    setTimeout(() => { reset({ email: " " }) }, 2000)
    return useFooterAddActions.add(data);

  }

  const handleCopy = (e, text, type, successMsg) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopiedType(type);
    alertActions.success(successMsg);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const headerLogo = LogoList?.find(
    (item) => item.position === "Header"
  );

  const footerLogo = LogoList?.find(
    (item) => item.position === "Footer"
  );

  const selectedLogo = isDarkMode ? headerLogo : footerLogo;

  const logoSrc = selectedLogo?.image
    ? `${process.env.REACT_APP_IMAGE_URL}/${selectedLogo.image}`
    : selectedLogo?.image_link || "";

  return (<>
    <footer className="footer">
      <Container>
        <Box>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item xs={12} sm={12} md={2.3} lg={2.1} paddingTop={{ xs: 4, sm: 8, md: 8 }} paddingBottom={{ xs: 3, sm: 3, md: 8 }} paddingRight={{ xs: 0, md: 1 }}>
              <Button sx={{ padding: 0, width: { xs: '250px', sm: '250px', md: 'auto' } }} onClick={() => { navigate(RoutesName.User_Dashboard); }}>
                <img
                  src={logoSrc}
                  alt="The Coin Chain"
                  style={{ borderRadius: "15px" }}
                />
              </Button>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2.5 }}>
                <Link
                  className="footer-contact-link"
                  href="mailto:contact@thecoinchain.com"
                  underline="none"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'self-start',
                    gap: 1.25,
                    color: 'var(--secondary-color) !important',
                    textDecoration: 'none !important',
                    transition: 'all 0.25s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'var(--primary-color) !important',
                      textDecoration: 'none !important',
                      '& .contact-icon-box': {
                        borderColor: 'var(--primary-color)',
                        backgroundColor: isDarkMode ? 'rgba(55, 114, 255, 0.15)' : 'rgba(55, 114, 255, 0.08)',
                        transform: 'translateY(-1px)',
                      },
                      '& .contact-icon-img': {
                        filter: 'brightness(0) saturate(100%) invert(35%) sepia(85%) saturate(2250%) hue-rotate(213deg) brightness(101%) contrast(101%)',
                      },
                    },
                  }}
                >
                  <Tooltip
                    title={copiedType === 'email' ? "Copied!" : "Click to copy email"}
                    arrow
                    placement="top"
                  >
                    <Box
                      className="contact-icon-box"
                      onClick={(e) => handleCopy(e, "contact@thecoinchain.com", "email", "Email address copied to clipboard!")}
                      role="button"
                      aria-label="Copy email address"
                      sx={{
                        width: 28,
                        height: 28,
                        minWidth: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#F4F5F6',
                        border: '1px solid',
                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'var(--footer-border)',
                        transition: 'all 0.25s ease-in-out',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <img
                        src={MailIcon}
                        alt="Email"
                        className="contact-icon-img"
                        style={{ width: 14, height: 14, transition: 'all 0.25s ease-in-out', display: 'block' }}
                      />
                    </Box>
                  </Tooltip>
                  <Typography
                    component="span"
                    className="contact-text"
                    sx={{
                      fontSize: '16px',
                      fontWeight: 500,
                      transition: 'color 0.25s ease-in-out',
                      wordBreak: 'break-all',
                    }}
                  >
                    contact@thecoinchain.com
                  </Typography>
                </Link>

                <Link
                  className="footer-contact-link"
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'self-start',
                    gap: 1.25,
                    color: 'var(--secondary-color) !important',
                    textDecoration: 'none !important',
                    transition: 'all 0.25s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'var(--primary-color) !important',
                      textDecoration: 'none !important',
                      '& .contact-icon-box': {
                        borderColor: 'var(--primary-color)',
                        backgroundColor: isDarkMode ? 'rgba(55, 114, 255, 0.15)' : 'rgba(55, 114, 255, 0.08)',
                        transform: 'translateY(-1px)',
                      },
                      '& .contact-icon-img': {
                        filter: 'brightness(0) saturate(100%) invert(35%) sepia(85%) saturate(2250%) hue-rotate(213deg) brightness(101%) contrast(101%)',
                      },
                    },
                  }}
                >
                  <Tooltip
                    title={copiedType === 'address' ? "Copied!" : "Click to copy address"}
                    arrow
                    placement="top"
                  >
                    <Box
                      className="contact-icon-box"
                      onClick={(e) => handleCopy(e, "Dubai Digital Park - Nadd Hessa - Dubai Silicon Oasis - Dubai - United Arab Emirates", "address", "Address copied to clipboard!")}
                      role="button"
                      aria-label="Copy address"
                      sx={{
                        width: 28,
                        height: 28,
                        minWidth: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#F4F5F6',
                        border: '1px solid',
                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'var(--footer-border)',
                        transition: 'all 0.25s ease-in-out',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <img
                        src={LocationIcon}
                        alt="Location"
                        className="contact-icon-img"
                        style={{ width: 14, height: 14, transition: 'all 0.25s ease-in-out', display: 'block' }}
                      />
                    </Box>
                  </Tooltip>
                  <Typography
                    component="span"
                    className="contact-text"
                    sx={{
                      fontSize: '16px',
                      fontWeight: 500,
                      transition: 'color 0.25s ease-in-out',
                      lineHeight: 1.3,
                    }}
                  >
                    Dubai Digital Park - Nadd Hessa - Dubai Silicon Oasis - Dubai - United Arab Emirates
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              md={1.6}
              lg={1.6}
              className='footer-col'
              paddingLeft={{ xs: 1.5, sm: 2, md: 1.5, lg: 2 }}
              paddingRight={{ xs: 1.5, sm: 2, md: 0.5, lg: 1 }}
              paddingTop={{ xs: 3, sm: 3, md: 8 }}
              paddingBottom={{ xs: 3, sm: 3, md: 8 }}
            >
              <Typography
                variant='h6'
                paddingBottom={3}
                fontWeight="700"
                textTransform='uppercase'
                fontSize='16px !important'
                fontFamily="var(--secondary-font) !important"
              >
                News
              </Typography>
              <Box className="quick-links">
                <Stack spacing={2} sx={{ '& a': { whiteSpace: { lg: 'nowrap' } } }}>
                  <RouterLink to={RoutesName.Latest_News}>Latest News</RouterLink>
                  <RouterLink to={RoutesName.Bitcoin}>Bitcoin</RouterLink>
                  <RouterLink to={RoutesName.Ethereum}>Ethereum</RouterLink>
                  <RouterLink to={RoutesName.Altcoin}>Altcoin</RouterLink>
                  <RouterLink to={RoutesName.Global_News}>Global News</RouterLink>
                </Stack>
              </Box>
            </Grid>

            <Grid
              item
              xs={6}
              sm={3}
              md={2.1}
              lg={2.1}
              className='footer-col'
              paddingLeft={{ xs: 1.5, sm: 2, md: 1.5, lg: 2 }}
              paddingRight={{ xs: 1.5, sm: 2, md: 0.5, lg: 1 }}
              paddingTop={{ xs: 3, sm: 3, md: 8 }}
              paddingBottom={{ xs: 3, sm: 3, md: 8 }}
            >
              <Typography
                variant='h6'
                paddingBottom={3}
                fontWeight="700"
                textTransform='uppercase'
                fontSize='16px !important'
                fontFamily="var(--secondary-font) !important"
              >
                Analysis
              </Typography>
              <Box className="quick-links">
                <Stack spacing={2} sx={{ '& a': { whiteSpace: { lg: 'nowrap' } } }}>
                  <RouterLink to={RoutesName.Price_Prediction}>Price Analysis</RouterLink>
                  <RouterLink to={RoutesName.Crypto_Stock_Price_Prediction}>Stock Price Analysis</RouterLink>
                  <RouterLink to={RoutesName.Bitcoin_Analysis}>Bitcoin Analysis</RouterLink>
                  <RouterLink to={RoutesName.Ethereum_Analysis}>Ethereum Analysis</RouterLink>
                  <RouterLink to={RoutesName.Memecoin_Analysis}>Memecoin Analysis</RouterLink>
                </Stack>
              </Box>
            </Grid>

            <Grid
              item
              xs={6}
              sm={3}
              md={1.6}
              lg={1.6}
              className='footer-col'
              paddingLeft={{ xs: 1.5, sm: 2, md: 1.5, lg: 2 }}
              paddingRight={{ xs: 1.5, sm: 2, md: 0.5, lg: 1 }}
              paddingTop={{ xs: 3, sm: 3, md: 8 }}
              paddingBottom={{ xs: 3, sm: 3, md: 8 }}
            >
              <Typography
                variant='h6'
                paddingBottom={3}
                fontWeight="700"
                textTransform='uppercase'
                fontSize='16px !important'
                fontFamily="var(--secondary-font) !important"
              >
                Information
              </Typography>
              <Box className="quick-links">
                <Stack spacing={2} sx={{ '& a': { whiteSpace: { lg: 'nowrap' } } }}>
                  <RouterLink to={RoutesName.Explain}>Explain</RouterLink>
                  <RouterLink to={RoutesName.Finance}>Finance</RouterLink>
                  <RouterLink to={RoutesName.Press_Release}>Press Release</RouterLink>
                </Stack>
              </Box>
            </Grid>

            <Grid
              item
              xs={6}
              sm={3}
              md={1.9}
              lg={1.9}
              className='footer-col'
              paddingLeft={{ xs: 1.5, sm: 2, md: 1.5, lg: 2 }}
              paddingRight={{ xs: 1.5, sm: 2, md: 0.5, lg: 1 }}
              paddingTop={{ xs: 3, sm: 3, md: 8 }}
              paddingBottom={{ xs: 3, sm: 3, md: 8 }}
            >
              <Typography
                variant='h6'
                paddingBottom={3}
                fontWeight="700"
                textTransform='uppercase'
                fontSize='16px !important'
                fontFamily="var(--secondary-font) !important"
              >
                Contact
              </Typography>
              <Box className="quick-links">
                <Stack spacing={2} sx={{ '& a': { whiteSpace: { lg: 'nowrap' } } }}>
                  <RouterLink to={RoutesName.Contact_Us}>Contact Us</RouterLink>
                  <RouterLink to={RoutesName.Privacy_Policy}>Privacy Policy</RouterLink>
                  <RouterLink to={RoutesName.Terms_of_Use}>Terms of Use</RouterLink>
                  <RouterLink to={RoutesName.Disclaimer}>Disclaimers</RouterLink>
                </Stack>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={2.5}
              lg={2.7}
              className='footer-col'
              paddingLeft={{ xs: 1.5, sm: 2, md: 2, lg: 3 }}
              paddingTop={{ xs: 3, sm: 3, md: 8 }}
              paddingBottom={{ xs: 3, sm: 3, md: 8 }}
            >
              <Box
                noValidate
                component="form"
                className='newsletter-form'
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <Typography
                  variant='h6'

                  paddingBottom={4}
                  fontWeight="700"
                  textTransform='uppercase'
                  fontSize='16px !important'
                  fontFamily="var(--secondary-font) !important"
                >Be the first to know
                </Typography>
                <Typography
                  variant='body1'
                  className='body-caption'
                >Crypto currency forecast and analysis straight to your inbox! No b.s.!
                </Typography>

                <TextField
                  // label="email"
                  className="form-control rounded-input"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  placeholder='Enter your email here'
                  name="email"
                  autoComplete="off"
                  size="small"
                  {...register("email")}
                  onChange={(e) => reset({ ...formData, email: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}

                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type='submit'
                          disabled={loader}
                          variant="outlined"  >
                          <ArrowRightAlt />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div style={{ color: "red" }}>{errors.email?.message}</div>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Container>
      <Container maxWidth='fluid'>
        <Box className='border-bottom' sx={{ my: { xs: 3, sm: 0 } }}>
        </Box>
      </Container>
      <Container>
        <Box>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} paddingBottom={3}>
            <Grid item xs={12} sm={6} md={6} >
              <Box className="copyright-text">
                <Typography
                  variant='body2'
                  paddingTop={3}
                  paddingBottom={3}
                  sx={{ textAlign: 'left' }}
                  className='small-caption'
                >
                  Copyright © 2026 | <b>thecoinchain</b> All rights reserved
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box className="copyright-text social-links" sx={{ py: { xs: 0, sm: 3 }, justifySelf: { xs: 'flex-start', sm: 'flex-end', lg: 'flex-end' }, }} >
                <Stack direction="row" spacing={2} sx={{ justifyContent: { sm: 'right', xs: "left" } }}>
                  <a title='facebook' href="https://www.facebook.com/thecoinchain"><img className='social-icon' src={FacebookIcon} alt="Facebook" /></a>
                  <a title='X' href="https://x.com/thecoinchain01"><img className='social-icon' src={XIcon} alt="X" /></a>
                  <a title='instagram' href="https://www.instagram.com/thecoinchain01/"><img className='social-icon' src={InstagramIcon} alt="Instagram" /></a>
                  <a title='behance' href="https://www.behance.net"><img className='social-icon' src={BehanceIcon} /></a>
                </Stack>
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Container>
    </footer>
  </>
  );
};

export default Footer;
