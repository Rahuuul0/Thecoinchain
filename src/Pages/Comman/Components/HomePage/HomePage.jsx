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
  Tooltip,
  Zoom,
} from "@mui/material";
import {
  ArrowCircleDownSharp,
  KeyboardArrowRight,
  East,
  West,
  Block,
  Mic,
  PlayArrow,
  ArrowUpward,
} from "@mui/icons-material";
import HeroImage from "../../../../../public/assets/images/banner.svg";
import LightHeroBg from "../../../../../public/assets/Background_img/Gemini_Generated_Image_4ualgp4ualgp4ual.png";
import DarkHeroBg from "../../../../../public/assets/Background_img/Gemini_Generated_Image_m9io3hm9io3hm9io.png";
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
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
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
import MuiPricePredictionDashboardSection from "../../../Comman/Components/MuiPricePredictionDashboardSection";
import MuiGlobalNewsDashboardSection from "../../../Comman/Components/MuiGlobalNewsDashboardSection";
import MuiTrendingNewsDashboardSection from "../MuiTrandingNewsDashboardSection";
import HomePageCryptoNews from "./HomePageCryptoNews";
import { useFetchWrapper } from "../../../../_helpers";
import { Helmet } from "react-helmet-async";
import CryptoTickerMarquee from "../../../Comman/Components/CryptoTickerMarquee";

