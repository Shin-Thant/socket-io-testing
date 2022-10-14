import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsername from "../hooks/useUsername";

const Welcome = () => {
	const { setUsername } = useUsername();
	const [name, setName] = useState("");
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();

		setUsername(name);
		navigate("..", { replace: true });
	};

	return (
		<div className="welcome">
			<form onSubmit={submitHandler} className="form">
				<input
					type="text"
					className="form__input"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoFocus
					required
				/>

				<button type="submit" className="form__btn">
					Create Username
				</button>
			</form>
		</div>
	);
};

export default Welcome;
