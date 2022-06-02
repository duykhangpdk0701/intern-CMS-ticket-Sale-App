import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { Dispatch } from "redux";
import { db } from "../../Config/FirebaseConfig";
import { formatObjectToMoment } from "../../helper/formatObjectToMoment";
import { formatUnixDateToMoment } from "../../helper/formatUnixDateToMoment";
import {
  TicketDispatchTypes,
  TicketFilterTypes,
  TicketTypes,
  TicketUpdateType,
  TICKET_FAIL,
  TICKET_GET_SUCCESS,
  TICKET_GET_WITH_FILTER_SUCCESS,
  TICKET_LOADING,
  TICKET_UPDATE_DATE_SUCCESS,
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
      let tickets: TicketTypes[] = [];
      dispatch({
        type: TICKET_LOADING,
      });

      const q = query(collection(db, "ticket"));

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

      //filter dateFrom
      if (
        ticketFilter.dateForm !== undefined &&
        ticketFilter.dateForm !== null
      ) {
        const dateFrom = formatObjectToMoment(ticketFilter.dateForm);
        tickets = tickets.filter((value) => {
          const formatDateUse = formatUnixDateToMoment(value.dateUse);
          return moment(formatDateUse).isSameOrAfter(dateFrom);
        });
      }

      //filter dateTo
      if (ticketFilter.dateTo !== undefined && ticketFilter.dateTo !== null) {
        const dateTo = formatObjectToMoment(ticketFilter.dateTo);
        tickets = tickets.filter((value) => {
          const formatDateUse = formatUnixDateToMoment(value.dateUse);
          return moment(formatDateUse).isSameOrBefore(dateTo);
        });
      }

      // filter status
      if (ticketFilter.statusUsage !== "all") {
        tickets = tickets.filter(
          (value) => value.statusUsage === ticketFilter.statusUsage,
        );
      }
      //filter check - in
      if (!ticketFilter.checkIn.includes("all")) {
        tickets = tickets.filter((value) => {
          if (value.checkIn) {
            return ticketFilter.checkIn.includes(value.checkIn);
          }
          return false;
        });
      }

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

export const updateTicketDate =
  (updateDateTicket: TicketUpdateType) =>
  async (dispatch: Dispatch<TicketDispatchTypes>) => {
    try {
      dispatch({
        type: TICKET_LOADING,
      });

      const ticketRef = doc(db, "ticket", updateDateTicket.id);

      if (updateDateTicket.dateUse !== undefined) {
        await updateDoc(ticketRef, {
          dateUse: new Date(updateDateTicket.dateUse),
        });
      }

      const getTicketById = await getDoc(ticketRef);
      const ticket = {
        ...getTicketById.data(),
        id: getTicketById.id,
      } as TicketTypes;

      dispatch({
        type: TICKET_UPDATE_DATE_SUCCESS,
        payload: ticket,
      });
    } catch (error) {
      dispatch({
        type: TICKET_FAIL,
        error: error as Error,
      });
    }
  };

export const searchTicket =
  (search: string) => async (dispatch: Dispatch<TicketDispatchTypes>) => {
    try {
      let tickets: TicketTypes[] = [];
      dispatch({
        type: TICKET_LOADING,
      });

      const q = query(collection(db, "ticket"));

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

      tickets = tickets.filter((value) => {
        if (search === "") {
          return value;
        } else {
          return value.id.toLocaleLowerCase().includes(search);
        }
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
