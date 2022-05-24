export const TICKET_PACKAGE_LOADING = "TICKET_PACKAGE_LOADING";
export const TICKET_PACKAGE_FAIL = "TICKET_PACKAGE_FAIL";
export const TICKET_PACKAGE_ADD_SUCCESS = "TICKET_PACKAGE_ADD_SUCCESS";
export const TICKET_PACKAGE_UPDATE_SUCCESS = "TICKET_PACKAGE_UPDATE_SUCCESS";
export const TICKET_PACKAGE_GET_SUCCESS = "TICKET_PACKAGE_GET_SUCCESS";

export type TicketPackageTypes = {
  id: string;
  comboPrice: string | null;
  name: string | null;
  price: number | null;
  status: boolean | null;
  validDate: Date | null | any;
  expiryDate: Date | null | any;
};

export type AddTicketPackageTypes = {
  name: string;
  validDate: Date | null;
  expiryDate: Date | null;
  comboPrice: string | null;
  price: number | null;
  status: boolean;
};

export type UpdateTicketPackageTypes = {
  name: string;
  nameEvent: string;
  validDate: Date;
  expiryDate: Date;
  comboPrice: string;
  price: number;
  status: boolean;
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

export interface TicketPackageUpdateSuccess {
  type: typeof TICKET_PACKAGE_UPDATE_SUCCESS;
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
  | TicketPackageGetSuccess
  | TicketPackageUpdateSuccess;
