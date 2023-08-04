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
import Avatar from "../../../public/assets/images/avatar.svg";
import {  ArrowRightAlt, ArrowDropDown } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { RoutesName } from "../../_common/app.constants";
import DarkLogo from "../../../public/assets/images/logo.svg";
import Globe from "../../../public/assets/images/globe.svg";
import ReactPlayer from "react-player";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { tutorialAtom, blogAtom, loaderAtom, blogListAtom, blogimgAtom,tutorialCategoryAtom } from "../../_state";
import { useTutorialActions } from "../../_actions/tutorial.actions";
import Tab from "@mui/material/Tab";
import { TabContext, TabPanel, TabList } from "@mui/lab/";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

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
  const tutorialsData = useRecoilValue(tutorialAtom);
  const [tutorialTab, setTutorialTab] = useState("1");
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const loader = useRecoilValue(loaderAtom);
  const blogsData = useRecoilValue(blogAtom);
  const BlogCategory = useRecoilValue(tutorialCategoryAtom).filter((item) => {
    return item.type === "Blog";
  });
  const [blogList, setBlogList] = useState(blogsData);
  const [blogImg, setBlogimg] = useRecoilState(blogListAtom);
  const [blogNew, setBlognew] = useRecoilState(blogimgAtom);
  const [value, setValue] = useState("1");

  // *BlogCategoryList*
  const handleBlogChange = (e) => {
      setValue(e.target.value);
      e.target.value == 1
          ? setBlogList(blogsData)
          : handleTutorials(e.target.value);
  };

  const handleChanges = (value) => {
          setValue(value);
          value == 1
              ? setBlogList(blogsData)
              : handleTutorials(value);
      };

  const handleTutorials = (BlogCategory) => {
      let tutorialsArr = [];
      tutorialsArr = blogsData
          .filter((items) => {
              return items.category === BlogCategory;
          })

          setBlogList(tutorialsArr);
  };

  const imgLink =(data) =>{
    navigate(RoutesName.learn_Crypto_Details)
      setBlogimg(data)
      setBlognew(true)
  }

  const handleBlogs = (blogCategory) => {
    let blogsArr = [];
    blogsArr = blogsData
      .filter((blog) => {
        return blog.category === blogCategory;
      })
      .slice(0, 3);
    setBlogList(blogsArr);
  };

  useEffect(() => {
    handleBlogs("2D Design");
  }, [blogsData]);

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

  const scrollToVideo = (e, videoLink, imageLink, data) => {
    e.current.scrollIntoView({
      behavior: "smooth",
    });
    setVideoUrl(videoLink);
    setImageUrl(imageLink);
    setBlogimg(data);
    setBlognew(true)
  };

  useEffect(() => {
    tutorialAction.blogData();
    tutorialAction.tutorialData();
     window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
  }, []);

  // Category Api
  useEffect(() => {
      const response = tutorialAction.categoryList();
      response.then((res) => { (res) })
  }, []);

  useEffect(() => {
    setVideoUrl(tutorialsData[0]?.video_link);
    setImageUrl(tutorialsData[0]?.image_link);
  }, [tutorialsData]);

  const handleLoadMore = () => {
    setVisibleVideos((prevVisibleVideos) => prevVisibleVideos + 6);
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
  };

  const handleChangeDropdown = (event) => {
    setValue(event.target.value);
  };

  const handleChangeTutorialDropdown = (event) => {
    setTutorialTab(event.target.value);
  };

  useEffect(() => {
    setBlogList(blogsData)
}, [blogsData]);

