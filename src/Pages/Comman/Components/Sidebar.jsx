import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import PropTypes from "prop-types";
import { Box, Typography, Stack } from "@mui/material";
import UserDark from "../../../../public/assets/images/user.svg";
import ShareIcon from "../../../../public/assets/images/share-light.svg";
import UserIcon from "../../../../public/assets/images/user-light.svg";
import ShareDark from "../../../../public/assets/images/share-dark.svg";
import SessionIcon from "../../../../public/assets/images/session-light.svg";
import SessionDark from "../../../../public/assets/images/session-dark.svg";
import SubscriptionIcon from "../../../../public/assets/images/api.svg";
import SubscriptionDark from "../../../../public/assets/images/subs-dark.svg";
import FaIcon from "../../../../public/assets/images/fa-light.svg";
import FaDark from "../../../../public/assets/images/fa-dark.svg";
import Lockbtn from "../../../../public/assets/images/lock-light.svg";
import LockbtnDark from "../../../../public/assets/images/lock-dark.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { sidebarAtom } from "../../../_state";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useRecoilState(sidebarAtom);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/account") setActiveTab("profile");
  }, [location]);

  return (
    <Box className="subscription-steps-col">
      <Stack spacing={2}>
        <Box sx={{ borderBottom: "1px solid #E6E8EC" }} paddingBottom={2}>
          <Typography
            onClick={(e) => {
              setActiveTab("profile");
              navigate("/account/profile");
            }}
            className={`left-icon secondary-color ${
              activeTab === "profile" ? "text-black" : ""
            }`}
            paddingBottom={4}
            fontWeight={700}
          >
            <span>
              <img className="dark-icon" src={UserDark} />{" "}
              <img className="light-icon" src={UserIcon} />{" "}
            </span>
            Profile
          </Typography>
          <Typography
            onClick={(e) => {
              setActiveTab("referrals");
              navigate("/account/referrals");
            }}
            className={`left-icon secondary-color ${
              activeTab === "referrals" ? "text-black" : ""
            }`}
            paddingBottom={4}
          >
            <span>
              <img className="light-icon" src={ShareIcon} />{" "}
              <img className="dark-icon" src={ShareDark} />{" "}
            </span>
            Referrals
          </Typography>
          {/* <Typography className='left-icon secondary-color' paddingBottom={2}><span><img src={SubscriptionIcon} /> </span>API keys</Typography> */}
          <Typography
            onClick={() => {
              setActiveTab("Subscription");
              navigate("/account/forecast-subscription");
            }}
            className={`left-icon secondary-color ${
              activeTab === "Subscription" ? "text-black" : ""
            }`}
            paddingBottom={2}
          >
            <span>
              <img className="light-icon" src={SubscriptionIcon} />{" "}
              <img className="dark-icon" src={SubscriptionDark} />{" "}
            </span>
            Subscriptions
          </Typography>
        </Box>
        <Box paddingTop={2}>
          <Typography
            onClick={() => {
              setActiveTab("sessionAndHistory");
              navigate("/account/session-and-history");
            }}
            className={`left-icon secondary-color ${
              activeTab === "sessionAndHistory" ? "text-black" : ""
            }`}
            paddingBottom={4}
          >
            <span>
              <img className="light-icon" src={SessionIcon} />{" "}
              <img className="dark-icon" src={SessionDark} />{" "}
            </span>
            Sessions & login history
          </Typography>
          <Typography
            onClick={() => {
              setActiveTab("2fa");
              navigate("/account/2fa-enable");
            }}
            className={`left-icon secondary-color ${
              activeTab === "2fa" ? "text-black" : ""
            }`}
            paddingBottom={4}
          >
            <span>
              <img className="light-icon" src={FaIcon} />{" "}
              <img className="dark-icon" src={FaDark} />{" "}
            </span>
            2FA
          </Typography>
          <Typography
            onClick={() => {
              setActiveTab("changePassword");
              navigate("/account/change-account-password");
            }}
            className={`left-icon secondary-color ${
              activeTab === "changePassword" ? "text-black" : ""
            }`}
            paddingBottom={4}
          >
            <span>
              <img className="light-icon" src={Lockbtn} />
              <img className="dark-icon" src={LockbtnDark} />{" "}
            </span>
            Change password
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
