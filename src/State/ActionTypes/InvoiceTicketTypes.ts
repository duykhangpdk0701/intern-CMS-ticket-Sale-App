export const INVOICE_TICKET_ADD_SUCCESS = "INVOICE_TICKET_ADD_SUCCESS";
export const INVOICE_TICKET_GET_SUCCESS = "INVOICE_TICKET_GET_SUCCESS";
export const INVOICE_TICKET_FAIL = "INVOICE_TICKET_FAIL";
export const INVOICE_TICKET_LOADING = "INVOICE_TICKET_LOADING";

export type InvoiceTicketTypes = {
  id: string;
  dateUse: Date | null;
  name: string | null;
  checkIn: string | null;
  status: boolean | null;
};

export interface InvoiceTicketLoading {
  type: typeof INVOICE_TICKET_LOADING;
}

export interface InvoiceTicketFail {
  type: typeof INVOICE_TICKET_FAIL;
  error: Error;
}

export interface InvoiceTicketAddSuccess {
  type: typeof INVOICE_TICKET_ADD_SUCCESS;
  payload: InvoiceTicketTypes;
}

export interface InvoiceTicketGetSuccess {
  type: typeof INVOICE_TICKET_GET_SUCCESS;
  payload: InvoiceTicketTypes[];
}

export type InvoiceTicketDispatchTypes =
  | InvoiceTicketLoading
  | InvoiceTicketFail
  | InvoiceTicketAddSuccess
  | InvoiceTicketGetSuccess;
