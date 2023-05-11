import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const TopRatedArtists = () => {
    return (
        <>
            <Box component="div" className='top-rated-artists' sx={{ py: 6 }}>
                <Container maxWidth="lg">
                    <Typography component="h1" variant="h1" sx={{ color: 'white' }}>
                        Top Rated Artists
                    </Typography>
                </Container>
            </Box>
        </>
    )
}

export default TopRatedArtists
