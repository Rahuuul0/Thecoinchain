import {
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilValue,
} from "recoil";
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
import LearnCypto from "./LearnCypto";
import LearnCyptoDetail from "./LearnCyptoDetail";
import Contact from "./Contact";
import Market from "./Market";
import PredictMarket from "./PredictMarket";
import SubscribedPredictMarkert from "./SubscribedPredictMarkert";
import PredictionDashboard from "./PredictionDashboard";
import Subscription from "./Subscription";
import Profile from "./Profile";
import Notifications from "./Notifications";
import SessionHistory from "./SessionHistory";
import Referrals from "./Referrals";
import ChangePassword from "./ChangeAccountPassword";
import TwoFaEnable from "./TwoFaEnable";
import PrivacyPolicy from "./PrivacyPolicy";
import TwoFaDisable from "./TwoFaDisable";
import Disclaimer from "./Disclaimer";
import TermsOfUse from "./TermsOfUse";
import ForecastSubscriptions from "./ForecastSubscriptions";
import GuidesAnalysis from "./GuidesAnalysis";
import MuiCryptoNewsSection from "./MuiCryptoNewsSection";
import Community from "./Community";
import { authAtom } from "../../_state";
import NewsPromotions from "./NewsPromotions";
import Academy from "./Academy";
import MasterCourse from "./MasterCourse";
import AcademyAboutCrypto from "./AcademyAboutCrypto";
import SubscriptionPaymentPaypal from "./SubscriptionPaymentPaypal";
import ForgotPasswordPhone from "./ForgotPasswordPhone";
import ContentNotFound from "./ContentNotFound";
import PageNotFound from "./PageNotFound";
import UnSubscribe from "./UnSubscribe";
import ContactDetail from "./ContactDetail";
import MarketBlogDetail from "./MarketBlogDetail";
import FaqDetail from "./FaqDetail";
import GuidesAndAnalyticsDetail from "./GuidesandAnalyticsDetail";
import NewsAndPromotionsDetail from "./NewsAndPromotionsDetail";
import LatestNewsBlogDetail from "./LatestNewsBlogDetail";

const Customer = () => {
  const auth = useRecoilValue(authAtom);
  const PrivateOutletWithLogin = () => {
    return auth ? (
      <>
        <HeaderWithLogin />
        <Outlet />
        <Footer />
      </>
    ) : (
      <Navigate to="/login" />
    );
  };

  const PrivateOutlet = () => {
    return (
      <>
        {auth ? <HeaderWithLogin /> : <Header />}
        <Outlet />
        <Footer />
      </>
    );
  };

  const WithoutHeaderFooter = () => {
    return <Outlet />;
  };

  return (
    <div className="customer-panel">
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path={`/`} exact element={<Home />} />
          <Route path={`/learn-cypto`} element={<LearnCypto />} />
          <Route path={`/learn-cypto-detail/:page/:title`} element={<LearnCyptoDetail />} />
          <Route path={`/contact-detail/:page/:title`} element={<ContactDetail />} />
          <Route path={`/marketblog-detail/:page/:title`} element={<MarketBlogDetail />} />
          <Route path={`/faq-detail/:page/:title`} element={<FaqDetail />} />
          <Route path={`/guides-and-analytics-detail/:page/:title`} element={<GuidesAndAnalyticsDetail />} />
          <Route path={`/news-and-promotions-detail/:page/:title`} element={<NewsAndPromotionsDetail />} />
          <Route path={`/blog-detail/:id`} element={<LatestNewsBlogDetail />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path={`/contact`} element={<Contact />} />
          <Route path={`/market`} exact element={<Market />} />
          <Route path={`/predict-market`} exact element={<PredictMarket />} />
          <Route
            path={`/subscribed-predict-market`}
            exact
            element={<SubscribedPredictMarkert />}
          />
          <Route
            path={`/prediction-dashboard`}
            exact
            element={<PredictionDashboard />}
          />
          <Route path={`/notifications`} exact element={<Notifications />} />
          <Route path={`/privacy-policy`} exact element={<PrivacyPolicy />} />
          <Route path={`/disclaimer`} exact element={<Disclaimer />} />
          <Route path={`/terms-of-use`} exact element={<TermsOfUse />} />
          <Route path={`subscription`} exact element={<Subscription />} />
          <Route path={`guides-analysis`} exact element={<GuidesAnalysis />} />
          <Route path={`latest-news`} exact element={<MuiCryptoNewsSection />} />
          <Route path={`information`} exact element={<MuiCryptoNewsSection />} />
          <Route path={`research-report`} exact element={<MuiCryptoNewsSection />} />
          <Route path={`press-release`} exact element={<MuiCryptoNewsSection />} />
          <Route path={`guest-post`} exact element={<MuiCryptoNewsSection />} />
          <Route path={`sponsored`} exact element={<MuiCryptoNewsSection />} />
          <Route path={`crypto-regulation`} exact element={<MuiCryptoNewsSection />} />
          <Route path={`community`} exact element={<Community />} />
          <Route path={`news-promotions`} exact element={<NewsPromotions />} />
          <Route path={`academy`} exact element={<Academy />} />
          <Route path={`contentnotfound`} exact element={<ContentNotFound />} />
          <Route path={`unsubscribe`} exact element={<UnSubscribe />} />

          <Route
            path={`academy-about-crypto`}
            exact
            element={<AcademyAboutCrypto />}
          />
          <Route path={`master-course`} exact element={<MasterCourse />} />
          <Route
            path={`/subscription-payment`}
            exact
            element={<SubscriptionPaymentPaypal />}
          />
        </Route>

        {/* For Without Header Footer  pages */}
        <Route path="/" element={<WithoutHeaderFooter />}>
          <Route path={`/login`} element={<LogIn />} />
          <Route path={`/forgot-password`} element={<ForgotPassword />} />
          <Route path={`/reset-password`} element={<ResetPassword />} />
          <Route path={`/create-account`} element={<CreateAccount />} />
          <Route path={`/scan-to-login`} element={<ScanToLogin />} />
          <Route path={`/confirm-account`} element={<AccountConfirm />} />
          <Route
            path={`/password-recovery`}
            element={<ForgotPasswordPhone />}
          />
          <Route path={`/create-account/:id`} element={<CreateAccount />} />
        </Route>

        {/* For account pages */}
        <Route path="/account" element={<PrivateOutletWithLogin />}>
          <Route path="" element={<Profile />} />
          <Route path="change-account-password" element={<ChangePassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path={`referrals`} element={<Referrals />} />
          <Route path={`2fa-enable`} element={<TwoFaEnable />} />
          <Route path={`2fa-disable`} element={<TwoFaDisable />} />
          <Route path={`session-and-history`} element={<SessionHistory />} />
          <Route
            path={`forecast-subscription`}
            exact
            element={<ForecastSubscriptions />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default Customer;
