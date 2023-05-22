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
import LearnCypto from "./LearnCypto"
import LearnCyptoDetail from "./LearnCyptoDetail"
import Contact from "./Contact"
import Market from "./Market";
import PredictMarket from "./PredictMarket";
import SubscribedPredictMarkert from "./SubscribedPredictMarkert";
import PredictionDashboard from "./PredictionDashboard";
import Subscription from "./Subscription";
import Profile from "./Profile";
import Notifications from "./Notifications";
import SessionHistory from "./SessionHistory";

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
        <Route path={`/learn-cypto`} element={<LearnCypto />} />
        <Route path={`/learn-cypto-detail`} element={<LearnCyptoDetail />} />
        <Route path={`/contact`} element={<Contact />} />
        <Route path={`/`} exact element={<Home />} />
        <Route path={`/market`} exact element={<Market />} />
        <Route path={`/predict-market`} exact element={<PredictMarket />} />
        <Route path={`/subscribed-predict-market`} exact element={<SubscribedPredictMarkert />} />
        <Route path={`/prediction-dashboard`} exact element={<PredictionDashboard />} />
        <Route path={`/subscription`} exact element={<Subscription />} />
        <Route path={`/profile`} exact element={<Profile />} />
        <Route path={`/notifications`} exact element={<Notifications />} />
        <Route path={`/session-and-history`} exact element={<SessionHistory />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Customer;
