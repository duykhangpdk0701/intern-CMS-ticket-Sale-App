import moment from "moment";

export const formatObjectToMoment = (date: any) => {
  const dateFormat = { ...date, month: date.month - 1 };
  return moment(dateFormat).format("YYYY-MM-DD");
};
