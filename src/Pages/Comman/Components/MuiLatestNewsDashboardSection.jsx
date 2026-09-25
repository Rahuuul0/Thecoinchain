import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import NewspaperIcon from "@mui/icons-material/Newspaper";
import YouTube from 'react-youtube';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { Apis, RoutesName } from '../../../_common/app.constants';
import { useFetchWrapper } from '../../../_helpers';
import { useRecoilValue, useRecoilState } from 'recoil';
import { switchDarkModeAtom, latestNewsAtom } from '../../../_state';
import { Helmet } from "react-helmet-async";
import { KeyboardArrowRight } from '@mui/icons-material';

dayjs.extend(relativeTime);
dayjs.extend(utc);

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

const getAuthorInfo = (item) => {
  const profileObj = item?.profile || item;
  const name =
    profileObj?.profile_name?.trim() ||
    item?.author?.trim() ||
    item?.author_name?.trim() ||
    "";
  const profileId = profileObj?.profile_id || item?.profile_id;
  return { name, profileId };
};

const formatUtcTime = (createdAt) => {
  return createdAt && dayjs(createdAt).isValid()
    ? dayjs().diff(dayjs(createdAt), 'hour') < 24
      ? dayjs(createdAt).fromNow()
      : dayjs(createdAt).utc().format('MMM DD, YYYY HH:mm [UTC]')
    : 'Just now';
};

