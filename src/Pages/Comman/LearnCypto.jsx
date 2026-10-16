import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  PlayArrowRounded,
  KeyboardArrowRight,
  Search as SearchIcon,
  CalendarTodayOutlined,
  MenuBookOutlined,
  PeopleAltOutlined,
  TrendingUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import dayjs from "dayjs";
import {
  tutorialAtom,
  loaderAtom,
  blogListAtom,
  blogimgAtom,
  blogVideoAtom,
  breadCrumbAtom,
  switchDarkModeAtom,
} from "../../_state";
import { useTutorialActions } from "../../_actions/tutorial.actions";
import { RoutesName } from "../../_common/app.constants";

const CATEGORY_TABS = [
  "All",
  "Blockchain",
  "Bitcoin",
  "Ethereum",
  "Altcoin",
  "Tutorial",
];

// Fallback durations matching the reference screenshot design
const SAMPLE_DURATIONS = [
  "10:24",
  "12:45",
  "08:32",
  "09:18",
  "14:20",
  "11:05",
  "09:45",
  "08:10",
  "07:36",
];

const getDuration = (item, index) => {
  if (item?.duration) return item.duration;
  const idx = Math.abs((item?.id != null ? Number(item.id) : index) % SAMPLE_DURATIONS.length);
  return SAMPLE_DURATIONS[idx];
};

