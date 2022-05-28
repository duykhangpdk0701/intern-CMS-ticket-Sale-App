import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  TimePicker,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DatePickerCustom from "../../Components/DatePicker";
import { TicketPackageTypes } from "../../State/ActionTypes/TicketPackageTypes";
import styles from "./ModalUpdateTicketPackage.module.scss";

type ModalUpdateTicketPackageType = {
  valueItem: TicketPackageTypes;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalUpdateTicketPackage = (props: ModalUpdateTicketPackageType) => {
  const { valueItem } = props;
  const [form] = Form.useForm();
  const [priceCheck, setPriceCheck] = useState(false);
  const [comboPriceCheck, setComboPriceCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(valueItem);
  }, [form, valueItem]);

  useEffect(() => {
    if (valueItem.price !== null) {
      setPriceCheck(true);
    }
    if (valueItem.comboPrice !== null) {
      setComboPriceCheck(true);
    }
  }, [valueItem]);

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
      <Form
        form={form}
        initialValues={props.valueItem}
        onFinish={onFinish}
        id="updateTicket"
        layout="vertical">
        <div className={styles.nameContainer}>
          <Form.Item key="id" name="id" label={<label>Mã sự kiện</label>}>
            <Input size="large" />
          </Form.Item>
          <Form.Item key="name" name="name" label={<label>Tên sự kiện</label>}>
            <Input size="large" />
          </Form.Item>
        </div>
        <div className={styles.dateContainer}>
          <Form.Item label={<label className="label">Ngày áp dụng</label>}>
            <div className={styles.dateWrapper}>
              <Form.Item key="validDay" name="validDay">
                <DatePickerCustom />
              </Form.Item>
              <Form.Item key="validTime" name="validTime">
                <TimePicker size="large" />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item label={<label className="label">Ngày hết hạn</label>}>
            <div className={styles.dateWrapper}>
              <Form.Item key="expiryDay" name="expiryDay">
                <DatePickerCustom />
              </Form.Item>
              <Form.Item key="expiryTime" name="expiryTime">
                <TimePicker size="large" />
              </Form.Item>
            </div>
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
                <Form.Item name="price" key="price">
                  <Input
                    size="large"
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
                    size="large"
                    disabled={!comboPriceCheck}
                    className={`${styles.input} ${styles.inputLongOne}`}
                    placeholder="Giá vé"
                  />
                </Form.Item>
                <div> / </div>
                <Form.Item key="comboPriceAmount" name="comboPriceAmount">
                  <Input
                    size="large"
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
