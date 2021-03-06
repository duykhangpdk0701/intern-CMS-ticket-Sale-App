import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
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
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import DatePickerCustom from "../../Components/DatePicker";
import { formatUnixDateToObjectDate } from "../../helper/formatUnixDateToObjectDate";
import { TicketPackageTypes } from "../../State/ActionTypes/TicketPackageTypes";
import styles from "./ModalUpdateTicketPackage.module.scss";
import { combineDayAndTime } from "../../helper/combineDayAndTime";
import { updateTicketPackage } from "../../State/Actions/TicketPackageAcitons";

type ModalUpdateTicketPackageType = {
  valueItem: TicketPackageTypes;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const { Option } = Select;

const ModalUpdateTicketPackage = (props: ModalUpdateTicketPackageType) => {
  const { valueItem, setModalVisible, modalVisible } = props;
  const [form] = Form.useForm();
  const [priceCheck, setPriceCheck] = useState(false);
  const [comboPriceCheck, setComboPriceCheck] = useState(false);
  const dispatch = useDispatch();
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });

  const initialValue = useMemo(() => {
    const expiryDate = formatUnixDateToObjectDate(valueItem.expiryDate);
    const validDate = formatUnixDateToObjectDate(valueItem.validDate);

    const comboPrice =
      valueItem.comboPrice !== null ? valueItem.comboPrice.split("/") : null;

    setDayRange({
      from: validDate?.day,
      to: expiryDate?.day,
    });
    return {
      ...valueItem,
      comboPrice: comboPrice !== null ? comboPrice[0] : null,
      comboPriceAmount: comboPrice !== null ? comboPrice[1] : null,
      validDay: validDate?.day,
      validTime: validDate?.time,
      expiryDay: expiryDate?.day,
      expiryTime: expiryDate?.time,
    };
  }, [valueItem]);

  useEffect(() => {
    setComboPriceCheck(false);
    setPriceCheck(false);
    if (valueItem.price !== null) {
      setPriceCheck(true);
    }
    if (valueItem.comboPrice !== null) {
      setComboPriceCheck(true);
    }
    form.setFieldsValue(initialValue);
  }, [form, valueItem, initialValue]);

  const onFinish = async (value: any) => {
    try {
      const price = priceCheck ? value.price : null;
      const comboPrice = comboPriceCheck
        ? `${value.comboPrice}/${value.comboPriceAmount}`
        : null;
      const expiryDate = combineDayAndTime(value.expiryDay, value.expiryTime);
      const validDate = combineDayAndTime(value.validDay, value.validTime);
      const newValue = {
        ...value,
        price,
        comboPrice,
        expiryDate,
        validDate,
        id: valueItem.id,
      };
      dispatch(updateTicketPackage(newValue));
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      setModalVisible(false);
    }
  };

  return (
    <Modal
      visible={modalVisible}
      width={758}
      centered
      className={styles.modal}
      closable={false}
      title={
        <Typography.Title level={3} className={styles.modalTitle}>
          C???p nh???t th??ng tin g??i v??
        </Typography.Title>
      }
      footer={[
        <div className={styles.modalButtonContainer}>
          <Form.Item key={"actionButton"}>
            <Button
              style={{ marginRight: 24 }}
              size="large"
              ghost
              className={styles.modalButton}
              onClick={() => setModalVisible(false)}>
              H???y
            </Button>

            <Button
              form="updateTicketPacket"
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
      <Form
        form={form}
        initialValues={initialValue}
        onFinish={onFinish}
        id="updateTicketPacket"
        layout="vertical">
        <div className={styles.nameContainer}>
          <Form.Item
            key="eventCode"
            name="eventCode"
            rules={[
              { required: true, message: "Xin vui l??ng nh???p m?? s??? ki???n!" },
            ]}
            label={<label className="label">M?? s??? ki???n</label>}>
            <Input size="large" className={styles.eventCodeInput} />
          </Form.Item>
          <Form.Item
            key="nameEvent"
            name="nameEvent"
            label={<label className="label">T??n s??? ki???n</label>}>
            <Input size="large" />
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
                <TimePicker size="large" className={styles.timePickerInput} />
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
                <TimePicker className={styles.timePickerInput} size="large" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div>
          <label className="label">Gi?? v?? ??p d???ng</label>
          <div>
            <div className={styles.priceWrapper}>
              <Checkbox
                checked={priceCheck}
                onChange={() => setPriceCheck(!priceCheck)}>
                V?? l??? (vn??/v??) v???i gi??
              </Checkbox>
              <Form.Item noStyle name="price" key="price">
                <Input
                  size="large"
                  disabled={!priceCheck}
                  className={`${styles.input} ${styles.inputLongOne}`}
                  placeholder="Gi?? v??"
                />
              </Form.Item>
              <div className={styles.unitPrice}> / v?? </div>
            </div>
          </div>
          <div>
            <div className={styles.priceWrapper}>
              <Checkbox
                checked={comboPriceCheck}
                onChange={() => setComboPriceCheck(!comboPriceCheck)}>
                Combo v?? v???i gi??
              </Checkbox>
              <Form.Item noStyle name="comboPrice" key="comboPrice">
                <Input
                  size="large"
                  disabled={!comboPriceCheck}
                  className={`${styles.input} ${styles.inputLongOne}`}
                  placeholder="Gi?? v??"
                />
              </Form.Item>
              <div className={styles.unitPrice}> / </div>
              <Form.Item noStyle key="comboPriceAmount" name="comboPriceAmount">
                <Input
                  size="large"
                  disabled={!comboPriceCheck}
                  className={`${styles.input} ${styles.inputShortOne}`}
                  placeholder="v??"
                />
              </Form.Item>
              <div className={styles.unitPrice}>v??</div>
            </div>
          </div>
        </div>
        <div>
          <Form.Item
            className={styles.statusSelect}
            key="status"
            name="status"
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

export default ModalUpdateTicketPackage;
