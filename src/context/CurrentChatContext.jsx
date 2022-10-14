import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const CurrentChatContext = createContext();

const CurrentChatProvider = ({ children }) => {
	const [userId, setUserId] = useState("");

	return (
		<CurrentChatContext.Provider value={{ userId, setUserId }}>
			{children}
		</CurrentChatContext.Provider>
	);
};

export default CurrentChatProvider;
