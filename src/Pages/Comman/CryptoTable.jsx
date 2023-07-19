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
  quotesHistoricalActions,
} from "../../_actions";
import {
  coinsAtom,
  userAtom,
  selectedCategoryAtom,
  forecastSubAtom,
  authAtom,
  loaderAtom,
  historicalAtom,
  predictionAtom,
} from "../../_state";
import LoadingImg from '../../../public/assets/images/icons/loading.svg'

import { TabPanel } from "@mui/lab";
import { Favorite } from "@mui/icons-material";
import dayjs from "dayjs";

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

const CryptoTable = (props) => {
  const coinActions = useCoinActions();
  const coinsList = useRecoilValue(coinsAtom);
  const userDetail = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const location = useLocation();
  const [isHovered, setHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState();
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState("");
  const [chartOpen, setChartOpen] = useState(false);
  const count = Math.ceil(coinsList.length / 4);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  
  const [intervalCount, setIntervalCount] = useState(0);
  const selectedCat = useRecoilValue(selectedCategoryAtom);
  const subscriptionAction = subscriptionActions();
  const subscriptionDetails = useRecoilValue(forecastSubAtom);
  const [loader, setLoader] = useRecoilState(loaderAtom);
  const historicalAction = quotesHistoricalActions();
  const historicalData = useRecoilValue(historicalAtom);
  const [timeFrame, setTimeFrame] = useState("15m");
  const date = new Date();

  console.log(count,'count')

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

  const chartHistory = async (id, time) => {
    const response = await historicalAction.add(id?.symbol, time);
    console.warn(response);
  };

  const handleChartOpen = async (id) => {
    chartHistory(id, "15m");
    setChartOpen(true);
    setChartData(coinsList.filter((item) => item.id === id.id));
    setTimeFrame("15m");
  };

  const handleTimeFrame = (event) => {
    setTimeFrame(event.target.value);
    chartHistory(chartData[0], event.target.value);
  };

  const handleChartClose = (id) => {
    setChartOpen(false);
    setChartData("");
  };

  useEffect(() => {
    if (userDetail && !subscriptionDetails.id) {
      subscriptionAction.subscribedUser();
    }
  }, []);

  //  Latest Listing API call
  useEffect(() => {
    setLoader(true);

    location.pathname === "/prediction-dashboard"
      ? coinActions.predictionListing()
      : getLastestListing();
  }, [subscriptionDetails]);

  const getLastestListing = async () => {
    let param = "";

    location.pathname === "/market"
      ? (param = `?limit=10`)
      : (param = `?limit=5`);

    const ress = await coinActions.latestListing(param);
  };

  const getLatestCategory = async () => {
    const ress = await coinActions.coinListbByCategoty(props.selectedCat);
  };

  // useEffect(() => {
  //   if (
  //     (location.pathname === "/market" ||
  //       location.pathname === "/prediction-dashboard") &&
  //     subscriptionDetails.status === "running"
  //   ) {
  //     const interval = setInterval(() => {
  //       setIntervalCount(intervalCount + 1);
  //       if (location.pathname === "/prediction-dashboard")
  //         coinActions.predictionListing();
  //       else
  //         props.selectedCat
  //           ? props.selectedCat === 0
  //             ? getLastestListing()
  //             : getLatestCategory(selectedCat)
  //           : getLastestListing();
  //     }, 100000);
  //     return () => clearInterval(interval);
  //   }
  // }, [intervalCount, selectedCat, subscriptionDetails]);

  const data = {
    labels: historicalData.time,
    datasets: [
      {
        data: historicalData.priceQuote,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#54BB7A",
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const handleChanges = (event, value) => {
    console.log(value,'value')
    setLimit(value);
   // setPage(paginator(coinsList, value, 3).page);
    
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
        <Box className="crypto-list-table">
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
                        <TableCell align="right">acc % </TableCell>
                        <TableCell align="right">15m %</TableCell>
                        <TableCell align="right">1h %</TableCell>
                        <TableCell align="right">4h %</TableCell>
                        <TableCell align="right">1d %</TableCell>
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
                  {paginator(coinsList, page, limit).data.map((item, index) => {
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
                          {index + 1}
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            location.pathname === "/"
                              ? void 0
                              : handleOpen(item.id)
                          }
                          sx={{
                            cursor:
                              location.pathname === "/" ? "default" : "pointer",
                          }}
                        >
                          <div className="crypto-name">
                            <img
                              src={`https://www.crypto-rating.com/img/crypto-currencies/${item.symbol?.toLowerCase()}.png`}
                              alt={item.symbol}
                              width="33px"
                            />
                            {item.name}{" "}
                            <span className="currency_name">{item.symbol}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          $
                          {item?.price > 1
                            ? (
                                Math.round(item.price * 100) / 100
                              )?.toLocaleString()
                            : item?.price < 1 && item?.price >= 0.1
                            ? (
                                Math.round(item.price * 10000) / 10000
                              )?.toLocaleString()
                            : item?.price < 0.1 && item?.price > 0.01
                            ? (
                                Math.round(item.price * 1000000) / 1000000
                              )?.toFixed(6)
                            : item?.price < 0.01
                            ? (
                                Math.round(item.price * 100000000) / 100000000
                              )?.toFixed(8)
                            : item?.price}
                        </TableCell>
                        {location.pathname !== "/prediction-dashboard" ? (
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
                        ) : (
                          <TableCell align="right" sx={{ color: "#FFD166" }}>
                            <span>{item.ct_accuracy?.toFixed(2)}%</span>
                          </TableCell>
                        )}
                        {location.pathname === "/prediction-dashboard" &&
                        (subscriptionDetails.status === "expired" ||
                          !item.ct_min_15_current) ? (
                          <>
                            <TableCell align="right">
                              <HttpsIcon />
                            </TableCell>
                            <TableCell align="right">
                              <HttpsIcon />
                            </TableCell>
                            <TableCell align="right">
                              <HttpsIcon />
                            </TableCell>
                            <TableCell align="right">
                              <HttpsIcon />
                            </TableCell>{" "}
                          </>
                        ) : location.pathname === "/prediction-dashboard" &&
                          subscriptionDetails.status === "running" ? (
                          <>
                            <TableCell align="right">
                              <span
                                className={
                                  item.ct_min_15_current < item.price
                                    ? "down"
                                    : "up"
                                }
                              >
                                {/* {(
                                  ((item.ct_min_15_current - item.price) *
                                    100) /
                                  item.price
                                ).toFixed(2)}
                                % */}
                                {item.ct_min_15_current}
                              </span>
                            </TableCell>
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
                              ${item.market_cap?.toFixed(0)}
                            </TableCell>
                            <TableCell align="right">
                              ${item.volume_24h?.toFixed(0)}
                            </TableCell>
                          </>
                        ) : (
                          ""
                        )}

                        {subscriptionDetails.status === "running" &&
                        location.pathname !== "/" ? (
                          <TableCell align="right" sx={{ cursor: "pointer" }}>
                            <img
                              src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`}
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
                        ) : subscriptionDetails.status === "expired" &&
                          location.pathname !== "/" ? (
                          <TableCell
                            align="right"
                            onMouseOver={() => handleMouseOver(index)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <Fade in={!(isHovered && index === hoverIndex)}>
                              <img
                                src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`}
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
                            <TableCell align="right">
                              <img
                                src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${item.id}.svg`}
                                alt="chart"
                                height="33px"
                                style={{
                                  filter:
                                    item.percent_change_24h < 0
                                      ? "invert(50%) sepia(48%) saturate(2535%) hue-rotate(337deg) brightness(102%) contrast(101%)"
                                      : "saturate(2317%) hue-rotate(86deg) brightness(82%) contrast(82%)",
                                }}
                              />
                            </TableCell>
                            <TableCell align="right" sx={{ cursor: "pointer" }}>
                              <Button
                                variant="outlined"
                                sx={{
                                  borderRadius: "90px",
                                  marginLeft: "auto",
                                }}
                                className="btn-outlined-secondary btn"
                                onClick={() => {
                                  navigate(
                                    !userDetail
                                      ? "/login"
                                      : userDetail &&
                                        subscriptionDetails.status === "running"
                                      ? "/prediction-dashboard"
                                      : "/subscription"
                                  );
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
            {location.pathname === "/prediction-dashboard"  && limit < 100 &&
                <Button
                    onClick={(e) => handleChanges(e,100) }                   
                    sx={{width: "160px" , alignItems: "center", margin: "0 auto" }}
                    variant="outlined"
                    className='btn btn-outlined-secondary'>
                    <img src={LoadingImg} alt='loading' /> Load more
                </Button>
              }
             {/* {location.pathname === "/prediction-dashboard" ? (
              <Pagination
                sx={{ float: "right" }}
                count={count}
                page={page}
                onChange={handleChanges}
                color="success"
              />
            ) : (
              ""
            )}  */}
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
                {chartData[0]?.price}
              </Typography>
              <Typography
                className="crypto-fullname-small"
                variant="body2"
                component="small"
                sx={{ color: "#777E91", fontWeight: "600", display: "flex" }}
              >
                <img src={DollarImg} alt="chart" height="16px" /> 36,641.20
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
                  {subscriptionDetails.status === "running" ? (
                    <TabList onChange={handleChange} aria-label="Login Tabs">
                      <Tab label="15m" value="1" />
                      <Tab label="1h" value="2" />
                      <Tab label="4h" value="3" />
                      <Tab label="1d" value="4" />
                    </TabList>
                  ) : (
                    <TabList aria-label="Login Tabs">
                      <Tab label={<HttpsIcon />} value="1" />
                      <Tab label={<HttpsIcon />}></Tab>
                      <Tab label={<HttpsIcon />}></Tab>
                      <Tab label={<HttpsIcon />}></Tab>
                    </TabList>
                  )}
                </Box>
                {subscriptionDetails.status === "running" ? (
                  <>
                    <TabPanel value="1">
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
                    </TabPanel>
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

      {/* chartModal */}
      <Modal
        open={chartOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="backdrop-custom"
      >
        <Box className="modal-dialog modal-crypto-table">
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 2,
            }}
            open={loader}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Button
            onClick={handleChartClose}
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
              <NavigateBeforeIcon /> BTC
            </Typography>
          </Box>
          <Box
            id="modal-modal-description"
            className="modal-modal-description"
            sx={{ mt: 2, p: 2 }}
          >
            <Box
              className="value-details"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                className="crypto-fullname"
                variant="h5"
                component="h5"
              >
                {chartData[0]?.symbol}
              </Typography>
              <Select
                value={timeFrame}
                // variant="outlined"
                className="btn-round btn-close"
                onChange={handleTimeFrame}
              >
                <MenuItem value="15m">15m</MenuItem>
                <MenuItem value="1h">1h</MenuItem>
                <MenuItem value="4h">4h</MenuItem>
                <MenuItem value="1d">1d</MenuItem>

                {/* <KeyboardArrowDownIcon /> */}
              </Select>
              {/* <span className="badge">1x</span> */}
            </Box>
            <Typography
              className="crypto-fullname-small"
              variant="body2"
              component="small"
              sx={{ color: "#777E91", fontWeight: "600" }}
            >
              {chartData.name}
            </Typography>

            <Typography className="crypto-value" variant="h5" component="h5">
              {chartData[0]?.price}
            </Typography>

            <Line data={data} options={options} />
          </Box>
          <Button
            fullWidth
            variant="contained"
            className="btn btn-primary"
            onClick={handleChartClose}
          >
            Back
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CryptoTable;
