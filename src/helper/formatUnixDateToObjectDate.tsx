import moment from "moment";

export const formatUnixDateToObjectDate = (date: any) => {
  if (date.seconds) {
    const formatDate = moment.unix(date.seconds);
    const formatTime = moment(formatDate, "HH:mm:ss");
    const formatDay = moment(formatDate).toObject();

    return {
      time: formatTime,
      day: {
        day: formatDay.date,
        month: formatDay.months + 1,
        year: formatDay.years,
      },
    };
  }

  return null;
};
