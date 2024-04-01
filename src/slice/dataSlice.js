import { createSlice } from "@reduxjs/toolkit"

export const dataSlice = createSlice({
    name: 'home',
    initialState:{
        data:{}
    },
    reducers: {
        getData: (state, action) =>{
            state.data = action.payload
        }
    }
})

export const {getData} = dataSlice.actions

export default dataSlice.reducer