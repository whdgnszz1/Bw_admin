import { useState } from "react";
import { postAPI } from "../../axios";

function CreateConsulting(selectedUser: any) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(1);

  const handleSubmit = async () => {
    try {
      const payload = {
        subjectId: 3,
        title,
        date,
        grade: selectedUser.selectedUser.grade,
        className: selectedUser.selectedUser.className,
        time,
        studentId: selectedUser.selectedUser.userId,
      };
      await postAPI("/opus/consulting", payload);
      alert("컨설팅 일정이 등록되었습니다.");
      setTitle("");
      setDate("");
      setTime(1);
    } catch (error) {
      console.error(error);
      alert("컨설팅 일정 등록에 실패했습니다.");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-3/4 h-5/6 flex flex-col bg-white rounded-lg p-8 gap-2">
        <div className="flex">
          <div className="w-[80px]">과목: </div>
          <div>컨설팅</div>
        </div>
        <div className="flex">
          <div className="w-[80px]">제목: </div>
          <input
            className="border-[2px] border-black rounded-md px-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex">
          <div className="w-[80px]">날짜: </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex">
          <div className="w-[80px]">이름: </div>
          <div>{selectedUser.selectedUser.userName}</div>
        </div>
        <div className="flex">
          <div className="w-[80px]">학년: </div>
          <div>{selectedUser.selectedUser.grade}</div>
        </div>
        <div className="flex">
          <div className="w-[80px]">반: </div>
          <div>{selectedUser.selectedUser.className}</div>
        </div>
        <div className="flex">
          <div className="w-[80px]">교시: </div>
          <select
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          >
            <option value={1}>1교시</option>
            <option value={2}>2교시</option>
            <option value={3}>3교시</option>
            <option value={4}>4교시</option>
          </select>
        </div>
        <button
          className="bg-blue-400 hover:bg-blue-500 w-[80px] text-white rounded-md py-2"
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}

export default CreateConsulting;
