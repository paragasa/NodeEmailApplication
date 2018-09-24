import axios from "axios";
import { FETCH_USER } from "./types";
//redux thunk will pass redux dispacher as argument

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

//send token info to backend
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  //after res from stripe dispatch
  dispatch({ type: FETCH_USER, payload: res.data });
};
