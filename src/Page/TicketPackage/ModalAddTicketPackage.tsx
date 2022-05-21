import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  Typography,
} from "antd";
import React from "react";
import styles from "./ModalAddTicketPackage.module.scss";

type ModalAddTicketPackageType = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const { Option } = Select;

const ModalAddTicketPackage = (props: ModalAddTicketPackageType) => {
  const onFinish = async (value: any) => {
    console.log(value);
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
      <Form onFinish={onFinish} id="addTicket" layout="vertical">
        <div>
          <Form.Item label={<label className="label">Tên gói vé</label>}>
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

        <div>
          <Form.Item
            initialValue={true}
            label={<label className="label">Tình trạng</label>}>
            <Select defaultValue={true}>
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
