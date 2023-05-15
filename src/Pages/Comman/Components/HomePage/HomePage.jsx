import * as React from 'react';
import { Link, Grid, Container, Typography, Toolbar, Box, CssBaseline, Button } from '@mui/material';
import HeroSection from './HeroSection';
import TopRatedArtists from '../../TopRatedArtists';
import PriceTicker from '../../PriceTicker';
import CryptoList from '../../CryptoList';
import FreeGuide from '../../FreeGuide';
import PartnersLogos from '../../PartnersLogos';

const Home = () => {
  return (
    <>
      <Box component="main" sx={{ py: 8 }}>
        <PriceTicker />
        <CryptoList />
        <FreeGuide />
        {/* <HeroSection />
        <TopRatedArtists /> */}
        <PartnersLogos />
      </Box>
    </>
  );
}

export default Home;