import * as React from 'react';

import { Box, Grid, Container, Typography, Link, Stack, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { useFooterActions } from '../../../_actions';
import { RoutesName } from '../../../_common/app.constants';
import { loaderAtom, setLogoListAtom } from '../../../_state';
import * as Yup from "yup";
import Darklogo from "../../../../public/assets/images/cg.svg";
import BehanceIcon from "../../../../public/assets/images/icons/behance.svg";
import FacebookIcon from "../../../../public/assets/images/icons/facebook.svg";
import InstagramIcon from "../../../../public/assets/images/icons/instagram.svg";
import DribbbleIcon from "../../../../public/assets/images/icons/dribbble.svg";
import TwitterIcon from "../../../../public/assets/images/icons/twitter.svg";

const Footer = () => {
  const useFooterAddActions = useFooterActions()
  const navigate = useNavigate();
  const location = useLocation();
  const loader = useRecoilValue(loaderAtom);
  const LogoList = useRecoilValue(setLogoListAtom);

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

  return (<>
    <footer className="footer">
      <Container>
        <Box>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item xs={12} sm={12} md={2} paddingTop={{ xs: 8, sm: 8, md: 8 }} paddingBottom={{ xs: 3, sm: 3, md: 8 }} >
              <Button sx={{ padding: 0 }} onClick={() => { navigate("/"); }}
              > <img className='coinguru-logo logo-cg' src={LogoList[1]?.image ? `${process.env.REACT_APP_IMAGE_URL}/${LogoList[1]?.image}` : LogoList[1]?.image_link} alt="Coin Guru" />
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={3} className='footer-col' paddingLeft={{ md: 5, sm: 2 }} paddingRight={{ md: 5, sm: 2 }} paddingTop={{ xs: 0, sm: 0, md: 8 }} paddingBottom={{ xs: 3, sm: 3, md: 8 }} >
              <Box className="quick-links">
                <Stack spacing={2}>
                  <RouterLink to={RoutesName.Contact_Us}>Contacts</RouterLink>
                  <RouterLink to={RoutesName.Privacy_Policy}>Privacy Policy</RouterLink>
                  <RouterLink to={RoutesName.Terms_of_Use}>Terms of use</RouterLink>
                  <RouterLink to={RoutesName.Disclaimer}>Disclaimers</RouterLink>
                  <RouterLink to={RoutesName.Community}>Join our community</RouterLink>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3} className='footer-col' paddingLeft={{ md: 5, sm: 2 }} paddingRight={{ md: 5, sm: 2 }} paddingTop={{ xs: 3, sm: 3, md: 8 }} paddingBottom={{ xs: 3, sm: 3, md: 8 }}   >
              <Box className="quick-links">
                <Stack spacing={2}>
                  <RouterLink to={RoutesName.Prediction_Dashboard} >Price Forecast</RouterLink>
                  <RouterLink to={RoutesName.Guides_Analysis} >Guides & Analysis</RouterLink>
                  <RouterLink to={RoutesName.Academy}>Academy</RouterLink>
                  <RouterLink to={RoutesName.News_Promotions}>News & Promotions</RouterLink>
                  <RouterLink to={RoutesName.Subscription}>Subscription</RouterLink>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3} className='footer-col' paddingLeft={{ md: 5, sm: 2 }} paddingTop={{ xs: 3, sm: 3, md: 8 }} paddingBottom={{ xs: 3, sm: 3, md: 8 }}   >
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
                  Copyright © 2023 coinguru.org. All rights reserved
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box className="copyright-text social-links" sx={{ py: { xs: 0, sm: 3 } }} >
                <Stack direction="row" spacing={2} sx={{ justifyContent: { sm: 'right', xs: "left" } }}>
                  <img className='social-icon' src={FacebookIcon} />
                  <img className='social-icon' src={TwitterIcon} />
                  <img className='social-icon' src={InstagramIcon} />
                  <img className='social-icon' src={DribbbleIcon} />
                  <img className='social-icon' src={BehanceIcon} />
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
