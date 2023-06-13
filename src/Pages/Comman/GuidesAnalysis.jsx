import React from 'react';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants";
import { Box, Container, Typography, Grid, Button, } from '@mui/material';
import { guidesAnalysisActions, analyticsActions } from "../../_actions";
import { guidesAtom, analyticAtom } from "../../_state";
import { useRecoilValue, useRecoilState } from "recoil";
import { ArrowRightAlt, } from "@mui/icons-material";
import { TabContext, TabPanel } from "@mui/lab/";
import Blog1 from "../../../public/assets/images/blog-1.svg";
import DarkLogo from "../../../public/assets/images/logo.svg";
import Globe from "../../../public/assets/images/globe.svg";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const GuidesAnalysis = (props) => {

    const guidesActions = guidesAnalysisActions();
    const AnalyticActions = analyticsActions();
    const guides = useRecoilValue(guidesAtom);
    const analytic = useRecoilValue(analyticAtom);

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
                                            <Tab label="Guide" {...a11yProps(0)} />
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

                                                    <TabContext value={valueTab2}>
                                                        <AppBar position="static">

                                                            <Tabs
                                                                value={valueTab2}
                                                                onChange={handleChangeTab2}
                                                                indicatorColor="secondary"
                                                                textColor="inherit"
                                                                aria-label="full width tabs example"
                                                            >
                                                                <Tab label="All" {...a11yProps(0)} />
                                                                <Tab label="Blockchain" {...a11yProps(1)} />
                                                                <Tab label="Trading" {...a11yProps(3)} />
                                                                <Tab label="Cryptocurrency" {...a11yProps(4)} />

                                                            </Tabs>
                                                        </AppBar>
                                                        <SwipeableViews
                                                            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                                                            index={valueTab2}
                                                            onChangeIndex={handleChangeIndexTab}
                                                        >
                                                            <TabPanel value={valueTab2} index2={0} dir={theme.direction} sx={{ padding: '0px' }}>
                                                                {guides
                                                                    .slice(0, 3)
                                                                    .map((items) => {
                                                                        return (
                                                                            <Box padding={0}>
                                                                                <Grid container>
                                                                                    <Grid item xs={12} sm={5} md={5}>
                                                                                        <Box
                                                                                            className="blog-box"
                                                                                            display="flex"
                                                                                            flexDirection="column"
                                                                                            justifyContent="space-between"
                                                                                            sx={{ pr: 2 }}
                                                                                        >
                                                                                            <Box height="50">
                                                                                                <Button
                                                                                                    textTransform="uppercase"
                                                                                                    sx={{ marginBottom: "50px" }}
                                                                                                    className="orange-btn small-btn"
                                                                                                >
                                                                                                    New
                                                                                                </Button>
                                                                                            </Box>
                                                                                            <Box className="" paddingBottom={5}>
                                                                                                <Typography
                                                                                                    variant="h4"
                                                                                                    fontWeight="700"
                                                                                                    className="secondary-font"
                                                                                                    paddingBottom={2}
                                                                                                >
                                                                                                    {items.title}
                                                                                                </Typography>
                                                                                                <Typography paddingBottom={5}>
                                                                                                    {items.category}
                                                                                                </Typography>
                                                                                                <Typography className="body-caption secondary-color">
                                                                                                    {items.description}
                                                                                                </Typography>
                                                                                            </Box>
                                                                                            <Box>
                                                                                                <ArrowRightAlt />
                                                                                            </Box>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} sm={7} md={7}>
                                                                                        <img sx={{ maxWidth: "100%" }} src={Blog1} />
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Box>
                                                                        )
                                                                    })}
                                                            </TabPanel>
                                                            <TabPanel value={valueTab2} index2={1} dir={theme.direction} sx={{ padding: '0px' }}>
                                                                {guides
                                                                    .filter((blog) => {
                                                                        return blog.category === "Blogchain";
                                                                    })
                                                                    .slice(0, 3)
                                                                    .map((items) => {
                                                                        return (
                                                                            <Box padding={0}>
                                                                                <Grid container>
                                                                                    <Grid item xs={12} sm={5} md={5}>
                                                                                        <Box
                                                                                            className="blog-box"
                                                                                            display="flex"
                                                                                            flexDirection="column"
                                                                                            justifyContent="space-between"
                                                                                            sx={{ pr: 2 }}
                                                                                        >
                                                                                            <Box height="50">
                                                                                                <Button
                                                                                                    textTransform="uppercase"
                                                                                                    sx={{ marginBottom: "50px" }}
                                                                                                    className="orange-btn small-btn"
                                                                                                >
                                                                                                    New
                                                                                                </Button>
                                                                                            </Box>
                                                                                            <Box className="" paddingBottom={5}>
                                                                                                <Typography
                                                                                                    variant="h4"
                                                                                                    fontWeight="700"
                                                                                                    className="secondary-font"
                                                                                                    paddingBottom={2}
                                                                                                >
                                                                                                    {items.title}
                                                                                                </Typography>
                                                                                                <Typography paddingBottom={5}>
                                                                                                    {items.category}
                                                                                                </Typography>
                                                                                                <Typography className="body-caption secondary-color">
                                                                                                    {items.description}
                                                                                                </Typography>
                                                                                            </Box>
                                                                                            <Box>
                                                                                                <ArrowRightAlt />
                                                                                            </Box>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} sm={7} md={7}>
                                                                                        <img sx={{ maxWidth: "100%" }} src={Blog1} />
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Box>
                                                                        )
                                                                    })}
                                                            </TabPanel>
                                                            <TabPanel value={valueTab2} index2={2} dir={theme.direction} sx={{ padding: '0px' }}>
                                                                {guides
                                                                    .filter((blog) => {
                                                                        return blog.category === "Trading";
                                                                    })
                                                                    .slice(0, 3)
                                                                    .map((items) => {
                                                                        return (
                                                                            <Box padding={0}>
                                                                                <Grid container>
                                                                                    <Grid item xs={12} sm={5} md={5}>
                                                                                        <Box
                                                                                            className="blog-box"
                                                                                            display="flex"
                                                                                            flexDirection="column"
                                                                                            justifyContent="space-between"
                                                                                            sx={{ pr: 2 }}
                                                                                        >
                                                                                            <Box height="50">
                                                                                                <Button
                                                                                                    textTransform="uppercase"
                                                                                                    sx={{ marginBottom: "50px" }}
                                                                                                    className="orange-btn small-btn"
                                                                                                >
                                                                                                    New
                                                                                                </Button>
                                                                                            </Box>
                                                                                            <Box className="" paddingBottom={5}>
                                                                                                <Typography
                                                                                                    variant="h4"
                                                                                                    fontWeight="700"
                                                                                                    className="secondary-font"
                                                                                                    paddingBottom={2}
                                                                                                >
                                                                                                    {items.title}
                                                                                                </Typography>
                                                                                                <Typography paddingBottom={5}>
                                                                                                    {items.category}
                                                                                                </Typography>
                                                                                                <Typography className="body-caption secondary-color">
                                                                                                    {items.description}
                                                                                                </Typography>
                                                                                            </Box>
                                                                                            <Box>
                                                                                                <ArrowRightAlt />
                                                                                            </Box>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} sm={7} md={7}>
                                                                                        <img sx={{ maxWidth: "100%" }} src={Blog1} />
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Box>
                                                                        )
                                                                    })}
                                                            </TabPanel>
                                                            <TabPanel value={valueTab2} index2={3} dir={theme.direction} sx={{ padding: '0px' }}>
                                                                {guides
                                                                    .filter((blog) => {
                                                                        return blog.category === "Cryptocurrency";
                                                                    })
                                                                    .slice(0, 3)
                                                                    .map((items) => {
                                                                        return (
                                                                            <Box padding={0}>
                                                                                <Grid container>
                                                                                    <Grid item xs={12} sm={5} md={5}>
                                                                                        <Box
                                                                                            className="blog-box"
                                                                                            display="flex"
                                                                                            flexDirection="column"
                                                                                            justifyContent="space-between"
                                                                                            sx={{ pr: 2 }}
                                                                                        >
                                                                                            <Box height="50">
                                                                                                <Button
                                                                                                    textTransform="uppercase"
                                                                                                    sx={{ marginBottom: "50px" }}
                                                                                                    className="orange-btn small-btn"
                                                                                                >
                                                                                                    New
                                                                                                </Button>
                                                                                            </Box>
                                                                                            <Box className="" paddingBottom={5}>
                                                                                                <Typography
                                                                                                    variant="h4"
                                                                                                    fontWeight="700"
                                                                                                    className="secondary-font"
                                                                                                    paddingBottom={2}
                                                                                                >
                                                                                                    {items.title}
                                                                                                </Typography>
                                                                                                <Typography paddingBottom={5}>
                                                                                                    {items.category}
                                                                                                </Typography>
                                                                                                <Typography className="body-caption secondary-color">
                                                                                                    {items.description}
                                                                                                </Typography>
                                                                                            </Box>
                                                                                            <Box>
                                                                                                <ArrowRightAlt />
                                                                                            </Box>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} sm={7} md={7}>
                                                                                        <img sx={{ maxWidth: "100%" }} src={Blog1} />
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Box>
                                                                        )
                                                                    })}
                                                            </TabPanel>
                                                            <TabPanel value={valueTab2} index2={4} dir={theme.direction} sx={{ padding: '0px' }}>

                                                                <Box padding={0}>
                                                                    <Grid container>
                                                                        <Grid item xs={12} sm={5} md={5}>
                                                                            <Box
                                                                                className="blog-box"
                                                                                display="flex"
                                                                                flexDirection="column"
                                                                                justifyContent="space-between"
                                                                                sx={{ pr: 2 }}
                                                                            >
                                                                                <Box height="50">
                                                                                    <Button
                                                                                        textTransform="uppercase"
                                                                                        sx={{ marginBottom: "50px" }}
                                                                                        className="orange-btn small-btn"
                                                                                    >
                                                                                        New
                                                                                    </Button>
                                                                                </Box>
                                                                                <Box className="" paddingBottom={5}>
                                                                                    <Typography
                                                                                        variant="h4"
                                                                                        fontWeight="700"
                                                                                        className="secondary-font"
                                                                                        paddingBottom={2}
                                                                                    >
                                                                                        A Beginner's Guide to TradingView
                                                                                    </Typography>
                                                                                    <Typography paddingBottom={5}>
                                                                                        Ethereum
                                                                                    </Typography>
                                                                                    <Typography className="body-caption secondary-color">
                                                                                        A fully-featured landing page kit,
                                                                                        including design files, and beautiful 3D
                                                                                        illustrations editable.
                                                                                    </Typography>
                                                                                </Box>
                                                                                <Box>
                                                                                    <ArrowRightAlt />
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={7} md={7}>
                                                                            <img sx={{ maxWidth: "100%" }} src={Blog1} />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>

                                                            </TabPanel>

                                                        </SwipeableViews>
                                                    </TabContext>

                                                </Box>
                                            </Box>
                                        </TabPanel>
                                        <TabPanel value={valueTab} index={1} dir={theme.direction}>

                                            <Box padding={0}>
                                                <Grid container>
                                                    <Grid item xs={12} sm={5} md={5}>
                                                        <Typography variant='h2' component='h2' className='secondary-font' >Analytics</Typography>
                                                        <Typography variant='p' component='p' paddingTop={4} paddingBottom={4}>New to crypto? Not for long — start with these guides and explainers</Typography>

                                                    </Grid>
                                                    <Grid item xs={12} sm={7} md={7}>
                                                    </Grid>
                                                </Grid>

                                                <TabContext value={valueTab3}>
                                                    <AppBar position="static">

                                                        <Tabs
                                                            value={valueTab3}
                                                            onChange={handleChangeTab3}
                                                            indicatorColor="secondary"
                                                            textColor="inherit"
                                                            aria-label="full width tabs example"
                                                        >
                                                            <Tab label="All" {...a11yProps(0)} />
                                                            <Tab label="Blockchain" {...a11yProps(1)} />
                                                            <Tab label="Trading" {...a11yProps(3)} />
                                                            <Tab label="Cryptocurrency" {...a11yProps(4)} />

                                                        </Tabs>
                                                    </AppBar>
                                                    <SwipeableViews
                                                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                                                        index={valueTab3}
                                                        onChangeIndex={handleChangeIndexTab3}
                                                    >
                                                        <TabPanel value={valueTab3} index3={0} dir={theme.direction} sx={{ padding: '0px !important' }}>
                                                            {analytic
                                                                .slice(0, 3)
                                                                .map((items) => {
                                                                    return (
                                                                        <Box sx={{ padding: '0px !important' }}>
                                                                            <Grid container>
                                                                                <Grid item xs={12} sm={5} md={5}>
                                                                                    <Box
                                                                                        className="blog-box"
                                                                                        display="flex"
                                                                                        flexDirection="column"
                                                                                        justifyContent="space-between"
                                                                                        sx={{ pr: 2 }}
                                                                                    >
                                                                                        <Box height="50">
                                                                                            <Button
                                                                                                textTransform="uppercase"
                                                                                                sx={{ marginBottom: "50px" }}
                                                                                                className="orange-btn small-btn"
                                                                                            >
                                                                                                New
                                                                                            </Button>
                                                                                        </Box>
                                                                                        <Box className="" paddingBottom={5}>
                                                                                            <Typography
                                                                                                variant="h4"
                                                                                                fontWeight="700"
                                                                                                className="secondary-font"
                                                                                                paddingBottom={2}
                                                                                            >
                                                                                                {items.title}
                                                                                            </Typography>
                                                                                            <Typography paddingBottom={5}>
                                                                                                {items.category}
                                                                                            </Typography>
                                                                                            <Typography className="body-caption secondary-color">
                                                                                                {items.discriptions}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                        <Box>
                                                                                            <ArrowRightAlt />
                                                                                        </Box>
                                                                                    </Box>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={7} md={7}>
                                                                                    <img sx={{ maxWidth: "100%" }} src={Blog1} />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>
                                                                    )
                                                                })}
                                                        </TabPanel>
                                                        <TabPanel value={valueTab3} index3={1} dir={theme.direction} sx={{ padding: '0px !important' }}>
                                                            {analytic
                                                                .filter((blog) => {
                                                                    return blog.category === "Blockchain";
                                                                })
                                                                .slice(0, 3)
                                                                .map((items) => {
                                                                    return (
                                                                        <Box padding={0}>
                                                                            <Grid container>
                                                                                <Grid item xs={12} sm={5} md={5}>
                                                                                    <Box
                                                                                        className="blog-box"
                                                                                        display="flex"
                                                                                        flexDirection="column"
                                                                                        justifyContent="space-between"
                                                                                        sx={{ pr: 2 }}
                                                                                    >
                                                                                        <Box height="50">
                                                                                            <Button
                                                                                                textTransform="uppercase"
                                                                                                sx={{ marginBottom: "50px" }}
                                                                                                className="orange-btn small-btn"
                                                                                            >
                                                                                                New
                                                                                            </Button>
                                                                                        </Box>
                                                                                        <Box className="" paddingBottom={5}>
                                                                                            <Typography
                                                                                                variant="h4"
                                                                                                fontWeight="700"
                                                                                                className="secondary-font"
                                                                                                paddingBottom={2}
                                                                                            >
                                                                                                {items.title}
                                                                                            </Typography>
                                                                                            <Typography paddingBottom={5}>
                                                                                                {items.category}
                                                                                            </Typography>
                                                                                            <Typography className="body-caption secondary-color">
                                                                                                {items.discriptions}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                        <Box>
                                                                                            <ArrowRightAlt />
                                                                                        </Box>
                                                                                    </Box>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={7} md={7}>
                                                                                    <img sx={{ maxWidth: "100%" }} src={Blog1} />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>
                                                                    )
                                                                })}
                                                        </TabPanel>
                                                        <TabPanel value={valueTab3} index3={2} dir={theme.direction} sx={{ padding: '0' }}>
                                                            {analytic
                                                                .filter((blog) => {
                                                                    return blog.category === "Trading";
                                                                })
                                                                .slice(0, 3)
                                                                .map((items) => {
                                                                    return (
                                                                        <Box padding={0}>
                                                                            <Grid container>
                                                                                <Grid item xs={12} sm={5} md={5}>
                                                                                    <Box
                                                                                        className="blog-box"
                                                                                        display="flex"
                                                                                        flexDirection="column"
                                                                                        justifyContent="space-between"
                                                                                        sx={{ pr: 2 }}
                                                                                    >
                                                                                        <Box height="50">
                                                                                            <Button
                                                                                                textTransform="uppercase"
                                                                                                sx={{ marginBottom: "50px" }}
                                                                                                className="orange-btn small-btn"
                                                                                            >
                                                                                                New
                                                                                            </Button>
                                                                                        </Box>
                                                                                        <Box className="" paddingBottom={5}>
                                                                                            <Typography
                                                                                                variant="h4"
                                                                                                fontWeight="700"
                                                                                                className="secondary-font"
                                                                                                paddingBottom={2}
                                                                                            >
                                                                                                {items.title}
                                                                                            </Typography>
                                                                                            <Typography paddingBottom={5}>
                                                                                                {items.category}
                                                                                            </Typography>
                                                                                            <Typography className="body-caption secondary-color">
                                                                                                {items.discriptions}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                        <Box>
                                                                                            <ArrowRightAlt />
                                                                                        </Box>
                                                                                    </Box>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={7} md={7}>
                                                                                    <img sx={{ maxWidth: "100%" }} src={Blog1} />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>
                                                                    )
                                                                })}
                                                        </TabPanel>
                                                        <TabPanel value={valueTab3} index3={3} dir={theme.direction} sx={{ padding: '0' }}>
                                                            {analytic
                                                                .filter((blog) => {
                                                                    return blog.category === "Cryptocurrency";
                                                                })
                                                                .slice(0, 3)
                                                                .map((items) => {
                                                                    return (
                                                                        <Box padding={0}>
                                                                            <Grid container>
                                                                                <Grid item xs={12} sm={5} md={5}>
                                                                                    <Box
                                                                                        className="blog-box"
                                                                                        display="flex"
                                                                                        flexDirection="column"
                                                                                        justifyContent="space-between"
                                                                                        sx={{ pr: 2 }}
                                                                                    >
                                                                                        <Box height="50">
                                                                                            <Button
                                                                                                textTransform="uppercase"
                                                                                                sx={{ marginBottom: "50px" }}
                                                                                                className="orange-btn small-btn"
                                                                                            >
                                                                                                New
                                                                                            </Button>
                                                                                        </Box>
                                                                                        <Box className="" paddingBottom={5}>
                                                                                            <Typography
                                                                                                variant="h4"
                                                                                                fontWeight="700"
                                                                                                className="secondary-font"
                                                                                                paddingBottom={2}
                                                                                            >
                                                                                                {items.title}
                                                                                            </Typography>
                                                                                            <Typography paddingBottom={5}>
                                                                                                {items.category}
                                                                                            </Typography>
                                                                                            <Typography className="body-caption secondary-color">
                                                                                                {items.discriptions}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                        <Box>
                                                                                            <ArrowRightAlt />
                                                                                        </Box>
                                                                                    </Box>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={7} md={7}>
                                                                                    <img sx={{ maxWidth: "100%" }} src={Blog1} />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Box>
                                                                    )
                                                                })}
                                                        </TabPanel>
                                                        <TabPanel value={valueTab3} index3={4} dir={theme.direction}>

                                                            <Box padding={0}>
                                                                <Grid container>
                                                                    <Grid item xs={12} sm={5} md={5}>
                                                                        <Box
                                                                            className="blog-box"
                                                                            display="flex"
                                                                            flexDirection="column"
                                                                            justifyContent="space-between"
                                                                            sx={{ pr: 2 }}
                                                                        >
                                                                            <Box height="50">
                                                                                <Button
                                                                                    textTransform="uppercase"
                                                                                    sx={{ marginBottom: "50px" }}
                                                                                    className="orange-btn small-btn"
                                                                                >
                                                                                    New
                                                                                </Button>
                                                                            </Box>
                                                                            <Box className="" paddingBottom={5}>
                                                                                <Typography
                                                                                    variant="h4"
                                                                                    fontWeight="700"
                                                                                    className="secondary-font"
                                                                                    paddingBottom={2}
                                                                                >
                                                                                    A Beginner's Guide to TradingView
                                                                                </Typography>
                                                                                <Typography paddingBottom={5}>
                                                                                    Ethereum
                                                                                </Typography>
                                                                                <Typography className="body-caption secondary-color">
                                                                                    A fully-featured landing page kit,
                                                                                    including design files, and beautiful 3D
                                                                                    illustrations editable.
                                                                                </Typography>
                                                                            </Box>
                                                                            <Box>
                                                                                <ArrowRightAlt />
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={7} md={7}>
                                                                        <img sx={{ maxWidth: "100%" }} src={Blog1} />
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>

                                                        </TabPanel>

                                                    </SwipeableViews>
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
                <Container maxWidth="fluid" sx={{ backgroundColor: "#F4F5F6" }}>
                    <Container>
                        <Box paddingBottom={12} paddingTop={12}>
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
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                    className="flow-reverse-mobile"
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        paddingRight={6}
                                        className="padding-0-mobile"
                                    >
                                        <Typography
                                            className="small-caption secondary-color"
                                            sx={{ textTransform: "uppercase" }}
                                            paddingBottom={3}
                                        >
                                            Crypto news
                                        </Typography>
                                        <Typography paddingBottom={3} className="body-large">
                                            Be Part of our Global Community
                                        </Typography>
                                        <Typography className="secondary-color" paddingBottom={14}>
                                            Let’s stay in touch. Join our communities to keep up with
                                            the BitCloud team and our traders from across the world.
                                        </Typography>
                                        <Button className="btn-outlined-secondary">Join now</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} textAlign="right">
                                        <img src={Globe} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </Container>
                {/* section ends */}
            </ThemeProvider>
        </>
    )
}

export default GuidesAnalysis
