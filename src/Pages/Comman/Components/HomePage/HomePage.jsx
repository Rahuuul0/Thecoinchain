import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import {
  ArrowCircleDownSharp,
  KeyboardArrowRight,
  East,
  West,
  Block,
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
  headingListAtom
} from "../../../../_state/";
import ReactPlayer from "react-player";
import dayjs from "dayjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Alert from "@mui/material/Alert";
import ReactHtmlParser from 'react-html-parser';
import { RoutesName } from "../../../../_common/app.constants";

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
    // const firstLetters = str.replace("Portfolio", "");
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
      <Box component="main" sx={{ pt: 8 }}></Box>
      {/* Banner starts */}
      {homeBannerData?.map((items) => {
        let title = items.title;
        let decription = items.decription;
        let image = items.image ? `${process.env.REACT_APP_IMAGE_URL}/${items.image}` : items.image_link;
        return (
          <Container>
            <Box paddingBottom={{ xs: 4, sm: 8 }}>
              {subscribeUser?.status === "expired" && auth !== null ?
                <Stack sx={{ width: '38%', marginLeft: 'auto', marginTop: '22px' }} spacing={2}>
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
                    variant="h1"
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
                        window.scrollTo({ top: 2250, left: 0, behavior: "smooth" });
                      }}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <img className="heroImage" src={image} alt='' />
                </Grid>
              </Grid>
            </Box>
          </Container>
        )
      })}
      {/* Banner Ends */}
      <Container>
        <Box
          sx={{ alignItems: "center" }}
          className="grid-bit"
          padding={3}
          borderRadius={6}
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
      <Container>
        <Box className="learn-crypto-home">
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
                                  // poster={Learn01}
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
                {tutorialsList.length > 4 && tutorialsList.length > loadmore &&
                  <Button
                    variant="outlined"
                    className="btn btn-outlined-secondary"
                    endIcon={<KeyboardArrowRight sx={{ color: "#777E90" }} />}
                    sx={{
                      height: "50px",
                      whiteSpace: "nowrap",
                      minWidth: "auto",
                      // marginLeft : "25px",
                    }}
                    onClick={handleLoadmore}
                  >
                    Load more
                  </Button>
                }
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
                            {/* <img width="100%" src={Leveraged} /> */}
                            <Box
                              className="cypto-video"
                              sx={{ width: "100% !important" }}
                            >
                              <ReactPlayer
                                url={item.video_link}
                                controls={true}
                                light={item.image_link}
                                playing={true}
                                // poster={Learn01}
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

      {/* learn cypto star*/}
      <Container>
        <Box className="market-trend">
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
                {/* <MenuItem value={10}>All</MenuItem>
                <MenuItem value={20}>Bitcoin Ecosystem</MenuItem>
                <MenuItem value={30}>Paradigm </MenuItem>
                <MenuItem value={40}>Multicoin Capital </MenuItem>
                <MenuItem value={50}>Pantera Capital </MenuItem> */}
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

      <Box className="become-crypto">
        <Container>
          <Box>
            <Typography
              variant="h2"
              component="h2"
              className="secondary-font font-40"
              textAlign="center"
              sx={{ fontWeight: "700", maxWidth: "500px", margin: "auto" }}
            >
              {ReactHtmlParser(headingList[0]?.title??"")}
            </Typography>
            <Typography
              className="secondary-color"
              sx={{ textAlign: { xs: "left", md: "center" } }}
              paddingTop={2}
            >
              {/* We've got everything you need to start trading. */}
            </Typography>
            <Box paddingY={{ xs: 6, sm: 8 }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {crypotTraderList?.map((item) => {
                  let title = item.title;
                  let description = item.description;
                  let image = item.image ? `${process.env.REACT_APP_IMAGE_URL}/${item.image}` : item.image_link;
                  let link = item.button_link;
                  let buttonLabel = item.button_label;

                  return (
                    <Grid item xs={12} sm={4}>
                      <Box textAlign="center" className="grid-cypto-trade">
                        {image == null || image == '' ? " " : <img src={image} paddingBottom={3} alt='' />}
                        <Typography variant="h6" paddingBottom={3}>
                          {title}
                        </Typography>
                        <Typography
                          className="body-caption secondary-color"
                          paddingBottom={3}
                        >
                          {ReactHtmlParser(description)}
                        </Typography>
                        <Link to={link}>
                          <Button
                            className="btn btn-outlined-secondary"
                            sx={{ margin: "0 auto" }}
                          >
                           {buttonLabel}
                          </Button>
                        </Link>
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
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
        </Container>
      </Box>

      {/* learn cypto end */}

      {/* Informed decision starts*/}
      <Container>
        <Box
          className="app-store"
          paddingBottom={{ md: 10, sm: 8, xs: 4 }}
          sx={{ paddingTop: { md: "80px", sm: "20px" } }}
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
                 {ReactHtmlParser(headingList[1]?.title??"")}
                </Typography>
                <Typography
                  className="secondary-color"
                  sx={{ paddingBottom: { xs: "15px", md: "25px" } }}
                >
                  with our expert insights and analysis of the crypto market!
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

      {/* section starts */}
      <Box className="global-community">
        <Container>
          <Box>
            <Box textAlign="center">
              <img className="coinguru-logo" src={`${process.env.REACT_APP_IMAGE_URL}/${headingList[2]?.image??""}`}/>
              <Typography
                variant="h2"
                component="h2"
                className="secondary-font mobile-f-48"
                textAlign="center"
                paddingBottom={3}
                sx={{ fontWeight: "700" }}
              >
              {ReactHtmlParser(headingList[2]?.title??"")}
                <br />
              </Typography>
            </Box>
            <Box className="swiper-global">
              <Swiper
                slidesPerView={1}
                navigation={true}
                spaceBetween={0}
                modules={[Navigation]}
                className="mySwiper"
              >
                {cryptoNewsList.map((item) => {
                  let description = item.description;
                  let link = item.button_link;
                  let image = item.image ? `${process.env.REACT_APP_IMAGE_URL}/${item.image}` : item.image_link;
                  let title = item.title;
                  return (
                    <SwiperSlide>
                      <Box className="crypto-box">

                        <Grid
                          container
                          spacing={{ xs: 8, md: 3 }}
                          columns={{ xs: 12, sm: 8, md: 12 }}
                          className="flow-reverse-mobile"
                        >

                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                          >
                            <Typography
                              className="small-caption secondary-color"
                              sx={{ textTransform: "uppercase" }}
                              paddingBottom={2}
                            >
                              Crypto news
                            </Typography>
                            <Typography component="h4" variant="h4" paddingBottom={3}>
                              {title}
                            </Typography>
                            <Typography className="secondary-color" paddingBottom={{ xs: 8, sm: 12 }}>
                              {ReactHtmlParser(description)}
                            </Typography>
                            <Link to={link}>
                            <Button
                              sx={{ textTransform: "capitalize" }}
                              className="btn-outlined-secondary"
                            >
                              {item.button_label}
                            </Button>
                            </Link>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} textAlign="right">
                           {image == null || image == '' ? " " : <img src={image}/>}
                          </Grid>

                        </Grid>
                      </Box>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* section ends */}
      {/* how it works section starts */}
      <Box className="how-it-work">
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
              {ReactHtmlParser(headingList[3]?.title??"")}
            </Typography>
          </Box>
          <Grid
            className="scrolling-tab become-h2-p"
            container
            spacing={{ xs: 2, sm: 4, md: 4, lg: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {WorkList?.map((items,i) => {
            let title = items.title;
            let description = items.description;
            let image = items.image ? `${process.env.REACT_APP_IMAGE_URL}/${items.image}` : items.image_link;
            let cls = (i==WorkList.length-1)?'howworks-box become-h2-p':"howworks-box contact-line become-h2-p";
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
      </Box>
      <Container maxWidth="fluid">
        <Marquee>
          {bannerList.map((item) => {
            let image = item.image_url ? `${process.env.REACT_APP_IMAGE_URL}/${item.image_url}` : item.image_link;
            return (
              <Box paddingTop={8} paddingBottom={8}>
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
