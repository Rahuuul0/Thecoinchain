import * as React from 'react';
import {Box , Grid, Container, Typography} from '@mui/material';

import Logo from "../../../../public/assets/images/cglogo.svg";

const Footer = () => {
  return (<>
    <footer className="footer" style={{ backgroundColor: '#222628', color: '#fff' }}>
      <Container>
      <Box >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
       
          <Grid item xs={2} sm={4} md={4} >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          > <img src={Logo} /> CoinGuru
          </Typography>   
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
            <Typography
            variant='h6'
            component="div">
              Explore 
            </Typography>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
          <Typography
            variant='h6'
            component="div">
                    Be the first to know about cryptocurrencies analysis daily! 
            </Typography>
    
          </Grid>
       
      </Grid>
      </Box>
      </Container>
    </footer>
  </>
  );
};

export default Footer;
