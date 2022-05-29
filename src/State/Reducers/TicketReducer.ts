import {
  TicketDispatchTypes,
  TicketTypes,
  TICKET_FAIL,
  TICKET_GET_SUCCESS,
  TICKET_GET_WITH_FILTER_SUCCESS,
  TICKET_LOADING,
  TICKET_UPDATE_DATE_SUCCESS,
} from "../ActionTypes/TicketTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current: TicketTypes[];
}

const initialState: defaultState = {
  loading: false,
  current: [],
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
        error: action.error,
      };

    case TICKET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case TICKET_GET_WITH_FILTER_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case TICKET_GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case TICKET_UPDATE_DATE_SUCCESS:
      return {
        loading: false,
        current: state.current.map((value) => {
          if (value.id === action.payload.id) {
            return action.payload;
          }

          return value;
        }),
      };

    default:
      return state;
  }
};

export default TicketReducer;
