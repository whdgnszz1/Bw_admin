import Cookies from "js-cookie";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Consulting from "../pages/Consulting/Consulting";
import LinkPage from "../pages/Link/Link";
import Notification from "../pages/Notification/Notification";
import Opus from "../pages/Opus/Opus";
import Schedule from "../pages/Schedule/Schedule";
import SignIn from "../pages/SignIn";
import { isLoggedInState } from "../states/userState";

const Router = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    const kakaoToken = Cookies.get("kakao_token");
    const accessToken = Cookies.get("accessToken");
    const googleToken = Cookies.get("google_token");

    if (kakaoToken || accessToken || googleToken) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("user");
    }
  }, [setIsLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/opus" element={<Opus />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/link" element={<LinkPage />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
