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
import { useRecoilValue, useRecoilState } from "recoil";
import { tutorialAtom, 
  loaderAtom, 
  blogListAtom, 
  blogimgAtom, 
  blogVideoAtom, 
  newsListAtomSingle, 
  promotionAtomSingle,
  guideListSingleAtom,
  analyticListSingleAtom,
  blogListSingleAtom} from "../../_state";
import {
  useTutorialActions, 
  newsListActions, 
  promotionsActions, 
  guidesAnalysisActions, 
  analyticsActions } from "../../_actions";
import { useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
import ReactPlayer from "react-player";
import ShareIcon from "../../../public/assets/images/icons/share.svg";
import LikeIcon from "../../../public/assets/images/icons/love.svg";
import { useParams } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const LearnCyptoDetail = () => {
  const [newsListSingle, setNewsListSingle] = useRecoilState(newsListAtomSingle);
  const [promotionSingle, setPromotionSingle] = useRecoilState(promotionAtomSingle);
  const [guideListSingle, setGuideListSingle] = useRecoilState(guideListSingleAtom);
  const [analyticListSingle, setAnalyticListSingle] = useRecoilState(analyticListSingleAtom);
  const [blogListSingle, setBlogListSingle] = useRecoilState(blogListSingleAtom);
  const params = useParams();
  const newsListGetActions = newsListActions();
  const promotionsGetActions = promotionsActions();
  const guidesGetActions = guidesAnalysisActions();
  const analyticsGetActions = analyticsActions();
  
  useEffect(() => {
    switch (params.page) {
      case "newsletter":
        {
           newsListGetActions.getSingle(params.title)
           break;
        }

      case "newspromotions":
           promotionsGetActions.getSingle(params.title)
           break;

      case "guides":
            guidesGetActions.getSingle(params.title)
        break;

      case "guideanalytics":
          analyticsGetActions.getSingle(params.title)
        break;

      case "learncypto":
        tutorialAction.getSingle(params.title)
        break;

      case "learncyptovideo":
        tutorialAction.getSingleVideo(params.title)
        setTitleblog(true);
        break;
      
      case "learnandearn":
        tutorialAction.getSingleMarket(params.title)
        break;

      default : {
        console.warn("error")
      }
    }
   
  },[blogImg])
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/learn-cypto">
      Learn crypto
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/learn-cypto">
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
  const navigate = useNavigate();
  const [blogImg, setBlogimg] = useRecoilState(blogListAtom)
  const [blogNew, setBlognew] = useRecoilState(blogimgAtom)
  const [blogVideo, setBlogvideo] = useRecoilState(blogVideoAtom)
  const [titleblog, setTitleblog] = useState(false);


  const scrollToVideo = (e, videoLink, data) => {
    e.current.scrollIntoView({
      behavior: "smooth",
    });
    setVideoUrl(videoLink);
    setBlognew(true);
    setBlogimg(data);
    setTitleblog(true);
  };



  const handleLoadMore = () => {
    setVisibleVideos((prevVisibleVideos) => prevVisibleVideos + 6);
    navigate('/learn-cypto')
  };

  useEffect(() => {
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
    tutorialAction.tutorialData();

  }, []);

  useEffect(() => {
    setVideoUrl(displayVideo);
    
  }, [displayVideo]);

  return (
    <>
      {/* <Helmet>
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet> */}
      <Container className="learn-crypto-details">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box ref={scrollRef}>

          <Typography
            paddingBottom={3}
            variant="h1"
            className="secondary-font"
            fontWeight="700"
            textAlign="center"
          >
            {blogNew === true ? `${blogImg.title}` : "" }
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
        <Box paddingBottom={{ xs: 4, sm: 10 }}>
          <Box>
            {blogNew === true && titleblog !== true ?
              <Box sx={{ maxWidth: "100%", justifyContent: "center", "display": "flex" }} paddingTop={{ xs: 4, sm: 10 }} paddingBottom={{ xs: 4, md: 10, lg: 17 }}
              >
                {blogVideo === false ?

                  <img
                    sx={{ maxWidth: "100%", }}
                    src={`${process.env.REACT_APP_IMAGE_URL}/${blogImg.image}`}
                  />
                  :
                  <video poster={VideoImg} width="100%" height="100%" controls>
                    <source src={blogImg.video_link} type="video/mp4" />

                  </video>

                }

              </Box>
              :
              <Box paddingTop={{ xs: 4, sm: 10 }} paddingBottom={{ xs: 4, md: 10, lg: 17 }}>
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
            }

            <Box className="smallwidth">
              <Typography
                variant="h2"
                fontWeight="700"
                component="div"
                className="secondary-font font-40 bottom-border"
                marginBottom={4}
                paddingBottom={4}
              >
                {blogNew === true && blogVideo !== true ? "Description" : "Introduction"}
              </Typography>

              {blogNew === true ?
                <Typography
                  className="secondary-color"
                  variant="p"
                  component="p"
                  paddingBottom={3}
                >
                  {ReactHtmlParser(blogImg.description)}
                </Typography>
                :

                (<Box>
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
                    paddingBottom={{ xs: 4, sm: 10 }}
                  >
                    Mix-and-match dozens of responsive elements to quickly configure
                    your favorite landing page layouts or hit the ground running
                    with 10 pre-built templates, all in light or dark mode."{" "}
                  </Typography>
                </Box>)
              }
              
            </Box>

          </Box>
        </Box>
      </Container>
    
    </>
  );
};

export default LearnCyptoDetail;
