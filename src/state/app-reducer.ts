import { Dispatch } from "redux";
import {authAPI} from "../api/authApi";
import {setIsLoggedInAC} from "./auth-reducer.ts";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType= null|string

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return  {...state, error: action.error}
        case "APP/SET-ISINITIALIAZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode===0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    })
        .finally(()=>{
            dispatch(setisInitializedAC(true))
        })
}


export const setAppStatusAC =(status:RequestStatusType)=>({type: 'APP/SET-STATUS',status} as const)
export const setAppErrorAC=(error:null| string)=>({type: 'APP/SET-ERROR', error}as const)
export const setisInitializedAC=(isInitialized:boolean)=>({type: 'APP/SET-ISINITIALIAZED', isInitialized}as const)


export type setAppStatusType=ReturnType<typeof setAppStatusAC>
export type setAppErrorType=ReturnType<typeof setAppErrorAC>
export type setisInitializedType=ReturnType<typeof setisInitializedAC>

type ActionsType = setAppStatusType | setAppErrorType | setisInitializedType