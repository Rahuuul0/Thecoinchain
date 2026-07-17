import React, { useEffect } from 'react';
import {
  Backdrop,
  Box,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import dayjs from 'dayjs';
import { RoutesName } from '../../_common/app.constants';
import { getLatestNewsById } from './latestNewsData';

// ---- Static ticker data (same as MuiCryptoSection) ----
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

// ---- Crypto Price Marquee Component ----
const CryptoTickerMarquee = ({ data }) => {
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

const getYouTubeVideoId = (url) => {
  if (!url) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  const videoIdFromParam = urlParams.get('v');
  if (videoIdFromParam) {
    return videoIdFromParam;
  }

  const pathMatch = url.match(
    /(?:\/|%3D|v=|youtu\.be\/|embed\/|shorts\/|v\/|watch\?v=)([a-zA-Z0-9_-]{11})/
  );
  if (pathMatch && pathMatch[1]) {
    return pathMatch[1];
  }

  const fallbackMatch = url.match(/([a-zA-Z0-9_-]{11})/);
  return fallbackMatch?.[1] || null;
};

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
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
  },
  '& .MuiTooltip-arrow': {
    display: 'none',
  },
}));

const LatestNewsBlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blogData = getLatestNewsById(id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [id]);

  if (!id) {
    return null;
  }

  if (!blogData) {
    return (
      <Container maxWidth="md" sx={{ py: 16, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Blog not found
        </Typography>
        <Typography sx={{ color: '#4B5563', mb: 3 }}>
          The news article you are trying to open is not available.
        </Typography>
        <IconButton
          onClick={() => navigate(RoutesName.Latest_News)}
          sx={{
            border: '1px solid #D1D5DB',
            borderRadius: '999px',
            px: 2,
          }}
        >
          <ArrowBack />
        </IconButton>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <Backdrop
        open={false}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Crypto Price Marquee - top pe, article se upar */}
      {/* NOTE: agar tumhare page ka top navbar fixed/sticky hai to marquee
          uske neeche chhup sakta hai. Neeche mt value ko apne navbar ki
          height ke barabar (ya thoda zyada) set kar do — e.g. 64px, 72px. */}
      <Box sx={{ mt: { xs: '56px', sm: '64px' }, position: 'relative', zIndex: 1 }}>
        <CryptoTickerMarquee data={cryptoTickerData} />
      </Box>

      <Box sx={{ py: 10 }}>
        <Box
          sx={{
            position: 'fixed',
            top: { xs: 90, sm: 124 },
            left: { xs: 16, sm: 24 },
            zIndex: 10,
          }}
        >
          <CustomTooltip title="Back to latest news" placement="right">
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
              onClick={() => navigate(RoutesName.Latest_News)}
            >
              <ArrowBack sx={{ fontSize: { xs: 18, sm: 20 } }} />
            </IconButton>
          </CustomTooltip>
        </Box>

        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
            }}
          >
            <Box sx={{ p: { xs: 3, sm: 4 },border: '1px solid #E5E7EB',borderRadius: 4 ,mt: 0}}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1.5,
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Chip
                  label={blogData.category}
                  sx={{
                    backgroundColor: '#E0F2FE',
                    color: '#0369A1',
                    fontWeight: 700,
                  }}
                />
                <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
                  {dayjs(blogData.created_at).format('MMMM DD, YYYY')}
                </Typography>
                <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
                  {blogData.read_time}
                </Typography>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: '#0F172A',
                  fontSize: { xs: '2rem', sm: '2.6rem' },
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                {blogData.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#475569',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                {blogData.description}
              </Typography>

              {blogData.media_type === 'youtube' ? (
                <Box sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
                  <YouTube
                    videoId={getYouTubeVideoId(blogData.get_media_display)}
                    opts={{
                      width: '100%',
                      height: '420',
                      playerVars: {
                        autoplay: 0,
                      },
                    }}
                    style={{ width: '100%' }}
                  />
                </Box>
              ) : blogData.media_type === 'video' ? (
                <Box sx={{ mb: 4 }}>
                  <video
                    src={blogData.get_media_display}
                    controls
                    style={{ width: '100%', borderRadius: '16px' }}
                  />
                </Box>
              ) : (
                <CardMedia
                  component="img"
                  image={blogData.get_media_display}
                  alt={blogData.title}
                  sx={{
                    width: '100%',
                    maxHeight: 480,
                    objectFit: 'cover',
                    borderRadius: 3,
                    mb: 4,
                  }}
                />
              )}

              <Box sx={{ mb: 4 }}>
                {blogData.content.map((paragraph, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color: '#334155',
                      fontSize: '1rem',
                      lineHeight: 1.95,
                      mb: 2.5,
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Box>

              <Box
                sx={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 3,
                  p: { xs: 2.5, sm: 3 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#0F172A', mb: 2 }}
                >
                  Key takeaways
                </Typography>
                {blogData.highlights.map((point, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                      mb: index === blogData.highlights.length - 1 ? 0 : 1.2,
                    }}
                  >
                    {index + 1}. {point}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LatestNewsBlogDetail;