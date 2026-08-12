import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Chip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Apis, RoutesName } from '../../../_common/app.constants';
import { useFetchWrapper } from '../../../_helpers';
import { useRecoilValue } from 'recoil';
import { switchDarkModeAtom } from '../../../_state';
import { Helmet } from 'react-helmet-async';

const getNewsItems = (response) => {
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.data?.data)) return response.data.data;
    if (Array.isArray(response?.results)) return response.results;
    if (Array.isArray(response)) return response;
    return [];
};

const MuiShortNewsDashboardSection = () => {
    const navigate = useNavigate();
    const fetchWrapper = useFetchWrapper();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const isDarkMode = useRecoilValue(switchDarkModeAtom);

    useEffect(() => {
        const fetchShortNews = async () => {
            try {
                // NOTE: adjust the content-type key below to whatever your API uses
                // for "short news" if it differs from 'short_news'.
                const response = await fetchWrapper.get(Apis.All_Content('latest_news'));
                setNews(getNewsItems(response));
            } catch (error) {
                console.error('Unable to fetch short news:', error);
                setNews([]);
            } finally {
                setLoading(false);
            }
        };

        fetchShortNews();
    }, []);

    const slugify = (text = '') =>
        text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .split(/\s+/)
            .slice(0, 6)
            .join('-');

    const openDetail = (id, title) => {
        if (id !== undefined && id !== null) {
            navigate(
                RoutesName.Blog_Detail
                    .replace(':id', String(id))
                    .replace(':slug', slugify(title))
            );
        }
    };

    return (
        <>
            <Helmet>
                <title>Short News | CoinGuru</title>
                <meta
                    name="description"
                    content="Quick-hit cryptocurrency updates, Bitcoin news, blockchain headlines, and market bites on CoinGuru."
                />
                <meta
                    name="keywords"
                    content="short crypto news, bitcoin news, blockchain headlines, quick crypto updates"
                />
                <link rel="canonical" href={window.location.href} />
                <meta property="og:title" content="Short News | CoinGuru" />
                <meta
                    property="og:description"
                    content="Quick-hit cryptocurrency updates, Bitcoin news, and blockchain headlines."
                />
                <meta property="og:url" content={window.location.href} />
            </Helmet>

            <Card
                sx={{
                    maxWidth: 460,
                    mx: 'auto',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    bgcolor: isDarkMode ? '#1b1b1f' : '#ffffff',
                    border: isDarkMode ? '1px solid #2b2b30' : '1px solid #ececec',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
            >
                {/* Header marquee banner */}
                <Box
                    sx={{
                        background: isDarkMode
                            ? 'linear-gradient(90deg, rgb(0 72 100) 0%, rgb(19 55 94) 51%)'
                            : 'linear-gradient(90deg, rgb(24, 34, 53) 0%, rgb(19 55 94) 51%)',
                        py: 1.4,
                        overflow: 'hidden',
                        position: 'relative',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            animation: 'shortNewsMarquee 14s linear infinite',
                            '@keyframes shortNewsMarquee': {
                                '0%': { transform: 'translateX(0)' },
                                '100%': { transform: 'translateX(-50%)' },
                            },
                            '@media (prefers-reduced-motion: reduce)': {
                                animation: 'none',
                            },
                        }}
                    >
                        {[0, 1].map((repeatIndex) => (
                            <Box key={repeatIndex} sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Typography
                                        key={i}
                                        component="span"
                                        sx={{
                                            color: '#fff',
                                            fontWeight: 700,
                                            fontSize: 13,
                                            letterSpacing: 0.6,
                                            px: 1.5,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        PRICE PREDICTION NEWS <Box component="span" sx={{ mx: 1.2 }}>•</Box>
                                    </Typography>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Scrollable timeline list */}
                <Box
                    sx={{
                        maxHeight: 430,
                        overflowY: 'auto',
                        px: 2.5,
                        py: 1,
                        '&::-webkit-scrollbar': { width: 6 },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': {
                            background: isDarkMode ? '#555' : '#cfcfcf',
                            borderRadius: 4,
                        },
                    }}
                >
                    {loading ? (
                        <Typography sx={{ color: '#808080', py: 3 }}>Loading price prediction news...</Typography>
                    ) : news.length === 0 ? (
                        <Typography sx={{ color: '#808080', py: 3 }}>
                            No price prediction news is available right now.
                        </Typography>
                    ) : (
                        news.map((item, index) => (
                            <Box
                                key={item?.id ?? index}
                                onClick={() => openDetail(item?.id, item?.title)}
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    gap: 2,
                                    py: 2.2,
                                    cursor: 'pointer',
                                    //   borderTop: index === 0 ? 'none' : `1px solid ${isDarkMode ? '#2b2b30' : '#eee'}`,
                                }}
                            >
                                {/* Timeline rail */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: 12,
                                        flexShrink: 0,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: index === news.length - 1 ? '50%' : -110,
                                            width: '2px',
                                            bgcolor: isDarkMode ? '#3a3a40' : '#e2e2e2',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            width: 9,
                                            height: 9,
                                            bgcolor: '#2F6FED',
                                            transform: 'rotate(45deg)',
                                            mt: 0.8,
                                            zIndex: 1,
                                            borderRadius: '2px',
                                        }}
                                    />
                                </Box>

                                {/* Content */}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: 1,
                                            mb: 1,
                                        }}
                                    >
                                        {item?.category && (
                                            <Chip
                                                label={item.category}
                                                size="small"
                                                sx={{
                                                    bgcolor: isDarkMode ? '#2a2a2f' : '#f1f1f1',
                                                    color: isDarkMode ? '#ddd' : '#555',
                                                    fontWeight: 500,
                                                    fontSize: 12,
                                                    height: 22,
                                                }}
                                            />
                                        )}
                                        {item?.created_at && (
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    color: '#9a9a9a',
                                                    whiteSpace: 'nowrap',
                                                    ml: 'auto',
                                                }}
                                            >
                                                {dayjs(item.created_at).format('MMM DD, YYYY HH:mm [UTC]')}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: isDarkMode ? '#fff' : '#111',
                                            lineHeight: 1.35,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            mb: 0.75,
                                        }}
                                    >
                                        {item?.title}
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>

                {/* Footer CTA */}
                <Box sx={{ px: 2.5, py: 2.5, textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(RoutesName.Latest_News)}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: 14,
                            borderRadius: '10px',
                            borderColor: '#2F6FED',
                            color: '#2F6FED',
                            px: 2.5,
                            py: 0.8,
                            '&:hover': {
                                borderColor: '#2F6FED',
                                bgcolor: 'rgba(47,111,237,0.06)',
                            },
                        }}
                    >
                        View all price prediction
                    </Button>
                </Box>
            </Card>
        </>
    );
};

export default MuiShortNewsDashboardSection;