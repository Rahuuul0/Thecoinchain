import React, { useEffect, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../_common/app.constants";
import { Box, Container, Typography, Breadcrumbs, Grid } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { Link } from "react-router-dom";
import { useFooterActions } from "../../_actions";
import { PrivacyListAtom, switchDarkModeAtom } from "../../_state";
import { useRecoilValue } from "recoil";
import ReactHtmlParser from "react-html-parser";
import dayjs from "dayjs";

import HeroCryptoImg from "../../../public/assets/images/Privacy Policy.png";
import DocBadgeImg from "../../../public/assets/images/pr.png";

/**
 * Dynamically resolves icon and badge color palette based on definition term and dark mode state.
 */
const getDefinitionBadge = (term = "", isDarkMode = false) => {
  const lower = term.toLowerCase();
  if (lower.includes("personal")) {
    return {
      bg: isDarkMode ? "rgba(147, 51, 234, 0.2)" : "#F3E8FF",
      color: isDarkMode ? "#C084FC" : "#9333EA",
      icon: <PersonOutlineIcon sx={{ fontSize: 22 }} />,
    };
  }
  if (lower.includes("usage")) {
    return {
      bg: isDarkMode ? "rgba(2, 132, 199, 0.2)" : "#E0F2FE",
      color: isDarkMode ? "#38BDF8" : "#0284C7",
      icon: <BarChartOutlinedIcon sx={{ fontSize: 22 }} />,
    };
  }
  if (lower.includes("cookie")) {
    return {
      bg: isDarkMode ? "rgba(217, 119, 6, 0.2)" : "#FEF3C7",
      color: isDarkMode ? "#FBBF24" : "#D97706",
      icon: <CookieOutlinedIcon sx={{ fontSize: 22 }} />,
    };
  }
  if (lower.includes("controller")) {
    return {
      bg: isDarkMode ? "rgba(22, 163, 74, 0.2)" : "#DCFCE7",
      color: isDarkMode ? "#4ADE80" : "#16A34A",
      icon: <SettingsOutlinedIcon sx={{ fontSize: 22 }} />,
    };
  }
  if (lower.includes("processor") || lower.includes("provider")) {
    return {
      bg: isDarkMode ? "rgba(219, 39, 119, 0.2)" : "#FCE7F3",
      color: isDarkMode ? "#F472B6" : "#DB2777",
      icon: <GroupsOutlinedIcon sx={{ fontSize: 22 }} />,
    };
  }
  if (lower.includes("subject") || lower.includes("user")) {
    return {
      bg: isDarkMode ? "rgba(99, 102, 241, 0.2)" : "#EDE9FE",
      color: isDarkMode ? "#818CF8" : "#6366F1",
      icon: <ShieldOutlinedIcon sx={{ fontSize: 22 }} />,
    };
  }
  return {
    bg: isDarkMode ? "rgba(37, 99, 235, 0.2)" : "#EFF6FF",
    color: isDarkMode ? "#ffffffff" : "#3772ff",
    icon: <ArticleOutlinedIcon sx={{ fontSize: 22 }} />,
  };
};

/**
 * Parses dynamic HTML description into structured sections while preserving
 * 100% of the dynamic HTML content from the API.
 */
const parseHtmlSections = (htmlContent) => {
  if (!htmlContent) return [];

  // Split by <h3> tags while preserving section boundaries
  const rawSections = htmlContent
    .split(/(?=<h3>)/i)
    .filter((s) => s.trim().length > 0);

  if (rawSections.length === 0) {
    return [{ type: "raw", content: htmlContent }];
  }

  return rawSections.map((sec, idx) => {
    const headingMatch = sec.match(/<h3>(?:<strong>)?([\s\S]*?)(?:<\/strong>)?<\/h3>/i);
    if (!headingMatch) {
      return { type: "raw", content: sec };
    }

    const fullHeadingTag = headingMatch[0];
    const rawHeadingText = headingMatch[1].replace(/<[^>]+>/g, "").trim();
    let bodyHtml = sec.slice(fullHeadingTag.length).trim();

    let sectionTitle = rawHeadingText;
    let isIntro = false;

    // Detect if this is the introductory section
    if (rawHeadingText.toLowerCase().includes("operates the") || idx === 0) {
      sectionTitle = "Introduction";
      isIntro = true;
      // Retain the text from the heading inside the body so no content is omitted
      bodyHtml = `<p>${headingMatch[1].trim()}</p>` + bodyHtml;
    }

    // Check if this section represents definitions
    const isDefinitions = sectionTitle.toLowerCase().includes("definition");
    if (isDefinitions) {
      // Extract paragraphs inside definitions
      const pMatches = [...bodyHtml.matchAll(/<p>([\s\S]*?)<\/p>/gi)].map((m) =>
        m[1].trim()
      );

      // Pair terms with their explanations
      const rawDefs = [];
      for (let i = 0; i < pMatches.length; i += 2) {
        const term = pMatches[i];
        const defText = pMatches[i + 1] || "";
        if (term) {
          rawDefs.push({ term, defText });
        }
      }

      // If "Data Subject" and "User" are consecutive separate items, combine them to match reference card
      const defs = [];
      for (let i = 0; i < rawDefs.length; i++) {
        const current = rawDefs[i];
        const next = rawDefs[i + 1];
        if (
          current.term.toLowerCase().includes("data subject") &&
          next &&
          next.term.toLowerCase() === "user"
        ) {
          defs.push({
            term: "Data Subject / User",
            defText: `${current.defText} ${next.defText}`,
          });
          i++; // skip next since it's merged
        } else {
          defs.push(current);
        }
      }

      if (defs.length > 0) {
        return {
          type: "definitions",
          title: sectionTitle,
          defs,
          rawHtml: bodyHtml,
        };
      }
    }

    if (isIntro) {
      return {
        type: "intro",
        title: sectionTitle,
        content: bodyHtml,
      };
    }

    return {
      type: "standard",
      title: sectionTitle,
      content: bodyHtml,
    };
  });
};

const PrivacyPolicy = () => {
  const privacyActions = useFooterActions();
  const DisclaimersList = useRecoilValue(PrivacyListAtom);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);

  useEffect(() => {
    const response = privacyActions.PrivacyList();
    response.then((res) => {
      res;
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
  }, []);

  const breadcrumbs = [
    <Link
      to="/"
      key="1"
      style={{
        color: isDarkMode ? "#94A3B8" : "#64748B",
        textDecoration: "none",
        fontWeight: 500,
        fontSize: "0.875rem",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.target.style.color = isDarkMode ? "#60A5FA" : "#2563EB")
      }
      onMouseLeave={(e) =>
        (e.target.style.color = isDarkMode ? "#94A3B8" : "#64748B")
      }
    >
      Home
    </Link>,
    <Typography
      key="3"
      sx={{
        color: isDarkMode ? "#FFFFFF !important" : "#0F172A !important",
        fontWeight: 600,
        fontSize: "0.875rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      Privacy Policy
    </Typography>,
  ];

  // Extract updated_at or created_at if available in the dynamic response
  const lastUpdatedRaw = useMemo(() => {
    if (!DisclaimersList || DisclaimersList.length === 0) return null;
    const item = DisclaimersList[0];
    return item?.updated_at || item?.created_at || null;
  }, [DisclaimersList]);

  const formattedDate = useMemo(() => {
    if (!lastUpdatedRaw) return null;
    const parsed = dayjs(lastUpdatedRaw);
    return parsed.isValid() ? parsed.format("MMMM D, YYYY") : null;
  }, [lastUpdatedRaw]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        className="subscription-wrapper bredcrum-div"
        sx={{
          mt: { xs: 8, md: 10 },
          pb: 12,
          backgroundColor: isDarkMode ? "#0E1015" : "#F8FAFC",
          color: isDarkMode ? "#F1F5F9" : "#334155",
          minHeight: "100vh",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          {/* Breadcrumb Navigation */}
          <Box
            className="right-breadcrum ol"
            sx={{
              py: 2.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <Breadcrumbs
                separator={
                  <NavigateNext
                    fontSize="small"
                    sx={{
                      color: isDarkMode ? "#64748B" : "#94A3B8",
                      fontSize: "1.1rem",
                    }}
                  />
                }
                aria-label="breadcrumb"
                className="center-breadcrum"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Box>
          </Box>

          {/* Hero Section */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: { xs: "20px", md: "28px" },
              background: isDarkMode
                ? "radial-gradient(ellipse at 85% 35%, rgba(59, 130, 246, 0.18) 0%, rgba(139, 92, 246, 0.12) 40%, rgba(15, 23, 42, 0.2) 75%), linear-gradient(135deg, #151824 0%, #12141F 50%, #161526 100%)"
                : "linear-gradient(135deg, #fff4c0 0%, #ffffff 45%, #fff3bb 100%)",
              border: isDarkMode
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid #E2E8F0",
              p: { xs: 3, sm: 4, md: 6 },
              mb: 4,
              boxShadow: isDarkMode
                ? "0 4px 24px rgba(0, 0, 0, 0.4)"
                : "0 4px 24px rgba(0, 0, 0, 0.02)",
            }}
          >
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="space-between"
            >
              {/* Left Column: Heading, Subtitle & Last Updated */}
              <Grid item xs={12} md={6.5}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.75rem" },
                    fontWeight: '600 !important',
                    color: isDarkMode ? "#FFFFFF" : "#0F172A",
                    letterSpacing: "-0.025em",
                    mb: 2,
                  }}
                >
                  Privacy{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#EAB308",
                    }}
                  >
                    Policy
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
                    color: isDarkMode ? "#94A3B8" : "#475569",
                    lineHeight: 1.65,
                    maxWidth: "540px",
                    mb: formattedDate ? 2.5 : 0,
                  }}
                >
                  Your privacy is important to us. This Privacy Policy explains
                  how we collect, use, and protect your personal information
                  when you visit The Coin Chain.
                </Typography>

                {formattedDate && (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 0.8,
                      borderRadius: "20px",
                      background: isDarkMode
                        ? "rgba(30, 41, 59, 0.75)"
                        : "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      border: isDarkMode
                        ? "1px solid rgba(255, 255, 255, 0.12)"
                        : "1px solid #CBD5E1",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    <CalendarTodayOutlinedIcon
                      sx={{
                        fontSize: 16,
                        color: isDarkMode ? "#ffffffff" : "#3772ff",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: 1.20,
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        color: isDarkMode ? "#E2E8F0" : "#1E293B",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Last Updated: {formattedDate}
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* Right Column: 3D Crypto Security Visual */}
              <Grid
                item
                xs={12}
                md={5.5}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={HeroCryptoImg}
                  alt="The Coin Chain Privacy Protection"
                  sx={{
                    width: "100%",
                    maxWidth: { xs: 340, sm: 440, md: 520 },
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "20px",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 92% 92% at 50% 50%, black 72%, transparent 100%)",
                    maskImage:
                      "radial-gradient(ellipse 92% 92% at 50% 50%, black 72%, transparent 100%)",
                    filter: isDarkMode
                      ? "drop-shadow(0 12px 28px rgba(59, 130, 246, 0.25))"
                      : "drop-shadow(0 12px 28px rgba(37, 99, 235, 0.12))",
                    transition: "transform 0.4s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Commitment / Trust Section */}
          <Box
            sx={{
              borderRadius: "20px",
              background: isDarkMode
                ? "linear-gradient(135deg, #151924 0%, #181C29 100%)"
                : "linear-gradient(135deg, #EEF4FD 0%, #F3F5FC 100%)",
              border: isDarkMode
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid #E0EAFF",
              p: { xs: 2.5, sm: 3, md: 3.5 },
              mb: 5,
              boxShadow: isDarkMode
                ? "0 4px 16px rgba(0, 0, 0, 0.2)"
                : "none",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              {/* Our Commitment */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      minWidth: 48,
                      borderRadius: "50%",
                      bgcolor: isDarkMode
                        ? "rgba(37, 99, 235, 0.2)"
                        : "#DBEAFE",
                      color: isDarkMode ? "#ffffffff" : "#3772ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArticleOutlinedIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.125rem",
                        color: isDarkMode ? "#FFFFFF" : "#0F172A",
                        mb: 0.5,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Our Commitment
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: isDarkMode ? "#94A3B8" : "#475569",
                        lineHeight: 1.55,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      We are committed to protecting your personal data and being
                      transparent about how we handle your information.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Your Trust Matters */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  borderLeft: {
                    md: isDarkMode
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid #D8E2F0",
                  },
                  pt: { xs: 2, md: 0 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      minWidth: 48,
                      borderRadius: "50%",
                      bgcolor: isDarkMode
                        ? "rgba(37, 99, 235, 0.2)"
                        : "#DBEAFE",
                      color: isDarkMode ? "#ffffffff" : "#3772ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleAltOutlinedIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.125rem",
                        color: isDarkMode ? "#FFFFFF" : "#0F172A",
                        mb: 0.5,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Your Trust Matters
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: isDarkMode ? "#94A3B8" : "#475569",
                        lineHeight: 1.55,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      We use your data only to provide and improve our services,
                      and we never sell your personal information.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Dynamic Privacy Policy Content from API */}
          {DisclaimersList?.map((items, itemIndex) => {
            let title = items.title;
            let description = items.description;

            const sections = parseHtmlSections(description);

            return (
              <Box key={items.id || itemIndex} sx={{ mb: 6 }}>
                {/* Fallback if no sections or single raw section */}
                {sections.length === 1 && sections[0].type === "raw" ? (
                  <Box sx={{ mb: 5 }}>
                    <Box sx={{ mb: 2.5 }}>
                      <Typography
                        component="h2"
                        sx={{
                          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                          color: isDarkMode ? "#FFFFFF" : "#0F172A",
                          letterSpacing: "-0.01em",
                          fontFamily: "'Poppins', sans-serif",
                          mb: 1,
                        }}
                      >
                        {title}
                      </Typography>
                      <Box
                        sx={{
                          width: 48,
                          height: 4,
                          borderRadius: "2px",
                          background:
                            "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
                        }}
                      />
                    </Box>
                    <Box
                      className="privacy-policy-body"
                      sx={{
                        color: isDarkMode ? "#CBD5E1" : "#334155",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.75,
                        "& p": {
                          mb: 2,
                          color: isDarkMode ? "#CBD5E1" : "#334155",
                          lineHeight: 1.75,
                        },
                        "& a": {
                          color: isDarkMode ? "#ffffffff" : "#3772ff",
                          textDecoration: "none",
                          fontWeight: 500,
                          "&:hover": {
                            textDecoration: "underline",
                            color: isDarkMode ? "#93C5FD" : "#1D4ED8",
                          },
                        },
                        "& strong, & b": {
                          color: isDarkMode ? "#FFFFFF" : "#0F172A",
                          fontWeight: 600,
                        },
                      }}
                    >
                      {ReactHtmlParser(description)}
                    </Box>
                  </Box>
                ) : (
                  sections.map((section, secIdx) => {
                    // 1. Introduction Section (Two-column layout with 3D Doc Badge)
                    if (section.type === "intro") {
                      return (
                        <Box key={secIdx} sx={{ mb: 6 }}>
                          <Box sx={{ mb: 2.5 }}>
                            <Typography
                              component="h2"
                              sx={{
                                fontSize: {
                                  xs: "1.75rem",
                                  sm: "2rem",
                                  md: "2.25rem",
                                },
                                fontWeight: 800,
                                color: isDarkMode ? "#FFFFFF" : "#0F172A",
                                letterSpacing: "-0.01em",
                                fontFamily: "'Poppins', sans-serif",
                                mb: 1,
                              }}
                            >
                              {section.title}
                            </Typography>
                            <Box
                              sx={{
                                width: 48,
                                height: 4,
                                borderRadius: "2px",
                                background: isDarkMode ? "linear-gradient(90deg, #b9c7ffff 0%, #ffffffff 100%)" : "linear-gradient(90deg, #3772ff 0%, #0435a8ff 100%)",
                              }}
                            />
                          </Box>

                          <Grid
                            container
                            spacing={4}
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Grid item xs={12} md={8}>
                              <Box
                                className="privacy-policy-body"
                                sx={{
                                  color: isDarkMode ? "#CBD5E1" : "#334155",
                                  fontFamily: "'Poppins', sans-serif",
                                  fontSize: "0.95rem",
                                  lineHeight: 1.75,
                                  "& p": {
                                    mb: 2,
                                    color: isDarkMode ? "#CBD5E1" : "#334155",
                                    lineHeight: 1.75,
                                  },
                                  "& a": {
                                    color: isDarkMode ? "#ffffffff" : "#3772ff",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    "&:hover": {
                                      textDecoration: "underline",
                                      color: isDarkMode ? "#93C5FD" : "#1D4ED8",
                                    },
                                  },
                                  "& strong, & b": {
                                    color: isDarkMode ? "#FFFFFF" : "#0F172A",
                                    fontWeight: 600,
                                  },
                                }}
                              >
                                {ReactHtmlParser(section.content)}
                              </Box>
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              md={4}
                              sx={{
                                display: { xs: "none", sm: "flex" },
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                component="img"
                                src={DocBadgeImg}
                                alt="Policy Document"
                                sx={{
                                  width: "100%",
                                  maxWidth: 270,
                                  height: "auto",
                                  objectFit: "contain",
                                  borderRadius: "16px",
                                  bgcolor: isDarkMode
                                    ? "rgba(255, 255, 255, 0.04)"
                                    : "transparent",
                                  p: isDarkMode ? 1.5 : 0,
                                  border: isDarkMode
                                    ? "1px solid rgba(255, 255, 255, 0.08)"
                                    : "none",
                                  mixBlendMode: isDarkMode
                                    ? "normal"
                                    : "multiply",
                                  filter: isDarkMode
                                    ? "drop-shadow(0 12px 24px rgba(59, 130, 246, 0.2))"
                                    : "drop-shadow(0 12px 24px rgba(37, 99, 235, 0.12))",
                                  transition: "transform 0.3s ease",
                                  "&:hover": {
                                    transform: "translateY(-4px)",
                                  },
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    }

                    // 2. Definitions Section (Clean Cards Grid)
                    if (section.type === "definitions") {
                      return (
                        <Box key={secIdx} sx={{ mb: 6 }}>
                          <Box sx={{ mb: 2.5 }}>
                            <Typography
                              component="h2"
                              sx={{
                                fontSize: {
                                  xs: "1.75rem",
                                  sm: "2rem",
                                  md: "2.25rem",
                                },
                                fontWeight: 800,
                                color: isDarkMode ? "#FFFFFF" : "#0F172A",
                                letterSpacing: "-0.01em",
                                fontFamily: "'Poppins', sans-serif",
                                mb: 1,
                              }}
                            >
                              {section.title}
                            </Typography>
                            <Box
                              sx={{
                                width: 48,
                                height: 4,
                                borderRadius: "2px",
                                background:
                                  "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
                              }}
                            />
                          </Box>

                          <Grid container spacing={2.5}>
                            {section.defs.map((def, defIdx) => {
                              const badge = getDefinitionBadge(
                                def.term,
                                isDarkMode
                              );
                              return (
                                <Grid item xs={12} sm={6} md={4} key={defIdx}>
                                  <Box
                                    sx={{
                                      p: 2.5,
                                      borderRadius: "16px",
                                      background: isDarkMode
                                        ? "#161922"
                                        : "#FFFFFF",
                                      border: isDarkMode
                                        ? "1px solid rgba(255, 255, 255, 0.08)"
                                        : "1px solid #E2E8F0",
                                      boxShadow: isDarkMode
                                        ? "0 4px 16px rgba(0, 0, 0, 0.25)"
                                        : "0 2px 10px rgba(0, 0, 0, 0.02)",
                                      display: "flex",
                                      gap: 2,
                                      alignItems: "flex-start",
                                      height: "100%",
                                      transition: "all 0.25s ease",
                                      "&:hover": {
                                        boxShadow: isDarkMode
                                          ? "0 8px 24px rgba(59, 130, 246, 0.2)"
                                          : "0 8px 24px rgba(37, 99, 235, 0.08)",
                                        borderColor: isDarkMode
                                          ? "rgba(59, 130, 246, 0.5)"
                                          : "#BFDBFE",
                                        transform: "translateY(-2px)",
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 44,
                                        height: 44,
                                        minWidth: 44,
                                        borderRadius: "50%",
                                        bgcolor: badge.bg,
                                        color: badge.color,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {badge.icon}
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                      <Typography
                                        sx={{
                                          fontWeight: 700,
                                          fontSize: "1rem",
                                          color: isDarkMode
                                            ? "#FFFFFF"
                                            : "#0F172A",
                                          mb: 0.75,
                                          fontFamily: "'Poppins', sans-serif",
                                        }}
                                      >
                                        {ReactHtmlParser(def.term)}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: "0.875rem",
                                          color: isDarkMode
                                            ? "#94A3B8"
                                            : "#475569",
                                          lineHeight: 1.6,
                                          fontFamily: "'Poppins', sans-serif",
                                        }}
                                      >
                                        {ReactHtmlParser(def.defText)}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Box>
                      );
                    }

                    // 3. Other Standard Sections (e.g. Information Collection and Use)
                    return (
                      <Box key={secIdx} sx={{ mb: 6 }}>
                        <Box sx={{ mb: 2.5 }}>
                          <Typography
                            component="h2"
                            sx={{
                              fontSize: {
                                xs: "1.75rem",
                                sm: "2rem",
                                md: "2.25rem",
                              },
                              fontWeight: 800,
                              color: isDarkMode ? "#FFFFFF" : "#0F172A",
                              letterSpacing: "-0.01em",
                              fontFamily: "'Poppins', sans-serif",
                              mb: 1,
                            }}
                          >
                            {section.title}
                          </Typography>
                          <Box
                            sx={{
                              width: 48,
                              height: 4,
                              borderRadius: "2px",
                              background:
                                "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)",
                            }}
                          />
                        </Box>

                        <Box
                          className="privacy-policy-body"
                          sx={{
                            color: isDarkMode ? "#CBD5E1" : "#334155",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "0.95rem",
                            lineHeight: 1.75,
                            "& p": {
                              mb: 2,
                              color: isDarkMode ? "#CBD5E1" : "#334155",
                              lineHeight: 1.75,
                            },
                            "& a": {
                              color: isDarkMode ? "#ffffffff" : "#3772ff",
                              textDecoration: "none",
                              fontWeight: 500,
                              "&:hover": {
                                textDecoration: "underline",
                                color: isDarkMode ? "#93C5FD" : "#1D4ED8",
                              },
                            },
                            "& strong, & b": {
                              color: isDarkMode ? "#FFFFFF" : "#0F172A",
                              fontWeight: 600,
                            },
                            "& ul, & ol": {
                              pl: 3,
                              mb: 2,
                            },
                            "& li": {
                              mb: 0.75,
                              lineHeight: 1.6,
                              color: isDarkMode ? "#CBD5E1" : "#334155",
                            },
                          }}
                        >
                          {ReactHtmlParser(section.content)}
                        </Box>
                      </Box>
                    );
                  })
                )}
              </Box>
            );
          })}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PrivacyPolicy;
