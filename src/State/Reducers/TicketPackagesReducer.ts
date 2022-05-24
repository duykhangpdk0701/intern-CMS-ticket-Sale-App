import moment from "moment";
import {
  TicketPackageDispatchTypes,
  TicketPackageTypes,
  TICKET_PACKAGE_ADD_SUCCESS,
  TICKET_PACKAGE_FAIL,
  TICKET_PACKAGE_GET_SUCCESS,
  TICKET_PACKAGE_LOADING,
} from "../ActionTypes/TicketPackageTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: TicketPackageTypes[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
};

const TicketPackageReducer = (
  state: defaultState = initialState,
  action: TicketPackageDispatchTypes,
): defaultState => {
  switch (action.type) {
    case TICKET_PACKAGE_FAIL:
      return {
        loading: false,
        current: state.current,
        error: action.error,
      };

    case TICKET_PACKAGE_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case TICKET_PACKAGE_GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case TICKET_PACKAGE_ADD_SUCCESS:
      return {
        loading: false,
        current: [
          ...state.current,
          {
            ...action.payload,
            validDate: {
              seconds: moment(action.payload.validDate).unix(),
              nanoseconds: 0,
            },
            expiryDate: {
              seconds: moment(action.payload.validDate).unix(),
              nanoseconds: 0,
            },
          },
        ],
      };

    default:
      return state;
  }
};

export default TicketPackageReducer;
