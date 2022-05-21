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
import React from "react";
import styles from "./ModalUpdateTicketPackage.module.scss";

type ModalUpdateTicketPackage = {
  id: string;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalUpdateTicketPackage = (props: ModalUpdateTicketPackage) => {
  const onFinish = async (value: any) => {
    console.log(value);
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
      <Form onFinish={onFinish} id="updateTicket" layout="vertical">
        <div>
          <Form.Item label={<label>Mã sự kiện</label>}>
            <Input />
          </Form.Item>
          <Form.Item label={<label>Mã sự kiện</label>}>
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item label={<label className="label">Ngày áp dụng</label>}>
            <DatePicker />
            <TimePicker />
          </Form.Item>
          <Form.Item label={<label className="label">Ngày hết hạn</label>}>
            <DatePicker />
            <TimePicker />
          </Form.Item>
        </div>

        <div>
          <Form.Item label={<label className="label">Giá vé áp dụng</label>}>
            <Form.Item name="price">
              <div className={styles.priceWrapper}>
                <Checkbox>Vé lẻ (vnđ/vé) với giá</Checkbox>
                <Input
                  className={`${styles.input} ${styles.inputLongOne}`}
                  placeholder="Giá vé"
                />
                <div>/vé</div>
              </div>
            </Form.Item>
            <Form.Item name="comboPrice">
              <div className={styles.priceWrapper}>
                <Checkbox>Combo vé với giá</Checkbox>
                <Input
                  className={`${styles.input} ${styles.inputLongOne}`}
                  placeholder="Giá vé"
                />
                <div> / </div>
                <Input
                  className={`${styles.input} ${styles.inputShortOne}`}
                  placeholder="vé"
                />
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
