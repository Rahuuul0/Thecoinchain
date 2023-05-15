import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import LogIn from "./LogIn";
import PasswordRecovery from "./PasswordRecovery";
import ResetPassword from "./ResetPassword";
import CreatePassword from "./CreatePassword";
import CreateAccount from "./CreateAccount";
import Home from "./Components/HomePage/HomePage";
import Exchange from "../Exchange"
import Prediction from "../Prediction";
import News from "../News";
import Courses from "../Courses";
import ArticleDetails from "../ArticleDetails";

const Customer = () => {
  return (
    <div className="customer-panel">
      <Header />
      <Routes>
        <Route path={`/home`} element={<Home />} />
        <Route path={`/login`} element={<LogIn />} />
        <Route path={`/password-recovery`} element={<PasswordRecovery />} />
        <Route path={`/forgot-password`} element={<PasswordRecovery />} />
        <Route path={`/create-password`} element={<CreatePassword />} />
        <Route path={`/reset-password`} element={<ResetPassword />} />
        <Route path={`/create-account`} element={<CreateAccount />} />
        {/* <Route path={`/`} exact element={<Home />} /> */}
        <Route path={`/exchanges`} exact element={<Exchange />} />
        <Route path={`/prediction`} exact element={<Prediction />} />
        <Route path={`/news`} exact element={<News />} />
        <Route path={`/course`} exact element={<Courses />} />
        <Route path={`/article-details`} exact element={<ArticleDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Customer;
