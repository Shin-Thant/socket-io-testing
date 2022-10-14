import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UserTab from "../components/UserTab";
import { usersSelector } from "../features/usersSlice";
import useCurrentChat from "../hooks/useCurrentChat";

const SideBar = () => {
	const users = useSelector(usersSelector);
	const { setUserId } = useCurrentChat();

	useEffect(() => {
		let isMounted = true;

		if (isMounted && !!users?.length) {
			// console.log("auto select");
			setUserId(users[0].userId);
		}

		return () => {
			isMounted = false;
		};
	}, [users?.length]);

	return (
		<div className="sidebar">
			{users?.length
				? users?.map((user) => (
						<UserTab key={user.userId} user={user} />
				  ))
				: "Wait for your friends active..."}
		</div>
	);
};

export default SideBar;
