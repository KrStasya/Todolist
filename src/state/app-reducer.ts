import { Dispatch } from "redux";
import {authAPI} from "../api/authApi";
import {setIsLoggedInAC} from "./auth-reducer.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType= null|string

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

const slice=createSlice({
    name:'app',
    initialState:initialState,
    reducers:{
        setisInitializedAC(state,action:PayloadAction<{isInitialized:boolean}>){
           state.isInitialized=action.payload.isInitialized
        },
        setAppStatusAC(state,action:PayloadAction<{status:RequestStatusType}>){
            state.status=action.payload.status
        },
        setAppErrorAC(state,action:PayloadAction<{error:null| string}>){
            state.error=action.payload.error
        }

    }
})

export const appReducer = slice.reducer
export const { setisInitializedAC, setAppStatusAC, setAppErrorAC }=slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode===0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
        }
    })
        .finally(()=>{
            dispatch(setisInitializedAC({isInitialized:true}))
        })
}
