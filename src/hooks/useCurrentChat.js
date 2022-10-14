import { useContext } from "react";
import { CurrentChatContext } from "../context/CurrentChatContext";

const useCurrentChat = () => useContext(CurrentChatContext);

export default useCurrentChat;
