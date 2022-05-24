import {
  collection,
  getDocs,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";
import moment from "moment";
import { Dispatch } from "redux";
import { db } from "../../Config/FirebaseConfig";
import {
  FilterInvoiceTicketType,
  InvoiceTicketDispatchTypes,
  InvoiceTicketTypes,
  INVOICE_TICKET_FAIL,
  INVOICE_TICKET_GET_SUCCESS,
  INVOICE_TICKET_GET_SUCCESS_WITH_FILTER,
  INVOICE_TICKET_LOADING,
} from "../ActionTypes/InvoiceTicketTypes";

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
      });

      InvoiceTicket.reverse();
      dispatch({
        type: INVOICE_TICKET_GET_SUCCESS,
        payload: InvoiceTicket,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_TICKET_FAIL,
        error: error as Error,
      });
    }
  };

export const getInvoiceTicketsWithFilter =
  (invoiceTickerFilter: FilterInvoiceTicketType) =>
  async (dispatch: Dispatch<InvoiceTicketDispatchTypes>) => {
    try {
      const invoiceTicket: InvoiceTicketTypes[] = [];
      const queryFilter: QueryConstraint[] = [];

      dispatch({
        type: INVOICE_TICKET_LOADING,
      });

      //date from
      if (invoiceTickerFilter.dateFrom !== undefined) {
        const dateFrom = moment(invoiceTickerFilter.dateFrom)
          .subtract("months", 1)
          .format();
        queryFilter.push(where("dateUse", ">", new Date(dateFrom as string)));
      }
      // date to
      if (invoiceTickerFilter.dateEnd !== undefined) {
        const dateTo = moment(invoiceTickerFilter.dateEnd)
          .subtract("months", 1)
          .format();
        queryFilter.push(where("dateUse", "<", new Date(dateTo as string)));
      }

      //filter status
      if (invoiceTickerFilter.status !== "all") {
        queryFilter.push(where("status", "==", invoiceTickerFilter.status));
      }

      const q = query(collection(db, "invoiceTicket"), ...queryFilter);
      const queryInvoiceTickets = await getDocs(q);
      queryInvoiceTickets.forEach((value) => {
        const temp = value.data() as InvoiceTicketTypes;
        const id = value.id;
        invoiceTicket.push({
          id: id,
          checkIn: temp.checkIn,
          dateUse: temp.dateUse,
          name: temp.name,
          status: temp.status,
        });
      });

      invoiceTicket.reverse();
      dispatch({
        type: INVOICE_TICKET_GET_SUCCESS_WITH_FILTER,
        payload: invoiceTicket,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_TICKET_FAIL,
        error: error as Error,
      });
    }
  };
