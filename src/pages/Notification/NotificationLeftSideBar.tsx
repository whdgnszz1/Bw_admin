import { HiOutlineSpeakerphone } from "react-icons/hi";

function NotificationLeftSideBar() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <>
      <div className="h-full min-w-[320px] bg-[#161A1E]">
        <div className="w-full h-[64px] flex p-4 mb-4 items-center justify-between border-b-2 border-[#2C3238]">
          <div className="flex gap-4 items-center cursor-default">
            <img
              className="w-[40px] h-[40px] rounded-md"
              src={
                currentUser.profileUrl
                  ? currentUser.profileUrl
                  : process.env.PUBLIC_URL + "/assets/dev-jeans.png"
              }
              alt="user"
            />
            <div className="text-white">{currentUser.userName}</div>
          </div>
        </div>
        <button className="w-full h-10 flex justify-between p-4 text-white hover:bg-[#2C3238]">
          <div className="flex h-full gap-4 items-center">
            <HiOutlineSpeakerphone />
            공지사항 등록
          </div>
        </button>
      </div>
    </>
  );
}
export default NotificationLeftSideBar;