dayjs.extend(relativeTime);
dayjs.extend(utc);

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
            display: {
              xs: '-webkit-box',
              sm: 'block',
            },
            WebkitLineClamp: {
              xs: 2,
              sm: 'unset',
            },
            WebkitBoxOrient: {
              xs: 'vertical',
              sm: 'unset',
            },
            overflow: {
              xs: 'hidden',
              sm: 'visible',
            },
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

  const slugify = (text = "", isTitle = false) => {
    if (!text) return "";
    const clean = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "");
    if (isTitle) {
      return clean.split(/\s+/).slice(0, 6).join("-");
    }
    return clean.replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
  };

  const podcastNotifications = guestPosts.map((item) => {
    const slug = item?.slug && String(item.slug).trim()
      ? slugify(String(item.slug), false)
      : slugify(item?.title || "", true);

    return {
      id: item.id,
      slug: item.slug,
      type: item.type?.replace(/_/g, " ").toUpperCase(),
      title: item.title,
      host: item?.profile?.profile_name,
      duration: null,
      time: (() => {
        if (!item.created_at) return "Just now";
        const localCreatedAt = typeof item.created_at === "string" ? item.created_at.replace(/Z$/i, "") : item.created_at;
        const parsed = dayjs(localCreatedAt);
        if (!parsed.isValid()) return "Just now";
        const diffMs = dayjs().diff(parsed);
        if (diffMs < 60000) return "Just now";
        const diffHours = dayjs().diff(parsed, "hour");
        if (diffHours >= 0 && diffHours < 24) {
          const fromNow = parsed.fromNow();
          return fromNow.startsWith("in ") ? "Just now" : fromNow;
        }
        return parsed.format("MMM DD, YYYY hh:mm A");
      })(),
      avatar: item?.profile?.profile_image
        ? `${process.env.REACT_APP_IMAGE_URL}/${item?.profile?.profile_image}`
        : "",
      image: item.get_media_display
        ? `${process.env.REACT_APP_IMAGE_URL}/${item.get_media_display}`
        : "",
      url: RoutesName.Blog_Detail.replace(":slug", slug),
    };
  });

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

  const openDetail = (id, title, customSlug) => {
    if (id !== undefined && id !== null) {
      const slug = customSlug && String(customSlug).trim()
        ? slugify(String(customSlug), false)
        : slugify(title || "", true);
      sessionStorage.setItem(`blog_id_${slug}`, String(id));
      localStorage.setItem(`blog_id_${slug}`, String(id));
      navigate(
        RoutesName.Blog_Detail
          .replace(":slug", slug),
        { state: { id } }
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
            gap: { xs: 0, md: 0, md: 4 },
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
              Let's stay in touch. Join our communities to keep up with the <b> The Coin Chain </b> team and our traders from across the world?
            </Typography>
          </Box>

          {/* Right graphic side with centered cards */}

          <Box
            sx={{
              flex: 1,
              position: "relative",
              width: "100%",
              minHeight: { xs: "290px", md: "250px", md: "400px" },
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
                width: { xs: "320px", sm: "520px", md: "420px", lg: "520px" },
                transition: "all 800ms cubic-bezier(0.43, 0.05, 0.3, 1)",
                willChange: "transform, opacity",
              }}
            />

            {/* Active animated card */}
            <NotificationCard
              key={current.id}
              data={current}
              entering={entering}
              onClick={() => current?.id && openDetail(current.id, current.title, current.slug)}
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
                width: { xs: "320px", sm: "520px", md: "420px", lg: "520px" },

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
  const isDarkMode = useRecoilValue(switchDarkModeAtom);
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

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
        <title>TheCoinChain | Latest Crypto News, Market Analysis & Price Predictions</title>

        <meta
          name="description"
          content="Stay updated with the latest cryptocurrency news, Bitcoin updates, market analysis, research reports, press releases and price predictions on TheCoinChain."
        />

        <meta
          name="keywords"
          content="crypto news, bitcoin news, ethereum news, blockchain, cryptocurrency, price prediction, market analysis"
        />

        <link rel="canonical" href={window.location.href} />

        <meta
          property="og:title"
          content="TheCoinChain | Latest Crypto News, Market Analysis & Price Predictions"
        />

        <meta
          property="og:description"
          content="Read the latest cryptocurrency news, research reports, press releases and market insights on TheCoinChain."
        />

        <meta property="og:url" content={window.location.href} />

        <meta property="og:type" content="website" />
      </Helmet>
      <Box
        sx={{
          mt: { xs: '56px', sm: '64px' },
          position: 'relative',
          zIndex: 2,
        }}
      >
        <CryptoTickerMarquee />
      </Box>

      {/* Dynamic Theme Hero Banner */}
      <Box
        className="home-hero-banner-section"
        sx={{
          backgroundImage: `url(${isDarkMode ? DarkHeroBg : LightHeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          position: "relative",
          pt: { xs: 4, sm: 5, md: 6 },
          pb: { xs: 6, sm: 8, md: 10 },
          minHeight: { xs: "auto", md: "560px" },
          display: "flex",
          alignItems: "center",
          transition: "background-image 0.4s ease-in-out",
        }}
      >
        <Container>
          {homeBannerData?.map((items, idx) => {
            let title = items.title;
            let decription = items.decription;
            return (
              <Box key={idx} sx={{ pb: { xs: 2, sm: 3 } }}>
                {subscribeUser?.status === "expired" && auth !== null ? (
                  <Stack sx={{ width: '100%', marginLeft: 'auto', marginTop: '22px', marginBottom: '1rem' }} spacing={2}>
                    <Alert severity="info">You don't have any current plan please <Link to={'/subscription'}> <b>subscribe </b></Link> !</Alert>
                  </Stack>
                ) : ""}
                <Grid container sx={{ alignItems: "center" }} spacing={{ xs: 3, md: 4 }}>
                  {/* <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    sx={{
                      paddingRight: { xs: "0px", md: "40px" },
                    }}
                  >
                    <Typography
                      variant="h1"
                      component="h1"
                      className="hero-heading"
                      sx={{
                        color: isDarkMode ? "#FFFFFF !important" : "#141416 !important",
                        fontSize: { xs: "36px", sm: "46px", md: "54px" },
                        fontWeight: "700 !important",
                        lineHeight: 1.15,
                        fontFamily: "var(--secondary-font) !important",
                        mb: 2,
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      className="hero-para primary-font"
                      sx={{
                        color: isDarkMode ? "#B1B5C4 !important" : "#777E90 !important",
                        fontSize: { xs: "15px", sm: "17px" },
                        lineHeight: 1.6,
                        pb: { xs: "24px", md: "36px" },
                      }}
                    >
                      {ReactHtmlParser(decription)}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3 }}>
                      <Button
                        variant="contained"
                        className="btn btn-primary"
                        sx={{
                          borderRadius: "90px !important",
                          backgroundColor: "#3772ff !important",
                          color: "#FFFFFF !important",
                          px: 3.5,
                          py: 1.2,
                          fontSize: "15px",
                          fontWeight: 700,
                          textTransform: "none",
                          boxShadow: "0 8px 20px rgba(55, 114, 255, 0.35)",
                          "&:hover": {
                            backgroundColor: "#2055d4 !important",
                          },
                        }}
                        onClick={() => {
                          navigate("./prediction-dashboard");
                        }}
                      >
                        Get started now
                      </Button>
                      <IconButton
                        aria-label="ArrowCircleDown"
                        onClick={() => {
                          window.scrollTo({ top: 700, left: 0, behavior: "smooth" });
                        }}
                        sx={{
                          p: 0,
                          color: isDarkMode ? "#777E90" : "#B1B5C3",
                          "&:hover": {
                            color: "#3772ff",
                          },
                        }}
                      >
                        <ArrowCircleDownSharp sx={{ fontSize: 32 }} />
                      </IconButton>
                    </Box>
                  </Grid> */}
                  <HomePageCryptoNews isDarkMode={isDarkMode} />
                  <Grid item xs={12} sm={6} md={6}>
                    <MuiTrendingNewsDashboardSection />
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Container>
      </Box>
      <Container sx={{ pb: { xs: 4, sm: 6 }, pt: { xs: 4, sm: 6 } }}>
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
                  <Grid item xs={12} sm={4} md={4} lg={3} className="gridBox" sx={{
                    textAlign: {
                      xs: 'center',
                      sm: 'start',
                    },
                  }}>
                    <img
                      src={item.image}
                      alt={item.symbol}
                      width="33px"
                    />
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ justifyContent: { xs: 'center', sm: 'start' } }}
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
      <Box className="become-crypto" sx={{ paddingY: 0 }}>
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
          <MuiGlobalNewsDashboardSection />
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
              {/* <Grid
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
                  View All
                </Button>
              </Grid> */}

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
                                    sx={{ fontSize: "14px !important", maxHeight: '110px', overflow: 'hidden', }}
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
                  <Grid className="mobile-none" sx={{ marginBottom: '25px' }} >
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
                <Box paddingBottom={{ xs: 0, sm: 0 }}>
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
              {/* <Button
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
              </Button> */}
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
            {/* <Button
              sx={{ display: { xs: "block", sm: "none", md: "none" } }}
              className="btn btn-outlined-secondary mobile-none"
              onClick={() => {
                navigate("/market");
              }}
            >
              Learn more
            </Button> */}
          </Box>
          {/* <Stack
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
          </Stack> */}
          <CryptoTable selectedCat={selectedCat} isIt={false} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { xs: 3, sm: 4 },
            }}
          >
            <Button
              variant="outlined"
              className="btn btn-outlined-secondary"
              sx={{
                borderRadius: "90px",
                px: { xs: 3, sm: 4 },
                py: 1,
                fontWeight: 600,
              }}
              onClick={() => {
                navigate("/prediction-dashboard");
              }}
            >
              View All
            </Button>
          </Box>
        </Box>
      </Container>


      {/* Informed decision starts*/}
      <Container>
        <Box
          className="app-store"
          sx={{ pb: { xs: 0, sm: 6 }, pt: { xs: '10px', sm: "10px" } }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            className="flow-reverse-mobile"
          >

            <Grid item xs={12} sm={12} md={5}>
              <Box sx={{ paddingBottom: { xs: "15px", md: "50px" }, display: 'none' }}>
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
            <Grid item xs={12} sm={12} md={7}>
              <MuiPricePredictionDashboardSection />
              {/* <img className="app-store-img" src={`${process.env.REACT_APP_IMAGE_URL}/${headingList[1]?.image}`} /> */}
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
      <Container maxWidth="fluid" sx={{ pb: { xs: 0, md: 6 } }}>
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

      <Zoom in={showScrollTop}>
        <Box
          role="presentation"
          sx={{
            position: "fixed",
            bottom: { xs: 24, sm: 32, md: 40 },
            right: { xs: 16, sm: 24, md: 32 },
            zIndex: 1200,
          }}
        >
          <Tooltip title="Scroll to top" placement="left" arrow>
            <IconButton
              onClick={handleScrollToTop}
              aria-label="Scroll to top"
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "2px solid #8e95a5",
                bgcolor: isDarkMode ? "rgba(29, 31, 43, 0.92)" : "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
                color: isDarkMode ? "#a0a5b5" : "#6e7687",
                transition: "all 0.25s ease-in-out",
                "&:hover": {
                  borderColor: "#3772ff",
                  color: "#3772ff",
                  bgcolor: isDarkMode ? "rgba(55, 114, 255, 0.15)" : "#f0f5ff",
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 18px rgba(55, 114, 255, 0.25)",
                },
              }}
            >
              <ArrowUpward sx={{ fontSize: 22 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Zoom>

    </>
  );
};

export default Home;
