import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  TimePicker,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TicketPackageTypes } from "../../State/ActionTypes/TicketPackageTypes";
import styles from "./ModalUpdateTicketPackage.module.scss";

type ModalUpdateTicketPackageType = {
  valueItem: TicketPackageTypes;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalUpdateTicketPackage = (props: ModalUpdateTicketPackageType) => {
  const [priceCheck, setPriceCheck] = useState(false);
  const [comboPriceCheck, setComboPriceCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const valueItem = props.valueItem;
    if (valueItem.price !== null) {
      setPriceCheck(true);
    }
    if (valueItem.comboPrice !== null) {
      setComboPriceCheck(true);
    }
  }, [props.valueItem]);

  const onFinish = async (value: any) => {
    console.log(props.valueItem);
  };

  return (
    <Modal
      visible={props.modalVisible}
      width={758}
      centered
      className={styles.modal}
      closable={false}
      title={
        <Typography.Title level={3} className={styles.modalTitle}>
          Cập nhật thông tin gói vé
        </Typography.Title>
      }
      footer={[
        <div className={styles.modalButtonContainer}>
          <Form.Item>
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
              form="updateTicket"
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
      <Form onFinish={onFinish} id="updateTicket" layout="vertical">
        <div>
          <Form.Item
            initialValue={props.valueItem.id}
            label={<label>Mã sự kiện</label>}>
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={props.valueItem.name}
            label={<label>Tên sự kiện</label>}>
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item label={<label className="label">Ngày áp dụng</label>}>
            <Form.Item key="validDay" name="validDay">
              <DatePicker />
            </Form.Item>
            <Form.Item key="validTime" name="validTime">
              <TimePicker />
            </Form.Item>
          </Form.Item>
          <Form.Item label={<label className="label">Ngày hết hạn</label>}>
            <Form.Item key="expiryDay" name="expiryDay">
              <DatePicker />
            </Form.Item>
            <Form.Item key="expiryTime" name="expiryTime">
              <TimePicker />
            </Form.Item>
          </Form.Item>
        </div>

        <div>
          <Form.Item label={<label className="label">Giá vé áp dụng</label>}>
            <Form.Item>
              <div className={styles.priceWrapper}>
                <Checkbox
                  checked={priceCheck}
                  onChange={() => setPriceCheck(!priceCheck)}>
                  Vé lẻ (vnđ/vé) với giá
                </Checkbox>
                <Form.Item
                  name="price"
                  key="price"
                  initialValue={props.valueItem.price}>
                  <Input
                    disabled={!priceCheck}
                    className={`${styles.input} ${styles.inputLongOne}`}
                    placeholder="Giá vé"
                  />
                </Form.Item>
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
                <Form.Item name="comboPrice" key="comboPrice">
                  <Input
                    disabled={!comboPriceCheck}
                    className={`${styles.input} ${styles.inputLongOne}`}
                    placeholder="Giá vé"
                  />
                </Form.Item>
                <div> / </div>
                <Form.Item key="comboPriceAmount" name="comboPriceAmount">
                  <Input
                    disabled={!comboPriceCheck}
                    className={`${styles.input} ${styles.inputShortOne}`}
                    placeholder="vé"
                  />
                </Form.Item>
                <div>vé</div>
              </div>
            </Form.Item>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalUpdateTicketPackage;
