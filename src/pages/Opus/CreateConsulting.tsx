import { useState } from "react";
import { postAPI } from "../../axios";
import { Input, Select, Button, DatePicker } from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

function CreateConsulting({ selectedUser }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [koreanClassName, setKoreanClassName] = useState("");
  const [englishClassName, setEnglishClassName] = useState("");
  const [time, setTime] = useState(1);

  const handleSubmit = async () => {
    try {
      const payload = {
        subjectId: 3,
        title,
        content,
        date,
        grade: selectedUser.grade,
        className:
          selectedUser.subjectId === 1 ? koreanClassName : englishClassName,
        time,
        studentId: selectedUser.userId,
      };
      await postAPI("/opus/consulting", payload);
      alert("컨설팅 일정이 등록되었습니다.");
      resetForm();
    } catch (error) {
      console.error(error);
      alert("컨설팅 일정 등록에 실패했습니다.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setDate("");
    setKoreanClassName("");
    setEnglishClassName("");
    setTime(1);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-3/4 h-5/6 flex flex-col bg-white rounded-lg p-8 gap-2">
        {/* 기존 코드를 유지합니다. */}
        <div className="flex">
          <div className="w-[80px]">과목: </div>
          <div>컨설팅</div>
        </div>

        <div className="flex">
          <div className="w-[80px] mr-[6px]">제목: </div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="flex">
          <div className="w-[80px] mr-[6px]">내용: </div>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex">
          <div className="w-[80px]">날짜: </div>
          <DatePicker
            value={date ? dayjs(date) : null}
            onChange={(date, dateString) => setDate(dateString)}
          />
        </div>

        <div className="flex">
          <div className="w-[80px]">이름: </div>
          <div>{selectedUser.userName}</div>
        </div>

        <div className="flex">
          <div className="w-[80px]">반: </div>
          <Select
            value={
              selectedUser.subjectId === 1 ? koreanClassName : englishClassName
            }
            onChange={(value) =>
              selectedUser.subjectId === 1
                ? setKoreanClassName(value)
                : setEnglishClassName(value)
            }
          >
            <Option value="">선택 안함</Option>
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="F">F</Option>
          </Select>
        </div>

        {/* 나머지 코드는 유지됩니다. */}
        <div className="flex">
          <div className="w-[80px]">교시: </div>
          <Select value={time} onChange={(value) => setTime(value)}>
            <Option value={1}>1교시</Option>
            <Option value={2}>2교시</Option>
            <Option value={3}>3교시</Option>
            <Option value={4}>4교시</Option>
          </Select>
        </div>

        <Button
          type="default"
          className="bg-blue-400 text-white hover:text-white"
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}

export default CreateConsulting;
