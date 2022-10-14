import React, { useState } from "react";
import { useRef } from "react";
import useCurrentChat from "../hooks/useCurrentChat";

const InputBar = ({ sendMsg }) => {
	const [msg, setMsg] = useState("");
	const { userId } = useCurrentChat();
	const inputRef = useRef(null);

	const changeHandler = (e) => {
		setMsg(e.target.value);
	};

	const submitHandler = () => {
		if (msg?.length) {
			sendMsg(msg, userId);
			setMsg("");
			inputRef.current.focus();
		}
	};

	return (
		<div className="input__container">
			<div className="input__container__box">
				<input
					ref={inputRef}
					type="text"
					value={msg}
					onChange={changeHandler}
				/>
			</div>

			<button onClick={submitHandler} className="input__container__btn">
				Send
			</button>
		</div>
	);
};

export default InputBar;
