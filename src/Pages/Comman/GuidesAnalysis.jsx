import React from 'react';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants";
import { Box, Container, Typography, Grid, Button, FormControl, Select, MenuItem } from '@mui/material';
import { guidesAnalysisActions, analyticsActions, useTutorialActions } from "../../_actions";
import { guidesAtom, analyticAtom, tutorialCategoryAtom, blogListAtom, blogimgAtom } from "../../_state";
import { useRecoilValue, useRecoilState } from "recoil";
import { ArrowRightAlt, } from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab/";
import { useNavigate } from "react-router-dom";
import DarkLogo from "../../../public/assets/images/logo.svg";
import Globe from "../../../public/assets/images/globe.svg";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";

const GuidesAnalysis = (props) => {

    const handleChangeGuidesFilter = (event) => {
        setValueTab2(event.target.value);
    };

    const handleChangeAnalysisFilter = (event) => {
        setValueTab3(event.target.value);
    };

    
    const navigate = useNavigate();
    const guidesActions = guidesAnalysisActions();
    const AnalyticActions = analyticsActions();
    const categoryActions = useTutorialActions();
    const guides = useRecoilValue(guidesAtom);
    const analytic = useRecoilValue(analyticAtom);
    const [blogImg, setBlogimg] = useRecoilState(blogListAtom)
    const [blogNew, setBlognew] = useRecoilState(blogimgAtom)

    const guidesCategory = useRecoilValue(tutorialCategoryAtom).filter((item) => {
        return item.type === "Guide";
    });;
    const [guidesCategoryList, setGuidesCategoryList] = useState(guides);
    const [value, setValue] = React.useState("1");

    const analyticsCategory = useRecoilValue(tutorialCategoryAtom).filter((item) => {
        return item.type === "Analytics";
    });;
    const [analyticCategoryList, setAnalyticCategoryList] = useState(analytic);
    const [valueTemp, setValueTemp] = React.useState("1");

    // *GuidesCategoryList*
    const handleChange = (e) => {
        setValue(e.target.value);
        e.target.value == 1
            ? setGuidesCategoryList(guides)
            : handleTutorials(e.target.value);
    };

    const handleChanges = (value) => {
        setValue(value);
        value == 1
            ? setGuidesCategoryList(guides)
            : handleTutorials(value);
    };

    const imgLink = (data) => {
        navigate("../learn-cypto-detail")
        setBlogimg(data)
        setBlognew(true)
       
    }

    const handleTutorials = (guidesCategory) => {

        let tutorialsArr = [];
        tutorialsArr = guides
            .filter((items) => {
                return items.category === guidesCategory;
            })

            setGuidesCategoryList(tutorialsArr);
    };

    // *AnalyticCategoryList*
    const handleCategory = (e) => {
        setValueTemp(e.target.value);
        e.target.value == 1
            ? setAnalyticCategoryList(analytic)
            : handleOption(e.target.value);
    };

    const handleCategorys = (valueTemp) => {
        setValueTemp(valueTemp);
        valueTemp == 1
            ? setAnalyticCategoryList(analytic)
            : handleOption(valueTemp);
    };

    const handleOption = (analyticCategory) => {
        let tutorialsArr = [];
        tutorialsArr = analytic
            .filter((items) => {
                return items.category === analyticCategory;
            })
            setAnalyticCategoryList(tutorialsArr);
    };

    // Subscription action get function   API data call 
    useEffect(() => {
        const response = guidesActions.get()
        response.then((res) => { (res) })
    }, [])

    // Subscription action get function   API data call 
    useEffect(() => {
        const response = AnalyticActions.get()
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
    const [valueTab2, setValueTab2] = React.useState(0);

    const handleChangeTab2 = (event, newValue2) => {
        setValueTab2(newValue2);
    };
    const handleChangeIndexTab = (index2) => {
        setValueTab2(index2);
    };
    const [valueTab3, setValueTab3] = React.useState(0);

    const handleChangeTab3 = (event, newValue3) => {     
        setValueTab3(newValue3);
    };

    const handleChangeIndexTab3 = (index3) => {
        setValueTab3(index3);
    };

    const [guidesList, setGuidesList] = useState(guides);
    const handleGuides = (guideCategory) => {
        let guidesArr = [];
        guidesArr = guides
            .filter((blog) => {
                return blog.category === guideCategory;
            })
            .slice(0, 3);

        setGuidesList(guidesArr);
    };

    useEffect(() => {
        handleGuides("All");
    }, [guides]);

    useEffect(() => {
        let guideCategory = "";
        guideCategory =
            valueTab2 === 1
                ? "Blockchain"
                : valueTab2 === 2
                    ? "Trading"
                    : valueTab2 === 3
                        ? "Cryptocurrency"
                        : "All";

        handleGuides(guideCategory);
    }, [valueTab2]);

    const [analysisList, setAnalysisList] = useState(analytic);
    const handleAnalysis = (analysisCategory) => {
        let analysisArr = [];
        analysisArr = analytic
            .filter((blog) => {
                return blog.category === analysisCategory;
            })
            .slice(0, 3);
        setAnalysisList(analysisArr);
    };

    useEffect(() => {
        handleAnalysis("All");
    }, [analytic]);

    useEffect(() => {        
        let analysisCategory = "";
        analysisCategory =
        valueTab3 === 1
                ? "Blockchain"
                : valueTab3 === 2
                    ? "Trading"
                    : valueTab3 === 3
                        ? "Cryptocurrency"
                        : "All";

                        handleAnalysis(analysisCategory);
    }, [valueTab3]);

    useEffect(() => {
        setGuidesCategoryList(guides)
    }, [guides]);

    useEffect(() => {
        setAnalyticCategoryList(analytic)
    }, [analytic]);

    useEffect(() => { 
        window.scrollTo({ top: 1, left: 1, behavior: "smooth" }) 
    },[]);
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container sx={{ pt: 14 }}>
                    <Box paddingBottom={10}>
                        <Typography
                            variant="h1"
                            className="secondary-font"
                            fontWeight="700"
                            textAlign="center"
                        >
                            Guides and Analytics
                        </Typography>

                        <Typography textAlign="center" className="secondary-color body-large">
                            Guides and Analytics  for Trading Crypto
                        </Typography>
                        <Box className=''>
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
                                            <Tab label="Guides" {...a11yProps(0)} />
                                            <Tab label="Analytics" {...a11yProps(1)} />

                                        </Tabs>
                                    </AppBar>
                                    <SwipeableViews 
                                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                                        index={valueTab}
                                        onChangeIndex={handleChangeIndex}
                                    >
                                        <TabPanel value={valueTab} index={0} dir={theme.direction} sx={{ padding: '0px' }}>
                                            <Box>
                                                <Box padding={0}>
                                                    <Grid container>
                                                        <Grid item xs={12} sm={5} md={5}>
                                                            <Typography variant='h2' component='h2' className='secondary-font' >Guides</Typography>
                                                            <Typography variant='p' component='p' paddingTop={4} paddingBottom={4}>New to crypto? Not for long — start with these guides and explainers</Typography>

                                                        </Grid>
                                                        <Grid item xs={12} sm={7} md={7}>
                                                        </Grid>
                                                    </Grid>

                                                    <TabContext value={value}>
                                                        <Box className='for-desktop' sx={{ borderBottom: 1, borderColor: "divider" }}>
                                                            <TabList
                                                                value={value}
                                                                aria-label="tabs">
                                                                <Tab
                                                                label="All" 
                                                                value="1" 
                                                                onClick={e => handleChanges(1)} 
                                                                indicatorColor="secondary"
                                                                textColor="inherit" />
                                                                {guidesCategory?.map((item) => {
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
                                                                        {guidesCategory?.map((item) => {
                                                                            return (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
                                                                            )
                                                                        })}
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                            {guidesCategoryList?.map((items) => {
                                                                return (
                                                                    <Box padding={0} sx={{ marginBottom: { xs: '30px', md: '0px' } }}>
                                                                        <Grid container 
                                                                            onClick={() => imgLink(items)}
                                                                            sx={{ cursor: "pointer" }}
                                                                        >
                                                                            <Grid item xs={12} sm={5} md={5} >
                                                                                <Box
                                                                                    sx={{ paddingRight: { xs: '30px', md: '50px' } }}
                                                                                    className="blog-box"
                                                                                    display="flex"
                                                                                    flexDirection="column"
                                                                                    justifyContent="space-between"
                                                                                >
                                                                                    <Box>
                                                                                        <Typography
                                                                                            textTransform="uppercase"
                                                                                            sx={{ marginBottom: { xs: '10px', md: '50px' } }}
                                                                                            className="orange-btn small-btn small-new-btn"
                                                                                        >
                                                                                            New
                                                                                        </Typography>
                                                                                    </Box>
                                                                                    <Box className="" sx={{ marginBottom: { xs: '10px', md: '50px' } }}>
                                                                                        <Typography
                                                                                            variant="h4"
                                                                                            fontWeight="700"
                                                                                            className="secondary-font"
                                                                                            sx={{ paddingBottom: { xs: '10px', md: '50px' },maxHeight: '80px', overflow: 'hidden' }}
                                                                                        >
                                                                                            {items.title}
                                                                                        </Typography>
                                                                                        <Typography sx={{ marginBottom: { xs: '10px', md: '50px' } }}>
                                                                                            {items.category}
                                                                                        </Typography>
                                                                                        <Typography className="body-caption secondary-color"  sx={{maxHeight: '45px', overflow: 'hidden'}}>
                                                                                            {items.description}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                    <Box>
                                                                                        <ArrowRightAlt />
                                                                                    </Box>
                                                                                </Box>
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={7} md={7}>
                                                                                <img sx={{ maxWidth: "100%" }} src={`${process.env.REACT_APP_IMAGE_URL}/${items.image}`} />
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

                                            <Box padding={0} sx={{ paddingBottom: { xs: '10px', md: '50px' } }}>
                                                <Grid container>
                                                    <Grid item xs={12} sm={5} md={5}>
                                                        <Typography variant='h2' component='h2' className='secondary-font' >Analytics</Typography>
                                                        <Typography variant='p' component='p' paddingTop={4} paddingBottom={4}>New to crypto? Not for long — start with these guides and explainers</Typography>

                                                    </Grid>
                                                    <Grid item xs={12} sm={7} md={7}>
                                                    </Grid>
                                                </Grid>

                                                <TabContext value={valueTemp}>
                                                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                                                <TabList className='for-desktop' onChange={handleCategory} aria-label="tabs">
                                                                    <Tab label="All" value="1" onClick={e => handleCategorys(1)}  />
                                                                    {analyticsCategory?.map((item) => {
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
                                                                            {analyticsCategory?.map((item) => {
                                                                                return (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
                                                                                )
                                                                            })}
                                                                        </Select>
                                                                    </FormControl>
                                                                </Box>
                                                  
                                                     
                                                            {analyticCategoryList?.map((items) => {
                                                                    return (
                                                                        <Box sx={{ padding: '0px !important' }}>
                                                                            <Grid container
                                                                                onClick={() => imgLink(items)}
                                                                                sx={{ cursor: "pointer" }}
                                                                            >
                                                                                <Grid item xs={12} sm={5} md={5}>
                                                                                    <Box
                                                                                        sx={{ paddingRight: { xs: '30px', md: '50px' } }}
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
                                                                                                sx={{maxHeight: '80px', overflow: 'hidden' }}
                                                                                            >
                                                                                                {items.title}
                                                                                            </Typography>
                                                                                            <Typography paddingBottom={5}>
                                                                                                {items.category}
                                                                                            </Typography>
                                                                                            <Typography className="body-caption secondary-color"  sx={{maxHeight: '45px', overflow: 'hidden'}}>
                                                                                                {items.description}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                        <Box>
                                                                                            <ArrowRightAlt />
                                                                                        </Box>
                                                                                    </Box>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={7} md={7}>
                                                                                    <img sx={{ maxWidth: "100%" }} src={`${process.env.REACT_APP_IMAGE_URL}/${items.image}`} />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>
                                                                    )
                                                                })}
                                                        </TabPanel>
                                                </TabContext>

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
                                <img src={DarkLogo} />
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
                                            the BitCloud team and our traders from across the world.
                                        </Typography>
                                        <Button
                                            className="btn-outlined-secondary"
                                            onClick={() => navigate("/community")}
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

export default GuidesAnalysis
