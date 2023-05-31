import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListItem, List, ListItemButton, ListItemText, CssBaseline, IconButton, Toolbar, Typography, Button, Menu, Grid } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import CoinGuru from '../../../../public/assets/images/logo.svg';
import { MenuItem, Badge, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, AppBar, Divider, Drawer } from '@mui/material';
import galleryImage from '../../../../public/assets/images/gallery.svg';
import { NotificationsNone, FlashOnOutlined, WbSunnyOutlined } from '@mui/icons-material/';
import ShareIcon from '../../../../public/assets/images/share-square.svg';
import UserIcon from '../../../../public/assets/images/user.svg';
import UserAvatar from '../../../../public/assets/images/avatarUser.svg';
import { useUserActions } from "../../../_actions/user.actions";
const drawerWidth = 240;

function Header(props) {
  const userActions = useUserActions();
  const navItems = [
    {
      page: 'Community',
      icon: '',
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

  const [anchorElAnchor, setAnchorElAnchor] = React.useState(null);
  const openAnchor = Boolean(anchorElAnchor);
  const handleClickAnchor = (event) => {
    setAnchorElAnchor(event.currentTarget);
  };
  const handleCloseAnchor = () => {
    setAnchorElAnchor(null);
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
          <Box className='' sx={{ display: { xs: 'none', sm: 'flex', flex: 2, textAlign: 'left', } }}>
            <ul className='navItem'>
              <li >
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
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
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={handleClose} sx={{ borderBottom: '1px solid #E6E8EC' }} ><img className='gallery-menu-icon' src={galleryImage} /> All About Crypto </MenuItem>
                  <MenuItem onClick={handleClose}><img className='gallery-menu-icon' src={galleryImage} /> Master Course</MenuItem>
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
                    <FormControl  className='language-dropdown'>
                      <FormLabel className='small-caption language-box'  id="demo-radio-buttons-group-label">Language</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="English"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel className='radio-option' value="english" control={<Radio />} label="English" />
                        <FormControlLabel className='radio-option' value="chinese" control={<Radio />} label="Chinese" />
                        <FormControlLabel className='radio-option' value="japanese" control={<Radio />} label="Japanese" />
                      </RadioGroup>
                    </FormControl>
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
            <IconButton aria-label="flash" color="primary">
              <FlashOnOutlined />
            </IconButton>
            <Badge badgeContent={2} className="green-bg-badge navbtn">
              <NotificationsNone color="action" />
            </Badge>
            <Button onClick={e => navigate('/account')} variant="outline" className='btn btn-outline' sx={{ color: '#23262F', backgroundColor: '#ffffff00', border: '1px solid' }}>
              Account
            </Button>
            <IconButton aria-label="sunny" color="primary">
              <WbSunnyOutlined />
            </IconButton>
            <IconButton onClick={handleClickAnchor}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={openAnchor ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openAnchor ? 'true' : undefined} s className='icon-avatar-img' aria-label="flash" color="primary">
              <img src={UserAvatar} />
            </IconButton >
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
              <MenuItem onClick={() => navigate('/account/session-and-history')}>
                <span className='inner-div-user'>
                  <span className='img-div-dropdown head-menu'><img src={ShareIcon} /> Settings</span>
                  <span className='pl-3 sub-head-menu'>View additional settings</span>
                </span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => userActions.logout()}>
                <span className='inner-div-user'>
                  <span className='img-div-dropdown head-menu'><img src={ShareIcon} /> Logout</span>
                </span>
              </MenuItem>
              <Divider />

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