import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Comman from './Pages/Comman/CommanPages';
import { fakeBackend } from './_helpers'
import { alertAtom } from './_state/';
import { SnackbarProvider } from 'notistack';
const App = () => {
   const open = useRecoilValue(alertAtom);
   // setup fake backend
   fakeBackend();

   const loc = window.location || {};
   return (
     
      <Router basename={loc.pathname || 'foobar'}>
         <SnackbarProvider
            autoHideDuration={1000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
         >
            <Routes>
               <Route path="*" exact element={<Comman />} />
            </Routes>
         </SnackbarProvider>
      </Router>
   );
};

export default App;
