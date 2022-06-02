import moment from "moment";

export const formatCustomDate = (date: any) => {
  if (date !== null) {
    const dateFormat = moment(new Date(date.seconds * 1000))
      .format("YYYY/MM/DD")
      .split("/");

    return {
      year: parseInt(dateFormat[0]),
      month: parseInt(dateFormat[1]),
      day: parseInt(dateFormat[2]),
    };
  }
  return null;
};

export const formatFromObjectDateToStringDate = (date: any) => {
  if (date === undefined || date === null) return undefined;
  const newDate = { ...date, month: date.month - 1 };
  return moment(newDate).format();
};
