import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./HomePage";
import LogIn from "./LogIn";
import PasswordRecovery from "./PasswordRecovery";
import CreateAccount from "./CreateAccount";

const Customer = () => {
  return (
    <div className="customer-panel">
      <Header />
      <Routes>
        <Route path={`/home`} element={<Home />} />
        <Route path={`/login`} element={<LogIn />} />
        <Route path={`/forgot-password`} element={<PasswordRecovery />} />
        <Route path={`/create-account`} element={<CreateAccount />} />
        <Route path={`/`} exact element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Customer;
