import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useQuery } from "react-query";
import { getAPI } from "../../axios";

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
          <button onClick={closeUserSearchModal}>X</button>
        </div>
        <div className="flex justify-between px-2 gap-4 mt-3 items-center mb-2">
          <input
            className="w-full h-8 border-2 rounded-md border-black px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <BsSearch />
          </button>
        </div>
        {isLoading && <div>Loading...</div>}
        {isError && <div>검색도중 오류가 발생했습니다.</div>}
        {data && data.length === 0 && !isLoading && !isError && (
          <div className="w-full h-full flex justify-center items-center">
            🙅‍♀️ 검색결과가 없어요
          </div>
        )}
        {data && data.length > 0 && (
          <ul>
            {data.map((user: any) => (
              <div
                key={user.userId}
                className="flex flex-col items-start justify-center w-full h-full px-3"
                onClick={() => {
                  onUserSelect(user);
                  closeUserSearchModal();
                }}
              >
                <button>
                  고{user.grade} {user.className} {user.userName}
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserSearchModal;
