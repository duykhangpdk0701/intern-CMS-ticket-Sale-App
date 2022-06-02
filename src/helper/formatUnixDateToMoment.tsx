import moment from "moment";

export const formatUnixDateToMoment = (date: any) => {
  if (date.seconds) {
    const formatDate = moment.unix(date.seconds);
    const formatTime = moment(formatDate).format("YYYY-MM-DD");
    return formatTime;
  }

  return null;
};
