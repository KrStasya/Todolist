import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { todolistReducer} from "../../state/todolist-reducer";
import {tasksReducer} from "../../state/tasks-reducer";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "../../api/tasks-api";
import {appReducer} from "../../state/app-reducer";
import {authReducer} from "../../state/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

 let todolistID1=v1()
 let todolistID2=v1()
const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer,
    app:appReducer,
    auth:authReducer
})

const initialState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn",filter:"All", entityStatus: 'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "All", entityStatus: 'loading', addedDate: '', order: 0}
    ],
    tasks: {
        [todolistID1]: [
            {id: v1(), status: TaskStatus.Completed, title: "Вино",todoListId:todolistID1,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: v1(), status: TaskStatus.New, title: "Сыр",todoListId:todolistID1,startDate:"",deadline:"",priority:TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: v1(), status: TaskStatus.Completed, title: "Булочка",todoListId:todolistID1,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
        ],
        [todolistID2]: [
            {id: v1(), status: TaskStatus.Completed, title: "Покормить кота",todoListId:todolistID1,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: v1(), status: TaskStatus.New, title: "Сходить в магазин",todoListId:todolistID1,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: v1(), status: TaskStatus.Completed, title: "Починить машину",todoListId:todolistID1,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
        ],
    },
    app:{
        error:null,
        status: 'succeeded',
        isInitialized: true
    },
    auth:{
        isLoggedIn: true
    }
}

export const _storyBookProviderDecorator=createStore(rootReducer,initialState, applyMiddleware(thunk))
export const storyBookProviderDecorator=configureStore({
    reducer:rootReducer,
    preloadedState:initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})


export const ReduxStoreProviderDecorator=(storyFn:any)=>{
    return <Provider store={storyBookProviderDecorator}>{storyFn()}</Provider>
}

