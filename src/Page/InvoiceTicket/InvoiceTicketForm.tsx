import { Button, DatePicker, Form, Radio } from "antd";
import React from "react";
import styles from "./InvoiceTicketForm.module.scss";

const InvoiceTicketForm = () => {
  return (
    <Form>
      <Form.Item
        name="status"
        label={<label className="label">Tình trạng đối soát</label>}>
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

      <Form.Item label={<label className="label">Loại vé</label>}>
        <span>Vé Cổng</span>
      </Form.Item>

      <Form.Item
        name="dateFrom"
        label={<label className="label">Từ ngày</label>}>
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="dateEnd"
        label={<label className="label">Đến ngày</label>}>
        <DatePicker />
      </Form.Item>

      <Button className={styles.buttonSubmit} size="large" type="primary" ghost>
        Lọc
      </Button>
    </Form>
  );
};

export default InvoiceTicketForm;
