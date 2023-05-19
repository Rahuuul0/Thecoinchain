import * as React from 'react';
import { Link, Grid, Container, Typography, Toolbar, Box, CssBaseline, Button, IconButton, Stack, Tab } from '@mui/material';
import { ArrowCircleDownSharp, KeyboardArrowRight } from '@mui/icons-material';
import HeroImage from "../../../../../public/assets/images/banner.svg";
import Btc from "../../../../../public/assets/images/btc.svg";
import Leveragedv3 from "../../../../../public/assets/images/leveragedv3.svg";
import Leveraged from "../../../../../public/assets/images/leveraged.svg";
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
              <Typography variant='h1' className='hero-heading'>
                Predictive analysis at its best
              </Typography>
              <Typography variant='body2' className='hero-para' paddingBottom={2}>
                we bring clarity to the volatile world of crypto!
              </Typography>
              <Typography paddingBottom={2} >

                <Button variant="contained" color="primary" sx={{ borderRadius: '90px', }}>Contained</Button>
              </Typography>
              <IconButton aria-label="ArrowCircleDown" variant="outlined" color="secondary" padding={0}>
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
              <Stack direction="row" spacing={2} alignItems='center'>
                <Typography className='top-head' fontSize={12}>
                  BTC/USDT
                </Typography>
                <Button variant="contained" className='orange-btn' sx={{ borderRadius: '90px', }}> -0.79%</Button>
              </Stack>
              <Typography variant='h4' component='div' fontSize={24} fontWeight={600}>
                36,641.20
              </Typography>
              <Typography variant='h6' component='div' fontSize={12} fontWeight={400}>
                36,641.20
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} className='gridBox'>
              <img src={Btc} />
              <Stack direction="row" spacing={2} alignItems='center'>
                <Typography className='top-head' fontSize={12}>
                  BTC/USDT
                </Typography>
                <Button variant="contained" className='green-btn' sx={{ borderRadius: '90px', }}> -0.79%</Button>
              </Stack>
              <Typography variant='h4' component='div' fontSize={24} fontWeight={600}>
                36,641.20
              </Typography>
              <Typography variant='h6' component='div' fontSize={12} fontWeight={400}>
                36,641.20
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} className='gridBox'>
              <img src={Btc} />
              <Stack direction="row" spacing={2} alignItems='center'>
                <Typography className='top-head' fontSize={12}>
                  BTC/USDT
                </Typography>
                <Button variant="contained" className='green-btn' sx={{ borderRadius: '90px', }}> -0.79%</Button>
              </Stack>
              <Typography variant='h4' component='div' fontSize={24} fontWeight={600}>
                36,641.20
              </Typography>
              <Typography variant='h6' component='div' fontSize={12} fontWeight={400}>
                36,641.20
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} className='gridBox'>
              <img src={Btc} />
              <Stack direction="row" spacing={2} alignItems='center'>
                <Typography className='top-head' fontSize={12}>
                  BTC/USDT
                </Typography>
                <Button variant="contained" className='green-btn' sx={{ borderRadius: '90px', }}> -0.79%</Button>
              </Stack>
              <Typography variant='h4' component='div' fontSize={24} fontWeight={600}>
                36,641.20
              </Typography>
              <Typography variant='h6' component='div' fontSize={12} fontWeight={400}>
                36,641.20
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container>
        <Box paddingTop={3}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={8} md={8}>
              <Typography variant='h3' fontSize={48} fontWeight={700}>
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
              <Box sx={{ borderBottom: 0 }}>
                <TabList onChange={handleChange} aria-label="tabs">
                  <Tab label="All" value="1" />
                  <Tab label="Bitcoin" value="2" />
                  <Tab label="Blockchain" value="3" />
                  <Tab label="Tutorial" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container columnSpacing={{ xs: 1, sm: 4 }}>
                  <Grid item xs={6}>
                    <img src={Leveragedv3} />
                    <Stack direction="row" spacing={2} justifyContent='space-between' paddingTop={3}>
                      <Typography variant='h3' fontSize={32} fontWeight={700}>
                        Leveraged tokens now available
                      </Typography>
                      <Button variant="outline" className='btn btn-outline' endIcon={<KeyboardArrowRight />} sx={{ border: '1px solid #E6E8EC', height: '50px', whiteSpace: 'nowrap' }}>Learn more</Button>
                    </Stack>
                    <Typography fontSize={16} paddingTop={2}>Good things come in 3s. Get 3x Leveraged tokens now.</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container columnSpacing={{ xs: 1, sm: 4 }}>
                      <Grid item xs={6} display='flex' flexDirection='coloum' justifyContent='space-between'>
                        <Stack spacing={2} justifyContent='space-between'>
                          <Typography fontSize={16}>
                            Leveraged tokens now available
                          </Typography>
                          <Typography fontSize={16}>
                            Good things come in 3s. Get 3x Leveraged tokens now.
                          </Typography>
                        </Stack>
                        <Typography fontSize={14} fontWeight={400}>
                          Jun 1, 2021
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <img src={Leveraged} />
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
    </>
  );
}

export default Home;