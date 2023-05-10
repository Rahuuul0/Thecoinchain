import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./HomePage";
import Login from "./Login";

const Customer = () => {
  return (
    <div className="customer-panel">
      <Header />
      <Routes>
        <Route path={`/home`} element={<Home />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/`} exact element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Customer;
