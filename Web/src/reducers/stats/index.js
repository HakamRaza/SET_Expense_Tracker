import { combineReducers } from "redux";

import get_bars from "./getbars";
import get_overview from "./getoverviews";
import get_pie from "./getpie";

export default combineReducers({
  get_bars,
  get_overview,
  get_pie
});