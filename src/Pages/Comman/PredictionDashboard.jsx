import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button, Modal } from '@mui/material'
import CryptoTable from './CryptoTable';
import FAQ01 from '../../../public/assets/images/faq-01.svg'
import FAQ02 from '../../../public/assets/images/faq-02.svg'
import FAQ03 from '../../../public/assets/images/faq-03.svg'
import FAQ04 from '../../../public/assets/images/faq-04.svg'
import FAQ05 from '../../../public/assets/images/faq-05.svg'
import FAQ06 from '../../../public/assets/images/faq-06.svg'

const PredictionDashboard = () => {

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='prediction-dashboard-wrapper' sx={{ mt: 8 }}>
                    <Box className='market-prediction-dashboard-inner'>
                        <Container maxWidth="lg">
                            <Typography component="h4" variant='h4'>
                                Cryptocurrency Prediction
                            </Typography>
                            <CryptoTable />
                        </Container>
                        <Box className='market-prediction-faq'>
                            <Container maxWidth="lg">
                                <Typography component="h5" variant='body1' className='large-caption'>
                                    FAQ
                                </Typography>
                            </Container>
                            <Box className='market-prediction-faq-items-wrapper'>
                                <Container maxWidth="lg">
                                    <Box className='market-prediction-faq-items'>
                                        <Box className='market-prediction-faq-item'>
                                            <Box className='market-prediction-faq-item-img'>
                                                <img src={FAQ01} alt='FAQ' />
                                            </Box>
                                            <Box className='market-prediction-faq-item-content'>
                                                <Typography component="small" variant='body2' className='small-caption' sx={{ color: '#777E90' }}>
                                                    Blockchain
                                                </Typography>
                                                <Typography component="p" variant='body1' className='body-caption' sx={{ fontWeight: '500' }}>
                                                    How to deposit/withdraw cryptocurrency on
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box className='market-prediction-faq-item'>
                                            <Box className='market-prediction-faq-item-img'>
                                                <img src={FAQ02} alt='FAQ' />
                                            </Box>
                                            <Box className='market-prediction-faq-item-content'>
                                                <Typography component="small" variant='body2' className='small-caption' sx={{ color: '#777E90' }}>
                                                    Blockchain
                                                </Typography>
                                                <Typography component="p" variant='body1' className='body-caption' sx={{ fontWeight: '500' }}>
                                                    How to deposit/withdraw cryptocurrency on
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box className='market-prediction-faq-item'>
                                            <Box className='market-prediction-faq-item-img'>
                                                <img src={FAQ03} alt='FAQ' />
                                            </Box>
                                            <Box className='market-prediction-faq-item-content'>
                                                <Typography component="small" variant='body2' className='small-caption' sx={{ color: '#777E90' }}>
                                                    Blockchain
                                                </Typography>
                                                <Typography component="p" variant='body1' className='body-caption' sx={{ fontWeight: '500' }}>
                                                    How to deposit/withdraw cryptocurrency on
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box className='market-prediction-faq-item'>
                                            <Box className='market-prediction-faq-item-img'>
                                                <img src={FAQ04} alt='FAQ' />
                                            </Box>
                                            <Box className='market-prediction-faq-item-content'>
                                                <Typography component="small" variant='body2' className='small-caption' sx={{ color: '#777E90' }}>
                                                    Blockchain
                                                </Typography>
                                                <Typography component="p" variant='body1' className='body-caption' sx={{ fontWeight: '500' }}>
                                                    How to deposit/withdraw cryptocurrency on
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box className='market-prediction-faq-item'>
                                            <Box className='market-prediction-faq-item-img'>
                                                <img src={FAQ05} alt='FAQ' />
                                            </Box>
                                            <Box className='market-prediction-faq-item-content'>
                                                <Typography component="small" variant='body2' className='small-caption' sx={{ color: '#777E90' }}>
                                                    Blockchain
                                                </Typography>
                                                <Typography component="p" variant='body1' className='body-caption' sx={{ fontWeight: '500' }}>
                                                    How to deposit/withdraw cryptocurrency on
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box className='market-prediction-faq-item'>
                                            <Box className='market-prediction-faq-item-img'>
                                                <img src={FAQ06} alt='FAQ' />
                                            </Box>
                                            <Box className='market-prediction-faq-item-content'>
                                                <Typography component="small" variant='body2' className='small-caption' sx={{ color: '#777E90' }}>
                                                    Blockchain
                                                </Typography>
                                                <Typography component="p" variant='body1' className='body-caption' sx={{ fontWeight: '500' }}>
                                                    How to deposit/withdraw cryptocurrency on
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Button
                                        sx={{ mt: 2 }}
                                        variant="outlined"
                                        className='btn btn-outlined-secondary'>
                                        View All
                                    </Button>
                                </Container>
                            </Box>
                        </Box>
                    </Box>
                </Box >
            </ThemeProvider>
        </>
    )
}

export default PredictionDashboard
