import Cookies from "js-cookie";
import { authMeProses, loginProses, registerProses, forPassProses, createProses } from "../../api/auth";

export function authLogin(payload) {
  return async (dispatch) => {
    try {
      let response = await loginProses(payload);
      // let response = await authMeProcess();
      let data = response.data;
      console.log("data =>", data);

      dispatch({
        type: "login",
        name: data?.user?.name,
        email: data?.user?.email,
        password: data?.user?.password,
        status: data?.user?.status,
        jenisKelamin: data?.user?.jenisKelamin,
        isAuth: true,
      });

      Cookies.set("myapps_token", data?.token);
      return data;
    } catch (err) {
      console.log("auth error =>", err);
      return err;
    }
  };
}

export function authMe() {
  return async (dispatch) => {
    try {
      let response = await authMeProses();
      let data = response.data;

      dispatch({
        type: "login",
        name: data?.user?.name,
        email: data?.user?.email,
        isAuth: true,
      });

      Cookies.set("myapps_token", data?.token);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export function authRegister(payload) {
  return async (dispatch) => {
    try {
      let response = await registerProses(payload);
      let data = response.data;
      console.log("data", data);
      dispatch({
        type: "login",
        name: data?.user?.name,
        email: data?.user?.email,
        password: data?.user?.password,
        status: data?.user?.status,
        jenisKelamin: data?.user?.jenisKelamin,
        isAuth: true,
      });
      Cookies.set("myapps_token", data?.token);
      return data;
    } catch (err) {
      console.log("auth error =>", err);
      return err;
    }
  };
}

export function authForgotPass(payload) {
  return async (dispatch) => {
    try {
      const response = await forPassProses(payload);
      const data = response.data;
      dispatch({
        type: "login",
        email: data?.user?.email,
        isAuth: true,
      });
      Cookies.set("myapps_token", data?.token);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export function authResPass(id, token, payload) {
  return async (dispatch) => {
    try {
      const response = await createProses(id, token, payload);
      const data = response.data;
      dispatch({
        type: "login",
        email: data?.user?.email,
        password: data?.user?.password,
        isAuth: true,
      });
      Cookies.set("myapps_token", data?.token);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}