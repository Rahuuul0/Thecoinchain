import { Route, Routes ,Navigate ,Outlet} from "react-router-dom";
import { useRecoilState, useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HeaderWithLogin from "./Components/HeaderWithLogin";
import LogIn from "./LogIn";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
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
import SubsPage from "./SubsPage";
import Referrals from "./Referrals";
import ChangePassword from "./ChangePassword";
import FaEnable from "./FaEnable";
import PrivacyPolicy from "./PrivacyPolicy";
import FaDisable from "./FaDisable";
import Disclaimer from "./Disclaimer";
import TermsOfUse from "./TermsOfUse";

import {authAtom} from '../../_state';
import LearnCypto from  "./LearnCypto"
import LearnCyptoDetail from  "./LearnCyptoDetail"
import Contact from  "./Contact"
import Referrals from "./Referrals";

const Customer = () => {
  const auth = useRecoilValue(authAtom); 

  const PrivateOutletWithLogin = ()=> {  
    return auth!==null ? <><HeaderWithLogin /><Outlet /><Footer /></> : <Navigate to="/login" />;
  }

  const PrivateOutlet = ()=> {  
    return <>{auth!==null ? <HeaderWithLogin />:<Header />}<Outlet /><Footer /></>;
  }

  const WithoutHeaderFooter = ()=> {  
    return <Outlet />;
  }
  
  return (
    <div className="customer-panel">
      <Routes>
          <Route path="/" element={<PrivateOutlet />}>
            <Route path={`/`} exact element={<Home />} /> 
            <Route path={`/learn-cypto`} element={<LearnCypto />} />
            <Route path={`/learn-cypto-detail`} element={<LearnCyptoDetail />} />
            <Route path={`/contact-us`} element={<Contact />} />       
            <Route path={`/market`} exact element={<Market />} />
            <Route path={`/predict-market`} exact element={<PredictMarket />} />
            <Route path={`/subscribed-predict-market`} exact element={<SubscribedPredictMarkert />} />
            <Route path={`/prediction-dashboard`} exact element={<PredictionDashboard />} />
            <Route path={`/subscription`} exact element={<Subscription />} />
            <Route path={`/notifications`} exact element={<Notifications />} />
            <Route path={`/session-and-history`} exact element={<SessionHistory />} />
            <Route path={`/subspage`} exact element={<SubsPage />} />
            <Route path={`/referrals`} exact element={<Referrals />} />
            <Route path={`/fa-enable`} exact element={<FaEnable />} />
            <Route path={`/fa-disable`} exact element={<FaDisable />} />
            <Route path={`/privacy-policy`} exact element={<PrivacyPolicy />} />
            <Route path={`/disclaimer`} exact element={<Disclaimer />} />
            <Route path={`/terms-of-use`} exact element={<TermsOfUse />} />  
          </Route>

           {/* For Without Header Footer  pages */}
          <Route path="/" element={<WithoutHeaderFooter />}>            
            <Route path={`/login`} element={<LogIn />} />
            <Route path={`/forgot-password`} element={<ForgotPassword />} />
            <Route path={`/reset-password`} element={<ResetPassword />} />            
            <Route path={`/create-account`} element={<CreateAccount />} />
            <Route path={`/scan-to-login`} element={<ScanToLogin />} />
            <Route path={`/confirm-account`} element={<AccountConfirm />} />              
          </Route>
          
          {/* For account pages */}
          <Route path="/account" element={<PrivateOutletWithLogin />}>
            <Route path="" element={<Profile />} />        
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="profile" element={<Profile />} />          
          </Route>
      </Routes>
    </div>
  );
};

export default Customer;
