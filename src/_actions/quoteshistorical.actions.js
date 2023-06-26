import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from "../_helpers";
import { Apis } from "../_common/app.constants";
import { historicalAtom } from "../_state";
import { useAlertActions } from "../_actions/alert.actions";
import { useSetRecoilState } from "recoil";
import dayjs from "dayjs";

const quotesHistoricalActions = () => {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setHistorical = useSetRecoilState(historicalAtom);

  const add = (data) => {
    let params = {
      symbol: data,
    };
    return fetchWrapper
      .post(`${Apis.Quotes_Historical}`, params)
      .then((res) => {
        if (res.statusCode === 200) {
          let timeStamp = [];
          let quotePrice = [];
          res.data.data[data][0].quotes.map((item, key) => {
            let priceData = item.quote.USD.price;
            quotePrice.push(priceData);
            timeStamp.push(dayjs(item.timestamp).format("HH:mm"));
          });

          setHistorical({ priceQuote: quotePrice, time: timeStamp });
        } else {
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return {
    add,
  };
};

export { quotesHistoricalActions };
