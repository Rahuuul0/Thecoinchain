import {
  Box,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Fade,
  Backdrop,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ChartUp from "../../../public/assets/images/chart-up.svg";
import LiveSparkline from "./Components/LiveSparkline";
import CryptoChartModal from "./Components/CryptoChartModal";
import DollarImg from "../../../public/assets/images/icons/dollar.svg";
import FavoriteIc from "../../../public/assets/images/icons/star.svg";
import FavoritefilledIc from "../../../public/assets/images/icons/star-filled.svg";
import TimeImg from "../../../public/assets/images/icons/time-ic.svg";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import HttpsIcon from "@mui/icons-material/Https";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Line, Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  useCoinActions,
  subscriptionActions,
} from "../../_actions";
import {
  coinsAtom,
  userAtom,
  forecastSubAtom,
  authAtom,
  loaderAtom,
  predictionAtom,
} from "../../_state";
import LoadingImg from "../../../public/assets/images/icons/loading.svg";

import { TabPanel } from "@mui/lab";
import { Favorite } from "@mui/icons-material";
import dayjs from "dayjs";
import LoadingButton from '@mui/lab/LoadingButton';

ChartJS.register(...registerables);

function paginator(items, current_page, per_page_items) {
  let page = current_page || 1,
    per_page = per_page_items,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
}

const formatPercentage = (value) =>
  Number.isFinite(value) ? `${value.toFixed(2)}%` : "—";

