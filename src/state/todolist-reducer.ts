import {todolistApi, todolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootType} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState: Array<TodolistDomainType>= []

const slice = createSlice({
    name: 'todolist',
    initialState:initialState,
    reducers: {
        removeTodolistAC  (state,action:PayloadAction<{ todolistID:string}>) {
            const index=state.findIndex(f => f.id === action.payload.todolistID)
            if (index>-1) {
                state.splice(index,1)
            }
        },
        addTodolistAC (state,action:PayloadAction<{ todolist: todolistType}>) {
            state.unshift({...action.payload.todolist,filter:"All", entityStatus:"idle"})
        },
        ChangeTodolistFilterAC (state,action:PayloadAction<{todolistID: string, filter: filterType}>) {
            const index=state.findIndex(f => f.id === action.payload.todolistID)
            state[index].filter=action.payload.filter
        },
        ChangeTodolistTitleAC (state,action:PayloadAction<{todolistID: string, title: string}>) {
            const index=state.findIndex(f => f.id === action.payload.todolistID)
            state[index].title=action.payload.title
        },
        setTodolistAC (state,action:PayloadAction<{todolists: Array<todolistType>}>) {
          return  action.payload.todolists.map(tl => ({...tl, filter: 'All', entityStatus:"idle"}))
        },
        changeTodolistEntityStatusAC (state,action:PayloadAction<{id: string, entityStatus: RequestStatusType}>) {
            const index=state.findIndex(f => f.id === action.payload.id)
            state[index].entityStatus=action.payload.entityStatus
        }
    }
})

export const todolistReducer=slice.reducer
export const {removeTodolistAC,addTodolistAC,ChangeTodolistFilterAC,ChangeTodolistTitleAC,setTodolistAC,changeTodolistEntityStatusAC}=slice.actions

//thunks
export const setTodolistTC=()=>(dispatch: Dispatch, getState:()=>AppRootType)=>{
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistApi.getTodolist()
        .then((res)=>{
            dispatch(setTodolistAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const addTodolistTC=(title:string)=> (dispatch: Dispatch)=>{
    dispatch(setAppStatusAC({status: 'loading'}))
        todolistApi.createTodolist(title)
            .then((res)=> {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(dispatch,res.data)
            }
            })
            .catch((res:AxiosError)=>{
                handleServerNetworkError(dispatch,res.message)

            })
}
export const removeTodolistTC=(todolistId:string)=>(dispatch: Dispatch)=>{
    dispatch(changeTodolistEntityStatusAC({id:todolistId, entityStatus:'loading'}))
    dispatch(setAppStatusAC({status: 'loading'}))
        todolistApi.deleteTodolist(todolistId)
            .then((res)=>{
                dispatch(removeTodolistAC({todolistID:todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
}
export const ChangeTodolistTitleTC=(todolistId:string,title:string,)=>(dispatch: Dispatch)=>{
    dispatch(setAppStatusAC({status: 'loading'}))
        todolistApi.updateTodolistTitle(todolistId,title)
            .then((res)=>{
                dispatch(ChangeTodolistTitleAC({todolistID:todolistId, title:title}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
}

//types
/*type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterType
    | ChangeTodolistTitleType
    | SetTodolistType
    | changeTodolistEntityStatusType*/

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
