import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useFetchWrapper } from "../_helpers";
import { Labels, Apis, RoutesName } from "../_common/app.constants";
import { authAtom } from "../_state";
import { useAlertActions } from "../_actions/alert.actions";

const subscriptionActions = () => {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const [auth, setAuth] = useRecoilState(authAtom);

  const subscription = () => {
    return fetchWrapper
      .get(Apis.Subscription_Plan)
      .then((res) => {
        if (res.statusCode === 200) {
          const dataa = res.data;
          return dataa;
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

  const getSecretKey = async (dataid) => {
    return fetchWrapper
      .post(Apis.Subscription_Plan, { price_id: dataid })
      .then((res) => {
        if (res.statusCode === 200) {
          console.log("Price Id is sent");
        } else {
          alertActions.error(Labels.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    subscription,
    getSecretKey,
  };
};

export { subscriptionActions };
