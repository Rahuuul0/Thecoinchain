import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';

import { RecoilRoot } from 'recoil';
import App from './App';
// import theme from './theme';

// const theme = createTheme({
//   typography: {
//     h1: {
//       fontSize: '64px'
//     },
//     h2: {
//       fontSize: '64px'
//     },
//     h3: {
//       fontSize: '64px'
//     },
//     h4: {
//       fontSize: '64px'
//     },
//     h5: {
//       fontSize: '64px'
//     }
//   }
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <Suspense fallback={() => { <h1>🌀 Loading...</h1> }}>
      {/* <ThemeProvider theme={theme}> */}
      <App />
      {/* </ThemeProvider> */}
    </Suspense>
  </RecoilRoot>
);

reportWebVitals()
