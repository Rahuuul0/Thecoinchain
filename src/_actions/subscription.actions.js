import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from "../_helpers";
import { Labels, Apis, RoutesName } from "../_common/app.constants";
import { authAtom, forecastSubAtom } from "../_state";
import { useAlertActions } from "../_actions/alert.actions";

const subscriptionActions = () => {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const [auth, setAuth] = useRecoilState(authAtom);
  const [forecastSub, setForecastSub] = useRecoilState(forecastSubAtom);

  const subscription = () => {
    return fetchWrapper
      .get(Apis.Subscription_Plan)
      .then((res) => {
        if (res.statusCode === 200) {
          const dataa = res.data;
          return dataa;
          // alertActions.success("Logged In Successfully");
          // navigate("/")
        } else if (res.statusCode === 401) {
          // alertActions.error(res.msg);
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
          // alertActions.error(res.msg);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const subscribedUser = () => {
    return fetchWrapper
      .get(Apis.Subscribed_User)
      .then((res) => {
        if (res.statusCode === 200) {
          setForecastSub(res.data);
          // alertActions.success("Logged In Successfully");
          // navigate("/")
        } else {
          // alertActions.error(res.msg);
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
  };
};

export { subscriptionActions };
