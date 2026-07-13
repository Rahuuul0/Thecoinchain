import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { CardMedia } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import logo from '../../../public/logo192.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import { RoutesName } from '../../_common/app.constants';
import { latestNewsData } from './latestNewsData';

// Helper function to extract YouTube video ID from any URL format
const getYouTubeVideoId = (url) => {
  if (!url) return null;

  // If already an 11-character ID, return as-is
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  // Try to extract from query parameter 'v='
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  const videoIdFromParam = urlParams.get('v');
  if (videoIdFromParam) {
    return videoIdFromParam;
  }

  // Try to extract from URL path (works for all path-based formats)
  const pathMatch = url.match(
    /(?:\/|%3D|v=|youtu\.be\/|embed\/|shorts\/|v\/|watch\?v=)([a-zA-Z0-9_-]{11})/
  );
  if (pathMatch && pathMatch[1]) {
    return pathMatch[1];
  }

  // Last resort: find any 11-character alphanumeric string that looks like a video ID
  const fallbackMatch = url.match(/([a-zA-Z0-9_-]{11})/);
  if (fallbackMatch && fallbackMatch[1]) {
    return fallbackMatch[1];
  }

  return url; // Return as-is if no pattern matches
};

const MuiCryptoSection = () => {
  const [cryptoNewsData, setCryptoNewsData] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const history = useNavigate();

  const headingText = 'Latest News';
  const getBlogDetailRoute = (id) =>
    RoutesName.Blog_Detail.replace(':id', String(id));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);

        // --- Swap this block for a real API call when ready ---
        // const data = await LandingPageViewModel.getContent('crypto');
        // setCryptoNewsData(data || []);
        setCryptoNewsData(latestNewsData);
        // ---------------------------------------------------------

        setLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoader(false);
      }
    };

    fetchData();
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });

  const formattedDate = dayjs(cryptoNewsData?.data?.[0]?.created_at).format(
    'MMM DD, YYYY'
  );
  const displayText = `Crypto · ${formattedDate}`;

  // Top 4 items (index 1-4) for right section
  const topFourItems = cryptoNewsData?.data?.slice(1, 5) || [];

  // Remaining items (from index 5 onwards) for bottom card section
  const remainingItems = cryptoNewsData?.data?.slice(5) || [];

  // Custom Styled Tooltip with left side tail
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    '& .MuiTooltip-tooltip': {
      backgroundColor: '#2084EA',
      color: 'white',
      fontSize: '12px',
      fontWeight: '600',
      borderRadius: '8px',
      padding: '10px 16px',
      textAlign: 'center',
      minWidth: '100px',
      position: 'relative',
      marginLeft: '15px !important',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '-8px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '0',
        height: '0',
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderRight: '8px solid #2084EA',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        left: '-10px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '0',
        height: '0',
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent',
        borderRight: '10px solid #FFFFFF',
        zIndex: -1,
      },
    },
    '& .MuiTooltip-arrow': {
      display: 'none',
    },
  }));

  return (
    <Box className="website-all-crypto-section">
      <Backdrop
        className="website-all-backdrop-loader"
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Header Section */}
      <Box
        className="website-all-header-section"
        sx={{
          position: 'absolute',
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: { xs: 1, sm: 2 },
        }}
      >
        {/* <Box
          className="website-all-plan-module__header-top"
          sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}
        >
          <Box
            className="website-all-plan-module__logo-image"
            sx={{ width: '80%' }}
          >
            <img
              src={logo}
              alt="TaleTree Logo"
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        </Box> */}

        <CustomTooltip title="Back to Signup" placement="right">
          <IconButton
            className="website-all-plan-module__back-button"
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              border: '1px solid #d1d5db',
              borderRadius: '50%',
              color: '#6b7280',
              '&:hover': {
                bgcolor: '#f3f4f6',
                borderColor: '#9ca3af',
                color: '#374151',
              },
              transition: 'all 0.3s',
            }}
            onClick={() => window.history.back()}
          >
            <ArrowBack sx={{ fontSize: { xs: 14, sm: 16 } }} />
          </IconButton>
        </CustomTooltip>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Box
          className="website-all-main-content-section"
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 4 : 0,
          }}
        >
          {/* Left Section - Sticky - Featured Item */}
          <Box
            className="website-all-left-sticky-section"
            sx={{
              flex: 1,
              pr: isMobile ? 0 : 4,
              position: isMobile ? 'relative' : 'sticky',
              top: 0,
              alignSelf: 'flex-start',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: 'black', fontWeight: 'bold' }}
            >
              {headingText}
            </Typography>

            <Card
              className="website-all-crypto-featured-card"
              sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                color: 'white',
                borderRadius: '18px',
                overflow: 'hidden',
                mb: 3,
              }}
            >
              <CardMedia
                className="website-all-crypto-featured-media"
                component="div"
                sx={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'none',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  history(getBlogDetailRoute(cryptoNewsData?.data?.[0]?.id))
                }
              >
                {cryptoNewsData?.data?.[0]?.media_type === 'youtube' ? (
                  <Box
                    sx={{
                      width: '100%',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <YouTube
                      videoId={getYouTubeVideoId(
                        cryptoNewsData.data?.[0]?.get_media_display
                      )}
                      opts={{
                        width: '100%',
                        height: '400',
                        playerVars: {
                          autoplay: 0,
                        },
                      }}
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                  </Box>
                ) : cryptoNewsData?.data?.[0]?.media_type === 'video' ? (
                  <video
                    src={cryptoNewsData.data?.[0]?.get_media_display}
                    controls
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                ) : (
                  <img
                    src={
                      cryptoNewsData.data?.[0]?.get_media_display ||
                      'https://via.placeholder.com/150'
                    }
                    alt={cryptoNewsData.data?.[0]?.title || 'Crypto'}
                    style={{ width: '100%', borderRadius: '8px' }}
                    sx={{
                      objectFit: 'cover',
                      filter: 'blur(8px)',
                      transition: 'filter 0.3s ease-out',
                      '&.loaded': {
                        filter: 'blur(0px)',
                      },
                    }}
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                )}
              </CardMedia>
              <CardContent
                className="website-all-bottom-section-header"
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  history(getBlogDetailRoute(cryptoNewsData?.data?.[0]?.id))
                }
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: 'black', fontWeight: 'bold' }}
                >
                  {cryptoNewsData?.data?.[0]?.title || 'Latest Crypto Title'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#374151', mb: 1 }}
                >
                  {cryptoNewsData?.data?.[0]?.description || ''}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  {displayText}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Right Section - Top 4 Cards */}
          <Box
            className="website-all-right-top-cards-section"
            sx={{
              width: isMobile ? '100%' : '290px',
              maxHeight: { lg: '90vh', md: '37vh', sm: '37vh', xs: 'auto' },
              overflowY: 'auto',
              mt: isMobile ? 0 : '55px',
              pr: 1,
              "&::-webkit-scrollbar": {
                width: "7px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#E5E7EB",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#969696", 
                borderRadius: "10px",
                border: "2px solid #E5E7EB",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#969696"
              },
            }}
            >
            {topFourItems.map((item, index) => (
              <Card
                className="website-all-right-top-card"
                key={item.id || index}
                sx={{
                  border: '1px solid #e2e2e2',
                  mb: 2,
                  borderRadius: 3,
                  cursor: 'pointer',
                }}
                onClick={() => history(getBlogDetailRoute(item.id))}
              >
                {item?.media_type === 'youtube' ? (
                  <CardMedia component="div">
                    <Box
                      sx={{
                        width: '100%',
                        height: '150px',
                        overflow: 'hidden',
                      }}
                    >
                      <YouTube
                        videoId={getYouTubeVideoId(item.get_media_display)}
                        opts={{
                          width: '100%',
                          height: '150',
                          playerVars: {
                            autoplay: 0,
                          },
                        }}
                        style={{ width: '100%', height: '150px' }}
                      />
                    </Box>
                  </CardMedia>
                ) : item?.media_type === 'video' ? (
                  <CardMedia component="div">
                    <video
                      src={item.get_media_display}
                      controls
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                      }}
                    />
                  </CardMedia>
                ) : (
                  <CardMedia
                    component="img"
                    height="150"
                    image={
                      item.get_media_display ||
                      'https://via.placeholder.com/300x150'
                    }
                    alt={item.title || 'Crypto'}
                    sx={{
                      objectFit: 'cover',
                      filter: 'blur(8px)',
                      transition: 'filter 0.3s ease-out',
                      '&.loaded': {
                        filter: 'blur(0px)',
                      },
                    }}
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                )}
                <CardContent className="website-all-right-top-card-content">
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.title || 'Untitled'}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mt: 0.5,
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Crypto · {dayjs(item.created_at).format('MMM DD, YYYY')}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Bottom Section - Remaining Cards */}
        <Box className="website-all-bottom-cards-section">
          {remainingItems.length > 0 && (
            <ThemeProvider theme={theme}>
              <Box
                className="website-all-bottom-cards-container"
                sx={{ bgcolor: 'background.default', Height: '100%', pb: 2 }}
              >
                <Container maxWidth="lg">
                  <Grid container spacing={3}>
                    {remainingItems.map((item, index) => (
                      <Grid item xs={12} md={4} key={item.id || index}>
                        <Card
                          className="website-all-bottom-card"
                          sx={{
                            height: 370,
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: 3,
                            cursor: 'pointer',
                            transition:
                              'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-8px)',
                              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                            },
                          }}
                          onClick={() =>
                            history(getBlogDetailRoute(item.id))
                          }
                        >
                          {item.media_type === 'youtube' ? (
                            <Box
                              sx={{
                                width: '100%',
                                height: '200px',
                                overflow: 'hidden',
                              }}
                            >
                              <YouTube
                                videoId={getYouTubeVideoId(
                                  item.get_media_display
                                )}
                                opts={{
                                  width: '100%',
                                  height: '200',
                                  playerVars: {
                                    autoplay: 0,
                                  },
                                }}
                                style={{ width: '100%', height: '200px' }}
                              />
                            </Box>
                          ) : item.media_type === 'video' ? (
                            <video
                              src={item.get_media_display}
                              controls
                              style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                              }}
                            />
                          ) : (
                            <Box
                              component="img"
                              src={item.get_media_display}
                              alt={item.title}
                              sx={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                filter: 'blur(8px)',
                                transition: 'filter 0.3s ease-out',
                                '&.loaded': {
                                  filter: 'blur(0px)',
                                },
                              }}
                              onLoad={(e) => e.target.classList.add('loaded')}
                            />
                          )}

                          <CardContent className="website-all-bottom-card-content">
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'black',
                                fontWeight: 600,
                                fontSize: '1.25rem',
                                lineHeight: 1.3,
                                mb: 1,
                              }}
                            >
                              {item.title || 'Untitled'}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'rgba(0, 0, 0, 0.7)',
                                mb: 1.5,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {item.description}
                            </Typography>
                            <Box
                              className="website-all-bottom-card-meta"
                              sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                              }}
                            >
                              <Typography
                                sx={{
                                  color: 'rgba(0, 0, 0, 0.9)',
                                  fontSize: '0.875rem',
                                  fontWeight: 500,
                                }}
                              >
                                {item.category || 'Crypto'}
                              </Typography>
                              <Box
                                sx={{
                                  width: 4,
                                  height: 4,
                                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                                  borderRadius: '50%',
                                }}
                              />
                              <Typography
                                sx={{
                                  color: 'rgba(0, 0, 0, 0.7)',
                                  fontSize: '0.875rem',
                                }}
                              >
                                {dayjs(item.created_at).format('MMM DD, YYYY')}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </Box>
            </ThemeProvider>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default MuiCryptoSection;
