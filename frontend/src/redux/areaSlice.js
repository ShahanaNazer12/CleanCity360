import {createSlice} from "@reduxjs/toolkit"

const areaSlice = createSlice({
    name:"area",
   initialState:{
    area: []
   },
   reducers:{
    addArea :(state,action)=>{
        state.area.push(action.payload)
        // localStorage.setItem("areas", JSON.stringify(state.area)) 
    },
     setAreas: (state, action) => {
      state.area = action.payload;
      
    },
    editArea:(state,action)=>{
                const areaIndex = state.area.findIndex((ar)=>ar._id === action.payload._id)
                if(areaIndex !== -1){
                    state.area[areaIndex]= action.payload
                    //  localStorage.setItem("area", JSON.stringify(state.area))

                }
   },
   deleteArea:(state,action)=>{
    state.area.splice(action.payload,1)
    // localStorage.setItem("area", JSON.stringify(state.area))
   }


   }
})


export const {addArea,setAreas,editArea,deleteArea} = areaSlice.actions
export default areaSlice.reducer