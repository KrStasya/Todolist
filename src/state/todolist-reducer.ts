import {filterType, todolistType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistFilterType |
    ChangeTodolistTitleType

type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterType = ReturnType<typeof ChangeTodolistFilterAC>
type ChangeTodolistTitleType = ReturnType<typeof ChangeTodolistTitleAC>

export const todolistReducer = (state: Array<todolistType>, action: ActionType): Array<todolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(f => f.id !== action.todolistID)]
        case "ADD-TODOLIST":
            return [{id:action.todolistID, title: action.title, filter: "All"}, ...state]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(m => m.id === action.todolistID ? {...m, filter: action.filter} : m)]
        case "CHANGE-TODOLIST-TITLE":
            return [...state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m)]
        default:
            return state
    }
}


export const removeTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', todolistID} as const
}

export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistID:v1()} as const
}

export const ChangeTodolistFilterAC = (todolistID: string, filter: filterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistID, filter} as const
}

export const ChangeTodolistTitleAC = (todolistID: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistID, title} as const
}