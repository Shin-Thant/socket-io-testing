import io from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";
import InputBar from "../components/InputBar";
import { useCallback } from "react";
import Message from "../components/Message";
import { useRef } from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import useUsername from "../hooks/useUsername";
import useCurrentChat from "../hooks/useCurrentChat";
import ChatIntro from "../components/ChatIntro";
import { useDispatch, useSelector } from "react-redux";
import {
	getUsersList,
	onUserConnected,
	onUserDisconnected,
	usersSelector,
} from "../features/usersSlice";

const socket = io("http://localhost:3500", { autoConnect: false });

function Home() {
	const { username } = useUsername();
	const { userId } = useCurrentChat();
	const usersList = useSelector(usersSelector);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// connecting to socket
	useEffect(() => {
		let isMounted = true;
		const sessionId = localStorage.getItem("sessionId");

		if (!username?.length && !sessionId?.length) {
			navigate("start", { replace: true });
		}
		// connect to socket
		if (isMounted && (username?.length > 0 || sessionId?.length > 0)) {
			const auth = {};

			if (sessionId?.length) {
				auth.sessionId = sessionId;
			}

			auth.username = username;
			socket.auth = { ...auth };
			socket.connect();
		}

		return () => {
			isMounted = false;
		};
	}, []);

	// events and handlers
	useEffect(() => {
		const onConnect = () => {
			console.log(
				`You are ${socket.connected ? "connected!" : "not connected!"}`
			);
		};

		const getSession = ({ username, sessionId, userId }) => {
			console.log({ sessionId, userId });

			socket.auth = { sessionId };

			localStorage.setItem("sessionId", sessionId);
			socket.userId = userId;

			// setting document's title
			document.title = username;
		};

		const onError = (err) => {
			console.error(err);
		};

		const handleInitialUser = (allUsers) => {
			dispatch(getUsersList({ allUsers, userId: socket.userId }));
		};

		const handleNewUser = (newUser) => {
			if (newUser.userId !== socket.userId) {
				dispatch(onUserConnected({ newUser }));
			}
		};

		const handleDisconnectedUser = (userId) => {
			dispatch(onUserDisconnected({ userId }));
		};

		socket.on("connect", onConnect);

		socket.on("session", getSession);

		socket.on("user_list", handleInitialUser);

		socket.on("new_user", handleNewUser);

		socket.on("user_disconnected", handleDisconnectedUser);

		// error handling
		socket.on("connect_error", onError);

		return () => {
			console.log("clean up");
			socket.off("connect", onConnect);
			socket.off("session", getSession);
			socket.off("user_list", handleInitialUser);
			socket.off("new_user", handleNewUser);
			socket.off("user_disconnected", handleDisconnectedUser);
			socket.off("connect_error", onError);
		};
	}, []);

	return (
		<div className="app">
			<SideBar />

			{!usersList?.length ? (
				"Waiting for other users"
			) : !userId ? (
				"be the first one who message"
			) : (
				<Chat socket={socket} />
			)}
		</div>
	);
}

export default Home;
