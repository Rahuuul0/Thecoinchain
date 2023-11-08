import React from "react";
import { Container, Typography, Box, Breadcrumbs } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  EmailOutlined,
  NavigateNext,
  VisibilityOutlined,
} from "@mui/icons-material/";
import { useFooterActions } from "../../_actions";
import { TermsListAtom } from "../../_state";
import { useRecoilValue } from "recoil";
import ReactHtmlParser from "react-html-parser";

const TermsOfUse = () => {
  const TermsListAction = useFooterActions();
  const termsList = useRecoilValue(TermsListAtom);

  useEffect(() => {
    const response = TermsListAction.TermsList();
    response.then((res) => {
      res;
    });
  }, []);

  const breadcrumbs = [
    <Link to="/" underline="hover" key="1" color="inherit">
      Home
    </Link>,
    <Typography key="3" color="text.primary" sx={{ m: "0!important" }}>
      Terms of use
    </Typography>,
  ];
  useEffect(() => {
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
  });
  console.log(termsList, "termsList");
  return (
    <>
      <Box
        component="main"
        className="extra-wrapper subscription-wrapper bredcrum-div"
        sx={{ mt: 8 }}
      >
        <Container maxWidth="lg">
          <Box
            className="right-breadcrum ol"
            sx={{ color: "#777E90", fontWeight: "500" }}
          >
            <Box className="about-bread">
              <Breadcrumbs
                separator={<NavigateNext fontSize="small" />}
                aria-label="breadcrumb"
                className="center-breadcrum"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Box>
          </Box>
          {termsList?.map((items) => {
            let title = items.title;
            let description = items.description;
            return (
              <>
                <Box className="subscription-wrapper-head">
                  <Typography component="h2" variant="h2">
                    {title}
                  </Typography>
                </Box>
                <Typography variant="body2" component="p">
                  {ReactHtmlParser(description)}
                </Typography>
              </>
            );
          })}
        </Container>
      </Box>
    </>
  );
};

export default TermsOfUse;
