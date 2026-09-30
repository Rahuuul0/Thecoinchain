import React from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { switchDarkModeAtom, TrendingNewsAtom } from "../../../../_state";
import { RoutesName } from "../../../../_common/app.constants";

dayjs.extend(utc);

const stripHtml = (html = "") => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").trim();
};

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

const HomePageCryptoNews = ({
    isDarkMode: isDarkModeProp,
    title = "",
    description = "",
    author = "",
    date = "",
}) => {
    const navigate = useNavigate();
    const recoilDarkMode = useRecoilValue(switchDarkModeAtom);
    const isDarkMode = isDarkModeProp !== undefined ? isDarkModeProp : recoilDarkMode;

    // API call MuiLatestNewsDashboardSection se ho rahi hai, yahan sirf Atom se data read hoga
    const latestNews = useRecoilValue(TrendingNewsAtom);
    const activeNews = latestNews?.[0];

    const displayTitle = activeNews?.title || title;
    const displayDescription = activeNews ? stripHtml(activeNews.description) : description;
    const displayAuthor =
        activeNews?.profile?.profile_name?.trim() ||
        activeNews?.author?.trim() ||
        activeNews?.author_name?.trim() ||
        author;

    const localCreatedAt = typeof activeNews?.created_at === 'string'
        ? activeNews.created_at.replace(/Z$/i, '')
        : activeNews?.created_at;
    const displayDate =
        localCreatedAt && dayjs(localCreatedAt).isValid()
            ? dayjs(localCreatedAt).format("MMMM DD, YYYY hh:mm A")
            : date;

    const handleNewsClick = () => {
        if (activeNews?.id) {
            const slug = activeNews.slug && String(activeNews.slug).trim()
                ? slugify(String(activeNews.slug), false)
                : slugify(activeNews.title || "", true);
            sessionStorage.setItem(`blog_id_${slug}`, String(activeNews.id));
            localStorage.setItem(`blog_id_${slug}`, String(activeNews.id));
            navigate(
                RoutesName.Blog_Detail.replace(":slug", slug),
                { state: { id: activeNews.id } }
            );
        }
    };

    return (
        <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
                paddingRight: { xs: "0px", md: "40px" },
            }}
        >
            {!activeNews ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: { xs: "180px", md: "240px" },
                        width: "100%",
                    }}
                >
                    <CircularProgress size={40} sx={{ color: "#3772ff" }} />
                </Box>
            ) : (
                <>
                    <Typography
                        variant="h1"
                        component="h1"
                        className="hero-heading"
                        onClick={activeNews?.id ? handleNewsClick : undefined}
                        sx={{
                            color: isDarkMode ? "#FFFFFF !important" : "#141416 !important",
                            fontSize: { xs: "28px !important", sm: "28px !important", md: "35px !important" },
                            fontWeight: "700 !important",
                            lineHeight: 1.15,
                            fontFamily: "var(--secondary-font) !important",
                            mb: 2,
                            cursor: activeNews?.id ? "pointer" : "default",
                            "&:hover": activeNews?.id ? { color: "#3772ff !important" } : {},
                            transition: "color 0.2s ease-in-out",
                        }}
                    >
                        Crypto News: {displayTitle}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        className="hero-para primary-font"
                        sx={{
                            color: isDarkMode
                                ? "#ffffff !important"
                                : "#0e0e0e !important",
                            fontSize: { xs: "14px", sm: "16px" },
                            lineHeight: 1.6,
                            marginBottom: { xs: "15px", md: "24px" },
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                        }}
                    >
                        {displayDescription}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: { xs: 2, sm: 4 },
                            mb: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            {displayAuthor && (
                                <Typography
                                    sx={{
                                        backgroundColor: "#c5c5c5",
                                        color: isDarkMode
                                            ? "#0e0e0e !important"
                                            : "#0e0e0e !important",
                                        fontSize: "12px !important",
                                        fontWeight: 500,
                                        textTransform: "uppercase",
                                        padding: "6px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    {displayAuthor}
                                </Typography>
                            )}

                            {displayDate && (
                                <Typography
                                    sx={{
                                        backgroundColor: "#c5c5c5",
                                        color: isDarkMode
                                            ? "#0e0e0e !important"
                                            : "#0e0e0e !important",
                                        fontSize: "12px !important",
                                        fontWeight: 500,
                                        textTransform: "uppercase",
                                        padding: "6px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    {displayDate}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </>
            )}
        </Grid>
    );
};

export default HomePageCryptoNews;