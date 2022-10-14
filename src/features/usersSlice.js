import { createSlice } from "@reduxjs/toolkit";

// todo: optimize the 'userId' state by moving into the usersSlice

const initialState = {
	users: [],
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		getUsersList: (state, action) => {
			const { allUsers, userId } = action.payload;

			const userList = allUsers
				.filter((user) => user.userId !== userId)
				.sort((a, b) => a.username.localeCompare(b.username));

			return {
				users: userList,
			};
		},
		onUserConnected: (state, action) => {
			const { newUser } = action.payload;

			const foundUser = state.users.find(
				(u) => u.userId === newUser.userId
			);

			if (!foundUser) {
				// add new user
				state.users.push({ ...newUser });
			} else {
				// update user's active status
				state.users.forEach((user) => {
					if (user.userId === newUser.userId) {
						user.active = true;
					}
				});
			}
		},
		onUserDisconnected: (state, action) => {
			const { userId } = action.payload;

			state.users.forEach((user) => {
				if (user.userId === userId) {
					user.active = false;
				}
			});
		},
	},
});

export const usersSelector = (state) => state.users.users;

export default usersSlice.reducer;
export const { getUsersList, onUserConnected, onUserDisconnected } =
	usersSlice.actions;
