import {todolistApi, todolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootType} from "./store";
import {RequestStatusType, setAppErrorAC, setAppErrorType, setAppStatusAC, setAppStatusType} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";



const initialState: Array<TodolistDomainType>= []

export const todolistReducer = (state: Array<TodolistDomainType>=initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(f => f.id !== action.todolistID)]
        case "ADD-TODOLIST":
            debugger
            return [{...action.todolist,filter:"All", entityStatus:"idle"},...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(m => m.id === action.todolistID ? {...m, filter: action.filter} : m)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'All', entityStatus:"idle"
            }))
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return  state.map(f => f.id === action.id ? {...f, entityStatus: action.entityStatus} : f)
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', todolistID} as const
}
export const addTodolistAC = (todolist: todolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const ChangeTodolistFilterAC = (todolistID: string, filter: filterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistID, filter} as const
}
export const ChangeTodolistTitleAC = (todolistID: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistID, title} as const
}
export const setTodolistAC=(todolists: Array<todolistType>)=>{
    return {type: 'SET-TODOLISTS',todolists} as const
}
export const changeTodolistEntityStatusAC=(id: string, entityStatus: RequestStatusType)=>{
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS',id,entityStatus} as const
}

//thunks
export const setTodolistTC=()=>(dispatch: Dispatch<ActionType>, getState:()=>AppRootType)=>{
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTodolist()
        .then((res)=>{
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodolistTC=(title:string)=> (dispatch: Dispatch<ActionType>)=>{
    dispatch(setAppStatusAC('loading'))
        todolistApi.createTodolist(title)
            .then((res)=> {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch,res.data)
            }
            })
            .catch((res:AxiosError)=>{
                handleServerNetworkError(dispatch,res.message)

            })
}
export const removeTodolistTC=(todolistId:string)=>(dispatch: Dispatch<ActionType>)=>{
    dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
    dispatch(setAppStatusAC('loading'))
        todolistApi.deleteTodolist(todolistId)
            .then((res)=>{
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
}
export const ChangeTodolistTitleTC=(todolistId:string,title:string,)=>(dispatch: Dispatch<ActionType>)=>{
    dispatch(setAppStatusAC('loading'))
        todolistApi.updateTodolistTitle(todolistId,title)
            .then((res)=>{
                dispatch(ChangeTodolistTitleAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
            })
}

//types
type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterType
    | ChangeTodolistTitleType
    | SetTodolistType
    | setAppStatusType
    | setAppErrorType
    | changeTodolistEntityStatusType

type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterType = ReturnType<typeof ChangeTodolistFilterAC>
type ChangeTodolistTitleType = ReturnType<typeof ChangeTodolistTitleAC>
type changeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
export type SetTodolistType = ReturnType<typeof setTodolistAC>
export type TodolistDomainType=todolistType & {
    filter:filterType
    entityStatus: RequestStatusType
}
export type filterType = "All" | "Active" | "Complete"
