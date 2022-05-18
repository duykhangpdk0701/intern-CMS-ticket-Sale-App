import moment from "moment";
import "moment/locale/pt-br";

type date = {
  seconds: number;
  nanoseconds: number;
};

export type ReturnDate = {
  date: string;
  time: string;
};

export const formatDate = (date: date) => {
  return {
    date: moment.unix(date.seconds).format("DD/MM/YYYY"),
    time: moment.unix(date.seconds).format("hh:mm:ss"),
  };
};
