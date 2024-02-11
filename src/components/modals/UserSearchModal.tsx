import { useState } from "react";
import { useQuery } from "react-query";
import { getAPI } from "../../axios";
import { Input, Button, Spin, List, Alert } from "antd";
import { BsSearch } from "react-icons/bs";

interface UserSearchModalProps {
  userSearchModalRef: any;
  closeUserSearchModal: () => void;
  onUserSelect: (user: any) => void;
}

const UserSearchModal: React.FC<UserSearchModalProps> = ({
  userSearchModalRef,
  closeUserSearchModal,
  onUserSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const fetchUsers = async (queryKey: any) => {
    const query = queryKey.queryKey[1];
    const result = await getAPI(`/user/search?email=${query}&name=${query}`);
    return result.data;
  };

  const { data, isError, isLoading } = useQuery(
    ["searchUsers", searchTerm],
    fetchUsers,
    {
      enabled: searchTerm.length > 0,
    }
  );

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-60"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="w-[400px] h-[600px] bg-white rounded-md p-2"
        ref={userSearchModalRef}
      >
        <div className="flex justify-between px-3 mt-2">
          <div>Search Student</div>
          <Button onClick={closeUserSearchModal}>X</Button>
        </div>
        <div className="flex justify-between px-2 gap-4 mt-3 items-center mb-2">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className="px-10 flex items-center justify-center"
            icon={<BsSearch />}
          />
        </div>
        {isLoading && <Spin />}
        {isError && (
          <Alert message="검색 중 오류가 발생했습니다." type="error" />
        )}
        {data && data.length === 0 && !isLoading && !isError && (
          <div className="w-full h-full flex justify-center items-center">
            🙅‍♀️ 검색 결과가 없어요
          </div>
        )}
        {data && data.length > 0 && (
          <List
            className="px-2"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(user: any) => (
              <List.Item
                className="cursor-pointer rounded-md"
                onClick={() => {
                  onUserSelect(user);
                  closeUserSearchModal();
                }}
              >
                <List.Item.Meta title={`고${user.grade} ${user.userName}`} />
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default UserSearchModal;
