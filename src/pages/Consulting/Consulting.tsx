import { useState } from "react";
import { postAPI } from "../../axios";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Wrapper from "../../components/layout/Wrapper";
import UserSearchModal from "../../components/modals/UserSearchModal";
import useModal from "../../hooks/useModal";
import { getISODateTime } from "../../utils/transformDateTime";
import ConsultingLeftSideBar from "./ConsultingLeftSideBar";
import ConsultingSelectButton from "./ConsultingSelectButton";
import ViewConsultingMessage from "./ViewingConsultingMessage";
import WriteConsultingMessage from "./WriteConsultingMessage";

function Consulting() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mode, setMode] = useState("selecting");

  const {
    isOpen: isUserSearchModalOpen,
    modalRef: userSearchModalRef,
    openModal: openUserSearchModal,
    closeModal: closeUserSearchModal,
  } = useModal();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const submitConsultingMessage = async () => {
    try {
      const formattedStartDate = getISODateTime(startDate);
      const formattedEndDate = getISODateTime(endDate);

      await postAPI("/consulting", {
        content: message,
        studentId: selectedUser.userId,
        consultantId: currentUser.userId,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setMessage("");
      setMode("viewing");
    } catch (err) {
      console.log(err);
    }
  };

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
  };

  return (
    <DefaultLayout>
      <Wrapper>
        <ConsultingLeftSideBar openUserSearchModal={openUserSearchModal} />
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-3/4 h-5/6 flex flex-col bg-white rounded-lg p-8">
            {selectedUser && mode === "selecting" && (
              <ConsultingSelectButton setMode={setMode} />
            )}
            {mode === "writing" && (
              <WriteConsultingMessage
                currentUser={currentUser}
                selectedUser={selectedUser}
                startDate={startDate}
                endDate={endDate}
                message={message}
                setMessage={setMessage}
                handleStartDateChange={handleStartDateChange}
                handleEndDateChange={handleEndDateChange}
                submitConsultingMessage={submitConsultingMessage}
              />
            )}
            {mode === "viewing" && (
              <ViewConsultingMessage
                currentUser={currentUser}
                selectedUser={selectedUser}
                mode={mode}
              />
            )}
            {!selectedUser && (
              <div className="w-full h-full flex justify-center items-center">
                <div>학생을 선택해주세요🙇‍♀️</div>
              </div>
            )}
          </div>
        </div>

        {isUserSearchModalOpen && (
          <UserSearchModal
            userSearchModalRef={userSearchModalRef}
            closeUserSearchModal={closeUserSearchModal}
            onUserSelect={(user) => {
              setSelectedUser(user);
              setMode("selecting");
            }}
          />
        )}
      </Wrapper>
    </DefaultLayout>
  );
}

export default Consulting;
