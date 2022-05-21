import {
  collection,
  getDocs,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";
import { Dispatch } from "redux";
import { db } from "../../Config/FirebaseConfig";
import {
  TicketDispatchTypes,
  TicketFilterTypes,
  TicketTypes,
  TICKET_FAIL,
  TICKET_GET_SUCCESS,
  TICKET_GET_WITH_FILTER_SUCCESS,
  TICKET_LOADING,
} from "../ActionTypes/TicketTypes";

export const getTickets =
  () => async (dispatch: Dispatch<TicketDispatchTypes>) => {
    try {
      const tickets: TicketTypes[] = [];

      dispatch({
        type: TICKET_LOADING,
      });

      const queryTickets = await getDocs(collection(db, "ticket"));

      queryTickets.forEach((value) => {
        const temp = value.data() as TicketTypes;
        const id = value.id;
        tickets.push({
          id: id,
          bookingCode: temp.bookingCode,
          checkIn: temp.checkIn,
          dateTicketRelease: temp.dateTicketRelease,
          dateUse: temp.dateUse,
          nameEvent: temp.nameEvent,
          statusUsage: temp.statusUsage,
        });
      });

      tickets.reverse();
      dispatch({
        type: TICKET_GET_SUCCESS,
        payload: tickets,
      });
    } catch (error) {
      dispatch({
        type: TICKET_FAIL,
        error: error as Error,
      });
    }
  };

export const getTicketsWithFilter =
  (ticketFilter: TicketFilterTypes) =>
  async (dispatch: Dispatch<TicketDispatchTypes>) => {
    try {
      const tickets: TicketTypes[] = [];
      dispatch({
        type: TICKET_LOADING,
      });

      const queryFilter: QueryConstraint[] = [];
      //filter dateFrom

      if (
        ticketFilter.dateForm !== undefined &&
        ticketFilter.dateForm !== null
      ) {
        queryFilter.push(
          where("dateTicketRelease", ">", new Date(ticketFilter.dateForm)),
        );
      }

      //filter dateTo
      if (ticketFilter.dateTo !== undefined && ticketFilter.dateTo !== null) {
        queryFilter.push(
          where("dateTicketRelease", "<", new Date(ticketFilter.dateTo)),
        );
      }

      // filter status
      if (ticketFilter.status !== "all") {
        queryFilter.push(where("statusUsage", "==", ticketFilter.status));
      }
      //filter check - in
      if (!ticketFilter.checkIn.includes("all")) {
        queryFilter.push(where("checkIn", "in", ticketFilter.checkIn));
      }

      const q = query(collection(db, "ticket"), ...queryFilter);

      const queryTickets = await getDocs(q);
      queryTickets.forEach((value) => {
        const temp = value.data() as TicketTypes;
        const id = value.id;
        tickets.push({
          id: id,
          bookingCode: temp.bookingCode,
          checkIn: temp.checkIn,
          dateTicketRelease: temp.dateTicketRelease,
          dateUse: temp.dateUse,
          nameEvent: temp.nameEvent,
          statusUsage: temp.statusUsage,
        });
        tickets.reverse();
      });

      dispatch({
        type: TICKET_GET_WITH_FILTER_SUCCESS,
        payload: tickets,
      });
    } catch (error) {
      dispatch({
        type: TICKET_FAIL,
        error: error as Error,
      });
    }
  };
