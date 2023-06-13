import * as React from 'react';

import { Box, Grid, Container, Typography, Link, Stack, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { useFooterActions } from '../../../_actions';
import * as Yup from "yup";
import Darklogo from "../../../../public/assets/images/cg.svg";
import BehanceIcon from "../../../../public/assets/images/icons/behance.svg";
import FacebookIcon from "../../../../public/assets/images/icons/facebook.svg";
import InstagramIcon from "../../../../public/assets/images/icons/instagram.svg";
import DribbbleIcon from "../../../../public/assets/images/icons/dribbble.svg";
import TwitterIcon from "../../../../public/assets/images/icons/twitter.svg";
import { FooterAddAtom } from '../../../_state';


const Footer = () => {
  const useFooterAddActions = useFooterActions()
  const navigate = useNavigate();
  const [addAtomError, setAddError] = useRecoilState(FooterAddAtom);

  // form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email")
      .trim()
      .required("Email Address is required"),
  });

  //yup validation
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset, watch } = useForm(formOptions);
  const { errors } = formState;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formData = watch();

  useEffect(() => {
    if (addAtomError)
      setIsSubmitting(false)
  }, [addAtomError])

  const handleFormSubmit = (data) => {
    setIsSubmitting(true)
    setAddError(false)
    return useFooterAddActions.add(data);
  }

  return (<>
    <footer className="footer" style={{ backgroundColor: '#FCFCFD', color: '#fff' }}>
      <Container>
        <Box paddingTop={5}>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Grid item xs={12} sm={12} md={2} paddingTop={4} paddingBottom={4} >
              <Button onClick={() => { navigate("/"); }}
              > <img className='logo-cg' src={Darklogo} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ borderRight: '1px solid #E6E8EC' }} paddingLeft={{ md: 5, sm: 2 }} paddingRight={{ md: 5, sm: 2 }} paddingTop={{ md: 4, sm: 3 }} paddingBottom={{ md: 4, sm: 3 }} >
              <Box className="quick-links">
                <Stack spacing={2}>
                  <Link href="#" onClick={() => { navigate("/contact") }}>Contacts</Link>
                  <Link href="#" onClick={() => { navigate("./privacy-policy") }}>Privacy Policy</Link>
                  <Link href="#" onClick={() => { navigate("./terms-of-use") }}>Terms of use</Link>
                  <Link href="#" onClick={() => { navigate("./disclaimer") }}>Disclaimer </Link>
                  <Link href="#" onClick={() => { navigate("./community") }}>Join our community</Link>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ borderRight: '1px solid #E6E8EC', }} paddingLeft={{ md: 5, sm: 2 }} paddingRight={{ md: 5, sm: 2 }} paddingTop={{ md: 4, sm: 3 }} paddingBottom={{ md: 4, sm: 3 }}  >
              <Box className="quick-links">
                <Stack spacing={2}>
                  <Link href="#" onClick={() => { navigate("./prediction-dashboard") }}>Price Forecast</Link>
                  <Link href="#" onClick={() => { navigate("./guides-analysis") }}>Guides & Analysis</Link>
                  <Link href="#" onClick={() => { navigate("./academy") }}>Academy</Link>
                  <Link href="#" onClick={() => { navigate("./news-promotions") }}>News & Promotions</Link>
                  <Link href="#" onClick={() => { navigate("./subscription") }}>Subscriptions</Link>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3} paddingLeft={{ md: 5, sm: 2 }} paddingTop={{ md: 4, sm: 3 }} paddingBottom={{ md: 4, sm: 3 }} >
              <Box
                noValidate
                component="form"
                sx={{ mt: '24px' }}
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <Typography
                  variant='h6'

                  paddingBottom={4}
                  fontWeight="700"
                  color="#23262F"
                  textTransform='uppercase'
                  fontSize='16px !important'
                  fontFamily="var(--secondary-font) !important"
                >Be the first to know
                </Typography>
                <Typography
                  variant='body1'

                  className='para-gray body-caption'
                  color="#23262F"
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
                          disabled={isSubmitting}
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
        <Box className='border-bottom'>

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
              <Box className="copyright-text social-links" paddingTop={3}
                paddingBottom={3} >
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'right' }}>
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
