import { Container, Typography, Tab, Grid, Box, Stack,Button, MenuItem ,OutlinedInput, FormControl, Select} from '@mui/material'
import React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import VideoImg from "../../../public/assets/images/coinguru-video.svg";
import Blog1 from "../../../public/assets/images/blog-1.svg";
import Avatar from "../../../public/assets/images/avatar.svg";
import GridImage from "../../../public/assets/images/grid.svg";
import { Search , ArrowRightAlt} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import DarkLogo from "../../../public/assets/images/logo.svg";
import Globe from "../../../public/assets/images/globe.svg";

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

const names = [
  'Recent 1',
  'Recent 2',
  'Recent 3',
  'Recent 4',
  'Recent 5',
  'Recent 6',
  'Recent 7',
  'Recent 8',
  'Recent 9',
  'Recent 10',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const LearnCypto = () => {
  const [value, setValue] = React.useState('1');
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

    return (
        <>
        <Container sx={{pt: 14}}>
          <Box  paddingBottom={10}>
            <Typography variant='h1' className='secondary-font' fontWeight='700' textAlign='center'>Blockchain & Crypto</Typography>
            <Typography textAlign='center' className='secondary-color'>A Beginner’s Guide to TradingView</Typography>
            <Box>
              <Box className="learn-cypto-tab center-tab" sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="tabs">
                      <Tab label="Learn now" value="1" />
                      <Tab label="Video tutorial" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1" sx={{paddingRight:'0', paddingLeft:'0'}} >
                    <img src={VideoImg}/>
                  </TabPanel>
                  <TabPanel value="2">Bitcoin</TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Box>
        </Container>

        {/* video section ends */}

        {/* Our Blog section */}
        <Container maxWidth='fluid'  sx={{backgroundColor:'#F4F5F6'}}>
          <Container>
            <Box paddingTop={10} paddingBottom={10}>
              <Grid container >
                <Grid item xs={12} sm={5} md={5}>
                  <Typography className='small secondary-color'>Our Blog</Typography>
                </Grid>
                <Grid item xs={12} sm={7} md={7}>
                  <Typography variant='h2' className='secondary-font' fontWeight='700' paddingBottom={4}>Latest Releases</Typography>
                  <Typography>Stacks is a production-ready library of stackable content blocks built in React Native.</Typography>
                  <Stack direction='row' className='filter-btn' spacing='2' paddingTop={5}>
                    <Button  variant="contained" className='btn btn-secondary' >Bitcoin </Button>
                    <Button>Blockchain</Button>
                    <Button>Tutorials</Button>
                  </Stack>
                </Grid>
              </Grid>              
            </Box>

            <Box paddingBottom={3}>
            <Grid container >
                <Grid item xs={12} sm={5} md={5}>
                  <Box className='blog-box' display='flex' flexDirection='column' justifyContent='space-between'>
                    <Box height='50'>
                      <Button textTransform='uppercase' sx={{marginBottom: '50px'}} className='orange-btn'>New</Button>
                    </Box>
                    <Box className='' paddingBottom={5}>
                      <Typography variant='h4' fontWeight='700' className='secondary-font' paddingBottom={2}>A Beginner's Guide to TradingView</Typography>
                      <Typography paddingBottom={5}>Ethereum</Typography>
                      <Typography className='body-caption secondary-color'>A fully-featured landing page kit, including design files, and beautiful 3D illustrations editable.</Typography>
                    </Box>
                    <Box><ArrowRightAlt/></Box>
                  </Box>
                  
                </Grid>
                <Grid item xs={12} sm={7} md={7}>
                  <img src={Blog1}/>
                </Grid>
              </Grid>
            </Box>

            <Box paddingBottom={3}>
            <Grid container >
                <Grid item xs={12} sm={5} md={5}>
                  <Box className='blog-box' display='flex' flexDirection='column' justifyContent='space-between'>
                    <Box height='50'>
                      <Button textTransform='uppercase' sx={{marginBottom: '50px'}} className='orange-btn'>beginner</Button>
                    </Box>
                    <Box className='' paddingBottom={5}>
                      <Typography variant='h4' fontWeight='700' className='secondary-font' paddingBottom={2}>A Beginner's Guide to TradingView</Typography>
                      <Typography paddingBottom={5}>Ethereum</Typography>
                      <Typography className='body-caption secondary-color'>A fully-featured landing page kit, including design files, and beautiful 3D illustrations editable.</Typography>
                    </Box>
                    <Box><ArrowRightAlt/></Box>
                  </Box>
                  
                </Grid>
                <Grid item xs={12} sm={7} md={7}>
                  <img src={Blog1}/>
                </Grid>
              </Grid>
            </Box>

            <Box paddingBottom={3}>
            <Grid container >
                <Grid item xs={12} sm={5} md={5}>
                  <Box className='blog-box' display='flex' flexDirection='column' justifyContent='space-between'>
                    <Box sx={{height:'50px'}}>
                      <Button textTransform='uppercase' sx={{marginBottom: '50px'}} className='orange-btn'>beginner</Button>
                    </Box>
                    <Box className='' paddingBottom={5}>
                      <Typography variant='h4' fontWeight='700' className='secondary-font' paddingBottom={2}>A Beginner's Guide to TradingView</Typography>
                      <Typography paddingBottom={5}>Ethereum</Typography>
                      <Typography className='body-caption secondary-color'>A fully-featured landing page kit, including design files, and beautiful 3D illustrations editable.</Typography>
                    </Box>
                    <Box><ArrowRightAlt/></Box>
                  </Box>
                  
                </Grid>
                <Grid item xs={12} sm={7} md={7}>
                  <img src={Blog1}/>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Container>
        {/* blog ends */}

        <Container>
          <Box paddingY={7}>
            <Box>
            <Stack display='flex' flexDirection='row' justifyContent='space-between' paddingY={5} sx={{borderBottom: '1px solid #E6E8EC'}}>
              <Typography className='body-large' fontWeight={600}>Search anything about crypto</Typography>
              <Button className='search-icon'><Search/></Button>
            </Stack>

          </Box>
          <Box display='flex' flexDirection='row' justifyContent='space-between'>
            <Box>
              <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <p className='margin-0'>Recently Added</p>;
                    }
        
                    return selected.join(', ');
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem disabled value="">
                    Recently Added
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Stack direction='row' className='filter-btn' spacing='2' paddingTop={5}>
                <Button  variant="contained" className='btn btn-secondary' >Tutorials </Button>
                <Button>Usecase</Button>
                <Button>Trading</Button> 
                <Button>Wallet</Button>
              </Stack>
            </Box>
          </Box>

          <Grid container spacing={6 } rowSpacing={6} >
            <Grid item xs={12} sm={4} md={4} >
              <Box className='about-crypto'>
                <Button textTransform='uppercase' className='orange-btn float-img'>New</Button>
                
                <Box className='avatar-rounded'>
                <img src={GridImage}  />
                </Box>
                <Stack direction='row' justifyContent='space-between' paddingTop={3}>
                  <Box display='flex'  >
                  <img src={Avatar}/>
                  <Box sx={{paddingLeft:'15px'}}>
                    <Typography fontWeight='500'>Top 7 NFT usecase</Typography>
                    <Typography className='small secondary-color' fontWeight='500'><span>First Name</span> <span>Last Name</span></Typography>
                  </Box>  
                  </Box>
                                  
                  <Box>
                    <Button className='btn btn-green-outlined'>Popular</Button>                     
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} md={4} >
              <Box className='about-crypto'>
                <Button textTransform='uppercase' className='orange-btn float-img'>New</Button>
                
                <Box className='avatar-rounded'>
                <img src={GridImage}  />
                </Box>
                <Stack direction='row' justifyContent='space-between' paddingTop={3}>
                  <Box display='flex'  >
                  <img src={Avatar}/>
                  <Box sx={{paddingLeft:'15px'}}>
                    <Typography fontWeight='500'>Top 7 NFT usecase</Typography>
                    <Typography className='small secondary-color' fontWeight='500'><span>First Name</span> <span>Last Name</span></Typography>
                  </Box>  
                  </Box>
                                  
                  <Box>
                    <Button className='btn btn-green-outlined'>Popular</Button>                     
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} md={4} >
              <Box className='about-crypto'>
                <Button textTransform='uppercase' className='orange-btn float-img'>New</Button>
                
                <Box className='avatar-rounded'>
                <img src={GridImage}  />
                </Box>
                <Stack direction='row' justifyContent='space-between' paddingTop={3}>
                  <Box display='flex'  >
                  <img src={Avatar}/>
                  <Box sx={{paddingLeft:'15px'}}>
                    <Typography fontWeight='500'>Top 7 NFT usecase</Typography>
                    <Typography className='small secondary-color' fontWeight='500'><span>First Name</span> <span>Last Name</span></Typography>
                  </Box>  
                  </Box>
                                  
                  <Box>
                    <Button className='btn btn-green-outlined'>Popular</Button>                     
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} md={4} >
              <Box className='about-crypto'>
                <Button textTransform='uppercase' className='orange-btn float-img'>New</Button>
                
                <Box className='avatar-rounded'>
                <img src={GridImage}  />
                </Box>
                <Stack direction='row' justifyContent='space-between' paddingTop={3}>
                  <Box display='flex'  >
                  <img src={Avatar}/>
                  <Box sx={{paddingLeft:'15px'}}>
                    <Typography fontWeight='500'>Top 7 NFT usecase</Typography>
                    <Typography className='small secondary-color' fontWeight='500'><span>First Name</span> <span>Last Name</span></Typography>
                  </Box>  
                  </Box>
                                  
                  <Box>
                    <Button className='btn btn-green-outlined'>Popular</Button>                     
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} md={4} >
              <Box className='about-crypto'>
                <Button textTransform='uppercase' className='orange-btn float-img'>New</Button>
                
                <Box className='avatar-rounded'>
                <img src={GridImage}  />
                </Box>
                <Stack direction='row' justifyContent='space-between' paddingTop={3}>
                  <Box display='flex'  >
                  <img src={Avatar}/>
                  <Box sx={{paddingLeft:'15px'}}>
                    <Typography fontWeight='500'>Top 7 NFT usecase</Typography>
                    <Typography className='small secondary-color' fontWeight='500'><span>First Name</span> <span>Last Name</span></Typography>
                  </Box>  
                  </Box>
                                  
                  <Box>
                    <Button className='btn btn-green-outlined'>Popular</Button>                     
                  </Box>
                </Stack>
              </Box>
              
            </Grid>
          </Grid>
          </Box>
        </Container>

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
        </>
    )
}

export default LearnCypto
