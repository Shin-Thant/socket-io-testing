import { useState } from "react";
import { createContext } from "react";

export const UsersListContext = createContext(null);

const UsersListProvider = ({ children }) => {
	const [users, setUsers] = useState([]);

	return (
		<UsersListContext.Provider value={{ users, setUsers }}>
			{children}
		</UsersListContext.Provider>
	);
};

export default UsersListProvider;
