import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box, Grid, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, } from '@mui/material/';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CoinGuru from '../../../../public/assets/images/logo.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import galleryImage from '../../../../public/assets/images/gallery.svg';
import { KeyboardArrowDown } from '@mui/icons-material/';
import USA from '../../../../public/assets/images/icons/usa.svg';
import japan from '../../../../public/assets/images/icons/japan.svg';
import Chaina from '../../../../public/assets/images/icons/chaina.svg';
import { Label } from 'recharts';

const drawerWidth = 240;

function Header(props) {

  const navItems = [
    {
      page: 'Community',
      icon: '',
      link: '/community',
    },
    {
      page: 'Prediction',
      icon: '',
      link: '/prediction-dashboard',
    },
  ]

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElB, setAnchorElB] = React.useState(null);
  const openB = Boolean(anchorElB);
  const handleClickB = (event) => {
    setAnchorElB(event.currentTarget);
  };
  const handleCloseB = () => {
    setAnchorElB(null);
  };

  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img onClick={() => { navigate('/') }} src={CoinGuru} alt='Coin Guru' style={{ cursor: 'pointer' }} />
      <Divider />
      <List>
        {navItems.map((item, i) => {
          return (
            <ListItem key={i} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                {item.icon &&
                  <img src={item.icon} alt={item.page} />
                }
                <ListItemText primary={`${item.page}`} onClick={() => { navigate(item.link) }} />
              </ListItemButton>
            </ListItem>
          )
        })}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="" onClick={() => { navigate(item.link) }}>
              Search
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="" onClick={() => { navigate(item.link) }}>
              Login
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>

    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" className="app-nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"

            onClick={() => { navigate('/') }}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', lineHeight: '100%', flex: 1, cursor: 'pointer', borderRight: '1px solid #E6E8EC' } }}
          >
            <img src={CoinGuru} alt='Coin Guru' />
          </Typography>
          <Box className='' sx={{ display: { xs: 'none', sm: 'flex', flex: 2, textAlign: 'left', } }} alignItems='center'>
            <ul className='navItem'>
              <li >
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDown />}
                >
                  Academy
                </Button>
                <Menu
                  className='dropdown-menu'
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  sx={{ borderRadius: '12px' }}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => { navigate("./academy") }} sx={{ borderBottom: '1px solid #E6E8EC' }} ><img className='gallery-menu-icon' src={galleryImage} /> All About Crypto </MenuItem>
                  <MenuItem onClick={() => { navigate("./academy") }}><img className='gallery-menu-icon' src={galleryImage} /> Master Course</MenuItem>
                </Menu>
              </li>
            </ul>
            {navItems.map((item, i) => (

              <Button onClick={() => { navigate(item.link) }} key={i} sx={{ color: '#fff' }}>
                {item.icon &&
                  <img src={item.icon} alt={item.page} />
                }
                {item.page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'flex', flex: 2, textAlign: 'right' } }} justifyContent='end'>
            {/* <Button className='btn' sx={{ color: '#23262F' }}>
              EN/USD
            </Button> */}
            <Button id="currency-positioned-button"
              aria-controls={open ? 'currency-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickB} className='btn' sx={{ color: '#23262F' }}
              endIcon={<KeyboardArrowDown />}>
              EN/USD
            </Button>
            <Menu
              className='dropdown-menu en-dropdown'
              id="currency-positioned-menu"
              aria-labelledby="currency-positioned-button"
              anchorEl={anchorElB}
              open={openB}
              sx={{ borderRadius: '12px' }}
              onClose={handleCloseB}
              endIcon={<KeyboardArrowDown />}
            >
              <Box className='menu-box'>
                <Grid container >
                  <Grid item xs={6} sm={6} md={6} sx={{ borderRight: '1px solid #E6E8EC' }}>
                    {/* <FormControl className='language-dropdown'>
                      <FormLabel className='small-caption language-box' id="demo-radio-buttons-group-label">Language</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="English"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel className='radio-option' value="english" control={<Radio />} label="English" > <img src={USA} /> </FormControlLabel>
                        <FormControlLabel className='radio-option' value="chinese" control={<Radio />} label="Chinese" />
                        <FormControlLabel className='radio-option' value="japanese" control={<Radio />} label="Japanese" />
                      </RadioGroup>
                    </FormControl> */}
                     <Box className='language-dropdown'>
                      <Typography className='small-caption language-box' id="lang-label" sx={{ fontSize: '12px !important' }} paddingBottom={4}>Language</Typography>
                      <Box class="img-btn first-img-btn">
                        <input type="radio" name="country-flags" checked />
                        <img width='30' src={USA} alt="Sri Lanka Flag" /> English
                      </Box>

                      <Box class="img-btn">
                        <input type="radio" name="country-flags" />
                        <img width='30' src={Chaina} alt="America Flag" /> Chinese
                      </Box>

                      <Box class="img-btn">
                        <input type="radio" name="country-flags" />
                        <img width='30' src={japan} alt="India Flag" /> Japanese
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} className='right-box'>
                    <FormControl className='language-dropdown'>
                      <FormLabel id="currency-label" className='small-caption language-box' >Currency</FormLabel>
                      <RadioGroup
                        aria-labelledby="currency-label"
                        defaultValue="USD"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel className='radio-option' value="usd" control={<Radio />} label="USD" />
                        <FormControlLabel className='radio-option' value="aud" control={<Radio />} label="AUD" />
                        <FormControlLabel className='radio-option' value="eur" control={<Radio />} label="EUR" />
                        <FormControlLabel className='radio-option' value="jpy" control={<Radio />} label="JPY" />
                        <FormControlLabel className='radio-option' value="btc" control={<Radio />} label="BTC" />
                      </RadioGroup>
                    </FormControl>

                   
                  </Grid>
                </Grid>
              </Box>
            </Menu>

            <Button onClick={() => { navigate('/create-account') }} variant="contained" className='btn btn-primary' sx={{ color: '#fff' }}>
              Sign up
            </Button>
            <Button onClick={() => { navigate('/login') }} variant="outline" className='btn btn-outline' sx={{ color: '#23262F', backgroundColor: '#ffffff00', border: '1px solid' }}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;