import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
import CoinGuru from '../../../../public/assets/images/logo.svg'


const drawerWidth = 240;

function Header(props) {

  const navItems = [
    {
      page: 'Academy',
      icon: '',
      link: '/academy',
    },
    {
      page: 'Community',
      icon: '',
      link: '/community',
    },
    {
      page: 'Prediction',
      icon: '',
      link: '/prediction',
    },
  ] 


  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <img onClick={() => { navigate('/') }} src={CoinGuru} alt='Coin Guru' style={{ cursor: 'pointer' }} />
      {/* <Typography variant="h6" sx={{ my: 2 }} onClick={() => { navigate('/') }}>
        <img src={CoinGuru} alt='Coin Guru' />
      </Typography> */}
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
            component="div"
            onClick={() => { navigate('/') }}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', lineHeight: '100%', flex: 1, cursor: 'pointer', borderRight: '1px solid #E6E8EC' } }}
          >
            <img src={CoinGuru} alt='Coin Guru' />
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block', flex: 2, textAlign: 'left', } }}>

            {navItems.map((item, i) => (
              <Button onClick={() => { navigate(item.link) }} key={i} sx={{ color: '#fff' }}>
                {item.icon &&
                  <img src={item.icon} alt={item.page} />
                }
                {item.page}
              </Button>
            ))}

            {/* <Button onClick={() => { navigate('/login') }} sx={{ color: '#fff' }}>
              <SearchIcon />
            </Button> */}

           

          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'block', flex: 2, textAlign: 'right' } }}>

            

            {/* <Button onClick={() => { navigate('/login') }} sx={{ color: '#fff' }}>
              <SearchIcon />
            </Button> */}

            <Button  className='btn' sx={{ color: '#23262F' }}>
              EN/USD
            </Button> 

            <Button  onClick={() => { navigate('/create-account') }}  variant="contained" className='btn btn-primary'  sx={{ color: '#fff' }}>
              Sign up
            </Button>
            <Button onClick={() => { navigate('/login') }} variant="outline" className='btn btn-outline'  sx={{ color: '#23262F' , backgroundColor: '#ffffff00', border: '1px solid' }}>
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