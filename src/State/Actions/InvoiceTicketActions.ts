import { collection, getDocs } from "firebase/firestore";
import { Dispatch } from "redux";
import { db } from "../../Config/FirebaseConfig";
import {
  InvoiceTicketDispatchTypes,
  InvoiceTicketTypes,
  INVOICE_TICKET_FAIL,
  INVOICE_TICKET_GET_SUCCESS,
  INVOICE_TICKET_LOADING,
} from "../ActionTypes/InvoiceTicketTypes";
import {} from "../ActionTypes/TicketPackageTypes";

export const getInvoiceTickets =
  () => async (dispatch: Dispatch<InvoiceTicketDispatchTypes>) => {
    try {
      const InvoiceTicket: InvoiceTicketTypes[] = [];

      dispatch({
        type: INVOICE_TICKET_LOADING,
      });

      const queryInvoiceTicket = await getDocs(collection(db, "invoiceTicket"));

      queryInvoiceTicket.forEach((value) => {
        const temp = value.data();
        const id = value.id;
        InvoiceTicket.push({
          id: id,
          dateUse: temp.dateUse,
          name: temp.name,
          checkIn: temp.checkIn,
          status: temp.status,
        });
        InvoiceTicket.reverse();
        dispatch({
          type: INVOICE_TICKET_GET_SUCCESS,
          payload: InvoiceTicket,
        });
      });
    } catch (error) {
      dispatch({
        type: INVOICE_TICKET_FAIL,
        error: error as Error,
      });
    }
  };
