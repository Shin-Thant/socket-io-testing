import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const useNoti = () => useContext(NotificationContext);

export default useNoti;
