import { useContext } from "react";
import { UsernameContext } from "../context/UsernameContext";

const useUsername = () => useContext(UsernameContext);

export default useUsername;
