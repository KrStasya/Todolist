import { combineReducers} from "redux";
import { todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer.ts";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer=combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app:appReducer,
    auth:authReducer
})

export type AppRootType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(thunk)
})
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store=store