useEffect(() => {
  window.scrollTo({ top: 1, left: 1, behavior: "smooth" })
}, []);

  return (
    <>
      <Container className="learn-crypto">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box>
          <Typography
              variant="h1"
              className="secondary-font"
              fontWeight="700"
              textAlign="center"
              marginBottom={{ xs: 2 }}
            >
             {blogNew === true? `${  blogImg.title}`: ` Blockchain & Crypto` } 
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
              <Button variant="contained" className="btn btn-primary">
                Learn Now{" "}
              </Button>
              <Button
                variant="outlined"
                className="btn btn-outlined-secondary"
                onClick={() => {
                  navigate("../learn-cypto-detail");
                  setBlognew(false);
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
            {blogNew === true? <> 
             <Typography
                variant="h2"
                fontWeight="700"
                component="div"
                className="secondary-font font-40 bottom-border"
                marginBottom={1}
                padding={2}
              >
               Description
              </Typography>
              <Typography
                className="secondary-color"
                variant="p"
                component="p"
                paddingBottom={1}
                >
                {blogImg.description}
                </Typography></>
                : ""}
          </Box>
        </Box>
      </Container>
      {/* Our Blog section */}
      <Box className="latest-release">
        <Container>
          <Box>
            <Grid container>
              <Grid item xs={12} sm={5} md={5}>
                <Typography className="small-caption secondary-color">
                  OUR BLOG
                </Typography>
              </Grid>
              <Grid item xs={12} sm={7} md={7}>
                <Typography
                  variant="h2"
                  className="secondary-font"
                  fontWeight="700"
                  paddingBottom="20px"
                >
                  Latest Releases
                </Typography>
                <Typography color={"#353945"}>
                  Stacks is a production-ready library of stackable content
                  blocks built in React Native.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container>
            <Box className="right-tab">
                <TabContext value={value} className="tab-grid">
                <Grid container>
                  <Grid className="" xs={12} sm={5} md={5}></Grid>
                  <Grid className="" xs={12} sm={7} md={7}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList className='for-desktop' onChange={handleBlogChange} aria-label="tabs">
                        <Tab 
                          label="All" 
                          value="1"
                          onClick={e => handleChanges('1')}  />
                            {BlogCategory?.map((item) => {
                                return <Tab 
                                indicatorColor="secondary"
                                textColor="inherit"
                                onClick={e => handleChanges(item.title)}  
                                label={item.title} value={item.title} />;
                            })}
                        </TabList>
                      </Box>

                      <Box className="for-mobile dropdown-mobile">
                        <FormControl sx={{ m: 0, minWidth: 120, width: "100%" }}>
                            <Select
                                value={value}
                                onChange={e => handleBlogChange(e)}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                            >
                                <MenuItem value="1" >All</MenuItem>
                                {BlogCategory?.map((item) => {
                                    return (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                      </Box>
                  </Grid>
                </Grid>
              <TabPanel value={value}>
                <Box>
                  {blogList?.map((item) => {
                    return (
                      <Box className="right-tab-content">
                        <Grid container
                            onClick={() => imgLink(item)}
                            sx={{ cursor: "pointer" }}
                        >
                          <Grid item xs={12} sm={5} md={5}>
                            <Box
                              className="blog-box"
                              display="flex"
                              flexDirection="column"
                              justifyContent="space-between"
                            >
                              <Box height="50">
                                <Typography
                                  textTransform="uppercase"
                                  className="orange-btn small-btn small-new-btn"
                                >
                                  New
                                </Typography>
                              </Box>
                              <Box className="blog-box-content">
                              
                                <Typography
                                  variant="h4"
                                  fontWeight="700"
                                  className="secondary-font"
                                  paddingBottom={1}
                                  sx={{maxHeight: '80px', overflow: 'hidden' }}
                                >
                                  {item.title}
                                </Typography>
                                <Typography paddingBottom={3}>
                                  {item.category}
                                </Typography>
                             
                                <Typography className="body-caption secondary-color"  sx={{maxHeight: '45px', overflow: 'hidden'}}>
                                  {item.description}
                                </Typography>
                              </Box>
                              <Box>
                              <Link to={'../learn-cypto-detail'}>  <ArrowRightAlt sx={{color : "#000000"}}  /> </Link>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={7} md={7}  >
                            <img
                              sx={{ maxWidth: "100%" }}
                              src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`}
                            />
                              
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
      </Box>
      {/* blog ends */}

      <Container>
        <TabContext value={tutorialTab}>
          <Box className="tutorials-grid">
            <Box
              sx={{ display: { xs: "block", sm: "flex" } }}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              padding={0}
            >
              <Box>
                <FormControl className="mobile-w-100" sx={{ width: 300 }}>
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
                <Stack direction="row" className="filter-btn" spacing="2">
                  <TabList
                    alignItems="center"
                    className="for-desktop"
                    onChange={handleChangeTutorialTab}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      onClick={() => {
                        navigate("/contentnotfound");
                      }}
                      label="Tutorials"
                      value="1"
                    />
                    <Tab
                      onClick={() => {
                        navigate("/contentnotfound");
                      }}
                      label="Usecase"
                      value="2"
                    />
                    <Tab
                      onClick={() => {
                        navigate("/contentnotfound");
                      }}
                      label="Trading"
                      value="3"
                    />
                    <Tab
                      onClick={() => {
                        navigate("/contentnotfound");
                      }}
                      label="Wallet"
                      value="4"
                    />
                  </TabList>

                  <Box className="for-mobile dropdown-mobile">
                    <FormControl sx={{ m: 0, minWidth: 120, width: "100%" }}>
                      <Select
                        onChange={handleChangeTutorialDropdown}
                        displayEmpty
                        value={tutorialTab}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="1">Tutorials</MenuItem>
                        <MenuItem value="2">Usecase</MenuItem>
                        <MenuItem value="3">Trading</MenuItem>
                        <MenuItem value="4">Wallet</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Box className="tutorials-grid-item">
              <Grid container columnSpacing={4} rowSpacing={0}>
                {tutorialsData?.slice(0, 6).map((item) => {
                  return (
                    <Grid item xs={12} md={6} xl={4}>
                      <Box
                        className="about-crypto"
                        onclick={() => {
                          navigate(RoutesName.learn_Crypto_Details);
                        }}
                      >
                        <Typography
                          textTransform="uppercase"
                          className="orange-btn float-img small-btn small-new-btn"
                        >
                          New
                        </Typography>

                        <Box
                          className="about-crypto"
                          onclick={() => {
                            navigate(RoutesName.learn_Crypto_Details);
                          }}
                        >
                          <Typography
                            textTransform="uppercase"
                            className="orange-btn float-img small-btn small-new-btn"
                          >
                            New
                          </Typography>

                          <Box
                            className="avatar-rounded"
                            onClick={() =>
                              scrollToVideo(
                                scrollRef,
                                item.video_link,
                                item.image_link,
                                item
                              )
                            }
                            sx={{ cursor: "pointer" }}
                          >
                            <img
                              className="tutorial-preview"
                              src={item.image_link}
                            />
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            paddingTop={3}
                          >
                            <Box display="flex" width="calc(100% - 45px)">
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
                              <Typography className="btn btn-green-outlined small-new-btn">
                                Popular
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

              <Box paddingTop={{ xs: 3, sm: 4 }}>
                <Button
                  sx={{ margin: "0 auto" }}
                  className="btn btn-outlined-secondary"
                  varient="outlined"
                  endIcon={<ArrowDropDown />}
                  onClick={() => {
                    navigate(RoutesName.learn_Crypto_Details);
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Box>
        </TabContext>
      </Container>

      {/* section starts */}
      <Box className="global-community">
        <Container>
          <Box>
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
            <Box className="swiper-global">
              <Swiper
                slidesPerView={1}
                navigation={true}
                spaceBetween={0}
                modules={[Navigation]}
                className="mySwiper"
              >
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
                          Be Part of our Global Community
                        </Typography>
                        <Typography className="secondary-color" paddingBottom={{ xs: 8, sm: 12 }}>
                          Let’s stay in touch. Join our communities to keep up with
                          the BitCloud team and our traders from across the world.
                        </Typography>
                        <Button
                          className="btn-outlined-secondary"
                          onClick={() => navigate("/community")}
                        >
                          Join now
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} textAlign="right">
                        <img src={Globe} />
                      </Grid>
                    </Grid>
                  </Box>
                </SwiperSlide>
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
                          Be Part of our Global Community
                        </Typography>
                        <Typography className="secondary-color" paddingBottom={{ xs: 8, sm: 12 }}>
                          Let’s stay in touch. Join our communities to keep up with
                          the BitCloud team and our traders from across the world.
                        </Typography>
                        <Button
                          className="btn-outlined-secondary"
                          onClick={() => navigate("/community")}
                        >
                          Join now
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} textAlign="right">
                        <img src={Globe} />
                      </Grid>
                    </Grid>
                  </Box>
                </SwiperSlide>
              </Swiper>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* section ends */}
    </>
  );
};

export default LearnCypto;
