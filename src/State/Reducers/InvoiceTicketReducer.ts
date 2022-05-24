import {
  InvoiceTicketDispatchTypes,
  InvoiceTicketTypes,
  INVOICE_TICKET_FAIL,
  INVOICE_TICKET_GET_SUCCESS,
  INVOICE_TICKET_GET_SUCCESS_WITH_FILTER,
  INVOICE_TICKET_LOADING,
} from "../ActionTypes/InvoiceTicketTypes";

export interface defaultState {
  loading: boolean;
  error?: Error;
  current?: InvoiceTicketTypes[];
}

const initialState: defaultState = {
  loading: false,
};

const InvoiceTicketReducer = (
  state: defaultState = initialState,
  action: InvoiceTicketDispatchTypes,
): defaultState => {
  switch (action.type) {
    case INVOICE_TICKET_FAIL:
      return {
        loading: false,
        current: state.current,
        error: state.error,
      };

    case INVOICE_TICKET_LOADING:
      return {
        loading: true,
        current: state.current,
      };

    case INVOICE_TICKET_GET_SUCCESS:
      return {
        loading: false,
        current: action.payload,
      };

    case INVOICE_TICKET_GET_SUCCESS_WITH_FILTER:
      return {
        loading: false,
        current: action.payload,
      };

    default:
      return state;
  }
};

export default InvoiceTicketReducer;
