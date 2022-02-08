import { TaskaType} from "../AppWithRedux";
import {addTodolistAC, removeTodolistAC, setTodolistAC} from "./todolist-reducer";
import {changeModel, tasksApi} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootType} from "./store";
import {  setAppStatusAC} from "./app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import { UpdateTaskModelType } from "../api/todolist-api";


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
                        return {task: res.data.data.item}
                    } else {
                        handleServerAppError(thunkAPI.dispatch,res.data)
                        return
                    }
        } catch (err) {
            //handleServerNetworkError(thunkAPI.dispatch,res.message)
           /* res: AxiosError=err
                thunkAPI.dispatch(setAppErrorAC({error: res.message}))
                thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))*/
        }
    }
)

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        ChangeTaskAC (state,action:PayloadAction<{ todolistID: string,taskID:string, model:changeModel}>) {
            const tasks=state[action.payload.todolistID];
            const index=tasks.findIndex(t=>t.id===action.payload.taskID)
            if (index>-1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
    },
    extraReducers: (builder)=> {
        builder.addCase (addTodolistAC,(state,action)=>{
        state[action.payload.todolist.id]=[]
        });
        builder.addCase (removeTodolistAC,(state,action)=>{
        delete state[action.payload.todolistID]
        });
        builder.addCase (setTodolistAC,(state,action)=>{
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
            if (action.payload?.task.todoListId)
            state[action.payload.task.todoListId].unshift(action.payload.task)
        });
    }
})

export const tasksReducer=slice.reducer
export const {ChangeTaskAC}=slice.actions

//thunks
export const updateTaskTC = (todolistId: string,taskId: string, model:changeModel) => (dispatch: Dispatch, getState: () =>AppRootType) => {
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })
    if(!task) {
        console.warn('task not found in the state')
        return
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...model
    }

    if (task) {
        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(ChangeTaskAC({todolistID: todolistId, taskID: taskId, model}))
                } else {
                    handleServerAppError( dispatch,res.data)
                }
            })
            .catch((error) => {
                    handleServerNetworkError(dispatch,error)
                })
        }
}


