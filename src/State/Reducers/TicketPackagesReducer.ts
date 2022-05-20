import {
  TicketPackageDispatchTypes,
  TicketPackageTypes,
  TICKET_PACKAGE_FAIL,
  TICKET_PACKAGE_GET_SUCCESS,
  TICKET_PACKAGE_LOADING,
} from "../ActionTypes/TicketPackageTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current?: TicketPackageTypes[];
}

const initialState: defaultState = {
  loading: false,
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
        error: state.error,
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

    default:
      return state;
  }
};

export default TicketPackageReducer;
