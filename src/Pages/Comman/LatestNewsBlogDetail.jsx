import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Apis, RoutesName } from '../../_common/app.constants';
import { useFetchWrapper } from '../../_helpers';
import { Helmet } from "react-helmet-async";
import { switchDarkModeAtom } from '../../_state';
import { useRecoilValue } from 'recoil';

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
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const [blogData, setBlogData] = useState(null);
  const [loader, setLoader] = useState(false);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!id) {
        return;
      }

      try {
        setLoader(true);
        const response = await fetchWrapper.get(Apis.BLOG_DETAIL(id));
        setBlogData(response?.data || response || null);
      } catch (error) {
        console.error('Error fetching blog detail:', error);
        setBlogData(null);
      } finally {
        setLoader(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (!id) {
    return null;
  }

  const sanitizeConfig = {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'allow',
      'allowfullscreen',
      'frameborder',
      'scrolling',
      'src',
      'style',
      'width',
      'height',
    ],
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data|blob):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  };

  const normalizeMediaSrc = (html) => {
    if (!html) {
      return '';
    }

    const imageBaseUrl = process.env.REACT_APP_IMAGE_URL || '';
    if (!imageBaseUrl) {
      return html;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const normalizedBaseUrl = imageBaseUrl.endsWith('/')
      ? imageBaseUrl.slice(0, -1)
      : imageBaseUrl;

    const updateRelativeSrc = (element, attributeName = 'src') => {
      const src = element.getAttribute(attributeName);
      if (!src) {
        return;
      }

      const trimmedSrc = src.trim();
      const isAbsoluteUrl =
        /^(?:https?:|data:|blob:)/i.test(trimmedSrc) || trimmedSrc.startsWith('//');

      if (isAbsoluteUrl || !trimmedSrc.startsWith('/')) {
        return;
      }

      element.setAttribute(attributeName, `${normalizedBaseUrl}${trimmedSrc}`);
    };

    doc.querySelectorAll('img[src]').forEach((img) => {
      updateRelativeSrc(img, 'src');
    });

    doc.querySelectorAll('video[src], source[src]').forEach((media) => {
      updateRelativeSrc(media, 'src');
    });

    return doc.body.innerHTML;
  };

  const descriptionHtml = DOMPurify.sanitize(
    normalizeMediaSrc(blogData?.description || ''),
    sanitizeConfig
  );
  const formattedCreatedAt = blogData?.created_at
    ? dayjs(blogData.created_at).format('MMMM DD, YYYY')
    : '';

  if (!loader && !blogData) {
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

  const metaDescription = blogData?.description
    ? blogData.description
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160)
    : "Coin Guru";

  const formattedType = (blogData?.type || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <Helmet>
        <title>{blogData?.title || "CoinGuru"}</title>

        <meta
          key="description"
          name="description"
          content={metaDescription}
        />

        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <Box sx={{ backgroundColor: isDarkMode ? "#000" : "#fff", minHeight: '100vh', }}>
        <Backdrop
          open={loader}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* Crypto Price Marquee  */}
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
            <CustomTooltip title={`Back to ${formattedType}`} placement="right">
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
                onClick={() => navigate(-1)}
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
              <Box sx={{ p: { xs: 3, sm: 4 }, border: '1px solid #E5E7EB', borderRadius: 4, mt: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
                    Published on {formattedCreatedAt}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    color: '#475569',
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    lineHeight: 1.8,
                    mb: 4,
                    '& p': {
                      margin: 0,
                    },
                    '& iframe': {
                      maxWidth: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '12px',
                      margin: '20px 0',
                    },
                    '& img': {
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '12px',
                      margin: '20px 0',
                    },
                    '& video': {
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '12px',
                      margin: '20px 0',
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default LatestNewsBlogDetail;
