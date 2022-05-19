import { collection, getDocs } from "firebase/firestore";
import { Dispatch } from "redux";
import { db } from "../../Config/FirebaseConfig";
import {
  TicketDispatchTypes,
  TicketTypes,
  TICKET_FAIL,
  TICKET_GET_SUCCESS,
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
        const temp = value.data();
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
        dispatch({
          type: TICKET_GET_SUCCESS,
          payload: tickets,
        });
      });
    } catch (error) {
      dispatch({
        type: TICKET_FAIL,
        error: error as Error,
      });
    }
  };
