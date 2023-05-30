import { Container, Typography, Grid, Box, Stack, Button, Tab, Accordion, AccordionSummary, TextField, AccordionDetails, Select, OutlinedInput, MenuItem } from '@mui/material'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {  ArrowRightAlt, ExpandMore } from '@mui/icons-material';
import { useContactActions } from '../../_actions';
import ContactHeroImage from "../../../public/assets/images/contact.svg";
import InputBase from '@mui/material/InputBase';
import Media from "../../../public/assets/images/media-img.svg";
import Design from "../../../public/assets/images/design-sys.svg";
import GenralIcon from "../../../public/assets/images/genralicon.svg";
import SubsIcon from "../../../public/assets/images/subscription.svg";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled, alpha } from '@mui/material/styles';

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
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: '350px',
  fontSize: '14px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '300px',
      border: '2px solid #E6E8EC',
      borderRadius: '90px',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  top: '9%',
  right: '5%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

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

const Contact = () => {
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
      <Box component="main" sx={{ pt: 8 }}>

      </Box>
      {/* Banner starts */}
      <Container>
        <Box paddingTop={5} paddingBottom={10}>
          <Grid container sx={{ alignItems: 'center' }}>
            <Grid item xs={12} sm={6} md={6} paddingRight={8}>
              <Typography textTransform='uppercase' variant='body2' component="div" className='secondary-color primary-font' paddingBottom={1} >Save your time with Stacks</Typography>
              <Typography variant='h1' component="div" className='hero-heading primary-color'>
                How can we help
              </Typography>
              <Typography variant='body2' component="div" className='hero-para secondary-color' paddingBottom={2}>
                A creative agency that lead and inspire
              </Typography>
              <Typography component="div" paddingBottom={2} >

                <Search>

                  <StyledInputBase
                    className='primary-font'
                    placeholder="Search anything"
                    inputProps={{ 'aria-label': 'search' }}
                  />

                  <SearchIconWrapper className='search-icon'>
                    <ArrowRightAlt />
                  </SearchIconWrapper>
                </Search>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <img className='heroImage' src={ContactHeroImage} />
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* Banner Ends */}

      <Container maxWidth='fluid' sx={{padding:'0px !important'}}>
        <Box paddingY={7} className='newdesignbox'>
          <Grid container spacing={0} rowSpacing={6} >
            <Grid item xs={12} sm={3} md={3} >
              <Box className='about-crypto'>
                <Box className=''>
                  <Button textTransform='uppercase' className='orange-btn float-right'>New</Button>
                  <img src={Design} />
                </Box>
                <Box paddingTop={4} className="inner-con-box">
                  <Typography fontWeight='500' paddingBottom={2}>Celebrating the new Design System</Typography>
                  <Typography className='body-caption secondary-color'>Stack solves business problems from simple to complex</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} md={3} >
              <Box className='about-crypto'>
                <Box className=''>
                  <Button textTransform='uppercase' className='orange-btn float-right'>New</Button>
                  <img src={Media} />
                </Box>
                <Box paddingTop={4} className="inner-con-box">
                  <Typography fontWeight='500' paddingBottom={2}>Celebrating the new Design System</Typography>
                  <Typography className='body-caption secondary-color'>Stack solves business problems from simple to complex</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} md={3} >
              <Box className='about-crypto'>
                <Box className=''>
                  <Button textTransform='uppercase' className='orange-btn float-right'>New</Button>
                  <img src={Design} />
                </Box>
                <Box paddingTop={4} className="inner-con-box">
                  <Typography fontWeight='500' paddingBottom={2}>Celebrating the new Design System</Typography>
                  <Typography className='body-caption secondary-color'>Stack solves business problems from simple to complex</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} md={3} >
              <Box className='about-crypto'>
                <Box className=''>
                  <Button textTransform='uppercase' className='orange-btn float-right'>New</Button>
                  <img src={Media} />
                </Box>
                <Box paddingTop={4} className="inner-con-box">
                  <Typography fontWeight='500' paddingBottom={2}>Celebrating the new Design System</Typography>
                  <Typography className='body-caption secondary-color'>Stack solves business problems from simple to complex</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Typography textAlign='center' paddingTop={10}>
            <Button className='btn-outlined-secondary'>Learn More</Button>
          </Typography>
        </Box>
      </Container>


      {/* Slider ends */}

      <Container>
        <Box paddingY={10}>
          <Box>
            <Box className='smallwidth'>
              <Typography variant='h2' fontWeight='700' textAlign='center' className='secondary-font' paddingBottom={4}>Frequently asked questions</Typography>
              {/* tabs starts */}
              <Box className="learn-cypto-tab center-tab" sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="tabs">
                      <Tab label="General" value="1" />
                      <Tab label="Support" value="2" />
                      <Tab label="Hosting" value="3" />
                      <Tab label="Product" value="4" />
                    </TabList>
                  </Box>
                  <TabPanel value="1" sx={{ paddingRight: '0', paddingLeft: '0' }} >
                    <Box className='faq-accordian'>
                      <Accordion >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography><span className='faq-count'>01</span> How does it work?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                          </Typography>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography><span className='faq-count'>02</span> How can i set up a new website?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                          </Typography>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography><span className='faq-count'>03</span> How does it work?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                          </Typography>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography><span className='faq-count'>04</span> How does it work?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                          </Typography>
                        </AccordionDetails>
                      </Accordion>

                    </Box>
                  </TabPanel>
                  <TabPanel value="2">Bitcoin</TabPanel>
                  <TabPanel value="3">Blockchain</TabPanel>
                  <TabPanel value="4">Tutorial</TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Box>

        </Box>
      </Container>

      <Container maxWidth='fluid' sx={{ backgroundColor: '#F8F8F9' }}>
        <Container className='smallwidth'>
          <Box paddingY={10} className="topic-que">
            <Box paddingBottom={2}>
              <Typography textTransform='uppercase' paddingY={1} fontWeight='700' className='small-caption primary-font secondary-color'>Select a topic</Typography>

              <Stack direction='row' spacing={3} className='button-img' >
                <Button className='btn' variant="outlined" > <span><img src={GenralIcon} /></span> General</Button>
                <Button className='btn' variant="outlined" > <span><img src={SubsIcon} /></span> Subscription</Button>
              </Stack>
            </Box>
            <Box paddingBottom={2}>
              <Typography textTransform='uppercase' paddingY={1} fontWeight='700' color='#B1B5C4' className='small-caption primary-font secondary-color'>What is your issue about?</Typography>
              <Select
                multiple
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <p className='margin-0'>Have a question about CoinGuru prediction?</p>;
                  }

                  return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem disabled value="">
                  Have a question about CoinGuru prediction?
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
            </Box>

            <Box paddingBottom={2}>
              <Typography textTransform='uppercase' paddingY={1} fontWeight='700' color='#B1B5C4'  
              sx={{fontSize: '12px',  transform: ' translate(0, -1.5px) scale(0.75)',   fontFamily: 'var(--primary-font) !important' ,    fontWeight: '700',     textTransform: 'uppercase'}}
     className='small-caption primary-font secondary-color'>What is your issue about?</Typography>
              <Select
                multiple
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <p className='margin-0'>Transactions and spending</p>;
                  }

                  return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem disabled value="">
                  Transactions and spending
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
            </Box>

            <Box paddingBottom={2}>
              <Typography textTransform='uppercase' paddingY={1} fontWeight='700' color='#B1B5C4'  
              sx={{fontSize: '12px',  transform: ' translate(0, -1.5px) scale(0.75)',   fontFamily: 'var(--primary-font) !important' ,    fontWeight: '700',     textTransform: 'uppercase'}}
     className='small-caption primary-font secondary-color'>Email address</Typography>
              <Select
              label='email'
                multiple
                displayEmpty
                className="form-control"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <p className='margin-0'>Email</p>;
                  }

                  return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem disabled value="">
                  Email
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
            </Box>
            <Box paddingBottom={2}>
               <TextField
                label="Subject"
                className="form-control"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="Subject"
                // placeholder='Password'
                name="subject"
                autoComplete="off"
              // size="small"
              />
            </Box>
            <Box paddingTop='2'>
                <TextField
                id="outlined-multiline-static"
                label="Message" 
                variant="standard" 
                className="form-control"
                placeholder='Say something'
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                rows={4}
                fullWidth
              />
            </Box>
            <Box paddingTop='2'>
              <Typography textAlign='end' sx={{ paddingTop: "40px" }}>
                <Button className='btn btn-primary' sx={{ float: 'right' }} variant='contained'>Send message</Button>
              </Typography>
            </Box>

          </Box>
        </Container>
      </Container>




    </>
  )
}

export default Contact
