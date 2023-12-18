import { useState } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import UserSearchModal from "../../components/modals/UserSearchModal";
import useModal from "../../hooks/useModal";
import CreateConsulting from "./CreateConsulting";
import CreateOpus from "./CreateOpus";
import OpusLeftSideBar from "./OpusLeftSideBar";

function Opus() {
  const [mode, setMode] = useState("opus");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const {
    isOpen: isUserSearchModalOpen,
    modalRef: userSearchModalRef,
    openModal: openUserSearchModal,
    closeModal: closeUserSearchModal,
  } = useModal();

  const onUserSelect = (user: any) => {
    setSelectedUser(user);
    setMode("consulting");
    closeUserSearchModal();
  };

  const handleMode = (mode: string) => {
    setMode(mode);
  };

  return (
    <DefaultLayout>
      <OpusLeftSideBar
        openUserSearchModal={openUserSearchModal}
        handleMode={handleMode}
      />
      {mode === "opus" && <CreateOpus />}
      {mode === "consulting" && (
        <CreateConsulting selectedUser={selectedUser} />
      )}

      {isUserSearchModalOpen && (
        <UserSearchModal
          userSearchModalRef={userSearchModalRef}
          closeUserSearchModal={closeUserSearchModal}
          onUserSelect={onUserSelect}
        />
      )}
    </DefaultLayout>
  );
}

export default Opus;
