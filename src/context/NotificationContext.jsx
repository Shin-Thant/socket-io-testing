import React, { useState } from "react";
import { useCallback } from "react";
import { createContext } from "react";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
	// [ {userId: "", count: 0}, ...]
	const [noti, setNoti] = useState([]);

	// const addNoti = useCallback((userId) => {
	// 	setNoti((prev) => {
	// 		const foundNoti = prev.find((noti) => noti.userId === userId);

	// 		if (!!foundNoti) {
	// 			// update noti count
	// 			return [
	// 				...prev.filter((noti) => noti.userId !== userId),
	// 				foundNoti,
	// 			];
	// 		}

	// 		return [...prev, { userId, count: 1 }];
	// 	});
	// }, []);

	// const removeNoti = useCallback((userId) => {
	// 	setNoti((prev) => {
	// 		return [...prev.filter((noti) => noti.userId !== userId)];
	// 	});
	// }, []);

	return (
		<NotificationContext.Provider value={{ noti }}>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
