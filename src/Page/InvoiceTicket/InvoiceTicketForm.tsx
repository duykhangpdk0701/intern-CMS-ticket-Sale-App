import { Button, DatePicker, Form, Radio } from "antd";
import React from "react";
import styles from "./InvoiceTicketForm.module.scss";

const InvoiceTicketForm = () => {
  return (
    <Form>
      <Form.Item name="status" label="Tình trạng đối soát">
        <Radio.Group defaultValue={"all"}>
          <div className={styles.radioWrapper}>
            <Radio className="radio" value="all">
              Tất cả
            </Radio>
            <Radio value={true}>Đã đối soát</Radio>
            <Radio value={false}>Chưa đỗi soát</Radio>
          </div>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Loại vé">
        <span>Vé Cổng</span>
      </Form.Item>

      <Form.Item name="dateFrom" label="Từ ngày">
        <DatePicker />
      </Form.Item>

      <Form.Item name="dateEnd" label="Đến ngày">
        <DatePicker />
      </Form.Item>

      <Button className={styles.buttonSubmit} size="large" type="primary" ghost>
        Lọc
      </Button>
    </Form>
  );
};

export default InvoiceTicketForm;
