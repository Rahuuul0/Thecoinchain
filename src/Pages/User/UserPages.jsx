
import React, { Suspense } from 'react';
import { Route, Routes} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from './Dashboard/Dashboard';
import Header from './Components/Header';
import Box from '@mui/material/Box';
const theme = createTheme();
const Admin = () => {    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <Header />
                <Box
                    component="main"
                    className='main-wrapper'
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        pt: 6
                    }}
                >
                    <Suspense >
                        <Routes>
                            <Route index element={<Dashboard />} />   
                        </Routes>
                    </Suspense>                   
                </Box>
            </Box>
        </ThemeProvider>
    );
}
export default Admin;