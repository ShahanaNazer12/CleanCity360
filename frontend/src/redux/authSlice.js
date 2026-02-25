import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        users: JSON.parse(localStorage.getItem("users")) || [],
        isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false
    },
    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(state.user))
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))

        },
        userRegister: (state, action) => {
            state.users.push(action.payload)
            localStorage.setItem("users", JSON.stringify(state.users))
        },
        userLogout: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("user")
            localStorage.removeItem("isAuthenticated");
        },
        updateUserStatus: (state, action) => {
            const userIndex = state.users.findIndex((user) => user.id === action.payload)
            if (userIndex !== -1) {
                state.users[userIndex].status = !state.users[userIndex].status
                localStorage.setItem("users", JSON.stringify(state.users))
            }
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        setUserProfile: (state, action) => {
            state.user = action.payload;
        },
        setUsers: (state, action) => {
      state.users = action.payload;
    },



    }
})

export const { userLogin, userRegister, userLogout, updateUserStatus, updateUser ,setUserProfile, setUsers} = authSlice.actions
export default authSlice.reducer