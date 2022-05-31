import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import { Button, Form, Radio } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DatePickerCustom from "../../Components/DatePicker";
import { getInvoiceTicketsWithFilter } from "../../State/Actions/InvoiceTicketActions";
import { FilterInvoiceTicketType } from "../../State/ActionTypes/InvoiceTicketTypes";
import styles from "./InvoiceTicketForm.module.scss";

const InvoiceTicketForm = () => {
  const dispatch = useDispatch();

  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });

  const onFinish = async (value: FilterInvoiceTicketType) => {
    try {
      console.log(value);
      dispatch(getInvoiceTicketsWithFilter(value));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onFinish={onFinish} className={styles.form}>
      <Form.Item
        labelAlign="left"
        className={styles.formItem}
        initialValue={"all"}
        key="status"
        name="status"
        label={<label className="label">Tình trạng đối soát</label>}>
        <Radio.Group>
          <div className={styles.radioWrapper}>
            <Radio className="radio" value="all">
              Tất cả
            </Radio>
            <Radio value={true}>Đã đối soát</Radio>
            <Radio value={false}>Chưa đỗi soát</Radio>
          </div>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        labelAlign="left"
        className={styles.formItem}
        key="type"
        label={<label className="label">Loại vé</label>}>
        <span>Vé Cổng</span>
      </Form.Item>

      <Form.Item
        labelAlign="left"
        className={styles.formItem}
        key="dateFrom"
        name="dateFrom"
        label={<label className="label">Từ ngày</label>}>
        <DatePickerCustom
          type="from"
          dayRange={dayRange}
          setDayRange={setDayRange}
        />
      </Form.Item>

      <Form.Item
        labelAlign="left"
        className={styles.formItem}
        key="dateEnd"
        name="dateEnd"
        label={<label className="label">Đến ngày</label>}>
        <DatePickerCustom
          type="to"
          dayRange={dayRange}
          setDayRange={setDayRange}
        />
      </Form.Item>

      <Button
        className={styles.buttonSubmit}
        htmlType="submit"
        size="large"
        type="primary"
        ghost>
        Lọc
      </Button>
    </Form>
  );
};

export default InvoiceTicketForm;
