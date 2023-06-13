import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  Link,
  Breadcrumbs,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import VideoImg from "../../../public/assets/images/learn01.png";
import Avatar from "../../../public/assets/images/avatar.svg";
import GridImage from "../../../public/assets/images/grid.svg";
import { NavigateNext, ArrowDropDown } from "@mui/icons-material";
import { useRecoilValue } from "recoil";
import { tutorialAtom, loaderAtom } from "../../_state";
import { useTutorialActions } from "../../_actions/tutorial.actions";
import ReactPlayer from "react-player";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const LearnCyptoDetail = () => {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Learn crypto
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Trading
    </Link>,
    <Typography key="3" color="text.primary">
      Bitcoin
    </Typography>,
  ];
  const scrollRef = useRef();
  const tutorialsData = useRecoilValue(tutorialAtom);
  const displayVideo = tutorialsData[0]?.video_link;
  const displayImage = tutorialsData[0]?.image_link;
  const [videoUrl, setVideoUrl] = useState("");
  const [visibleVideos, setVisibleVideos] = useState(6);
  const tutorialAction = useTutorialActions();
  const loader = useRecoilValue(loaderAtom);

  const scrollToVideo = (e, videoLink) => {
    e.current.scrollIntoView({
      behavior: "smooth",
    });
    setVideoUrl(videoLink);
  };

  const handleLoadMore = () => {
    setVisibleVideos((prevVisibleVideos) => prevVisibleVideos + 6);
  };

  useEffect(() => {
    tutorialAction.tutorialData();
  }, []);

  useEffect(() => {
    setVideoUrl(displayVideo);
  }, [displayVideo]);

  return (
    <>
      <Container sx={{ pt: 10 }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box ref={scrollRef}>
          <Typography
            paddingTop={5}
            paddingBottom={5}
            variant="h1"
            className="secondary-font"
            fontWeight="700"
            textAlign="center"
          >
            A beginner’s guide to <br />
            trading view
          </Typography>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            className="center-breadcrum"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
      </Container>

      {/* video section ends */}

      <Container>
        <Box paddingY={10}>
          <Box>
            <Box paddingBottom={10}>
              <ReactPlayer
                url={videoUrl}
                controls={true}
                light={displayImage}
                playing={true}
                width="100%"
                height="550px"
                // style={{ border: "1px solid black" }}
              />
            </Box>
            <Box className="smallwidth">
              <Typography
                variant="h2"
                fontWeight="700"
                component="div"
                className="secondary-font font-40 bottom-border"
                marginBottom={4}
                paddingBottom={4}
              >
                Introduction
              </Typography>
              <Typography
                className="secondary-color"
                variant="p"
                component="p"
                paddingBottom={3}
              >
                For traders who love technical analysis, robust charting tools
                are essential. TradingView is one option for both amateur and
                experienced traders. It offers numerous trading and charting
                tools and also a free membership option. Let’s face it... not
                everyone has the money or need for a Bloomberg terminal
                subscription.
              </Typography>
              <Typography
                className="secondary-color"
                variant="p"
                component="p"
                paddingBottom={3}
              >
                The Stacks series of products: Stacks: Landing Page Kit, Stacks:
                Portfolio Kit, Stacks: eCommerce Kit. "Stacks is a
                production-ready library of stackable content blocks built in
                React Native.{" "}
              </Typography>
              <Typography
                className="secondary-color"
                variant="p"
                component="p"
                paddingBottom={10}
              >
                Mix-and-match dozens of responsive elements to quickly configure
                your favorite landing page layouts or hit the ground running
                with 10 pre-built templates, all in light or dark mode."{" "}
              </Typography>
              <Typography
                variant="h2"
                fontWeight="700"
                component="div"
                className="secondary-font font-40 bottom-border"
                marginBottom={4}
                paddingBottom={4}
                paddingTop={4}
              >
                What does TradingView do?
              </Typography>
              <Typography
                className="secondary-color"
                variant="p"
                component="p"
                paddingBottom={3}
              >
                The Stacks series of products: Stacks: Landing Page Kit, Stacks:
                Portfolio Kit, Stacks: eCommerce Kit. "Stacks is a
                production-ready library of stackable content blocks built in
                React Native.
              </Typography>
              <Typography
                className="secondary-color"
                variant="p"
                component="p"
                paddingBottom={3}
              >
                Mix-and-match dozens of responsive elements to quickly configure
                your favorite landing page layouts or hit the ground running
                with 10 pre-built templates, all in light or dark mode."
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box paddingBottom={10} textAlign="center">
              <img src={VideoImg} />
            </Box>
            <Box className="smallwidth">
              <Typography
                variant="h2"
                fontWeight="700"
                component="div"
                className="secondary-font font-40 bottom-border"
                marginBottom={4}
                paddingBottom={4}
                paddingTop={4}
              >
                How expensive is TradingView?
              </Typography>
              <Typography
                className="secondary-color"
                variant="p"
                component="p"
                paddingBottom={3}
              >
                The Stacks series of products: Stacks: Landing Page Kit, Stacks:
                Portfolio Kit, Stacks: eCommerce Kit. "Stacks is a
                production-ready library of stackable content blocks built in
                React Native.
              </Typography>
              <Typography
                className="secondary-color"
                variant="p"
                component="p"
                paddingBottom={3}
              >
                {" "}
                Mix-and-match dozens of responsive elements to quickly configure
                your favorite landing page layouts or hit the ground running
                with 10 pre-built templates, all in light or dark mode."{" "}
              </Typography>
              <Typography
                variant="h2"
                fontWeight="700"
                component="div"
                className="secondary-font font-40 bottom-border"
                marginBottom={4}
                paddingBottom={4}
                paddingTop={4}
              >
                Understanding the TradingView UI
              </Typography>
              <Typography
                className="secondary-color"
                variant="p"
                component="p"
                paddingBottom={3}
              >
                The Stacks series of products: Stacks: Landing Page Kit, Stacks:
                Portfolio Kit, Stacks: eCommerce Kit. "Stacks is a
                production-ready library of stackable content blocks built in
                React Native.{" "}
              </Typography>
              <Typography
                className="secondary-color"
                variant="p"
                component="p"
                paddingBottom={10}
              >
                Mix-and-match dozens of responsive elements to quickly configure
                your favorite landing page layouts or hit the ground running
                with 10 pre-built templates, all in light or dark mode."{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      <Container>
        <Box paddingY={7}>
          <Grid container spacing={6} rowSpacing={6}>
            {tutorialsData?.slice(0, visibleVideos).map((item) => {
              let title = item.title.substring(0, 20) + "...";
              return (
                <Grid item xs={12} sm={4} md={4}>
                  <Box className="about-crypto">
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
                      <img className="tutorial-preview" src={item.image_link} />
                    </Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      paddingTop={3}
                    >
                      <Box display="flex">
                        <img src={Avatar} />
                        <Box sx={{ paddingLeft: "15px" }}>
                          <Typography fontWeight="500">{title}</Typography>
                          <Typography
                            className="small secondary-color"
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
          <Typography textAlign="center" paddingTop={10}>
            <Button
              className="btn-outlined-secondary"
              endIcon={<ArrowDropDown />}
              onClick={handleLoadMore}
            >
              Learn More
            </Button>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default LearnCyptoDetail;
