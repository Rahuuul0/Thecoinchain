import React, { useState } from 'react'
import { Box, Container, Grid, Typography, Button, FormControl, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Learn01 from '../../../public/assets/images/learn01.png'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const LearnNEarn = () => {

    const [learnEarn, setLearnEarn] = useState('');

    const handleChangeLearn = (event) => {
        setLearnEarn(event.target.value);
    };

    return (
        <>
            <Box className='learn-n-earn'>
                <Box className='learn-n-earn-head'>
                    <Typography component="h2" variant='h2'>
                        Learn and earn
                    </Typography>
                    <Typography className='short-subhead' component="p" variant='body1' sx={{ color: '#353945' }} paddingY={2}>
                        Stacks is a production-ready library of stackablecontent blocks built in React Native.
                    </Typography>

                    <Box className='for-mobile dropdown-mobile learn-earn-dropdown'>
                        <FormControl sx={{ m: 0, minWidth: 120, width: '100%', textAlign: 'left', fontSize: '14px', fontWeight: '500' }}>
                            <Select
                                value={learnEarn}
                                onChange={handleChangeLearn}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={10}>2D Design</MenuItem>
                                <MenuItem value={20}>3D Design</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <Button
                                variant="outlined"
                                className='btn btn-outlined-secondary'>
                                Predict
                            </Button> */}
                    </Box>

                </Box>
                <Box className='learn-n-earn-cards'>
                    <Box className='learn-n-earn-card'>
                        <Box className='learn-n-earn-video-wrapper'>
                            <img src={Learn01} alt='' />
                        </Box>
                        <span className='learn-badge'>Learn & Earn</span>
                        <Typography component="p" variant='body1' className='body-large'>
                            Learn about UI8 coin and earn an All-Access Pass
                        </Typography>
                        <Box className='learn-n-earn-by'>
                            <span className='circle'></span>
                            <Typography component="small" variant='body2' className='body-caption'>
                                Floyd Buckridge
                            </Typography>
                            <Typography component="small" variant='body2' className='body-caption' sx={{ marginLeft: 'auto' }}>
                                Feb 03, 2021
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='learn-n-earn-card'>
                        <Box className='learn-n-earn-video-wrapper'>
                            <img src={Learn01} alt='' />
                        </Box>
                        <span className='learn-badge'>weekly watchlist airdrop</span>
                        <Typography component="p" variant='body1' className='body-large'>
                            Submit your watchlist and win USDT
                        </Typography>
                        <Box className='learn-n-earn-by'>
                            <span className='circle'></span>
                            <Typography component="small" variant='body2' className='body-caption'>
                                Floyd Buckridge
                            </Typography>
                            <Typography component="small" variant='body2' className='body-caption' sx={{ marginLeft: 'auto' }}>
                                Feb 03, 2021
                            </Typography>
                        </Box>
                    </Box>
                    <Box className='learn-n-earn-card'>
                        <Box className='learn-n-earn-video-wrapper'>
                            <img src={Learn01} alt='' />
                        </Box>
                        <span className='learn-badge'>featured</span>
                        <Typography component="p" variant='body1' className='body-large'>
                            Submit your watchlist and win USDT
                        </Typography>
                        <Box className='learn-n-earn-by'>
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
                    sx={{ mt: 10, mx: 'auto' }}
                    variant="outlined"
                    className='btn btn-outlined-secondary' startIcon={<RotateLeftIcon />}>
                    Load more
                </Button>
            </Box>
        </>
    )
}

export default LearnNEarn
