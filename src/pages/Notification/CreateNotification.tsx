import { useState } from "react";
import { postAPI } from "../../axios";
import { Input, Button, Select } from "antd";

const { TextArea } = Input;

function CreateNotification() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [grade, setGrade] = useState(1);
  const [koreanClassName, setKoreanClassName] = useState("");
  const [englishClassName, setEnglishClassName] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        content,
        grade,
        koreanClassName,
        englishClassName,
      };
      await postAPI("/notification", payload);
      alert("공지가 등록되었습니다.");
      setTitle("");
      setContent("");
      setGrade(1);
      setKoreanClassName("");
      setEnglishClassName("");
    } catch (error) {
      console.error(error);
      alert("공지 등록에 실패했습니다.");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-3/4 h-5/6 flex flex-col bg-white rounded-lg p-8 gap-2">
        <div className="flex">
          <div className="w-[80px]">제목: </div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="flex">
          <div className="w-[80px]">내용: </div>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex">
          <div className="w-[80px]">학년: </div>
          <Select value={grade} onChange={(value) => setGrade(value)}>
            <Select.Option value={1}>1학년</Select.Option>
            <Select.Option value={2}>2학년</Select.Option>
            <Select.Option value={3}>3학년</Select.Option>
          </Select>
        </div>
        <div className="flex">
          <div className="w-[80px]">국어 반: </div>
          <Select
            value={koreanClassName}
            onChange={(value) => setKoreanClassName(value)}
          >
            <Select.Option value="">선택 안함</Select.Option>
            <Select.Option value="F">F</Select.Option>
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="B">B</Select.Option>
          </Select>
        </div>

        <div className="flex">
          <div className="w-[80px]">영어 반: </div>
          <Select
            value={englishClassName}
            onChange={(value) => setEnglishClassName(value)}
          >
            <Select.Option value="">선택 안함</Select.Option>
            <Select.Option value="F">F</Select.Option>
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="B">B</Select.Option>
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

export default CreateNotification;
