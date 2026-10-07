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
import { PrivacyListAtom } from "../../_state";
import { useRecoilValue } from "recoil";
import ReactHtmlParser from "react-html-parser";
import dayjs from "dayjs";

import HeroCryptoImg from "../../../public/assets/images/privacy-hero-crypto.jpg";
import DocBadgeImg from "../../../public/assets/images/privacy-doc-badge.jpg";

/**
 * Helper to determine badge icon and palette dynamically for definition items.
 */
const getDefinitionBadge = (term = "") => {
  const lower = term.toLowerCase();
  if (lower.includes("personal")) {
    return {
      bg: "#F3E8FF",
      color: "#9333EA",
      icon: <PersonOutlineIcon sx={{ fontSize: 22 }} />,
    };
  }
  if (lower.includes("usage")) {
    return {
      bg: "#E0F2FE",
      color: "#0284C7",
      icon: <BarChartOutlinedIcon sx={{ fontSize: 22 }} />,
    };
  }
  if (lower.includes("cookie")) {
    return {
      bg: "#FEF3C7",
      color: "#D97706",
      icon: <CookieOutlinedIcon sx={{ fontSize: 22 }} />,
    };
  }
  if (lower.includes("controller")) {
    return {
      bg: "#DCFCE7",
      color: "#16A34A",
      icon: <SettingsOutlinedIcon sx={{ fontSize: 22 }} />,
    };
  }
  if (lower.includes("processor") || lower.includes("provider")) {
    return {
      bg: "#FCE7F3",
      color: "#DB2777",
      icon: <GroupsOutlinedIcon sx={{ fontSize: 22 }} />,
    };
  }
  if (lower.includes("subject") || lower.includes("user")) {
    return {
      bg: "#EDE9FE",
      color: "#6366F1",
      icon: <ShieldOutlinedIcon sx={{ fontSize: 22 }} />,
    };
  }
  return {
    bg: "#EFF6FF",
    color: "#2563EB",
    icon: <ArticleOutlinedIcon sx={{ fontSize: 22 }} />,
  };
};

/**
 * Parses dynamic HTML description into structured sections (Introduction, Definitions, etc.)
 * while maintaining 100% dynamic content compatibility and preserving original HTML tags.
 */
