import React, { useState } from 'react';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme, RoutesName } from "../../_common/app.constants";
import { Box, Container, Typography, Grid, Button, FormControl, Select, MenuItem } from '@mui/material';
import { ArrowRightAlt, } from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab/";
import { newsListActions, promotionsActions, useTutorialActions, useHomeActions } from '../../_actions';
import { newsListAtom, promotionAtom, tutorialCategoryAtom, blogListAtom, blogimgAtom, blogVideoAtom, headingListAtom, breadCrumbAtom } from "../../_state";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';
import CryptoTickerMarquee from './Components/CryptoTickerMarquee';
import DarkLogo from "../../../public/assets/images/logo.svg";
import Globe from "../../../public/assets/images/globe.svg";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import ReactHtmlParser from 'react-html-parser';


const NewsPromotions = (props) => {

    const navigate = useNavigate();
    const newsListGetActions = newsListActions();
    const promotionsGetActions = promotionsActions();
    const categoryActions = useTutorialActions();
    const newsList = useRecoilValue(newsListAtom);
    const promotionList = useRecoilValue(promotionAtom);
    const [blogImg, setBlogimg] = useRecoilState(blogListAtom);
    const [blogNew, setBlognew] = useRecoilState(blogimgAtom);
    const [blogVideo, setBlogvideo] = useRecoilState(blogVideoAtom);
    const headingList = useRecoilValue(headingListAtom);
    const homeActions = useHomeActions();
    const [breadcrumb, setBreadCrumb] = useRecoilState(breadCrumbAtom);

    const newsCategory = useRecoilValue(tutorialCategoryAtom).filter((item) => {
        return item.type === "News";
    });
    const [newsCategoryList, setNewsCategoryList] = useState(newsList);
    const [value, setValue] = React.useState("1");

    const promotionCategory = useRecoilValue(tutorialCategoryAtom).filter((item) => {
        return item.type === "Promotions";
    });
    const [promotionCategoryList, setPromotionCategoryList] = useState(promotionList);
    const [valueTemp, setValueTemp] = React.useState("1");

    // *NewsCategoryList*
    const handleChange = (e) => {
        setValue(e.target.value);
        e.target.value == 1
            ? setNewsCategoryList(newsList)
            : handleTutorials(e.target.value);
    };

    const handleChanges = (value) => {
        setValue(value);
        value == 1
            ? setNewsCategoryList(newsList)
            : handleTutorials(value);
    };

    const handleTutorials = (newsCategory) => {

        let tutorialsArr = [];
        tutorialsArr = newsList
            .filter((items) => {
                return items.category === newsCategory;
            })

        setNewsCategoryList(tutorialsArr);
    };

    // *PromotionCategoryList*
    const handleCategory = (e) => {
        setValueTemp(e.target.value);
        e.target.value == 1
            ? setPromotionCategoryList(promotionList)
            : handleOption(e.target.value);
    };

    const handleCategorys = (valueTemp) => {
        setValueTemp(valueTemp);
        valueTemp == 1
            ? setPromotionCategoryList(promotionList)
            : handleOption(valueTemp);
    };

    const handleOption = (promotionCategory) => {
        let tutorialsArr = [];
        tutorialsArr = promotionList
            .filter((items) => {
                return items.category === promotionCategory;
            })
        setPromotionCategoryList(tutorialsArr);
    };

    // Subscription action get function   API data call 
    useEffect(() => {
        const response = newsListGetActions.get()
        response.then((res) => { (res) })
    }, [])

    // Subscription action get function   API data call 
    useEffect(() => {
        const response = promotionsGetActions.get()
        response.then((res) => { (res) })
    }, [])

    // Category Api
    useEffect(() => {
        const response = categoryActions.categoryList();
        response.then((res) => { (res) })
    }, []);

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            "aria-controls": `full-width-tabpanel-${index}`,
        };
    }
    function a11yProps(index2) {
        return {
            id: `full-width-tab2-${index2}`,
            "aria-controls": `full-width-tabpanel-${index2}`,
        };
    }
    function a11yProps(index3) {
        return {
            id: `full-width-tab3-${index3}`,
            "aria-controls": `full-width-tabpanel-${index3}`,
        };
    }
    const [valueTab, setValueTab] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };
    const handleChangeIndex = (index) => {
        setValueTab(index);
    };

    useEffect(() => {
        setPromotionCategoryList(promotionList)
    }, [promotionList]);

    useEffect(() => {
        setNewsCategoryList(newsList)
    }, [newsList]);

    const imgLink = (data) => {
        setBreadCrumb("News")
        let newsSeo = data.slug
        navigate(`${RoutesName.News_And_PromotionsDetail}/newsletter/${newsSeo}`)
        setBlogimg(data)
        setBlognew(true)
    }

    const imgpromo = (data) => {
        setBreadCrumb("Promotions")
        let newsSeo = data.slug
        navigate(`${RoutesName.News_And_PromotionsDetail}/newspromotions/${newsSeo}`)
        setBlogimg(data)
        setBlognew(true)
    }

    // Api HeadingList
    useEffect(() => {
        const response = homeActions.headingList();
        response.then((res) => { (res) })
    }, []);

    useEffect(() => {
        breadcrumb === "Promotions" ? setValueTab(1) : setValueTab(0)
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }, []);

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
            <ThemeProvider theme={theme}>
                <Container sx={{ pt: 14 }}>
                    <Box paddingBottom={15}>
                        <Typography
                            variant="h1"
                            className="secondary-font news"
                            fontWeight="700"
                            textAlign="center"
                        >
                            News and Promotions
                        </Typography>

                        <Typography textAlign="center" className="secondary-color body-large">
                            News and Promotions for Trading Crypto
                        </Typography>
                        <Box className='' paddingTop={4}>
                            <Box className="right-tab">
                                <TabContext value={valueTab}>
                                    <AppBar position="static">

                                        <Tabs
                                            value={valueTab}
                                            onChange={handleChangeTab}
                                            indicatorColor="secondary"
                                            textColor="inherit"
                                            className='center-tab primary-tabs'
                                            aria-label="full width tabs example"
                                        >
                                            <Tab label="News" {...a11yProps(0)} />
                                            <Tab label="Promotion" {...a11yProps(1)} />

                                        </Tabs>
                                    </AppBar>
                                    <SwipeableViews
                                        // animateHeight
                                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                                        index={valueTab}
                                        onChangeIndex={handleChangeIndex}
                                    >
                                        <TabPanel value={valueTab} index={0} dir={theme.direction}>
                                            <Box>
                                                <Box paddingBottom={3}>
                                                    <Grid container>
                                                        <Grid item xs={12} sm={5} md={5}>
                                                            <Typography variant='h2' component='h2' className='secondary-font' >News and Promotions</Typography>
                                                            <Typography variant='p' component='p' paddingTop={4} paddingBottom={4}>New to crypto? Not for long — start with these guides and explainers</Typography>

                                                        </Grid>
                                                        <Grid item xs={12} sm={7} md={7}>
                                                        </Grid>
                                                    </Grid>

                                                    <TabContext value={value}>
                                                        <Box className='for-desktop'>
                                                            <TabList
                                                                value={value}
                                                                aria-label="tabs">
                                                                <Tab
                                                                    className='tab-selected'
                                                                    label="All"
                                                                    value="1"
                                                                    onClick={e => handleChanges('1')}
                                                                    indicatorColor="secondary"
                                                                    textColor="inherit" />
                                                                {newsCategory?.map((item) => {
                                                                    return <Tab onClick={e => handleChanges(item.title)} label={item.title} key={item.id} value={item.title} />;
                                                                })}
                                                            </TabList>
                                                        </Box>
                                                        <TabPanel
                                                            value={value}
                                                            sx={{ paddingRight: "0", paddingLeft: "0" }}
                                                        >
                                                            <Box className="for-mobile dropdown-mobile">
                                                                <FormControl sx={{ m: 0, minWidth: 120, width: "100%" }}>
                                                                    <Select
                                                                        value={value}
                                                                        onChange={e => handleChange(e)}
                                                                        displayEmpty
                                                                        inputProps={{ "aria-label": "Without label" }}
                                                                    >
                                                                        <MenuItem value="1" >All</MenuItem>
                                                                        {newsCategory?.map((item) => {
                                                                            return (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
                                                                            )
                                                                        })}
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                            {newsCategoryList?.map((item) => {
                                                                let description = item.description;
                                                                let image = item.image ? `${process.env.REACT_APP_IMAGE_URL}/${item.image}` : item.image_link;
                                                                return (
                                                                    <Box paddingBottom={3}>
                                                                        <Grid container
                                                                            onClick={() => imgLink(item)}
                                                                            sx={{ cursor: "pointer" }}
                                                                        >
                                                                            <Grid item xs={12} sm={5} md={5}>
                                                                                <Box
                                                                                    className="blog-box"
                                                                                    display="flex"
                                                                                    flexDirection="column"
                                                                                    justifyContent="space-between"
                                                                                >
                                                                                    <Box height="50">
                                                                                        <Typography
                                                                                            textTransform="uppercase"
                                                                                            sx={{ marginBottom: "50px" }}
                                                                                            className="orange-btn small-btn small-new-btn"
                                                                                        >
                                                                                            New
                                                                                        </Typography>
                                                                                    </Box>
                                                                                    <Box className="" paddingBottom={5}>
                                                                                        <Typography
                                                                                            variant="h4"
                                                                                            fontWeight="700"
                                                                                            className="secondary-font"
                                                                                            paddingBottom={2}
                                                                                            sx={{ maxHeight: '80px', overflow: 'hidden' }}
                                                                                        >
                                                                                            {item.title}
                                                                                        </Typography>
                                                                                        <Typography paddingBottom={5}>
                                                                                            {item.category}
                                                                                        </Typography>
                                                                                        <Typography className="body-caption secondary-color" sx={{ maxHeight: '45px', overflow: 'hidden' }}>
                                                                                            {ReactHtmlParser(description)}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                    <Box>
                                                                                        <ArrowRightAlt />
                                                                                    </Box>
                                                                                </Box>
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={7} md={7}>
                                                                                {image == null || image == '' ? " " : <img sx={{ maxWidth: "100%" }} src={image} alt='' />}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box>
                                                                )
                                                            })}
                                                        </TabPanel>

                                                    </TabContext>

                                                </Box>
                                            </Box>
                                        </TabPanel>
                                        <TabPanel value={valueTab} index={1} dir={theme.direction}>
                                            <Box paddingBottom={3}>
                                                <Box>
                                                    <Box paddingBottom={3}>
                                                        <Grid container>
                                                            <Grid item xs={12} sm={5} md={5}>
                                                                <Typography variant='h2' component='h2' className='secondary-font' >Promotions</Typography>
                                                                <Typography variant='p' component='p' paddingTop={4} paddingBottom={4}>New to crypto? Not for long — start with these guides and explainers</Typography>

                                                            </Grid>
                                                            <Grid item xs={12} sm={7} md={7}>
                                                            </Grid>
                                                        </Grid>

                                                        <TabContext value={valueTemp}>
                                                            <Box sx={{ borderColor: "divider" }}>
                                                                <TabList className='for-desktop' onChange={handleCategory} aria-label="tabs">
                                                                    <Tab label="All" value="1" onClick={e => handleCategorys('1')} />
                                                                    {promotionCategory?.map((item) => {
                                                                        return <Tab
                                                                            indicatorColor="secondary"
                                                                            textColor="inherit"
                                                                            onClick={e => handleCategorys(item.title)}
                                                                            label={item.title} value={item.title} />;
                                                                    })}
                                                                </TabList>
                                                            </Box>
                                                            <TabPanel
                                                                value={valueTemp}
                                                                sx={{ paddingRight: "0", paddingLeft: "0" }}
                                                            >
                                                                <Box className="for-mobile dropdown-mobile">
                                                                    <FormControl sx={{ m: 0, minWidth: 120, width: "100%" }}>
                                                                        <Select
                                                                            value={valueTemp}
                                                                            onChange={e => handleCategory(e)}
                                                                            displayEmpty
                                                                            inputProps={{ "aria-label": "Without label" }}
                                                                        >
                                                                            <MenuItem value="1" >All</MenuItem>
                                                                            {promotionCategory?.map((item) => {
                                                                                return (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
                                                                                )
                                                                            })}
                                                                        </Select>
                                                                    </FormControl>
                                                                </Box>

                                                                <TabPanel value={valueTemp} index3={0} dir={theme.direction}>
                                                                    {promotionCategoryList.map((item) => {
                                                                        let description = item.description;
                                                                        let image = item.image ? `${process.env.REACT_APP_IMAGE_URL}/${item.image}` : item.image_link;
                                                                        return (
                                                                            <Box paddingBottom={3}>
                                                                                <Grid container
                                                                                    onClick={() => imgpromo(item)}
                                                                                    sx={{ cursor: "pointer" }}
                                                                                >
                                                                                    <Grid item xs={12} sm={5} md={5}>
                                                                                        <Box
                                                                                            className="blog-box"
                                                                                            display="flex"
                                                                                            flexDirection="column"
                                                                                            justifyContent="space-between"
                                                                                        >
                                                                                            <Box height="50">
                                                                                                <Typography
                                                                                                    textTransform="uppercase"
                                                                                                    sx={{ marginBottom: "50px" }}
                                                                                                    className="orange-btn small-btn small-new-btn"
                                                                                                >
                                                                                                    New
                                                                                                </Typography>
                                                                                            </Box>
                                                                                            <Box className="" paddingBottom={5}>
                                                                                                <Typography
                                                                                                    variant="h4"
                                                                                                    fontWeight="700"
                                                                                                    className="secondary-font"
                                                                                                    paddingBottom={2}
                                                                                                    sx={{ height: '80px', overflow: 'hidden' }}
                                                                                                >
                                                                                                    {item.title}
                                                                                                </Typography>
                                                                                                <Typography paddingBottom={5}>
                                                                                                    {item.category}
                                                                                                </Typography>
                                                                                                <Typography className="body-caption secondary-color" sx={{ height: '45px', overflow: 'hidden' }}>
                                                                                                    {ReactHtmlParser(description)}
                                                                                                </Typography>
                                                                                            </Box>
                                                                                            <Box>
                                                                                                <ArrowRightAlt />
                                                                                            </Box>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} sm={7} md={7}>
                                                                                        {image == null || image == '' ? " " : <img sx={{ maxWidth: "100%" }} src={image} alt='' />}
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Box>
                                                                        )
                                                                    })}
                                                                </TabPanel>
                                                            </TabPanel>
                                                        </TabContext>

                                                    </Box>
                                                </Box>
                                            </Box>
                                        </TabPanel>

                                    </SwipeableViews>
                                </TabContext>
                            </Box>

                        </Box>
                    </Box>
                </Container>


                {/* section starts */}
                <Box className="global-community">
                    <Container>
                        <Box>
                            <Box textAlign="center">
                                <img src={DarkLogo} className='coinguru-logo' />
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    className="secondary-font mobile-f-48"
                                    textAlign="center"
                                    paddingBottom={3}
                                    sx={{ fontWeight: "700" }}
                                >
                                    Stay in the know on
                                    <br /> crypto with coinguru
                                </Typography>
                                <Typography className="secondary-color">
                                    A creative agency that lead and inspire
                                </Typography>
                            </Box>
                            <Box className="crypto-box">
                                <Grid
                                    container
                                    spacing={{ xs: 8, md: 3 }}
                                    columns={{ xs: 12, sm: 8, md: 12 }}
                                    className="flow-reverse-mobile"
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                    >
                                        <Typography
                                            className="small-caption secondary-color"
                                            sx={{ textTransform: "uppercase" }}
                                            paddingBottom={2}
                                        >
                                            Crypto news
                                        </Typography>
                                        <Typography component="h4" variant="h4" paddingBottom={3}>
                                            Be Part of our Global Community
                                        </Typography>
                                        <Typography className="secondary-color" paddingBottom={{ xs: 8, sm: 12 }}>
                                            Let’s stay in touch. Join our communities to keep up with
                                            the Coinguru team and our traders from across the world.
                                        </Typography>
                                        <Button
                                            className="btn-outlined-secondary"
                                            onClick={() => navigate(RoutesName.Community)}
                                        >
                                            Join now
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} textAlign="right">
                                        <img src={Globe} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </Box>
                {/* section ends */}
            </ThemeProvider>
        </>
    )
}

export default NewsPromotions
