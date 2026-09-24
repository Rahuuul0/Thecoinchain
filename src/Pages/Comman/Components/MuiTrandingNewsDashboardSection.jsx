import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Apis, RoutesName } from '../../../_common/app.constants';
import { useFetchWrapper } from '../../../_helpers';
import Bitcoinimg from '../../../../public/assets/coin_img/TheCoinChainImage.png';
import { Helmet } from "react-helmet-async";
import { useRecoilValue } from 'recoil';
import { switchDarkModeAtom } from '../../../_state';

dayjs.extend(relativeTime);

const getNewsItems = (response) => {
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.data?.data)) return response.data.data;
  if (Array.isArray(response?.results)) return response.results;
  if (Array.isArray(response)) return response;
  return [];
};

const getMediaUrl = (mediaPath) => {
  if (!mediaPath) return '';

  const path = mediaPath.trim();
  if (/^(?:https?:|data:|blob:)/i.test(path) || path.startsWith('//')) {
    return path;
  }

  const baseUrl = process.env.REACT_APP_IMAGE_URL || '';
  return baseUrl ? `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}` : path;
};

const MuiTrandingNewsDashboardSection = () => {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const isDarkMode = useRecoilValue(switchDarkModeAtom);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const response = await fetchWrapper.get(Apis.All_Content('trending_news'));
        setNews(getNewsItems(response));
      } catch (error) {
        console.error('Unable to fetch trending news:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingNews();
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

  // Duplicate the list once so the vertical ticker loops without a visible jump.
  const visibleStories = news.slice(0, 5);
  const scrollingStories =
    visibleStories.length > 1 ? [...visibleStories, ...visibleStories] : visibleStories;
  const firstStoryMediaType = String(visibleStories[0]?.media_type || '').toLowerCase();
  const backgroundImage = Bitcoinimg;

  return (
    <>
      <Helmet>
        <title>Trending News | TheCoinChain</title>

        <meta
          name="description"
          content="Stay updated with the latest trending cryptocurrency news, Bitcoin updates, blockchain developments and market insights on TheCoinChain."
        />

        <meta
          name="keywords"
          content="trending crypto news, bitcoin news, blockchain news, latest crypto updates"
        />

        <link rel="canonical" href={window.location.href} />

        <meta
          property="og:title"
          content="Trending News | TheCoinChain"
        />

        <meta
          property="og:description"
          content="Latest trending cryptocurrency news and blockchain market updates."
        />

        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <Box
        sx={{
          width: '100%',
          maxWidth: 550,
          ml: 'auto',
          position: 'relative',
          overflow: 'hidden',
          isolation: 'isolate',
          bgcolor: isDarkMode ? '#182235' : 'rgba(255, 255, 255, 0.88)',
          // backgroundImage: backgroundImage
          //   ? (isDarkMode
          //     ? `linear-gradient(125deg, rgba(7, 13, 27, .78), rgba(25, 39, 67, .5)), url(${backgroundImage})`
          //     : `linear-gradient(125deg, rgba(255, 255, 255, .94), rgba(246, 248, 252, .8)), url(${backgroundImage})`)
          //   : (isDarkMode ? 'linear-gradient(125deg, #111b2d, #263d65)' : '#ffffff'),
          backgroundImage: backgroundImage
            ? (isDarkMode
              ? `linear-gradient(125deg, rgba(10 10 10), rgba(48 47 47 / 54%)), url(${backgroundImage})`
              : `linear-gradient(125deg, rgba(255, 255, 255, .94), rgba(246, 248, 252, .8)), url(${backgroundImage})`)
            : (isDarkMode ? 'linear-gradient(125deg, #13171fff, #263d65)' : '#ffffff'),
          backgroundPosition: {xs: 'left', sm: 'center'},
          backgroundSize: {xs: 'cover', sm: 'cover'},
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRadius: { xs: '24px', sm: '28px' },
          px: { xs: 3, sm: 3 },
          py: { xs: 2.5, sm: 3 },
          // border: isDarkMode ? '1px solid rgba(255, 255, 255, .28)' : '1px solid rgba(225, 229, 235, 0.9)',
          border: isDarkMode ? '1px solid rgb(136 135 135 / 61%)' : '1px solid rgba(225, 229, 235, 0.9)',
          boxShadow: isDarkMode
            ? '0 16px 38px rgba(0, 0, 0, .36), inset 0 1px 0 rgba(255, 255, 255, .24)'
            : '0 16px 38px rgba(0, 0, 0, .07), inset 0 1px 0 rgba(255, 255, 255, .9)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            pb: 1.25,
          }}
        >
          <Typography
            component="h5"
            sx={{
              color: isDarkMode ? '#fff' : '#141416',
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: '-.5px',
              lineHeight: 1.1,
            }}
          >
            Trending news
          </Typography>
          <Box
            component="span"
            sx={{
              borderRadius: '999px',
              bgcolor: 'rgba(169, 237, 240, .92)',
              color: '#08777d',
              fontSize: 10,
              fontWeight: 800,
              lineHeight: 1,
              px: 0.8,
              py: 0.35,
            }}
          >
            LIVE
          </Box>
        </Box>

        <Box
          sx={{
            py: 1,
            height: 385,
            overflow: 'hidden',
            '&:hover .scroll-track-1, &:focus-within .scroll-track-1': {
              animationPlayState: 'paused',
            },
          }}
        >
          {loading ? (
            <Typography sx={{ py: 3, color: isDarkMode ? 'rgba(255,255,255,.72)' : '#777E90', fontSize: 14, textAlign: 'center' }}>
              Loading trending news…
            </Typography>
          ) : visibleStories.length === 0 ? (
            <Typography sx={{ py: 3, color: isDarkMode ? 'rgba(255,255,255,.72)' : '#777E90', fontSize: 14, textAlign: 'center' }}>
              No trending stories available right now.
            </Typography>
          ) : (
            <Box
              className="scroll-track-1"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                animation:
                  visibleStories.length > 1
                    ? 'trending-news-scroll-down 20s linear infinite'
                    : 'none',
                '@keyframes trending-news-scroll-down': {
                  from: { transform: 'translateY(0)' },
                  to: { transform: 'translateY(-50%)' },
                },
                '@media (prefers-reduced-motion: reduce)': {
                  animation: 'none',
                },
              }}
            >
              {scrollingStories.map((item, index) => {
                const publishedAt = item?.created_at || item?.published_at || item?.date;
                const timeLabel =
                  publishedAt && dayjs(publishedAt).isValid()
                    ? dayjs(publishedAt).fromNow()
                    : 'Just now';

                return (
                  <Box
                    key={`${item?.id ?? index}-${index}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => openDetail(item?.id, item?.title)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        openDetail(item?.id, item?.title);
                      }
                    }}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 1fr)',
                      gap: { xs: '53px', sm: '32px' },
                      alignItems: 'center',
                      py: { xs: 1.1, sm: 1.25 },
                      minHeight: 58,
                      px: { xs: 1.1, sm: 1.25 },
                      borderBottom: isDarkMode
                        ? '1px solid rgba(255,255,255,.22)'
                        : '1px solid rgba(0,0,0,.08)',
                      cursor: 'pointer',
                      transition: 'background-color .2s ease, transform .2s ease',
                      '&:hover': {
                        bgcolor: isDarkMode ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.04)',
                        transform: 'translateX(3px)',
                      },
                      '&:focus-visible': {
                        outline: '2px solid #ff5b39',
                        outlineOffset: '2px',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        width: '100%',
                      }}
                    >
                      <Typography
                        sx={{
                          color: isDarkMode ? '#fff' : '#141416',
                          fontSize: { xs: 15, sm: 16 },
                          fontWeight: 500,
                          lineHeight: 1.18,
                        }}
                      >
                        {item?.title || 'Latest crypto market update'}
                      </Typography>

                      <Box
                        component="label"
                        sx={{
                          color: isDarkMode
                            ? 'rgba(255,255,255,.55)'
                            : '#777E90',
                          fontSize: '11px',
                          fontWeight: 500,
                          lineHeight: 1.2,
                          textAlign: 'right',
                          mt: 0.5,
                          whiteSpace: 'nowrap',
                          display: 'block',
                        }}
                      >
                        {timeLabel}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>

        <Box sx={{ pt: 2.5, textAlign: 'center' }}>
          <Button
            onClick={() => navigate(RoutesName.Trending_News)}
            variant="outlined"
            sx={{
              minWidth: 126,
              borderRadius: '999px',
              borderColor: isDarkMode ? '#106ef1' : 'rgba(0, 0, 0, 0.25)',
              color: isDarkMode ? '#fff' : '#141416',
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'none',
              px: 2.8,
              py: 0.8,
              '&:hover': {
                borderColor: '#3772ff',
                color: '#3772ff',
                bgcolor: isDarkMode ? 'rgba(16,110,241,.25)' : 'rgba(55,114,255,.08)',
              },
            }}
          >
            Top stories
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default MuiTrandingNewsDashboardSection;
