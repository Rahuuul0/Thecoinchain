import React from "react";
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
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import BTC from "../../../public/assets/images/icons/btc-ic.svg";
import VolumeIc from "../../../public/assets/images/icons/volume-ic.svg";
import MarketcapIc from "../../../public/assets/images/icons/dollar.svg";
import ChartUp from "../../../public/assets/images/chart-up.svg";
import ChartDown from "../../../public/assets/images/chart-down.svg";
import DollarImg from "../../../public/assets/images/icons/dollar.svg";
import TimeImg from "../../../public/assets/images/icons/time-ic.svg";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { homePageAtom } from "../../_state/users";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import HttpsIcon from "@mui/icons-material/Https";
import { useLocation, useNavigate } from "react-router-dom";
import { Line, Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { TabPanel } from "@mui/lab";

ChartJS.register(...registerables);

function paginator(items, current_page, per_page_items) {
  let page = current_page || 1,
    per_page = per_page_items,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);
  // console.log("Anzahl: " + items.lgenth);

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
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isHovered, setHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState();
  const [open, setOpen] = React.useState(false);
  const [chartData, setChartData] = React.useState("");

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
    setChartData(coinData.filter((item) => item.id === id));
  };
  const handleClose = () => {
    setOpen(false);
    setChartData("");
  };

  const [chartOpen, setChartOpen] = React.useState(false);
  const handleChartOpen = (id) => {
    setChartOpen(true);
    setChartData(coinData.filter((item) => item.id === id));
  };
  const handleChartClose = () => setChartOpen(false);

  const myData = () => {
    console.log(chartData, 999999999999);
  };
  const data = {
    labels: [
      "1h",
      "24h",
      "7d",
      "30d",
      "1h",
      "24h",
      "7d",
      "30d",
      "1h",
      "24h",
      "7d",
      "30d",
      "1h",
      "24h",
      "7d",
      "30d",
      "1h",
      "24h",
      "7d",
      "30d",
    ],
    datasets: [
      {
        data: [
          1, 2, 3, 5, 7, 10, 20, 15, 23, 27, 20, 15, 30, 35, 40, 41, 33, 45, 50,
          58, 52, 55, 51, 50,
        ],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#54BB7A",
      },
    ],
  };

  // Table Json Data call
  const sethomeData = useRecoilState(homePageAtom);

  const coinData = sethomeData[0][0].data;

  useEffect(() => {
    console.log(sethomeData[0][0].data, "1111111111111");
  }, []);

  const count = Math.ceil(coinData.length / 4);
  const [page, setPage] = React.useState(1);
  const handleChanges = (event, value) => {
    setPage(paginator(coinData, value, 3).page);
  };
  const [checked, setChecked] = React.useState([]);
  const handleOnChanges = (e, index) => {
    let prev = checked;
    let itemIndex = prev.indexOf(index);
    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1);
    } else {
      prev.push(index);
    }
    setChecked([...prev]);
  };

  return (
    <>
      <Box className="crypto-list" sx={{ py: 2 }}>
        <Box className="crypto-list-table">
          <TableContainer>
            <Stack spacing={2}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow hover>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">24h Change </TableCell>
                    {location.pathname === "/prediction-dashboard" ? (
                      <>
                        <TableCell align="right">1h %</TableCell>
                        <TableCell align="right">24h %</TableCell>
                        <TableCell align="right">7d %</TableCell>
                        <TableCell align="right">30d %</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell align="right">7d %</TableCell>
                        <TableCell align="right">Marketcap</TableCell>
                        <TableCell align="right">Volume(24h)</TableCell>
                      </>
                    )}
                    <TableCell align="right">Chart</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginator(coinData, page, 5).data.map((item, index) => {
                    let priceChange = item.quote.USD;
                    return (
                      <TableRow
                        key={index}
                        divider={index < coinData.length - 1}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{item.cmc_rank}</TableCell>
                        <TableCell
                          onClick={() => handleOpen(item.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <div className="crypto-name">
                            <img src={item.img} alt="BTC" width="33px" />
                            {item.name}{" "}
                            <span className="currency_name">{item.symbol}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          $ {item.quote.USD.price.toFixed(4)}
                        </TableCell>
                        <TableCell align="right">
                          <span
                            className={
                              item.quote.USD.percent_change_24h < 0
                                ? "down"
                                : "up"
                            }
                          >
                            {Math.round(
                              (item.quote.USD.percent_change_24h +
                                Number.EPSILON) *
                                100
                            ) / 100}
                            %
                          </span>
                        </TableCell>
                        {location.pathname === "/prediction-dashboard" &&
                        !props?.isIt ? (
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
                          props?.isIt ? (
                          <>
                            <TableCell align="right">
                              {/* <span className='up'>{Math.round((item.quote.USD.percent_change_1h + Number.EPSILON) * 100) / 100}%</span> */}
                              <span
                                className={
                                  priceChange.percent_change_1h < 0
                                    ? "down"
                                    : "up"
                                }
                              >
                                {priceChange.percent_change_1h}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              <span
                                className={
                                  priceChange.percent_change_24h < 0
                                    ? "down"
                                    : "up"
                                }
                              >
                                {priceChange.percent_change_24h}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              <span
                                className={
                                  priceChange.percent_change_7d < 0
                                    ? "down"
                                    : "up"
                                }
                              >
                                {priceChange.percent_change_7d}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              <span
                                className={
                                  priceChange.percent_change_30d < 0
                                    ? "down"
                                    : "up"
                                }
                              >
                                {priceChange.percent_change_30d}
                              </span>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell align="right">
                              <span
                                className={
                                  priceChange.percent_change_7d < 0
                                    ? "down"
                                    : "up"
                                }
                              >
                                {priceChange.percent_change_7d}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              <span
                                className={
                                  priceChange.market_cap < 0 ? "down" : "up"
                                }
                              >
                                {priceChange.market_cap}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              <span
                                className={
                                  priceChange.volume_24h < 0 ? "down" : "up"
                                }
                              >
                                {priceChange.volume_24h}
                              </span>
                            </TableCell>
                          </>
                        )}

                        {props.isIt ? (
                          <TableCell align="right" sx={{ cursor: "pointer" }}>
                            <img
                              src={ChartUp}
                              alt="chart"
                              height="33px"
                              onClick={() => handleChartOpen(item.id)}
                            />
                          </TableCell>
                        ) : (
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
                                onClick={() => handleChartOpen(item.id)}
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
                                  onClick={() => navigate("/subscription")}
                                >
                                  Subscribe
                                </Button>
                              </Fade>
                            }
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Stack>
            {location.pathname === "/prediction-dashboard" ? (
              <Pagination
                sx={{ float: "right" }}
                count={count}
                page={page}
                onChange={handleChanges}
                color="success"
              />
            ) : (
              ""
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
              <NavigateBeforeIcon /> BTC
            </Typography>
          </Box>
          <Box
            id="modal-modal-description"
            className="modal-modal-description"
            sx={{ mt: 2, p: 2 }}
          >
            <Typography className="crypto-fullname" variant="h5" component="h5">
              BTC/USDT <span className="badge">1x</span>
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
              <Button
                variant="outlined"
                className="btn btn-outlined-secondary btn-round btn-close"
              >
                <KeyboardArrowDownIcon />
              </Button>
              <Typography className="crypto-value" variant="h5" component="h5">
                {chartData[0]?.quote.USD.price}
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
                  {props.isIt ? (
                    <TabList onChange={handleChange} aria-label="Login Tabs">
                      <Tab label="15m" value="1" />
                      <Tab label="1h" value="2" />
                      <Tab label="4h" value="3" />
                      <Tab label="1d" value="4" />
                    </TabList>
                  ) : (
                    <TabList aria-label="Login Tabs">
                      <Tab label="15m" value="1" />
                      <Tab label={<HttpsIcon />}></Tab>
                      <Tab label={<HttpsIcon />}></Tab>
                      <Tab label={<HttpsIcon />}></Tab>
                    </TabList>
                  )}
                </Box>

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
                        <img src={TimeImg} alt="chart" height="16px" />{" "}
                        <span>15/10/23</span> 07:45
                      </Typography>
                      <Typography
                        variant="body2"
                        component="small"
                        sx={{ color: "#00C076", fontWeight: "500" }}
                      >
                        520.80 <span>+1.25%</span>
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
                        <span>15/10/23</span> 07:45
                      </Typography>
                      <Typography
                        variant="body2"
                        component="small"
                        sx={{ color: "#00C076", fontWeight: "500" }}
                      >
                        520.80 <span>+1.25%</span>
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
                        <span>15/10/23</span> 07:45
                      </Typography>
                      <Typography
                        variant="body2"
                        component="small"
                        sx={{ color: "#00C076", fontWeight: "500" }}
                      >
                        520.80 <span>+1.25%</span>
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
                        <img src={TimeImg} alt="chart" height="16px" />{" "}
                        <span>15/10/23</span> 07:45
                      </Typography>
                      <Typography
                        variant="body2"
                        component="small"
                        sx={{ color: "#00C076", fontWeight: "500" }}
                      >
                        520.80 <span>+1.25%</span>
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
              </TabContext>
            </Box>
          </Box>
          <Button
            fullWidth
            variant="contained"
            className="btn btn-primary"
            onClick={myData}
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
      >
        <Box className="modal-dialog modal-crypto-table">
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
            <Typography className="crypto-fullname" variant="h5" component="h5">
              BTC/USDT <span className="badge">1x</span>
            </Typography>
            <Typography
              className="crypto-fullname-small"
              variant="body2"
              component="small"
              sx={{ color: "#777E91", fontWeight: "600" }}
            >
              {chartData.name}
            </Typography>
            <Typography className="crypto-value" variant="h5" component="h5">
              {chartData[0]?.quote.USD.price}
            </Typography>
            <Box className="value-details">
              <Button
                variant="outlined"
                className="btn btn-outlined-secondary btn-round btn-close"
              >
                <KeyboardArrowDownIcon />
              </Button>
            </Box>
            <Line data={data} />
          </Box>
          <Button
            fullWidth
            variant="contained"
            className="btn btn-primary"
            onClick={myData}
          >
            Back
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CryptoTable;
