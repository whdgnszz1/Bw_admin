function WriteConsultingMessage({
  currentUser,
  selectedUser,
  startDate,
  endDate,
  message,
  setMessage,
  handleStartDateChange,
  handleEndDateChange,
  submitConsultingMessage,
}: any) {
  return (
    <>
      <div>보내는사람: {currentUser.userName}</div>
      <div>
        받는사람: 고{selectedUser.grade} {selectedUser.className}{" "}
        {selectedUser.userName}
      </div>
      <div>
        컨설팅 주차:{" "}
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
        />{" "}
        ~{" "}
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
        />
      </div>
      <textarea
        className="w-full h-40 mt-4 p-2 border rounded"
        placeholder="컨설팅 내용을 입력해주세요."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="w-24 h-10 mt-4 self-end bg-blue-500 text-white rounded p-2 hover:bg-blue-700"
        onClick={submitConsultingMessage}
      >
        보내기
      </button>
    </>
  );
}

export default WriteConsultingMessage;
