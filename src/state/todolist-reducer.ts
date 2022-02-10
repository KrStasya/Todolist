import {todolistApi, todolistType} from "../api/todolist-api";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";



export const setTodolistTC = createAsyncThunk('todolist/setTodolist',async (param,{dispatch,rejectWithValue})=>{
    dispatch(setAppStatusAC({status: 'loading'}))
    const res=await todolistApi.getTodolist()
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    }
   catch (error:any) {
       handleServerAppError(dispatch,error)
       return rejectWithValue(null)

   }
})

export const addTodolistTC=createAsyncThunk('todolist/addTodolist',async (title:string,{dispatch,rejectWithValue})=>{
    dispatch(setAppStatusAC({status: 'loading'}))
    const res=await todolistApi.createTodolist(title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(dispatch,res.data)
            return rejectWithValue(null)
        }
    }
    catch (error){
        handleServerNetworkError(dispatch,res.data.messages[0])
        return rejectWithValue(null)
    }
})

export const removeTodolistTC=createAsyncThunk('todolist/removeTodolist',async (todolistId:string,{dispatch})=>{
    dispatch(changeTodolistEntityStatusAC({id:todolistId, entityStatus:'loading'}))
    dispatch(setAppStatusAC({status: 'loading'}))
    await todolistApi.deleteTodolist(todolistId)
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolistID:todolistId}
})

export const ChangeTodolistTitleTC=createAsyncThunk('todolist/ChangeTodolistTitle', async (param: {todolistId:string,title:string},{dispatch})=>{
    dispatch(setAppStatusAC({status: 'loading'}))
    await todolistApi.updateTodolistTitle(param.todolistId,param.title)
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolistID:param.todolistId, title:param.title}
})

const slice = createSlice({
    name: 'todolist',
    initialState:[] as Array<TodolistDomainType>,
    reducers: {
        ChangeTodolistFilterAC (state,action:PayloadAction<{todolistID: string, filter: filterType}>) {
            const index=state.findIndex(f => f.id === action.payload.todolistID)
            state[index].filter=action.payload.filter
        },
        changeTodolistEntityStatusAC (state,action:PayloadAction<{id: string, entityStatus: RequestStatusType}>) {
            const index=state.findIndex(f => f.id === action.payload.id)
            state[index].entityStatus=action.payload.entityStatus
        }
    },
    extraReducers: builder => {
        builder.addCase (setTodolistTC.fulfilled,(state,action)=>{
          return  action.payload.todolists.map(tl => ({...tl, filter: 'All', entityStatus:"idle"}))
        });
        builder.addCase (addTodolistTC.fulfilled,(state,action)=>{
            state.unshift({...action.payload.todolist,filter:"All", entityStatus:"idle"})
        });
        builder.addCase (removeTodolistTC.fulfilled,(state,action)=>{
            const index=state.findIndex(f => f.id === action.payload.todolistID)
            if (index>-1) {
                state.splice(index,1)
            }
        });
        builder.addCase (ChangeTodolistTitleTC.fulfilled,(state,action)=>{
            const index=state.findIndex(f => f.id === action.payload.todolistID)
            state[index].title=action.payload.title
        });
    }

})

export const todolistReducer=slice.reducer
export const {ChangeTodolistFilterAC,changeTodolistEntityStatusAC}=slice.actions

//thunks
/*export const _setTodolistTC=()=>(dispatch: Dispatch, getState:()=>AppRootType)=>{
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistApi.getTodolist()
        .then((res)=>{
            dispatch(setTodolistAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}*/
/*export const _addTodolistTC=(title:string)=> (dispatch: Dispatch)=>{
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
}*/
/*export const _removeTodolistTC=(todolistId:string)=>(dispatch: Dispatch)=>{
    dispatch(changeTodolistEntityStatusAC({id:todolistId, entityStatus:'loading'}))
    dispatch(setAppStatusAC({status: 'loading'}))
        todolistApi.deleteTodolist(todolistId)
            .then((res)=>{
                dispatch(removeTodolistAC({todolistID:todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
}*/
// export const __ChangeTodolistTitleTC=(todolistId:string,title:string,)=>(dispatch: Dispatch)=>{
//     dispatch(setAppStatusAC({status: 'loading'}))
//         todolistApi.updateTodolistTitle(todolistId,title)
//             .then((res)=>{
//                 dispatch(ChangeTodolistTitleAC({todolistID:todolistId, title:title}))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             })
// }


export type TodolistDomainType=todolistType & {
    filter:filterType
    entityStatus: RequestStatusType
}
export type filterType = "All" | "Active" | "Complete"
