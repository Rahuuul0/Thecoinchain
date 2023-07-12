import React from "react";
import { useEffect } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../_common/app.constants";
import { Box, Container, Typography, Breadcrumbs } from "@mui/material";
import { Block, NavigateNext } from "@mui/icons-material/";
import { Grid, Button, Stack } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import Leveragedv3 from "../../../public/assets/images/leveragedv3.svg";
import Leveragedv2 from "../../../public/assets/images/leveragedv2.svg";
import Learn01 from "../../../public/assets/images/learn01.png";


const Academy = () => {
  const navigate = useNavigate();
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/"
    >
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      Academy
    </Typography>,
  ];
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          className="community-wrapper subscription-wrapper bredcrum-div"
        >
          <Container maxWidth="lg">
            <Box className="subscription-wrapper-head">
              <Typography component="h2" variant="h2">
                Academy
              </Typography>

              <Box className="" sx={{ color: "#777E90", fontWeight: "500" }}>
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
            </Box>
            <Box className="page-inner">
              {/* <Typography component="p" variant='body2'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, autem facere! Excepturi ea minima sapiente aliquid id. Fuga molestias modi dolore amet deleniti itaque nostrum facere excepturi, laborum nesciunt magnam distinctio consectetur sit nulla reiciendis? Unde odio quis aliquam architecto illo consectetur cumque corporis! Tenetur, delectus repellat amet excepturi, temporibus corporis aliquid modi natus maxime architecto iusto, adipisci facere officia nostrum alias ducimus dolor. Nostrum ducimus possimus, placeat dignissimos, ipsam illum tenetur id obcaecati perspiciatis, atque ex? Sint necessitatibus totam saepe vitae consectetur, sapiente vel at deserunt dolorum ducimus fugit quis nemo fugiat perferendis laborum error adipisci commodi exercitationem labore recusandae voluptate quos? Minima, explicabo! Illum voluptates in sequi sapiente recusandae cum pariatur? Deleniti nemo ipsum nostrum doloribus distinctio assumenda totam deserunt eius soluta? Quae numquam ea explicabo officia at, fugiat modi libero nihil eos totam veniam minus quidem voluptatem neque consequuntur eveniet. Impedit, aliquam ipsa quibusdam aliquid cumque fugiat dolores vitae tempora quis, suscipit harum iusto, quaerat ab. Molestias ab laborum odio soluta tenetur eveniet vitae dolorum? Modi sint maiores ex nihil? Fugit in perspiciatis distinctio officia iste vel! Non reprehenderit illum ipsum, quis, a similique suscipit explicabo debitis, incidunt nihil rem at eligendi. Expedita repellendus sunt provident quae?
                            </Typography> */}
            </Box>
          </Container>

          <Container>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 4 }}
              rowSpacing={4}
            >
              <Grid item xs={12} sm={6} md={6}>
                <img src={Leveragedv3} />
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  paddingTop={3}
                  sx={{ display: { xs: "block", sm: "block", md: "flex" } }}
                >
                  <Box>
                    <Typography
                      variant="h3"
                      component="div"
                      fontSize={32}
                      fontWeight={700}
                      className="secondary-font"
                    >
                      All About Crypto
                    </Typography>
                    <Typography
                      fontSize={16}
                      component="div"
                      paddingTop={2}
                      paddingBottom={2}
                      className="secondary-color primary-font"
                    >
                      Good things come in 3s. Get 3x Leveraged tokens now.
                    </Typography>
                  </Box>
                  <Button
                    variant="outline"
                    className="btn btn-outline"
                    endIcon={<KeyboardArrowRight />}
                    sx={{
                      border: "1px solid #E6E8EC",
                      height: "50px",
                      whiteSpace: "nowrap",
                      marginLeft: "0 !important",
                    }}
                    onClick={() => navigate("/academy-about-crypto")}
                    master-course
                  >
                    Learn more
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <img src={Leveragedv3} />
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  paddingTop={3}
                  sx={{ display: { xs: "block", sm: "block", md: "flex" } }}
                >
                  <Box>
                    <Typography
                      variant="h3"
                      component="div"
                      fontSize={32}
                      fontWeight={700}
                      className="secondary-font"
                    >
                      Master Course
                    </Typography>
                    <Typography
                      fontSize={16}
                      component="div"
                      paddingTop={2}
                      paddingBottom={2}
                      className="secondary-color primary-font"
                    >
                      Good things come in 3s. Get 3x Leveraged tokens now.
                    </Typography>
                  </Box>
                  <Button
                    variant="outline"
                    className="btn btn-outline"
                    endIcon={<KeyboardArrowRight />}
                    sx={{
                      border: "1px solid #E6E8EC",
                      height: "50px",
                      whiteSpace: "nowrap",
                      marginLeft: "0 !important",
                    }}
                    onClick={() => navigate("/master-course")}
                  >
                    Learn more
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Academy;
