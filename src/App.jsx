import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import NotificationProvider from "./context/NotificationContext";
import UsersListProvider from "./context/UsersListContext";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/start",
			element: <Welcome />,
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
