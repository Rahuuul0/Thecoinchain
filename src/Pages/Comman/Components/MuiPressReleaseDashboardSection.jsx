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
import { switchDarkModeAtom } from '../../../_state';
import { useRecoilValue } from 'recoil';
import { Helmet } from "react-helmet-async";

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
  if (!createdAt) return 'Just now';
  const localDateStr = typeof createdAt === 'string' ? createdAt.replace(/Z$/i, '') : createdAt;
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

const MuiPressReleaseDashboardSection = () => {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);


  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetchWrapper.get(Apis.All_Content('press_release'));
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

  const openDetail = (id, title, customSlug) => {
    if (id !== undefined && id !== null) {
      const slug = customSlug && String(customSlug).trim()
        ? slugify(String(customSlug), false)
        : slugify(title || "", true);
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
        <title>Press Releases | TheCoinChain</title>

        <meta
          name="description"
          content="Read the latest cryptocurrency press releases, blockchain announcements, exchange updates and official news on TheCoinChain."
        />

        <meta
          name="keywords"
          content="crypto press release, blockchain press release, bitcoin news, cryptocurrency announcements"
        />

        <link rel="canonical" href={window.location.href} />

        <meta property="og:title" content="Press Releases | TheCoinChain" />

        <meta
          property="og:description"
          content="Latest cryptocurrency press releases and official blockchain announcements."
        />

        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h5" sx={{ fontSize: 25, fontWeight: 600, color: isDarkMode ? "#fff" : "#000000" }}>
            Press Releases
          </Typography>
          {news.length > 8 && (
            <Button
              onClick={() => navigate(RoutesName.Press_Release)}
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
          <Typography sx={{ color: '#321B6D' }}>Loading press_release...</Typography>
        ) : news.length === 0 ? (
          <Typography sx={{ color: '#321B6D' }}>No press releases are available right now.</Typography>
        ) : (
          <Grid container spacing={2}>
            {news.slice(0, 8).map((item) => {
              const mediaUrl = getMediaUrl(item?.get_media_display);
              const mediaType = String(item?.media_type || '').toLowerCase();
              const isVideo = ['video', 'video-file', 'video_file'].includes(mediaType);
              const isYouTube = ['youtube', 'youtube-link', 'youtube_link'].includes(mediaType);
              const youtubeVideoId = getYouTubeVideoId(item?.get_media_display);
              const { name: authorName, profileId } = getAuthorInfo(item);
              const timeStr = formatUtcTime(item?.created_at);

              return (
                <Grid item xs={6} sm={4} md={3} key={item?.id}>
                  <Card
                    onClick={() => openDetail(item?.id, item?.title, item?.slug)}
                    sx={{
                      height: '100%',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      bgcolor: '#ffffff',
                      border: '1px solid #ececec',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.13)',
                        borderColor: '#e0e0e0',
                      },
                      '&:hover .news-card-media': {
                        transform: 'scale(1.06)',
                      },
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box sx={{ height: { xs: 90, sm: 130, md: 150 }, overflow: 'hidden', bgcolor: '#f3f3f3' }}>
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
                            iframeClassName="press-releases-youtube-player"
                          />
                        </Box>
                      ) : (
                        <Box
                          component="img"
                          className="news-card-media"
                          src={mediaUrl || 'https://via.placeholder.com/800x600?text=Press+Releases'}
                          alt={item?.title || 'Press releases'}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = 'https://via.placeholder.com/800x600?text=Press+Releases';
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
                    <Box sx={{
                      p: 1.5, minHeight: { xs: '107px', sm: '90px' },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                      {/* Author Profile Name & Date Time - ABOVE THE TITLE */}
                      {(authorName || timeStr) && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: { xs: 'wrap', sm: 'nowrap' },
                            gap: '4px',
                            mb: 0.8,
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
                                  if (profileId) {
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
                                <Typography component="span" sx={{ fontSize: 'inherit', color: '#808080', opacity: 0.6, flexShrink: 0, display: { xs: 'none', sm: 'block' } }}>
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

                      {/* Title */}
                      <Typography
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') openDetail(item?.id, item?.title, item?.slug);
                        }}
                        sx={{
                          fontSize: { xs: 13, md: 14.5 },
                          fontWeight: 600,
                          color: '#000000',
                          lineHeight: 1.3,
                          cursor: 'pointer',
                          transition: 'color 0.2s ease',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          '.MuiCard-root:hover &': { color: '#3772ff' }
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

export default MuiPressReleaseDashboardSection;