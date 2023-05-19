import * as React from 'react';
import { Box, Grid, Container, Typography, Link, Stack, TextField, Button, } from '@mui/material';

import Logo from "../../../../public/assets/images/logo-light.svg";
import Darklogo from "../../../../public/assets/images/cg.svg";
import BehanceIcon from "../../../../public/assets/images/icons/behance.svg";
import FacebookIcon from "../../../../public/assets/images/icons/facebook.svg";
import InstagramIcon from "../../../../public/assets/images/icons/instagram.svg";
import DribbbleIcon from "../../../../public/assets/images/icons/dribbble.svg";
import TwitterIcon from "../../../../public/assets/images/icons/twitter.svg";
import { Twitter, Instagram, EmailOutlined, East, ArrowForward } from '@mui/icons-material';


const Footer = () => {
  return (<>
    <footer className="footer" style={{ backgroundColor: '#FCFCFD', color: '#fff' }}>
      <Container>
        <Box paddingTop={5}>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} sx={{ justifyContent: 'space-between' }}>

            <Grid item xs={12} sm={12} md={2} paddingTop={4} paddingBottom={4} >
              <Typography
                variant="h5"

                fontWeight="700"
                paddingBottom={4}
                sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' } }}
              > <img className='logo-cg' src={Darklogo} />
              </Typography>


            </Grid>

            <Grid item xs={12} sm={12} md={3} sx={{ borderRight: '1px solid #E6E8EC', }} paddingLeft={5} paddingRight={5} paddingTop={4} paddingBottom={4} >

              <Box className="quick-links">
                <Stack spacing={2}>
                  <Link href="#">Contacts</Link>
                  <Link href="#">Privacy Policy</Link>
                  <Link href="#">Terms of use</Link>
                  <Link href="#">Disclaimer </Link>
                  <Link href="#">Join our community</Link>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ borderRight: '1px solid #E6E8EC', }} paddingLeft={5} paddingRight={5} paddingTop={4} paddingBottom={4} >
              <Box className="quick-links">
                <Stack spacing={2}>
                  <Link href="#">Price Forecast</Link>
                  <Link href="#">Guides & Analysis</Link>
                  <Link href="#">Academy</Link>
                  <Link href="#">News & Promotions</Link>
                  <Link href="#">Subscriptions</Link>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3} paddingLeft={5} paddingTop={4} paddingBottom={4} >
              <Typography
                variant='h5'

                paddingBottom={4}
                fontWeight="700"
                color="#23262F"
              >Be the first to know
              </Typography>
              <Typography
                variant='body1'

                className='para-gray'
                color="#23262F"
              >Crypto currency forecast and analysis straight to your inbox! No b.s.! the first to know
              </Typography>
              <Grid container marginTop={3} paddingTop={0} paddingBottom={0} className='bg-white border-rounded' sx={{ alignItems: 'center' }}>
                <Grid item xs={12} sm={10} md={10} className="footer-subs-form">

                  <TextField
                    margin="0"
                    required
                    fullWidth
                    type='email'
                    id="email"
                    // label="Enter your email here"
                    placeholder='Enter your email here'
                    name="email"
                    autoComplete="off"
                    size="small"
                    autoFocus
                    className="form-control" />
                </Grid>
                <Grid item xs={12} sm={2} md={2} className="footer-subs-form">
                  <Button variant="outlined" ><ArrowForward /></Button>
                </Grid>
              </Grid>

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