const parseHtmlSections = (htmlContent) => {
  if (!htmlContent) return [];

  // Split by <h3> tags while preserving delimiters
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

    // Detect if this is the introductory section (often includes "operates the" or first heading)
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
      const defs = [];
      for (let i = 0; i < pMatches.length; i += 2) {
        const term = pMatches[i];
        const defText = pMatches[i + 1] || "";
        if (term) {
          defs.push({ term, defText });
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
        color: "#64748B",
        textDecoration: "none",
        fontWeight: 500,
        fontSize: "0.875rem",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#2563EB")}
      onMouseLeave={(e) => (e.target.style.color = "#64748B")}
    >
      Home
    </Link>,
    <Typography
      key="3"
      sx={{
        color: "#0F172A",
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
        className="extra-wrapper subscription-wrapper bredcrum-div"
        sx={{
          mt: { xs: 8, md: 10 },
          pb: 10,
          backgroundColor: "#FAFCFF",
          minHeight: "100vh",
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
            <Box className="about-bread">
              <Breadcrumbs
                separator={
                  <NavigateNext
                    fontSize="small"
                    sx={{ color: "#94A3B8", fontSize: "1.1rem" }}
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
              background:
                "radial-gradient(ellipse at 85% 35%, rgba(219, 234, 254, 0.6) 0%, rgba(243, 232, 255, 0.4) 35%, rgba(248, 250, 252, 0.1) 70%), linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
              border: "1px solid #E2E8F0",
              p: { xs: 3, sm: 4, md: 6 },
              mb: 4,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
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
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.75rem" },
                    fontWeight: 800,
                    lineHeight: 1.15,
                    color: "#0F172A",
                    letterSpacing: "-0.025em",
                    mb: 2,
                  }}
                >
                  Privacy{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#2563EB",
                      background:
                        "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Policy
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
                    color: "#475569",
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
                      background: "rgba(255, 255, 255, 0.85)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <CalendarTodayOutlinedIcon
                      sx={{ fontSize: 16, color: "#3B82F6" }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: "#1E293B",
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
                    maxWidth: { xs: 340, sm: 440, md: 500 },
                    height: "auto",
                    objectFit: "contain",
                    filter: "drop-shadow(0 16px 32px rgba(37, 99, 235, 0.12))",
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
              background: "linear-gradient(135deg, #F0F6FF 0%, #F5F3FF 100%)",
              border: "1px solid #E0EAFF",
              p: { xs: 2.5, sm: 3, md: 3.5 },
              mb: 5,
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
                      bgcolor: "#DBEAFE",
                      color: "#2563EB",
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
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        color: "#0F172A",
                        mb: 0.5,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Our Commitment
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#475569",
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
                  borderLeft: { md: "1px solid #E0EAFF" },
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
                      bgcolor: "#DBEAFE",
                      color: "#2563EB",
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
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        color: "#0F172A",
                        mb: 0.5,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Your Trust Matters
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: "#475569",
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
                          fontWeight: 800,
                          color: "#0F172A",
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
                            "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
                        }}
                      />
                    </Box>
                    <Box
                      className="privacy-policy-body"
                      sx={{
                        color: "#334155",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.75,
                        "& p": { mb: 2, color: "#334155", lineHeight: 1.75 },
                        "& a": {
                          color: "#2563EB",
                          textDecoration: "none",
                          fontWeight: 500,
                          "&:hover": { textDecoration: "underline" },
                        },
                        "& strong, & b": {
                          color: "#0F172A",
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
                                color: "#0F172A",
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
                                  "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
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
                                  color: "#334155",
                                  fontFamily: "'Poppins', sans-serif",
                                  fontSize: "0.95rem",
                                  lineHeight: 1.75,
                                  "& p": {
                                    mb: 2,
                                    color: "#334155",
                                    lineHeight: 1.75,
                                  },
                                  "& a": {
                                    color: "#2563EB",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    "&:hover": { textDecoration: "underline" },
                                  },
                                  "& strong, & b": {
                                    color: "#0F172A",
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
                                  maxWidth: 220,
                                  height: "auto",
                                  objectFit: "contain",
                                  filter:
                                    "drop-shadow(0 12px 24px rgba(37, 99, 235, 0.12))",
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
                                color: "#0F172A",
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
                                  "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
                              }}
                            />
                          </Box>

                          <Grid container spacing={2.5}>
                            {section.defs.map((def, defIdx) => {
                              const badge = getDefinitionBadge(def.term);
                              return (
                                <Grid item xs={12} sm={6} md={4} key={defIdx}>
                                  <Box
                                    sx={{
                                      p: 2.5,
                                      borderRadius: "16px",
                                      background: "#FFFFFF",
                                      border: "1px solid #E2E8F0",
                                      boxShadow:
                                        "0 2px 10px rgba(0, 0, 0, 0.02)",
                                      display: "flex",
                                      gap: 2,
                                      alignItems: "flex-start",
                                      height: "100%",
                                      transition: "all 0.25s ease",
                                      "&:hover": {
                                        boxShadow:
                                          "0 8px 24px rgba(37, 99, 235, 0.08)",
                                        borderColor: "#BFDBFE",
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
                                          color: "#0F172A",
                                          mb: 0.75,
                                          fontFamily: "'Poppins', sans-serif",
                                        }}
                                      >
                                        {ReactHtmlParser(def.term)}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: "0.875rem",
                                          color: "#475569",
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
                              color: "#0F172A",
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
                                "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
                            }}
                          />
                        </Box>

                        <Box
                          className="privacy-policy-body"
                          sx={{
                            color: "#334155",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "0.95rem",
                            lineHeight: 1.75,
                            "& p": {
                              mb: 2,
                              color: "#334155",
                              lineHeight: 1.75,
                            },
                            "& a": {
                              color: "#2563EB",
                              textDecoration: "none",
                              fontWeight: 500,
                              "&:hover": { textDecoration: "underline" },
                            },
                            "& strong, & b": {
                              color: "#0F172A",
                              fontWeight: 600,
                            },
                            "& ul, & ol": {
                              pl: 3,
                              mb: 2,
                            },
                            "& li": {
                              mb: 0.75,
                              lineHeight: 1.6,
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
