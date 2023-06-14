import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from "../_helpers";
import { Apis } from "../_common/app.constants";
import { forecastSubAtom, loaderAtom, setUnsubscribeAtom } from "../_state";
import { useAlertActions } from "../_actions/alert.actions";

const subscriptionActions = () => {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setForecastSub = useSetRecoilState(forecastSubAtom);
  const setUnsubscribeUser = useSetRecoilState(setUnsubscribeAtom);
  const loader = useSetRecoilState(loaderAtom);

  const subscription = () => {
    return fetchWrapper
      .get(Apis.Subscription_Plan)
      .then((res) => {
        if (res.statusCode === 200) {
          const dataa = res.data;
          return dataa;
        } else if (res.statusCode === 401) {
          console.log(res.msg, "res.msg");
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const createPaymentIntent = (data) => {
    return fetchWrapper
      .post(Apis.Create_Payment_Intent, data)
      .then((res) => {
        if (res.statusCode === 200) {
          const dataa = res.data;
          return dataa;
        } else {
          console.log(res.msg, "res.msg");
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const subscribedUser = () => {
    loader(true);
    return fetchWrapper
      .get(Apis.Subscribed_User)
      .then((res) => {
        if (res.statusCode === 200) {
          setForecastSub(res.data);
          loader(false);
        } else {
          console.log(res.msg, "res.msg");
          loader(false);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const unsubscribeUser = () => { 
    loader(true);
    return fetchWrapper.post(Apis.Unsubscribe_User)
      .then((res) => {
        if (res.statusCode === 200) {
          setForecastSub({status: "expired"});
          loader(false);
        } else {
          console.log(res.msg, "res.msg");
          loader(false);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return {
    subscription,
    createPaymentIntent,
    subscribedUser,
    unsubscribeUser
  };
};

export { subscriptionActions };
