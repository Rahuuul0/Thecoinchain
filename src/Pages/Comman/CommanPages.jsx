import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import LogIn from "./LogIn";
import PasswordRecovery from "./PasswordRecovery";
import ResetPassword from "./ResetPassword";
import CreatePassword from "./CreatePassword";
import CreateAccount from "./CreateAccount";
import Home from "./Components/HomePage/HomePage";
import ScanToLogin from "./ScanToLogin";
import AccountConfirm from "./AccountConfirm";
import LearnCypto from  "./LearnCypto"
import LearnCyptoDetail from  "./LearnCyptoDetail"
import Contact from  "./Contact"
import Referrals from "./Referrals";

const Customer = () => {
  return (
    <div className="customer-panel">      
      <Routes>
        <Route path={`/`} exact element={<><Header /> <Home /> <Footer /></>} />      
        <Route path={`/login`} element={<LogIn />} />
        <Route path={`/password-recovery`} element={<PasswordRecovery />} />
        <Route path={`/forgot-password`} element={<PasswordRecovery />} />
        <Route path={`/create-password`} element={<CreatePassword />} />
        <Route path={`/reset-password`} element={<ResetPassword />} />
        <Route path={`/create-account`} element={<CreateAccount />} />
        <Route path={`/scan-to-login`} element={<ScanToLogin />} />
        <Route path={`/confirm-account`} element={<AccountConfirm />} /> 
        <Route path={`/learn-cypto`} element={<LearnCypto />} />
        <Route path={`/learn-cypto-detail`} element={<LearnCyptoDetail />} />
        <Route path={`/contact`} element={<Contact />} />
        <Route path={`/`} exact element={<Home />} />
        <Route path={`/referrals`} exact element={<Referrals />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Customer;