const getCleanDescription = (description) => {
  if (!description) return "";
  return description
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

const getFormattedDate = (dateString) => {
  if (!dateString) return "Jul 15, 2026";
  const parsed = dayjs(dateString);
  return parsed.isValid() ? parsed.format("MMM D, YYYY") : "Jul 15, 2026";
};

const getCategoryBadgeStyle = (category) => {
  const cat = (category || "").toLowerCase();
  if (cat.includes("bitcoin")) {
    return { bg: "#F59E0B", color: "#000000" };
  }
  if (cat.includes("blockchain")) {
    return { bg: "#2563EB", color: "#FFFFFF" };
  }
  if (cat.includes("ethereum")) {
    return { bg: "#8B5CF6", color: "#FFFFFF" };
  }
  if (cat.includes("altcoin")) {
    return { bg: "#10B981", color: "#FFFFFF" };
  }
  if (cat.includes("tutorial")) {
    return { bg: "#EF4444", color: "#FFFFFF" };
  }
  return { bg: "#3772FF", color: "#FFFFFF" };
};

const LearnCypto = () => {
  const navigate = useNavigate();
  const tutorialAction = useTutorialActions();
  const tutorialsData = useRecoilValue(tutorialAtom);
  const loader = useRecoilValue(loaderAtom);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);

  const setBlogimg = useSetRecoilState(blogListAtom);
  const setBlognew = useSetRecoilState(blogimgAtom);
  const setBlogvideo = useSetRecoilState(blogVideoAtom);
  const setBreadCrumb = useSetRecoilState(breadCrumbAtom);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    tutorialAction.tutorialData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const vidLink = (data) => {
    if (!data) return;
    setBreadCrumb(data.category || "Video Tutorial");
    const learnSeo = data.slug || data.id;
    navigate(`${RoutesName.learn_Crypto_Details}/learncyptovideo/${learnSeo}`);
    setBlogimg(data);
    setBlognew(true);
    setBlogvideo(true);
  };

  // Sort tutorials by date if valid; otherwise preserve API order
  const sortedVideos = useMemo(() => {
    if (!Array.isArray(tutorialsData) || tutorialsData.length === 0) return [];
    const list = [...tutorialsData];
    return list.sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
      if (timeA && timeB && timeA !== timeB) {
        return timeB - timeA;
      }
      return 0;
    });
  }, [tutorialsData]);

  // Featured video for top hero section
  const featuredVideo = useMemo(() => {
    if (!sortedVideos || sortedVideos.length === 0) return null;
    return sortedVideos[featuredIndex % sortedVideos.length];
  }, [sortedVideos, featuredIndex]);

  const handleNextFeatured = (e) => {
    e.stopPropagation();
    if (sortedVideos.length > 0) {
      setFeaturedIndex((prev) => (prev + 1) % Math.min(sortedVideos.length, 4));
    }
  };

  // Filter videos based on category and search query
  const filteredVideos = useMemo(() => {
    return sortedVideos.filter((item) => {
      // Category filter check
      let matchesCat = true;
      if (selectedCategory !== "All") {
        const itemCat = (item.category || "").trim().toLowerCase();
        const selCat = selectedCategory.trim().toLowerCase();
        if (selCat === "tutorial") {
          matchesCat = itemCat.startsWith("tutorial");
        } else if (selCat === "altcoin") {
          matchesCat = itemCat.startsWith("altcoin");
        } else {
          matchesCat = itemCat.includes(selCat) || selCat.includes(itemCat);
        }
      }

      // Search filter check
      let matchesSearch = true;
      if (searchQuery && searchQuery.trim() !== "") {
        const query = searchQuery.trim().toLowerCase();
        const title = (item.title || "").toLowerCase();
        const desc = (item.description || "").toLowerCase();
        matchesSearch = title.includes(query) || desc.includes(query);
      }

      return matchesCat && matchesSearch;
    });
  }, [sortedVideos, selectedCategory, searchQuery]);

  // Displayed batch based on incremental loading
  const visibleVideos = useMemo(() => {
    return filteredVideos.slice(0, visibleCount);
  }, [filteredVideos, visibleCount]);

  const handleCategoryChange = (tab) => {
    setSelectedCategory(tab);
    setVisibleCount(6);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <Box
      component="main"
      sx={{
        pt: { xs: 15, sm: 17, md: 19 },
        pb: { xs: 10, md: 14 },
        backgroundColor: isDarkMode ? "#141416" : "#FCFCFD",
        color: isDarkMode ? "#FCFCFD" : "#23262F",
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container maxWidth="lg">
        {/* ========================================================
            1. TOP HERO SECTION: FEATURED VIDEO / LEARN CRYPTO
            ======================================================== */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #090D16 0%, #101726 50%, #161F33 100%)",
            borderRadius: "24px",
            p: { xs: 3, sm: 4, md: 5 },
            mb: { xs: 6, md: 8 },
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Grid container spacing={{ xs: 4, md: 5 }} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <Box>
                {/* Yellow Badge */}
                <Box
                  sx={{
                    display: "inline-block",
                    backgroundColor: "#F59E0B",
                    color: "#000000",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    borderRadius: "20px",
                    px: 1.6,
                    py: 0.5,
                    mb: 2.2,
                  }}
                >
                  FEATURED VIDEO
                </Box>

                {/* Main Heading */}
                <Typography
                  variant="h1"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: { xs: "32px", sm: "40px", md: "46px" },
                    lineHeight: 1.15,
                    letterSpacing: "-0.5px",
                    mb: 2,
                    fontFamily: "var(--secondary-font, 'DM Sans', sans-serif)",
                  }}
                >
                  Learn <span style={{ color: "#FFC107" }}>Crypto</span>
                </Typography>

                {/* Subtitle */}
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.75)",
                    fontSize: { xs: "14px", sm: "15px" },
                    lineHeight: 1.6,
                    maxWidth: 480,
                    mb: 3.5,
                  }}
                >
                  Explore blockchain, Bitcoin, Ethereum and crypto tutorials with
                  easy explanations, expert insights and real-world examples.
                </Typography>

                {/* 3 Stats with Icons */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: { xs: 2, sm: 3 },
                    mb: 4,
                  }}
                >
                  {/* Stat 1 */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <MenuBookOutlined sx={{ color: "rgba(255,255,255,0.9)", fontSize: 24 }} />
                    <Box>
                      <Typography sx={{ color: "#FFFFFF", fontWeight: 700, fontSize: "13px", lineHeight: 1.2 }}>
                        100+
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>
                        Educational Videos
                      </Typography>
                    </Box>
                  </Box>

                  {/* Stat 2 */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <PeopleAltOutlined sx={{ color: "rgba(255,255,255,0.9)", fontSize: 24 }} />
                    <Box>
                      <Typography sx={{ color: "#FFFFFF", fontWeight: 700, fontSize: "13px", lineHeight: 1.2 }}>
                        Expert
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>
                        Insights
                      </Typography>
                    </Box>
                  </Box>

                  {/* Stat 3 */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <TrendingUp sx={{ color: "rgba(255,255,255,0.9)", fontSize: 24 }} />
                    <Box>
                      <Typography sx={{ color: "#FFFFFF", fontWeight: 700, fontSize: "13px", lineHeight: 1.2 }}>
                        Beginner to Advanced
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>
                        Learning
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Watch Now Button */}
                <Button
                  onClick={() => vidLink(featuredVideo)}
                  variant="contained"
                  startIcon={<PlayArrowRounded sx={{ color: "#000000" }} />}
                  endIcon={<KeyboardArrowRight sx={{ color: "#000000" }} />}
                  sx={{
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    borderRadius: "50px",
                    px: 3,
                    py: 1.2,
                    fontWeight: 700,
                    fontSize: "14.5px",
                    textTransform: "capitalize",
                    boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)",
                    "&:hover": {
                      backgroundColor: "#F3F4F6",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Watch Now
                </Button>
              </Box>
            </Grid>

            {/* Right Featured Video Card */}
            <Grid item xs={12} md={6}>
              <Box sx={{ width: "100%", maxWidth: { xs: "100%", md: "520px" }, ml: "auto" }}>
                <Box
                  onClick={() => vidLink(featuredVideo)}
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9.5",
                    borderRadius: "18px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.45)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backgroundColor: "#161B26",
                    "&:hover": {
                      "& .featured-bg-img": {
                        transform: "scale(1.04)",
                      },
                      "& .featured-play-btn": {
                        transform: "translate(-50%, -50%) scale(1.1)",
                        backgroundColor: "rgba(255,255,255,0.35)",
                      },
                    },
                  }}
                >
                  {/* Video Thumbnail Background */}
                  {featuredVideo?.image_link && (
                    <Box
                      component="img"
                      className="featured-bg-img"
                      src={featuredVideo.image_link}
                      alt={featuredVideo.title || "Featured video"}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.4s ease",
                      }}
                    />
                  )}

                  {/* Dark Gradient Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)",
                      zIndex: 1,
                    }}
                  />

                  {/* Top-Left Category Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      zIndex: 2,
                      backgroundColor: "#F59E0B",
                      color: "#000000",
                      borderRadius: "20px",
                      px: 1.5,
                      py: 0.4,
                      fontSize: "11px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {featuredVideo?.category?.toUpperCase() || "BITCOIN"}
                  </Box>

                  {/* Center Play Button Overlay */}
                  <Box
                    className="featured-play-btn"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.22)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255, 255, 255, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <PlayArrowRounded sx={{ color: "#FFFFFF", fontSize: "36px" }} />
                  </Box>

                  {/* Bottom Left Title */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      right: 80,
                      zIndex: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontSize: { xs: "15px", sm: "17px" },
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {featuredVideo?.title || "What is Bitcoin? Complete Guide for Beginners"}
                    </Typography>
                  </Box>

                  {/* Bottom Right Duration Pill */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: 16,
                      zIndex: 2,
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                      backdropFilter: "blur(4px)",
                      color: "#FFFFFF",
                      borderRadius: "6px",
                      px: 1,
                      py: 0.3,
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {getDuration(featuredVideo, 0)}
                  </Box>
                </Box>

                {/* Indicator Dots and Next Button */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 2,
                    px: 1,
                  }}
                >
                  {/* Dots */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {[0, 1, 2, 3].map((dotIdx) => {
                      const isActive = (featuredIndex % 4) === dotIdx;
                      return (
                        <Box
                          key={dotIdx}
                          onClick={() => setFeaturedIndex(dotIdx)}
                          sx={{
                            width: isActive ? 24 : 8,
                            height: 8,
                            borderRadius: "4px",
                            backgroundColor: isActive ? "#3772FF" : "rgba(255, 255, 255, 0.35)",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                        />
                      );
                    })}
                  </Box>

                  {/* Circular Next Button */}
                  <IconButton
                    onClick={handleNextFeatured}
                    size="small"
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      width: 34,
                      height: 34,
                      "&:hover": {
                        backgroundColor: "#F3F4F6",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <KeyboardArrowRight sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ========================================================
            2. VIDEO TUTORIALS / LATEST VIDEOS SECTION
            ======================================================== */}
        <Box sx={{ mb: 4 }}>
          {/* Section Heading */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "28px", sm: "34px", md: "38px" },
              letterSpacing: "-0.5px",
              color: isDarkMode ? "#FFFFFF" : "#141416",
              mb: 1,
              fontFamily: "var(--secondary-font, 'DM Sans', sans-serif)",
            }}
          >
            Video <span style={{ color: "#3772FF" }}>Tutorials</span>
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: isDarkMode ? "#B1B5C4" : "#777E90",
              fontSize: { xs: "14.5px", sm: "15.5px" },
              mb: 4,
            }}
          >
            Learn about blockchain, Bitcoin, Ethereum, altcoins and more with
            easy-to-follow video guides.
          </Typography>

          {/* Filter Tabs & Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
              mb: 4.5,
            }}
          >
            {/* Category Tabs */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                overflowX: "auto",
                maxWidth: { xs: "100%", md: "calc(100% - 300px)" },
                pb: { xs: 0.5, sm: 0 },
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedCategory === tab;
                return (
                  <Box
                    key={tab}
                    component="button"
                    type="button"
                    onClick={() => handleCategoryChange(tab)}
                    sx={{
                      backgroundColor: isActive
                        ? "#3772FF"
                        : isDarkMode
                        ? "#23262F"
                        : "#F4F5F6",
                      color: isActive
                        ? "#FFFFFF"
                        : isDarkMode
                        ? "#B1B5C4"
                        : "#777E90",
                      border: "none",
                      outline: "none",
                      borderRadius: "30px",
                      px: { xs: 2.2, sm: 2.8 },
                      py: 1,
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 500,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: isActive
                          ? "#255CE0"
                          : isDarkMode
                          ? "#353945"
                          : "#E6E8EC",
                        color: isActive
                          ? "#FFFFFF"
                          : isDarkMode
                          ? "#FFFFFF"
                          : "#141416",
                      },
                    }}
                  >
                    {tab}
                  </Box>
                );
              })}
            </Box>

            {/* Video Search Field */}
            <OutlinedInput
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search videos..."
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{
                      color: isDarkMode ? "#777E90" : "#B1B5C4",
                      fontSize: "20px",
                    }}
                  />
                </InputAdornment>
              }
              sx={{
                height: "42px",
                borderRadius: "30px",
                width: { xs: "100%", sm: "280px" },
                backgroundColor: isDarkMode ? "#23262F" : "#FFFFFF",
                color: isDarkMode ? "#FFFFFF" : "#141416",
                fontSize: "14px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.12)"
                    : "#E6E8EC",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.25)"
                    : "#B1B5C4",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3772FF",
                },
                "& input::placeholder": {
                  color: isDarkMode ? "#777E90" : "#9AA0A6",
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* ========================================================
              3. RESPONSIVE VIDEO CARDS GRID (3 DESKTOP, 2 TABLET, 1 MOBILE)
              ======================================================== */}
          <Grid container spacing={3.5}>
            {visibleVideos.map((item, index) => {
              const badgeStyle = getCategoryBadgeStyle(item.category);
              const duration = getDuration(item, index);
              const cleanDesc = getCleanDescription(item.description);
              const dateFormatted = getFormattedDate(item.created_at);

              return (
                <Grid item xs={12} sm={6} md={4} key={item.id || index}>
                  <Box
                    onClick={() => vidLink(item)}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "18px",
                      overflow: "hidden",
                      backgroundColor: isDarkMode ? "#1A1D24" : "#FFFFFF",
                      border: isDarkMode
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid #E6E8EC",
                      boxShadow: isDarkMode
                        ? "0 4px 20px rgba(0,0,0,0.3)"
                        : "0 4px 20px rgba(0,0,0,0.03)",
                      cursor: "pointer",
                      transition:
                        "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: isDarkMode
                          ? "0 16px 36px rgba(0,0,0,0.5)"
                          : "0 16px 36px rgba(0,0,0,0.08)",
                        borderColor: isDarkMode
                          ? "rgba(55,114,255,0.5)"
                          : "#3772FF",
                        "& .card-thumbnail-img": {
                          transform: "scale(1.05)",
                        },
                        "& .card-play-btn": {
                          transform: "translate(-50%, -50%) scale(1.1)",
                          backgroundColor: "rgba(55,114,255,0.85)",
                        },
                      },
                    }}
                  >
                    {/* Thumbnail Container */}
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 9",
                        overflow: "hidden",
                        backgroundColor: "#11141B",
                      }}
                    >
                      <Box
                        component="img"
                        className="card-thumbnail-img"
                        src={item.image_link}
                        alt={item.title || "Video thumbnail"}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.35s ease",
                        }}
                      />

                      {/* Category Badge */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          zIndex: 2,
                          backgroundColor: badgeStyle.bg,
                          color: badgeStyle.color,
                          borderRadius: "20px",
                          px: 1.5,
                          py: 0.4,
                          fontSize: "11px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                        }}
                      >
                        {item.category || "TUTORIAL"}
                      </Box>

                      {/* Play Button Overlay */}
                      <Box
                        className="card-play-btn"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 2,
                          width: 46,
                          height: 46,
                          borderRadius: "50%",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          backdropFilter: "blur(4px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.25s ease",
                        }}
                      >
                        <PlayArrowRounded
                          sx={{ color: "#FFFFFF", fontSize: "28px" }}
                        />
                      </Box>

                      {/* Duration Pill */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          right: 12,
                          zIndex: 2,
                          backgroundColor: "rgba(0, 0, 0, 0.75)",
                          backdropFilter: "blur(4px)",
                          color: "#FFFFFF",
                          borderRadius: "6px",
                          px: 1,
                          py: 0.3,
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {duration}
                      </Box>
                    </Box>

                    {/* Card Content */}
                    <Box
                      sx={{
                        p: 2.5,
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      {/* Title */}
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          fontSize: "16px",
                          lineHeight: 1.4,
                          color: isDarkMode ? "#FFFFFF" : "#141416",
                          mb: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: "44px",
                        }}
                      >
                        {item.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          color: isDarkMode ? "#8E92A4" : "#777E90",
                          fontSize: "13.5px",
                          lineHeight: 1.5,
                          mb: 2.2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          flexGrow: 1,
                          minHeight: "40px",
                        }}
                      >
                        {cleanDesc}
                      </Typography>

                      {/* Date Row */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.8,
                          color: isDarkMode ? "#777E90" : "#858584",
                          pt: 1.5,
                          borderTop: isDarkMode
                            ? "1px solid rgba(255,255,255,0.06)"
                            : "1px solid #F4F5F6",
                        }}
                      >
                        <CalendarTodayOutlined sx={{ fontSize: "14px" }} />
                        <Typography sx={{ fontSize: "12.5px", fontWeight: 500 }}>
                          {dateFormatted}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          {/* Empty Search/Filter State */}
          {visibleVideos.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                px: 3,
                backgroundColor: isDarkMode ? "#1A1D24" : "#F8FAFC",
                borderRadius: "20px",
                border: isDarkMode
                  ? "1px dashed rgba(255,255,255,0.12)"
                  : "1px dashed #E2E8F0",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                  color: isDarkMode ? "#FFFFFF" : "#141416",
                  mb: 1,
                }}
              >
                No videos found
              </Typography>
              <Typography
                sx={{
                  color: isDarkMode ? "#8E92A4" : "#777E90",
                  fontSize: "14px",
                  mb: 3,
                }}
              >
                We couldn't find any videos matching your category or search query.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                sx={{
                  borderRadius: "30px",
                  borderColor: "#3772FF",
                  color: "#3772FF",
                  textTransform: "capitalize",
                  "&:hover": {
                    borderColor: "#255CE0",
                    backgroundColor: "rgba(55,114,255,0.08)",
                  },
                }}
              >
                Reset Filters
              </Button>
            </Box>
          )}

          {/* ========================================================
              4. MORE VIDEOS BUTTON
              ======================================================== */}
          {visibleCount < filteredVideos.length && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}>
              <Button
                variant="contained"
                onClick={handleLoadMore}
                endIcon={<KeyboardArrowRight />}
                sx={{
                  backgroundColor: "#3772FF",
                  color: "#FFFFFF",
                  borderRadius: "50px",
                  px: 4.5,
                  py: 1.3,
                  fontWeight: 600,
                  fontSize: "15px",
                  textTransform: "capitalize",
                  boxShadow: "0 8px 20px rgba(55,114,255,0.3)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: "#255CE0",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 24px rgba(55,114,255,0.4)",
                  },
                }}
              >
                More Videos
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default LearnCypto;
