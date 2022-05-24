import moment from "moment";
import "moment/locale/pt-br";

type DateType = {
  seconds: number;
  nanoseconds: number;
};

export type ReturnDate = {
  date: string;
  time: string;
};

export const formatDate = (date: DateType) => {
  return {
    date: moment.unix(date?.seconds).format("DD/MM/YYYY"),
    time: moment.unix(date?.seconds).format("hh:mm:ss"),
  };
};
