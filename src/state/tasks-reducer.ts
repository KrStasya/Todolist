import { TaskaType} from "../App";
import {addTodolistAC, removeTodolistAC, todolistID1, todolistID2} from "./todolist-reducer";
import {v1} from "uuid";


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



const initialState:TaskaType={
    [todolistID1]: [
        {id: v1(), isDone: true, title: "Вино"},
        {id: v1(), isDone: false, title: "Сыр"},
        {id: v1(), isDone: true, title: "Булочка"},
    ],
    [todolistID2]: [
        {id: v1(), isDone: true, title: "Покормить кота"},
        {id: v1(), isDone: false, title: "Сходить в магазин"},
        {id: v1(), isDone: true, title: "Починить машину"},
    ],
}


export const tasksReducer = (state: TaskaType=initialState, action: ActionType): TaskaType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return  {...state,[action.todolistID]:state[action.todolistID].filter(t=>t.id!==action.taskID)}
        case 'ADD-TASK':
            return  {...state,[action.todolistID]:[{id:v1(),isDone:false,title:action.title},...state[action.todolistID]]}
        case 'CHANGE-TASK-STATYS':
            return {...state,[action.todolistID]: state[action.todolistID].map(m=>m.id===action.taskID?{...m,isDone:action.isDone}:m)}
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

export const ChangeTaskStatysAC = (todolistID: string, isDone: boolean,taskID:string ) => {
    return {type: 'CHANGE-TASK-STATYS', todolistID, isDone,taskID} as const
}

export const ChangeTaskTitleAC = (todolistID: string, title: string, taskID:string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, title, taskID} as const
}