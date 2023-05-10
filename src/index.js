import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { RecoilRoot } from 'recoil';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <Suspense fallback={() => { <h1>🌀 Loading...</h1> }}>
      <App />
    </Suspense>
  </RecoilRoot>
);

reportWebVitals()
