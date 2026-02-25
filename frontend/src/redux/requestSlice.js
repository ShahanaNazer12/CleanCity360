import { createSlice } from "@reduxjs/toolkit"
const requestSlice = createSlice({
    name: "requestSlice",
    initialState: {
        requests: JSON.parse(localStorage.getItem("requests")) || []
        // requests:[]

    },
    reducers: {
        setRequests: (state, action) => {
            state.requests = action.payload
        },
        addUserRequest: (state, action) => {
            state.requests.push(action.payload);
            localStorage.setItem("requests", JSON.stringify(state.requests))
        },
        editRequest: (state, action) => {
            const reqIndex = state.requests.findIndex((rq) => rq._id === action.payload._id)
            if (reqIndex !== -1) {
                state.requests[reqIndex] = action.payload
                //  localStorage.setItem("area", JSON.stringify(state.area))

            }
        },
        deleteRequest: (state, action) => {
            state.requests = state.requests.filter(req=>req._id !== action.payload)
        }
    }
})

export const { setRequests, addUserRequest, editRequest,deleteRequest } = requestSlice.actions
export default requestSlice.reducer

