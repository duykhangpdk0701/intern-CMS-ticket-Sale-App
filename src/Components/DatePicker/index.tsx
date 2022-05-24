import DatePicker, {
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import React from "react";
import { DatePicker as DatePickerAnt } from "antd";
import moment from "moment";

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
      value={value}
      onChange={onChange}
      renderInput={({ ref }) => (
        <DatePickerAnt
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
