import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListItem, List, Tooltip,ListItemButton, ListItemText, CssBaseline, IconButton, Toolbar, Typography, Button, Menu, Grid, Switch } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import CoinGuru from '../../../../public/assets/images/logo.svg';
import { MenuItem, Badge, Box, AppBar, Divider, Drawer } from '@mui/material';
import galleryImage from '../../../../public/assets/images/icons/gallery.svg';
import { NotificationsNone, Search, WbSunnyOutlined, KeyboardArrowDown, FiberManualRecord } from '@mui/icons-material/';
import ShareIcon from '../../../../public/assets/images/icons/share-square.svg';
import UserIcon from '../../../../public/assets/images/icons/user.svg';
import UserAvatar from '../../../../public/assets/images/avatarUser.svg';
import { useUserActions } from "../../../_actions/user.actions";
import { notificationActions } from '../../../_actions/notification.actions';
import { useEffect } from "react";
import { notificationAtom, authAtom, notificationCountAtom } from '../../../_state/';
import { useRecoilValue } from "recoil";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerWidth = '100%';
function Header(props) {
  const userActions = useUserActions();
  const notificationAction = notificationActions();
  const notifications = useRecoilValue(notificationAtom);
  const userDetails = useRecoilValue(authAtom);
  const notificaionCount = useRecoilValue(notificationCountAtom);

  const handleClear = async (action) => {
    notificationAction.clearNotifications({action});
  };

  useEffect(() => {
    notificationAction.notificationList()
    notificationAction.notificationList_View()

  }, [])

  const singleRead = async (notId) => {
    notificationAction.notificationSingleread(notId)
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
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  const drawer = (
    <Box className='mobile-nav-box' sx={{ padding: { xs: '20px', md: '10px' }, width: '100%' }}>
      <Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box>
            <img onClick={() => { navigate('/') }} src={CoinGuru} alt='Coin Guru' style={{ cursor: 'pointer' }} />
          </Box>
          <Box display='flex' alignItems='center' sx={{ cursor: 'pointer' }} onClick={handleDrawerToggle}>
            <Box className='close'><p>+</p></Box>
          </Box>
        </Box>
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
          <List className='itemnavitem'>
            {navItems.map((item, i) => {
              return (
                <ListItem key={i} disablePadding >
                  <ListItemButton >
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
        <Button variant="outlined" className='btn btn-outlined-secondary' sx={{ color: '#777e90', backgroundColor: 'transparent', border: '1px solid #777e90', borderRadius: '90px' }}>Profile settings</Button>
        <IconButton aria-label="sunny" color="primary " sx={{ border: '1px solid #777e90', borderRadius: '90px' }} ><WbSunnyOutlined /></IconButton>
        <IconButton aria-label="sunny" color="primary " sx={{}} ><Search /></IconButton>
      </Box>

    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" className="app-nav">
        <Toolbar>
          <Typography
            variant="h6"

            onClick={() => { navigate('/') }}
            sx={{ flexGrow: 1, display: { xs: 'block', md: 'block', lineHeight: '100%', flex: 1, cursor: 'pointer' }, borderRight: { xs: 'none', sm: '1px solid #E6E8EC' } }}
          >
            <img width='140' src={CoinGuru} alt='Coin Guru' />
          </Typography>

          <Box className='' sx={{ display: { xs: 'none ', md: 'flex', flex: 2, textAlign: 'left', } }} alignItems='center'>
            <ul className='navItem'>
              <li >
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDown />}
                  sx={{ display: { xs: 'none ', md: 'flex' } }}
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
          <Box className='end-flex' sx={{ display: { xs: 'none', md: 'block', flex: 2, textAlign: 'right' } }}>

            <Badge badgeContent={notificaionCount} onClick={handleClickAnchorbtn}
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
                {notifications.length > 0 ?
                  <>
                    <Typography className='body-large' sx={{ fontWeight: '600' }}>Notifications</Typography>
 
                    {notifications?.map((item, index) => {
                      if (index < 5) {
                        return (
                          <>
                            <MenuItem onClick={() => singleRead(item.ct_notiy_id)} sx={{ padding: '0' }}>
                              <span className='outer-div-menu'>
                                <span className='inner-div-menu'>
                                  <span className='head-menu'>{item.ct_notify_title}</span>
                                  <span className='pl-3 sub-head-menu'><FiberManualRecord /></span>
                                </span>
                                <Typography className='secondary-color' sx={{ fontSize: '10px' }}>{item.ct_notify_created_At}</Typography>
                              </span>
                            </MenuItem>
                            <Divider />
                          </>
                        )
                      }
                    })}
                    </>
                  : <span>No New Notifications Available</span>
                }
                    <Box paddingTop={2} className='rounded-radius' sx={{ display: 'flex', justifyContent: 'space-between' }} >
                 
                      <Button onClick={() => { navigate("/notifications") }} variant="contained" className='btn btn-primary' sx={{ color: '#ffffff', backgroundColor: '#3772FF', }}>
                        View all
                      </Button> 
                      {notifications.length > 0 ?
                      <Button onClick={e=>handleClear('all_read')} variant="outline" className='btn btn-outline' sx={{ color: '#23262F', backgroundColor: '#ffffff00', border: '1px solid' }}>
                        Clear all
                      </Button>: ''}  
                    </Box>
                

              </Box>
            </Menu>
            <Button onClick={e => navigate('/account')} variant="outline" className='btn btn-outline mobile-none' sx={{ display: { xs: 'none', md: 'block' }, color: '#23262F', backgroundColor: '#ffffff00', border: '1px solid', }}>
              Account
            </Button>
            <IconButton aria-label="sunny" color="primary " className=' mobile-none'>
              <WbSunnyOutlined />
            </IconButton>
            <Tooltip arrow title={userDetails.user_name ? userDetails.user_name : userDetails.email.split("@")[0]}>
              <IconButton onClick={handleClickAnchor}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openAnchor ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openAnchor ? 'true' : undefined} s className='icon-avatar-img btnicon' aria-label="flash" color="primary">
                <img src={UserAvatar} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElAnchor}
              id="account-menu"
              className="headeravatar"
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
            display: { xs: 'block', md: 'block', sm: 'none' },
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