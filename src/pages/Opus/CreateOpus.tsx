import { useState } from "react";
import { postAPI } from "../../axios";
import { message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload";

function CreateOpus() {
  const [subjectId, setSubjectId] = useState(1);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState(1);
  const [className, setClassName] = useState("F");
  const [time, setTime] = useState(1);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("subjectId", String(subjectId));
      formData.append("title", title);
      formData.append("date", date);
      formData.append("grade", String(grade));
      formData.append("className", className);
      formData.append("time", String(time));
      fileList.forEach((file: UploadFile<any>) => {
        if (file instanceof File) {
          const encodedFilename = encodeURIComponent(file.name);
          formData.append("files", file, encodedFilename);
        }
      });

      await postAPI("/opus", formData);

      resetFormAndFileList();
      message.success("강의가 등록되었습니다.");
    } catch (error) {
      console.error(error);
      message.error("강의 등록에 실패했습니다.");
    }
  };
  console.log(fileList);
  const resetFormAndFileList = () => {
    setSubjectId(1);
    setTitle("");
    setDate("");
    setGrade(1);
    setClassName("F");
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
        <div className="flex flex-col gap-2 ">
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

          <div>
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </div>
        </div>
        <button
          className="bg-blue-400 hover:bg-blue-500 w-full text-white rounded-md py-2"
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}

export default CreateOpus;
