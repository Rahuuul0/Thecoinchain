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
import { useRecoilValue } from "recoil";
import { useCoinActions, subscriptionActions } from "../../_actions";
import {
  coinCategoryAtom,
  selectedCategoryAtom,
  coinsAtom,
  cardCoinsAtom,
  authAtom,
  forecastSubAtom,
} from "../../_state";
const MarketCard = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const coinActions = useCoinActions();
  const categoryList = useRecoilValue(coinCategoryAtom);
  const selectedCat = useRecoilValue(selectedCategoryAtom);
  const [tablefilter, setTablefilter] = useState("");
  const cardCoinsList = useRecoilValue(cardCoinsAtom);
  const userDetail = useRecoilValue(authAtom);
  const subscriptionAction = subscriptionActions();
  const subscriptionDetails = useRecoilValue(forecastSubAtom);
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
                          {item.symbol}{" "}
                          <span
                            className="status-badge"
                            style={{
                              backgroundColor:
                                item.percent_change_24h < 0
                                  ? "#ff6838"
                                  : "#58bd7d",
                            }}
                          >
                            {item.percent_change_24h?.toFixed(2)}
                          </span>
                        </Typography>
                        <Typography component="h5" varient="h5">
                          {item?.price > 1
                            ? item.price?.toFixed(2)
                            : item?.price < 1 && item?.price >= 0.1
                            ? item.price?.toFixed(4)
                            : item?.price < 0.1 && item?.price > 0.01
                            ? item.price?.toFixed(6)
                            : item?.price}
                        </Typography>
                        <Typography component="small" varient="small-caption">
                          {Math.round(
                            (item.market_cap + Number.EPSILON) * 100
                          ) / 10000}
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
                        onClick={() => handleChartOpen(item.id)}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box className="market-crypto-tabs for-desktop">
              <TabContext value={value}>
                <Stack
                  direction="row"
                  className="filter-btn"
                  spacing="2"
                  paddingTop={5}
                >
                  {selectedCat === 0 ? (
                    <Button
                      variant="contained"
                      className="btn btn-secondary"
                      onClick={(e) => {
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
                      ? "/create-account"
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
                  <MenuItem value={10}>Cryptocurrencies</MenuItem>
                  <MenuItem value={20}>DeFi</MenuItem>
                  <MenuItem value={30}>Innovation</MenuItem>
                  <MenuItem value={40}>POS</MenuItem>
                  <MenuItem value={50}>NFT</MenuItem>
                  <MenuItem value={60}>POW</MenuItem>
                  <MenuItem value={70}>Predict</MenuItem>
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
