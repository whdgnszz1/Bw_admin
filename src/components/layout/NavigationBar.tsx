import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  // const logout = async () => {
  //   await postAPI("/api/logout", {});
  // };

  return (
    <>
      <nav className="w-full h-16 py-3 pl-1 pr-4 flex justify-between bg-[#1D2125] z-10 ">
        <div className="flex gap-8 cursor-pointer">
          <div
            onClick={() => navigate("/schedule")}
            className="flex h-full justify-center items-center text-white"
          >
            <img
              className="w-[60px] h-[60px]"
              src={process.env.PUBLIC_URL + "/assets/bluewhalelink.png"}
              alt="logo"
            />
          </div>
          <button
            className={`flex h-full justify-center items-center px-4 rounded-lg relative ${
              isActive("/schedule") ? "bg-blue-300 text-black" : "text-white"
            }`}
            onClick={() => navigate("/schedule")}
          >
            Schedule
          </button>
          <button
            className={`flex h-full justify-center items-center px-4 rounded-lg relative ${
              isActive("/opus") ? "bg-blue-300 text-black" : "text-white"
            }`}
            onClick={() => navigate("/opus")}
          >
            OPUS
          </button>
          <button
            className={`flex h-full justify-center items-center px-4 rounded-lg relative ${
              isActive("/consulting") ? "bg-blue-300 text-black" : "text-white"
            }`}
            onClick={() => navigate("/consulting")}
          >
            Consulting
          </button>
          <button
            className={`flex h-full justify-center items-center px-4 rounded-lg relative ${
              isActive("/link") ? "bg-blue-300 text-black" : "text-white"
            }`}
            onClick={() => navigate("/link")}
          >
            LINK
          </button>
          <button
            className={`flex h-full justify-center items-center px-4 rounded-lg relative ${
              isActive("/notification")
                ? "bg-blue-300 text-black"
                : "text-white"
            }`}
            onClick={() => navigate("/notification")}
          >
            Notification
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
