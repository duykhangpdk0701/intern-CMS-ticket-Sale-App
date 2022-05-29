import { Button, Form, Modal, Typography } from "antd";
import React, { useEffect, useMemo } from "react";
import { TicketTypes } from "../../State/ActionTypes/TicketTypes";
import styles from "./ModalManageTicket.module.scss";
import DatePickerCustom from "../../Components/DatePicker";
import { useDispatch } from "react-redux";
import { updateTicketDate } from "../../State/Actions/TicketActions";
import moment from "moment";
import { formatCustomDate } from "../../helper/formatCustomDate";

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
  const currentDate = useMemo(
    () => moment(valueItem.dateUse).toObject(),
    [valueItem],
  );
  const initialValue = {
    ...valueItem,
    dateUse: formatCustomDate(valueItem.dateUse),
  };

  useEffect(() => {
    console.log(valueItem);
    form.setFieldsValue({
      ...valueItem,
      dateUse: formatCustomDate(valueItem.dateUse),
    });
  }, [valueItem, form]);

  const onFinish = async (value: any) => {
    console.log(value);
    try {
      dispatch(
        updateTicketDate({
          id: valueItem.id,
          dateUse: moment(value.dateUseUpdate)
            .subtract("months", 1)
            .format("YYYY/MM/DD"),
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
          <Form.Item>
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
          labelAlign="left"
          label={<Title level={5}>Số vé</Title>}
          className={styles.ticketValueContainer}>
          <Text className={styles.textValue}>{valueItem.id}</Text>
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label={<Title level={5}>Số vé</Title>}
          className={styles.ticketValueContainer}>
          <Text className={styles.textValue}>Vé cổng - Gói sự kiện</Text>
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label={<Title level={5}>Tên sự kiện</Title>}
          className={styles.ticketValueContainer}>
          <Text className={styles.textValue}>
            Hội trợ triển lãm hàng tiêu dùng 2021
          </Text>
        </Form.Item>
        <Form.Item
          name="dateUse"
          labelAlign="left"
          label={<Title level={5}>Hạn sử dụng</Title>}
          className={styles.ticketValueContainer}>
          <DatePickerCustom />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalChangeDateManageTicket;
