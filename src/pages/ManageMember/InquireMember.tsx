import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchMember } from "../../api/userAPI";
import { List, Button, Modal, Pagination } from "antd";
import MemberEditModal from "./MemberEditModal";

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

function InquireMember() {
  const {
    data: member,
    isLoading,
    refetch,
  } = useQuery<User[]>(["member"], fetchMember);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const currentData = member
    ? member.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUserUpdated = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>회원 목록</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={currentData}
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
                  description={user.email}
                />
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={member ? member.length : 0}
            onChange={handlePageChange}
          />
        </>
      )}
      {isModalOpen && selectedUser && (
        <Modal
          title="유저 정보 수정"
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <MemberEditModal user={selectedUser} onClose={handleUserUpdated} />
        </Modal>
      )}
    </div>
  );
}

export default InquireMember;
