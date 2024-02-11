import { useState } from "react";
import { useGetConsultingList } from "../../api/Consulting/hooks/useGetConsultingList";
import { ConsultingDTO } from "../../api/Consulting";

function ViewConsultingMessage({ selectedUser, mode }: any) {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const { data: consultingMessages = [] } = useGetConsultingList<ConsultingDTO>(
    selectedUser?.userId,
    {
      enabled: mode === "viewing" && !!selectedUser,
    }
  );

  return (
    <div>
      {selectedMessage ? (
        <>
          <div className="flex justify-between">
            <p> 보내는사람: {selectedMessage.consultant}</p>
            <button onClick={() => setSelectedMessage(null)}>x</button>
          </div>
          <div>
            받는사람: 고{selectedMessage.grade} {selectedMessage.className}{" "}
            {selectedMessage.student}
          </div>
          <div>
            컨설팅 주차: {selectedMessage.startDate.split("T")[0]} ~{" "}
            {selectedMessage.endDate.split("T")[0]}
          </div>
          <div>작성 일자: {selectedMessage.createdAt.split("T")[0]}</div>
          <div className="bg-[#F1F1EF] mt-2 h-96 p-2 rounded-md shadow-sm overflow-auto">
            {selectedMessage.content}
          </div>
        </>
      ) : (
        <>
          <div className="flex mb-2">
            <div className="flex flex-1 justify-center">주차</div>
            <div className="flex flex-1 justify-center">작성일자</div>
            <div className="flex flex-1 justify-center">컨설턴트</div>
          </div>

          <div className="w-full h-full flex flex-col gap-2">
            {consultingMessages &&
              consultingMessages.map((message: any) => (
                <button
                  key={message.consultingId}
                  className="flex justify-around"
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex flex-1 justify-center">
                    {message.startDate.split("T")[0]} ~{" "}
                    {message.endDate.split("T")[0]}
                  </div>
                  <div className="flex flex-1 justify-center">
                    {message.createdAt.split("T")[0]}
                  </div>
                  <div className="flex flex-1 justify-center">
                    {message.consultant}
                  </div>
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewConsultingMessage;
