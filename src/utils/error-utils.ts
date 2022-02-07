import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../api/todolist-api";



export const handleServerAppError=<T>(dispatch:Dispatch,data:CommonResponseType<T>)=>{
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error'}))
    }
    dispatch(setAppStatusAC({ status:'failed'}))
}



export const handleServerNetworkError=(dispatch:Dispatch, message:string)=>{
    dispatch(setAppErrorAC({error: message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

//type ErrorUtilsActionsType= setAppStatusType | setAppErrorType