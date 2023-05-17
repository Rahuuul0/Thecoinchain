import * as React from 'react';
import { Link, Grid, Container, Typography, Toolbar, Box, CssBaseline, Button, IconButton, Stack, Tab } from '@mui/material';
import { ArrowCircleDownSharp,KeyboardArrowRight } from '@mui/icons-material';
import HeroImage from "../../../../../public/assets/images/banner.svg";
import Btc from "../../../../../public/assets/images/btc.svg";
import Leveragedv3 from "../../../../../public/assets/images/leveragedv3.svg";
import Leveraged from "../../../../../public/assets/images/leveraged.svg";
import Leveragedv2 from "../../../../../public/assets/images/leveragedv2.svg";
import Leveragedv1 from "../../../../../public/assets/images/leveragedv1.svg";
import BuyCypto from "../../../../../public/assets/images/buyCypto.svg";
import Market from "../../../../../public/assets/images/market.svg";
import LearnCypto from "../../../../../public/assets/images/learn-cypto.svg";
import Appleicon from "../../../../../public/assets/images/apple.svg";
import InformedCypto from "../../../../../public/assets/images/informed-cypto.svg";
import DarkLogo from "../../../../../public/assets/images/logo.svg";
import BusinessSlider from "../../../../../public/assets/images/businessinsider.svg";
import Finance from "../../../../../public/assets/images/finance.svg";
import Investing from "../../../../../public/assets/images/investing.svg";
import kasobu from "../../../../../public/assets/images/kasobu.svg";
import Coindesk from "../../../../../public/assets/images/coindesk.svg";
import CT from "../../../../../public/assets/images/ct.svg";
import South from "../../../../../public/assets/images/south.svg";
import Globe from "../../../../../public/assets/images/globe.svg";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const Home = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box component="main" sx={{ pt: 8 }}>

      </Box>
      {/* Banner starts */}
      <Container>
        <Box>
          <Grid container sx={{ alignItems: 'center' }}>
            <Grid item xs={12} sm={6} md={6} paddingRight={8}>
              <Typography variant='h1' component="div" className='hero-heading primary-color'>
                Predictive analysis at its best
              </Typography>
              <Typography variant='body2' component="div" className='hero-para secondary-color' paddingBottom={2}>
                we bring clarity to the volatile world of crypto!
              </Typography>
              <Typography component="div" paddingBottom={2} >

                <Button variant="contained"  className="btn btn-primary " sx={{ borderRadius: '90px', }}>Get started now</Button>
              </Typography>
              <IconButton aria-label="ArrowCircleDown" variant="outlined" color="secondary-color" padding={0}>
                <ArrowCircleDownSharp />
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <img className='heroImage' src={HeroImage} />
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* Banner Ends */}
      <Container>
        <Box>
          <Grid container spacing={4} sx={{ alignItems: 'center' }} backgroundColor='#F4F5F6' padding={3} borderRadius={6}>
            <Grid item xs={12} sm={3} md={3} className='gridBox'>
              <img src={Btc} />
              <Stack direction="row" spacing={2} alignItems='center' paddingTop={1} paddingBottom={1}>
                <Typography className='top-head' fontSize={12}>
                  BTC/USDT
                </Typography>
                <Button variant="contained" className='orange-btn' sx={{ borderRadius: '90px', }}> -0.79%</Button>
              </Stack>
              <Typography variant='h4' component='div' fontSize={24} fontWeight={600} paddingBottom={1} className='primary-font'>
                36,641.20
              </Typography>
              <Typography variant='h6' component='div' fontSize={12} fontWeight={400} className='primary-font'>
                36,641.20
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} className='gridBox'>
              <img src={Btc} />
              <Stack direction="row" spacing={2} alignItems='center' paddingTop={1} paddingBottom={1}>
                <Typography className='top-head' fontSize={12}>
                  BTC/USDT
                </Typography>
                <Button variant="contained" className='green-btn' sx={{ borderRadius: '90px', }}> -0.79%</Button>
              </Stack>
              <Typography variant='h4' component='div' fontSize={24} fontWeight={600} paddingBottom={1} className='primary-font'>
                36,641.20
              </Typography>
              <Typography variant='h6' component='div' fontSize={12} fontWeight={400} className='primary-font'>
                36,641.20
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} className='gridBox'>
              <img src={Btc} />
              <Stack direction="row" spacing={2} alignItems='center' paddingTop={1} paddingBottom={1}>
                <Typography className='top-head' fontSize={12}>
                  BTC/USDT
                </Typography>
                <Button variant="contained" className='green-btn' sx={{ borderRadius: '90px', }}> -0.79%</Button>
              </Stack>
              <Typography variant='h4' component='div' fontSize={24} fontWeight={600} paddingBottom={1} className='primary-font'>
                36,641.20
              </Typography>
              <Typography variant='h6' component='div' fontSize={12} fontWeight={400} className='primary-font'>
                36,641.20
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} className='gridBox'>
              <img src={Btc} />
              <Stack direction="row" spacing={2} alignItems='center' paddingTop={1} paddingBottom={1}>
                <Typography className='top-head' fontSize={12}>
                  BTC/USDT
                </Typography>
                <Button variant="contained" className='green-btn' sx={{ borderRadius: '90px', }}> -0.79%</Button>
              </Stack>
              <Typography variant='h4' component='div' fontSize={24} fontWeight={600} paddingBottom={1} className='primary-font'>
                36,641.20
              </Typography>
              <Typography variant='h6' component='div' fontSize={12} fontWeight={400} className='primary-font'>
                36,641.20
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container>
        <Box paddingTop={12}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={8} md={8}>
              <Typography variant='h3' fontSize={48} fontWeight={700} className='secondary-font'>
                Learn crypto
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4} textAlign='right'>
              <Button variant="outlined" sx={{ borderRadius: '90px' }}>View more</Button>
            </Grid>
          </Grid>

          {/* tabs starts */}
          <Box className="learn-cypto-tab" sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={handleChange} aria-label="tabs">
                  <Tab label="All" value="1" />
                  <Tab label="Bitcoin" value="2" />
                  <Tab label="Blockchain" value="3" />
                  <Tab label="Tutorial" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{paddingRight:'0', paddingLeft:'0'}} >
              <Grid container columnSpacing={{ xs: 1, sm:4 }}>
                  <Grid item xs={6}>
                     <img src={Leveragedv3} />
                     <Stack direction="row" spacing={2} justifyContent='space-between' paddingTop={3}>
                      <Box>
                      <Typography variant='h3' component="div" fontSize={32} fontWeight={700} className='secondary-font'>
                      Leveraged tokens now available
                      </Typography>
                      <Typography fontSize={16} component="div" paddingTop={2} paddingBottom={2} className='secondary-color primary-font'>Good things come in 3s. Get 3x Leveraged tokens now.</Typography>
                      </Box>
                      <Button variant="outline" className='btn btn-outline' endIcon={ <KeyboardArrowRight/>} sx={{ border:'1px solid #E6E8EC',    height: '50px',whiteSpace:'nowrap'}}>Learn more</Button>
                    </Stack>
                     </Grid>
                  <Grid item xs={6}>
                    <Grid container columnSpacing={{ xs: 1, sm:4 }} className='flex-between-box' marginBottom={3} >
                      <Grid item xs={6} paddingRight={3}>
                      <Stack spacing={2} justifyContent='space-between'>
                        <Typography fontSize={16}>
                          Leveraged tokens now available
                        </Typography>
                        <Typography fontSize={16} className='secondary-color'>
                          Good things come in 3s. Get 3x Leveraged tokens now.
                        </Typography>
                      </Stack>
                      <Typography fontSize={14} fontWeight={400} className='secondary-color'>
                         Jun 1, 2021
                      </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <img src={Leveraged}/>
                      </Grid>
                    </Grid>

                    {/* 1st box end */}

                    <Grid container columnSpacing={{ xs: 1, sm:4 }} className='flex-between-box' marginBottom={3} >
                      <Grid item xs={6} paddingRight={3}>
                      <Stack spacing={2} justifyContent='space-between'>
                        <Typography fontSize={16}>
                          Leveraged tokens now available
                        </Typography>
                        <Typography fontSize={16} className='secondary-color'>
                          Good things come in 3s. Get 3x Leveraged tokens now.
                        </Typography>
                      </Stack>
                      <Typography fontSize={14} fontWeight={400} className='secondary-color'>
                         Jun 1, 2021
                      </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <img src={Leveragedv2}/>
                      </Grid>
                    </Grid>

                    {/* 2nd box end */}

                    <Grid container columnSpacing={{ xs: 1, sm:4 }} className='flex-between-box' marginBottom={3} >
                      <Grid item xs={6} paddingRight={3}>
                      <Stack spacing={2} justifyContent='space-between'>
                        <Typography fontSize={16}>
                          Leveraged tokens now available
                        </Typography>
                        <Typography fontSize={16} className='secondary-color'>
                          Good things come in 3s. Get 3x Leveraged tokens now.
                        </Typography>
                      </Stack>
                      <Typography fontSize={14} fontWeight={400} className='secondary-color'>
                         Jun 1, 2021
                      </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <img src={Leveraged}/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">Bitcoin</TabPanel>
              <TabPanel value="3">Blockchain</TabPanel>
              <TabPanel value="4">Tutorial</TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Container>

      {/* learn cypto star*/}

      <Container maxWidth='fluid' className='' sx={{backgroundColor: '#F4F5F6'}} >
        <Container>
          <Box paddingTop={5} paddingBottom={5} >
            <Typography variant='h2' component="div" className='primary-font' textAlign='center' sx={{fontWeight: '700'}}>Become a crypto <br/>trader in seconds</Typography>
            <Typography className='secondary-color' textAlign='center' paddingTop={3} paddingBottom={4}>We've got everything you need to start trading.</Typography>
            <Box paddingBottom={6}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={4} >
                  <Box textAlign='center' className='grid-cypto-trade'>
                    <img src={BuyCypto} paddingBottom={3}/>
                    <Typography variant='h6' paddingBottom={3}>Buy & Sell Crypto</Typography>
                    <Typography className='secondary-color' paddingBottom={3}>
                    We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                    </Typography>
                    <Button className='btn btn-outlined-secondary' sx={{margin:'0 auto'}}>Buy crypto</Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} >
                  <Box textAlign='center' className='grid-cypto-trade'>
                    <img src={Market} paddingBottom={3}/>
                    <Typography variant='h6' paddingBottom={3}>Trade Assets</Typography>
                    <Typography className='secondary-color' paddingBottom={3}>
                    We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                    </Typography>
                    <Button className='btn btn-outlined-secondary' sx={{margin:'0 auto'}}>Trade now</Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} >
                  <Box textAlign='center' className='grid-cypto-trade'>
                    <img src={LearnCypto} paddingBottom={3}/>
                    <Typography variant='h6' paddingBottom={3}>Learn crypto</Typography>
                    <Typography className='secondary-color' paddingBottom={3}>
                    We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.
                    </Typography>
                    <Button className='btn btn-outlined-secondary' sx={{margin:'0 auto'}}>Learn now</Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Button sx={{margin: '0 auto', }} variant='contained' className='btn btn-primary'>Contact Us</Button>
          </Box>
        </Container>
      </Container>

      {/* learn cypto end */}

      {/* Informed decision starts*/}
      <Container >
        <Box paddingTop={10} paddingBottom={10}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} sm={6}>
              <Box paddingBottom={5}>
                <Typography variant='h2' fontWeight={700} className='secondary-font'>
                Make informed decisions 
                </Typography>
                <Typography className='secondary-color'>
                with our expert insights and analysis of the crypto market!
                </Typography>
              </Box>
              <Box>
                <Typography className='secondary-color'>
                  App’s
                </Typography>
                <Typography className='' variant='h5' fontSize={24} paddingBottom={5}>
                  Coming soon...
                </Typography>
                <Stack direction="row" spacing={2} sx={{ borderBottom: '1px solid #E6E8EC', paddingBottom: '20px' ,paddingTop: '20px' }} >
                   <img src={Appleicon}/>
                   <Box>
                    <Typography variant='' component='div'  className='body-caption secondary-color'>Download from</Typography>
                    <Typography variant='' component='div' className='body-large '>Appstore</Typography>
                   </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ borderBottom: '1px solid #E6E8EC', paddingBottom: '20px' ,paddingTop: '20px' }} >
                   <img src={Appleicon}/>
                   <Box>
                    <Typography variant='' component='div'  className='body-caption secondary-color'>Download from</Typography>
                    <Typography variant='' component='div' className='body-large '>Google Play</Typography>
                   </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ paddingBottom: '20px' ,paddingTop: '20px' }} >
                   <img src={Appleicon}/>
                   <Box>
                    <Typography variant='' component='div'  className='body-caption secondary-color'>Download from</Typography>
                    <Typography variant='' component='div' className='body-large '>Mac OS</Typography>
                   </Box>
                </Stack>

              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={InformedCypto}/>
            </Grid>
          </Grid>
        </Box>
      </Container>
       {/* Informed decision ends*/}

      {/* section starts */}
      <Container maxWidth='fluid' sx={{backgroundColor: '#F4F5F6'}}>
        <Container>
          <Box  paddingBottom={12} paddingTop={12}>
            <Box textAlign='center' >
              <img src={DarkLogo} />
              <Typography variant='h2' component="div" className='secondary-font' textAlign='center' paddingBottom={3} sx={{fontWeight: '700'}}>Stay in the know on<br/> crypto with coinguru</Typography>
              <Typography className='secondary-color'>A creative agency that lead and inspire</Typography> 
            </Box>
            <Box className='crypto-box'>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={12} sm={6} md={6} paddingRight={6} >               
                      <Typography className='small secondary-color' sx={{textTransform: 'uppercase'}} paddingBottom={3}>Crypto news</Typography>
                      <Typography paddingBottom={3} className='body-large'>Be Part of our Global Community</Typography>
                      <Typography className='secondary-color' paddingBottom={14}>Let’s stay in touch. Join our communities to keep up with the BitCloud team and our traders from across the world.</Typography>
                      <Button className='btn-outlined-secondary'>Join now</Button>
                  </Grid> 
                  <Grid item xs={12} sm={6} md={6} textAlign='right'>
                    <img src={Globe}/>
                  </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Container>
      {/* section ends */}
      {/* how it works section starts */}
        <Container>
          <Box textAlign='center'  paddingBottom={12} paddingTop={12}>
            <Typography variant='h2' component="div" className='secondary-font' textAlign='center' paddingBottom={3} sx={{fontWeight: '700'}}>How it work</Typography>
             <Typography className='secondary-color'>
             Power up your crypto game with our data-driven predictions!
              </Typography> 
          </Box>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={12} sm={3} md={3} >
              <Box textAlign='center' className='howworks-box '>
                <img src={Market} width={96} />
                <Typography className='small secondary-color '  paddingTop={6} paddingBottom={3} textAlign='center'>Step 1</Typography>
                <Typography className='' textAlign='center' fontWeight='500' paddingBottom={3} >Subscribe</Typography>
                <Typography>
                Stacks is a production-ready library of stackable content blocks built in React Native.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} md={3} >
              <Box textAlign='center' className='howworks-box '>
                <img src={Market} width={96} />
                <Typography className='small secondary-color '  paddingTop={6} paddingBottom={3} textAlign='center'>Step 2</Typography>
                <Typography className='' textAlign='center' fontWeight='500' paddingBottom={3} >Connect wallet</Typography>
                <Typography>
                Stacks is a production-ready library of stackable content blocks built in React Native.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} md={3} >
              <Box textAlign='center' className='howworks-box '>
                <img src={Market} width={96} />
                <Typography className='small secondary-color '  paddingTop={6} paddingBottom={3} textAlign='center'>Step 3</Typography>
                <Typography className='' textAlign='center' fontWeight='500' paddingBottom={3} >Start trading</Typography>
                <Typography>
                Stacks is a production-ready library of stackable content blocks built in React Native.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} md={3} >
              <Box textAlign='center' className='howworks-box '>
                <img src={Market} width={96} />
                <Typography className='small secondary-color '  paddingTop={6} paddingBottom={3} textAlign='center'>Step 4</Typography>
                <Typography className='' textAlign='center' fontWeight='500' paddingBottom={3} >Earn money</Typography>
                <Typography>
                Stacks is a production-ready library of stackable content blocks built in React Native.
                </Typography>
              </Box>
            </Grid>
        </Grid>
        </Container>
      {/* how it works section ends */}
      {/* logo slider starts */}
      <Container maxWidth='fluid' >
        <Box paddingTop={8} paddingBottom={8}>
          <Stack direction="row" spacing={8}>
            <img src={BusinessSlider} />
            <img src={Finance} />
            <img src={Investing} />
            <img src={kasobu} />
            <img src={Coindesk} />
            <img src={CT} /> 
            <img src={South}/>
          </Stack>
        </Box>
      </Container>
   {/* logo slider ends */}
    </>
  );
}

export default Home;