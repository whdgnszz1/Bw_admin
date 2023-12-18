import { useState } from "react";
import { postAPI } from "../../axios";

function CreateNotification() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [grade, setGrade] = useState(1);
  const [className, setClassName] = useState("F");

  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        content,
        grade,
        className,
      };
      await postAPI("/notification", payload);
      alert("공지가 등록되었습니다.");
      setTitle("");
      setContent("");
      setGrade(1);
      setClassName("F");
    } catch (error) {
      console.error(error);
      alert("강의 등록에 실패했습니다.");
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-3/4 h-5/6 flex flex-col bg-white rounded-lg p-8 gap-2">
        <div className="flex">
          <div className="w-[80px]">제목: </div>
          <input
            className="border-[2px] border-black rounded-md px-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex">
          <div className="w-[80px]">내용: </div>
          <input
            className="border-[2px] border-black rounded-md px-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

export default CreateNotification;
