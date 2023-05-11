import * as React from 'react';
import { Link, Grid, Container, Typography, Toolbar, Box, CssBaseline, Button } from '@mui/material';
import HeroSection from './HeroSection';
import TopRatedArtists from '../../TopRatedArtists';
import PriceTicker from './PriceTicker';

const Home = () => {
  return (
    <>
      <Box component="main" sx={{ py: 8 }}>
        <PriceTicker />
        <HeroSection />
        <TopRatedArtists />
      </Box>
    </>
  );
}

export default Home;