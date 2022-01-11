import { TaskaType} from "../AppWithRedux";
import {addTodolistAC, filterType, removeTodolistAC, setTodolistAC} from "./todolist-reducer";
import {changeModel, tasksApi, TaskStatus, tasksType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootType} from "./store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState:TaskaType={}


const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removetaskAC  (state,action:PayloadAction<{ todolistID: string, taskID:string}>) {
           const tasks=state[action.payload.todolistID];
           const index=tasks.findIndex(t=>t.id===action.payload.taskID)
            if (index>-1) {
                tasks.splice(index,1)
            }
        },
        addTaskAC(state,action:PayloadAction<{task: tasksType}>){
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        ChangeTaskStatysAC (state,action:PayloadAction<{ todolistID: string,taskID:string, status: TaskStatus}>) {
            const tasks=state[action.payload.todolistID];
            const index=tasks.findIndex(t=>t.id===action.payload.taskID)
            if (index>-1) {
                tasks[index].status=action.payload.status
            }
        },
        ChangeTaskTitleAC (state,action:PayloadAction<{ todolistID: string, taskID:string, title: string}>) {
            const tasks=state[action.payload.todolistID];
            const index=tasks.findIndex(t=>t.id===action.payload.taskID)
            if (index>-1) {
                tasks[index].title=action.payload.title
            }
        },
        setTasksAC (state,action:PayloadAction<{ todolistId:string,tasks:Array<tasksType>}>) {
            state[action.payload.todolistId]=action.payload.tasks
        }
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

    }
})

export const tasksReducer=slice.reducer
export const {removetaskAC,addTaskAC,ChangeTaskStatysAC,ChangeTaskTitleAC,setTasksAC}=slice.actions

//thunks
export const setTaskTC=(todolistId:string)=>(dispatch: Dispatch)=>{
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksApi.getTasks(todolistId)
        .then((res)=>{
            dispatch(setTasksAC({todolistId, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const removetaskTC=(todolistID: string, taskID:string)=> (dispatch: Dispatch)=>{
    dispatch(setAppStatusAC({status: 'loading'}))
        tasksApi.deleteTask(todolistID,taskID)
            .then((res)=>{
                dispatch(removetaskAC({todolistID, taskID}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
}
export const addTaskTC=(todolistId:string, title:string)=> (dispatch: Dispatch)=>{
    dispatch(setAppStatusAC({status: 'loading'}))
        tasksApi.createTask(todolistId,title)
            .then((res)=>{
                if (res.data.resultCode===0) {
                    dispatch(addTaskAC({task: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else{
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC({error: res.data.messages[0]}))
                    } else {
                        dispatch(setAppErrorAC({error: 'some error'}))
                    }
                    dispatch(setAppStatusAC({status: 'failed'}))
                }
            })
            .catch((res:AxiosError)=>{
                    dispatch(setAppErrorAC({error: res.message}))
                    dispatch(setAppStatusAC({status: 'failed'}))
            })

}
export const updateTaskStatusTC = (todolistId: string,taskId: string, status: TaskStatus) => (dispatch: Dispatch, getState: () =>AppRootType) => {
        const allTasksFromState = getState().tasks;
       const tasksForCurrentTodolist = allTasksFromState[todolistId]

       const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            const model:changeModel={
                title:task.title ,
                status,
                deadline:task.deadline,
                description: task.description,
                startDate:task.startDate,
                priority:task.priority
            }
            tasksApi.updateTask(todolistId, taskId, model).then((res) => {
                dispatch(ChangeTaskStatysAC({todolistID:todolistId,taskID: taskId, status}))
           })}
}
export const updateTaskTitleTC = (todolistId: string,taskId: string, title: string) => (dispatch: Dispatch, getState: () =>AppRootType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]

        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            const model:changeModel={
                status:task.status,
                title,
                deadline:task.deadline,
                description: task.description,
                startDate:task.startDate,
                priority:task.priority
            }
            tasksApi.updateTask(todolistId, taskId, model).then((res) => {
                dispatch(ChangeTaskTitleAC({todolistID:todolistId,taskID: taskId, title}))
            })}
}

