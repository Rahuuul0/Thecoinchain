import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import YouTube from 'react-youtube';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Apis, RoutesName } from '../../../_common/app.constants';
import { useFetchWrapper } from '../../../_helpers';
import { useRecoilValue } from 'recoil';
import { switchDarkModeAtom } from '../../../_state';
import { Helmet } from "react-helmet-async";

dayjs.extend(relativeTime);
dayjs.extend(utc);

// -----------------------------------------------------------------------
// Config: the 4 categories that come from the "type" key of the API
// response. `type` MUST match the value returned by the API (lowercase).
// `label` is what gets displayed in the section header.
// -----------------------------------------------------------------------
const CATEGORY_CONFIG = [
  { type: 'market', label: 'Markets' },
  { type: 'finance', label: 'Finance' },
  { type: 'policy', label: 'Policy' },
  { type: 'tech', label: 'Tech' },
];

const getMediaUrl = (mediaPath) => {
  if (!mediaPath) return '';

  const path = mediaPath.trim();
  if (/^(?:https?:|data:|blob:)/i.test(path) || path.startsWith('//')) {
    return path;
  }

  const baseUrl = process.env.REACT_APP_IMAGE_URL || '';
  if (!baseUrl) return path;

  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};

const getYouTubeVideoId = (url) => {
  if (!url) return '';
  if (/^[\w-]{11}$/.test(url)) return url;

  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );

  return match?.[1] || '';
};

const getNewsItems = (response) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.data)) return response.data.data;
  if (Array.isArray(response?.results)) return response.results;
  if (Array.isArray(response)) return response;
  return [];
};

const getItemType = (item) => String(item?.type || item?.category || '').toLowerCase().trim();

const getRelativeTime = (date) => {
  if (!date || !dayjs(date).isValid()) {
    return 'Just now';
  }

  const createdDate = dayjs(date);
  const hoursDiff = dayjs().diff(createdDate, 'hour');

  return hoursDiff < 24
    ? createdDate.fromNow()
    : createdDate.utc().format('MMM DD, YYYY HH:mm [UTC]');
};

