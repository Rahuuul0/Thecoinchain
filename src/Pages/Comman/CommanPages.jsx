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

const Customer = () => {
  return (
    <div className="customer-panel">
      <Header />
      <Routes>
        <Route path={`/login`} element={<LogIn />} />
        <Route path={`/password-recovery`} element={<PasswordRecovery />} />
        <Route path={`/forgot-password`} element={<PasswordRecovery />} />
        <Route path={`/create-password`} element={<CreatePassword />} />
        <Route path={`/reset-password`} element={<ResetPassword />} />
        <Route path={`/create-account`} element={<CreateAccount />} />
        <Route path={`/scan-to-login`} element={<ScanToLogin />} />
        <Route path={`/confirm-account`} element={<AccountConfirm />} />
        <Route path={`/`} exact element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Customer;
