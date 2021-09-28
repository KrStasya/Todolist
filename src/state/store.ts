import {combineReducers, createStore} from "redux";
import { todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReducer=combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

export type AppRootType = ReturnType<typeof rootReducer>

export const store=createStore(rootReducer)

// @ts-ignore
window.store=store


