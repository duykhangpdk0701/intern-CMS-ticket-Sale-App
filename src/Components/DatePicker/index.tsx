import DatePicker, {
  DayRange,
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import React, { useEffect, useState } from "react";
import { DatePicker as DatePickerAnt, Radio, RadioChangeEvent } from "antd";
import moment from "moment";
import styles from "./DatePicker.module.scss";
import { customLocale } from "./customLocale";
import { formatFromObjectDateToStringDate } from "../../helper/formatCustomDate";

type DatePickerCustomType = {
  value?: any;
  onChange?: (value: DayValue) => void;
  defaultValue?: any;
  textLabel?: string;
  className?: string;
  dayRange?: any;
  setDayRange?: React.Dispatch<React.SetStateAction<DayRange>>;
  type?: string;
  hasOption?: boolean;
};

const DatePickerCustom: React.FC<DatePickerCustomType> = (
  props: DatePickerCustomType,
) => {
  const { hasOption = true } = props;
  const [radioValue, setRadioValue] = useState(true);
  const [value, setValue] = useState(props.value);

  const onChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  useEffect(() => {
    setValue(props.value);

    // if (
    //   props.dayRange.to !== null &&
    //   props.dayRange.from !== null &&
    //   !moment(formatFromObjectDateToStringDate(props.dayRange.to)).isAfter(
    //     formatFromObjectDateToStringDate(props.dayRange.from),
    //   ) &&
    //   props.setDayRange
    // ) {
    //   console.log("inside the swap");
    //   return props.setDayRange((pre) => {
    //     const from = pre.from;
    //     const to = pre.to;
    //     return { to: from, from: to };
    //   });
    // }
    // return;
  }, [props.value, props]);

  useEffect(() => {
    if (props.onChange !== undefined) {
      if (props.type === "to") {
        props.onChange(props.dayRange.to);
      } else if (props.type === "from") {
        props.onChange(props.dayRange.from);
      }
    }
  }, [props.dayRange, props]);

  const onChange = (pValue: any) => {
    setValue(pValue);
    if (props.onChange) {
      if (props.dayRange && props.setDayRange) {
        if (props.type === "to") {
          props.setDayRange({ ...props.dayRange, to: pValue });
        }
        if (props.type === "from") {
          props.setDayRange({ ...props.dayRange, from: pValue });
        }
      }
      props.onChange(pValue);
    }
  };

  const onChangeRange = (pValue: any) => {
    if (props.setDayRange) {
      props.setDayRange(pValue);
    }
  };

  return (
    <DatePicker
      calendarSelectedDayClassName={styles.selectDay}
      wrapperClassName={styles.calendarWrapper}
      calendarClassName={styles.calendar}
      value={radioValue ? value : props.dayRange}
      onChange={radioValue ? onChange : onChangeRange}
      locale={customLocale}
      colorPrimary="#FFBA7B"
      colorPrimaryLight="#FFD2A8"
      renderFooter={
        hasOption
          ? () => {
              return (
                <Radio.Group
                  className={styles.radioGroup}
                  value={radioValue}
                  onChange={onChangeRadio}>
                  <Radio value={true}>Theo ngày</Radio>
                  <Radio value={false}>Theo tuần</Radio>
                </Radio.Group>
              );
            }
          : undefined
      }
      renderInput={({ ref }) => (
        <DatePickerAnt
          className={styles.input}
          size="large"
          format="DD/MM/YYYY"
          value={
            value ? moment({ ...value, month: value.month - 1 }) : undefined
          }
          panelRender={() => <></>}
          ref={ref as any}
          placeholder="dd/mm/yy"
          onChange={onChange}
        />
      )}
    />
  );
};

export default DatePickerCustom;
