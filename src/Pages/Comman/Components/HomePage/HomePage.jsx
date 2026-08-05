import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Stack,
  Tab,
  Select,
  MenuItem,
  FormControl,
  Avatar,
} from "@mui/material";
import {
  ArrowCircleDownSharp,
  KeyboardArrowRight,
  East,
  West,
  Block,
  Mic,
  PlayArrow,
} from "@mui/icons-material";
import HeroImage from "../../../../../public/assets/images/banner.svg";
import Leveraged from "../../../../../public/assets/images/leveraged.svg";
import BuyCypto from "../../../../../public/assets/images/crypto-trader-01.svg";
import Market from "../../../../../public/assets/images/market.svg";
import LearnCypto from "../../../../../public/assets/images/learn-cypto.svg";
import Appleicon from "../../../../../public/assets/images/icons/apple.svg";
import GoogleIcon from "../../../../../public/assets/images/google-g-2015-logo-svgrepo-com.svg";
import InformedCypto from "../../../../../public/assets/images/informed-cypto.svg";
import DarkLogo from "../../../../../public/assets/images/logo.svg";
import Globe from "../../../../../public/assets/images/globe.svg";
import Wallet from "../../../../../public/assets/images/crypto-trader-03.svg";
import Money from "../../../../../public/assets/images/money.svg";
import Treding from "../../../../../public/assets/images/crypto-trader-01.svg";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Marquee from "react-fast-marquee";
import CryptoTable from "../../CryptoTable";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  useCoinActions,
  useTutorialActions,
  useHomeActions,
  bannerListActions
} from "../../../../_actions";
import {
  coinCategoryAtom,
  selectedCategoryAtom,
  tutorialAtom,
  cardCoinsAtom,
  loaderAtom,
  bannerListAtom,
  tutorialCategoryAtom,
  forecastSubAtom,
  authAtom,
  blogListAtom,
  blogimgAtom,
  blogVideoAtom,
  homeBannerAtom,
  cryptoNewsAtom,
  cryptoTraderAtom,
  WorkListAtom,
  headingListAtom,
  breadCrumbAtom,
  switchDarkModeAtom
} from "../../../../_state/";
import ReactPlayer from "react-player";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Alert from "@mui/material/Alert";
import ReactHtmlParser from 'react-html-parser';
import { Apis, RoutesName } from "../../../../_common/app.constants";
import MuiLatestNewsDashboard from "../../../Comman/Components/MuiLatestNewsDashboardSection";
import MuiPressReleaseDashboard from "../../../Comman/Components/MuiPressReleaseDashboardSection";
import MuiBussinesNewsDashboard from "../../../Comman/Components/MuiBussinesNewsDashboardSection";
import MuiResearchReportsDashboard from "../../../Comman/Components/MuiResearchReportsDashboardSection";
import MuiTrendingNewsDashboardSection from "../MuiTrandingNewsDashboardSection";
import { useFetchWrapper } from "../../../../_helpers";
import { Helmet } from "react-helmet-async";

// ---- Static JSON data for podcast notifications ----


const NOTIFICATION_INTERVAL = 5000; // 2 sec

