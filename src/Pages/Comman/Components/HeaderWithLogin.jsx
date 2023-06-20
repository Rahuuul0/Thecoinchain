import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListItem, List, ListItemButton, ListItemText, CssBaseline, IconButton, Toolbar, Typography, Button, Menu, Grid, Switch } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import CoinGuru from '../../../../public/assets/images/logo.svg';
import { MenuItem, Badge, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, AppBar, Divider, Drawer } from '@mui/material';
import galleryImage from '../../../../public/assets/images/gallery.svg';
import { NotificationsNone, WbSunnyOutlined, KeyboardArrowDown, FiberManualRecord } from '@mui/icons-material/';
import ShareIcon from '../../../../public/assets/images/share-square.svg';
import UserIcon from '../../../../public/assets/images/user.svg';
import UserAvatar from '../../../../public/assets/images/avatarUser.svg';
import { useUserActions } from "../../../_actions/user.actions";
import USA from '../../../../public/assets/images/icons/usa.svg';
import japan from '../../../../public/assets/images/icons/japan.svg';
import Chaina from '../../../../public/assets/images/icons/chaina.svg';
import {notificationActions} from '../../../_actions/notification.actions';
import { useState, useEffect } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {notificationAtom, authAtom, notificationCountAtom} from '../../../_state/';
import { useRecoilValue } from "recoil";
const drawerWidth = 240;

