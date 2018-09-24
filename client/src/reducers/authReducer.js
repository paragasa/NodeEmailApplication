import { FETCH_USER } from "../actions/types";
//Reducer  , record status of user
export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      //by default return null
      return state;
  }
}
