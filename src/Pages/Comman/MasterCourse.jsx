import React from "react";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../_common/app.constants";
import { Box, Container, Typography, Breadcrumbs } from "@mui/material";
import { NavigateNext } from "@mui/icons-material/";
import { Link } from "react-router-dom";
import { academyActions } from "../../_actions";
import { masterAtom } from "../../_state";
import { useRecoilValue } from "recoil";
import ReactHtmlParser from "react-html-parser";
import Levagedv2 from "../../../public/assets/images/leveragedv2.svg";

const MasterCourse = () => {
  const masterActionList = academyActions();
  const masterCourse = useRecoilValue(masterAtom);

  const breadcrumbs = [
    <Link to="/" underline="hover" key="1" color="inherit">
      Home
    </Link>,
    <Typography key="3">Master Course</Typography>,
  ];

  //Master Course Api
  useEffect(() => {
    let response = masterActionList.masterCourseGetList();
    response.then((res) => {
      res;
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          className="community-wrapper subscription-wrapper bredcrum-div"
        >
          <Container maxWidth="lg">
            <Box
              className="right-breadcrum ol community-class"
              sx={{ color: "#777E90", fontWeight: "500" }}
            >
              <Box>
                <Breadcrumbs
                  separator={<NavigateNext fontSize="small" />}
                  aria-label="breadcrumb"
                  className="center-breadcrum"
                >   
                  {breadcrumbs}
                </Breadcrumbs>
              </Box> 
            </Box>
            {masterCourse?.map((items,index) => {
              console.log(masterCourse.length,'4444444444444');
              let title = items.title;
              let description = items.decription;
              let image = items.image
                ? `${process.env.REACT_APP_IMAGE_URL}/${items.image}`
                : items.image_link;
              return (
                <>
                  <Box className="subscription-wrapper-head head-about-div">
                    <Typography className="describe-h2" component="h2" variant="h2">
                      {title}
                    </Typography>
                  </Box>
                  <Box className="page-inner">
                    {image == null || image == "" ? (
                      " "
                    ) : (
                      <img src={image} alt="" />
                    )}
                    <Typography className="describe-p" component="p" variant="body2">
                      {ReactHtmlParser(description)}
                    </Typography>
                  </Box>
                  {/* {index < (masterCourse.length-1) ?<div className="devider" />:<></>}  */}
                </>
              );
            })}
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MasterCourse;
