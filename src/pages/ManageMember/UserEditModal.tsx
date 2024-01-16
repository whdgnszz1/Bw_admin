import React, { useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";
import { putAPI } from "../../axios";

export interface User {
  userName: string;
  email: string;
  phoneNumber: string;
  birth: string;
  school: string;
  grade: number;
  className: string;
  userId: number;
}

interface UserEditModalProps {
  user: User;
  onClose: () => void;
}

function UserEditModal({ user, onClose }: UserEditModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        className: user.className,
        grade: user.grade,
        school: user.school,
        birth: user.birth,
      });
    }
  }, [user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await putAPI("/user/approve", { ...values, userId: user.userId });
      onClose();
    } catch (error) {
      console.error("유저 승인에 실패했습니다.", error);
    }
  };

  return (
    <Modal
      title="유저 정보 수정"
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          취소
        </Button>,
        <Button key="submit" onClick={handleSubmit}>
          승인
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="userEditForm">
        <Form.Item
          name="userName"
          label="이름"
          rules={[{ required: true, message: "이름을 입력해주세요." }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            { required: true, message: "이메일을입력해주세요.", type: "email" },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="전화번호"
          rules={[{ required: true, message: "전화번호를 입력해주세요." }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="school"
          label="학교"
          rules={[{ required: true, message: "학교를 입력해주세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="grade"
          label="학년"
          rules={[{ required: true, message: "학년을 입력해주세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="className"
          label="반"
          rules={[{ required: true, message: "반을 입력해주세요." }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UserEditModal;
