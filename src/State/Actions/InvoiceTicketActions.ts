import { collection, getDocs, query } from "firebase/firestore";
import moment from "moment";
import { Dispatch } from "redux";
import { db } from "../../Config/FirebaseConfig";
import { formatObjectToMoment } from "../../helper/formatObjectToMoment";
import { formatUnixDateToMoment } from "../../helper/formatUnixDateToMoment";
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
      let invoiceTicket: InvoiceTicketTypes[] = [];

      dispatch({
        type: INVOICE_TICKET_LOADING,
      });

      const q = query(collection(db, "invoiceTicket"));
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

      //date from
      if (
        invoiceTickerFilter.dateFrom !== undefined &&
        invoiceTickerFilter.dateFrom !== null
      ) {
        const dateFrom = formatObjectToMoment(invoiceTickerFilter.dateFrom);
        invoiceTicket = invoiceTicket.filter((value) => {
          const formatDateUse = formatUnixDateToMoment(value.dateUse);
          return moment(formatDateUse).isSameOrAfter(dateFrom);
        });
      }
      // date to
      if (
        invoiceTickerFilter.dateEnd !== undefined &&
        invoiceTickerFilter.dateEnd !== null
      ) {
        const dateTo = formatObjectToMoment(invoiceTickerFilter.dateEnd);
        invoiceTicket = invoiceTicket.filter((value) => {
          const formatDateUse = formatUnixDateToMoment(value.dateUse);
          return moment(formatDateUse).isSameOrBefore(dateTo);
        });
      }

      //filter status
      if (invoiceTickerFilter.status !== "all") {
        invoiceTicket = invoiceTicket.filter(
          (value) => value.status === invoiceTickerFilter.status,
        );
      }

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

export const searchInvoiceTicket =
  (search: string) =>
  async (dispatch: Dispatch<InvoiceTicketDispatchTypes>) => {
    try {
      let invoiceTicket: InvoiceTicketTypes[] = [];
      dispatch({
        type: INVOICE_TICKET_LOADING,
      });
      const q = query(collection(db, "invoiceTicket"));
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

      invoiceTicket = invoiceTicket.filter((value) => {
        if (search === "") {
          return value;
        } else {
          return value.id.toLocaleLowerCase().includes(search);
        }
      });

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
