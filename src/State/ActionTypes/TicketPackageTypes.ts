export const TICKET_PACKAGE_LOADING = "TICKET_PACKAGE_LOADING";
export const TICKET_PACKAGE_FAIL = "TICKET_PACKAGE_FAIL";
export const TICKET_PACKAGE_ADD_SUCCESS = "TICKET_PACKAGE_ADD_SUCCESS";
export const TICKET_PACKAGE_GET_SUCCESS = "TICKET_PACKAGE_GET_SUCCESS";

export type TicketPackageTypes = {
  id: string;
  comboPrice: string;
  name: string;
  price: number;
  status: boolean;
  validDate: Date;
  expiryDate: Date;
};

export interface TicketPackageLoading {
  type: typeof TICKET_PACKAGE_LOADING;
}

export interface TicketPackageFail {
  type: typeof TICKET_PACKAGE_FAIL;
  error: Error;
}

export interface TicketPackageAddSuccess {
  type: typeof TICKET_PACKAGE_ADD_SUCCESS;
  payload: TicketPackageTypes;
}

export interface TicketPackageGetSuccess {
  type: typeof TICKET_PACKAGE_GET_SUCCESS;
  payload: TicketPackageTypes[];
}

export type TicketPackageDispatchTypes =
  | TicketPackageLoading
  | TicketPackageFail
  | TicketPackageAddSuccess
  | TicketPackageGetSuccess;
