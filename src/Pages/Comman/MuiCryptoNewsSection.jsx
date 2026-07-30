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
  Avatar,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { CardMedia } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import { Apis, RoutesName } from '../../_common/app.constants';
import { useFetchWrapper } from '../../_helpers';

// ---- Static ticker data (screenshot ke mutabik) ----
const cryptoTickerData = [
  { symbol: 'ADA', price: '$0.1634', change: '2.65%', direction: 'up' },
  { symbol: 'XRP', price: '$1.10', change: '3.03%', direction: 'up' },
  { symbol: 'ETH', price: '$1,874.76', change: '4.95%', direction: 'up' },
  { symbol: 'BTC', price: '$64,715.60', change: '3.17%', direction: 'up' },
  { symbol: 'XMR', price: '$331.22', change: '2.62%', direction: 'up' },
  { symbol: 'BNB', price: '$579.21', change: '1.57%', direction: 'up' },
  { symbol: 'XLM', price: '$0.1832', change: '2.14%', direction: 'up' },
  { symbol: 'SOL', price: '$77.96', change: '3.54%', direction: 'up' },
  { symbol: 'HYPE', price: '$66.88', change: '4.93%', direction: 'up' },
];

// ---- Static fallback profile data (jab tak backend se author info na aaye) ----
const STATIC_PROFILE_NAMES = [
  'Alice Brown',
  'Bob Smith',
  'Chris Johnson',
  'Diana Miller',
  'Ethan Davis',
  'Fiona Wilson',
];

const STATIC_PROFILE_AVATARS = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
];

// ---- Marquee scrolling animation ----
const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MarqueeOuter = styled(Box)({
  width: '100%',
  minHeight: '44px',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
  background: '#FFFFFF',
  borderTop: '1px solid #EDEDED',
  borderBottom: '1px solid #EDEDED',
  display: 'flex',
  alignItems: 'center',
});

const MarqueeTrack = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  whiteSpace: 'nowrap',
  width: 'max-content',
  animation: `${scrollLeft} 30s linear infinite`,
  willChange: 'transform',
  '&:hover': {
    animationPlayState: 'paused',
  },
});

const TickerItem = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: '6px',
  padding: '0 24px',
});

const contentTypeConfig = {
  'latest-news': {
    type: 'latest_news',
    heading: 'Latest News',
    label: 'Crypto',
  },
  information: {
    type: 'information',
    heading: 'Information',
    label: 'Information',
  },
  'research-report': {
    type: 'research_report',
    heading: 'Research Report',
    label: 'Research Report',
  },
  'press-release': {
    type: 'press_release',
    heading: 'Press Release',
    label: 'Press Release',
  },
  'guest-post': {
    type: 'guest_post',
    heading: 'Guest Post',
    label: 'Guest Post',
  },
  sponsored: {
    type: 'sponsored',
    heading: 'Sponsored',
    label: 'Sponsored',
  },
  'crypto-regulation': {
    type: 'crypto_regulation',
    heading: 'Crypto Regulation',
    label: 'Crypto Regulation',
  },
  'price-analysis': {
    type: 'price_analysis',
    heading: 'Price Analysis',
    label: 'Price Analysis',
  },
  'price-prediction': {
    type: 'price_prediction',
    heading: 'Price Prediction',
    label: 'Price Prediction',
  },
  'stock-price-prediction': {
    type: 'stock_price_prediction',
    heading: 'Stock Price Prediction',
    label: 'Stock Price Prediction',
  },
  'crypto-stock-price-prediction': {
    type: 'stock_price_prediction',
    heading: 'Stock Price Prediction',
    label: 'Stock Price Prediction',
  },
};

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

// ---- Crypto Price Marquee Component ----
const CryptoTickerMarquee = ({ data }) => {
  // Duplicate the list once for a seamless infinite loop
  const doubledData = [...data, ...data];

  return (
    <MarqueeOuter className="website-all-crypto-ticker-marquee">
      <MarqueeTrack>
        {doubledData.map((item, index) => (
          <TickerItem key={`${item.symbol}-${index}`}>
            <Typography
              component="span"
              sx={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}
            >
              {item.symbol}
            </Typography>
            <Typography
              component="span"
              sx={{ fontSize: '14px', color: '#111827' }}
            >
              {item.price}
            </Typography>
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                color: item.direction === 'down' ? '#DC2626' : '#16A34A',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {item.direction === 'down' ? '▼' : '▲'} {item.change}
            </Box>
          </TickerItem>
        ))}
      </MarqueeTrack>
    </MarqueeOuter>
  );
};

// ---- Reusable Profile (Avatar + Name) row ----
// Isko har card (featured / top 4 / bottom) me use kiya gaya hai.
// Avatar thumbnail/media ke bottom edge par "overlap" karta hai (jaisa reference
// screenshot me hai) - upar half image ke andar, neeche half white content area me.
// Abhi ke liye agar item me author_name / author_image nahi hai to static fallback data
// (STATIC_PROFILE_NAMES / STATIC_PROFILE_AVATARS) use hoga, taake future me jab
// backend se real author data aaye to ye automatically wahi dikhayega — extra
// code change ki zaroorat nahi padegi.
const ProfileBadge = ({ name, avatarUrl, size = 56, ringColor = '#3B82F6' }) => {
  return (
    <Box
      className="website-all-card-profile-badge"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        mt: `-${size / 2}px`,
        ml: 2,
        mb: 1.5,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Avatar
        src={avatarUrl}
        alt={name}
        sx={{
          width: size,
          height: size,
          border: '3px solid #FFFFFF',
          boxShadow: `0 0 0 3px ${ringColor}`,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#374151',
        }}
      >
        Profile Name: <strong>{name}</strong>
      </Typography>
    </Box>
  );
};

