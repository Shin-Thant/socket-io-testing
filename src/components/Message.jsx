import React from "react";

const Message = ({ message }) => {
	return (
		<div className={`msg-container ${message?.sender ? "sender" : ""} `}>
			<div className="msg">{message.msg}</div>
		</div>
	);
};

export default Message;
