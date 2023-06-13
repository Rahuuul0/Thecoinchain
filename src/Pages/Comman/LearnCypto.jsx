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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
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
import { tutorialAtom, blogAtom, loaderAtom } from "../../_state";
import { useTutorialActions } from "../../_actions/tutorial.actions";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab/";

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

const names = ["Most Popular", "A-Z", "Z-A"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const LearnCypto = () => {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const tutorialAction = useTutorialActions();
  const blogsData = useRecoilValue(blogAtom);
  const tutorialsData = useRecoilValue(tutorialAtom);
  const displayVideo = tutorialsData[0]?.video_link;
  const displayImage = tutorialsData[0]?.image_link;
  const [value, setValue] = useState("1");
  const [tutorialTab, setTutorialTab] = useState("1");
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(6);
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const loader = useRecoilValue(loaderAtom);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTutorialTab = (event, newValue) => {
    setTutorialTab(newValue);
  };

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

  const scrollToVideo = (e, videoLink, imageLink) => {
    e.current.scrollIntoView({
      behavior: "smooth",
    });
    setVideoUrl(videoLink);
    setImageUrl(imageLink);
  };

  useEffect(() => {
    tutorialAction.blogData();
    tutorialAction.tutorialData();
  }, []);

  useEffect(() => {
    setVideoUrl(tutorialsData[0]?.video_link);
    setImageUrl(tutorialsData[0]?.image_link);
  }, [tutorialsData]);

  const handleLoadMore = () => {
    setVisibleVideos((prevVisibleVideos) => prevVisibleVideos + 6);
  };

  return (
    <>
      <Container sx={{ pt: 14 }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
              light={imageUrl}
              playing={true}
              width="100%"
              height="640px"
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
          <Box className="right-tab">
            <TabContext value={value}>
              <AppBar position="static">
                <Grid container>
                  <Grid className="" xs={12} sm={5} md={5}></Grid>
                  <Grid className="" xs={12} sm={7} md={7}>
                    <TabList
                      onChange={handleChangeTab}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="2D Design" value="1" />
                      <Tab label="3D Design" value="2" />
                      <Tab label="Bitcoin" value="3" />
                    </TabList>
                  </Grid>
                </Grid>
              </AppBar>

              <TabPanel value="1">
                <Box>
                  {blogsData
                    .filter((blog) => {
                      return blog.category === "2D Design";
                    })
                    .slice(0, 3)
                    .map((item) => {
                      return (
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
                                    {item.title}
                                  </Typography>
                                  <Typography paddingBottom={5}>
                                    {item.category}
                                  </Typography>
                                  <Typography className="body-caption secondary-color">
                                    {item.blog_description}
                                  </Typography>
                                </Box>
                                <Box>
                                  <ArrowRightAlt />
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={7} md={7}>
                              <img sx={{ maxWidth: "100%" }} src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`} />
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    })}
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box>
                  {blogsData
                    .filter((blog) => {
                      return blog.category === "3D Design";
                    })
                    .slice(0, 3)
                    .map((item) => {
                      return (
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
                                    {item.title}
                                  </Typography>
                                  <Typography paddingBottom={5}>
                                    {item.category}
                                  </Typography>
                                  <Typography className="body-caption secondary-color">
                                   {item.blog_description}
                                  </Typography>
                                </Box>
                                <Box>
                                  <ArrowRightAlt />
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={7} md={7}>
                              <img sx={{ maxWidth: "100%" }} src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`} />
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    })}
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <Box>
                  {blogsData
                    .filter((blog) => {
                      return blog.category === "Bitcoin";
                    })
                    .slice(0, 3)
                    .map((item) => {
                      return (
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
                                    {item.title}
                                  </Typography>
                                  <Typography paddingBottom={5}>
                                    {item.category}
                                  </Typography>
                                  <Typography className="body-caption secondary-color">
                                   {item.blog_description}
                                  </Typography>
                                </Box>
                                <Box>
                                  <ArrowRightAlt />
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={7} md={7}>
                              <img sx={{ maxWidth: "100%" }} src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`} />
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    })}
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Container>
      </Container>
      {/* blog ends */}

      <Container>
        <TabContext value={tutorialTab}>
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
                  <TabList
                    onChange={handleChangeTutorialTab}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Tutorials" value="1" />
                    <Tab label="Usecase" value="2" />
                    <Tab label="Trading" value="3" />
                    <Tab label="Wallet" value="4" />
                  </TabList>
                </Stack>
              </Box>
            </Box>

            <Grid container spacing={6} rowSpacing={6}>
              {tutorialsData?.slice(0, visibleVideos).map((item) => {
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
                        onClick={() =>
                          scrollToVideo(
                            scrollRef,
                            item.video_link,
                            item.image_link
                          )
                        }
                        sx={{ cursor: "pointer" }}
                      >
                        <img
                          className="tutorial-preview"
                          src={item.image_link}
                        />
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
                              {item.title}
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
                          <Button className="btn btn-green-outlined">
                            Popular
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
            <Box paddingTop={8} paddingBottom={15}>
              <Button
                sx={{ margin: "0 auto" }}
                className="btn btn-outlined-secondary"
                varient="outlined"
                endIcon={<ArrowDropDown />}
                onClick={handleLoadMore}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </TabContext>
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
