import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  MenuItem,
  OutlinedInput,
  FormControl,
  Select,
} from "@mui/material";
import * as React from "react";
import VideoImg from "../../../public/assets/images/learn01.png";
import Blog1 from "../../../public/assets/images/blog-1.svg";
import Avatar from "../../../public/assets/images/avatar.svg";
import GridImage from "../../../public/assets/images/grid.svg";
import { Search, ArrowRightAlt, ArrowDropDown } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import DarkLogo from "../../../public/assets/images/logo.svg";
import Globe from "../../../public/assets/images/globe.svg";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { tutorialAtom } from "../../_state";
import { blogAtom } from "../../_state";
import { useTutorialActions } from "../../_actions/tutorial.actions";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabContext, TabPanel } from '@mui/lab/';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Recent 1",
  "Recent 2",
  "Recent 3",
  "Recent 4",
  "Recent 5",
  "Recent 6",
  "Recent 7",
  "Recent 8",
  "Recent 9",
  "Recent 10",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const LearnCypto = () => {
  const [valueTab, setValueTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setValueTab(index);
  };
  const navigate = useNavigate();
  const scrollRef = React.useRef();
  const [blogsData, setBlogsData] = useRecoilState(blogAtom);
  const tutorialsData = useRecoilValue(tutorialAtom);

  const [value, setValue] = React.useState("1");
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [tutorials, setTutorials] = React.useState(tutorialsData);

  const [videoUrl, setVideoUrl] = React.useState(
    "https://www.youtube.com/watch?v=ysz5S6PUM-U"
  );
  const [videoStatus, setVideoStatus] = React.useState(false);

  console.log(blogsData, "11111111111");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const tutorialAction = useTutorialActions();

  React.useEffect(() => { }, []);

  const scrollToVideo = (e, videoLink) => {
    e.current.scrollIntoView({
      behavior: "smooth",
    });
    setVideoUrl(videoLink);
  };

  return (
    <>
      <Container sx={{ pt: 14 }}>
        <Box paddingBottom={15}>
          <Typography
            variant="h1"
            className="secondary-font"
            fontWeight="700"
            textAlign="center"
          >
            Blockchain & Crypto
          </Typography>

          <Typography textAlign="center" className="secondary-color body-large">
            A creative agency that lead and inspire
          </Typography>
          <Box>
            <Stack
              ref={scrollRef}
              direction="row"
              spacing={3}
              justifyContent="center"
              paddingTop={3}
              paddingBottom={10}
            >
              <Button
                variant="contained"
                className="btn btn-primary"
                onClick={() => {
                  navigate("../learn-cypto-detail");
                }}
              >
                Learn Now{" "}
              </Button>
              <Button
                variant="outlined"
                className="btn btn-outlined-secondary"
                onClick={() => {
                  navigate("../learn-cypto-detail");
                }}
              >
                Video Tutorial{" "}
              </Button>
            </Stack>
            <ReactPlayer
              url={videoUrl}
              controls={true}
              light={true}
              playing={true}
              width="100%"
              height="640px"
            // style={{ border: "1px solid black" }}
            />
          </Box>
        </Box>
      </Container>
      {/* Our Blog section */}
      <Container maxWidth="fluid" sx={{ backgroundColor: "#F4F5F6" }}>
        <Container>
          <Box paddingTop={15} paddingBottom={3}>
            <Grid container>
              <Grid item xs={12} sm={5} md={5}>
                <Typography className="small-caption secondary-color">
                  Our Blog
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7} md={7}>
                <Typography
                  variant="h2"
                  className="secondary-font"
                  fontWeight="700"
                  paddingBottom={4}
                >
                  Latest Releases
                </Typography>
                <Typography>
                  Stacks is a production-ready library of stackable content
                  blocks built in React Native.
                </Typography>



              </Grid>
            </Grid>
          </Box>

        </Container>
        <Container>
          <Box className='right-tab'>
            <TabContext value={valueTab}>
              <AppBar position="static">
                <Grid container>
                  <Grid className="" xs={12} sm={5} md={5}></Grid>
                  <Grid className="" xs={12} sm={7} md={7}>
                    <Tabs
                   
                      value={valueTab}
                      onChange={handleChangeTab}
                      indicatorColor="secondary"
                      textColor="inherit"
                      aria-label="full width tabs example"
                    >
                      <Tab label="Bitcoin" {...a11yProps(0)} />
                      <Tab label="Blockchain" {...a11yProps(1)} />
                      <Tab label="Tutorials" {...a11yProps(2)} />
                    </Tabs>
                  </Grid>
                </Grid>

              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={valueTab}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={valueTab} index={0} dir={theme.direction}>

                  <Box>
                    <Box paddingBottom={3}>
                      <Grid container>
                        <Grid item xs={12} sm={5} md={5}>
                          <Box
                            className="blog-box"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                          >
                            <Box height="50">
                              <Button
                                textTransform="uppercase"
                                sx={{ marginBottom: "50px" }}
                                className="orange-btn small-btn"
                              >
                                New
                              </Button>
                            </Box>
                            <Box className="" paddingBottom={5}>
                              <Typography
                                variant="h4"
                                fontWeight="700"
                                className="secondary-font"
                                paddingBottom={2}
                              >
                                A Beginner's Guide to TradingView
                              </Typography>
                              <Typography paddingBottom={5}>Ethereum</Typography>
                              <Typography className="body-caption secondary-color">
                                A fully-featured landing page kit, including design files,
                                and beautiful 3D illustrations editable.
                              </Typography>
                            </Box>
                            <Box>
                              <ArrowRightAlt />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                          <img sx={{ maxWidth: "100%" }} src={Blog1} />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box paddingBottom={3}>
                      <Grid container>
                        <Grid item xs={12} sm={5} md={5}>
                          <Box
                            className="blog-box"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                          >
                            <Box height="50">
                              <Button
                                textTransform="uppercase"
                                sx={{ marginBottom: "50px" }}
                                className="orange-btn small-btn"
                              >
                                beginner
                              </Button>
                            </Box>
                            <Box className="" paddingBottom={5}>
                              <Typography
                                variant="h4"
                                fontWeight="700"
                                className="secondary-font"
                                paddingBottom={2}
                              >
                                A Beginner's Guide to TradingView
                              </Typography>
                              <Typography paddingBottom={5}>Ethereum</Typography>
                              <Typography className="body-caption secondary-color">
                                A fully-featured landing page kit, including design files,
                                and beautiful 3D illustrations editable.
                              </Typography>
                            </Box>
                            <Box>
                              <ArrowRightAlt />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                          <img sx={{ maxWidth: "100%" }} src={Blog1} />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box paddingBottom={3}>
                      <Grid container>
                        <Grid item xs={12} sm={5} md={5}>
                          <Box
                            className="blog-box"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                          >
                            <Box sx={{ height: "50px" }}>
                              <Button
                                textTransform="uppercase"
                                sx={{ marginBottom: "50px" }}
                                className="orange-btn small-btn"
                              >
                                beginner
                              </Button>
                            </Box>
                            <Box className="" paddingBottom={5}>
                              <Typography
                                variant="h4"
                                fontWeight="700"
                                className="secondary-font"
                                paddingBottom={2}
                              >
                                A Beginner's Guide to TradingView
                              </Typography>
                              <Typography paddingBottom={5}>Ethereum</Typography>
                              <Typography className="body-caption secondary-color">
                                A fully-featured landing page kit, including design files,
                                and beautiful 3D illustrations editable.
                              </Typography>
                            </Box>
                            <Box>
                              <ArrowRightAlt />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                          <img sx={{ maxWidth: "100%" }} src={Blog1} />
                        </Grid>
                      </Grid>
                    </Box>

                  </Box>

                </TabPanel>
                <TabPanel value={valueTab} index={1} dir={theme.direction}>
                  <Box>
                    <Box paddingBottom={3}>
                      <Grid container>
                        <Grid item xs={12} sm={5} md={5}>
                          <Box
                            className="blog-box"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                          >
                            <Box height="50">
                              <Button
                                textTransform="uppercase"
                                sx={{ marginBottom: "50px" }}
                                className="orange-btn small-btn"
                              >
                                New
                              </Button>
                            </Box>
                            <Box className="" paddingBottom={5}>
                              <Typography
                                variant="h4"
                                fontWeight="700"
                                className="secondary-font"
                                paddingBottom={2}
                              >
                                A Beginner's Guide to TradingView
                              </Typography>
                              <Typography paddingBottom={5}>Ethereum</Typography>
                              <Typography className="body-caption secondary-color">
                                A fully-featured landing page kit, including design files,
                                and beautiful 3D illustrations editable.
                              </Typography>
                            </Box>
                            <Box>
                              <ArrowRightAlt />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                          <img sx={{ maxWidth: "100%" }} src={Blog1} />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box paddingBottom={3}>
                      <Grid container>
                        <Grid item xs={12} sm={5} md={5}>
                          <Box
                            className="blog-box"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                          >
                            <Box height="50">
                              <Button
                                textTransform="uppercase"
                                sx={{ marginBottom: "50px" }}
                                className="orange-btn small-btn"
                              >
                                beginner
                              </Button>
                            </Box>
                            <Box className="" paddingBottom={5}>
                              <Typography
                                variant="h4"
                                fontWeight="700"
                                className="secondary-font"
                                paddingBottom={2}
                              >
                                A Beginner's Guide to TradingView
                              </Typography>
                              <Typography paddingBottom={5}>Ethereum</Typography>
                              <Typography className="body-caption secondary-color">
                                A fully-featured landing page kit, including design files,
                                and beautiful 3D illustrations editable.
                              </Typography>
                            </Box>
                            <Box>
                              <ArrowRightAlt />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                          <img sx={{ maxWidth: "100%" }} src={Blog1} />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box paddingBottom={3}>
                      <Grid container>
                        <Grid item xs={12} sm={5} md={5}>
                          <Box
                            className="blog-box"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                          >
                            <Box sx={{ height: "50px" }}>
                              <Button
                                textTransform="uppercase"
                                sx={{ marginBottom: "50px" }}
                                className="orange-btn small-btn"
                              >
                                beginner
                              </Button>
                            </Box>
                            <Box className="" paddingBottom={5}>
                              <Typography
                                variant="h4"
                                fontWeight="700"
                                className="secondary-font"
                                paddingBottom={2}
                              >
                                A Beginner's Guide to TradingView
                              </Typography>
                              <Typography paddingBottom={5}>Ethereum</Typography>
                              <Typography className="body-caption secondary-color">
                                A fully-featured landing page kit, including design files,
                                and beautiful 3D illustrations editable.
                              </Typography>
                            </Box>
                            <Box>
                              <ArrowRightAlt />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                          <img sx={{ maxWidth: "100%" }} src={Blog1} />
                        </Grid>
                      </Grid>
                    </Box>

                  </Box>
                </TabPanel>
                <TabPanel value={valueTab} index={2} dir={theme.direction}>
                  <Box>
                    <Box paddingBottom={3}>
                      <Grid container>
                        <Grid item xs={12} sm={5} md={5}>
                          <Box
                            className="blog-box"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                          >
                            <Box height="50">
                              <Button
                                textTransform="uppercase"
                                sx={{ marginBottom: "50px" }}
                                className="orange-btn small-btn"
                              >
                                New
                              </Button>
                            </Box>
                            <Box className="" paddingBottom={5}>
                              <Typography
                                variant="h4"
                                fontWeight="700"
                                className="secondary-font"
                                paddingBottom={2}
                              >
                                A Beginner's Guide to TradingView
                              </Typography>
                              <Typography paddingBottom={5}>Ethereum</Typography>
                              <Typography className="body-caption secondary-color">
                                A fully-featured landing page kit, including design files,
                                and beautiful 3D illustrations editable.
                              </Typography>
                            </Box>
                            <Box>
                              <ArrowRightAlt />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                          <img sx={{ maxWidth: "100%" }} src={Blog1} />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box paddingBottom={3}>
                      <Grid container>
                        <Grid item xs={12} sm={5} md={5}>
                          <Box
                            className="blog-box"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                          >
                            <Box height="50">
                              <Button
                                textTransform="uppercase"
                                sx={{ marginBottom: "50px" }}
                                className="orange-btn small-btn"
                              >
                                beginner
                              </Button>
                            </Box>
                            <Box className="" paddingBottom={5}>
                              <Typography
                                variant="h4"
                                fontWeight="700"
                                className="secondary-font"
                                paddingBottom={2}
                              >
                                A Beginner's Guide to TradingView
                              </Typography>
                              <Typography paddingBottom={5}>Ethereum</Typography>
                              <Typography className="body-caption secondary-color">
                                A fully-featured landing page kit, including design files,
                                and beautiful 3D illustrations editable.
                              </Typography>
                            </Box>
                            <Box>
                              <ArrowRightAlt />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                          <img sx={{ maxWidth: "100%" }} src={Blog1} />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box paddingBottom={3}>
                      <Grid container>
                        <Grid item xs={12} sm={5} md={5}>
                          <Box
                            className="blog-box"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                          >
                            <Box sx={{ height: "50px" }}>
                              <Button
                                textTransform="uppercase"
                                sx={{ marginBottom: "50px" }}
                                className="orange-btn small-btn"
                              >
                                beginner
                              </Button>
                            </Box>
                            <Box className="" paddingBottom={5}>
                              <Typography
                                variant="h4"
                                fontWeight="700"
                                className="secondary-font"
                                paddingBottom={2}
                              >
                                A Beginner's Guide to TradingView
                              </Typography>
                              <Typography paddingBottom={5}>Ethereum</Typography>
                              <Typography className="body-caption secondary-color">
                                A fully-featured landing page kit, including design files,
                                and beautiful 3D illustrations editable.
                              </Typography>
                            </Box>
                            <Box>
                              <ArrowRightAlt />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={7}>
                          <img sx={{ maxWidth: "100%" }} src={Blog1} />
                        </Grid>
                      </Grid>
                    </Box>

                  </Box>
                </TabPanel>

              </SwipeableViews>
            </TabContext>
          </Box>
        </Container>
      </Container>
      {/* blog ends */}

      <Container>
        <Box paddingY={7}>
          <Box>
            <Stack
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              paddingY={5}
              sx={{ borderBottom: "1px solid #E6E8EC" }}
            >
              <Typography className="body-large" fontWeight={600}>
                Search anything about crypto
              </Typography>
              <Button className="search-icon">
                <Search />
              </Button>
            </Stack>
          </Box>
          <Box
            sx={{ display: { xs: "block", md: "flex" } }}
            flexDirection="row"
            justifyContent="space-between"
            paddingTop={3}
            paddingBottom={8}
          >
            <Box>
              <FormControl
                className="mobile-w-100"
                sx={{ m: 1, width: 300, mt: 3 }}
              >
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <p className="margin-0">Recently Added</p>;
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    Recently Added
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Stack
                direction="row"
                className="filter-btn"
                spacing="2"
                paddingTop={5}
              >
                <Button variant="contained" className="btn btn-secondary">
                  Tutorials{" "}
                </Button>
                <Button>Usecase</Button>
                <Button>Trading</Button>
                <Button>Wallet</Button>
              </Stack>
            </Box>
          </Box>

          <Grid container spacing={6} rowSpacing={6}>
            {tutorials.map((item, key) => {
              return (
                <Grid item xs={12} md={6} xl={4}>
                  <Box
                    className="about-crypto"
                    onclick={() => {
                      navigate("../learn-cypto-detail");
                    }}
                  >
                    <Button
                      textTransform="uppercase"
                      className="orange-btn float-img small-btn"
                    >
                      New
                    </Button>

                    <Box
                      className="avatar-rounded"
                      onClick={() => scrollToVideo(scrollRef, item.video_link)}
                      sx={{ cursor: "pointer" }}
                    >
                      <img src={GridImage} />
                    </Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      paddingTop={3}
                    >
                      <Box display="flex">
                        <img src={Avatar} />
                        <Box sx={{ paddingLeft: "15px" }}>
                          <Typography fontWeight="500">{item.title}</Typography>
                          <Typography
                            className="small-caption secondary-color"
                            fontWeight="500"
                          >
                            <span>First Name</span> <span>Last Name</span>
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Button className="btn btn-green-outlined">
                          Popular
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              );
            })}

            <Grid item xs={12} md={6} xl={4}>
              <Box
                className="about-crypto"
                onclick={() => {
                  navigate("../learn-cypto-detail");
                }}
              >
                <Button
                  textTransform="uppercase"
                  className="orange-btn float-img small-btn"
                >
                  New
                </Button>

                <Box className="avatar-rounded">
                  <img src={GridImage} />
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  paddingTop={3}
                >
                  <Box display="flex">
                    <img src={Avatar} />
                    <Box sx={{ paddingLeft: "15px" }}>
                      <Typography fontWeight="500">
                        Top 7 NFT usecase
                      </Typography>
                      <Typography
                        className="small-caption secondary-color"
                        fontWeight="500"
                      >
                        <span>First Name</span> <span>Last Name</span>
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Button className="btn btn-green-outlined">Popular</Button>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} xl={4}>
              <Box
                className="about-crypto"
                onclick={() => {
                  navigate("../learn-cypto-detail");
                }}
              >
                <Button
                  textTransform="uppercase"
                  className="orange-btn float-img small-btn"
                >
                  New
                </Button>

                <Box className="avatar-rounded">
                  <img src={GridImage} />
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  paddingTop={3}
                >
                  <Box display="flex">
                    <img src={Avatar} />
                    <Box sx={{ paddingLeft: "15px" }}>
                      <Typography fontWeight="500">
                        Top 7 NFT usecase
                      </Typography>
                      <Typography
                        className="small-caption secondary-color"
                        fontWeight="500"
                      >
                        <span>First Name</span> <span>Last Name</span>
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Button className="btn btn-green-outlined">Popular</Button>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} xl={4}>
              <Box
                className="about-crypto"
                onclick={() => {
                  navigate("../learn-cypto-detail");
                }}
              >
                <Button
                  textTransform="uppercase"
                  className="orange-btn float-img small-btn"
                >
                  New
                </Button>

                <Box className="avatar-rounded">
                  <img src={GridImage} />
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  paddingTop={3}
                >
                  <Box display="flex">
                    <img src={Avatar} />
                    <Box sx={{ paddingLeft: "15px" }}>
                      <Typography fontWeight="500">
                        Top 7 NFT usecase
                      </Typography>
                      <Typography
                        className="small-caption secondary-color"
                        fontWeight="500"
                      >
                        <span>First Name</span> <span>Last Name</span>
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Button className="btn btn-green-outlined">Popular</Button>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} xl={4}>
              <Box
                className="about-crypto"
                onClick={() => {
                  navigate("../learn-cypto-detail");
                }}
              >
                <Button
                  textTransform="uppercase"
                  className="orange-btn float-img small-btn"
                >
                  New
                </Button>

                <Box className="avatar-rounded">
                  <img src={GridImage} />
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  paddingTop={3}
                >
                  <Box display="flex">
                    <img src={Avatar} />
                    <Box sx={{ paddingLeft: "15px" }}>
                      <Typography fontWeight="500">
                        Top 7 NFT usecase
                      </Typography>
                      <Typography
                        className="small-caption secondary-color"
                        fontWeight="500"
                      >
                        <span>First Name</span> <span>Last Name</span>
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Button className="btn btn-green-outlined">Popular</Button>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Box paddingTop={8} paddingBottom={15}>
            <Button
              sx={{ margin: "0 auto" }}
              className="btn btn-outlined-secondary"
              varient="outlined"
              endIcon={<ArrowDropDown />}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>

      {/* section starts */}
      <Container maxWidth="fluid" sx={{ backgroundColor: "#F4F5F6" }}>
        <Container>
          <Box paddingBottom={12} paddingTop={12}>
            <Box textAlign="center">
              <img src={DarkLogo} />
              <Typography
                variant="h2"
                component="h2"
                className="secondary-font mobile-f-48"
                textAlign="center"
                paddingBottom={3}
                sx={{ fontWeight: "700" }}
              >
                Stay in the know on
                <br /> crypto with coinguru
              </Typography>
              <Typography className="secondary-color">
                A creative agency that lead and inspire
              </Typography>
            </Box>
            <Box className="crypto-box">
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className="flow-reverse-mobile"
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  paddingRight={6}
                  className="padding-0-mobile"
                >
                  <Typography
                    className="small-caption secondary-color"
                    sx={{ textTransform: "uppercase" }}
                    paddingBottom={3}
                  >
                    Crypto news
                  </Typography>
                  <Typography paddingBottom={3} className="body-large">
                    Be Part of our Global Community
                  </Typography>
                  <Typography className="secondary-color" paddingBottom={14}>
                    Let’s stay in touch. Join our communities to keep up with
                    the BitCloud team and our traders from across the world.
                  </Typography>
                  <Button className="btn-outlined-secondary">Join now</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} textAlign="right">
                  <img src={Globe} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Container>
      {/* section ends */}
    </>
  );
};

export default LearnCypto;
