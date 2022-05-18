import { combineReducers } from "redux";
import TicketPackageReducer from "./TicketPackagesReducer";

const RootReducer = combineReducers({
  ticketPackages: TicketPackageReducer,
});

export default RootReducer;
