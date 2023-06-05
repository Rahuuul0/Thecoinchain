import * as React from 'react';

import { Box, Grid, Container, Typography, Link, Stack, TextField, InputAdornment, IconButton, Button } from '@mui/material';

import Darklogo from "../../../../public/assets/images/cg.svg";
import BehanceIcon from "../../../../public/assets/images/icons/behance.svg";
import FacebookIcon from "../../../../public/assets/images/icons/facebook.svg";
import InstagramIcon from "../../../../public/assets/images/icons/instagram.svg";
import DribbbleIcon from "../../../../public/assets/images/icons/dribbble.svg";
import TwitterIcon from "../../../../public/assets/images/icons/twitter.svg";
import { ArrowRightAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();

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
            <Grid item xs={12} sm={12} md={3} sx={{ borderRight: '1px solid #E6E8EC', }} paddingLeft={5} paddingRight={5} paddingTop={4} paddingBottom={4} >
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
            <Grid item xs={12} sm={12} md={3} sx={{ borderRight: '1px solid #E6E8EC', }} paddingLeft={5} paddingRight={5} paddingTop={4} paddingBottom={4} >
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
            <Grid item xs={12} sm={12} md={3} paddingLeft={5} paddingTop={4} paddingBottom={4} >
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

                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton variant="outlined"  >
                        <ArrowRightAlt />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />


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
