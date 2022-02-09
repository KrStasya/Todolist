import {authAPI} from "../api/authApi";
import {setIsLoggedInAC} from "../state/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType= null|string

export const initializeAppTC=createAsyncThunk('app/initialize', async (param,thunkAPI)=>{
    const res = await authAPI.me()
        if (res.data.resultCode===0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}));
        } else {
        }
        return
})


const slice=createSlice({
    name:'app',
    initialState:{
        status: 'idle' as RequestStatusType,
        error: null as null | string,
        isInitialized: false
    },
    reducers:{
        setAppStatusAC(state,action:PayloadAction<{status:RequestStatusType}>){
            state.status=action.payload.status
        },
        setAppErrorAC(state,action:PayloadAction<{error:null| string}>){
            state.error=action.payload.error
        },
    },
    extraReducers: builder=>{
        builder.addCase (initializeAppTC.fulfilled,(state,action)=>{
            state.isInitialized=true
            })
        }
})

export const appReducer = slice.reducer
export const { setAppStatusAC, setAppErrorAC }=slice.actions

