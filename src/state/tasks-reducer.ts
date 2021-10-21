import { TaskaType} from "../AppWithRedux";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "../api/tasks-api";


type ActionType = removetasksActionType |
    addTaskACActionType |
    ChangeTaskStatysType |
    ChangeTaskTitleType |
    AddTodolistActionType |
    RemoveTodolistActionType

type removetasksActionType = ReturnType<typeof removetaskAC>
type addTaskACActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatysType = ReturnType<typeof ChangeTaskStatysAC>
type ChangeTaskTitleType = ReturnType<typeof ChangeTaskTitleAC>
type AddTodolistActionType=ReturnType<typeof addTodolistAC>
type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>



const initialState:TaskaType={}


export const tasksReducer = (state: TaskaType=initialState, action: ActionType): TaskaType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return  {...state,[action.todolistID]:state[action.todolistID].filter(t=>t.id!==action.taskID)}
        case 'ADD-TASK':
            return  {...state,[action.todolistID]:[{id:v1(),status:TaskStatus.New,title:action.title,addedDate:"",description:"",order:0,priority:TaskPriority.Low,deadline:"",startDate:"",todoListId:action.todolistID
                },...state[action.todolistID]]}
        case 'CHANGE-TASK-STATYS':
            return {...state,[action.todolistID]: state[action.todolistID].map(m=>m.id===action.taskID?{...m,status:action.status}:m)}
        case 'CHANGE-TASK-TITLE':
            return {...state,[action.todolistID]: state[action.todolistID].map(m=>m.id===action.taskID?{...m,title:action.title}:m)}
        case 'ADD-TODOLIST':
            return {...state,[action.todolistID]:[]}
        case 'REMOVE-TODOLIST':
            const copyState = { ...state }
            const str = action.todolistID
            const { [str]: remove, ...rest } = copyState;
            return rest
        default:
            return state
    }
}


export const removetaskAC = (todolistID: string, taskID:string) => {
    return {type: 'REMOVE-TASK', todolistID,taskID} as const
}

export const addTaskAC = (todolistID: string,title: string) => {
    return {type: 'ADD-TASK', title,todolistID} as const
}

export const ChangeTaskStatysAC = (todolistID: string, status: TaskStatus,taskID:string ) => {
    return {type: 'CHANGE-TASK-STATYS', todolistID, status,taskID} as const
}

export const ChangeTaskTitleAC = (todolistID: string, title: string, taskID:string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, title, taskID} as const
}