const MuiCategoryNewsDashboardSection = () => {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        // The endpoint is type-specific, so loading only `finance` leaves the
        // other three panels empty. Load all four categories in parallel.
        const responses = await Promise.all(
          CATEGORY_CONFIG.map(async ({ type }) => {
            try {
              const response = await fetchWrapper.get(Apis.All_Content(type));

              // Some API responses do not include `type`; retain the category
              // used for the request so those stories still render correctly.
              return getNewsItems(response).map((item) => ({
                ...item,
                type: getItemType(item) || type,
              }));
            } catch (error) {
              console.error(`Unable to fetch ${type} news:`, error);
              return [];
            }
          })
        );

        setNews(responses.flat());
      } catch (error) {
        console.error('Unable to fetch category news:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, []);

  const slugify = (text = "") =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .split(/\s+/)
      .slice(0, 6)
      .join("-");

  const openDetail = (id, title) => {
    if (id !== undefined && id !== null) {
      navigate(
        RoutesName.Blog_Detail
          .replace(":id", String(id))
          .replace(":slug", slugify(title))
      );
    }
  };

  const openCategory = (categoryType) => {
    const categoryRoutes = {
      market: RoutesName.Market_News,
      finance: RoutesName.Finance,
      policy: RoutesName.policy,
      tech: RoutesName.tech,
    };

    navigate(categoryRoutes[categoryType] || RoutesName.Latest_News);
  };

  const textColor = isDarkMode ? '#fff' : '#000000';
  const mutedColor = isDarkMode ? '#b0b0b0' : '#808080';
  const cardBg = isDarkMode ? '#1c1c1c' : '#ffffff';
  const borderColor = isDarkMode ? '#333333' : '#e6e6e6';

  return (
    <>
      <Helmet>
        <title>Markets, Finance, Policy & Tech News | TheCoinChain</title>

        <meta
          name="description"
          content="Read the latest Market, Finance, Policy and Tech news on TheCoinChain."
        />

        <meta
          name="keywords"
          content="market news, finance news, policy news, tech news, crypto news"
        />

        <link rel="canonical" href={window.location.href} />

        <meta
          property="og:title"
          content="Markets, Finance, Policy & Tech News | TheCoinChain"
        />

        <meta
          property="og:description"
          content="Latest Market, Finance, Policy and Tech updates."
        />

        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 6 }}>
        {loading ? (
          <Typography sx={{ color: '#3772ff' }}>Loading latest news...</Typography>
        ) : news.length === 0 ? (
          <Typography sx={{ color: '#3772ff' }}>No latest news is available right now.</Typography>
        ) : (
          <Grid container spacing={0} sx={{ border: `1px solid ${borderColor}` }}>
            {CATEGORY_CONFIG.map((category, index) => {
              const categoryItems = news.filter((item) => getItemType(item) === category.type);
              const [featured, ...rest] = categoryItems;
              const secondaryItems = rest.slice(0, 3);
              const mediaType = String(featured?.media_type || '').toLowerCase();
              const isVideo = ['video', 'video-file', 'video_file'].includes(mediaType);
              const isYouTube = ['youtube', 'youtube-link', 'youtube_link'].includes(mediaType);
              const mediaUrl = getMediaUrl(featured?.get_media_display);
              const youtubeVideoId = getYouTubeVideoId(featured?.get_media_display);

              const isRightCol = index % 2 === 1;
              const isBottomRow = index >= CATEGORY_CONFIG.length - 2;

              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={category.type}
                  sx={{
                    bgcolor: cardBg,
                    p: { xs: 2.5, md: 3.5 },
                    borderRight: { md: isRightCol ? 'none' : `1px solid ${borderColor}` },
                    borderBottom: { xs: `1px solid ${borderColor}`, md: isBottomRow ? 'none' : `1px solid ${borderColor}` },
                  }}
                >
                  {/* Section header */}
                  <Box
                    onClick={() => openCategory(category.type)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mb: 2.5,
                      cursor: 'pointer',
                      width: 'fit-content',
                      '&:hover .cat-arrow': { transform: 'translateX(3px)' },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: textColor,
                      }}
                    >
                      {category.label}
                    </Typography>
                    <ArrowForwardIcon
                      className="cat-arrow"
                      sx={{ fontSize: 16, color: textColor, transition: 'transform 0.2s ease' }}
                    />
                  </Box>

                  {categoryItems.length === 0 ? (
                    <Typography sx={{ fontSize: 14, color: mutedColor }}>
                      No {category.label.toLowerCase()} news right now.
                    </Typography>
                  ) : (
                    <>
                      {/* Featured story: image + list of headlines side by side */}
                      <Grid container spacing={2.5}>
                        {featured && (
                          <Grid item xs={5} sm={5}>
                            <Box
                              onClick={() => openDetail(featured?.id, featured?.title)}
                              sx={{
                                width: '100%',
                                height: { xs: 120, sm: 150, md: 175 },
                                borderRadius: "16px",
                                overflow: 'hidden',
                                bgcolor: '#f0f0f0',
                                cursor: 'pointer',
                              }}
                            >
                              {isVideo ? (
                                <video
                                  src={mediaUrl}
                                  controls
                                  preload="metadata"
                                  onClick={(event) => event.stopPropagation()}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                              ) : isYouTube && youtubeVideoId ? (
                                <Box
                                  onClick={(event) => event.stopPropagation()}
                                  sx={{
                                    width: '100%',
                                    height: '100%',
                                    '& > div, & iframe': {
                                      width: '100% !important',
                                      height: '100% !important',
                                      display: 'block',
                                    },
                                  }}
                                >
                                  <YouTube
                                    videoId={youtubeVideoId}
                                    opts={{ width: '100%', height: '100%', playerVars: { rel: 0 } }}
                                    style={{ width: '100%', height: '100%' }}
                                  />
                                </Box>
                              ) : (
                                <Box
                                  component="img"
                                  src={mediaUrl || 'https://via.placeholder.com/400x300?text=News'}
                                  alt={featured?.title || 'News'}
                                  onError={(event) => {
                                    event.currentTarget.onerror = null;
                                    event.currentTarget.src = 'https://via.placeholder.com/400x300?text=News';
                                  }}
                                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                              )}
                            </Box>
                            {/* Featured story title + timestamp, below the image row */}
                            {featured && (
                              <Box sx={{ mt: 2 }}>
                                <Typography
                                  onClick={() => openDetail(featured?.id, featured?.title)}
                                  sx={{
                                    fontFamily: 'Georgia, "Times New Roman", serif',
                                    fontSize: { xs: 14, sm: 16 },
                                    fontWeight: 500,
                                    lineHeight: 1.3,
                                    color: textColor,
                                    cursor: 'pointer',
                                    '&:hover': { color: '#3772ff' },
                                  }}
                                >
                                  {featured?.title}
                                </Typography>
                                {featured?.created_at && (
                                  <Typography sx={{ mt: 1, fontSize: 13, color: mutedColor }}>
                                    {getRelativeTime(featured?.created_at)}
                                  </Typography>
                                )}
                              </Box>
                            )}
                          </Grid>
                        )}
                        {secondaryItems.length > 0 && (
                          <Grid item xs={7} sm={7}>
                            {secondaryItems.map((item, i) => (
                              <Box key={item?.id ?? i}>
                                <Typography
                                  onClick={() => openDetail(item?.id, item?.title)}
                                  sx={{
                                    fontFamily: 'Georgia, "Times New Roman", serif',
                                    fontSize: { xs: 14, sm: 16 },
                                    fontWeight: 600,
                                    lineHeight: 1.35,
                                    color: textColor,
                                    cursor: 'pointer',
                                    py: 1.2,
                                    '&:hover': { color: '#3772ff' },
                                  }}
                                >
                                  {item?.title}
                                  <Typography sx={{ mt: 1, fontSize: 13, color: mutedColor }}>
                                    {getRelativeTime(item?.created_at)}
                                  </Typography>
                                </Typography>
                                {i < secondaryItems.length - 1 && (
                                  <Divider sx={{ borderColor }} />
                                )}
                              </Box>
                            ))}
                          </Grid>
                        )}

                      </Grid>
                    </>
                  )}
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MuiCategoryNewsDashboardSection;
