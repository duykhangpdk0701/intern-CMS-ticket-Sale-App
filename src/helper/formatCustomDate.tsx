import moment from "moment";

export const formatCustomDate = (date: any) => {
  if (date !== null) {
    const dateFormat = moment(new Date(date.seconds * 1000))
      .format("YYYY/MM/DD")
      .split("/");

    return {
      year: dateFormat[0],
      month: dateFormat[1],
      day: dateFormat[3],
    };
  }
  return null;
};
