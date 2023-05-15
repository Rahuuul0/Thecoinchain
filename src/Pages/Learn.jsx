import React from 'react'
import { Box, Container, Link, Typography, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import PriceTicker from './Comman/PriceTicker'
import CurrencyImg from '../../public/assets/images/icons/btc.svg'
import NewsImg from '../../public/assets/images/coinbase.png'
import TimeIc from '../../public/assets/images/icons/time-ic.svg'

const Learn = () => {
    return (
        <>
            <Box component="main" className='course-page' sx={{ py: 8 }}>
                <PriceTicker />
                <Box component="div" className=''>
                    <Container maxWidth="lg">
                        <Typography component="h1" variant='h1'>
                            Learn
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </>
    )
}

export default Learn
