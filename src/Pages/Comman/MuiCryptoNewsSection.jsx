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
  Zoom,
} from '@mui/material';
import { ArrowBack, ArrowUpward } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { CardMedia } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { Apis, RoutesName } from '../../_common/app.constants';
import { useFetchWrapper } from '../../_helpers';
import { coinsAtom, switchDarkModeAtom } from '../../_state';
import { useRecoilValue } from 'recoil';
import { useCoinActions } from '../../_actions/coin.actions';
import { allContentActions } from '../../_actions/allcontent.actions';

dayjs.extend(relativeTime);
dayjs.extend(utc);

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
  animation: `${scrollLeft} 80s linear infinite`,
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
    label: 'Latest News',
  },
  'press-release': {
    type: 'press_release',
    heading: 'Press Release',
    label: 'Press Release',
  },
  'crypto-regulation': {
    type: 'crypto_regulation',
    heading: 'Crypto Regulation',
    label: 'Crypto Regulation',
  },
  'price-prediction': {
    type: 'price_prediction',
    heading: 'Price Analysis',
    label: 'Price Analysis',
  },
  'crypto-stock-price-prediction': {
    type: 'stock_price_prediction',
    heading: 'Stock Price Analysis',
    label: 'Stock Price Analysis',
  },
  'market-news': {
    type: 'market',
    heading: 'Market',
    label: 'Market',
  },
  finance: {
    type: 'finance',
    heading: 'Finance',
    label: 'Finance',
  },
  'trending-news': {
    type: 'trending_news',
    heading: 'Trending News',
    label: 'Trending News',
  },
  'bitcoin': {
    type: 'bitcoin',
    heading: 'Bitcoin',
    label: 'Bitcoin',
  },
  'ethereum': {
    type: 'ethereum',
    heading: 'Ethereum',
    label: 'Ethereum',
  },
  'altcoin': {
    type: 'altcoin',
    heading: 'Altcoin',
    label: 'Altcoin',
  },
  'global-news': {
    type: 'global_news',
    heading: 'Global News',
    label: 'Global News',
  },
  'memecoin-analysis': {
    type: 'memecoin_analysis',
    heading: 'Memecoin Analysis',
    label: 'Memecoin Analysis',
  },
  'ethereum-analysis': {
    type: 'ethereum_analysis',
    heading: 'Ethereum Analysis',
    label: 'Ethereum Analysis',
  },
  'bitcoin-analysis': {
    type: 'bitcoin_analysis',
    heading: 'Bitcoin Analysis',
    label: 'Bitcoin Analysis',
  },
  'explain': {
    type: 'explain',
    heading: 'Explain',
    label: 'Explain',
  }
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
const CryptoTickerMarquee = ({ data, isDark }) => {
  // Duplicate the list to ensure seamless infinite loop
  const doubledData = [...data, ...data, ...data, ...data];

  return (
    <MarqueeOuter
      sx={{
        background: isDark ? '#141416' : '#FFFFFF',
        borderTop: isDark ? '1px solid #23262F' : '1px solid #EDEDED',
        borderBottom: isDark ? '1px solid #23262F' : '1px solid #EDEDED',
      }}
      className="website-all-crypto-ticker-marquee"
    >
      <MarqueeTrack>
        {doubledData.map((item, index) => (
          <TickerItem key={`${item.symbol}-${index}`}>
            {item.image && (
              <Box
                component="img"
                src={item.image}
                alt={item.symbol}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  objectFit: 'contain',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <Typography
              component="span"
              sx={{ fontWeight: 700, fontSize: '14px', color: isDark ? '#FFFFFF' : '#111827' }}
            >
              {item.symbol}
            </Typography>
            <Typography
              component="span"
              sx={{ fontSize: '14px', fontWeight: 500, color: isDark ? '#E6E8EC' : '#111827' }}
            >
              {item.price}
            </Typography>
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                color: item.direction === 'down' ? (isDark ? '#F87171' : '#DC2626') : (isDark ? '#4ADE80' : '#16A34A'),
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

const ProfileBadge = ({ name, avatarUrl, size = 56, ringColor = '#5602a5', profileId, onProfileClick }) => {
  return (
    <Box
      className="website-all-card-profile-badge"
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1.5,
        mt: `-${size / 2}px`,
        ml: 2,
        mb: 1.5,
        position: 'relative',
        zIndex: 2,
        cursor: profileId ? 'pointer' : 'default',
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (profileId && onProfileClick) {
          onProfileClick(profileId, name);
        }
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
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: profileId ? 'scale(1.05)' : 'scale(1)',
          },
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#7d7e80',
          cursor: profileId ? 'pointer' : 'default',
          '&:hover': {
            color: profileId ? '#2084EA' : '#7d7e80',
          },
          transition: 'color 0.2s ease',
        }}
      >
        <strong>{name}</strong>
      </Typography>
    </Box>
  );
};

const MuiCryptoSection = () => {
  const [cryptoNewsData, setCryptoNewsData] = useState([]);
  const { latestListing } = useCoinActions();
  const { getProfileDetail } = allContentActions();
  const coinsList = useRecoilValue(coinsAtom);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loader, setLoader] = useState(false);
  const [profileLoader, setProfileLoader] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const isDarkMode = useRecoilValue(switchDarkModeAtom);
  const history = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const currentSlug = location.pathname.split('/').filter(Boolean).pop() || '';
  const requestedType = new URLSearchParams(location.search)
    .get('type')
    ?.toLowerCase()
    .trim();
  // Keep existing `/latest-news?type=finance` links working, while direct
  // category routes such as `/finance` always use their own configured type.
  const contentKey =
    currentSlug === 'latest-news' && requestedType
      ? requestedType
      : currentSlug;
  const currentContentConfig =
    contentTypeConfig[contentKey] || contentTypeConfig['latest-news'];

  const isTrendingNews = contentKey === "trending-news";

  const getItemTypeLabel = (item) => {
    if (!isTrendingNews) {
      return item?.category || currentContentConfig.label;
    }

    const itemType = item?.type?.toLowerCase()?.trim();

    const matchedConfig = Object.values(contentTypeConfig).find(
      (config) => config.type === itemType
    );

    return (
      matchedConfig?.label ||
      item?.category ||
      currentContentConfig.label
    );
  };

  const headingText = currentContentConfig.heading;
  const slugify = (text = "", isTitle = false) => {
    if (!text) return "";
    const clean = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "");
    if (isTitle) {
      return clean.split(/\s+/).slice(0, 6).join("-");
    }
    return clean.replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
  };

  const getBlogDetailRoute = (id, title, customSlug) => {
    const slug = customSlug && String(customSlug).trim()
      ? slugify(String(customSlug), false)
      : slugify(title || "", true);
    if (id !== undefined && id !== null) {
      sessionStorage.setItem(`blog_id_${slug}`, String(id));
      localStorage.setItem(`blog_id_${slug}`, String(id));
    }
    return RoutesName.Blog_Detail.replace(":slug", slug);
  };
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
  // Extract profile data from nested profile object
  const getAuthorInfo = (item, fallbackIndex = 0) => {
    // Extract from nested profile object
    const profileObj = item?.profile || item;
    const name = profileObj?.profile_name?.trim() || "";
    const profileImage = profileObj?.profile_image;

    // Handle profile image - skip invalid paths like "/HEADER"
    let avatarUrl = "";
    if (profileImage && profileImage.trim() && !profileImage.includes("/HEADER")) {
      avatarUrl = getMediaUrl(profileImage);
    }

    // Use fallback static avatar if no profile image
    if (!avatarUrl && name) {
      avatarUrl = STATIC_PROFILE_AVATARS[fallbackIndex % STATIC_PROFILE_AVATARS.length];
    }

    return {
      name: name || STATIC_PROFILE_NAMES[fallbackIndex % STATIC_PROFILE_NAMES.length],
      avatarUrl: avatarUrl || STATIC_PROFILE_AVATARS[fallbackIndex % STATIC_PROFILE_AVATARS.length],
      hasProfile: !!(name || avatarUrl),
      profileDescription: profileObj?.profile_description,
      profileEmail: profileObj?.profile_email,
      profileId: profileObj?.profile_id,
    };
  };

  const cryptoTickerData = [...coinsList]
    .filter((coin) => coin?.id)
    .sort((a, b) => (Number(a.cmc_rank) || 999) - (Number(b.cmc_rank) || 999))
    .slice(0, 10)
    .map((coin) => {
      const change = coin.percent_change_24h ?? 0;

      return {
        id: coin.id,
        image: coin.image,
        symbol: coin.symbol?.toUpperCase(),
        price: `$${Number(coin.price || 0).toLocaleString('en-US', {
          maximumFractionDigits: 6,
        })}`,
        change: `${Math.abs(change).toFixed(2)}%`,
        direction: change >= 0 ? 'up' : 'down',
      };
    });

  useEffect(() => {
    latestListing();
  }, []);

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
  }, [currentContentConfig.type]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleProfileClick = async (profileId, profileName) => {
    if (!profileId && !profileName) return;
    try {
      let resolvedName = profileName;
      if (!resolvedName && profileId) {
        setProfileLoader(true);
        const response = await getProfileDetail(profileId);
        const profileData = response?.data || response;
        if (profileData) {
          resolvedName = profileData.profile_name || profileData.name || '';
          sessionStorage.setItem('profileDetail', JSON.stringify(profileData));
        }
      }
      const nameSlug = slugify(resolvedName || '') || String(profileId);
      if (profileId && nameSlug) {
        sessionStorage.setItem(`profile_id_${nameSlug}`, String(profileId));
        localStorage.setItem(`profile_id_${nameSlug}`, String(profileId));
        if (resolvedName) {
          sessionStorage.setItem(`profile_id_${resolvedName}`, String(profileId));
        }
      }
      history(RoutesName.Profile_Detail.replace(':name', nameSlug), {
        state: { id: profileId, name: resolvedName },
      });
    } catch (error) {
      console.error('Error fetching profile detail:', error);
    } finally {
      setProfileLoader(false);
    }
  };

  const formatNewsDate = (date) => {
    if (!date) return 'Just now';
    const localDateStr = typeof date === 'string' ? date.replace(/Z$/i, '') : date;
    const parsed = dayjs(localDateStr);
    if (!parsed.isValid()) return 'Just now';

    const diffMs = dayjs().diff(parsed);
    if (diffMs < 60000) return 'Just now';

    const diffHours = dayjs().diff(parsed, 'hour');
    if (diffHours >= 0 && diffHours < 24) {
      const fromNow = parsed.fromNow();
      return fromNow.startsWith('in ') ? 'Just now' : fromNow;
    }
    return parsed.format('MMM DD, YYYY HH:mm');
  };

  const createdAt = cryptoNewsData?.data?.[0]?.created_at;
  const formattedDate = formatNewsDate(createdAt);

  const getRelativeTime = (date) => {
    return formatNewsDate(date);
  };

  const featuredItem = cryptoNewsData?.data?.[0];

  const displayText = featuredItem?.created_at
    ? `${getItemTypeLabel(featuredItem)} · ${formattedDate}`
    : getItemTypeLabel(featuredItem);

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
      <Box
        sx={{
          position: 'fixed',
          top: { xs: 105, sm: 124 },
          left: { xs: 16, sm: 24 },
          zIndex: 10,
        }}
      >
        <CustomTooltip title="Back" placement="right">
          <IconButton
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              border: '1px solid #d1d5db',
              borderRadius: '50%',
              color: '#6b7280',
              backgroundColor: '#fff',
              '&:hover': {
                bgcolor: '#f3f4f6',
                borderColor: '#9ca3af',
                color: '#374151',
              },
            }}
            onClick={() => window.history.back()}
          >
            <ArrowBack sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </IconButton>
        </CustomTooltip>
      </Box>
      <Backdrop
        className="website-all-backdrop-loader"
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader || profileLoader}
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
        <CryptoTickerMarquee data={cryptoTickerData} isDark={isDarkMode} />
      </Box>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
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
              sx={{ color: isDarkMode ? '#fff' : '#000000', fontWeight: 'bold' }}
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
                  history(
                    getBlogDetailRoute(
                      cryptoNewsData?.data?.[0]?.id,
                      cryptoNewsData?.data?.[0]?.title,
                      cryptoNewsData?.data?.[0]?.slug
                    ),
                    { state: { id: cryptoNewsData?.data?.[0]?.id } }
                  )
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
                    src={`${process.env.REACT_APP_IMAGE_URL}/${cryptoNewsData?.data?.[0]?.get_media_display}`}
                    controls
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                ) : (
                  <img
                    src={
                      cryptoNewsData?.data?.[0]?.get_media_display
                        ? `${process.env.REACT_APP_IMAGE_URL}/${cryptoNewsData?.data?.[0]?.get_media_display}`
                        : ""
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
                  profileId={featuredAuthor.profileId}
                  onProfileClick={handleProfileClick}
                />
              )}

              <CardContent
                className="website-all-bottom-section-header"
                sx={{ cursor: 'pointer', pl: 0, }}
                onClick={() =>
                  history(
                    getBlogDetailRoute(
                      cryptoNewsData?.data?.[0]?.id,
                      cryptoNewsData?.data?.[0]?.title,
                      cryptoNewsData?.data?.[0]?.slug
                    ),
                    { state: { id: cryptoNewsData?.data?.[0]?.id } }
                  )
                }
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: 'black', fontWeight: 'bold', color: isDarkMode ? "#fff" : "#000000" }}
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
              maxHeight: { lg: '80vh', md: '37vh', sm: '37vh', xs: 'auto' },
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
                    borderRadius: "16px",
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    history(getBlogDetailRoute(item.id, item.title, item.slug), {
                      state: { id: item.id },
                    })
                  }
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
                      profileId={author.profileId}
                      onProfileClick={handleProfileClick}
                    />
                  )}

                  <CardContent className="website-all-right-top-card-content" sx={{ pt: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {item.title || 'Untitled'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {getItemTypeLabel(item)} ·{" "}
                      {getRelativeTime(item.created_at)}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Bottom Section - Remaining Cards */}
        <Box
          id="news-bottom-cards-section"
          className="website-all-bottom-cards-section"
          sx={{ mt: { xs: 3, mt: 6 } }}
        >
          {remainingItems.length > 0 && (
            <ThemeProvider theme={theme}>
              <Box
                className="website-all-bottom-cards-container"
                sx={{ bgcolor: isDarkMode ? "#141416" : "#ffffff", Height: '100%', pb: 2 }}
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
                              borderRadius: "16px",
                              background: isDarkMode ? "linear-gradient( 180deg, #ffffff00 49%, #ffffff 0%)" : "linear-gradient( 180deg, #ffffff00 49%, #ffffff 0%)",
                              cursor: 'pointer',
                              transition:
                                'transform 0.3s ease, box-shadow 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                              },
                            }}
                            onClick={() =>
                              history(getBlogDetailRoute(item.id, item.title, item.slug), {
                                state: { id: item.id },
                              })
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
                                  borderRadius: '12px',
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
                                  borderRadius: '12px',
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
                                profileId={author.profileId}
                                onProfileClick={handleProfileClick}
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
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
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
                                  {getItemTypeLabel(item)}
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
                                  {getRelativeTime(item.created_at)}
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

      {/* Scroll to Top Arrow */}
      <Zoom in={showScrollTop}>
        <Box
          role="presentation"
          sx={{
            position: 'fixed',
            bottom: { xs: 24, sm: 32, md: 40 },
            right: { xs: 16, sm: 24, md: 32 },
            zIndex: 1200,
          }}
        >
          <Tooltip title="Scroll to top" placement="left" arrow>
            <IconButton
              onClick={handleScrollToTop}
              aria-label="Scroll to top"
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '2px solid #8e95a5',
                bgcolor: isDarkMode ? 'rgba(29, 31, 43, 0.92)' : 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                color: isDarkMode ? '#a0a5b5' : '#6e7687',
                transition: 'all 0.25s ease-in-out',
                '&:hover': {
                  borderColor: '#3772ff',
                  color: '#3772ff',
                  bgcolor: isDarkMode ? 'rgba(55, 114, 255, 0.15)' : '#f0f5ff',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 18px rgba(55, 114, 255, 0.25)',
                },
              }}
            >
              <ArrowUpward sx={{ fontSize: 22 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Zoom>
    </Box>
  );
};

export default MuiCryptoSection;
