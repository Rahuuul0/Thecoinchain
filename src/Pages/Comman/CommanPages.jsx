import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import LogIn from "./LogIn";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import CreatePassword from "./CreatePassword";
import CreateAccount from "./CreateAccount";
import Home from "./Components/HomePage/HomePage";
import ScanToLogin from "./ScanToLogin";
import AccountConfirm from "./AccountConfirm";

const Customer = () => {
  return (
    <div className="customer-panel">      
      <Routes>
        <Route path={`/`} exact element={<><Header /> <Home /> <Footer /></>} />      
        <Route path={`/login`} element={<LogIn />} />
        <Route path={`/forgot-password`} element={<ForgotPassword />} />
        <Route path={`/create-password`} element={<CreatePassword />} />
        <Route path={`/reset-password`} element={<ResetPassword />} />
        <Route path={`/create-account`} element={<CreateAccount />} />
        <Route path={`/scan-to-login`} element={<ScanToLogin />} />
        <Route path={`/confirm-account`} element={<AccountConfirm />} />
      </Routes>     
    </div>
  );
};

export default Customer;
