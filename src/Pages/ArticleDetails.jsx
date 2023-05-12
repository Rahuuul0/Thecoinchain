import React from 'react'
import { Box, Container, Typography, Button, MenuItem, MenuList, ListItemText, Link } from '@mui/material';
import TimeIc from '../../public/assets/images/icons/time-ic.svg'
import ArticleBanner from '../../public/assets/images/article-banner.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReviewerImg from '../../public/assets/images/reviewer.png'
import RelatedImg01 from '../../public/assets/images/related-article-01.png'
import RelatedImg02 from '../../public/assets/images/related-article-02.png'
import RelatedImg03 from '../../public/assets/images/related-article-03.png'

const ArticleDetails = () => {
    return (
        <>
            <Box component="main" className='article-details' sx={{ py: 10 }}>
                <Container maxWidth="lg">
                    <Box component="div" className='article-details-inner'>
                        <Box component="div" className='article-details-head'>
                            <Typography component="h5" variant='h5' sx={{ color: '#3861FB' }}>
                                Blog
                            </Typography>
                            <Typography component="h4" variant='h4'>
                                How to Create Your Own Cryptocurrency
                            </Typography>
                            <Box component="div" className='posted-by'>
                                <Typography component="p" variant='body2'>
                                    By Werner Vermaak
                                </Typography>
                                <Typography component="p" variant='body2'>
                                    <span>
                                        <img src={TimeIc} alt='Calendar icon' />
                                    </span> 12m
                                </Typography>
                                <Typography component="p" variant='body2'>
                                    Created 16h ago
                                </Typography>
                            </Box>
                            <Box component="div" className='article-short'>
                                <Typography component="p" variant='p'>
                                    Ready to get into the crypto game? It is not as difficult as you think! Learn how to create your own cryptocurrency with our step-by-step guide!
                                </Typography>
                            </Box>
                        </Box>
                        <Box component="div" className='article-content'>
                            <Box component="div" className='article-banner'>
                                <img src={ArticleBanner} alt='Article banner' />
                            </Box>
                            <Box component="div" className='table-of-content'>
                                <Typography component="h4" variant='h4'>
                                    Table of Contents
                                </Typography>

                                <MenuList>
                                    <MenuItem>
                                        <Link>What To Understand Before You Start</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link>Why Does a Blockchain Need Cryptocurrency?</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link>Coin vs Token</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link>Whitepaper</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link>What To Consider Before Starting?</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link>Is It Legal in Your Country?</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link>What Is the Purpose and Use Case of My Cryptocurrency?</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link>Conclusion</Link>
                                    </MenuItem>
                                </MenuList>
                            </Box>
                            <Box component="div" className='article-content-inner'>
                                <Typography component="p" variant='body1'>
                                    Cryptocurrencies and other decentralized digital assets, such as <Link href='#'>non-fungible tokens (NFTs)</Link>, fulfill an ever-evolving range of blockchain-powered cases for converging industries, which include the likes of <Link href='#'>decentralized finance (DeFi)</Link>, both <Link href='#'>Web2 and Web3</Link>, the <Link href='#'>Internet of Things (IoT)</Link> and <Link href='#'>Artificial Intelligence (AI)</Link>.
                                </Typography>
                                <Typography component="p" variant='body1'>
                                    If you’ve ever thought about following in Messieurs <Link href='#'>Satoshi</Link> and <Link href='#'>Vitalik’s</Link> pioneering footsteps and creating your own cryptocurrency to help build the future of money, then be prepared for a fascinating but very challenging journey.
                                </Typography>
                                <Typography component="p" variant='body1'>
                                    In this beginner article, we’ll take a look at what it takes to create your own cryptocurrency, and the various options available to you.
                                </Typography>
                                <Box component="div" className='article-subscribe'>
                                    <Button variant="contained" className="btn btn-primary">Subscribe</Button>
                                    <Typography component="p" variant='body1' sx={{ fontWeight: '600' }}>
                                        Join us in showcasing the cryptocurrency revolution, one newsletter at a time. Subscribe now to get daily news and market updates right to your inbox, along with our millions of other subscribers (that’s right, millions love us!) — what are you waiting for?
                                    </Typography>
                                </Box>

                                <Typography component="h5" variant='h5' sx={{ fontWeight: '600' }}>
                                    What To Understand Before You Start
                                </Typography>
                                <Typography component="p" variant='body1'>
                                    There are many things to grasp before you start the complex process of designing your crypto. Just like any digital real estate on the web, you’re going to need to market the new asset effectively to ensure it gains traction and gets adopted by a community.
                                </Typography>
                                <Typography component="h5" variant='h5' sx={{ fontWeight: '600' }}>
                                    Conclusion
                                </Typography>
                                <Typography component="p" variant='body1' >
                                    Creating your own cryptocurrency may seem a daunting challenge at first, but so is the prospect of <Link href='#'>unbanking</Link> yourself and managing your own wealth. Follow the information and steps in this guide closely, and you should be well on your way to what will hopefully turn out to be a passionate new lifelong pursuit (let's hope this pertains to you, and not regulators chasing you!)
                                </Typography>
                                <Typography component="p" variant='body1' >
                                    Good luck on your journey, keep learning and building, and do what you must to stay off the <Link href='#'>Dead Coins’</Link> list!
                                </Typography>
                                <Typography component="small" variant='body2' >
                                    This article contains links to third-party websites or other content for information purposes only (“Third-Party Sites”). The Third-Party Sites are not under the control of CoinMarketCap, and CoinMarketCap is not responsible for the content of any Third-Party Site, including without limitation any link contained in a Third-Party Site, or any changes or updates to a Third-Party Site. CoinMarketCap is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement, approval or recommendation by CoinMarketCap of the site or any association with its operators. This article is intended to be used and must be used for informational purposes only. It is important to do your own research and analysis before making any material decisions related to any of the products or services described. This article is not intended as, and shall not be construed as, financial advice. The views and opinions expressed in this article are the author’s [company’s] own and do not necessarily reflect those of CoinMarketCap. CoinMarketCap is not responsible for the success or authenticity of any project, we aim to act as a neutral informational resource for end-users.
                                </Typography>

                            </Box>
                        </Box>
                        <Box component="div" className='article-reviews'>
                            <Box component="div" className='article-reviews-head'>
                                <FavoriteBorderIcon />
                                <Typography component="p" variant='body1' >
                                    1 person liked this article
                                </Typography>
                            </Box>
                            <Box component="div" className='article-reviews-card'>
                                <Box component="div" className='article-reviews-card-img'>
                                    <img src={ReviewerImg} alt='Reviewer Image' />
                                </Box>
                                <Box component="div" className='article-reviews-card-content'>
                                    <Typography component="h5" variant='h5' >
                                        Werner Vermaak
                                    </Typography>
                                    <Typography component="p" variant='body1' sx={{ color: '#58667E' }}>
                                        I'm a technical writer and marketer who has been in crypto since 2017.
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
                <Box component="div" className='related-article'>
                    <Container maxWidth="lg">
                        <Typography component="h4" variant='h4' >
                            Related Articles
                        </Typography>
                        <Box component="div" className='related-article-cards'>
                            <Box component="div" className='related-card'>
                                <Box component="div" className='related-card-img'>
                                    <img src={RelatedImg01} alt='Related Article' />
                                </Box>
                                <Typography component="p" variant='body1' sx={{ color: '#3861FB' }}>
                                    How-to Guides
                                </Typography>
                                <Typography component="h6" variant='h6' >
                                    Everything You Need To Know About the Arbitrum Airdrop
                                </Typography>
                                <Typography component="p" variant='body1' sx={{ color: '#76808F' }}>
                                    Mark your calendar for March 23, 2023, as the Arbitrum token airdrop goes live.
                                </Typography>

                                <Typography component="p" variant='body2' sx={{ color: '#76808F', marginTop: 5, fontSize: '12px' }}>
                                    By 0xKira
                                </Typography>
                                <Typography component="p" variant='body2' sx={{ color: '#76808F', marginTop: 2, fontSize: '12px' }}>
                                    1d ago <span><img src={TimeIc} alt='time ic' />  5m</span>
                                </Typography>
                            </Box>
                            <Box component="div" className='related-card'>
                                <Box component="div" className='related-card-img'>
                                    <img src={RelatedImg02} alt='Related Article' />
                                </Box>
                                <Typography component="p" variant='body1' sx={{ color: '#3861FB' }}>
                                    Crypto Basics
                                </Typography>
                                <Typography component="h6" variant='h6' >
                                    Why Do Stablecoins Depeg?
                                </Typography>
                                <Typography component="p" variant='body1' sx={{ color: '#76808F' }}>
                                    Recent market volatility has caused stablecoins to deviate from its peg — here's a look at why.
                                </Typography>

                                <Typography component="p" variant='body2' sx={{ color: '#76808F', marginTop: 5, fontSize: '12px' }}>
                                    By Andrey Sergeenkov
                                </Typography>
                                <Typography component="p" variant='body2' sx={{ color: '#76808F', marginTop: 2, fontSize: '12px' }}>
                                    1w ago <span><img src={TimeIc} alt='time ic' />  5m</span>
                                </Typography>
                            </Box>
                            <Box component="div" className='related-card'>
                                <Box component="div" className='related-card-img'>
                                    <img src={RelatedImg03} alt='Related Article' />
                                </Box>
                                <Typography component="p" variant='body1' sx={{ color: '#3861FB' }}>
                                    Tech Deep Dives
                                </Typography>
                                <Typography component="h6" variant='h6' >
                                    What Is Core DAO? Features And Tokenomics
                                </Typography>
                                <Typography component="p" variant='body1' sx={{ color: '#76808F' }}>
                                    CoinMarketCap Alexandria takes a deep dive into Core, a layer-one blockchain utilizing a novel mechanism termed Satoshi Plus, developed by the Core DAO.
                                </Typography>

                                <Typography component="p" variant='body2' sx={{ color: '#76808F', marginTop: 5, fontSize: '12px' }}>
                                    By Ivan Cryptoslav
                                </Typography>
                                <Typography component="p" variant='body2' sx={{ color: '#76808F', marginTop: 2, fontSize: '12px' }}>
                                    1w ago <span><img src={TimeIc} alt='time ic' />  20m</span>
                                </Typography>
                            </Box>

                        </Box>
                    </Container>

                </Box>
            </Box>
        </>
    )
}

export default ArticleDetails
