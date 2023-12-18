import { useState } from "react";
import { postAPI } from "../../axios";

function CreateOpus() {
  const [subjectId, setSubjectId] = useState(1);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState(1);
  const [className, setClassName] = useState("F");
  const [time, setTime] = useState(1);

  const handleSubmit = async () => {
    try {
      const payload = {
        subjectId,
        title,
        date,
        grade,
        className,
        time,
      };
      await postAPI("/opus", payload);
      setSubjectId(1);
      alert("강의가 등록되었습니다.");
      setTitle("");
      setDate("");
      setGrade(1);
      setClassName("F");
      setTime(1);
    } catch (error) {
      console.error(error);
      alert("강의 등록에 실패했습니다.");
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-3/4 h-5/6 flex flex-col bg-white rounded-lg p-8 gap-2">
        <div className="flex">
          <div className="w-[80px]">과목: </div>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(Number(e.target.value))}
          >
            <option value={1}>국어</option>
            <option value={2}>영어</option>
          </select>
        </div>
        <div className="flex">
          <div className="w-[80px]">강의 이름: </div>
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
          <div className="w-[80px]">학년: </div>
          <select
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
          >
            <option value={1}>1학년</option>
            <option value={2}>2학년</option>
            <option value={3}>3학년</option>
          </select>
        </div>
        <div className="flex">
          <div className="w-[80px]">반: </div>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          >
            <option value="F">F</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
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

export default CreateOpus;