// ---- NotificationCard Component ----
const NotificationCard = ({
  data,
  entering = true,
  variant = "active",
  sx = {},
  onClick
}) => {
  const hoverTransform =
    variant === "stacked"
      ? "translateX(-50%) translateY(24px) scale(0.95)"
      : `translate(-50%, ${entering ? "-6px" : "84px"}) scale(${entering ? 1.015 : 0.975})`;

  return (
    <Box
      onClick={onClick}
      sx={{
        width: { xs: 310, md: 520 },
        p: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 2,

        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",

        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: "22px",
        overflow: "hidden",
        isolation: "isolate",

        boxShadow:
          "0 20px 60px rgba(0,0,0,.45), inset 0 1px 1px rgba(255,255,255,.08)",

        cursor: "pointer",
        transition: "transform .55s cubic-bezier(0.22, 1, 0.36, 1), opacity .45s ease, box-shadow .35s ease, border-color .35s ease",
        willChange: "transform, opacity",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(115deg, transparent 20%, rgba(170,225,255,.12) 42%, rgba(255,255,255,.38) 50%, rgba(130,108,255,.16) 58%, transparent 80%)",
          transform: "translateX(-130%) skewX(-18deg)",
        },

        "&::after": {
          content: '"✦"',
          position: "absolute",
          right: 14,
          bottom: 8,
          zIndex: 2,
          color: "rgba(210,235,255,.85)",
          fontSize: 26,
          lineHeight: 1,
          opacity: 0,
          pointerEvents: "none",
          filter: "drop-shadow(0 0 9px rgba(145,205,255,.95))",
          transform: "scale(.35) rotate(-30deg)",
          transition: "opacity .2s ease, transform .45s cubic-bezier(.22, 1, .36, 1)",
        },

        "& > *": {
          position: "relative",
          zIndex: 1,
        },

        "&:hover": {
          transform: hoverTransform,
          borderColor: "rgba(164,221,255,.55)",
          boxShadow:
            "0 35px 70px rgba(0,0,0,.55), 0 0 28px rgba(90,177,255,.3), inset 0 1px 1px rgba(255,255,255,.18)",
        },

        "&:hover::before": {
          opacity: 1,
          animation: "notification-card-shimmer 1.1s ease-out",
        },

        "&:hover::after": {
          opacity: 1,
          transform: "scale(1) rotate(0deg)",
        },

        "@keyframes notification-card-shimmer": {
          from: { transform: "translateX(-130%) skewX(-18deg)" },
          to: { transform: "translateX(130%) skewX(-18deg)" },
        },

        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover::before": { animation: "none" },
        },

        ...sx,
      }}
    >
      <Avatar
        src={data.avatar}
        sx={{
          width: 64,
          height: 64,
          border: "3px solid rgba(120,160,255,.6)",
        }}
      />

      <Box flex={1}>
        <Typography
          sx={{
            color: "#b6bcc8",
            fontSize: 12,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {data.type}
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 30,
            lineHeight: 1.15,
          }}
        >
          {data.title}
        </Typography>

        <Typography
          sx={{
            color: "#c2c5cf",
            fontSize: 16,
            mt: .5,
          }}
        >
          Host: {data.host}
          {data.duration && ` | ${data.duration}`}
          {" | "}
          {data.time}
        </Typography>
      </Box>
    </Box>
  );
};

