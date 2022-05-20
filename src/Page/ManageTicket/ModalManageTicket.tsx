import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Modal,
  Radio,
  Typography,
} from "antd";
import React from "react";
import styles from "./ModalManageTicket.module.scss";

type ModalManageTicketType = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalManageTicket = (props: ModalManageTicketType) => {
  const [form] = Form.useForm<{
    dateForm: Date;
    dateTo: Date;
    status: boolean | string;
    checkIn: string;
  }>();

  const handleOkFilter = async () => {
    console.log(form.getFieldValue);
    props.setModalVisible(false);
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
      visible={props.modalVisible}
      onOk={handleOkFilter}
      closable={false}
      onCancel={() => props.setModalVisible(false)}
      footer={[
        <div className={styles.modalButtonContainer}>
          <Form.Item>
            <Button
              htmlType="submit"
              className={styles.modalButton}
              size="large"
              key="submit"
              ghost
              type="primary"
              onClick={handleOkFilter}>
              Lọc
            </Button>
          </Form.Item>
        </div>,
      ]}>
      <Form form={form} layout="vertical">
        <div className={styles.datePickerContainer}>
          <Form.Item
            name="dateForm"
            label={<label className="label">Từ ngày</label>}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="dateTo"
            label={<label className="label">Đến ngày</label>}>
            <DatePicker />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            name="status"
            label={<label className="label">Tình trạng sử dụng</label>}>
            <Radio.Group defaultValue={"all"} className={styles.radioContainer}>
              <Radio value={"all"}>Tất cả</Radio>
              <Radio value={1}>Đã sử dụng</Radio>
              <Radio value={2}>Chưa sử dụng</Radio>
              <Radio value={3}>Hết hạn</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div>
          <Form.Item
            name="checkIn"
            label={<label className="label">Cổng Check - in</label>}>
            <Checkbox.Group
              defaultValue={["all"]}
              className={styles.checkboxContainer}>
              <div className={styles.checkboxWrapper}>
                <Checkbox defaultChecked value={"all"}>
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

export default ModalManageTicket;
