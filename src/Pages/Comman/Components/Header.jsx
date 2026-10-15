import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import { Box, CircularProgress, Grid, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Accordion, AccordionDetails, AccordionSummary } from '@mui/material/';
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
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import TollIcon from '@mui/icons-material/Toll';
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PublicIcon from '@mui/icons-material/Public';
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
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
  const [logoLoading, setLogoLoading] = useState(true);

  useEffect(() => {
    const response = LogoListAction.logoList();
    response.then((res) => { (res) })
  }, []);

  useEffect(() => {
    setLogoLoading(true);
  }, [logoSrc]);

  const navItems = [
    {
      page: 'Learn crypto',
      icon: '',
      link: RoutesName.Learn_Cypto,
    },
    {
      page: 'Markets',
      icon: '',
      link: RoutesName.Prediction_Dashboard,
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
  const handleBitcoinNews = () => {
    setNewsAnchorEl(null);
    navigate(RoutesName.Bitcoin);
  };
  const handleEthereumNews = () => {
    setNewsAnchorEl(null);
    navigate(RoutesName.Ethereum);
  };
  const handleAltcoinNews = () => {
    setNewsAnchorEl(null);
    navigate(RoutesName.Altcoin);
  };
  const handleGlobalNews = () => {
    setNewsAnchorEl(null);
    navigate(RoutesName.Global_News);
  };

  const [informationAnchorEl, setInformationAnchorEl] = React.useState(null);
  const informationOpen = Boolean(informationAnchorEl);
  const handleInformationClick = (event) => {
    setInformationAnchorEl(event.currentTarget);
  };
  const handleInformationClose = () => {
    setInformationAnchorEl(null);
  };
  const [analysisAnchorEl, setAnalysisAnchorEl] = React.useState(null);
  const analysisOpen = Boolean(analysisAnchorEl);

  const [contactAnchorEl, setContactAnchorEl] = React.useState(null);
  const contactOpen = Boolean(contactAnchorEl);

  const handleAnalysisClick = (event) => {
    setAnalysisAnchorEl(event.currentTarget);
  };

  const handleAnalysisClose = () => {
    setAnalysisAnchorEl(null);
  };

  const handleContactClick = (event) => {
    setContactAnchorEl(event.currentTarget);
  };

  const handleContactClose = () => {
    setContactAnchorEl(null);
  };

  const handleContactUs = () => {
    setContactAnchorEl(null);
    navigate(RoutesName.Contact_Us);
  };

  const handleTermsOfUse = () => {
    setContactAnchorEl(null);
    navigate(RoutesName.Terms_of_Use);
  };

  const handlePrivacyPolicy = () => {
    setContactAnchorEl(null);
    navigate(RoutesName.Privacy_Policy);
  };

  const handleDisclaimer = () => {
    setContactAnchorEl(null);
    navigate(RoutesName.Disclaimer);
  };

  const handlePriceAnalysis = () => {
    setAnalysisAnchorEl(null);
    navigate(RoutesName.Price_Prediction);
  };

  const handleStockPricePrediction = () => {
    setAnalysisAnchorEl(null);
    navigate(RoutesName.Crypto_Stock_Price_Prediction);
  };

  const handleBitcoinAnalysis = () => {
    setAnalysisAnchorEl(null);
    navigate(RoutesName.Bitcoin_Analysis);
  };

  const handleEthereumAnalysis = () => {
    setAnalysisAnchorEl(null);
    navigate(RoutesName.Ethereum_Analysis);
  };

  const handleMemecoinAnalysis = () => {
    setAnalysisAnchorEl(null);
    navigate(RoutesName.Memecoin_Analysis);
  };

  const handlePressRelease = () => {
    setInformationAnchorEl(null);
    navigate(RoutesName.Press_Release);
  };

  const handleExplain = () => {
    setInformationAnchorEl(null);
    navigate(RoutesName.Explain);
  };

  const handleFinance = () => {
    setInformationAnchorEl(null);
    navigate(RoutesName.Finance);
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


  const menuBorderTopSx = {
    borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.1) !important' : '1px solid #E6E8EC !important',
  };

  const drawer = (
    <>
      <Box className='mobile-nav-box mobile-navbar' sx={{ padding: { xs: '20px', md: '10px' }, width: '100%' }}>
        <Box className='close-btn' sx={{ cursor: 'pointer' }} onClick={handleDrawerToggle}><p>+</p></Box>
        <Box>
          <img
            onClick={() => {
              handleDrawerToggle();
              navigate('/');
            }}
            src={logoSrc}
            alt="The Coin Chain"
            style={{ cursor: 'pointer', width: '170px' }}
          />
          <IconButton onClick={handleDarkMode} aria-label="sunny" className='theme-selector theme-mode-switcher' color="primary " sx={{ border: '1px solid #777e90', borderRadius: '90px' }} ><WbSunnyOutlined /></IconButton>
          <Box sx={{ paddingTop: { xs: '12px', sm: '60px' } }} className='mobile-menu'>
            <Button
              variant='standard'
              className='nav-mobile-btn btn'
              onClick={() => { handleDrawerToggle(), navigate(RoutesName.User_Dashboard) }}
              sx={{
                // ...menuBorderTopSx,
                width: '100%',
                justifyContent: 'flex-start',
                borderRadius: 0,
                py: 1,
              }}
            >
              Crypto
            </Button>
            {/* <Accordion className='submenu mobile-nav-dropdown'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="acadamy"
              >
                <Button id="acedamy-btn">
                  Academy
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Academy_about_crypto); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}><img className='gallery-menu-icon' src={galleryImage} alt="" /> All About Crypto </Typography>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Master_Course); }} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', pt: 1 }}><img className='gallery-menu-icon' src={galleryImage} alt="" /> Master Course</Typography>
              </AccordionDetails>
            </Accordion> */}
            <Accordion
              className='submenu mobile-nav-dropdown'
              sx={{
                ...menuBorderTopSx,
                '&:before': {
                  display: 'block !important',
                  opacity: '1 !important',
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1) !important' : '#E6E8EC !important',
                },
                boxShadow: 'none',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="news-accordion"
              >
                <Button id="news-btn">
                  News
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Latest_News); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}><ArticleOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Latest News</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Bitcoin); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}><CurrencyBitcoinIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Bitcoin</Typography>

              </AccordionDetails>
              <AccordionDetails>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Ethereum); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}><PaidOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Ethereum</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Altcoin); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}><TollIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Altcoin</Typography>
              </AccordionDetails>
              <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Global_News); }} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}><PublicIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Global News</Typography>
            </Accordion>

            <Accordion className='submenu mobile-nav-dropdown' sx={{ ...menuBorderTopSx, '&:before': { display: 'none !important' }, boxShadow: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="analysis-accordion"
              >
                <Button id="analysis-btn">
                  Analysis
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Price_Prediction); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}>
                  <AnalyticsOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Price Analysis
                </Typography>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Crypto_Stock_Price_Prediction); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}>
                  <TrendingUpOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Stock Price Analysis
                </Typography>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Bitcoin_Analysis); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}>
                  <TrendingUpOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Bitcoin Analysis
                </Typography>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Ethereum_Analysis); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}>
                  <TrendingUpOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Ethereum Analysis
                </Typography>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Memecoin_Analysis); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}>
                  <TrendingUpOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Memecoin Analysis
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion className='submenu mobile-nav-dropdown' sx={{ ...menuBorderTopSx, '&:before': { display: 'none !important' }, boxShadow: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="information-accordion"
              >
                <Button id="information-btn">
                  Information
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Explain); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}>
                  <MenuBookOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Expain
                </Typography>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Finance); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1, pt: 1 }}>
                  <AccountBalanceOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Finance
                </Typography>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Press_Release); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1, pt: 1 }}>
                  <CampaignOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Press Release
                </Typography>
              </AccordionDetails>
            </Accordion>

            <List sx={{ padding: '0px' }}>
              {navItems.map((item, i) => {
                return (
                  <ListItem key={i} disablePadding sx={menuBorderTopSx}>
                    <ListItemButton >
                      {item.icon &&
                        <img src={item.icon} alt={item.page} />
                      }
                      <ListItemText primary={`${item.page}`} onClick={() => { handleDrawerToggle(); navigate(item.link); }} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
            <Accordion className='submenu mobile-nav-dropdown' sx={{ ...menuBorderTopSx, '&:before': { display: 'none !important' }, boxShadow: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5a-content"
                id="contact-accordion"
              >
                <Button id="contact-btn">
                  Contact
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Contact_Us); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}>
                  <ContactMailOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Contact Us
                </Typography>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Privacy_Policy); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}>
                  <PrivacyTipOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Privacy Policy
                </Typography>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Terms_of_Use); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}>
                  <GavelOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Terms Of Use
                </Typography>
                <Typography onClick={() => { handleDrawerToggle(); navigate(RoutesName.Disclaimer); }} sx={{ borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E8EC', display: 'flex', alignItems: 'center', cursor: 'pointer', pb: 1 }}>
                  <ReportProblemOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} /> Disclaimer
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box >
        </Box >
        {/* <Box display='flex' justifyContent='space-between'>
          <Button variant="contained" className='btn btn-primary' sx={{ color: '#ffffff', backgroundColor: '#3772FF', borderRadius: '90px' }}>Sign Up</Button>
          <Button variant="outlined" className='btn btn-outlined-secondary' sx={{ color: '#777e90', backgroundColor: 'transparent', border: '1px solid #777e90', borderRadius: '90px' }}>Login</Button>
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
          <IconButton className='mobile-search' aria-label="sunny" color="primary " sx={{}} ><Search /></IconButton>


        </Box> */}

      </Box >
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
            display: { sm: 'none' }, maxWidth: { xs: '150px', sm: '150px', lg: '180px' },
            pr: 2
          }}>
            {logoLoading && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  size={24}
                  thickness={4}
                  sx={{ color: "#3772ff" }}
                />
              </Box>
            )}

            {logoSrc && (
              <img
                key={logoSrc}
                onClick={() => { navigate('/') }}
                src={logoSrc}
                alt="The Coin Chain"
                onLoad={() => setLogoLoading(false)}
                onError={() => setLogoLoading(false)}
                style={{
                  width: "100%",
                  maxHeight: "45px",
                  objectFit: "contain",
                  borderRadius: "15px",
                  display: logoLoading ? "none" : "block",
                }}
              />
            )}
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
            className="header-logo-border"
            onClick={() => navigate("/")}
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
              },
              lineHeight: "100%",
              flex: 1,
              cursor: "pointer",
              maxWidth: { xs: "120px", sm: "150px", lg: "180px" },
              pr: { xs: "4px", sm: "4px", lg: "16px" },
              height: "45px",
              position: "relative",
            }}
          >
            {logoLoading && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  size={24}
                  thickness={4}
                  sx={{ color: "#3772ff" }}
                />
              </Box>
            )}

            {logoSrc && (
              <img
                key={logoSrc}
                src={logoSrc}
                alt="The Coin Chain"
                onLoad={() => setLogoLoading(false)}
                onError={() => setLogoLoading(false)}
                style={{
                  width: "100%",
                  maxHeight: "45px",
                  objectFit: "contain",
                  borderRadius: "15px",
                  display: logoLoading ? "none" : "block",
                }}
              />
            )}
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
                  <MenuItem onClick={handleBitcoinNews} sx={{ borderBottom: "1px solid #E6E8EC" }}>
                    <CurrencyBitcoinIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Bitcoin
                  </MenuItem>
                  <MenuItem onClick={handleEthereumNews} sx={{ borderBottom: "1px solid #E6E8EC" }}>
                    <PaidOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Ethereum
                  </MenuItem>
                  <MenuItem onClick={handleAltcoinNews} sx={{ borderBottom: "1px solid #E6E8EC" }}>
                    <TollIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Altcoin
                  </MenuItem>
                  <MenuItem onClick={handleGlobalNews} >
                    <PublicIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Global News
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

                  <MenuItem onClick={handleStockPricePrediction}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}>
                    <TrendingUpOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Stock Price Analysis
                  </MenuItem>

                  <MenuItem onClick={handleBitcoinAnalysis}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}>
                    <CurrencyBitcoinIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Bitcoin Analysis
                  </MenuItem>

                  <MenuItem onClick={handleEthereumAnalysis}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}>
                    <PaidOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Ethereum Analysis
                  </MenuItem>

                  <MenuItem onClick={handleMemecoinAnalysis}>
                    <InsertEmoticonOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Memecoin Analysis
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
                    onClick={handleExplain}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <MenuBookOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} />
                    Expain
                  </MenuItem>

                  <MenuItem onClick={handleFinance} sx={{ borderBottom: "1px solid #E6E8EC" }}>
                    <AccountBalanceOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} />
                    Finance
                  </MenuItem>

                  <MenuItem
                    onClick={handlePressRelease}
                  >
                    <CampaignOutlinedIcon sx={{ fontSize: 18, mr: 1, color: "#777E90" }} />
                    Press Release
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
                sx={{ ...navBtnSx, width: '145px' }}
              >
                {item.icon && <img src={item.icon} alt={item.page} />}
                {item.page}
              </Button>
            ))}

            <ul className="navItem">
              <li>
                <Button
                  id="contact-positioned-button"
                  aria-controls={contactOpen ? "contact-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={contactOpen ? "true" : undefined}
                  onClick={handleContactClick}
                  endIcon={<KeyboardArrowDown sx={{ color: isDarkMode ? '#FFFFFF !important' : '#141416 !important' }} />}
                  sx={navBtnSx}
                >
                  Contact
                </Button>

                <Menu
                  className="dropdown-menu"
                  id="contact-positioned-menu"
                  aria-labelledby="contact-positioned-button"
                  anchorEl={contactAnchorEl}
                  open={contactOpen}
                  sx={{ borderRadius: "12px" }}
                  onClose={handleContactClose}
                  disableScrollLock={true}
                >
                  <MenuItem
                    onClick={handleContactUs}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <ContactMailOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Contact Us
                  </MenuItem>

                  <MenuItem onClick={handlePrivacyPolicy}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <PrivacyTipOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Privacy Policy
                  </MenuItem>

                  <MenuItem onClick={handleTermsOfUse}
                    sx={{ borderBottom: "1px solid #E6E8EC" }}
                  >
                    <GavelOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Terms of Use
                  </MenuItem>

                  <MenuItem onClick={handleDisclaimer}>
                    <ReportProblemOutlinedIcon
                      sx={{ fontSize: 18, mr: 1, color: "#777E90" }}
                    />
                    Disclaimers
                  </MenuItem>
                </Menu>
              </li>
            </ul>
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

            {/* <Button
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
            </Button> */}
            {/* <Button
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
            </Button> */}
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