// ---- GlobalCommunitySection Component ----
const GlobalCommunitySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [entering, setEntering] = useState(true);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const isDarkMode = useRecoilValue(switchDarkModeAtom);
  const [guestPosts, setGuestPosts] = useState([]);
  const fetchWrapper = useFetchWrapper();
  const [loading, setLoading] = useState(true);

  const podcastNotifications = guestPosts.map((item) => ({
    id: item.id,
    type: item.type?.replace(/_/g, " ").toUpperCase(),
    title: item.title,
    host: item.profile_name,
    duration: null,
    time: dayjs(item.created_at).format("MMM DD, YYYY hh:mm A"),
    avatar: item.profile_image
      ? `${process.env.REACT_APP_IMAGE_URL}/${item.profile_image}`
      : "",
    image: item.get_media_display
      ? `${process.env.REACT_APP_IMAGE_URL}/${item.get_media_display}`
      : "",
    url: RoutesName.Blog_Detail.replace(":id", item.id),
  }));

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setEntering(false);
      setTimeout(() => {
        setActiveIndex((prev) =>
          guestPosts.length
            ? (prev + 1) % guestPosts.length
            : 0
        );
        setEntering(true);
      }, 250);
    }, NOTIFICATION_INTERVAL);

    return () => clearInterval(timerRef.current);
  }, [guestPosts.length]);

  const current =
    podcastNotifications[activeIndex] || {};

  const next =
    podcastNotifications[
    (activeIndex + 1) % (podcastNotifications.length || 1)
    ] || {};

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetchWrapper.get(Apis.All_Content('guest_post'));
        setGuestPosts(response?.data || []);
      } catch (error) {
        console.error('Unable to fetch guest posts:', error);
        setGuestPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  const slugify = (text = "") =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

  const openDetail = (id, title) => {
    if (id !== undefined && id !== null) {
      navigate(
        RoutesName.Blog_Detail
          .replace(":id", String(id))
          .replace(":slug", slugify(title))
      );
    }
  };

  return (
    <Box
      className="global-community-hero"
      sx={{
        background: "#0f1117",
        borderRadius: { xs: "24px", md: "32px" },
        overflow: "hidden",
        position: "relative",
        border: isDarkMode ? "1px solid rgba(189, 189, 189, 0.16)" : "none",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 6, md: 4 },
            py: { xs: 3, md: 3 },
          }}
        >
          {/* Left text side */}
          <Box sx={{ flex: 1, color: "#fff", zIndex: 2, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              className="small-caption"
              sx={{
                color: "#8a8f9c",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                fontSize: "13px !important",
                mb: 2,
              }}
            >
              CRYPTO NEWS
            </Typography>
            <Typography
              variant="h2"
              className="secondary-font"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "32px", md: "44px" },
                lineHeight: 1.15,
                mb: 3,
              }}
            >
              Be Part of our Global Community
            </Typography>
            <Typography
              sx={{
                color: "#9aa0ab",
                fontSize: "16px",
                maxWidth: "440px",
                mb: 5,
                mx: { xs: "auto", md: 0 },
              }}
            >
              Let's stay in touch. Join our communities to keep up with the
              Coinguru team and our traders from across the world?
            </Typography>
          </Box>

          {/* Right graphic side with centered cards */}

          <Box
            sx={{
              flex: 1,
              position: "relative",
              width: "100%",
              minHeight: { xs: "320px", md: "400px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Globe illustration - centered */}
            <Box
              component="img"
              src={Globe}
              alt="Global community"
              sx={{
                width: { xs: "180px", md: "260px" },
                opacity: 0.7,
                position: "relative",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            {/* Faint next card behind (stack effect) */}
            <NotificationCard
              data={next}
              variant="stacked"
              sx={{
                position: "absolute",
                bottom: { xs: "35px", md: "55px" },
                left: "50%",
                transform: "translateX(-50%) translateY(30px) scale(0.92)",
                opacity: 0.5,
                zIndex: 2,
                width: { xs: "320px", sm: "420px", md: "520px" },
                transition: "all 800ms cubic-bezier(0.43, 0.05, 0.3, 1)",
                willChange: "transform, opacity",
              }}
            />

            {/* Active animated card */}
            <NotificationCard
              key={current.id}
              data={current}
              entering={entering}
              onClick={() => current?.id && openDetail(current.id, current.title)}
              sx={{
                position: "absolute",

                // Move card higher
                bottom: { xs: "95px", md: "135px" },

                left: "50%",

                transform: entering
                  ? "translate(-50%, 0px) scale(1)"
                  : "translate(-50%, 90px) scale(0.96)",

                opacity: entering ? 1 : 0,

                zIndex: 3,
                width: { xs: "320px", sm: "420px", md: "520px" },

                transition: `
                transform 800ms cubic-bezier(0.43, 0.05, 0.3, 1),
                opacity 700ms ease
              `,

                willChange: "transform, opacity",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const Home = () => {
  const [marketTrend, setMarketTrend] = useState(1);

  const handleChangeMarketTrend = (event) => {
    setMarketTrend(event.target.value);
  };

  const coinActions = useCoinActions();
  const homeActions = useHomeActions();
  const bannerActions = bannerListActions();
  const tutorialsData = useRecoilValue(tutorialAtom);
  const tutorialAction = useTutorialActions();
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const categoryList = useRecoilValue(coinCategoryAtom);
  const selectedCat = useRecoilValue(selectedCategoryAtom);
  const cardCoinsList = useRecoilValue(cardCoinsAtom);
  const loader = useSetRecoilState(loaderAtom);
  const [tutorialsList, setTutorialList] = useState(tutorialsData);
  const homeBannerData = useRecoilValue(homeBannerAtom);
  const WorkList = useRecoilValue(WorkListAtom);
  const headingList = useRecoilValue(headingListAtom);

  const [blogImg, setBlogimg] = useRecoilState(blogListAtom);
  const [blogNew, setBlognew] = useRecoilState(blogimgAtom);
  const [blogVideo, setBlogvideo] = useRecoilState(blogVideoAtom);

  const crypotTraderList = useRecoilValue(cryptoTraderAtom);
  const cryptoNewsList = useRecoilValue(cryptoNewsAtom);

  const [loadmore, setLoadmore] = useState(4);
  const bannerList = useRecoilValue(bannerListAtom);

  const tutorialCategory = useRecoilValue(tutorialCategoryAtom).filter((item) => {
    return item.type === "Tutorial";
  });
  const subscribeUser = useRecoilValue(forecastSubAtom);
  const auth = useRecoilValue(authAtom);
  const [breadcrumb, setBreadCrumb] = useRecoilState(breadCrumbAtom);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    newValue === "1"
      ? setTutorialList(tutorialsData)
      : handleTutorials(newValue);
  };

  const handleTutorials = (tutorialCategory) => {
    let tutorialsArr = [];
    tutorialsArr = tutorialsData
      .filter((items) => {
        return items.category === tutorialCategory;
      })
    setTutorialList(tutorialsArr);
  };

  useEffect(() => {
    if (value === "1") setTutorialList(tutorialsData);
  }, [tutorialsData]);

  const getFirstLetters = (str) => {
    return (firstLetters = "");
  };

  //Category & tutorial Api
  useEffect(() => {
    tutorialAction.tutorialData();
    tutorialAction.categoryList();
    homeActions.cryptoTrader()
    homeActions.cryptoNews()

  }, []);

  // Api home_banner-list
  useEffect(() => {
    const response = bannerActions.homeBannerList();
    response.then((res) => { (res) })

    const responsed = bannerActions.get();
    responsed.then((res) => { (res) })

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const videoLink = (data) => {
    setBreadCrumb(data.category)
    let learnSeo = data.slug
    navigate(`${RoutesName.learn_Crypto_Details}/learncyptovideo/${learnSeo}`)
    setBlogimg(data)
    setBlognew(true)
    setBlogvideo(true)
  }

  const handleLoadmore = () => {
    setLoadmore(loadmore + 20);
  }

  // Api crytoWorkList
  useEffect(() => {
    const response = homeActions.crytoWorkList();
    response.then((res) => { (res) })
  }, []);

  // Api HeadingList
  useEffect(() => {
    const response = homeActions.headingList();
    response.then((res) => { (res) })
  }, []);

  return (
    <>
      <Helmet>
        <title>CoinGuru | Latest Crypto News, Market Analysis & Price Predictions</title>

        <meta
          name="description"
          content="Stay updated with the latest cryptocurrency news, Bitcoin updates, market analysis, research reports, press releases and price predictions on CoinGuru."
        />

        <meta
          name="keywords"
          content="crypto news, bitcoin news, ethereum news, blockchain, cryptocurrency, price prediction, market analysis"
        />

        <link rel="canonical" href={window.location.href} />

        <meta
          property="og:title"
          content="CoinGuru | Latest Crypto News, Market Analysis & Price Predictions"
        />

        <meta
          property="og:description"
          content="Read the latest cryptocurrency news, research reports, press releases and market insights on CoinGuru."
        />

        <meta property="og:url" content={window.location.href} />

        <meta property="og:type" content="website" />
      </Helmet>
      <Box component="main" sx={{ pt: 8 }}></Box>
      {/* Banner starts */}
      {homeBannerData?.map((items) => {
        let title = items.title;
        let decription = items.decription;
        let image = items.image ? `${process.env.REACT_APP_IMAGE_URL}/${items.image}` : items.image_link;
        return (
          <Container>
            <Box sx={{ py: { xs: 4, sm: 6 } }}>
              {subscribeUser?.status === "expired" && auth !== null ?
                <Stack sx={{ width: '100%', marginLeft: 'auto', marginTop: '22px', marginBottom: '1rem' }} spacing={2}>
                  <Alert severity="info">You don't have any current plan please <Link to={'/subscription'}> <b>subscribe </b></Link> !</Alert>
                </Stack>
                : ""}
              <Grid container sx={{ alignItems: "center" }}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    paddingRight: { xs: "0px", md: "50px" },
                    paddingTop: { xs: "50px", md: "0px" },
                  }}
                >
                  <Typography
                    variant="h1 "
                    component="div"
                    className="hero-heading primary-color"
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    className="hero-para primary-font secondary-color"
                    sx={{
                      paddingBottom: { xs: "30px", md: "50px" },
                      paddingTop: { xs: "20px" },
                    }}
                  >
                    {ReactHtmlParser(decription)}
                  </Typography>
                  <Typography paddingBottom={2}>
                    <Button
                      variant="contained"
                      className="btn btn-primary "
                      sx={{ borderRadius: "90px" }}
                      onClick={() => {
                        navigate("./market");
                      }}
                    >
                      Get started now
                    </Button>
                  </Typography>
                  <IconButton
                    aria-label="ArrowCircleDown"
                    variant="outlined"
                    color="#B1B5C3"
                    padding={0}
                  >
                    <ArrowCircleDownSharp
                      sx={{ color: "#B1B5C3" }}
                      onClick={() => {
                        window.scrollTo({ top: 1800, left: 0, behavior: "smooth" });
                      }}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {/* <img className="heroImage" src={image} alt='' /> */}
                  < MuiTrendingNewsDashboardSection />
                </Grid>
              </Grid>
            </Box>
          </Container >
        )
      })}
      {/* Banner Ends */}
      <Container sx={{ pb: { xs: 4, sm: 6 } }}>
        <Box
          sx={{ alignItems: "center" }}
          className="grid-bit"
          padding={3}
          borderRadius={6}
          border="1px solid rgb(86 98 255 / 14%)"
        >
          <Grid container>
            {cardCoinsList?.map((item, index) => {
              let newPrice =
                item?.price > 1
                  ? Math.round(item.price * 100) / 100
                  : item?.price < 1 && item?.price >= 0.1
                    ? (Math.round(item.price * 10000) / 10000)?.toFixed(2)
                    : item?.price < 0.1 && item?.price > 0.01
                      ? (Math.round(item.price * 1000000) / 1000000)?.toFixed(6)
                      : item?.price < 0.01
                        ? (Math.round(item.price * 100000000) / 100000000)?.toFixed(8)
                        : item?.price;
              if (index < 4) {
                return (
                  <Grid item xs={12} sm={4} md={4} lg={3} className="gridBox">
                    <img
                      src={`https://www.crypto-rating.com/img/crypto-currencies/${item.symbol.toLowerCase()}.png`}
                      alt={item.symbol}
                      width="33px"
                    />
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      paddingTop={1}
                      paddingBottom={1}
                    >
                      <Typography
                        className="top-head"
                        sx={{ fontSize: "12px !important" }}
                      >
                        {item.symbol}/USDT
                      </Typography>
                      <Button
                        variant="contained"
                        className={
                          item.percent_change_24h < 0
                            ? "orange-btn"
                            : "green-btn"
                        }
                        sx={{ borderRadius: "90px", cursor: "default" }}
                      >
                        {item.percent_change_24h?.toFixed(2)}%
                      </Button>
                    </Stack>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ fontSize: "20px !important" }}
                      fontWeight={600}
                      paddingBottom={1}
                      className="primary-font"
                    >
                      {newPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontSize: "12px !important" }}
                      fontWeight={400}
                      className="primary-font"
                    >
                      {item.volume_24h?.toFixed(2)}
                    </Typography>
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      </Container>
      {/* Latest News */}
      <Box className="become-crypto">
        <Container sx={{ paddingY: 0 }}>
          <Box>
            <Typography
              variant="h2"
              component="h2"
              className="secondary-font font-40"
              textAlign="center"
              sx={{ fontWeight: "700", maxWidth: "500px", margin: "auto" }}
            >
              {ReactHtmlParser(headingList[0]?.title ?? "")}
            </Typography>
            <Typography
              className="secondary-color"
              sx={{ textAlign: { xs: "left", md: "center" } }}
              paddingTop={2}
            >
            </Typography>
            <Box sx={{ paddingY: 0 }}>
              <MuiLatestNewsDashboard />
            </Box>
            <Button
              sx={{ margin: "0 auto" }}
              variant="contained"
              className="btn btn-primary m-width-100"
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact Us
            </Button>
          </Box>
          <MuiPressReleaseDashboard />
        </Container>
      </Box>

      {/* Global Community Section */}
      {/* <Container>
      </Container> */}


      {/* learn cypto star*/}
      <Container>

        <MuiBussinesNewsDashboard />


        {/* <Box className="become-crypto">
          <Container>
            <Box>
              <Typography
                variant="h2"
                component="h2"
                className="secondary-font font-40"
                textAlign="center"
                sx={{ fontWeight: "700", maxWidth: "500px", margin: "auto" }}
              >
                Become a crypto trader in seconds
              </Typography>
              <Typography
                className="secondary-color"
                sx={{ textAlign: { xs: "left", md: "center" } }}
                paddingTop={2}
              >
                We've got everything you need to start trading.
              </Typography>
              <Box paddingY={{ xs: 6, sm: 8 }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12} sm={4}>
                    <Box textAlign="center" className="grid-cypto-trade">
                      <img src={BuyCypto} paddingBottom={3} />
                      <Typography variant="h6" paddingBottom={3}>
                        Buy & Sell Crypto
                      </Typography>
                      <Typography
                        className="body-caption secondary-color"
                        paddingBottom={3}
                      >
                        We realize ideas from simple to complex, everything
                        becomes easy to use and reach the most potential
                        customers.
                      </Typography>
                      <Button
                        onClick={() => {
                          navigate("/contentnotfound");
                        }}
                        className="btn btn-outlined-secondary"
                        sx={{ margin: "0 auto" }}
                      >
                        Coming Soon
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box textAlign="center" className="grid-cypto-trade">
                      <img src={Market} paddingBottom={3} />
                      <Typography variant="h6" paddingBottom={3}>
                        Trade Assets
                      </Typography>
                      <Typography
                        className="body-caption secondary-color"
                        paddingBottom={3}
                      >
                        We realize ideas from simple to complex, everything
                        becomes easy to use and reach the most potential
                        customers.
                      </Typography>
                      <Button
                        onClick={() => {
                          navigate("/contentnotfound");
                        }}
                        className="btn btn-outlined-secondary"
                        sx={{ margin: "0 auto" }}
                      >
                        Coming Soon
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box textAlign="center" className="grid-cypto-trade">
                      <img src={LearnCypto} paddingBottom={3} />
                      <Typography variant="h6" paddingBottom={3}>
                        Learn crypto
                      </Typography>
                      <Typography
                        className="body-caption secondary-color"
                        paddingBottom={3}
                      >
                        We realize ideas from simple to complex, everything
                        becomes easy to use and reach the most potential
                        customers.
                      </Typography>
                      <Button
                        className="btn btn-outlined-secondary"
                        sx={{ margin: "0 auto" }}
                        onClick={() => {
                          navigate("./learn-cypto");
                          window.scrollTo({
                            top: 2550,
                            left: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        Learn now
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box> */}

        <Box sx={{ py: 0 }}>
          <GlobalCommunitySection />
        </Box>

        <Box sx={{ py: 0 }}>
          <MuiResearchReportsDashboard />
        </Box>

        <Container>

          {/* Press Releases */}


          <Box className="learn-crypto-home" sx={{ paddingTop: 0 }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={8} md={8}>
                <Typography
                  variant="h2"
                  fontSize={48}
                  fontWeight={700}
                  className="secondary-font mobile-text-center"
                >
                  Learn crypto
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                textAlign="right"
                className="mobile-none"
              >
                <Button
                  variant="outlined"
                  className="btn btn-outlined-secondary"
                  sx={{ borderRadius: "90px", ml: { xs: "0", sm: "auto" } }}
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    navigate("./learn-cypto");
                  }}
                >
                  View more
                </Button>
              </Grid>
            </Grid>

            {/* tabs starts */}
            <Box
              className="learn-cypto-tab"
              sx={{ width: "100%", typography: "body1" }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange} aria-label="tabs">
                    <Tab label="All" value="1" />
                    {tutorialCategory?.map((item) => {
                      return <Tab label={item.title} value={item.title} />;
                    })}
                  </TabList>
                </Box>
                <TabPanel
                  value={value}
                  sx={{ paddingRight: "0", paddingLeft: "0" }}
                >
                  <Grid
                    container
                    columnSpacing={{ xs: 1, sm: 4 }}
                    className="ipad-none"
                  >
                    {tutorialsList?.slice(0).map((item, index) => {
                      let description = item.description;
                      if (index < loadmore) {

                        if (description.length > 10) {
                          description =
                            item.description.substring(0, 150) + "...";
                        }
                        return (
                          <Grid item xs={6}>
                            <Grid
                              container
                              columnSpacing={{ xs: 1, sm: 4 }}
                              className="flex-between-box"
                              marginBottom={3}
                              onClick={() => videoLink(item)}
                            >
                              <Grid item xs={6} sx={{ cursor: "pointer" }}>
                                <Stack spacing={2} justifyContent="space-between">
                                  <Typography
                                    fontSize={16}
                                    className="primary-font"
                                    sx={{ maxHeight: '45px', overflow: 'hidden', fontWeight: "500" }}
                                  >
                                    {item.title}
                                    {item.category}
                                  </Typography>
                                  <Typography
                                    sx={{ fontSize: "14px !important", maxHeight: '110px', overflow: 'hidden' }}
                                    className="secondary-color primary-font"
                                  >
                                    {ReactHtmlParser(description)}
                                  </Typography>
                                </Stack>
                                <Typography
                                  sx={{ fontSize: "14px !important" }}
                                  fontWeight={400}
                                  className="secondary-color primary-font"
                                >
                                  {dayjs(item.created_at).format("MMM DD,YYYY")}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Box className="cypto-video">
                                  <ReactPlayer
                                    url={item.video_link}
                                    controls={true}
                                    light={item.image_link}
                                    playing={false}
                                    width="100%"
                                    height="100%"
                                  />
                                </Box>

                              </Grid>
                            </Grid>

                          </Grid>
                        );
                      }
                    })}

                  </Grid>
                  <Grid className="mobile-none" >
                    {tutorialsList.length > 4 && tutorialsList.length > loadmore &&
                      <Button
                        variant="outlined"
                        className="btn btn-outlined-secondary"
                        endIcon={<KeyboardArrowRight sx={{ color: "#777E90" }} />}
                        sx={{
                          height: "50px",
                          whiteSpace: "nowrap",
                          minWidth: "auto",
                        }}
                        onClick={handleLoadmore}
                      >
                        Load more
                      </Button>
                    }
                  </Grid>
                </TabPanel>
              </TabContext>

              <Box className="ipad-visible swiper-styles swiper-home">
                <Box paddingBottom={{ xs: 4, sm: 10 }}>
                  <Swiper
                    slidesPerView={1}
                    navigation={true}
                    spaceBetween={30}
                    breakpoints={{
                      480: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                      },
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                      },
                      1080: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                      },
                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {tutorialsList?.slice(0, 3).map((item, index) => {
                      let description = item.description;
                      if (index < loadmore) {
                        if (description.length > 10) {
                          description = item.description.substring(0, 150) + "...";
                        }
                        return (
                          <SwiperSlide>
                            <Box className="about-crypto">
                              <Box
                                className="cypto-video"
                                sx={{ width: "100% !important" }}
                              >
                                <ReactPlayer
                                  url={item.video_link}
                                  controls={true}
                                  light={item.image_link}
                                  playing={true}
                                  width="100%"
                                  height="100%"
                                />
                              </Box>
                              <Typography
                                fontSize={16}
                                paddingY={2}
                                fontWeight={700}
                                className="body-large primary-font"
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                sx={{ fontSize: "14px !important" }}
                                className="secondary-color primary-font"
                              >
                                {ReactHtmlParser(description)}
                              </Typography>
                            </Box>
                          </SwiperSlide>
                        );
                      }
                    })}
                  </Swiper>
                </Box>
              </Box>
              <Button
                variant="outlined"
                className="btn btn-outlined-secondary"
                sx={{
                  borderRadius: "90px",
                  width: "100%",
                  display: {
                    xs: "block !important",
                    sm: "none !important",
                    md: "none !important",
                    lg: "none !important",
                  },
                }}
                onClick={() => {
                  navigate("./learn-cypto");
                }}
              >
                View more
              </Button>
            </Box>
          </Box>
        </Container>


        <Box className="market-trend" sx={{ py: { xs: 4, sm: 6 } }}>
          <Box
            sx={{ display: { xs: "block", md: "flex" } }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              component="h2"
              variant="h2"
              className="secondary-font mobile-font-40"
            >
              Market trend
            </Typography>
            <Typography
              className=""
              variant="p"
              component="p"
              sx={{
                display: { xs: "block", sm: "none", md: "none" },
                marginBottom: { xs: 4, sm: 0 },
              }}
            >
              <span className="gold-color">Subscribe</span> to gain complete
              access to the most precise short and long-term predictions of
              cryptocurrency prices.
            </Typography>
            <Button
              sx={{ display: { xs: "block", sm: "none", md: "none" } }}
              className="btn btn-outlined-secondary mobile-none"
              onClick={() => {
                navigate("/market");
              }}
            >
              Learn more
            </Button>
          </Box>
          <Stack
            direction="row"
            className="filter-btn for-desktop"
            spacing="2"
            paddingTop={5}
          >
            {selectedCat === 0 ? (
              <Button
                variant="contained"
                className="btn btn-secondary"
                onClick={(e) => {
                  loader(true);
                  coinActions.latestListing("?limit=5");
                }}
              >
                All
              </Button>
            ) : (
              <Button
                className="btn"
                onClick={(e) => {
                  loader(true);
                  coinActions.latestListing("?limit=5");
                }}
              >
                All
              </Button>
            )}
            {categoryList.length &&
              categoryList.map((item, index) => {
                if (selectedCat !== 0 && selectedCat === item) {
                  return (
                    <Button
                      variant="contained"
                      className="btn btn-secondary"
                      key={index}
                      onClick={(e) => {
                        coinActions.coinListbByCategoty(item);
                      }}
                      title={item}
                    >
                      {item}
                    </Button>
                  );
                } else {
                  return (
                    <Button
                      className="btn"
                      onClick={(e) => {
                        coinActions.coinListbByCategoty(item);
                      }}
                      title={item}
                    >
                      {item}
                    </Button>
                  );
                }
              })}
          </Stack>
          <Box className="for-mobile dropdown-mobile">
            <FormControl sx={{ m: 0, minWidth: 120, width: "100%" }}>
              <Select
                value={marketTrend}
                onChange={handleChangeMarketTrend}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {selectedCat === 0 ? (
                  <MenuItem
                    value={1}
                    onClick={(e) => {
                      loader(true);
                      coinActions.latestListing("?limit=5");
                    }}
                  >
                    All
                  </MenuItem>
                ) : (
                  <MenuItem
                    value={1}
                    onClick={(e) => {
                      loader(true);
                      coinActions.latestListing("?limit=5");
                    }}
                  >
                    All
                  </MenuItem>
                )}
                {categoryList.length &&
                  categoryList.map((item, index) => {
                    if (selectedCat !== 0 && selectedCat === item) {
                      return (
                        <MenuItem
                          value={index + 2}
                          onClick={(e) => {
                            coinActions.coinListbByCategoty(item);
                          }}
                          title={item}
                        >
                          {item}
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem
                          value={index + 2}
                          onClick={(e) => {
                            coinActions.coinListbByCategoty(item);
                          }}
                          title={item}
                        >
                          {item}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </FormControl>
          </Box>
          <CryptoTable selectedCat={selectedCat} isIt={false} />
          <Button
            variant="outlined"
            className="btn btn-outlined-secondary"
            sx={{
              borderRadius: "90px",
              width: "100%",
              display: {
                xs: "block !important",
                sm: "none !important",
                md: "none !important",
                lg: "none !important",
              },
            }}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              navigate("./learn-cypto");
            }}
          >
            View more
          </Button>
        </Box>
      </Container>


      {/* Informed decision starts*/}
      <Container>
        <Box
          className="app-store"
          sx={{ paddingY: { xs: 4, sm: 6 } }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            className="flow-reverse-mobile"
          >

            <Grid item xs={12} sm={5} md={5}>
              <Box sx={{ paddingBottom: { xs: "15px", md: "50px" } }}>
                <Typography
                  variant="h2"
                  marginBottom={2}
                  fontWeight={700}
                  className="secondary-font"
                >
                  {ReactHtmlParser(headingList[1]?.title ?? "")}
                </Typography>
              </Box>
              <Box>
                <Typography className="secondary-color">app's</Typography>
                <Typography
                  className=""
                  variant="h5"
                  fontSize={24}
                  paddingBottom={5}
                >
                  Coming soon...
                </Typography>

                <Stack
                  direction="row"
                  className="stacks"
                  spacing={2}
                  sx={{
                    paddingBottom: "20px",
                    paddingTop: "20px",
                  }}
                >
                  <img src={GoogleIcon} />
                  <Box>
                    <Typography
                      variant=""
                      component="div"
                      className="body-caption secondary-color"
                    >
                      Download from

                    </Typography>
                    <Typography
                      variant=""
                      component="div"
                      className="body-large "
                    >
                      Google Play
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  className="stacks"
                  spacing={2}
                  sx={{
                    paddingBottom: "20px",
                    paddingTop: "20px",
                  }}
                >
                  <img src={Appleicon} />
                  <Box>
                    <Typography
                      variant=""
                      component="div"
                      className="body-caption secondary-color"
                    >
                      Download from
                    </Typography>
                    <Typography
                      variant=""
                      component="div"
                      className="body-large "
                    >
                      Appstore
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ paddingBottom: "20px", paddingTop: "20px" }}
                >
                  <img src={Appleicon} />
                  <Box>
                    <Typography
                      variant=""
                      component="div"
                      className="body-caption secondary-color"
                    >
                      Download for
                    </Typography>
                    <Typography
                      variant=""
                      component="div"
                      className="body-large "
                    >
                      Mac OS
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7} md={7}>
              <img className="app-store-img" src={`${process.env.REACT_APP_IMAGE_URL}/${headingList[1]?.image}`} />
            </Grid>

          </Grid>
        </Box>
      </Container>
      {/* Informed decision ends*/}

      {/* how it works section starts */}
      {/* <Box className="how-it-work" sx={{ paddingY: { xs: 4, sm: 6 } }}>
        <Container>
          <Box
            textAlign="center"
            paddingBottom={{ xs: 10, sm: 8, md: 8, lg: 10 }}
          >
            <Typography
              variant="h2"
              component="h2"
              className="secondary-font mobile-font-40"
              textAlign="center"
              paddingBottom={2}
              sx={{ fontWeight: "700" }}
            >
              {ReactHtmlParser(headingList[3]?.title ?? "")}
            </Typography>
          </Box>
          <Grid
            className="scrolling-tab become-h2-p"
            container
            spacing={{ xs: 2, sm: 4, md: 4, lg: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {WorkList?.map((items, i) => {
              let title = items.title;
              let description = items.description;
              let image = items.image ? `${process.env.REACT_APP_IMAGE_URL}/${items.image}` : items.image_link;
              let cls = (i == WorkList.length - 1) ? 'howworks-box become-h2-p' : "howworks-box contact-line become-h2-p";
              return (
                <Grid item xs={6} sm={6} md={3}>
                  <Box
                    sx={{ textAlign: { xs: "left", md: "center" } }}
                    className={cls}
                  >
                    {image == null || image == '' ? " " : <img src={image} width={96} />}
                    <Typography
                      className="become-h2-p"
                      sx={{ textAlign: { xs: "left", md: "center" } }}
                      fontWeight="300"
                      paddingBottom={3}
                    >
                      {ReactHtmlParser(title)}
                    </Typography>
                    <Typography
                      component="div"
                      variant="p"
                      className="body-caption become-h2-p"
                    >
                      {ReactHtmlParser(description)}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box> */}
      <Container maxWidth="fluid" sx={{ pb: { xs: 4, md: 6 } }}>
        <Marquee>
          {bannerList.map((item) => {
            let image = item.image_url ? `${process.env.REACT_APP_IMAGE_URL}/${item.image_url}` : item.image_link;
            return (
              <Box>
                <Stack direction="row" spacing={8}>
                  {image == null || image == '' ? " " : <img
                    className="margin10"
                    src={image}
                  />}
                </Stack>
              </Box>
            );
          })}
        </Marquee>
      </Container>

    </>
  );
};

export default Home;
