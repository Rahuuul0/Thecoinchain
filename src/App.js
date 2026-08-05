import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { SnackbarProvider } from "notistack";

import Comman from "./Pages/Comman/CommanPages";
import { fakeBackend } from "./_helpers";
import { alertAtom } from "./_state";

const App = () => {
  const open = useRecoilValue(alertAtom);

  fakeBackend();

  return (
    <HelmetProvider>
      <Router>
        <SnackbarProvider
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
        >
          <Routes>
            <Route path="*" element={<Comman />} />
          </Routes>
        </SnackbarProvider>
      </Router>
    </HelmetProvider>
  );
};

export default App;