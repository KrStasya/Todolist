import {todolistApi, todolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootType} from "./store";



const initialState: Array<TodolistDomainType>= []

export const todolistReducer = (state: Array<TodolistDomainType>=initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(f => f.id !== action.todolistID)]
        case "ADD-TODOLIST":
            return [{...action.todolist,filter:"All"},...state]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(m => m.id === action.todolistID ? {...m, filter: action.filter} : m)]
        case "CHANGE-TODOLIST-TITLE":
            return [...state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m)]
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'All'
            }))
        }
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

//thunks
export const setTodolistTC=()=>(dispatch: Dispatch<ActionType>, getState:()=>AppRootType)=>{
    todolistApi.getTodolist()
        .then((res)=>{
            dispatch(setTodolistAC(res.data))
        })
}
export const addTodolistTC=(title:string)=> (dispatch: Dispatch<ActionType>)=>{
        todolistApi.createTodolist(title)
            .then((res)=>{
                dispatch(addTodolistAC(res.data.data.item))
            })
}
export const removeTodolistTC=(todolistId:string)=>(dispatch: Dispatch<ActionType>)=>{
        todolistApi.deleteTodolist(todolistId)
            .then((res)=>{
                dispatch(removeTodolistAC(todolistId))
            })
}
export const ChangeTodolistTitleTC=(todolistId:string,title:string,)=>(dispatch: Dispatch<ActionType>)=>{
        todolistApi.updateTodolistTitle(todolistId,title)
            .then((res)=>{
                dispatch(ChangeTodolistTitleAC(todolistId, title))
            })
}

//types
type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterType
    | ChangeTodolistTitleType
    | SetTodolistType

type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterType = ReturnType<typeof ChangeTodolistFilterAC>
type ChangeTodolistTitleType = ReturnType<typeof ChangeTodolistTitleAC>
export type SetTodolistType = ReturnType<typeof setTodolistAC>
export type TodolistDomainType=todolistType & { filter:filterType }
export type filterType = "All" | "Active" | "Complete"
