import React, { useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { switchDarkModeAtom, latestNewsAtom } from "../../../../_state";
import { Apis, RoutesName } from "../../../../_common/app.constants";
import { useFetchWrapper } from "../../../../_helpers";

dayjs.extend(utc);

const getNewsItems = (response) => {
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.data?.data)) return response.data.data;
    if (Array.isArray(response?.results)) return response.results;
    if (Array.isArray(response)) return response;
    return [];
};

const stripHtml = (html = "") => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").trim();
};

const slugify = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .split(/\s+/)
        .slice(0, 6)
        .join("-");

const HomePageCryptoNews = ({
    isDarkMode: isDarkModeProp,
    title = "Crypto News: Raiffeisen Expands Crypto Access With Bitpanda Across Europe",
    description = "Key Insights Crypto news: Raiffeisen plans to offer digital asset purchases to about 18 million customers across Central and Eastern Europe. Bitpanda will provide infrastructure as individual Raiffeisen network banks determine their local digital asset offerings. The partnership follows an earlier Bitpanda integration with Raiffeisenlandesbank Niederösterreich-Wien in Austria. Raiffeisen Bank International has partnered",
    author = "Glory Kaburu",
    date = "September 24, 2026 12:30 AM EDT",
}) => {
    const navigate = useNavigate();
    const fetchWrapper = useFetchWrapper();
    const recoilDarkMode = useRecoilValue(switchDarkModeAtom);
    const isDarkMode = isDarkModeProp !== undefined ? isDarkModeProp : recoilDarkMode;

    const [latestNews, setLatestNews] = useRecoilState(latestNewsAtom);

    useEffect(() => {
        if (!latestNews || latestNews.length === 0) {
            const fetchLatestNews = async () => {
                try {
                    const response = await fetchWrapper.get(Apis.All_Content("latest_news"));
                    const items = getNewsItems(response);
                    if (items && items.length > 0) {
                        setLatestNews(items);
                    }
                } catch (error) {
                    console.error("Unable to fetch latest news in HomePageCryptoNews:", error);
                }
            };
            fetchLatestNews();
        }
    }, [latestNews, setLatestNews, fetchWrapper]);

    const activeNews = latestNews?.[0];

    const displayTitle = activeNews?.title || title;
    const displayDescription = activeNews ? stripHtml(activeNews.description) : description;
    const displayAuthor =
        activeNews?.profile?.profile_name?.trim() ||
        activeNews?.author?.trim() ||
        activeNews?.author_name?.trim() ||
        author;

    const displayDate =
        activeNews?.created_at && dayjs(activeNews.created_at).isValid()
            ? dayjs(activeNews.created_at).format("MMMM DD, YYYY hh:mm A")
            : date;

    const handleNewsClick = () => {
        if (activeNews?.id) {
            const slug = slugify(activeNews.title || "");
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
        </Grid>
    );
};

export default HomePageCryptoNews;