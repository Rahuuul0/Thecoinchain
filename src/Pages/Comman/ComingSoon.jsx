import React from 'react';

import { Box, Container, Typography, Stack} from '@mui/material';
import CoinGuru from '../../../public/assets/images/logo.svg';
import {Facebook,Twitter,Instagram, LinkedIn,Pinterest} from '@mui/icons-material';
const ComingSoon = () => {

    return (
        <>
        <Container   paddingTop={15} maxWidth="fluid">
            <Box  className='coming-out-box'>
                <Box textAlign='center' className='coming-in-box'>
                     <img src={CoinGuru} alt='Coin Guru' style={{ cursor: 'pointer' }} />
                     <Typography paddingTop={2} className='' variant='h1' component='h1'>WE'RE COMING SOON</Typography>
                    <Typography paddingY={2} component='p' variant='p'>We're coming soon! We're working hard to give you the best experience!</Typography>
                    <Stack spacing={3} direction='row' justifyContent='center'>
                        <Facebook/>
                        <Twitter/>
                        <Instagram/>
                        <LinkedIn/>
                        <Pinterest/>
                    </Stack>
                </Box>
            </Box>
            
        </Container>
        </>
    )
}

export default ComingSoon
