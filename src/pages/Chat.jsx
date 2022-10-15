import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import InputBar from "../components/InputBar";
import Message from "../components/Message";
import { messagesSelector } from "../features/usersSlice";
import useCurrentChat from "../hooks/useCurrentChat";

function Chat({ socket }) {
	const { userId } = useCurrentChat();
	const initialMessages = useSelector(messagesSelector);
	const [messages, setMessages] = useState([...initialMessages]);

	// filter messages
	const filteredMsgs = useMemo(() => {
		const filtered = messages
			.filter((msg) => {
				return msg.userId === userId || msg.from === userId;
			})
			.sort((a, b) => a.msg.id - b.msg.id);

		return filtered;
	}, [userId]);

	const sendMsg = useCallback(
		(msg) => {
			if (socket.connected) {
				const newMsg = { id: Date.now(), msg };

				socket.emit("send_msg", {
					userId,
					msg: newMsg,
					from: socket.userId,
				});

				setMessages((prev) => [
					...prev,
					{
						userId,
						msg: { ...newMsg, sender: true },
						from: socket.id,
					},
				]);

				filteredMsgs.push({
					userId,
					msg: { ...newMsg, sender: true },
					from: socket.id,
				});
			}
		},
		[userId]
	);

	useEffect(() => {
		const onRecieve = (msg) => {
			console.log("message recieved from", { userId, from: msg.from });

			const recievedMsg = { ...msg };
			recievedMsg.msg.sender = recievedMsg.from === socket.userId;

			setMessages((prev) => [...prev, { ...recievedMsg }]);

			// set 'sender' to 'true' if you recieve your msg
			if (msg.from === socket.userId && msg.userId === userId) {
				filteredMsgs.push({ ...recievedMsg });
			}

			// add messages when you recieve them from current selected user
			if (msg.from === userId) {
				filteredMsgs.push({ ...recievedMsg });
			}

			// notify message from others
			if (msg.from !== userId && msg.from !== socket.userId) {
				// do something
			}
		};

		socket.on("recieve_msg", onRecieve);

		return () => {
			socket.off("recieve_msg", onRecieve);
		};
	}, [userId]);

	return (
		<div className="chat">
			{filteredMsgs?.length
				? filteredMsgs?.map((m) => (
						<Message key={m.msg.id} message={m.msg} />
				  ))
				: "Start message! Start connect with others!"}

			<InputBar sendMsg={sendMsg} />
		</div>
	);
}
export default Chat;
