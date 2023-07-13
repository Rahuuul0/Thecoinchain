import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  FormControl,
  MenuItem,
  Stack,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TabContext from "@mui/lab/TabContext";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useCoinActions, subscriptionActions, useHomeActions } from "../../_actions";
import {
  coinCategoryAtom,
  selectedCategoryAtom,
  coinsAtom,
  cardCoinsAtom,
  authAtom,
  forecastSubAtom,
  loaderAtom,
  marketTrendAtom
} from "../../_state";
const MarketCard = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const coinActions = useCoinActions();
  const categoryList = useRecoilValue(coinCategoryAtom);
  const selectedCat = useRecoilValue(selectedCategoryAtom);
  const [tablefilter, setTablefilter] = useState(1);
  const cardCoinsList = useRecoilValue(cardCoinsAtom);
  const userDetail = useRecoilValue(authAtom);
  const subscriptionAction = subscriptionActions();
  const subscriptionDetails = useRecoilValue(forecastSubAtom);
  const loader = useSetRecoilState(loaderAtom);
  const marketTrend = useRecoilValue(marketTrendAtom);
  const homeActions = useHomeActions();
  let page = "page_name=market_page";

  const handleChangeTablefilter = (event) => {
    setTablefilter(event.target.value);
  };
  const getFirstLetters = (str) => {
    const firstLetters = str.replace("Portfolio", "");
    return firstLetters;
  };

  useEffect(() => {
    coinActions.latestListing(page);
    if (userDetail && !subscriptionDetails.id) {
      subscriptionAction.subscribedUser();
    }
  }, []);

    // homeActions get function   API data call 
    useEffect(() => {
      const response = homeActions.marketTrend()
      response.then((res) => {({...res}) })
  }, [])

  console.log(marketTrend,'marketTrend')

  return (
    <>
      <Box className="market-crypto-card-wrapper">
        <Container maxWidth="lg">
          <Box className="market-crypto-card-wrapper-inner">
            <Box className="market-crypto-graph">
              {cardCoinsList?.slice(0, 3).map((item) => {
                return (
                  <Box className="market-crypto-graph-col">
                    <Box className="market-crypto-graph-ic">
                      <img
                        src={`https://www.crypto-rating.com/img/crypto-currencies/${item.symbol.toLowerCase()}.png`}
                        alt={item.symbol}
                        width="33px"
                      />
                    </Box>
                    <Box className="market-crypto-graph-details">
                      <Box className="market-crypto-name">
                        <Typography
                          component="small"
                          varient="body2"
                          className="currency-name"
                        >
                          {item.symbol}
                          {"/USDT "}
                          <span
                            className="status-badge"
                            style={{
                              backgroundColor:
                                item.percent_change_24h < 0
                                  ? "#ff6838"
                                  : "#58bd7d",
                            }}
                          >
                            {item.percent_change_24h?.toFixed(2)}%
                          </span>
                        </Typography>
                        <Typography component="h5" varient="h5">
                          {item?.price > 1
                            ? item.price?.toFixed(2)
                            : item?.price < 1 && item?.price >= 0.1
                            ? item.price?.toFixed(4)
                            : item?.price < 0.1 && item?.price > 0.01
                            ? item.price?.toFixed(6)
                            : item?.price < 0.01
                            ? item.price?.toFixed(8)
                            : item?.price}
                        </Typography>
                        <Typography component="small" varient="small-caption">
                          {item.volume_24h?.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="market-crypto-graph-details">
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
                        // onClick={() => handleChartOpen(item.id)}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box className="market-crypto-tabs for-desktop">
              <TabContext value={value}>
                <Stack direction="row" className="filter-btn" spacing="2">
                  {selectedCat === 0 ? (
                    <Button
                      variant="contained"
                      className="btn btn-secondary"
                      onClick={(e) => {
                        loader(true);
                        location.pathname === "/market"
                          ? coinActions.latestListing(page)
                          : coinActions.latestListing();
                      }}
                    >
                      All
                    </Button>
                  ) : (
                    <Button
                      className="btn"
                      onClick={(e) => {
                        loader(true);
                        location.pathname === "/market"
                          ? coinActions.latestListing(page)
                          : coinActions.latestListing();
                      }}
                    >
                      All
                    </Button>
                  )}
                  {categoryList.length &&
                    categoryList.map((item, index) => {
                      if (index < 4) {
                        if (selectedCat !== 0 && selectedCat === item.id) {
                          return (
                            <Button
                              variant="contained"
                              className="btn btn-secondary"
                              key={index}
                              onClick={(e) => {
                                coinActions.coinListbByCategoty(item.id);
                              }}
                              title={item.name}
                            >
                              {getFirstLetters(item.name)}
                            </Button>
                          );
                        } else {
                          return (
                            <Button
                              className="btn"
                              onClick={(e) => {
                                coinActions.coinListbByCategoty(item.id);
                              }}
                              title={item.name}
                            >
                              {getFirstLetters(item.name)}
                            </Button>
                          );
                        }
                      } else {
                        return "";
                      }
                    })}
                </Stack>
              </TabContext>
              <Button
                variant="outlined"
                className="btn btn-outlined-secondary"
                onClick={() => {
                  navigate(
                    !userDetail
                      ? "/login"
                      : userDetail && subscriptionDetails.status === "running"
                      ? "/prediction-dashboard"
                      : "/subscription"
                  );
                }}
              >
                Predict
              </Button>
            </Box>
            <Box className="market-crypto-tabs for-mobile dropdown-mobile">
              <FormControl sx={{ m: 0, minWidth: 120, width: "100%" }}>
                <Select
                  value={tablefilter}
                  onChange={handleChangeTablefilter}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {selectedCat === 0 ? (
                    <MenuItem
                      value={1}
                      onClick={(e) => {
                        location.pathname === "/market"
                          ? coinActions.latestListing(page)
                          : coinActions.latestListing();
                      }}
                    >
                      All
                    </MenuItem>
                  ) : (
                    <MenuItem
                      value={1}
                      onClick={(e) => {
                        location.pathname === "/market"
                          ? coinActions.latestListing(page)
                          : coinActions.latestListing();
                      }}
                    >
                      All
                    </MenuItem>
                  )}
                  {categoryList.length &&
                    categoryList.map((item, index) => {
                      if (index < 4) {
                        if (selectedCat !== 0 && selectedCat === item.id) {
                          return (
                            <MenuItem
                              value={index + 2}
                              key={index}
                              onClick={(e) => {
                                coinActions.coinListbByCategoty(item.id);
                              }}
                              title={item.name}
                            >
                              {getFirstLetters(item.name)}
                            </MenuItem>
                          );
                        } else {
                          return (
                            <MenuItem
                              value={index + 2}
                              onClick={(e) => {
                                coinActions.coinListbByCategoty(item.id);
                              }}
                              title={item.name}
                            >
                              {getFirstLetters(item.name)}
                            </MenuItem>
                          );
                        }
                      } else {
                        return "";
                      }
                    })}
                </Select>
              </FormControl>
              {/* <Button
                                variant="outlined"
                                className='btn btn-outlined-secondary'>
                                Predict
                            </Button> */}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MarketCard;
