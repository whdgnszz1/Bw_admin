import DefaultLayout from "../../components/layout/DefaultLayout";
import CreateNotification from "./CreateNotification";
import NotificationLeftSideBar from "./NotificationLeftSideBar";

function Notification() {
  return (
    <DefaultLayout>
      <NotificationLeftSideBar />
      <CreateNotification />
    </DefaultLayout>
  );
}

export default Notification;
