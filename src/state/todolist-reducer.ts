import {todolistApi, todolistType} from "../api/todolist-api";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {AppRootType} from "./store";
import {tasksApi} from "../api/tasks-api";
import {addTaskAC} from "./tasks-reducer";

type ActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistFilterType |
    ChangeTodolistTitleType|
    SetTodolistType

type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterType = ReturnType<typeof ChangeTodolistFilterAC>
type ChangeTodolistTitleType = ReturnType<typeof ChangeTodolistTitleAC>
export type SetTodolistType = ReturnType<typeof setTodolistAC>

export let todolistID1=v1()
export let todolistID2=v1()
export type filterType = "All" | "Active" | "Complete"
const initialState: Array<TodolistDomainType>= []
export type TodolistDomainType=todolistType & {
    filter:filterType
}

export const todolistReducer = (state: Array<TodolistDomainType>=initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(f => f.id !== action.todolistID)]
        case "ADD-TODOLIST":
            const newTodolist:TodolistDomainType={...action.todolist,filter:"All"}
            return [newTodolist,...state]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(m => m.id === action.todolistID ? {...m, filter: action.filter} : m)]
        case "CHANGE-TODOLIST-TITLE":
            return [...state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m)]
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'All'
            }))
        }

        default:
            return state
    }
}


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

export const setTodolistTC=()=>(dispatch: Dispatch, getState:()=>AppRootType)=>{
    todolistApi.getTodolist()
        .then((res)=>{
            dispatch(setTodolistAC(res.data))
        })
}

export const addTodolistTC=(title:string)=>{
    return (dispatch: Dispatch)=>{
        todolistApi.createTodolist(title)
            .then((res)=>{
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const removeTodolistTC=(todolistId:string)=>{
    return (dispatch: Dispatch)=>{
        todolistApi.deleteTodolist(todolistId)
            .then((res)=>{
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const ChangeTodolistTitleTC=(todolistId:string,title:string,)=>{
    return (dispatch: Dispatch)=>{
        todolistApi.updateTodolistTitle(todolistId,title)
            .then((res)=>{
                dispatch(ChangeTodolistTitleAC(todolistId, title))
            })
    }
}