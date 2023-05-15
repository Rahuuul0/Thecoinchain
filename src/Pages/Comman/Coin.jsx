import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link, Grid, Stack } from '@mui/material';
import ClrLogo from "../../../public/assets/images/icons/cg-colored.svg";
import Graph from "../../../public/assets/images/graph.png";
const Coin = () => {
    return (
        <>
            <Box component="div" className='coin-details' sx={{ py: 6 }}>
                <Container maxWidth="xl" sx={{ paddingBottom: 3, paddingTop: 5 }}>
                    <Box>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href="#"
                            >
                                Price Predictions
                            </Link>
                            <Link
                                underline="hover"
                                color="text.primary"
                                href="#"
                                aria-current="page"
                            >
                                Bitcoin
                            </Link>
                        </Breadcrumbs>
                    </Box>
                </Container>

                <Container maxWidth="xl">
                    <Typography component="h1" variant="h1" className='font-40'>
                        Bitcoin (BTC) Price Prediction for Today
                    </Typography>
                    <Stack sx={{ justifyContent: 'space-between' }}
                        direction={{ xs: 'column', sm: 'row' }}
                    >
                        <Box class="d-flex">
                            <img className='pr-3' src={ClrLogo} />
                            <Box>
                                <Typography variant='body2' component="div">
                                    Jack
                                </Typography>
                                <Typography variant='body2' component="div" sx={{ color: '#00000080' }}>
                                    Crypto analyst, contributor.
                                </Typography>

                            </Box>
                        </Box>
                        <Box>
                            <Typography>
                                <strong>  Updated:</strong> March 25, 2023
                            </Typography>
                        </Box>
                    </Stack>
                    <Typography fontSize={16} paddingTop={3} component="div" variant="body2" >
                        The following is the all-encompassing Bitcoin price prediction for both near- and long-term future.
                    </Typography>
                    <Typography variant="body2" fontSize={18} component="div" sx={{ borderLeft: 3, paddingLeft: 2, marginTop: 2, paddingTop: 1, paddingBottom: 1, borderColor: 'primary.main' }}>
                        Bitcoin (BTC) is a mineable coin that is currently traded at <strong>$27 573.71</strong> per unit, with the market capitalization of <strong>$532 941 469 576</strong> that makes it a <strong>top-ranked</strong> cryptocurrency.
                    </Typography>
                    <Typography fontSize={16} paddingTop={2} component="div" variant="body2" >
                        Sometimes, cryptocurrency markets could start moving randomly and erratically, falling out of the scope of our short-term prediction model due to various reasons, such as the introduction of new regulations or bans. However, it shouldn’t be the reason to indulge in a panic since it’s mostly the sign of maturation, while our mid-term and especially long-term forecasts play out almost to perfection.
                    </Typography>
                    <Typography fontSize={16} paddingTop={2} component="div" variant="body2" >
                        Risk management is key when it comes to cryptocurrency markets, especially at the stage when you begin to build the position. Stop losses, position-sizing, and market timing should never be ignored, especially when there is no distinguishable trend.
                    </Typography>
                    <Typography fontSize={16} paddingTop={3} component="div" variant="body2" >
                        With that being said, let’s focus on the Bitcoin market, its current standings, as well as the mid-term and long-term price prediction that is based on the readings of our proprietary <strong> Crypto Volatility Index</strong> (CVIX). At this point, the price of Bitcoin stands at <strong>$27 573.71,</strong> and this particular digital asset holds the 1st position in the global cryptocurrency ranking. For your information, the ranking of every cryptocurrency is heavily reliant on its current market capitalization and price, and is calculated by multiplying these two variables, something that our system constantly does in order to supply you with the most up-to-date information on the asset in question. Also, in order to get a better grasp of the market situation and understand the general direction of the trend, or to register its absence, it’s also important to analyze the historical price data relevant to the market under review.
                    </Typography>
                    <Stack spacing={2} padding={2} className='list-point'>
                        <Typography fontSize={16} paddingTop={2} component="div" variant="body2" >
                            Yesterday, on March 24, the price of Bitcoin stood at<strong> $28 334.59</strong> at the close of the daily trading session, which constitutes a <strong>-1.75%</strong> difference as compared to the current price;
                        </Typography>
                        <hr /> <Typography fontSize={16} component="div" variant="body2" > 
                            A week ago, on March 18, the Bitcoin market stood at<strong> $27 370.37</strong> as the result of the efforts of all market participants. As the result, the price shifted by 0% in relation to its present standing;
                        </Typography>
                        <hr /> <Typography fontSize={16} component="div" variant="body2" >
                            A month ago, on February 25, Bitcoin was priced at<strong> $24 191.39,</strong> which coincided with our price prediction for that particular period. Compared to the present position of Bitcoin, it represents a 13.98% price move.
                        </Typography>
                    </Stack>
                    <Typography fontSize={16} paddingTop={3} component="div" variant="body2" >
                        These figures should yield you some insight into the current market structure, whereas our in-depth price forecast is based on the showings of CVIX. But in order to understand the overall potential of Bitcoin, or any other cryptocurrency for that matter, it’s important to take into account not only the price fluctuations but also changes in the market capitalization of the said digital asset.
                    </Typography>
                    <Typography fontSize={16} paddingTop={3} component="div" variant="body2" >
                        When it comes to cryptocurrencies, market capitalization serves more as an indicator of the coin's share, or dominance, in comparison to the rest of the market, along with its overall popularity with the global crypto community and investors. Many cryptocurrency traders view market capitalization as a key indicator to be considered before making trading decisions. It is calculated by multiplying the total number of coins that are currently in circulation (circulating supply) by the current price of Bitcoin, which, as already mentioned, presently stands at <strong>$27 573.71.</strong> Taking that formula into account, we have calculated the current market capitalization of Bitcoin to be at<strong> $532 941 469 576</strong>, which justifies its place as the 1st coin among those present on the cryptocurrency market.
                    </Typography>
                    <Stack spacing={2} padding={2} className='list-point'>
                        <Typography fontSize={16} paddingTop={2} component="div" variant="body2" >
                            Yesterday, on March 24, the market capitalization of Bitcoin stood at<strong> $547 602 680 316</strong>;
                        </Typography>
                        <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            Last week, on March 18, the total amount of capital devoted to Bitcoin was established at<strong> $528 804 858 016;</strong>
                        </Typography>
                        <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            The data from a month ago, registered on February 25, shows that Bitcoin had a market capitalization of <strong>$466 870 455 560.</strong>
                        </Typography>
                    </Stack>
                    <Stack spacing={2} padding={2} className='list-point'>
                        <Typography fontSize={16} paddingTop={2} component="div" variant="body2" >
                            Over the past 24 hours, the trading volume associated with the Bitcoin market amounted to <strong>$16 360 373 845.</strong>
                        </Typography>
                        <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            Yesterday, on March 24, the average volume at the close of the trading session amounted to <strong>$24 220 508 562.</strong>
                        </Typography>
                        <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            A week ago, on March 18, the intensity of Bitcoin trading throughout the session reached <strong>$50 726 722 212.</strong>
                        </Typography>
                    </Stack>
                    <Typography fontSize={16} component="div" variant="body2" paddingBottom={3} >
                        Having taken the reading of the Crypto Volatility Index into account, along with the results on in-depth technical and fundamental analysis, we have compiled the following short and mid-term Bitcoin price forecast:
                    </Typography>
                    <img src={Graph} className='img-responsive'/>
                    <Typography varient="h4" fontSize={20} component="div" sx={{ color: '#6C757D' }}>
                        1 year Bitcoin prediction chart
                    </Typography>

                    <Stack spacing={2} padding={2} className='list-point'>
                        <Typography fontSize={16} component="div" variant="body2" >
                            Tomorrow, on March 26, the price action will take Bitcoin to <span className='doller-figure'>$27 777.04,</span> the <span className='percent-figure'>0.74%</span> price change is anticipated.
                        </Typography>
                        <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            In 7 days, Bitcoin is going to reach the price level at  <span className='doller-figure'>$30 956.03,</span> which is a <span className='percent-figure'>12.27%</span> price change.
                        </Typography>
                        <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            In 30 days, BTC will move to  <span className='doller-figure'>$32 198.21,</span> which will be a <span className='percent-figure'>16.77%</span> shift.
                        </Typography>    <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            In six months, Bitcoin will be traded around the price area of  <span className='doller-figure'>$43 607.03,</span> which represents a <span className='percent-figure'>58.15%</span> price adjustment.
                        </Typography>
                        <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            In 1 year, traders and investors will see Bitcoin at  <span className='doller-figure'>$43 049.89 </span>as the result of a <span className='percent-figure'>56.13%</span> price fluctuation.
                        </Typography>
                    </Stack>

                    <Typography paddingTop={3} varient="h4" fontSize={20} component="div" sx={{ color: '#6C757D' }}>
                        5 years Bitcoin prediction chart
                    </Typography>

                    <Stack spacing={2} padding={2} className='list-point'>
                        <Typography fontSize={16} component="div" variant="body2" >
                            The algorithm predicts that in 2 years, Bitcoin will be traded at  <span className='doller-figure'>$47 469.49,</span> the  <span className='percent-figure'>72.15%</span> price difference from its current standings.
                        </Typography>
                        <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            In 3 years, BTC will be valued at <span className='doller-figure'> $57 788.23,</span> a <span>109.58%</span> move from the present position.
                        </Typography>
                        <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            In 4 years, Bitcoin is predicted to reach <span className='doller-figure'> $75 601.56,</span> which is a <span>174.18%</span> change.
                        </Typography>    <hr />
                        <Typography fontSize={16} component="div" variant="body2" >
                            In 5 years, BTC will settle at <span className='doller-figure'> $101 007.15 </span>after a <span>266.32%</span> shift of the price.
                        </Typography>

                    </Stack>
                    <Typography  paddingTop={5} varient="h4" fontSize={20} component="div" sx={{ color: '#212529' }}>
                        Conclusion
                    </Typography>
                    <Typography fontSize={16} paddingTop={2} component="div" variant="body2" >
                        Cryptocurrencies represent an asset class that offers the broadest range of opportunities for portfolio diversification and growth of one’s net worth via trading. However, it’s important to remember that, unlike the stock market, the cryptocurrency market is still going through a formative period which makes it susceptible to radical price swings caused by extreme volatility. Nevertheless, our proprietary Bitcoin prediction model ensures that the risks associated with cryptocurrency investment and trading are mitigated to the highest possible extent. You would still have to decide on your own when and how many BTC to buy, but you can always rely on our forecast as your navigator through the ever-changing world of crypto.
                    </Typography>
                </Container>
            </Box>
        </>
    )
}

export default Coin