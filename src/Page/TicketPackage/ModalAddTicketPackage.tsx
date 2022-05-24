import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
  Typography,
} from "antd";
import React, { useState } from "react";
import styles from "./ModalAddTicketPackage.module.scss";

import DatePickerCustom from "../../Components/DatePicker";
import { AddTicketPackageTypes } from "../../State/ActionTypes/TicketPackageTypes";
import { combineDayAndTime } from "../../helper/combineDayAndTime";
import { useDispatch } from "react-redux";
import { addTicketPackage } from "../../State/Actions/TicketPackageAcitons";

type ModalAddTicketPackageType = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const { Option } = Select;

const ModalAddTicketPackage = (props: ModalAddTicketPackageType) => {
  const [priceCheck, setPriceCheck] = useState(false);
  const [comboPriceCheck, setComboPriceCheck] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (value: any) => {
    try {
      const newTicketPackage: AddTicketPackageTypes = {
        name: value.name,
        validDate: combineDayAndTime(value.validDay, value.validTime),
        expiryDate: combineDayAndTime(value.expiryDay, value.expiryTime),
        price: priceCheck ? value.price : null,
        status: value.status || null,
        comboPrice: comboPriceCheck
          ? `${value.comboPrice}/${value.comboPriceAmount}`
          : null,
      };
      dispatch(addTicketPackage(newTicketPackage));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      width={758}
      visible={props.modalVisible}
      centered
      closable={false}
      onCancel={() => props.setModalVisible(false)}
      className={styles.modal}
      title={
        <Typography.Title level={3} className={styles.modalTitle}>
          Thêm gói vé
        </Typography.Title>
      }
      footer={[
        <div className={styles.modalButtonContainer}>
          <Form.Item key="submit">
            <Button
              style={{ marginRight: 24 }}
              size="large"
              type="primary"
              ghost
              className={styles.modalButton}
              onClick={() => props.setModalVisible(false)}>
              Hủy
            </Button>

            <Button
              form="addTicket"
              htmlType="submit"
              size="large"
              className={styles.modalButton}
              key="submit"
              type="primary">
              Lưu
            </Button>
          </Form.Item>
        </div>,
      ]}>
      <Form onFinish={onFinish} id="addTicket" layout="vertical">
        <div>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Input something!" }]}
            key="name"
            label={<label className="label">Tên gói vé</label>}>
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item label={<label className="label">Ngày áp dụng</label>}>
            <Form.Item key="validDay" name="validDay">
              <DatePickerCustom />
            </Form.Item>
            <Form.Item key="validTime" name="validTime">
              <TimePicker />
            </Form.Item>
          </Form.Item>
          <Form.Item label={<label className="label">Ngày hết hạn</label>}>
            <Form.Item key="expiryDay" name="expiryDay">
              <DatePickerCustom />
            </Form.Item>
            <Form.Item key="expiryTime" name="expiryTime">
              <TimePicker />
            </Form.Item>
          </Form.Item>
        </div>
        <div>
          <Form.Item label={<label className="label">Giá vé áp dụng</label>}>
            <Form.Item key="price" name="price">
              <div className={styles.priceWrapper}>
                <Checkbox
                  checked={priceCheck}
                  onChange={() => setPriceCheck(!priceCheck)}>
                  Vé lẻ (vnđ/vé) với giá
                </Checkbox>
                <InputNumber
                  min={1}
                  controls={false}
                  disabled={!priceCheck}
                  className={`${styles.input} ${styles.inputLongOne}`}
                  placeholder="Giá vé"
                  required={priceCheck}
                />
                <div>/vé</div>
              </div>
            </Form.Item>
            <Form.Item>
              <div className={styles.priceWrapper}>
                <Checkbox
                  checked={comboPriceCheck}
                  onChange={() => setComboPriceCheck(!comboPriceCheck)}>
                  Combo vé với giá
                </Checkbox>
                <Form.Item key="comboPrice" name="comboPrice">
                  <InputNumber
                    min={1}
                    controls={false}
                    disabled={!comboPriceCheck}
                    className={`${styles.input} ${styles.inputLongOne}`}
                    placeholder="Giá vé"
                    required={comboPriceCheck}
                  />
                </Form.Item>
                <div> / </div>
                <Form.Item key="comboPriceAmount" name="comboPriceAmount">
                  <InputNumber
                    min={1}
                    controls={false}
                    disabled={!comboPriceCheck}
                    className={`${styles.input} ${styles.inputShortOne}`}
                    placeholder="vé"
                    required={comboPriceCheck}
                  />
                </Form.Item>
                <div>vé</div>
              </div>
            </Form.Item>
          </Form.Item>
        </div>

        <div>
          <Form.Item
            key="status"
            name="status"
            initialValue={true}
            label={<label className="label">Tình trạng</label>}>
            <Select>
              <Option value={true}>Đang áp dụng</Option>
              <Option value={false}>Tắt</Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddTicketPackage;
