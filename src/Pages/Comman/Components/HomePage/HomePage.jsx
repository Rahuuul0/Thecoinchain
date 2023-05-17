import * as React from 'react';
import { Link, Grid, Container, Typography, Toolbar, Box, CssBaseline, Button } from '@mui/material';
import PriceTicker from '../../PriceTicker';
import CryptoList from '../../CryptoList';

const Home = () => {
  return (
    <>
      <Box component="main" sx={{ pt: 8 }}>
        <PriceTicker />
        <CryptoList />
      </Box>
    </>
  );
}

export default Home;