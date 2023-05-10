import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
const Header = () => {
  return (
    <>
      <AppBar position="static" color="default" className='app_bar'>
        <Container maxWidth="fluid">
          Header
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
