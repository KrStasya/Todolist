
import { setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {authAPI, LoginParamsType} from "../api/authApi";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import {fieldsErrorsT} from "../api/todolist-api";


export const loginTC = createAsyncThunk<undefined, LoginParamsType,{
    rejectValue:{errors:Array<string>, fieldsErrors?:Array<fieldsErrorsT>}
}>('auth/login', async (data: LoginParamsType,thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    const res=await authAPI.login(data)
    try {
        if (res.data.resultCode===0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(thunkAPI.dispatch,res.data)
            return thunkAPI.rejectWithValue({errors:res.data.messages,fieldsErrors:res.data.fieldsErrors})
        }
    }
    catch (err:any) {
        const error:AxiosError=err;
        handleServerNetworkError(thunkAPI.dispatch,res.data.messages[0])
        return thunkAPI.rejectWithValue({errors:[error.message],fieldsErrors:undefined})
    }
})

export const logoutTC=createAsyncThunk('auth/logout',async (param,thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
   const res= await authAPI.logout()
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(thunkAPI.dispatch,res.data)
            return thunkAPI.rejectWithValue({})
        }
    }
    catch (error) {
        handleServerNetworkError(thunkAPI.dispatch,res.data.messages[0])
        return thunkAPI.rejectWithValue({})
    }
})

 const slice = createSlice({
    name: 'auth',
    initialState:{
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC (state,action:PayloadAction<{ value:boolean }>) {
    state.isLoggedIn=action.payload.value
    }
    },
     extraReducers: (builder) => {
         builder.addCase (loginTC.fulfilled,(state)=>{
                 state.isLoggedIn = true
         });
         builder.addCase (logoutTC.fulfilled,(state)=>{
             state.isLoggedIn = false
         });
     }
})

export const authReducer=slice.reducer
export const {setIsLoggedInAC}=slice.actions


