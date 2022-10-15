import React from "react";
import useCurrentChat from "../hooks/useCurrentChat";

const UserTab = ({ user }) => {
	const { userId, setUserId } = useCurrentChat();

	const setCurrentChat = () => {
		setUserId(user?.userId);
	};

	return (
		<div
			className={`userTab ${userId === user.userId && "userTab--active"}`}
			onClick={setCurrentChat}
		>
			<h2 className="userTab__username">{user.username}</h2>
			<div
				className={`userTab__status ${
					user?.active ? "userTab__status--online" : ""
				}`}
			>
				<span className="userTab__status__indicator"></span>
				{user?.active ? "online" : "offline"}
			</div>

			{/* <h4>{user?.recieved || 0}</h4> */}
		</div>
	);
};

export default UserTab;
