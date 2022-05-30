import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Dispatch } from "redux";
import { db } from "../../Config/FirebaseConfig";

import {
  AddTicketPackageTypes,
  TicketPackageDispatchTypes,
  TicketPackageTypes,
  TICKET_PACKAGE_ADD_SUCCESS,
  TICKET_PACKAGE_FAIL,
  TICKET_PACKAGE_GET_SUCCESS,
  TICKET_PACKAGE_LOADING,
  TICKET_PACKAGE_UPDATE_SUCCESS,
  UpdateTicketPackageTypes,
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
      });

      ticketPackage.reverse();
      dispatch({
        type: TICKET_PACKAGE_GET_SUCCESS,
        payload: ticketPackage,
      });
    } catch (error) {
      dispatch({
        type: TICKET_PACKAGE_FAIL,
        error: error as Error,
      });
    }
  };

export const addTicketPackage =
  (addTicket: AddTicketPackageTypes) =>
  async (dispatch: Dispatch<TicketPackageDispatchTypes>) => {
    try {
      dispatch({
        type: TICKET_PACKAGE_LOADING,
      });
      const newTicketPackage = doc(collection(db, "ticketPackages"));

      await setDoc(newTicketPackage, addTicket);
      dispatch({
        type: TICKET_PACKAGE_ADD_SUCCESS,
        payload: {
          id: newTicketPackage.id,
          ...addTicket,
        },
      });
    } catch (error) {
      dispatch({
        type: TICKET_PACKAGE_FAIL,
        error: error as Error,
      });
    }
  };

export const updateTicketPackage =
  (updateTicket: UpdateTicketPackageTypes) =>
  async (dispatch: Dispatch<TicketPackageDispatchTypes>) => {
    try {
      dispatch({
        type: TICKET_PACKAGE_LOADING,
      });

      const ticketPackageRef = doc(db, "ticketPackages", updateTicket.id);

      const updateTicketSnapshot = await updateDoc(ticketPackageRef, {
        name: updateTicket.name,
        comboPrice: updateTicket.comboPrice,
        price: updateTicket.price,
        status: updateTicket.status,
        validDate: updateTicket.validDate,
        expiryDate: updateTicket,
      });

      const getTicketPackageById = await getDoc(ticketPackageRef);
      const ticketPackage = {
        ...getTicketPackageById.data(),
        id: getTicketPackageById.id,
      } as TicketPackageTypes;

      dispatch({
        type: TICKET_PACKAGE_UPDATE_SUCCESS,
        payload: ticketPackage,
      });
    } catch (error) {
      dispatch({
        type: TICKET_PACKAGE_FAIL,
        error: error as Error,
      });
    }
  };
