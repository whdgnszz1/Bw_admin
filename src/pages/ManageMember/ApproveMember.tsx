import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchNotAllowedUser } from "../../api/userAPI";
import { List, Button, Modal } from "antd";
import UserEditModal from "./UserEditModal";

export interface User {
  birth: string;
  className: string;
  email: string;
  grade: number;
  phoneNumber: string;
  school: string;
  userName: string;
  userId: number;
  korean: string;
  english: string;
}

function ApproveMember() {
  const {
    data: notAllowedUsers,
    isLoading,
    refetch,
  } = useQuery<User[]>(["notAllowedUsers"], fetchNotAllowedUser);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUserUpdated = () => {
    setIsModalOpen(false);
    refetch();
  };

  return (
    <div>
      <h2>미승인 유저 목록</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={notAllowedUsers}
          renderItem={(user) => (
            <List.Item
              actions={[
                <Button
                  key="list-loadmore-edit"
                  onClick={() => handleEditClick(user)}
                >
                  수정
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={user.userName}
                description={`${user.email}`}
              />
            </List.Item>
          )}
        />
      )}
      {isModalOpen && selectedUser && (
        <Modal
          title="유저 정보 수정"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <UserEditModal user={selectedUser} onClose={handleUserUpdated} />
        </Modal>
      )}
    </div>
  );
}

export default ApproveMember;
