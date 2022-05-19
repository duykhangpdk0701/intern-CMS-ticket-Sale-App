import {
  TicketDispatchTypes,
  TicketTypes,
  TICKET_FAIL,
  TICKET_GET_SUCCESS,
  TICKET_LOADING,
} from "../ActionTypes/TicketTypes";

interface defaultState {
  loading: boolean;
  error?: Error;
  current?: TicketTypes[];
}

const initialState: defaultState = {
  loading: false,
};

const TicketReducer = (
  state: defaultState = initialState,
  action: TicketDispatchTypes,
): defaultState => {
  switch (action.type) {
    case TICKET_FAIL:
      return {
        loading: false,
        current: state.current,
        error: state.error,
      };

    case TICKET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case TICKET_GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    default:
      return state;
  }
};

export default TicketReducer;
