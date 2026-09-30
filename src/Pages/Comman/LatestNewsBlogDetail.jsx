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
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { Apis, RoutesName } from '../../_common/app.constants';
import { useFetchWrapper } from '../../_helpers';
import { Helmet } from "react-helmet-async";
import { switchDarkModeAtom } from '../../_state';
import { useRecoilValue } from 'recoil';
import { useCoinActions } from '../../_actions/coin.actions';
import { coinsAtom } from '../../_state';
import { allContentActions } from '../../_actions/allcontent.actions';


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

const CryptoTickerMarquee = ({ data, isDark }) => {
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
  const { id: paramId, slug: paramSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const { getProfileDetail } = allContentActions();
  const [blogData, setBlogData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [profileLoader, setProfileLoader] = useState(false);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);
  const { latestListing } = useCoinActions();
  const coinsList = useRecoilValue(coinsAtom);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const routeId = !isNaN(paramId) ? paramId : (!isNaN(paramSlug) ? paramSlug : undefined);

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

  const lastFetchedIdRef = React.useRef(null);

  const slugify = (text = '', isTitle = false) => {
    if (!text) return '';
    const clean = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '');
    if (isTitle) {
      return clean.split(/\s+/).slice(0, 6).join('-');
    }
    return clean.replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const getBlogSlug = (item) => {
    if (item?.slug && String(item.slug).trim()) {
      return slugify(String(item.slug), false);
    }
    return slugify(item?.title || '', true);
  };

  const handleProfileClick = (profileId, profileName) => {
    const id = profileId || blogData?.profile?.profile_id;
    const name = profileName || blogData?.profile?.profile_name || '';

    if (!id && !name) {
      console.error("Profile ID not found");
      return;
    }

    const nameSlug = slugify(name, true) || String(id);
    if (id && nameSlug) {
      sessionStorage.setItem(`profile_id_${nameSlug}`, String(id));
      localStorage.setItem(`profile_id_${nameSlug}`, String(id));
    }

    navigate(RoutesName.Profile_Detail.replace(':name', nameSlug), {
      state: { id, name },
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [paramId, paramSlug, location.state?.id]);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      const currentParam = paramSlug || paramId;
      if (!currentParam && !location.state?.id) {
        setLoader(false);
        setBlogData(null);
        return;
      }

      let targetId = location.state?.id;

      if (!targetId && routeId) {
        targetId = routeId;
      }

      if (!targetId && currentParam) {
        const cleanParam = decodeURIComponent(currentParam).trim().replace(/\/$/, '');
        const slugParamCustom = slugify(cleanParam, false);
        const slugParamTitle = slugify(cleanParam, true);
        const cachedId =
          sessionStorage.getItem(`blog_id_${cleanParam}`) ||
          sessionStorage.getItem(`blog_id_${slugParamCustom}`) ||
          sessionStorage.getItem(`blog_id_${slugParamTitle}`) ||
          localStorage.getItem(`blog_id_${cleanParam}`) ||
          localStorage.getItem(`blog_id_${slugParamCustom}`) ||
          localStorage.getItem(`blog_id_${slugParamTitle}`);

        if (cachedId) {
          targetId = cachedId;
        } else if (!isNaN(cleanParam)) {
          targetId = cleanParam;
        }
      }

      // If already fetched this blog data, don't trigger loader or re-fetch
      if (
        targetId &&
        lastFetchedIdRef.current &&
        String(lastFetchedIdRef.current) === String(targetId) &&
        blogData?.id === targetId
      ) {
        return;
      }

      setLoader(true);

      // If not found in state or storage and currentParam is not numeric, lookup in content
      if (!targetId && currentParam) {
        const cleanParam = decodeURIComponent(currentParam).trim().replace(/\/$/, '');
        const targetSlug = slugify(cleanParam, false);
        const targetTitleSlug = slugify(cleanParam, true);
        const contentTypes = [
          'latest_news',
          'trending_news',
          'press_release',
          'price_prediction',
          'research_report',
          'guest_post',
          'market',
          'finance',
          'policy',
          'tech',
        ];

        for (const cType of contentTypes) {
          try {
            const res = await fetchWrapper.get(Apis.All_Content(cType));
            const items = Array.isArray(res?.data)
              ? res.data
              : Array.isArray(res?.data?.data)
              ? res.data.data
              : Array.isArray(res)
              ? res
              : [];
            const matched = items.find((it) => {
              const itemCustomSlug = it?.slug && String(it.slug).trim() ? slugify(String(it.slug), false) : '';
              const itemTitleSlug = slugify(it?.title || '', true);
              return (
                (itemCustomSlug && (
                  itemCustomSlug === targetSlug ||
                  itemCustomSlug.startsWith(targetSlug) ||
                  targetSlug.startsWith(itemCustomSlug)
                )) ||
                itemTitleSlug === targetTitleSlug ||
                itemTitleSlug.startsWith(targetTitleSlug) ||
                targetTitleSlug.startsWith(itemTitleSlug) ||
                itemTitleSlug === targetSlug ||
                itemTitleSlug.startsWith(targetSlug) ||
                targetSlug.startsWith(itemTitleSlug)
              );
            });

            if (matched?.id) {
              targetId = matched.id;
              break;
            }
          } catch (lookupErr) {
            console.warn(`Could not lookup blog in ${cType}:`, lookupErr);
          }
        }
      }

      if (!targetId) {
        console.error('Blog ID not found for:', currentParam);
        setBlogData(null);
        setLoader(false);
        return;
      }

      try {
        const response = await fetchWrapper.get(Apis.BLOG_DETAIL(targetId));
        const itemData = response?.data || response || null;
        setBlogData(itemData);

        if (itemData?.id) {
          lastFetchedIdRef.current = String(itemData.id);
          if (currentParam) {
            const cleanParam = decodeURIComponent(currentParam).trim().replace(/\/$/, '');
            sessionStorage.setItem(`blog_id_${cleanParam}`, String(itemData.id));
            localStorage.setItem(`blog_id_${cleanParam}`, String(itemData.id));
          }
          if (itemData.slug && String(itemData.slug).trim()) {
            const customSlug = slugify(String(itemData.slug), false);
            sessionStorage.setItem(`blog_id_${customSlug}`, String(itemData.id));
            localStorage.setItem(`blog_id_${customSlug}`, String(itemData.id));
          }
          if (itemData.title) {
            const titleSlug = slugify(itemData.title, true);
            sessionStorage.setItem(`blog_id_${titleSlug}`, String(itemData.id));
            localStorage.setItem(`blog_id_${titleSlug}`, String(itemData.id));
          }

          // If itemData has a slug or title, ensure the browser displays the preferred slug
          const preferredSlug = getBlogSlug(itemData);
          if (preferredSlug && currentParam) {
            const cleanParam = decodeURIComponent(currentParam).trim().replace(/\/$/, '');
            if (cleanParam !== preferredSlug) {
              navigate(RoutesName.Blog_Detail.replace(':slug', preferredSlug), {
                replace: true,
                state: { id: itemData.id },
              });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching blog detail:', error);
        setBlogData(null);
      } finally {
        setLoader(false);
      }
    };

    fetchBlogDetail();
  }, [paramId, paramSlug, location.state?.id]);

  if (loader && !blogData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
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

  // Author + timestamp shown opposite "Published on" (profile_name is dynamic, date uses dayjs on created_at)
  const formattedAuthorDate = blogData?.created_at
    ? dayjs(blogData.created_at).format('MMM DD, YYYY HH:mm [UTC]')
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

  const metaDescription = blogData?.meta_description
    ? blogData.meta_description
    : blogData?.description
      ?.replace(/<[^>]+>/g, "")
      ?.replace(/\s+/g, " ")
      ?.trim()
      ?.slice(0, 159) || "Coin Guru";

  const formattedType = (blogData?.type || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <Helmet>
        <title>{blogData?.meta_title || blogData?.title || "TheCoinChain"}</title>

        <meta
          key="description"
          name="description"
          content={metaDescription}
        />

        <meta
          name="keywords"
          content={blogData?.meta_keywords || "Coin Guru"}
        />

        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <Box sx={{ backgroundColor: isDarkMode ? "#000" : "#fff", minHeight: '100vh', }}>
        <Backdrop
          open={loader || profileLoader}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* Crypto Price Marquee  */}
        <Box sx={{ mt: { xs: '56px', sm: '64px' }, position: 'relative', zIndex: 1 }}>
          <CryptoTickerMarquee data={cryptoTickerData} isDark={isDarkMode} />
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
                  top: { xs: '30px', sm: 'auto' }
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
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  {/* Author + Date (dynamic profile_name | created_at via dayjs) */}
                  {(blogData?.profile?.profile_name || formattedAuthorDate) && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 0.75,
                      }}
                    >
                      {blogData?.profile?.profile_name && (
                        <Box
                          sx={{
                            position: 'relative',
                            display: 'inline-flex',
                          }}
                          onMouseEnter={() => setShowProfilePopup(true)}
                          onMouseLeave={() => setShowProfilePopup(false)}
                        >
                          {/* Profile Name */}
                          <Typography
                            onClick={() =>
                              handleProfileClick(
                                blogData?.profile?.profile_id,
                                blogData?.profile?.profile_name
                              )
                            }
                            sx={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#2F6FED',
                              whiteSpace: 'nowrap',
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              '&:hover': {
                                color: '#1558C0',
                              },
                            }}
                          >
                            {blogData?.profile?.profile_name}
                          </Typography>

                          {/* Popup Wrapper */}
                          {showProfilePopup && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,

                                // IMPORTANT:
                                // Name aur popup ke beech actual gap nahi hoga
                                pt: '10px',

                                zIndex: 1000,
                              }}
                            >
                              {/* Actual Popup */}
                              <Box
                                sx={{
                                  position: 'relative',
                                  width: 270,
                                  backgroundColor: '#fff',
                                  border: '1px solid #2084EA',
                                  borderRadius: '10px',
                                  boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                                  p: 1.75,

                                  // Arrow border
                                  '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '-9px',
                                    left: '22px',
                                    width: 0,
                                    height: 0,
                                    borderLeft: '9px solid transparent',
                                    borderRight: '9px solid transparent',
                                    borderBottom: '9px solid #2084EA',
                                  },

                                  // Arrow white inner part
                                  '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '-7px',
                                    left: '23px',
                                    width: 0,
                                    height: 0,
                                    borderLeft: '8px solid transparent',
                                    borderRight: '8px solid transparent',
                                    borderBottom: '8px solid #fff',
                                  },
                                }}
                              >
                                {/* Profile Header */}
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.25,
                                    mb: 1.25,
                                  }}
                                >
                                  {/* Profile Image */}
                                  <Box
                                    component="img"
                                    src={

                                      `${process.env.REACT_APP_IMAGE_URL}/${blogData?.profile?.profile_image}`

                                    }
                                    alt={blogData?.profile?.profile_name}
                                    onClick={() =>
                                      handleProfileClick(
                                        blogData?.profile?.profile_id,
                                        blogData?.profile?.profile_name
                                      )
                                    }
                                    sx={{
                                      width: 46,
                                      height: 46,
                                      borderRadius: '50%',
                                      objectFit: 'cover',
                                      border: '2px solid #2084EA',
                                      cursor: 'pointer',
                                    }}
                                  />

                                  <Box>
                                    <Typography
                                      onClick={() =>
                                        handleProfileClick(
                                          blogData?.profile?.profile_id,
                                          blogData?.profile?.profile_name
                                        )
                                      }
                                      sx={{
                                        fontSize: 15,
                                        fontWeight: 600,
                                        color: '#1F2937',
                                        cursor: 'pointer',

                                        '&:hover': {
                                          color: '#2084EA',
                                        },
                                      }}
                                    >
                                      {blogData?.profile?.profile_name} ↗
                                    </Typography>

                                    <Typography
                                      sx={{
                                        fontSize: 12,
                                        color: '#9CA3AF',
                                        mt: 0.20,
                                      }}
                                    >
                                      {blogData?.profile?.profile_designation}
                                    </Typography>
                                  </Box>
                                </Box>

                                {/* Description */}
                                <Typography
                                  sx={{
                                    fontSize: '12px !important ',
                                    lineHeight: 1.6,
                                    color: '#8B8B8B',
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",

                                  }}
                                >
                                  {blogData?.profile?.profile_description ||
                                    'Fun-loving and cheerful, a passionate blockchain and crypto writer who knows no boundary...'}
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      )}

                      {blogData?.profile?.profile_name && formattedAuthorDate && (
                        <Box component="span" sx={{ color: '#d5d5d5' }}>
                          |
                        </Box>
                      )}

                      {formattedAuthorDate && (
                        <Typography
                          sx={{
                            fontSize: 13,
                            color: '#555',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Published on {formattedAuthorDate}
                        </Typography>
                      )}
                    </Box>
                  )}

                  {/* <Typography sx={{ color: '#64748B', fontSize: '0.95rem' }}>
                    Published on {formattedCreatedAt}
                  </Typography> */}
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