import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box, Grid, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Accordion, AccordionDetails, AccordionSummary } from '@mui/material/';
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
import galleryImage from '../../../../public/assets/images/icons/gallery.svg';
import { KeyboardArrowDown, WbSunnyOutlined, Search } from '@mui/icons-material/';
import USA from '../../../../public/assets/images/icons/usa.svg';
import japan from '../../../../public/assets/images/icons/japan.svg';
import Chaina from '../../../../public/assets/images/icons/chaina.svg';
import { Label } from 'recharts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { bannerListActions } from '../../../_actions';
import { setLogoListAtom } from '../../../_state';
import { useRecoilValue } from 'recoil';

const drawerWidth = '100%';
const drawerHeight = '100vh';

function Header(props) {

  const LogoListAction = bannerListActions();
  const LogoList = useRecoilValue(setLogoListAtom);

  useEffect(() => {
    const response = LogoListAction.logoList();
    response.then((res) => { (res) })
  }, []);


  const navItems = [
    {
      page: "Community",
      icon: "",
      link: "/community",
    },
    {
      page: "Prediction",
      icon: "",
      link: "/prediction-dashboard",
    },
    {
      page: 'Market',
      icon: '',
      link: '/market',
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/academy-about-crypto");
  };

  const handle = () => {
    setAnchorEl(null);
    navigate("/master-course");
  };

  const click = () => {
    setAnchorEl(null);
  }

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

  const [isDark, setIsDark] = useState(false)
  const handleDarkMode = () => {
    setIsDark(!isDark)
  }

  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }, [isDark])


  const drawer = (
    <>
      <Box className='mobile-nav-box' sx={{ padding: { xs: '20px', md: '10px' }, width: '100%' }}>
        <Box className='close-btn' sx={{ cursor: 'pointer' }} onClick={handleDrawerToggle}><p>+</p></Box>
        <Box>
          <img onClick={() => { navigate('/') }} src={CoinGuru} alt='Coin Guru' style={{ cursor: 'pointer' }} className="coinguru-logo" />
          <Box sx={{ paddingTop: { xs: '60px' } }} className='mobile-menu'>
            <Button variant='standard' className='nav-mobile-btn btn'>Crypto</Button>
            <Accordion className='submenu'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="acadamy"
              >
                <Button
                  id="acedamy-btn"

                >
                  Academy
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Typography onClick={() => { navigate("./academy") }} sx={{ borderBottom: '1px solid #E6E8EC' }} ><img className='gallery-menu-icon' src={galleryImage} /> All About Crypto </Typography>
                <Typography onClick={() => { navigate("./academy") }}><img className='gallery-menu-icon' src={galleryImage} /> Master Course</Typography>
              </AccordionDetails>
            </Accordion>

            <List sx={{ padding: '0px' }}>
              {navItems.map((item, i) => {
                return (
                  <ListItem key={i} disablePadding>
                    <ListItemButton >
                      {item.icon &&
                        <img src={item.icon} alt={item.page} />
                      }
                      <ListItemText primary={`${item.page}`} onClick={() => { navigate(item.link) }} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
              <ListItem disablePadding>
                <ListItemButton >
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
        </Box>
        <Box display='flex' justifyContent='space-between'>
          {/* <Button variant="contained" className='btn btn-primary' sx={{ color: '#ffffff', backgroundColor: '#3772FF', borderRadius: '90px' }}>Sign Up</Button> */}
          {/* <Button variant="outlined" className='btn btn-outlined-secondary' sx={{ color: '#777e90', backgroundColor: 'transparent', border: '1px solid #777e90', borderRadius: '90px' }}>Login</Button> */}
          <Button
            onClick={() => {
              navigate("/create-account");
            }}
            variant="contained" className="btn btn-primary" sx={{ color: '#ffffff', backgroundColor: '#3772FF', borderRadius: '90px' }}
          >Sign up</Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            variant="outline" className="btn btn-outline" sx={{ color: '#777e90', backgroundColor: 'transparent', border: '1px solid #777e90', borderRadius: '90px' }} >
            Login</Button>

          <IconButton aria-label="sunny" color="primary " sx={{ border: '1px solid #777e90', borderRadius: '90px' }} ><WbSunnyOutlined /></IconButton>
          <IconButton aria-label="sunny" color="primary " sx={{}} ><Search /></IconButton>


        </Box>

      </Box>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" className="app-nav">
        <Toolbar className='mobile-nav'>
          <Box className='mobile-in-nav' sx={{ display: { sm: 'none' } }}>
            <img onClick={() => { navigate('/') }} src={CoinGuru} alt='Coin Guru' style={{ cursor: 'pointer' }} className="coinguru-logo" />

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
              <Typography
                variant="h6"
                className='header-logo-border'
                onClick={() => {
                  navigate("/");
                }}
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    sm: "block",
                    lineHeight: "100%",
                    flex: 1,
                    cursor: "pointer",
                  },
                  // borderRight: { xs: 'none', sm: '1px solid #E6E8EC' }
                }}
              >
                <img src={LogoList[0]?.image ? `${process.env.REACT_APP_IMAGE_URL}/${LogoList[0]?.image}` : LogoList[0]?.image_link} className='coinguru-logo' alt='coinguru-logo' />
              </Typography>
          <Box
            className=""
            sx={{
              display: { xs: "none", sm: "flex", flex: 2, textAlign: "left" },
            }}
            alignItems="center"
          >
            <ul className="navItem">
              <li>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDown />}
                >
                  Academy
                </Button>
                <Menu
                  className="dropdown-menu"
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  sx={{ borderRadius: "12px" }}
                  onClose={click}
                >
                  <MenuItem
                    onClick={handleClose}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <img className="gallery-menu-icon" src={galleryImage} /> All
                    About Crypto{" "}
                  </MenuItem>
                  <MenuItem onClick={handle}>
                    <img className="gallery-menu-icon" src={galleryImage} />{" "}
                    Master Course
                  </MenuItem>
                </Menu>
              </li>
            </ul>
            {navItems.map((item, i) => (
              <Button
                onClick={() => {
                  navigate(item.link);
                }}
                key={i}
                sx={{ color: "#fff" }}
              >
                {item.icon && <img src={item.icon} alt={item.page} />}
                {item.page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex", flex: 2, textAlign: "right" },
            }}
            justifyContent="end"
          >

            <IconButton onClick={handleDarkMode} aria-label="sunny" color="primary " className=' mobile-none'>
              <WbSunnyOutlined />
            </IconButton>

            <Button
              onClick={() => {
                navigate("/create-account");
              }}
              variant="contained"
              className="btn btn-primary"
              sx={{ color: "#fff" }}
            >
              Sign up
            </Button>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant="outline"
              className="btn btn-outline"
              sx={{
                color: "#23262F",
                backgroundColor: "#ffffff00",
                border: "1px solid",
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Box>


          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: drawerHeight },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

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
