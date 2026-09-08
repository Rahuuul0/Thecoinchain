import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box, Grid, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Accordion, AccordionDetails, AccordionSummary } from '@mui/material/';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import BedtimeIcon from '@mui/icons-material/Bedtime';
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
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { KeyboardArrowDown, WbSunnyOutlined, Search } from '@mui/icons-material/';
import USA from '../../../../public/assets/images/icons/usa.svg';
import japan from '../../../../public/assets/images/icons/japan.svg';
import Chaina from '../../../../public/assets/images/icons/chaina.svg';
import { Label } from 'recharts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { bannerListActions } from '../../../_actions';
import { setLogoListAtom, switchDarkModeAtom } from '../../../_state';
import { useRecoilState, useRecoilValue } from 'recoil';
import { RoutesName } from "../../../_common/app.constants";

const drawerWidth = '100%';
const drawerHeight = '100vh';

function Header(props) {

  const LogoListAction = bannerListActions();
  const isDarkMode = useRecoilValue(switchDarkModeAtom);
  const LogoList = useRecoilValue(setLogoListAtom)

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
    navigate(RoutesName.Academy_about_crypto);
  };

  const handle = () => {
    setAnchorEl(null);
    navigate(RoutesName.Master_Course);
  };

  const click = () => {
    setAnchorEl(null);
  }

  const [newsAnchorEl, setNewsAnchorEl] = React.useState(null);
  const newsOpen = Boolean(newsAnchorEl);
  const handleNewsClick = (event) => {
    setNewsAnchorEl(event.currentTarget);
  };
  const handleNewsClose = () => {
    setNewsAnchorEl(null);
  };
  const handleLatestNews = () => {
    setNewsAnchorEl(null);
    navigate(RoutesName.Latest_News);
  };

  const [informationAnchorEl, setInformationAnchorEl] = React.useState(null);
  const informationOpen = Boolean(informationAnchorEl);
  const handleInformationClick = (event) => {
    setInformationAnchorEl(event.currentTarget);
  };
  const handleInformationClose = () => {
    setInformationAnchorEl(null);
  };
  const handleLatestInformation = () => {
    setInformationAnchorEl(null);
    navigate(RoutesName.Information);
  };
  const [analysisAnchorEl, setAnalysisAnchorEl] = React.useState(null);
  const analysisOpen = Boolean(analysisAnchorEl);

  const handleAnalysisClick = (event) => {
    setAnalysisAnchorEl(event.currentTarget);
  };

  const handleAnalysisClose = () => {
    setAnalysisAnchorEl(null);
  };

  const handlePriceAnalysis = () => {
    setAnalysisAnchorEl(null);
    navigate(RoutesName.Price_Analysis);
  };

  const handlePricePrediction = () => {
    setAnalysisAnchorEl(null);
    navigate(RoutesName.Price_Prediction);
  };


  const handleStockPricePrediction = () => {
    setAnalysisAnchorEl(null);
    navigate(RoutesName.Crypto_Stock_Price_Prediction);
  };

  const handleResearchReport = () => {
    setInformationAnchorEl(null);
    navigate(RoutesName.Research_Report);
  };

  const handlePressRelease = () => {
    setInformationAnchorEl(null);
    navigate(RoutesName.Press_Release);
  };

  const handleGuestPost = () => {
    setInformationAnchorEl(null);
    navigate(RoutesName.Guest_Post);
  };

  const handleSponsored = () => {
    setInformationAnchorEl(null);
    navigate(RoutesName.Sponsored);
  };

  const handleCryptoRegulation = () => {
    setInformationAnchorEl(null);
    navigate(RoutesName.Crypto_Regulation);
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

  const [isDark, setIsDark] = useRecoilState(switchDarkModeAtom);
  const handleDarkMode = () => {
    setIsDark(!isDark)
  }

  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark')
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const headerLogo = LogoList?.find(
    (item) => item.position === "Header"
  );

  const footerLogo = LogoList?.find(
    (item) => item.position === "Footer"
  );

  const selectedLogo = isDarkMode ? headerLogo : footerLogo;

  const logoSrc = selectedLogo?.image
    ? `${process.env.REACT_APP_IMAGE_URL}/${selectedLogo.image}`
    : selectedLogo?.image_link || "";


  const drawer = (
    <>
      <Box className='mobile-nav-box mobile-navbar' sx={{ padding: { xs: '20px', md: '10px' }, width: '100%' }}>
        <Box className='close-btn' sx={{ cursor: 'pointer' }} onClick={handleDrawerToggle}><p>+</p></Box>
        <Box>
          <img onClick={() => { handleDrawerToggle(), navigate('/') }} src={logoSrc} alt='The Coin Chain' style={{ cursor: 'pointer', width: '170px' }} />
          <Box sx={{ paddingTop: { xs: '60px' } }} className='mobile-menu'>
            <Button variant='standard' className='nav-mobile-btn btn' onClick={() => { handleDrawerToggle(), navigate(RoutesName.Learn_Cypto) }}>Crypto</Button>
            <Accordion className='submenu mobile-nav-dropdown'>
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
                <Typography onClick={() => { handleDrawerToggle(), navigate(RoutesName.Academy_about_crypto) }} sx={{ borderBottom: '1px solid #E6E8EC' }} ><img className='gallery-menu-icon' src={galleryImage} /> All About Crypto </Typography>
                <Typography onClick={() => { handleDrawerToggle(), navigate(RoutesName.Master_Course) }}><img className='gallery-menu-icon' src={galleryImage} /> Master Course</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className='submenu mobile-nav-dropdown'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="news"
              >
                <Button id="news-btn">
                  News
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Typography onClick={() => { handleDrawerToggle(), navigate(RoutesName.Latest_News) }} sx={{ borderBottom: '1px solid #E6E8EC' }}><img className='gallery-menu-icon' src={galleryImage} /> Latest News</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className='submenu mobile-nav-dropdown'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="news"
              >
                <Button id="news-btn">
                  Information
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Typography onClick={() => { handleDrawerToggle(), navigate(RoutesName.Home) }} sx={{ borderBottom: '1px solid #E6E8EC' }}><img className='gallery-menu-icon' src={galleryImage} /> Information</Typography>
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
                      <ListItemText primary={`${item.page}`} onClick={() => { handleDrawerToggle(), navigate(item.link) }} />
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

          <IconButton onClick={handleDarkMode} aria-label="sunny" className='theme-selector' color="primary " sx={{ border: '1px solid #777e90', borderRadius: '90px' }} ><WbSunnyOutlined /></IconButton>
          {/* <IconButton className='mobile-search' aria-label="sunny" color="primary " sx={{}} ><Search /></IconButton> */}


        </Box>

      </Box>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const navBtnSx = {
    color: isDarkMode ? '#FFFFFF !important' : '#141416 !important',
    fontFamily: 'var(--secondary-font) !important',
    fontWeight: '700 !important',
    fontSize: '15px !important',
    textTransform: 'capitalize',
    px: { xs: 1, md: 1.5 },
    minWidth: 'auto',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#3772ff !important',
      backgroundColor: 'transparent !important',
    },
    '& .MuiSvgIcon-root': {
      color: isDarkMode ? '#FFFFFF !important' : '#141416 !important',
      transition: 'color 0.2s ease',
    },
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        className="app-nav"
        sx={{
          backgroundColor: isDarkMode ? 'rgba(20, 20, 22, 0.95) !important' : 'rgba(255, 255, 255, 0.95) !important',
          backdropFilter: 'blur(10px)',
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08) !important' : '1px solid #EDEDED !important',
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.04)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <Toolbar className='mobile-nav' sx={{ justifyContent: 'space-between' }}>
          <Box className='mobile-in-nav' sx={{
            display: { sm: 'none' }, maxWidth: { xs: '120px', sm: '150px', lg: '180px' },
            pr: 2
          }}>
            <img onClick={() => { navigate('/') }} src={logoSrc} alt='Coin Guru' style={{ cursor: 'pointer' }} />

          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
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
              maxWidth: { xs: '120px', sm: '150px', lg: '180px' },
               pr: {xs: '4px',sm: '4px',lg: '16px',}
              // borderRight: { xs: 'none', sm: '1px solid #E6E8EC' }
            }}
          >
            <img
              src={logoSrc}
              alt="the coin chain"
              style={{ borderRadius: "15px" }}
            />
          </Box>
          <Box
            className=""
            sx={{
              display: { xs: "none", sm: "flex", flex: 2, textAlign: "left" },
            }}
            alignItems="center"
          >
            <ul className="navItem">
              <li>
                {/* <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDown />}
                >
                  Academy
                </Button> */}
                <Menu
                  className="dropdown-menu"
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  sx={{ borderRadius: "12px" }}
                  onClose={click}
                  disableScrollLock={true}
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
            <ul className="navItem">
              <li>
                <Button
                  id="news-positioned-button"
                  aria-controls={newsOpen ? "news-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={newsOpen ? "true" : undefined}
                  onClick={handleNewsClick}
                  endIcon={<KeyboardArrowDown sx={{ color: isDarkMode ? '#FFFFFF !important' : '#141416 !important' }} />}
                  sx={navBtnSx}
                >
                  News
                </Button>
                <Menu
                  className="dropdown-menu"
                  id="news-positioned-menu"
                  aria-labelledby="news-positioned-button"
                  anchorEl={newsAnchorEl}
                  open={newsOpen}
                  sx={{ borderRadius: "12px" }}
                  onClose={handleNewsClose}
                  disableScrollLock={true}
                >
                  <MenuItem
                    onClick={handleLatestNews}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <ArticleOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Latest News
                  </MenuItem>
                </Menu>
              </li>
            </ul>
            <ul className="navItem">
              <li>
                <Button
                  id="information-positioned-button"
                  aria-controls={informationOpen ? "information-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={informationOpen ? "true" : undefined}
                  onClick={handleInformationClick}
                  endIcon={<KeyboardArrowDown sx={{ color: isDarkMode ? '#FFFFFF !important' : '#141416 !important' }} />}
                  sx={navBtnSx}
                >
                  Information
                </Button>
                <Menu
                  className="dropdown-menu"
                  id="information-positioned-menu"
                  aria-labelledby="information-positioned-button"
                  anchorEl={informationAnchorEl}
                  open={informationOpen}
                  sx={{ borderRadius: "12px" }}
                  onClose={handleInformationClose}
                  disableScrollLock={true}
                >
                  <MenuItem
                    onClick={handleLatestInformation}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <InfoOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} />
                    Information
                  </MenuItem>

                  <MenuItem
                    onClick={handleResearchReport}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <DescriptionOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} />
                    Research Report
                  </MenuItem>

                  <MenuItem
                    onClick={handlePressRelease}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <CampaignOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} />
                    Press Release
                  </MenuItem>

                  <MenuItem
                    onClick={handleGuestPost}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <EditNoteOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} />
                    Guest Post
                  </MenuItem>

                  <MenuItem
                    onClick={handleSponsored}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <PaidOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} />
                    Sponsored
                  </MenuItem>

                  <MenuItem onClick={handleCryptoRegulation}>
                    <GavelOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} />
                    Crypto Regulation
                  </MenuItem>
                </Menu>
              </li>
            </ul>
            <ul className="navItem">
              <li>
                <Button
                  id="analysis-positioned-button"
                  aria-controls={analysisOpen ? "analysis-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={analysisOpen ? "true" : undefined}
                  onClick={handleAnalysisClick}
                  endIcon={<KeyboardArrowDown sx={{ color: isDarkMode ? '#FFFFFF !important' : '#141416 !important' }} />}
                  sx={navBtnSx}
                >
                  Analysis
                </Button>

                <Menu
                  className="dropdown-menu"
                  id="analysis-positioned-menu"
                  aria-labelledby="analysis-positioned-button"
                  anchorEl={analysisAnchorEl}
                  open={analysisOpen}
                  sx={{ borderRadius: "12px" }}
                  onClose={handleAnalysisClose}
                  disableScrollLock={true}
                >
                  <MenuItem
                    onClick={handlePriceAnalysis}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <AnalyticsOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Price Analysis
                  </MenuItem>
                  <MenuItem onClick={handlePricePrediction}>
                    <TrendingUpOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Cryptocurrency Price Prediction
                  </MenuItem>
                  <MenuItem onClick={handleStockPricePrediction}>
                    <TrendingUpOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Crypto Stock Price Prediction
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
                sx={navBtnSx}
              >
                {item.icon && <img src={item.icon} alt={item.page} />}
                {item.page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex", flex: 2, textAlign: "right" },
              gap: { xs: '10px', sm: "6px", md: '12px' },
              alignItems: "center",
            }}
            justifyContent="end"
          >
            <IconButton
              onClick={handleDarkMode}
              aria-label="theme toggle"
              className="mobile-none"
              sx={{
                color: isDarkMode ? '#FFD700' : '#23262F',
                transition: 'all 0.2s ease',
                p: 1,
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                },
              }}
            >
              {isDarkMode ? <WbSunnyOutlined sx={{ fontSize: 22 }} /> : <BedtimeIcon sx={{ fontSize: 22 }} />}
            </IconButton>

            <Button
              onClick={() => {
                navigate("/create-account");
              }}
              variant="contained"
              className="btn btn-primary"
              sx={{
                color: "#FFFFFF !important",
                backgroundColor: "#3772ff !important",
                borderRadius: "90px !important",
                px: { sm: 2, md: 2.8 },
                py: 0.8,
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "capitalize",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#2055d4 !important",
                },
              }}
            >
              Sign up
            </Button>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant="outlined"
              className="btn btn-outline"
              sx={{
                color: isDarkMode ? "#FFFFFF !important" : "#23262F !important",
                backgroundColor: isDarkMode ? "transparent !important" : "#FFFFFF !important",
                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.25) !important" : "1px solid #E6E8EC !important",
                borderRadius: "90px !important",
                px: { sm: 2, md: 2.8 },
                py: 0.8,
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "capitalize",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#3772ff !important",
                  color: "#3772ff !important",
                },
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
            disableScrollLock={true}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
              disableScrollLock: true,
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
