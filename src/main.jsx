import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CurrentChatProvider from "./context/CurrentChatContext";
import UsernameProvider from "./context/UsernameContext";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UsernameProvider>
			<Provider store={store}>
				<CurrentChatProvider>
					<App />
				</CurrentChatProvider>
			</Provider>
		</UsernameProvider>
	</React.StrictMode>
);
