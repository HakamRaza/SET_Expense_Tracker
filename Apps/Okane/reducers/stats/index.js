import { combineReducers } from "redux";

import getBars from "./getBars";
import getOverview from "./getOverview";
import getPie from "./getPie";

export default combineReducers({
  getBars,
  // getOverview,
  // getPie
});
