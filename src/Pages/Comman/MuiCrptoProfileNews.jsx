import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import YouTube from "react-youtube";
import { styled, keyframes } from '@mui/material/styles';
import { ArrowBack, ArrowUpward } from '@mui/icons-material';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LanguageIcon from "@mui/icons-material/Language";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

import { allContentActions } from "../../_actions/allcontent.actions";
import { Apis, RoutesName } from "../../_common/app.constants"; // ✅ adjust path if different in your project
import { useFetchWrapper } from "../../_helpers";
import { switchDarkModeAtom } from "../../_state";
import { useRecoilValue } from "recoil";
import CryptoTickerMarquee from "./Components/CryptoTickerMarquee";


const defaultAuthor = {
  name: "",
  role: "",
  image: "",
  expertise: [],
  languages: [],
  email: "",
  bio: "",
  socialLinks: {},
};

/* =========================================================
   HELPERS
========================================================= */

const getMediaUrl = (mediaPath) => {
  if (!mediaPath) return "";

  const path = mediaPath.trim();
  if (/^(?:https?:|data:|blob:)/i.test(path) || path.startsWith("//")) {
    return path;
  }

  const baseUrl = process.env.REACT_APP_IMAGE_URL || "";
  if (!baseUrl) return path;

  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

const getYouTubeVideoId = (url) => {
  if (!url) return "";
  if (/^[\w-]{11}$/.test(url)) return url;

  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );

  return match?.[1] || "";
};

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .split(/\s+/)
    .slice(0, 6)
    .join("-");

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({ icon, label, children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
      <Box
        sx={{
          width: "34px",
          height: "34px",
          minWidth: "34px",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e9f5ff, #f5faff)",
          color: "#0878d1",
          border: "1px solid #d9ecfb",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: '600 !important',
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#8a9199",
            mb: "3px",
          }}
        >
          {label}
        </Typography>

        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

/* =========================================================
   AUTHOR PROFILE
========================================================= */

export default function AuthorProfile() {
  const { id, name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const { getProfileDetail } = allContentActions();

  const [author, setAuthor] = useState(defaultAuthor);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const routeParam = name || id;
      if (!routeParam) {
        setAuthor(defaultAuthor);
        setBlogs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        let targetId = location.state?.id;

        if (!targetId && routeParam) {
          const cleanParam = decodeURIComponent(routeParam).trim();
          const slugParam = slugify(cleanParam);
          const cachedId =
            sessionStorage.getItem(`profile_id_${cleanParam}`) ||
            sessionStorage.getItem(`profile_id_${slugParam}`) ||
            localStorage.getItem(`profile_id_${cleanParam}`) ||
            localStorage.getItem(`profile_id_${slugParam}`);

          if (cachedId) {
            targetId = cachedId;
          } else if (!isNaN(cleanParam)) {
            targetId = cleanParam;
          }
        }

        // If not found in state or storage and routeParam is not numeric, lookup in content
        if (!targetId && routeParam) {
          const targetSlug = slugify(decodeURIComponent(routeParam));
          const contentTypes = ['latest_news', 'press_release', 'price_prediction', 'research_report'];

          for (const cType of contentTypes) {
            try {
              const res = await fetchWrapper.get(Apis.All_Content(cType));
              const items = Array.isArray(res?.data) ? res.data : [];
              const matched = items.find((it) => {
                const pName = it?.profile?.profile_name || it?.author || it?.author_name || '';
                return slugify(pName) === targetSlug;
              });

              if (matched?.profile?.profile_id || matched?.profile_id) {
                targetId = matched?.profile?.profile_id || matched?.profile_id;
                break;
              }
            } catch (lookupErr) {
              console.warn(`Could not lookup profile in ${cType}:`, lookupErr);
            }
          }
        }

        if (!targetId) {
          throw new Error("Profile not found");
        }

        const response = await getProfileDetail(targetId);

        console.log("Profile API response:", response);

        // ✅ Real API shape: { result_code, error_info, profile: {...}, data: [...] }
        if (response?.result_code !== 1) {
          throw new Error(response?.error_info || "Failed to load profile");
        }

        const profileObj = response?.profile;

        if (!profileObj) {
          throw new Error("Profile data not found");
        }

        if (profileObj?.profile_name && profileObj?.profile_id) {
          const pSlug = slugify(profileObj.profile_name);
          sessionStorage.setItem(`profile_id_${pSlug}`, String(profileObj.profile_id));
          sessionStorage.setItem(`profile_id_${profileObj.profile_name}`, String(profileObj.profile_id));
          localStorage.setItem(`profile_id_${pSlug}`, String(profileObj.profile_id));
        }

        const mappedAuthor = mapProfileToAuthor(profileObj);
        setAuthor(mappedAuthor);

        // ✅ blogs/articles list (type is dynamic: latest_news, information, etc.)
        const blogList = Array.isArray(response?.data) ? response.data : [];
        setBlogs(blogList);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data");
        setAuthor(defaultAuthor);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id, name, location.state?.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, []);

  const mapProfileToAuthor = (profileObj) => {
    const imageBaseUrl = process.env.REACT_APP_IMAGE_URL || "";

    return {
      name: profileObj?.profile_name || "",
      role: profileObj?.profile_designation || "",
      image: profileObj?.profile_image
        ? `${imageBaseUrl}${profileObj.profile_image}`
        : "",
      bio: profileObj?.profile_description || "",
      socialLinks: profileObj?.profile_social_link || {},
      expertise: profileObj?.expertise || [],
      languages: profileObj?.languages || [],
    };
  };

  // ✅ Blog detail navigation — works for any dynamic "type"
  const openBlogDetail = (item) => {
    if (item?.id === undefined || item?.id === null) return;
    const slug = slugify(item?.title);
    sessionStorage.setItem(`blog_id_${slug}`, String(item.id));
    localStorage.setItem(`blog_id_${slug}`, String(item.id));

    navigate(
      RoutesName.Blog_Detail
        .replace(":slug", slug),
      { state: { id: item.id } }
    );
  };

  if (loading) {
    return (
      <Card
        elevation={0}
        sx={{
          width: "100%",
          mx: "auto",
          borderRadius: "18px",
          border: "1px solid #dfe4e9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        elevation={0}
        sx={{
          width: "100%",
          mx: "auto",
          borderRadius: "18px",
          border: "1px solid #dfe4e9",
          p: 3,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Card>
    );
  }

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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(author.email);
      setEmailCopied(true);

      setTimeout(() => {
        setEmailCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          mt: { xs: '56px', sm: '64px' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <CryptoTickerMarquee />
      </Box>

      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Box
          sx={{
            position: 'fixed',
            top: { xs: 130, sm: 124 },
            left: { xs: 16, sm: 24 },
            zIndex: 10,
          }}
        >
          <CustomTooltip title={`Back`} placement="right">
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
        {/* =================================================
          PROFILE CARD
      ================================================= */}
        <Card
          elevation={0}
          sx={{
            width: "100%",
            mx: "auto",
            overflow: "hidden",
            borderRadius: "18px",
            border: "1px solid #dfe4e9",
            background:
              "linear-gradient(135deg, #ffffff 0%, #ffffff 55%, #f5faff 100%)",
            boxShadow: "0 12px 35px rgba(20, 50, 80, 0.06)",
          }}
        >
          {/* TOP SECTION */}
          <Box
            sx={{
              p: { xs: "18px", sm: "25px", md: "30px" },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: 'auto 1fr', md: "210px minmax(0, 1fr)" },
              gap: { xs: "22px", md: "30px" },
            }}
          >
            {/* PHOTO */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: "250px", md: "210px" },
                mx: { xs: "auto", md: 0 },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={author.image}
                  alt={author.name}
                  variant="rounded"
                  sx={{
                    width: "100%",
                    height: { xs: "250px", md: "226px" },
                    borderRadius: "14px",
                    objectFit: "cover",
                    border: "1px solid #dfe5ea",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "0px",
                    bottom: "-12px",
                    width: "100%",
                    height: "5px",
                    borderRadius: "5px",
                    background: "linear-gradient(180deg, #08a4e8, #0065d8)",
                  }}
                />
              </Box>

              {/* SOCIAL */}
              <Stack direction="row" spacing={1} sx={{ mt: "20px", display: author.socialLinks ? 'block' : 'none', }}>
                {author.socialLinks?.twitter && (
                  <IconButton
                    component="a"
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "9px",
                      color: "#17202a",
                      background: "linear-gradient(135deg, #eef8ff, #ffffff)",
                      border: "1px solid #d9e9f5",
                      "&:hover": { backgroundColor: "#e9f5fc" },
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        lineHeight: 1,
                        fontFamily: "Arial, sans-serif",
                      }}
                    >
                      𝕏
                    </Box>
                  </IconButton>
                )}

                {author.socialLinks?.linkedin && (
                  <IconButton
                    component="a"
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "9px",
                      color: "#0878d1",
                      background: "linear-gradient(135deg, #eef8ff, #ffffff)",
                      border: "1px solid #d9e9f5",
                      "&:hover": { backgroundColor: "#e9f5fc" },
                    }}
                  >
                    <LinkedInIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                )}

                {author.socialLinks?.facebook && (
                  <IconButton
                    component="a"
                    href={author.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "9px",
                      color: "#0878d1",
                      background: "linear-gradient(135deg, #eef8ff, #ffffff)",
                      border: "1px solid #d9e9f5",
                      "&:hover": { backgroundColor: "#e9f5fc" },
                    }}
                  >
                    <FacebookIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                )}

                {author.socialLinks?.instagram && (
                  <IconButton
                    component="a"
                    href={author.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "9px",
                      color: "#0878d1",
                      background: "linear-gradient(135deg, #eef8ff, #ffffff)",
                      border: "1px solid #d9e9f5",
                      "&:hover": { backgroundColor: "#e9f5fc" },
                    }}
                  >
                    <InstagramIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                )}
              </Stack>
            </Box>

            {/* RIGHT CONTENT */}
            <Box sx={{ minWidth: 0 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: "7px" }}>
                <Box
                  sx={{
                    width: "24px",
                    height: "2px",
                    borderRadius: "5px",
                    background: "linear-gradient(90deg, #0099e8, #0065d8)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "12px !important",
                    fontWeight: 500,
                    letterSpacing: "1.3px",
                    color: "#1685ca",
                  }}
                >
                  JOURNALIST PROFILE
                </Typography>
              </Stack>

              <Typography
                component="h4"
                sx={{
                  lineHeight: 1.08,
                  fontWeight: '600 !important',
                  letterSpacing: "-1.2px",
                  color: "#17202a",
                  mb: "4px",
                }}
              >
                {author.name}
              </Typography>

              <Typography sx={{ color: "#1685ca", fontWeight: '600 !important', mb: { xs: "20px", sm: "25px" }, display: author.role ? 'block' : 'none', }}>
                {author.role}
              </Typography>

              <Stack spacing={2}>
                {author.expertise.length > 0 && (
                  <InfoRow
                    icon={<WorkspacePremiumOutlinedIcon sx={{ fontSize: 18 }} />}
                    label="Expertise"
                  >
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                      {author.expertise.map((item) => (
                        <Chip
                          key={item}
                          label={item}
                          size="small"
                          sx={{
                            height: "26px",
                            borderRadius: "7px",
                            background: "#f7fbfe",
                            border: "1px solid #dcecf7",
                            color: "#39434c",
                            fontSize: "11px",
                            fontWeight: 500,
                            "& .MuiChip-label": { px: "9px" },
                          }}
                        />
                      ))}
                    </Box>
                  </InfoRow>
                )}

                {author.languages.length > 0 && (
                  <InfoRow icon={<LanguageIcon sx={{ fontSize: 17 }} />} label="Languages">
                    <Stack direction="row" spacing={0.7} flexWrap="wrap" useFlexGap>
                      {author.languages.map((language) => (
                        <Chip
                          key={language}
                          label={language}
                          size="small"
                          sx={{
                            height: "25px",
                            borderRadius: "7px",
                            backgroundColor: "#fff",
                            border: "1px solid #e1e7ed",
                            color: "#4a535c",
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Stack>
                  </InfoRow>
                )}
              </Stack>


              {/* BIO SECTION */}
              <Box
                sx={{
                  mx: { xs: "0px", sm: "0px", md: "0px" },
                  mt: { xs: "15px", sm: "20px", md: "20px" },
                  p: { xs: "17px", sm: "20px" },
                  borderRadius: "13px",
                  border: "1px solid rgba(0, 113, 190, 0.08)",
                  background: "linear-gradient(135deg, #f7fbfe 0%, #ffffff 100%)",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: "9px" }}>
                  <Box
                    sx={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#0787d1",
                      boxShadow: "0 0 0 4px #e4f4fc",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#65717c",
                    }}
                  >
                    About the Author
                  </Typography>
                </Stack>

                <Typography
                  component="p"
                  sx={{
                    m: 0,
                    color: "#59636c",
                    fontSize: { xs: "13px", sm: "14px" },
                    lineHeight: 1.65,
                  }}
                >
                  {author.bio}
                </Typography>
              </Box>
            </Box>
          </Box>

        </Card>

        {/* =================================================
          AUTHOR'S BLOGS SECTION
      ================================================= */}
        <Box sx={{ my: 5 }}>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 600,
              color: isDarkMode ? "#fff" : "#000",
              mb: 3,
            }}
          >
            Blogs by {author.name || "this author"}
          </Typography>

          {blogs.length === 0 ? (
            <Typography sx={{ color: "#8a9199" }}>
              No blogs found for this author.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {blogs.map((item) => {
                const mediaUrl = getMediaUrl(item?.get_media_display);
                const mediaType = String(item?.media_type || "").toLowerCase();
                const isVideo = ["video", "video-file", "video_file"].includes(mediaType);
                const isYouTube = ["youtube", "youtube-link", "youtube_link"].includes(mediaType);
                const youtubeVideoId = getYouTubeVideoId(item?.get_media_display);

                return (
                  <Grid item xs={12} sm={4} md={3} key={item?.id}>
                    <Card
                      onClick={() => openBlogDetail(item)}
                      sx={{
                        height: "100%",
                        borderRadius: "16px",
                        overflow: "hidden",
                        bgcolor: "#ffffff",
                        border: "1px solid #ececec",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                        cursor: "pointer",
                        transition:
                          "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "0 16px 30px rgba(0,0,0,0.14)",
                          borderColor: "#e0e0e0",
                        },
                        "&:hover .blog-card-media": {
                          transform: "scale(1.06)",
                        },
                      }}
                    >
                      <Box sx={{ height: { xs: 145, sm: 145, md: 150 }, overflow: "hidden", bgcolor: "#f3f3f3" }}>
                        {isVideo ? (
                          <video
                            src={mediaUrl}
                            controls
                            preload="metadata"
                            onClick={(event) => event.stopPropagation()}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                        ) : isYouTube && youtubeVideoId ? (
                          <Box
                            onClick={(event) => event.stopPropagation()}
                            sx={{
                              width: "100%",
                              height: "100%",
                              "& > div, & iframe": {
                                width: "100% !important",
                                height: "100% !important",
                                display: "block",
                              },
                            }}
                          >
                            <YouTube
                              videoId={youtubeVideoId}
                              opts={{ width: "100%", height: "100%", playerVars: { rel: 0 } }}
                              style={{ width: "100%", height: "100%" }}
                              iframeClassName="blog-youtube-player"
                            />
                          </Box>
                        ) : (
                          <Box
                            component="img"
                            className="blog-card-media"
                            src={mediaUrl || "https://via.placeholder.com/800x600?text=Blog"}
                            alt={item?.title || "Blog"}
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src =
                                "https://via.placeholder.com/800x600?text=Blog";
                            }}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                              transition: "transform 0.35s ease",
                            }}
                          />
                        )}
                      </Box>

                      <Box sx={{ p: 2.5 }}>
                        {/* dynamic type badge */}
                        {item?.type && (
                          <Chip
                            label={String(item.type).replace(/_/g, " ")}
                            size="small"
                            sx={{
                              mb: 1.2,
                              height: "22px",
                              borderRadius: "6px",
                              textTransform: "capitalize",
                              background: "#eef8ff",
                              border: "1px solid #d9ecfb",
                              color: "#0878d1",
                              fontSize: "10px",
                              fontWeight: 700,
                            }}
                          />
                        )}

                        <Typography
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") openBlogDetail(item);
                          }}
                          sx={{
                            fontSize: { xs: 16, md: 19 },
                            fontWeight: 600,
                            color: "#000000",
                            lineHeight: 1.35,
                            cursor: "pointer",
                            transition: "color 0.2s ease",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            ".MuiCard-root:hover &": { color: "#323232" },
                          }}
                        >
                          {item?.title}
                        </Typography>

                        {item?.created_at && (
                          <Typography sx={{ mt: 2, fontSize: 14, color: "#808080", fontWeight: 600 }}>
                            {dayjs(item.created_at).format("MMM DD, YYYY hh:mm A")}
                          </Typography>
                        )}
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Container>

      <Zoom in={showScrollTop}>
        <Box
          role="presentation"
          sx={{
            position: "fixed",
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
                borderRadius: "50%",
                border: "2px solid #8e95a5",
                bgcolor: isDarkMode ? "rgba(29, 31, 43, 0.92)" : "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
                color: isDarkMode ? "#a0a5b5" : "#6e7687",
                transition: "all 0.25s ease-in-out",
                "&:hover": {
                  borderColor: "#3772ff",
                  color: "#3772ff",
                  bgcolor: isDarkMode ? "rgba(55, 114, 255, 0.15)" : "#f0f5ff",
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 18px rgba(55, 114, 255, 0.25)",
                },
              }}
            >
              <ArrowUpward sx={{ fontSize: 22 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Zoom>
    </>
  );
}