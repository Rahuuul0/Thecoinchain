import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme, RoutesName } from "../../_common/app.constants";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { faqActions } from "../../_actions";
import { useRecoilValue, useRecoilState } from "recoil";
import { faqAtom,  forecastSubAtom,  authAtom, blogListAtom, blogimgAtom} from "../../_state";
import CryptoTable from "./CryptoTable";
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';

const PredictionDashboard = () => {
  const navigate = useNavigate();
  const faqGetAction = faqActions();
  const faq = useRecoilValue(faqAtom);
  const subscribeUser = useRecoilValue(forecastSubAtom);
  const auth = useRecoilValue(authAtom);
  const [blogImg, setBlogimg] = useRecoilState(blogListAtom)
  const [blogNew, setBlognew] = useRecoilState(blogimgAtom)
  const [loadmore,setLoadmore] = useState(6);
  
  // Subscription action get function   API data call
  useEffect(() => {
    const response = faqGetAction.get();
    response.then((res) => {
      res;
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
  }, []);

  const imgLink = (data) => {
    let learnSeo = data.slug
    navigate(`${RoutesName.learn_Crypto_Details}/predictionDashboard/${learnSeo}`)
    setBlogimg(data);
    setBlognew(true);
} 

  const handleLoadmore = () => {
    setLoadmore(loadmore + 20);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          className="prediction-dashboard-wrapper"
          sx={{ mt: 8 }}
        >
          <Box className="market-prediction-dashboard-inner">
          
            <Container maxWidth="lg">
            {subscribeUser?.status === "expired" && auth !== null ?  
          <Stack sx={{ width: '38%', marginLeft: 'auto'}} spacing={2}>
          <Alert severity="info">You don't have any current plan please <Link to={'/subscription'}> <b>subscribe </b></Link> !</Alert>
          </Stack>
          : "" }
              <Typography component="h4" variant="h4">
                Cryptocurrency Prediction 
              </Typography>
              <CryptoTable />
            </Container>
            <Box className="market-prediction-faq">
              <Container maxWidth="lg">
                <Typography
                  component="h5"
                  variant="body1"
                  className="large-caption"
                >
                  FAQ
                </Typography>
              </Container>
              <Box className="market-prediction-faq-items-wrapper">
                <Container maxWidth="lg">
                  <Box className="market-prediction-faq-items">
                    {faq.map((item, index) => {
                      if(index < loadmore){
                      return (
                        <Box className="market-prediction-faq-item"
                            onClick={() => imgLink(item)}
                            sx={{ cursor: "pointer" }}
                        >
                          <Box className="market-prediction-faq-item-img">
                            <img
                              src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`}
                              alt="FAQ"
                            />
                          </Box>
                          <Box className="market-prediction-faq-item-content">
                            <Typography
                              component="small"
                              variant="body2"
                              className="small-caption"
                              sx={{ color: "#777E90" }}
                            >
                              {item.category}
                            </Typography>
                            <Typography
                              component="p"
                              variant="body1"
                              className="body-caption"
                              sx={{ fontWeight: "500",  maxHeight: '25px', overflow: 'hidden' }}
                            >
                              {item.title}
                            </Typography>
                          </Box>
                        </Box>
                      );
                      }
                    })}
                  </Box>
                  {faq.length >6 &&  faq.length > loadmore &&
                  <Button
                    onClick={handleLoadmore}
                    sx={{ mt: 2 }}
                    variant="outlined"
                    className="btn btn-outlined-secondary"
                  >
                    View All
                  </Button>
                  }
                </Container>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default PredictionDashboard;
