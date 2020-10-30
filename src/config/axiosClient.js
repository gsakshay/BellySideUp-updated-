import axios from "axios";
import { URL } from "./config";

let auth_token = localStorage.getItem("auth_token");


export const axiosGet = async (apiURL, params, data) => {
  return axios.get(`${URL}/${apiURL}`, {
    params,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: auth_token,
    },
    data: data,
  });
};

export const axiosPost = async (apiURL, data ) => {
  return axios.post(`${URL}/${apiURL}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: auth_token,
    },
  });
};

export const axiosPut = async (apiURL, data ) => {
  return axios.put(`${URL}/${apiURL}`, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: auth_token,
    },
  });
};

export const axiosDelete = async (apiURL ) => {
  return axios.delete(`${URL}/${apiURL}`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: auth_token,
    },
  });
};

export const postMultiform = async (apiURL , data) => {
  return axios.post(`${URL}/${apiURL}`, data, {
    headers: {
      Authorization: auth_token,
      "content-type": "multipart/form-data",
    },
  });
};

/* export const download = async (apiURL, params) => {
  return axios.get(`${URL}/${apiURL}`, {
    params,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: auth_token,
    },
    responseType: "blob",
  });
}; */