function Header(props) {
  const userActions = useUserActions();
  const notification = notificationActions();
  const notifications = useRecoilValue(notificationAtom);
  const userDetails = useRecoilValue(authAtom);
  const notificaionCount = useRecoilValue(notificationCountAtom);

  const handleClear = async() => {
      let notId = notifications.map((item,index) => { if(index < 5){return( item.ct_notiy_id )}  })
      notification.clearNotifications(notId);
  };

useEffect(()=>{
      notification.notificationList() 
     
},[])

const singleRead = async (notId) =>{
    let userId = userDetails.id

    notification.notificationSingleread(notId, userId)
 
}
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
        navigate('/academy-about-crypto')
  };

  const handle = () => {
        setAnchorEl(null);
        navigate('/master-course')
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [anchorElB, setAnchorElB] = React.useState(null);
  const openB = Boolean(anchorElB);
  const handleClickB = (event) => {
        setAnchorElB(event.currentTarget);
  };
  const handleCloseB = () => {
        setAnchorElB(null);
  };

  const [anchorElAnchor, setAnchorElAnchor] = React.useState(null);
  const openAnchor = Boolean(anchorElAnchor);
  const handleClickAnchor = (event) => {
        setAnchorElAnchor(event.currentTarget);
  };
  const handleCloseAnchor = () => {
        setAnchorElAnchor(null);
  };

  const [anchorElAnchorbtn, setAnchorElAnchorbtn] = React.useState(null);
  const openAnchorbtn = Boolean(anchorElAnchorbtn);
  const handleClickAnchorbtn = (event) => {
        setAnchorElAnchorbtn(event.currentTarget);
  };
  const handleCloseAnchorbtn = () => {
        setAnchorElAnchorbtn(null);
  };
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const openAnchorNoti = Boolean(anchorElNoti);
  const handleClickAnchorNoti = (event) => {
        setAnchorElNoti(event.currentTarget);
  };
  const handleCloseAnchorNoti = () => {
        setAnchorElNoti(null);
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
      <List alignItems='center' className='itemnavitem'>
        {navItems.map((item, i) => {
          return (
            <ListItem key={i} disablePadding alignItems='center'>
              <ListItemButton sx={{ textAlign: 'center' }}>
                {item.icon &&
                  <img src={item.icon} alt={item.page} />
                }
                <ListItemText primary={`${item.page}`} onClick={() => { navigate(item.link) }} />
              </ListItemButton>
            </ListItem>
          )
        })}
        <ListItem disablePadding alignItems='center'>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="" onClick={() => { navigate(item.link) }}>
              Search
            </ListItemText>
          </ListItemButton>
        </ListItem>notifications
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
                  <MenuItem onClick={handleClose} sx={{ borderBottom: '1px solid #E6E8EC' }} ><img className='gallery-menu-icon' src={galleryImage} /> All About Crypto </MenuItem>
                  <MenuItem onClick={handle}><img className='gallery-menu-icon' src={galleryImage} /> Master Course</MenuItem>
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
          <Box className='end-flex' sx={{ display: { xs: 'none', sm: 'block', flex: 2, textAlign: 'right' } }}>
            <Button id="currency-positioned-button"
              aria-controls={open ? 'currency-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              endIcon={<KeyboardArrowDown />}
              onClick={handleClickB} className='btn' sx={{ color: '#23262F' }}>
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
                        <FormControlLabel className='radio-option' value="english" control={<Radio />} label="English" />
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

            <Badge badgeContent={notificaionCount}  onClick={handleClickAnchorbtn}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={openAnchorbtn ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openAnchorbtn ? 'true' : undefined} className='icon-btn icon-avatar-img btnicon notification-badge' aria-label="flash" color="primary">
              <IconButton>
              <NotificationsNone color="action" />
             </IconButton>
            </Badge>
            <Menu
              anchorEl={anchorElAnchorbtn}
              id=""
              className='notification-menu'
              open={openAnchorbtn}
              onClose={handleCloseAnchorbtn}
              onClick={handleCloseAnchorbtn}

              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
            >
              <Box padding={2}>
               {notifications.length>0?
                <>
                <Typography className='body-large' sx={{ fontWeight: '600' }}>Notifications</Typography>
                 
                {notifications?.map((item,index) =>{
                   if(index < 5){
                  return(
                    <>
                    
                    <MenuItem  onClick={()=> singleRead(item.ct_notiy_id)} sx={{padding:'0'}}>
                     <span className='outer-div-menu'>
                      <span className='inner-div-menu'>
                        <span className='head-menu'>{item.ct_notify_title}</span>
                        <span className='pl-3 sub-head-menu'><FiberManualRecord /></span>
                      </span>
                      <Typography className='secondary-color' sx={{fontSize:'10px'}}>{item.ct_notify_created_At}</Typography>
                     </span>
                   </MenuItem>
                   <Divider/>
                  </>
                  )
                }
                })}

                
                <Box paddingTop={2} className='rounded-radius' sx={{ display: 'flex' , justifyContent: 'space-between'}} >
                  <Button onClick={() =>{navigate('/notifications')}} variant="contained" className='btn btn-primary' sx={{ color: '#ffffff', backgroundColor: '#3772FF', }}>
                    View all
                  </Button>
                  <Button  onClick={handleClear}  variant="outline" className='btn btn-outline' sx={{ color: '#23262F', backgroundColor: '#ffffff00', border: '1px solid' }}>
                    Clear all
                  </Button>
                </Box>
                </> :<span>No New Notifications Available</span>
                }
              
              </Box>

            </Menu>
            <IconButton className='icon-btn' onClick={e => navigate('/subscription#')} aria-label="flash" color="primary">
              <ShoppingCartOutlinedIcon />
            </IconButton>
            <Button onClick={e => navigate('/account')} variant="outline" className='btn btn-outline' sx={{ color: '#23262F', backgroundColor: '#ffffff00', border: '1px solid' }}>
              Account
            </Button>
            <IconButton aria-label="sunny" color="primary " >
              <WbSunnyOutlined />
            </IconButton>

            <IconButton onClick={handleClickAnchor}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={openAnchor ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openAnchor ? 'true' : undefined} s className='icon-avatar-img btnicon' aria-label="flash" color="primary">
              <img src={UserAvatar} />
            </IconButton>
            <Menu
              anchorEl={anchorElAnchor}
              id="account-menu"
              open={openAnchor}
              onClose={handleCloseAnchor}
              onClick={handleCloseAnchor}

              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => navigate('/account/profile')}>
                <span className='inner-div-user'>
                  <span className='img-div-dropdown head-menu'><img src={UserIcon} /> Profile</span>
                  <span className='pl-3 sub-head-menu'>Important account details</span>
                </span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate('/account/referrals')}>
                <span className='inner-div-user'>
                  <span className='img-div-dropdown head-menu'><img src={ShareIcon} /> Referrals</span>
                  <span className='pl-3 sub-head-menu'>Invite your friends and earn rewards</span>
                </span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate('/account/2fa-enable')}>
                <span className='inner-div-user'>
                  <span className='img-div-dropdown head-menu'><img src={ShareIcon} /> 2FA security</span>
                  <span className='pl-3 sub-head-menu'>Setup 2FA for more security</span>
                </span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate('/account/profile')}>
                <span className='inner-div-outer'>
                  <span className='inner-div-user'>
                    <span className='img-div-dropdown head-menu'><img src={ShareIcon} /> Settings</span>
                    <span className='pl-3 sub-head-menu'>View additional settings</span>
                  </span>

                </span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => userActions.logout()}>
                <span className='inner-div-user'>
                  <span className='img-div-dropdown head-menu'><img src={ShareIcon} /> Logout</span>
                </span>
              </MenuItem>

            </Menu>
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