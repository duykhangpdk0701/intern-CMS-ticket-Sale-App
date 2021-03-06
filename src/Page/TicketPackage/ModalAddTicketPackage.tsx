import {
  Button,
  Checkbox,
  Form,
  Input,
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
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";

type ModalAddTicketPackageType = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const { Option } = Select;

const ModalAddTicketPackage = (props: ModalAddTicketPackageType) => {
  const { modalVisible, setModalVisible } = props;
  const [priceCheck, setPriceCheck] = useState(false);
  const [comboPriceCheck, setComboPriceCheck] = useState(false);
  const dispatch = useDispatch();

  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });

  const onFinish = async (value: any) => {
    try {
      const newTicketPackage: AddTicketPackageTypes = {
        name: value.name,
        validDate: combineDayAndTime(value.validDay, value.validTime),
        expiryDate: combineDayAndTime(value.expiryDay, value.expiryTime),
        price: priceCheck ? parseInt(value.price) : null,
        status: value.status,
        comboPrice: comboPriceCheck
          ? `${value.comboPrice}/${value.comboPriceAmount}`
          : null,
        nameEvent: null,
        eventCode: null,
      };
      dispatch(addTicketPackage(newTicketPackage));
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      setModalVisible(false);
    }
  };

  return (
    <Modal
      width={758}
      visible={modalVisible}
      centered
      closable={false}
      onCancel={() => props.setModalVisible(false)}
      className={styles.modal}
      title={
        <Typography.Title level={3} className={styles.modalTitle}>
          Th??m g??i v??
        </Typography.Title>
      }
      footer={[
        <div className={styles.modalButtonContainer}>
          <Form.Item key="submit">
            <Button
              style={{ marginRight: 24 }}
              size="large"
              ghost
              className={styles.modalButton}
              onClick={() => props.setModalVisible(false)}>
              H???y
            </Button>

            <Button
              form="addTicket"
              htmlType="submit"
              size="large"
              className={styles.modalButton}
              key="submit"
              type="primary">
              L??u
            </Button>
          </Form.Item>
        </div>,
      ]}>
      <Form onFinish={onFinish} id="addTicket" layout="vertical">
        <div>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Xin vui l??ng nh???p t??n g??i v??!" },
            ]}
            key="name"
            label={<label className="label">T??n g??i v??</label>}>
            <Input
              size="large"
              placeholder="Nh???p t??n g??i v??"
              className={styles.ticketPackageInput}
            />
          </Form.Item>
        </div>
        <div className={styles.dateContainer}>
          <div>
            <label className="label">Ng??y ??p d???ng</label>
            <div className={styles.dateWrapper}>
              <Form.Item key="validDay" name="validDay">
                <DatePickerCustom
                  type="from"
                  dayRange={dayRange}
                  setDayRange={setDayRange}
                  inputClassName={styles.datePickerInput}
                />
              </Form.Item>
              <Form.Item key="validTime" name="validTime">
                <TimePicker
                  placeholder="hh:mm:ss"
                  size="large"
                  className={styles.timePickerInput}
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <label className="label">Ng??y h???t h???n</label>
            <div className={styles.dateWrapper}>
              <Form.Item key="expiryDay" name="expiryDay">
                <DatePickerCustom
                  type="to"
                  dayRange={dayRange}
                  setDayRange={setDayRange}
                  inputClassName={styles.datePickerInput}
                />
              </Form.Item>
              <Form.Item key="expiryTime" name="expiryTime">
                <TimePicker
                  placeholder="hh:mm:ss"
                  size="large"
                  className={styles.timePickerInput}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div>
          <div>
            <label className="label">Gi?? v?? ??p d???ng</label>
            <div>
              <div className={styles.priceWrapper}>
                <Checkbox
                  checked={priceCheck}
                  onChange={() => setPriceCheck(!priceCheck)}>
                  V?? l??? (vn??/v??) v???i gi??
                </Checkbox>
                <Form.Item noStyle key="price" name="price">
                  <Input
                    size="large"
                    disabled={!priceCheck}
                    className={`${styles.input} ${styles.inputLongOne}`}
                    placeholder="Gi?? v??"
                    required={priceCheck}
                  />
                </Form.Item>
                <div className={styles.unitPrice}>/ v??</div>
              </div>
            </div>
            <div>
              <div className={styles.priceWrapper}>
                <Checkbox
                  checked={comboPriceCheck}
                  onChange={() => setComboPriceCheck(!comboPriceCheck)}>
                  Combo v?? v???i gi??
                </Checkbox>
                <Form.Item noStyle key="comboPrice" name="comboPrice">
                  <Input
                    size="large"
                    disabled={!comboPriceCheck}
                    className={`${styles.input} ${styles.inputLongOne}`}
                    placeholder="Gi?? v??"
                    required={comboPriceCheck}
                  />
                </Form.Item>
                <div className={styles.unitPrice}> / </div>
                <Form.Item
                  noStyle
                  key="comboPriceAmount"
                  name="comboPriceAmount">
                  <Input
                    size="large"
                    disabled={!comboPriceCheck}
                    className={`${styles.input} ${styles.inputShortOne}`}
                    placeholder="v??"
                    required={comboPriceCheck}
                  />
                </Form.Item>
                <div className={styles.unitPrice}>v??</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Form.Item
            className={styles.statusSelect}
            key="status"
            name="status"
            initialValue={true}
            label={<label className="label">T??nh tr???ng</label>}>
            <Select size="large">
              <Option value={true}>??ang ??p d???ng</Option>
              <Option value={false}>T???t</Option>
            </Select>
          </Form.Item>
        </div>

        <div>
          <div>
            <Typography.Text className={styles.requireSign}>*</Typography.Text>{" "}
            <Typography.Text className={styles.requireText}>
              l?? th??ng tin b???t bu???c
            </Typography.Text>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAddTicketPackage;
