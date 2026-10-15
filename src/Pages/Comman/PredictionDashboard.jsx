import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme, RoutesName } from "../../_common/app.constants";
import { Box, Container, Typography, Button, TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { faqActions } from "../../_actions";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { faqAtom, blogListAtom, blogimgAtom, switchDarkModeAtom } from "../../_state";
import CryptoTable from "./CryptoTable";
import { useNavigate } from "react-router-dom";

const PredictionDashboard = () => {
  const navigate = useNavigate();
  const isDarkMode = useRecoilValue(switchDarkModeAtom);
  const faqGetAction = faqActions();
  const faq = useRecoilValue(faqAtom);
  const [blogImg, setBlogimg] = useRecoilState(blogListAtom)
  const [blogNew, setBlognew] = useRecoilState(blogimgAtom)
  const [loadmore, setLoadmore] = useState(6);
  const [search, setSearch] = useState("");

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
    navigate(`${RoutesName.FaqDetail}/predictionDashboard/${learnSeo}`)
    setBlogimg(data);
    setBlognew(true);
  }

  const handleLoadmore = () => {
    setLoadmore(loadmore + 20);
  }

  const scrollToPagination = () => {
    const el = document.getElementById("prediction-pagination");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  mb: 2.5,
                }}
              >
                <Typography component="h4" variant="h4" sx={{ fontWeight: 700, m: 0 }}>
                  Cryptocurrency Market Cap
                </Typography>
                <TextField
                  size="small"
                  placeholder="Search all coins by name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ mr: 0.8 }}>
                        <SearchIcon sx={{ fontSize: 20, color: "#777E90" }} />
                      </InputAdornment>
                    ),
                    endAdornment: search ? (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setSearch("")}
                          edge="end"
                          aria-label="clear search"
                          sx={{ p: 0.5 }}
                        >
                          <CloseIcon sx={{ fontSize: 16, color: "#777E90" }} />
                        </IconButton>
                      </InputAdornment>
                    ) : null,
                  }}
                  sx={{
                    width: { xs: "100%", sm: "260px", md: "300px" },
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      borderRadius: "8px",
                      bgcolor: isDarkMode ? "#1e2230" : "#F4F5F6",
                      fontSize: "14px",
                      px: 1.5,
                      "& fieldset": {
                        borderColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.15)"
                          : "#E6E8EC",
                      },
                      "&:hover fieldset": {
                        borderColor: isDarkMode ? "rgba(255, 255, 255, 0.3)" : "#B1B5C3",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3772ff",
                        borderWidth: "1.5px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: isDarkMode ? "#ffffff" : "#141416",
                      fontSize: "14px",
                      p: 0,
                      "&::placeholder": {
                        color: "#777E90",
                        opacity: 1,
                        fontSize: "14px",
                      },
                    },
                  }}
                />
              </Box>
              <CryptoTable search={search} />
              <Tooltip title="Scroll to pagination" placement="left">
                <IconButton
                  onClick={scrollToPagination}
                  aria-label="scroll to table pagination"
                  sx={{
                    position: "fixed",
                    right: { xs: 16, sm: 24, md: 32 },
                    bottom: { xs: 80, sm: 90, md: 100 },
                    zIndex: 999,
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "2px solid #8e95a5",
                    bgcolor: isDarkMode ? "rgba(29, 31, 43, 0.92)" : "rgba(255, 255, 255, 0.92)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
                    color: isDarkMode ? "#a0a5b5" : "#6e7687",
                    transition: "all 0.25s ease-in-out",
                    "&:hover": {
                      borderColor: "#3772ff",
                      color: "#3772ff",
                      bgcolor: isDarkMode ? "rgba(55, 114, 255, 0.15)" : "#f0f5ff",
                      transform: "translateY(3px)",
                      boxShadow: "0 6px 18px rgba(55, 114, 255, 0.25)",
                    },
                  }}
                >
                  <ArrowDownwardIcon sx={{ fontSize: 22 }} />
                </IconButton>
              </Tooltip>
            </Container>
            <Box className="market-prediction-faq" sx={{ marginTop: '15px' }}>
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
                      let image = item.image ? `${process.env.REACT_APP_IMAGE_URL}/${item.image}` : item.image_link;
                      if (index < loadmore) {
                        return (
                          <Box className="market-prediction-faq-item"
                            onClick={() => imgLink(item)}
                            sx={{ cursor: "pointer" }}
                          >
                            <Box className="market-prediction-faq-item-img">
                              {image == null || image == '' ? "" : <img
                                src={image}
                                alt="FAQ"
                              />}
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
                                sx={{ fontWeight: "500", maxHeight: '25px', overflow: 'hidden' }}
                              >
                                {item.title}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      }
                    })}
                  </Box>
                  {faq.length > 6 && faq.length > loadmore &&
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
