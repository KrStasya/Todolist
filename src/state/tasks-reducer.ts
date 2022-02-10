import { TaskaType} from "../AppWithRedux";
import {addTodolistTC, removeTodolistTC, setTodolistTC} from "./todolist-reducer";
import {TaskPriority, tasksApi, TaskStatus} from "../api/tasks-api";
import {  setAppStatusAC} from "./app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AppRootStateType} from "../state/store";
import {UpdateTaskModelType} from "../api/todolist-api";

 type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}

const initialState:TaskaType={}

export const setTaskTC = createAsyncThunk('tasks/setTask',
    async (todolistId:string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const response = await tasksApi.getTasks(todolistId)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolistId, tasks: response.data.items}
    }
)
export const removetaskTC = createAsyncThunk('tasks/removetask',
    async (param:{todolistID: string, taskID:string}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    await tasksApi.deleteTask(param.todolistID,param.taskID)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolistID:param.todolistID, taskID:param.taskID}
    }
)

export const addTaskTC = createAsyncThunk('tasks/addTask',
    async (param:{todolistId:string, title:string}, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await tasksApi.createTask(param.todolistId, param.title)
                    if (res.data.resultCode === 0) {
                        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                        return  res.data.data.item
                    } else {
                        handleServerAppError(thunkAPI.dispatch,res.data)
                        return thunkAPI.rejectWithValue(null)
                    }
        } catch (error:any) {
            handleServerNetworkError(thunkAPI.dispatch,error)
            return thunkAPI.rejectWithValue(null)
           /* res: AxiosError=err
                thunkAPI.dispatch(setAppErrorAC({error: res.message}))
                thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))*/
        }
    }
)

export const updateTaskTC = createAsyncThunk('tasks/updateTask',
    async (param:{todolistId: string,taskId: string, model:UpdateDomainTaskModelType}, {dispatch, rejectWithValue,getState} ) => {

        const state=getState() as AppRootStateType
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
        if(!task) {
            return rejectWithValue('task not found in the state')
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...param.model
        }

        dispatch(setAppStatusAC({status: 'loading'}))
            try {
                const res = await tasksApi.updateTask(param.todolistId, param.taskId, apiModel)
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    return param
                } else {
                    handleServerAppError(dispatch,res.data)
                    return rejectWithValue(null)
                }
            } catch (error:any) {
                handleServerNetworkError(dispatch,error)
                return rejectWithValue(error)
            }

    }
)


const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers: (builder)=> {
        builder.addCase (addTodolistTC.fulfilled,(state,action)=>{
        state[action.payload.todolist.id]=[]
        });
        builder.addCase (removeTodolistTC.fulfilled,(state,action)=>{
        delete state[action.payload.todolistID]
        });
        builder.addCase (setTodolistTC.fulfilled,(state,action)=>{
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        });
        builder.addCase (setTaskTC.fulfilled,(state,action)=>{
            state[action.payload.todolistId]=action.payload.tasks
        });
        builder.addCase (removetaskTC.fulfilled,(state,action)=>{
            const tasks=state[action.payload.todolistID];
            const index=tasks.findIndex(t=>t.id===action.payload.taskID)
            if (index>-1) {
                tasks.splice(index,1)
            }
        });
        builder.addCase (addTaskTC.fulfilled,(state,action)=>{
            state[action.payload.todoListId].unshift(action.payload)
        });
        builder.addCase (updateTaskTC.fulfilled,(state,action)=>{
            const tasks=state[action.payload.todolistId];
            const index=tasks.findIndex(t=>t.id===action.payload.taskId)
            if (index>-1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }

        });
    }
})

export const tasksReducer=slice.reducer



