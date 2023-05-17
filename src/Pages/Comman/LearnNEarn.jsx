import React from 'react'
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import Learn01 from '../../../public/assets/images/learn01.png'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const LearnNEarn = () => {
    return (
        <>
            <Box component="div" className='learn-n-earn'>
                <Box component="div" className='learn-n-earn-head'>
                    <Typography component="h2" variant='h2'>
                        Learn and earn
                    </Typography>
                    <Typography component="p" variant='body1' sx={{ color: '#353945' }}>
                        Stacks is a production-ready library of stackablecontent blocks built in React Native.
                    </Typography>
                </Box>
                <Box component="div" className='learn-n-earn-cards'>
                    <Box component="div" className='learn-n-earn-card'>
                        <Box component="div" className='learn-n-earn-video-wrapper'>
                            <img src={Learn01} alt='' />
                        </Box>
                        <span className='learn-badge'>Learn & Earn</span>
                        <Typography component="p" variant='body1' className='body-large'>
                            Learn about UI8 coin and earn an All-Access Pass
                        </Typography>
                        <Box component="div" className='learn-n-earn-by'>
                            <span className='circle'></span>
                            <Typography component="small" variant='body2' className='body-caption'>
                                Floyd Buckridge
                            </Typography>
                            <Typography component="small" variant='body2' className='body-caption' sx={{ marginLeft: 'auto' }}>
                                Feb 03, 2021
                            </Typography>
                        </Box>
                    </Box>
                    <Box component="div" className='learn-n-earn-card'>
                        <Box component="div" className='learn-n-earn-video-wrapper'>
                            <img src={Learn01} alt='' />
                        </Box>
                        <span className='learn-badge'>weekly watchlist airdrop</span>
                        <Typography component="p" variant='body1' className='body-large'>
                            Submit your watchlist and win USDT
                        </Typography>
                        <Box component="div" className='learn-n-earn-by'>
                            <span className='circle'></span>
                            <Typography component="small" variant='body2' className='body-caption'>
                                Floyd Buckridge
                            </Typography>
                            <Typography component="small" variant='body2' className='body-caption' sx={{ marginLeft: 'auto' }}>
                                Feb 03, 2021
                            </Typography>
                        </Box>
                    </Box>
                    <Box component="div" className='learn-n-earn-card'>
                        <Box component="div" className='learn-n-earn-video-wrapper'>
                            <img src={Learn01} alt='' />
                        </Box>
                        <span className='learn-badge'>featured</span>
                        <Typography component="p" variant='body1' className='body-large'>
                            Submit your watchlist and win USDT
                        </Typography>
                        <Box component="div" className='learn-n-earn-by'>
                            <span className='circle'></span>
                            <Typography component="small" variant='body2' className='body-caption'>
                                Floyd Buckridge
                            </Typography>
                            <Typography component="small" variant='body2' className='body-caption' sx={{ marginLeft: 'auto' }}>
                                Feb 03, 2021
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Button
                    sx={{ my: 8, mx: 'auto' }}
                    variant="outlined"
                    className='btn btn-outlined-secondary' startIcon={<RotateLeftIcon />}>
                    Load more
                </Button>
            </Box>
        </>
    )
}

export default LearnNEarn
