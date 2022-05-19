export const TICKET_ADD_SUCCESS = "TICKET_ADD_SUCCESS";
export const TICKET_GET_SUCCESS = "TICKET_GET_SUCCESS";
export const TICKET_FAIL = "TICKET_FAIL";
export const TICKET_LOADING = "TICKET_LOADING";

export type TicketTypes = {
  id: string;
  bookingCode: string | null;
  checkIn: string | null;
  dateTicketRelease: Date | null;
  dateUse: Date | null;
  nameEvent: string | null;
  statusUsage: number | null;
};

export interface TicketLoading {
  type: typeof TICKET_LOADING;
}

export interface TicketFail {
  type: typeof TICKET_FAIL;
  error: Error;
}

export interface TicketAddSuccess {
  type: typeof TICKET_ADD_SUCCESS;
  payload: TicketTypes;
}

export interface TicketGetSuccess {
  type: typeof TICKET_GET_SUCCESS;
  payload: TicketTypes[];
}

export type TicketDispatchTypes =
  | TicketLoading
  | TicketFail
  | TicketAddSuccess
  | TicketGetSuccess;
