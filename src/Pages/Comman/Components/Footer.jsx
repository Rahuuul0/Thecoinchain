import * as React from 'react';
import {Box , Grid, Container, Typography, Link ,Stack,TextField, Button  } from '@mui/material';

import Logo from "../../../../public/assets/images/cglogo.svg";
import {Twitter, Instagram, EmailOutlined} from '@mui/icons-material';


const Footer = () => {
  return (<>
    <footer className="footer" style={{ backgroundColor: '#3B3B3B', color: '#fff' }}>
      <Container>
      <Box paddingBottom={5} paddingTop={5}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}   paddingBottom={3}>
       
          <Grid item xs={2} sm={4} md={4} >
          <Typography
            variant="h5"
            component="div"
            fontWeight="700"
            paddingBottom={4}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
          > <img className='logo-cg' src={Logo} /> CoinGuru
          </Typography>   

          <Box className="quick-links">
            <Stack spacing={2}>
              <Link  href="#">Contacts</Link>
              <Link  href="#">Privacy Policy</Link>  
              <Link  href="#">Disclaimer</Link>
              <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{paddingBottom: 3, paddingTop: 2}}
              > Join our community
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 1 }}
              >
              <Link  href="#"><Twitter/></Link>
              <Link  href="#"><Instagram/></Link>
              </Stack> 
              </Box> 
            </Stack>
          </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
            <Typography
            variant='h5'
            component="div"   
            fontWeight="700"
            paddingBottom={4}>
              Explore 
            </Typography>
            <Box className="quick-links">
              <Stack spacing={2}>
                <Link  href="#">Price Forecast</Link>
                <Link  href="#">Guides & Analysis</Link>  
                <Link  href="#">Master Courses</Link>
                <Link  href="#">News & Promotions</Link>  
                <Link  href="#">Subscriptions</Link>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
          <Typography
            variant='h5'
            component="div"
            paddingBottom={4}
            fontWeight="700"
            >Be the first to know about cryptocurrencies analysis daily! 
          </Typography>
          <Typography
            variant='body1'
            component="div"
            className='para-gray'
          >
          Get cryptocurrencies price prediction with analysis and straight to your inbox.
          </Typography>
            <Grid container marginTop={3} paddingTop={0} paddingBottom={0} className='bg-white border-rounded'>        
            <Grid item xs={6} sm={6} md={6} className="footer-subs-form">
           
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
                className="form-control"  />
            </Grid>
            <Grid item xs={6} sm={6} md={6} className="footer-subs-form">
                <Button fullWidth variant="outlined" startIcon={<EmailOutlined />}>Subscribe</Button>
            </Grid>
            </Grid>
         
          </Grid>
       
      </Grid>
      <hr/>
 <Box className="copyright-text">     <Typography
        variant='body2'
        paddingTop={5}
        paddingBottom={3}
        sx={{textAlign: 'center'}}
      >
      © 2018-2023 coinguru.org. All rights reserved
      </Typography>
      <Typography
        variant='body2'
        paddingBottom={3}
        sx={{textAlign: 'center'}}
      >
   The usage of this website constitutes acceptance of the following legal information. Any contracts of financial instruments offered to conclude bear high risks and may result in the full loss of the deposited funds. Prior to making transactions one should get acquainted with the risks to which they relate. All the information featured on the website, including information about the cryptocurrencies and bitcoin is intended solely for informational purposes, is not a means of advertising them, and doesn't imply direct instructions for investing. coinguru.org shall not be liable for any loss, including unlimited loss of funds, which may arise directly or indirectly from the usage of this information. The editorial staff of the website does not bear any responsibility whatsoever for the content of the comments or reviews made by the site users about cryptocurrencies. The entire responsibility for the contents rests with the authors. Reprint of the materials is available only with the permission of the editorial staff.
      </Typography>
      </Box>
      </Box>
      </Container>
    </footer>
  </>
  );
};

export default Footer;
