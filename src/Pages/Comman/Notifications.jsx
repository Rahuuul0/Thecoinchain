import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../_common/app.constants";
import {
  Box,
  Container,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import LoadMoreIc from "../../../public/assets/images/icons/cale-ic.svg";
import DepositImg from "../../../public/assets/images/deposit.svg";
import TransferImg from "../../../public/assets/images/transfer.svg";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  notificationAtom,
  authAtom,
  categoryAtom,
  notificationViewAtom,
} from "../../_state/";
import { notificationActions } from "../../_actions/notification.actions";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

const Notifications = () => {
  const navigate = useNavigate();
  const notificationAction = notificationActions();
  const notifications = useRecoilValue(notificationViewAtom);
  const userDetails = useRecoilValue(authAtom);
  const [loadmore, setLoadmore] = useState(10);
  const [checked, setChecked] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  const [filterCategory, setFilterCategory] = useState([
    "Crypto Prediction",
    "Community",
    "Academy",
    "News",
  ]);
  const [checkCrypto, setCheckCrypto] = useState(false);
  const [checkCommunity, setCheckCommunity] = useState(false);
  const [checkAcademy, setCheckAcademy] = useState(false);
  const [checkNews, setCheckNews] = useState(false);
  const [singleDisable, setSingleDisable] = useState(true);

  console.log(notifications, "notifications 555");

  const handleClear = async (action) => {
    notificationAction.clearNotifications({ action });
  };

  const singleRead = async (notId) => {
    notificationAction.notificationSingleread(notId);
  };

  const handleSelectAll = (flag) => {
    let categoryArr = categoryArray;
    if (flag) {
      setCheckCrypto(true);
      setCheckCommunity(true);
      setCheckAcademy(true);
      setCheckNews(true);
      filterCategory.map((category, idx) => {
        const index = categoryArray.indexOf(category);
        if (index === -1) categoryArr.push(category);
      });
    } else {
      setCheckCrypto(false);
      setCheckCommunity(false);
      setCheckAcademy(false);
      setCheckNews(false);
      filterCategory.map((category, idx) => {
        const index = categoryArray.indexOf(category);
        if (index > -1) categoryArr.splice(index, 1);
      });
    }

    setCategoryArray(categoryArr);
    const where = new URLSearchParams({
      category: categoryArr,
    });
    categoryArr.length > 0
      ? notificationAction.categoryNotifications(categoryArr)
      : notificationAction.notificationList_View();
    flag ? setChecked(true) : setChecked(false);
  };

  const handleLoadmore = () => {
    if (notifications.length % 5 < 5) {
      setLoadmore(loadmore + (notifications.length - loadmore));
    } else {
      setLoadmore(loadmore + 10);
    }
  };

  useEffect(() => {
    notificationAction.notificationList_View();

    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
  }, []);

  const showFilteredNotification = (e, cat) => {
    let categoryArr = categoryArray;
    const index = categoryArray.indexOf(cat);
    if (e.target.checked) {
      if (index === -1) categoryArr.push(cat);
    } else {
      if (index > -1) categoryArr.splice(index, 1);
    }
    if (cat === "Crypto Prediction") setCheckCrypto(e.target.checked);
    if (cat === "Community") setCheckCommunity(e.target.checked);
    if (cat === "Academy") setCheckAcademy(e.target.checked);
    if (cat === "News") setCheckNews(e.target.checked);
    setCategoryArray(categoryArr);
    categoryArr.length > 0
      ? notificationAction.categoryNotifications(categoryArr)
      : notificationAction.notificationList_View();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box component="main" className="notification-wrapper" sx={{ mt: 8 }}>
          <Container maxWidth="lg">
            <Box className="notification-inner">
              <Box className="notification-list-card">
                <Box className="notification-wrapper-head">
                  <Typography component="h4" variant="h4">
                    Notifications
                  </Typography>
                  {notifications.length > 0 && (
                    <Box className="notification-head-cta">
                      <Box className="modal-subscribed-cta">
                        <Button
                          onClick={(e) => handleClear("all_read")}
                          variant="outlined"
                          className="btn btn-outlined-secondary"
                        >
                          Mark all as read
                        </Button>
                        <Button
                          onClick={(e) => handleClear("all_clear")}
                          variant="outlined"
                          className="btn btn-outlined-secondary"
                        >
                          Clear all
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box className="devider" />
                <Box className="notification-list-wrapper">
                  <Box className="notification-list">
                    {notifications.length > 0 ? (
                      notifications?.map((item, index) => {
                        if (index < loadmore) {
                          let description = item.ct_notify_msg;
                          return (
                            <Box
                              style={{
                                cursor:
                                  item.ct_notify_read_status == null
                                    ? "pointer"
                                    : "default",
                              }}
                              onClick={() => {
                                setTimeout(() => {
                                  setSingleDisable(true);
                                }, 1500);

                                if (
                                  singleDisable &&
                                  item.ct_notify_read_status == null
                                ) {
                                  setSingleDisable(false);
                                  singleRead(item.ct_notiy_id);
                                }
                              }}
                              className="notification-list-itm"
                            >
                              <Box className="notification-icon">
                                <BoltOutlinedIcon />
                              </Box>
                              <Box className="notification-title notification-title.MuiBox-root">
                                <Box className="notification-title-wrapper">
                                  <Box className="notification-title-inner">
                                    <Typography component="h6" variant="body">
                                      {item.ct_notify_title}
                                    </Typography>
                                    <Typography
                                      component="small"
                                      variant="body2"
                                    >
                                      {item.ct_notify_catrgory}
                                    </Typography>
                                  </Box>
                                  <Box className="notification-date">
                                    <Typography
                                      component="small"
                                      variant="body2"
                                    >
                                      <span className="n-date">
                                        {" "}
                                        {item.ct_notify_created_At}{" "}
                                      </span>
                                    </Typography>

                                    <span
                                      className="notification-circle"
                                      style={{
                                        backgroundColor:
                                          item.ct_notify_read_status != null
                                            ? "#777e90"
                                            : "#58bd7d",
                                      }}
                                    ></span>
                                  </Box>
                                </Box>
                                <Typography className="notification_elip_typo " component="p" variant="p">
                                  {ReactHtmlParser(description)}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        }
                      })
                    ) : (
                      <span>No New Notifications Available</span>
                    )}

                    {notifications.length > 0 &&
                      loadmore >= 10 &&
                      notifications.length > loadmore && (
                        <Button
                          onClick={handleLoadmore}
                          variant="outlined"
                          className="btn btn-outlined-secondary"
                          sx={{ mx: "auto" }}
                        >
                          Load more <img src={LoadMoreIc} alt="" />{" "}
                        </Button>
                      )}
                  </Box>
                  {/* {notifications.length>0 &&    */}
                  <Box className="notification-filter for-desktop">
                    <Typography component="h5" variant="h5">
                      Filters
                    </Typography>

                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkCrypto}
                            onChange={(e) => {
                              showFilteredNotification(e, "Crypto Prediction");
                            }}
                          />
                        }
                        label="Crypto Prediction"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkCommunity}
                            onChange={(e) => {
                              showFilteredNotification(e, "Community");
                            }}
                          />
                        }
                        label="Community"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkAcademy}
                            onChange={(e) => {
                              showFilteredNotification(e, "Academy");
                            }}
                          />
                        }
                        label="Academy"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkNews}
                            onChange={(e) => {
                              showFilteredNotification(e, "News");
                            }}
                          />
                        }
                        label="News"
                      />
                    </FormGroup>

                    <Box className="notification-filter-cta">
                      {!checked ? (
                        <Button
                          onClick={(e) => handleSelectAll(true)}
                          size="small"
                          variant="outlined"
                          className="btn btn-outlined-secondary"
                        >
                          Select all
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => handleSelectAll(false)}
                          size="small"
                          variant="outlined"
                          className="btn btn-outlined-secondary"
                        >
                          Unselect all
                        </Button>
                      )}
                    </Box>
                  </Box>
                  {/* } */}
                </Box>
              </Box>
              <Box className="deposit-transfer">
                <Box className="deposit-transfer-card">
                  <Box className="deposit-transfer-img">
                    <img src={DepositImg} alt="Deposit" />
                  </Box>
                  <Box className="deposit-transfer-details">
                    <Typography component="h5" variant="h5">
                      Bank deposit
                    </Typography>
                    <Typography
                      component="p"
                      variant="body1"
                      className="body-caption"
                    >
                      Deposit crypto or cash currency to your wallet and start
                      trading on the world largest exchange!
                    </Typography>
                    <Button
                      onClick={() => {
                        navigate("/contentnotfound");
                      }}
                      size="small"
                      variant="outlined"
                      className="btn btn-outlined-secondary"
                      endIcon={<ArrowRightAltOutlinedIcon />}
                    >
                      Bank deposit
                    </Button>
                  </Box>
                </Box>
                <Box className="deposit-transfer-card">
                  <Box className="deposit-transfer-img">
                    <img src={TransferImg} alt="Transfer" />
                  </Box>
                  <Box className="deposit-transfer-details">
                    <Typography component="h5" variant="h5">
                      Transfer
                    </Typography>
                    <Typography
                      component="p"
                      variant="body1"
                      className="body-caption"
                    >
                      Internal transfers are free on Coinguru.
                    </Typography>
                    <Button
                      onClick={() => {
                        navigate("/contentnotfound");
                      }}
                      size="small"
                      variant="outlined"
                      className="btn btn-outlined-secondary"
                      endIcon={<ArrowRightAltOutlinedIcon />}
                    >
                      Transfer coin
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Notifications;