const MuiLatestNewsDashboardSection = () => {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const [news, setNews] = useRecoilState(latestNewsAtom);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetchWrapper.get(Apis.All_Content('latest_news'));
        setNews(getNewsItems(response));
      } catch (error) {
        console.error('Unable to fetch latest news:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
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
      const slug = slugify(title);
      sessionStorage.setItem(`blog_id_${slug}`, String(id));
      localStorage.setItem(`blog_id_${slug}`, String(id));
      navigate(
        RoutesName.Blog_Detail
          .replace(":slug", slug),
        { state: { id } }
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Latest News | TheCoinChain</title>

        <meta
          name="description"
          content="Read the latest cryptocurrency news, Bitcoin updates, blockchain trends, and market insights on TheCoinChain."
        />

        <meta
          name="keywords"
          content="latest crypto news, bitcoin news, blockchain news, cryptocurrency updates"
        />

        <link rel="canonical" href={window.location.href} />

        <meta property="og:title" content="Latest News | TheCoinChain" />
        <meta
          property="og:description"
          content="Read the latest cryptocurrency news, Bitcoin updates, blockchain trends, and market insights."
        />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h5" sx={{ fontSize: 25, fontWeight: 600, color: isDarkMode ? "#fff" : "#000000" }}>
            Latest news
          </Typography>
          {news.length > 3 && (
            <Button
              onClick={() => navigate(RoutesName.Latest_News)}
              variant="outlined"
              className="btn btn-outlined-secondary"
              // endIcon={<KeyboardArrowRight sx={{ color: "#777E90" }} />}
              sx={{
                height: "50px",
                whiteSpace: "nowrap",
                minWidth: "auto",
              }}
            >
              View All
            </Button>
          )}
        </Box>

        {loading ? (
          <Typography sx={{ color: '#321B6D' }}>Loading latest news...</Typography>
        ) : news.length === 0 ? (
          <Typography sx={{ color: '#321B6D' }}>No latest news is available right now.</Typography>
        ) : (
          <Grid container spacing={3}>
            {news.slice(0, 6).map((item) => {
              const mediaUrl = getMediaUrl(item?.get_media_display);
              const mediaType = String(item?.media_type || '').toLowerCase();
              const isVideo = ['video', 'video-file', 'video_file'].includes(mediaType);
              const isYouTube = ['youtube', 'youtube-link', 'youtube_link'].includes(mediaType);
              const youtubeVideoId = getYouTubeVideoId(item?.get_media_display);
              const { name: authorName, profileId } = getAuthorInfo(item);
              const timeStr = formatUtcTime(item?.created_at);

              return (
                <Grid item xs={12} sm={6} md={4} key={item?.id}>
                  <Card
                    onClick={() => openDetail(item?.id, item?.title)}
                    sx={{
                      height: '100%',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      bgcolor: '#ffffff',
                      border: '1px solid #ececec',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 16px 30px rgba(0,0,0,0.14)',
                        borderColor: '#e0e0e0',
                      },
                      '&:hover .news-card-media': {
                        transform: 'scale(1.06)',
                      },
                    }}
                  >
                    <Box sx={{ height: { xs: 175, sm: 175, md: 190 }, overflow: 'hidden', bgcolor: '#f3f3f3' }}>
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
                            width: '100%', height: '100%',
                            '& > div, & iframe': { width: '100% !important', height: '100% !important', display: 'block' },
                          }}
                        >
                          <YouTube
                            videoId={youtubeVideoId}
                            opts={{ width: '100%', height: '100%', playerVars: { rel: 0 } }}
                            style={{ width: '100%', height: '100%' }}
                            iframeClassName="latest-news-youtube-player"
                          />
                        </Box>
                      ) : (
                        <Box
                          component="img"
                          className="news-card-media"
                          src={mediaUrl || 'https://via.placeholder.com/800x600?text=Latest+News'}
                          alt={item?.title || 'Latest news'}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = 'https://via.placeholder.com/800x600?text=Latest+News';
                          }}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.35s ease',
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                      {/* Author Profile Name & Date Time - ABOVE THE TITLE */}
                      {(authorName || timeStr) && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'nowrap',
                            gap: '4px',
                            mb: 1,
                            fontSize: { xs: '10.5px', sm: '11px' },
                            color: '#808080',
                            lineHeight: 1.2,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            width: '100%',
                          }}
                        >
                          {authorName && (
                            <>
                              <Typography
                                component="span"
                                title={authorName}
                                onClick={(e) => {
                                  if (profileId || authorName) {
                                    e.stopPropagation();
                                    const nameSlug = slugify(authorName) || String(profileId);
                                    if (profileId && nameSlug) {
                                      sessionStorage.setItem(`profile_id_${nameSlug}`, String(profileId));
                                      localStorage.setItem(`profile_id_${nameSlug}`, String(profileId));
                                    }
                                    navigate(RoutesName.Profile_Detail.replace(':name', nameSlug), {
                                      state: { id: profileId, name: authorName },
                                    });
                                  }
                                }}
                                sx={{
                                  fontSize: 'inherit',
                                  fontWeight: 600,
                                  color: '#444444',
                                  cursor: profileId ? 'pointer' : 'inherit',
                                  '&:hover': profileId ? { color: '#3772ff' } : {},
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  flexShrink: 1,
                                  minWidth: 0,
                                  display: 'inline-block',
                                }}
                              >
                                {authorName}
                              </Typography>
                              {timeStr && (
                                <Typography component="span" sx={{ fontSize: 'inherit', color: '#808080', opacity: 0.6, flexShrink: 0 }}>
                                  |
                                </Typography>
                              )}
                            </>
                          )}
                          {timeStr && (
                            <Typography
                              component="span"
                              sx={{
                                fontSize: 'inherit',
                                color: '#686868',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                              }}
                            >
                              {timeStr}
                            </Typography>
                          )}
                        </Box>
                      )}

                      <Typography
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') openDetail(item?.id, item?.title);
                        }}
                        sx={{
                          fontSize: { xs: 16, md: 19 },
                          fontWeight: 600,
                          color: '#000000',
                          lineHeight: 1.35,
                          cursor: 'pointer',
                          transition: 'color 0.2s ease',
                          '.MuiCard-root:hover &': { color: '#3772ff' },
                        }}
                      >
                        {item?.title}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default MuiLatestNewsDashboardSection;