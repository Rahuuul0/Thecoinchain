import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from "../_helpers";
import { Apis } from "../_common/app.constants";
import { historicalAtom, loaderAtom } from "../_state";
import { useAlertActions } from "../_actions/alert.actions";
import { useSetRecoilState } from "recoil";
import dayjs from "dayjs";

const quotesHistoricalActions = () => {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setHistorical = useSetRecoilState(historicalAtom);
  const loader = useSetRecoilState(loaderAtom);

  const add = (coinSymbol, timeFrame) => {
    loader(true);
    let params = {
      symbol: coinSymbol,
      interval: timeFrame,
    };
    return fetchWrapper
      .post(`${Apis.Quotes_Historical}`, params)
      .then((res) => {
        if (res.statusCode === 200) {
          let responseArr = [];
          params.interval === "15m"
            ? (responseArr = res.data.data_15_min[0])
            : params.interval === "1h"
            ? (responseArr = res.data.data_1_hr[0])
            : params.interval === "4h"
            ? (responseArr = res.data.data_4_hrs[0])
            : (responseArr = res.data.data_1_day[0]);

          let timeStamp = [];
          let quotePrice = [];
          responseArr.quotes.map((item, key) => {
            let priceData = item.quote.USD.price;
            quotePrice.push(priceData);
            timeStamp.push(
              dayjs(item.timestamp).format(
                timeFrame === "1d" ? "DD MMM" : "HH:mm"
              )
            );
          });

          setHistorical({ priceQuote: quotePrice, time: timeStamp });
        } else {
        }
        loader(false);
      })
      .catch((err) => {
        console.warn(err);
        loader(false);
      });
  };

  return {
    add,
  };
};

export { quotesHistoricalActions };
