import { useState } from "react";
import { postAPI } from "../../axios";
import { message, Input, Button, Select, Upload, UploadFile } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

function CreateOpus() {
  const [subjectId, setSubjectId] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState(1);
  const [koreanClassName, setKoreanClassName] = useState("");
  const [englishClassName, setEnglishClassName] = useState("");
  const [time, setTime] = useState(1);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("subjectId", String(subjectId));
      formData.append("title", title);
      formData.append("content", content);
      formData.append("date", date);
      formData.append("grade", String(grade));
      formData.append(
        subjectId === 1 ? "koreanClassName" : "englishClassName",
        subjectId === 1 ? koreanClassName : englishClassName
      );
      formData.append("time", String(time));
      fileList.forEach((file: UploadFile<any>) => {
        if (file instanceof File) {
          const encodedFilename = encodeURIComponent(file.name);
          formData.append("files", file, encodedFilename);
        }
      });

      await postAPI("/opus", formData);

      resetForm();
      message.success("강의가 등록되었습니다.");
    } catch (error) {
      console.error(error);
      message.error("강의 등록에 실패했습니다.");
    }
  };

  const resetForm = () => {
    setSubjectId(1);
    setTitle("");
    setDate("");
    setGrade(1);
    setKoreanClassName("");
    setEnglishClassName("");
    setTime(1);
    setFileList([]);
  };

  const draggerProps = {
    multiple: true,
    onRemove: (file: UploadFile<any>) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: UploadFile<any>, files: UploadFile<any>[]) => {
      setFileList([...fileList, ...files]);
      return false;
    },
    fileList,
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-3/4 h-5/6 flex flex-col justify-between bg-white rounded-lg p-8">
        <div className="flex flex-col gap-2">
          <div className="flex">
            <div className="w-[80px]">과목: </div>
            <Select value={subjectId} onChange={(value) => setSubjectId(value)}>
              <Option value={1}>국어</Option>
              <Option value={2}>영어</Option>
            </Select>
          </div>

          <div className="flex">
            <div className="w-[80px] mr-[6px]">강의 이름: </div>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="flex">
            <div className="w-[80px] mr-[6px]">추가 내용: </div>
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex">
            <div className="w-[80px] mr-[6px]">날짜: </div>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex">
            <div className="w-[80px]">학년: </div>
            <Select value={grade} onChange={(value) => setGrade(value)}>
              <Option value={1}>1학년</Option>
              <Option value={2}>2학년</Option>
              <Option value={3}>3학년</Option>
            </Select>
          </div>

          <div className="flex">
            <div className="w-[80px]">반: </div>
            <Select
              value={subjectId === 1 ? koreanClassName : englishClassName}
              onChange={(value) =>
                subjectId === 1
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

          <div className="flex">
            <div className="w-[80px]">교시: </div>
            <Select value={time} onChange={(value) => setTime(value)}>
              <Option value={1}>1교시</Option>
              <Option value={2}>2교시</Option>
              <Option value={3}>3교시</Option>
              <Option value={4}>4교시</Option>
            </Select>
          </div>

          <Dragger {...draggerProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
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

export default CreateOpus;
