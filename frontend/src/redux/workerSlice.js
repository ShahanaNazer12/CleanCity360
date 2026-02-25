import { createSlice } from "@reduxjs/toolkit"


const workerSlice = createSlice({
    name: "workerSlice",
    initialState: {
        workers:  []
    },
    reducers: {
        addWorker: (state, action) => {
            state.workers.push(action.payload)
            // localStorage.setItem("workers", JSON.stringify(state.workers))


        },
        editWorker: (state, action) => {
            const index = state.workers.findIndex((worker) => worker._id === action.payload._id);

            if (index !== -1) {
                state.workers[index] = action.payload;
                // localStorage.setItem("workers", JSON.stringify(state.workers));
            }
        },
        delelWorker:(state,action)=>{
            state.workers.splice(action.payload,1)
        },
        setWorkers:(state,action)=>{
            state.workers = action.payload;
        },
        assignAreaToWorker:(state,action)=>{
             const { workerId, areaId } = action.payload;
             const worker = state.workers.find(w => w._id === workerId);
      if (worker) {
        worker.assignedArea = { _id: areaId };
      }
        }

    },

})

export const { addWorker, editWorker , delelWorker , setWorkers,assignAreaToWorker} = workerSlice.actions
export default workerSlice.reducer


