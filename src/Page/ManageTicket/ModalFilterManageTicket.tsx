import { Button, Checkbox, Form, Modal, Radio, Typography } from "antd";
import React, { useState } from "react";
import { TicketFilterTypes } from "../../State/ActionTypes/TicketTypes";
import { getTicketsWithFilter } from "../../State/Actions/TicketActions";
import styles from "./ModalFilterManageTicket.module.scss";
import { useDispatch } from "react-redux";
import DatePickerCustom from "../../Components/DatePicker";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

type ModalManageTicketType = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalFilterManageTicket = (props: ModalManageTicketType) => {
  const { modalVisible, setModalVisible } = props;

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });

  const initialValue = {
    dateFrom: undefined,
    dateTo: undefined,
    statusUsage: "all",
    checkIn: ["all"],
  };

  const selectAllOnChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      form.setFieldsValue({ checkIn: ["all"] });
    }
  };

  const onFinish = async (value: TicketFilterTypes) => {
    console.log(value);
    try {
      dispatch(
        getTicketsWithFilter({
          ...value,
        }),
      );
      props.setModalVisible(false);
    } catch (error) {
      console.log(error);
      props.setModalVisible(false);
    }
  };

  return (
    <Modal
      width={634}
      style={{ borderRadius: "16px" }}
      className={styles.modal}
      title={
        <Typography.Title level={3} className={styles.modalTitle}>
          Lọc vé
        </Typography.Title>
      }
      centered
      visible={modalVisible}
      closable={false}
      onCancel={() => setModalVisible(false)}
      footer={[
        <div className={styles.modalButtonContainer}>
          <Form.Item key="buttonAction">
            <Button
              form="ticketFilter"
              htmlType="submit"
              className={styles.modalButton}
              size="large"
              key="submit"
              ghost>
              Lọc
            </Button>
          </Form.Item>
        </div>,
      ]}>
      <Form
        form={form}
        id="ticketFilter"
        name="control-hooks"
        onFinish={onFinish}
        initialValues={initialValue}
        layout="vertical">
        <div className={styles.datePickerContainer}>
          <Form.Item
            name="dateForm"
            label={<label className="label">Từ ngày</label>}>
            <DatePickerCustom
              type="from"
              dayRange={dayRange}
              setDayRange={setDayRange}
              inputClassName={styles.datePickerInput}
            />
          </Form.Item>
          <Form.Item
            name="dateTo"
            label={<label className="label">Đến ngày</label>}>
            <DatePickerCustom
              type="to"
              dayRange={dayRange}
              setDayRange={setDayRange}
              inputClassName={styles.datePickerInput}
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            className={styles.formItem}
            // initialValue={"all"}
            name="statusUsage"
            label={<label className="label">Tình trạng sử dụng</label>}>
            <Radio.Group className={styles.radioContainer}>
              <Radio value={"all"}>Tất cả</Radio>
              <Radio value={2}>Đã sử dụng</Radio>
              <Radio value={1}>Chưa sử dụng</Radio>
              <Radio value={0}>Hết hạn</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div>
          <Form.Item
            className={styles.formItem}
            // initialValue={["all"]}
            name="checkIn"
            key="checkIn"
            label={<label className="label">Cổng Check - in</label>}>
            <Checkbox.Group className={styles.checkboxContainer}>
              <div className={styles.checkboxWrapper}>
                <Checkbox onChange={selectAllOnChange} value={"all"}>
                  Tất cả
                </Checkbox>
                <Checkbox value={"Cổng 1"}>Cổng 1</Checkbox>
                <Checkbox value={"Cổng 2"}>Cổng 2</Checkbox>
              </div>
              <div className={styles.checkboxWrapper}>
                <Checkbox value={"Cổng 3"}>Cổng 3</Checkbox>
                <Checkbox value={"Cổng 4"}>Cổng 4</Checkbox>
                <Checkbox value={"Cổng 5"}>Cổng 5</Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalFilterManageTicket;
