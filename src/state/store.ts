import {applyMiddleware, combineReducers, createStore} from "redux";
import { todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer.ts";


const rootReducer=combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app:appReducer,
    auth:authReducer
})

export type AppRootType = ReturnType<typeof rootReducer>

export const store=createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store=store