const CryptoTable = (props) => {
  const coinActions = useCoinActions();
  const coinsList = useRecoilValue(coinsAtom);
  const userDetail = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const [value, setValue] = useState("3");
  const location = useLocation();
  const [isHovered, setHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState();
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState("");
  const [chartOpen, setChartOpen] = useState(false);
  const [selectedChartCoin, setSelectedChartCoin] = useState(null);
  const count = Math.ceil(coinsList.length / 4);

  const [limit, setLimit] = useState(location.pathname === "/prediction-dashboard" ? 100 : 10);
  const [page, setPage] = useState(1);

  const subscriptionAction = subscriptionActions();
  const subscriptionDetails = useRecoilValue(forecastSubAtom);
  const [loader, setLoader] = useRecoilState(loaderAtom);
  const [timeFrame, setTimeFrame] = useState("1h");
  const date = new Date();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  const handleMouseOver = (index) => {
    setHover(true);
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHover(false);
    setHoverIndex("");
  };

  const handleOpen = (id) => {
    setOpen(true);
    setChartData(coinsList.filter((item) => item.id === id));
  };
  const handleClose = () => {
    setOpen(false);
    setChartData("");
  };

  const handleChartOpen = (item) => {
    setSelectedChartCoin(item);
    setChartOpen(true);
  };

  const handleChartClose = () => {
    setChartOpen(false);
    setSelectedChartCoin(null);
  };

  useEffect(() => {
    if (userDetail && !subscriptionDetails.id) {
      subscriptionAction.subscribedUser();
    }
  }, []);

  // Latest Listing API call
  useEffect(() => {
    setLoader(true);

    if (location.pathname === "/prediction-dashboard") {
      coinActions.predictionListing(`?page=${page}&limit=100`);
    } else {
      getLastestListing();
    }
  }, [subscriptionDetails, location.pathname]);

  const getLastestListing = async () => {
    let param = "";

    location.pathname === "/market"
      ? (param = `?limit=10`)
      : (param = `?limit=5`);

    const ress = await coinActions.latestListing(param);
  };

  useEffect(() => {
    const refreshMarkets = () => {
      if (location.pathname === "/prediction-dashboard") {
        return coinActions.predictionListing(`?page=${page}&limit=100`);
      }
      return getLastestListing();
    };

    const interval = setInterval(refreshMarkets, 60000);
    return () => clearInterval(interval);
  }, [location.pathname, subscriptionDetails, page]);

  const handlePageChange = async (event, newPage) => {
    if (newPage === page) return;
    setPage(newPage);
    setLoader(true);
    try {
      if (location.pathname === "/prediction-dashboard") {
        await coinActions.predictionListing(`?page=${newPage}&limit=100`);
      } else if (location.pathname === "/market") {
        await coinActions.latestListing(`?page=${newPage}&limit=20`);
      } else {
        await coinActions.latestListing(`?page=${newPage}&limit=10`);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setLoader(false);
    }

    const tableEl = document.querySelector(".crypto-list-table");
    if (tableEl) {
      tableEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Box className="crypto-list" sx={{ py: 2 }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box className="crypto-list-table" sx={{ border: '1px solid #6b656540', padding: '20px 0' }}>
          <TableContainer>
            <Stack spacing={2}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow hover>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    {location.pathname === "/prediction-dashboard" ? (
                      <>
                        <TableCell align="right">1h</TableCell>
                        <TableCell align="right">24h</TableCell>
                        <TableCell align="right">7d</TableCell>
                        <TableCell align="right">Volume (24h)</TableCell>
                        <TableCell align="right">Marketcap</TableCell>
                      </>
                    ) : location.pathname === "/market" ? (
                      <>
                        <TableCell align="right">24h Change </TableCell>
                        <TableCell align="right">7d %</TableCell>
                        <TableCell align="right">Marketcap</TableCell>
                        <TableCell align="right">Volume(24h)</TableCell>
                      </>
                    ) : (
                      <TableCell align="right">24h Change </TableCell>
                    )}
                    <TableCell align="right">Chart</TableCell>
                    {location.pathname === "/" ? (
                      <TableCell align="right">Predict</TableCell>
                    ) : (
                      ""
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(location.pathname === "/prediction-dashboard"
                    ? coinsList
                    : paginator(coinsList, page, limit).data
                  ).map((item, index) => {
                    let newPrice =
                      item?.price > 1
                        ? Math.round(item.price * 100) / 100
                        : item?.price < 1 && item?.price >= 0.1
                          ? (Math.round(item.price * 10000) / 10000)?.toFixed(2)
                          : item?.price < 0.1 && item?.price > 0.01
                            ? (Math.round(item.price * 1000000) / 1000000)?.toFixed(
                              6
                            )
                            : item?.price < 0.01
                              ? (
                                Math.round(item.price * 100000000) / 100000000
                              )?.toFixed(8)
                              : item?.price;
                    return (
                      <TableRow
                        key={index}
                        divider={index < coinsList.length - 1}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          {/* {location.pathname === "/prediction-dashboard" && (
                            <img
                              src={FavoriteIc}
                              alt="star"
                              className="favorite-ic"
                              style={{ cursor: "pointer" }}
                            />
                          )} */}
                          {item.cmc_rank || (page - 1) * 100 + index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="crypto-name">
                            <img
                              src={item.image}
                              alt={item.symbol}
                              width="33px"
                            />
                            {item.name}{" "}
                            <span className="currency_name">{item.symbol}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          $
                          {newPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                        {location.pathname === "/prediction-dashboard" ? (
                          <TableCell align="right">
                            <span className={item.percent_change_1h < 0 ? "down" : "up"}>
                              {formatPercentage(item.percent_change_1h)}
                            </span>
                          </TableCell>
                        ) : (
                          <TableCell align="right">
                            <span
                              className={
                                item.percent_change_24h < 0 ? "down" : "up"
                              }
                            >
                              {Math.round(
                                (item.percent_change_24h + Number.EPSILON) * 100
                              ) / 100}
                              %
                            </span>
                          </TableCell>
                        )}

                        {location.pathname === "/prediction-dashboard" && (
                          <>
                            <TableCell align="right">
                              <span className={item.percent_change_24h < 0 ? "down" : "up"}>
                                {formatPercentage(item.percent_change_24h)}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              <span className={item.percent_change_7d < 0 ? "down" : "up"}>
                                {formatPercentage(item.percent_change_7d)}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              {item.volume_24h?.toLocaleString() || "—"}
                            </TableCell>
                            <TableCell align="right">
                              {item.market_cap?.toLocaleString() || "—"}
                            </TableCell>
                          </>
                        )}

                        {false && location.pathname === "/prediction-dashboard" &&
                          (subscriptionDetails.status === "expired" ||
                            !item.ct_hours_4_current) ? (
                          <>
                            {/* <TableCell align="right">
                                  <HttpsIcon />
                                </TableCell> */}
                            <TableCell align="right">
                              <HttpsIcon />
                            </TableCell>
                            <TableCell align="right">
                              <HttpsIcon />
                            </TableCell>
                            <TableCell align="right">
                              <HttpsIcon />
                            </TableCell>{" "}
                            <TableCell align="right">
                              <HttpsIcon />
                            </TableCell>
                          </>
                        ) : false && location.pathname === "/prediction-dashboard" &&
                          subscriptionDetails.status === "running" ? (
                          <>
                            {/* <TableCell align="right">
                                  <span
                                    className={
                                      item.ct_min_15_current < item.price
                                        ? "down"
                                        : "up"
                                    }
                                  > */}
                            {/* {(
                                  ((item.ct_min_15_current - item.price) *
                                    100) /
                                  item.price
                                ).toFixed(2)}
                                % */}
                            {/* {item.ct_min_15_current}
                                  </span> */}
                            {/* </TableCell> */}
                            <TableCell align="right">
                              <span
                                className={
                                  item.ct_hour_1_current < item.price
                                    ? "down"
                                    : "up"
                                }
                              >
                                {/* {(
                                  ((item.ct_hour_1_current - item.price) *
                                    100) /
                                  item.price
                                ).toFixed(2)}
                                % */}
                                {item.ct_hour_1_current}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              <span
                                className={
                                  item.ct_hours_4_current < item.price
                                    ? "down"
                                    : "up"
                                }
                              >
                                {/* {(
                                  ((item.ct_hours_4_current - item.price) *
                                    100) /
                                  item.price
                                ).toFixed(2)}
                                % */}
                                {(
                                  Math.round(item.ct_hours_4_current * 100) /
                                  100
                                )?.toFixed(4)}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              <span
                                className={
                                  item.ct_day_1_current < item.price
                                    ? "down"
                                    : "up"
                                }
                              >
                                {/* {(
                                  ((item.ct_day_1_current - item.price) * 100) /
                                  item.price
                                ).toFixed(2)}
                                % */}
                                {item.ct_day_1_current}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              <span
                                className={
                                  item.ct_week_1_current < item.price
                                    ? "down"
                                    : "up"
                                }
                              >
                                {/* {(
                                  ((item.ct_day_1_current - item.price) * 100) /
                                  item.price
                                ).toFixed(2)}
                                % */}
                                {item.ct_week_1_current}
                              </span>
                            </TableCell>

                          </>
                        ) : location.pathname === "/market" ? (
                          <>
                            <TableCell align="right">
                              <span
                                className={
                                  item.percent_change_7d < 0 ? "down" : "up"
                                }
                              >
                                {item.percent_change_7d?.toFixed(2)}
                              </span>
                            </TableCell>

                            <TableCell align="right">
                              $
                              {Math.round(
                                (item.market_cap * 100) / 100
                              )?.toLocaleString()}
                            </TableCell>
                            <TableCell align="right">
                              {Math.round(
                                (item.volume_24h * 100) / 100
                              )?.toLocaleString()}
                            </TableCell>
                          </>
                        ) : (
                          ""
                        )}

                        <TableCell
                          align="right"
                          onClick={() => handleChartOpen(item)}
                          sx={{ cursor: "pointer" }}
                        >
                          <LiveSparkline prices={item.sparkline} change={item.percent_change_24h} />
                        </TableCell>
                        {false && subscriptionDetails.status === "running" &&
                          location.pathname !== "/" ? (
                          <TableCell align="right" sx={{ cursor: "pointer" }}>
                            <img
                              src={ChartUp}
                              alt="chart"
                              height="33px"
                              style={{
                                filter:
                                  item.percent_change_7d < 0
                                    ? "invert(50%) sepia(48%) saturate(2535%) hue-rotate(337deg) brightness(102%) contrast(101%)"
                                    : "saturate(2317%) hue-rotate(86deg) brightness(82%) contrast(82%)",
                              }}
                              onClick={() => handleChartOpen(item)}
                            />
                          </TableCell>
                        ) : false && subscriptionDetails.status === "expired" &&
                          location.pathname !== "/" ? (
                          <TableCell
                            align="right"
                            onMouseOver={() => handleMouseOver(index)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <Fade in={!(isHovered && index === hoverIndex)}>
                              <img
                                src={ChartUp}
                                alt="chart"
                                height="33px"
                                style={{
                                  filter:
                                    item.percent_change_7d < 0
                                      ? "invert(50%) sepia(48%) saturate(2535%) hue-rotate(337deg) brightness(102%) contrast(101%)"
                                      : "saturate(2317%) hue-rotate(86deg) brightness(82%) contrast(82%)",
                                }}
                              />
                            </Fade>
                            {
                              <Fade in={isHovered && index === hoverIndex}>
                                <Button
                                  variant="contained"
                                  className="btn btn-primary"
                                  sx={{
                                    borderRadius: "90px",
                                    position: "absolute",
                                    top: "15px",
                                    right: "5px",
                                    margin: "auto",
                                  }}
                                  onClick={() => {
                                    userDetail
                                      ? navigate("/subscription")
                                      : navigate("/login"),
                                      window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: "smooth",
                                      });
                                  }}
                                >
                                  {userDetail ? "Subscribe" : "Login"}
                                </Button>
                              </Fade>
                            }
                          </TableCell>
                        ) : (
                          ""
                        )}
                        {location.pathname === "/" ? (
                          <>
                            <TableCell align="right" sx={{ cursor: "pointer" }}>
                              <Button
                                variant="outlined"
                                sx={{
                                  borderRadius: "90px",
                                  marginLeft: "auto",
                                }}
                                className="btn-outlined-secondary btn"
                                onClick={() => {
                                  navigate("/prediction-dashboard");
                                }}
                              >
                                Predict
                              </Button>
                            </TableCell>
                          </>
                        ) : (
                          ""
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Stack>
            {location.pathname === "/prediction-dashboard" && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "space-between" },
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 3,
                  pt: 2.5,
                  px: { xs: 1, sm: 2 },
                  borderTop: "1px solid rgba(119, 126, 144, 0.15)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--color-grey, #777E90)",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                  }}
                >
                  Showing{" "}
                  <Box component="span" sx={{ color: "var(--color_dark, #23262f)", fontWeight: 700 }}>
                    {(page - 1) * 100 + 1}–{(page - 1) * 100 + coinsList.length}
                  </Box>{" "}
                  of{" "}
                  <Box component="span" sx={{ color: "var(--color_dark, #23262f)", fontWeight: 700 }}>
                    1,000
                  </Box>{" "}
                  Cryptocurrencies (100 per page)
                </Typography>

                <Pagination
                  count={10}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "var(--color-grey, #777E90)",
                      borderRadius: "10px",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      minWidth: "36px",
                      height: "36px",
                      border: "1px solid rgba(119, 126, 144, 0.2)",
                      "&:hover": {
                        bgcolor: "rgba(55, 114, 255, 0.12)",
                        color: "#3772ff",
                        borderColor: "rgba(55, 114, 255, 0.4)",
                      },
                      "&.Mui-selected": {
                        bgcolor: "#3772ff !important",
                        color: "#ffffff !important",
                        borderColor: "#3772ff",
                        boxShadow: "0 4px 12px rgba(55, 114, 255, 0.4)",
                      },
                    },
                  }}
                />
              </Box>
            )}
          </TableContainer>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-dialog modal-crypto-table">
          <Button
            onClick={handleClose}
            variant="outlined"
            className="btn btn-outlined-secondary btn-round btn-close"
          >
            <CloseIcon />
          </Button>
          <Box className="modal-head">
            <Typography
              id="modal-modal-title"
              className="modal-modal-title"
              variant="h6"
              component="h2"
            >
              <NavigateBeforeIcon
                onClick={handleClose}
                sx={{ cursor: "pointer" }}
              />{" "}
              {chartData[0]?.symbol}
            </Typography>
          </Box>
          <Box
            id="modal-modal-description"
            className="modal-modal-description"
            sx={{ mt: 2, p: 2 }}
          >
            <Typography className="crypto-fullname" variant="h5" component="h5">
              {chartData[0]?.symbol}
              {/* <span className="badge">1x</span> */}
            </Typography>
            <Typography
              className="crypto-fullname-small"
              variant="body2"
              component="small"
              sx={{ color: "#777E91", fontWeight: "600" }}
            >
              {chartData[0]?.name}
            </Typography>
            <Box className="value-details">
              {/* <Button
                variant="outlined"
                className="btn btn-outlined-secondary btn-round btn-close"
              >
                <KeyboardArrowDownIcon />
              </Button> */}
              <Typography className="crypto-value" variant="h5" component="h5">
                {chartData[0]?.price?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </Typography>
              <Typography
                className="crypto-fullname-small"
                variant="body2"
                component="small"
                sx={{ color: "#777E91", fontWeight: "600", display: "flex" }}
              >
                <img src={DollarImg} alt="chart" height="16px" />{" "}
                {chartData[0]?.market_cap}
              </Typography>
              <Typography
                className="crypto-prection"
                variant="body2"
                component="small"
                sx={{ color: "#777E91", fontWeight: "600" }}
              >
                Prediction price for end of current time frame.
              </Typography>

              <TabContext value={value}>
                <Box>
                  {true ? (
                    <TabList onChange={handleChange} aria-label="Login Tabs">
                      {/* <Tab label="15m" value="1" /> */}
                      <Tab label="1h" value="2" />
                      <Tab label="4h" value="3" />
                      <Tab label="1d" value="4" />
                      <Tab label="1w" value="5" />
                    </TabList>
                  ) : (
                    <TabList aria-label="Login Tabs">
                      {/* <Tab label={<HttpsIcon />} value="1" />
                      <Tab label={<HttpsIcon />}></Tab> */}
                      <Tab label={<HttpsIcon />} value="3"></Tab>
                      <Tab label={<HttpsIcon />}></Tab>
                      <Tab label={<HttpsIcon />}></Tab>
                    </TabList>
                  )}
                </Box>
                {true ? (
                  <>
                    {/* <TabPanel value="1">
                      <Box className="value-with-date">
                        <Box className="value-with-date-col">
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              color: "#777E91",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img src={TimeImg} alt="chart" height="16px" />
                            {dayjs(date)
                              .add(15, "m")
                              .format("DD/MM/YYYY HH:mm")}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ color: "#00C076", fontWeight: "500" }}
                          >
                            {(
                              Math.round(
                                (chartData[0]?.ct_min_15_current -
                                  chartData[0]?.price) *
                                  100
                              ) / 100
                            )?.toFixed(2)}
                            <span>+1.25%</span>
                          </Typography>
                        </Box>
                        <Box className="value-with-date-col">
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              color: "#777E91",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img src={TimeImg} alt="chart" height="16px" />{" "}
                            <span>15/10/23</span> 07:45
                          </Typography>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ color: "#141416", fontWeight: "500" }}
                          >
                            37162.00 <span>+1.25%</span>
                          </Typography>
                        </Box>
                      </Box>
                    </TabPanel> */}
                    <TabPanel value="2">
                      <Box className="value-with-date">
                        <Box className="value-with-date-col">
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              color: "#777E91",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img src={TimeImg} alt="chart" height="16px" />{" "}
                            {dayjs(date).add(1, "h").format("DD/MM/YYYY HH:mm")}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ color: "#00C076", fontWeight: "500" }}
                          >
                            {(
                              Math.round(
                                (chartData[0]?.ct_hour_1_current -
                                  chartData[0]?.price) *
                                100
                              ) / 100
                            )?.toFixed(2)}
                            {chartData[0]?.ct_hour_1_current}
                            {/* <span>+1.25%</span> */}
                          </Typography>
                        </Box>
                        <Box className="value-with-date-col">
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              color: "#777E91",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img src={TimeImg} alt="chart" height="16px" />{" "}
                            {dayjs(date).add(1, "h").format("DD/MM/YYYY HH:mm")}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ color: "#777E91", fontWeight: "500" }}
                          >
                            {chartData[0]?.ct_hour_1_current}
                          </Typography>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="3">
                      <Box className="value-with-date">
                        <Box className="value-with-date-col">
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              color: "#777E91",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img src={TimeImg} alt="chart" height="16px" />{" "}
                            {dayjs(date).add(4, "h").format("DD/MM/YYYY HH:mm")}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ color: "#00C076", fontWeight: "500" }}
                          >
                            {(
                              Math.round(
                                (chartData[0]?.ct_hours_4_current -
                                  chartData[0]?.price) *
                                100
                              ) / 100
                            )?.toFixed(2)}
                            {"  "}
                            <span>
                              {Math.round(
                                (((chartData[0]?.ct_hours_4_current -
                                  chartData[0]?.price) *
                                  100) /
                                  chartData[0]?.ct_hours_4_current) *
                                100
                              ) / 100}
                              %
                            </span>
                          </Typography>
                        </Box>
                        <Box className="value-with-date-col">
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              color: "#777E91",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img src={TimeImg} alt="chart" height="16px" />{" "}
                            {dayjs(date).add(4, "h").format("DD/MM/YYYY HH:mm")}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ color: "#777E91", fontWeight: "500" }}
                          >
                            {chartData[0]?.ct_hours_4_current?.toFixed(1) || "-"}
                            {/* <span>+1.25%</span> */}
                          </Typography>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="4">
                      <Box className="value-with-date">
                        <Box className="value-with-date-col">
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              color: "#777E91",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img src={TimeImg} alt="chart" height="16px" />
                            {dayjs(date).add(1, "d").format("DD/MM/YYYY HH:mm")}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ color: "#00C076", fontWeight: "500" }}
                          >
                            {(
                              Math.round(
                                (chartData[0]?.ct_day_1_current -
                                  chartData[0]?.price) *
                                100
                              ) / 100
                            )?.toFixed(2)}
                            <span>
                              {((chartData[0]?.ct_day_1_current -
                                chartData[0]?.price) *
                                100) /
                                chartData[0]?.ct_day_1_current}
                              %
                            </span>
                          </Typography>
                        </Box>
                        <Box className="value-with-date-col">
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              color: "#777E91",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img src={TimeImg} alt="chart" height="16px" />{" "}
                            {dayjs(date).add(1, "d").format("DD/MM/YYYY HH:mm")}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ color: "#777E91", fontWeight: "500" }}
                          >
                            {chartData[0]?.ct_day_1_current}
                          </Typography>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="5">
                      <Box className="value-with-date">
                        <Box className="value-with-date-col">
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              color: "#777E91",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img src={TimeImg} alt="chart" height="16px" />
                            {dayjs(date).add(1, "w").format("DD/MM/YYYY HH:mm")}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ color: "#00C076", fontWeight: "500" }}
                          >
                            {(
                              Math.round(
                                (chartData[0]?.ct_week_1_current -
                                  chartData[0]?.price) *
                                100
                              ) / 100
                            )?.toFixed(2)}
                            {chartData[0]?.ct_week_1_current}
                          </Typography>
                        </Box>
                        <Box className="value-with-date-col">
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{
                              color: "#777E91",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <img src={TimeImg} alt="chart" height="16px" />{" "}
                            {dayjs(date).add(1, "w").format("DD/MM/YYYY HH:mm")}
                          </Typography>
                          <Typography
                            variant="body2"
                            component="small"
                            sx={{ color: "#777E91", fontWeight: "500" }}
                          >
                            {chartData[0]?.ct_week_1_current}
                          </Typography>
                        </Box>
                      </Box>
                    </TabPanel>
                  </>
                ) : (
                  <TabPanel value="1">
                    <Box>
                      <Typography
                        variant="body2"
                        component="small"
                        sx={{
                          color: "#777E91",
                          fontWeight: "400",
                          gap: "5px",
                        }}
                      >
                        Please{" "}
                        <Link to="/subscription" style={{ color: "#FFD166" }}>
                          <u>Subscribe</u>
                        </Link>{" "}
                        now to gain complete access to the most precise short
                        and long-term predictions of cryptocurrency prices.
                      </Typography>
                    </Box>
                  </TabPanel>
                )}
              </TabContext>
            </Box>
          </Box>
          <Button
            fullWidth
            variant="contained"
            className="btn btn-primary"
            onClick={handleClose}
          >
            Back
          </Button>
        </Box>
      </Modal>

      {/* Professional Crypto Chart Modal */}
      <CryptoChartModal
        open={chartOpen}
        onClose={handleChartClose}
        coin={selectedChartCoin}
      />
    </>
  );
};

export default CryptoTable;
