import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import areaReducer from "./areaSlice"
import workerReducer from "./workerSlice"
import requestReducer from "./requestSlice" 

const store = configureStore({
    reducer:{
        auth :authReducer,
        area :areaReducer,
        workers:workerReducer,
        requests:requestReducer

    }
})

export default store