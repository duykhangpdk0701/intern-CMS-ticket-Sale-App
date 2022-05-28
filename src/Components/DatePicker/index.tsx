import DatePicker, {
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import React from "react";
import { DatePicker as DatePickerAnt } from "antd";
import moment from "moment";
import styles from "./DatePicker.module.scss";

type DatePickerCustomType = {
  value?: DayValue;
  onChange?: (value: DayValue) => void;
};

const DatePickerCustom: React.FC<DatePickerCustomType> = ({
  value,
  onChange,
}) => {
  return (
    <DatePicker
      wrapperClassName={styles.calendar}
      calendarClassName={styles.calendar}
      value={value}
      onChange={onChange}
      renderInput={({ ref }) => (
        <DatePickerAnt
          className={styles.input}
          size="large"
          allowClear={false}
          format="DD/MM/YYYY"
          value={value ? moment(value).subtract("months", 1) : undefined}
          panelRender={() => <></>}
          ref={ref as any}
          placeholder="dd/mm/yy"
        />
      )}
    />
  );
};

export default DatePickerCustom;
