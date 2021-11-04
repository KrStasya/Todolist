import {setAppErrorAC, setAppErrorType, setAppStatusAC, setAppStatusType} from "../state/app-reducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../api/todolist-api";


export const handleServerAppError=<T>(dispatch:Dispatch<ErrorUtilsActionsType>,data:CommonResponseType<T>)=>{
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}



export const handleServerNetworkError=(dispatch:Dispatch<ErrorUtilsActionsType>, message:string)=>{
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsActionsType= setAppStatusType | setAppErrorType