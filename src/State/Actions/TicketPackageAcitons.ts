import { collection, getDocs } from "firebase/firestore";
import { Dispatch } from "redux";
import { db } from "../../Config/FirebaseConfig";
import {
  TicketPackageDispatchTypes,
  TicketPackageTypes,
  TICKET_PACKAGE_FAIL,
  TICKET_PACKAGE_GET_SUCCESS,
  TICKET_PACKAGE_LOADING,
} from "../ActionTypes/TicketPackageTypes";

export const getTicketPackage =
  () => async (dispatch: Dispatch<TicketPackageDispatchTypes>) => {
    try {
      const ticketPackage: TicketPackageTypes[] = [];

      dispatch({
        type: TICKET_PACKAGE_LOADING,
      });

      const queryTicketPackage = await getDocs(
        collection(db, "ticketPackages"),
      );

      queryTicketPackage.forEach((value) => {
        const temp = value.data();
        console.log(temp);
        const id = value.id;
        ticketPackage.push({
          id: id,
          comboPrice: temp.comboPrice,
          name: temp.name,
          price: temp.price,
          status: temp.status,
          validDate: temp.validDate,
          expiryDate: temp.expiryDate,
        });
        ticketPackage.reverse();
        dispatch({
          type: TICKET_PACKAGE_GET_SUCCESS,
          payload: ticketPackage,
        });
      });
    } catch (error) {
      dispatch({
        type: TICKET_PACKAGE_FAIL,
        error: error as Error,
      });
    }
  };