const MuiCryptoSection = () => {
  const [cryptoNewsData, setCryptoNewsData] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const history = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const currentSlug = location.pathname.split('/').filter(Boolean).pop() || '';
  const currentContentConfig =
    contentTypeConfig[currentSlug] || contentTypeConfig['latest-news'];

  const headingText = currentContentConfig.heading;
  const getBlogDetailRoute = (id) =>
    RoutesName.Blog_Detail.replace(':id', String(id));
  const getMediaUrl = (mediaPath) => {
    if (!mediaPath) {
      return '';
    }

    const trimmedMediaPath = mediaPath.trim();
    const isAbsoluteUrl =
      /^(?:https?:|data:|blob:)/i.test(trimmedMediaPath) ||
      trimmedMediaPath.startsWith('//');

    if (isAbsoluteUrl) {
      return trimmedMediaPath;
    }

    const imageBaseUrl = process.env.REACT_APP_IMAGE_URL || '';
    if (!imageBaseUrl) {
      return trimmedMediaPath;
    }

    const normalizedBaseUrl = imageBaseUrl.endsWith('/')
      ? imageBaseUrl.slice(0, -1)
      : imageBaseUrl;
    const normalizedMediaPath = trimmedMediaPath.startsWith('/')
      ? trimmedMediaPath
      : `/${trimmedMediaPath}`;

    return `${normalizedBaseUrl}${normalizedMediaPath}`;
  };

  // ---- Author / Profile info resolver ----
  // item.author_name / item.author_image (ya kisi bhi similar backend field) agar
  // available ho to wahi use hoga, warna index ke hisaab se static fallback profile.
  const getAuthorInfo = (item) => {
    const name = item?.profile_name?.trim() || "";
    const avatarUrl = item?.profile_image
      ? getMediaUrl(item.profile_image)
      : "";

    return {
      name,
      avatarUrl,
      hasProfile: !!(name && avatarUrl),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const data = await fetchWrapper.get(
          Apis.All_Content(currentContentConfig.type)
        );
        setCryptoNewsData(data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [currentContentConfig.type]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });

  const formattedDate = dayjs(cryptoNewsData?.data?.[0]?.created_at).format(
    'MMM DD, YYYY'
  );
  const displayText = cryptoNewsData?.data?.[0]?.created_at
    ? `${currentContentConfig.label} · ${formattedDate}`
    : currentContentConfig.label;

  // Featured item author info
  const featuredAuthor = getAuthorInfo(cryptoNewsData?.data?.[0], 0);

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

      {/* Crypto Price Marquee */}
      <Box sx={{ mt: { xs: '56px', sm: '64px' }, position: 'relative', zIndex: 1 }}>
        <CryptoTickerMarquee data={cryptoTickerData} />
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
                {cryptoNewsData?.data?.[0]?.media_type === 'youtube-link' ? (
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
                    src={`${process.env.REACT_APP_IMAGE_URL}${cryptoNewsData?.data?.[0]?.get_media_display}`}
                    controls
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                ) : (
                  <img
                    src={
                      cryptoNewsData?.data?.[0]?.get_media_display
                        ? `${process.env.REACT_APP_IMAGE_URL}/${cryptoNewsData?.data?.[0]?.get_media_display}`
                        : "https://via.placeholder.com/150"
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

              {/* Profile Avatar + Name - overlaps bottom edge of featured image */}
              {featuredAuthor.hasProfile && (
                <ProfileBadge
                  name={featuredAuthor.name}
                  avatarUrl={featuredAuthor.avatarUrl}
                  size={64}
                />
              )}

              <CardContent
                className="website-all-bottom-section-header"
                sx={{ cursor: 'pointer', pt: 0 }}
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
            {topFourItems.map((item, index) => {
              const author = getAuthorInfo(item, index + 1);
              return (
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
                  {item?.media_type === 'youtube-link' ? (
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
                        src={getMediaUrl(item.get_media_display)}
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
                        getMediaUrl(item.get_media_display) ||
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

                  {/* Profile Avatar + Name - overlaps bottom edge of thumbnail */}
                  {author.hasProfile && (
                    <ProfileBadge
                      name={author.name}
                      avatarUrl={author.avatarUrl}
                      size={48}
                    />
                  )}

                  <CardContent className="website-all-right-top-card-content" sx={{ pt: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.title || 'Untitled'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {currentContentConfig.label} ·{' '}
                      {dayjs(item.created_at).format('MMM DD, YYYY')}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
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
                    {remainingItems.map((item, index) => {
                      const author = getAuthorInfo(item, index + 5);
                      return (
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
                            {item.media_type === 'youtube-link' ? (
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
                                src={getMediaUrl(item.get_media_display)}
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
                                src={getMediaUrl(item.get_media_display)}
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

                            {/* Profile Avatar + Name - overlaps bottom edge of thumbnail */}
                            {author.hasProfile && (
                              <ProfileBadge
                                name={author.name}
                                avatarUrl={author.avatarUrl}
                                size={48}
                              />
                            )}

                            <CardContent className="website-all-bottom-card-content" sx={{ pt: 0 }}>
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
                                  {item.category || currentContentConfig.label}
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
                      );
                    })}
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