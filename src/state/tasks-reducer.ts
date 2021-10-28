import { TaskaType} from "../AppWithRedux";
import {addTodolistAC, removeTodolistAC, SetTodolistType} from "./todolist-reducer";

import {changeModel, tasksApi, TaskStatus, tasksType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootType} from "./store";



type ActionType = removetasksActionType |
    addTaskACActionType |
    ChangeTaskStatysType |
    ChangeTaskTitleType |
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodolistType|
    setTasksActionType


type removetasksActionType = ReturnType<typeof removetaskAC>
type addTaskACActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatysType = ReturnType<typeof ChangeTaskStatysAC>
type ChangeTaskTitleType = ReturnType<typeof ChangeTaskTitleAC>
type AddTodolistActionType=ReturnType<typeof addTodolistAC>
type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type setTasksActionType = ReturnType<typeof setTasksAC>



const initialState:TaskaType={}


export const tasksReducer = (state: TaskaType=initialState, action: ActionType): TaskaType => {
    switch (action.type) {
        case "SET-TASKS":{
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK':
            return  {...state,[action.todolistID]:state[action.todolistID].filter(t=>t.id!==action.taskID)}
        case 'ADD-TASK':
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;

       // {...state,[action.todolistID]:[{id:v1(),status:TaskStatus.New,title:action.title,addedDate:"",description:"",order:0,priority:TaskPriority.Low,deadline:"",startDate:"",todoListId:action.todolistID
               // },...state[action.todolistID]]}


        case 'CHANGE-TASK-STATYS':
            return {...state,[action.todolistID]: state[action.todolistID].map(m=>m.id===action.taskID?{...m,status:action.status}:m)}
        case 'CHANGE-TASK-TITLE':
            return {...state,[action.todolistID]: state[action.todolistID].map(m=>m.id===action.taskID?{...m,title:action.title}:m)}
        case 'ADD-TODOLIST': {
            return {...state,[action.todolist.id]:[]}
        }

        case 'REMOVE-TODOLIST':
            const copyState = { ...state }
            const str = action.todolistID
            const { [str]: remove, ...rest } = copyState;
            return rest
          /*  const copyState = {...state}
            delete copyState[action.todolistID]
            return copyState*/


        default:
            return state
    }
}


export const removetaskAC = (todolistID: string, taskID:string) => {
    return {type: 'REMOVE-TASK', todolistID,taskID} as const
}

export const addTaskAC = (task: tasksType) => {
    return {type: 'ADD-TASK', task} as const
}

export const ChangeTaskStatysAC = (todolistID: string,taskID:string, status: TaskStatus ) => {
    return {type: 'CHANGE-TASK-STATYS', todolistID, status,taskID} as const
}

export const ChangeTaskTitleAC = (todolistID: string, taskID:string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, title, taskID} as const
}

export const setTasksAC=(todolistId:string,tasks:Array<tasksType>) =>{
    return {type: 'SET-TASKS',tasks,todolistId} as const
}


export const setTaskTC=(todolistId:string)=>{
   return (dispatch: Dispatch)=>{
    tasksApi.getTasks(todolistId)
        .then((res)=>{
            dispatch(setTasksAC( todolistId, res.data.items))
        })
}
}

export const removetaskTC=(todolistID: string, taskID:string)=>{
    return (dispatch: Dispatch)=>{
        tasksApi.deleteTask(todolistID,taskID)
            .then((res)=>{
                dispatch(removetaskAC(todolistID,taskID))
            })

    }
}


export const addTaskTC=(todolistId:string, title:string)=>{
    return (dispatch: Dispatch)=>{
        tasksApi.createTask(todolistId,title)
            .then((res)=>{
                dispatch(addTaskAC(res.data.data.item))
            })

    }
}


export const updateTaskStatusTC = (todolistId: string,taskId: string, status: TaskStatus) => {
    return (dispatch: Dispatch, getState: () =>AppRootType) => {
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
                dispatch(ChangeTaskStatysAC(todolistId,taskId,status))
           })}
    }
}

export const updateTaskTitleTC = (todolistId: string,taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: () =>AppRootType) => {
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
                dispatch(ChangeTaskTitleAC(todolistId,taskId,title))
            })}
    }
}

