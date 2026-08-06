import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import YouTube from 'react-youtube';
import dayjs from 'dayjs';
import { Apis, RoutesName } from '../../../_common/app.constants';
import { useFetchWrapper } from '../../../_helpers';
import { switchDarkModeAtom } from '../../../_state';
import { useRecoilValue } from 'recoil';
import { Helmet } from "react-helmet-async";

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

const MuiResearchReportsDashboardSection = () => {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);

  useEffect(() => {
    const fetchResearchReports = async () => {
      try {
        const response = await fetchWrapper.get(Apis.All_Content('research_report'));
        setNews(getNewsItems(response));
      } catch (error) {
        console.error('Unable to fetch research reports:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchReports();
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

  return (
    <>
      <Helmet>
        <title>Research Reports | CoinGuru</title>

        <meta
          name="description"
          content="Read the latest cryptocurrency research reports, blockchain analysis and market insights on CoinGuru."
        />

        <meta
          name="keywords"
          content="research report, crypto research, blockchain research, bitcoin analysis"
        />

        <link rel="canonical" href={window.location.href} />

        <meta
          property="og:title"
          content="Research Reports | CoinGuru"
        />

        <meta
          property="og:description"
          content="Latest cryptocurrency research reports and blockchain market analysis."
        />

        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h5" sx={{ fontSize: 25, fontWeight: 600, color: isDarkMode ? '#fff' : '#000000' }}>
            Research Report
          </Typography>
          {news.length > 8 && (
            <Button
              onClick={() => navigate(RoutesName.Research_Report)}
              sx={{ color: isDarkMode ? '#fff' : '#000000', fontSize: 16, fontWeight: 500, textTransform: 'none', p: 0, minWidth: 'auto' }}
            >
              View all
            </Button>
          )}
        </Box>

        {loading ? (
          <Typography sx={{ color: '#321B6D' }}>Loading research reports...</Typography>
        ) : news.length === 0 ? (
          <Typography sx={{ color: '#321B6D' }}>No research reports are available right now.</Typography>
        ) : (
          <Grid container spacing={2}>
            {news.slice(0, 8).map((item) => {
              const mediaUrl = getMediaUrl(item?.get_media_display);
              const mediaType = String(item?.media_type || '').toLowerCase();
              const isVideo = ['video', 'video-file', 'video_file'].includes(mediaType);
              const isYouTube = ['youtube', 'youtube-link', 'youtube_link'].includes(mediaType);
              const youtubeVideoId = getYouTubeVideoId(item?.get_media_display);

              return (
                <Grid item xs={6} sm={4} md={3} key={item?.id}>
                  <Card
                    onClick={() => openDetail(item?.id, item?.title)}
                    sx={{
                      height: '100%',
                      borderRadius: 2,
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
                    }}
                  >
                    <Box sx={{ height: { xs: 110, sm: 130, md: 150 }, overflow: 'hidden', bgcolor: '#f3f3f3' }}>
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
                            iframeClassName="research-reports-youtube-player"
                          />
                        </Box>
                      ) : (
                        <Box
                          component="img"
                          className="news-card-media"
                          src={mediaUrl || 'https://via.placeholder.com/800x600?text=Research+Report'}
                          alt={item?.title || 'Research report'}
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = 'https://via.placeholder.com/800x600?text=Research+Report';
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
                    <Box sx={{ p: 1.5 }}>
                      <Typography
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') openDetail(item?.id, item?.title);
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
                          '.MuiCard-root:hover &': { color: '#321B6D' },
                        }}
                      >
                        {item?.title}
                      </Typography>
                      {item?.created_at && (
                        <Typography sx={{ mt: 1, fontSize: 11.5, color: '#808080', fontWeight: 600 }}>
                          {dayjs(item.created_at).format('MMM DD, YYYY')}
                        </Typography>
                      )}
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

export default MuiResearchReportsDashboardSection;
