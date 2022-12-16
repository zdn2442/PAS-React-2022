import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { syncToken } from "../api/base_url";
import { authMe } from "../reducer/action/authAction";
const ProtectedRoute = ({ children }) => {
  const auth = Cookies.get("myapps_token");
  const isAuth = useSelector((state) => state?.authProcess?.isAuth);
  console.log("isAuth", isAuth);
  let [process, setProcess] = React.useState(true);
  let dispatch = useDispatch();
  const onLoaded = async (values) => {
    syncToken();
    setProcess(false);
    let result = await dispatch(authMe(values));
  };
  React.useEffect(() => {
    if (!isAuth) {
      if (auth !== undefined) {
        onLoaded();
      } else {
        setProcess(false);
      }
    } else {
      syncToken();
      setProcess(false);
    }
    console.log(isAuth);
  }, []);
  if (process) {
    return (
      <div className="flex fixed w-screen h-screen justify-center items-center">
        <p className="animate-pulse">Loading</p>
      </div>
    );
  } else {
    console.log(auth);
    return auth !== undefined ? children : <Navigate to="/login" />;
  }
};

export default ProtectedRoute;