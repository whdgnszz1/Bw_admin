import { useState } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import UserSearchModal from "../../components/modals/UserSearchModal";
import useModal from "../../hooks/useModal";
import ScheduleLeftSideBar from "./ScheduleLeftSideBar";
import Wrapper from "../../components/layout/Wrapper";

function Schedule() {
  const [, setSelectedUser] = useState(null);

  const {
    isOpen: isUserSearchModalOpen,
    modalRef: userSearchModalRef,
    openModal: openUserSearchModal,
    closeModal: closeUserSearchModal,
  } = useModal();
  return (
    <DefaultLayout>
      <Wrapper>
        <ScheduleLeftSideBar openUserSearchModal={openUserSearchModal} />
        {isUserSearchModalOpen && (
          <UserSearchModal
            userSearchModalRef={userSearchModalRef}
            closeUserSearchModal={closeUserSearchModal}
            onUserSelect={(user) => setSelectedUser(user)}
          />
        )}
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-3/4 h-5/6 flex flex-col justify-center items-center bg-white rounded-lg p-8">
            <div>준비중인 기능입니다.</div>
          </div>
        </div>
      </Wrapper>
    </DefaultLayout>
  );
}

export default Schedule;
