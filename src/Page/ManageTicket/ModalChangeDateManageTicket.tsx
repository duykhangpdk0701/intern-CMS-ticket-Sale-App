import { Button, Form, Modal, Typography } from "antd";
import React, { useEffect, useMemo } from "react";
import { TicketTypes } from "../../State/ActionTypes/TicketTypes";
import styles from "./ModalChangeDateManageTicket.module.scss";
import DatePickerCustom from "../../Components/DatePicker";
import { useDispatch } from "react-redux";
import { updateTicketDate } from "../../State/Actions/TicketActions";
import {
  formatCustomDate,
  formatFromObjectDateToStringDate,
} from "../../helper/formatCustomDate";

type ModalChangeDateManageTicketType = {
  valueItem: TicketTypes;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const { Title, Text } = Typography;

const ModalChangeDateManageTicket = (
  props: ModalChangeDateManageTicketType,
) => {
  const { valueItem, modalVisible, setModalVisible } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const initialValue = useMemo(
    () => ({
      ...valueItem,
      dateUse: formatCustomDate(valueItem.dateUse),
    }),
    [valueItem],
  );

  useEffect(() => {
    form.setFieldsValue(initialValue);
  }, [form, initialValue]);

  const onFinish = async (value: any) => {
    try {
      dispatch(
        updateTicketDate({
          id: valueItem.id,
          dateUse: formatFromObjectDateToStringDate(value.dateUse),
        }),
      );
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
      closable={false}
      centered
      title={
        <Title level={3} className={styles.modalTitle}>
          Đổi ngày sử dụng vé
        </Title>
      }
      footer={[
        <div className={styles.modalButtonContainer}>
          <Form.Item key="buttonAction">
            <Button
              style={{ marginRight: 24 }}
              size="large"
              type="primary"
              ghost
              className={styles.modalButton}
              onClick={() => setModalVisible(false)}>
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
        onFinish={onFinish}
        id="updateTicket"
        form={form}
        initialValues={initialValue}>
        <Form.Item
          key="id"
          labelAlign="left"
          label={<Title level={5}>Số vé</Title>}
          className={styles.ticketValueContainer}>
          <Text className={styles.textValue}>{valueItem.id}</Text>
        </Form.Item>
        <Form.Item
          key="event"
          labelAlign="left"
          label={<Title level={5}>Số vé</Title>}
          className={styles.ticketValueContainer}>
          <Text className={styles.textValue}>Vé cổng - Gói sự kiện</Text>
        </Form.Item>
        <Form.Item
          key="name"
          labelAlign="left"
          label={<Title level={5}>Tên sự kiện</Title>}
          className={styles.ticketValueContainer}>
          <Text className={styles.textValue}>
            Hội trợ triển lãm hàng tiêu dùng 2021
          </Text>
        </Form.Item>
        <Form.Item
          key="dateUse"
          name="dateUse"
          labelAlign="left"
          label={<Title level={5}>Hạn sử dụng</Title>}
          className={styles.ticketValueContainer}>
          <DatePickerCustom hasOption={false} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalChangeDateManageTicket;
