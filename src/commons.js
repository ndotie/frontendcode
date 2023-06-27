import axios from 'axios';
import { redirect } from "react-router-dom";

const NGROK_LINK = "https://techtest.wbm.or.tz/";
// export const BASE_URL = NGROK_LINK+"api/";

export const APP_NAME = "Class Attendence";
export const BASE_URL = "http://127.0.0.1:8000/api/";

export const BASE_URL_PUBLIC = "http://127.0.0.1:8000/";

const userKey = '@@key@@user';
export  const Axios = axios.create({
    headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
    }
})

export const storeUser = user => {
    localStorage.setItem(userKey, JSON.stringify( user ));
    
}
export const storeTokens = token => localStorage.setItem('access_token', token);

export const removeUser = () => {
    localStorage.removeItem(userKey)
    localStorage.removeItem('access_token');
}

export const isLoggedIn = () => localStorage.getItem('access_token');
export const getUser = () => JSON.parse(localStorage.getItem(userKey))


export const loader = async () => {
  const results = isLoggedIn();
  if (!results) {
    return redirect("/login");
  }
  return null;
};