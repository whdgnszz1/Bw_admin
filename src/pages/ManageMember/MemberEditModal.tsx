import React, { useEffect } from "react";
import { Modal, Button, Form, Input, message } from "antd";
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
  korean: string;
  english: string;
}

interface UserEditModalProps {
  user: User;
  onClose: () => void;
}

function MemberEditModal({ user, onClose }: UserEditModalProps) {
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
        korean: user.korean,
        english: user.english,
      });
    }
  }, [user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await putAPI("/user/member", { ...values, userId: user.userId });
      message.success("유저 정보가 수정되었습니다.");
      onClose();
    } catch (error) {
      message.error("유저 정보 수정에 실패했습니다.");
      console.error("유저 정보 수정에 실패했습니다.", error);
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
          수정
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
        <Form.Item
          name="korean"
          label="국어 반"
          rules={[{ required: false, message: "국어 반을 입력해주세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="english"
          label="영어 반"
          rules={[{ required: false, message: "영어 반을 입력해주세요." }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MemberEditModal;
