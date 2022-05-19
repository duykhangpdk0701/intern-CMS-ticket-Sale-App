import { combineReducers } from "redux";
import InvoiceTicketReducer from "./InvoiceTicketReducer";
import TicketPackageReducer from "./TicketPackagesReducer";
import TicketReducer from "./TicketReducer";

const RootReducer = combineReducers({
  ticketPackages: TicketPackageReducer,
  tickets: TicketReducer,
  invoiceTickets: InvoiceTicketReducer,
});

export default RootReducer;
