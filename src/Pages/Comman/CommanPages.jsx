import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import LogIn from "./Login";
import PasswordRecovery from "./PasswordRecovery";
import ResetPassword from "./ResetPassword";
import CreateAccount from "./CreateAccount";
import Home from "./Components/HomePage/HomePage";
import Exchange from "../Exchange"
import Prediction from "../Prediction";
import News from "../News";

const Customer = () => {
  return (
    <div className="customer-panel">
      <Header />
      <Routes>
        <Route path={`/home`} element={<Home />} />
        <Route path={`/login`} element={<LogIn />} />
        <Route path={`/forgot-password`} element={<PasswordRecovery />} />
        <Route path={`/reset-password`} element={<ResetPassword />} />
        <Route path={`/create-account`} element={<CreateAccount />} />
        {/* <Route path={`/`} exact element={<Home />} /> */}
        <Route path={`/exchanges`} exact element={<Exchange />} />
        <Route path={`/prediction`} exact element={<Prediction />} />
        <Route path={`/news`} exact element={<News />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Customer;
