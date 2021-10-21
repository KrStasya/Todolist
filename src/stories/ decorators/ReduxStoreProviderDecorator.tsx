import React from 'react';
import {Provider} from "react-redux";
import {AppRootType} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {todolistID1, todolistID2, todolistReducer} from "../../state/todolist-reducer";
import {tasksReducer} from "../../state/tasks-reducer";
import {v1} from "uuid";
import {TaskPriority, TaskStatus} from "../../api/tasks-api";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

const initialState = {
    todolists: [
        {id: "todolistID1", title: "Список покупок", filter: "All",order:0,addedDate:""},
        {id: "todolistID2", title: "Список дел", filter: "All",order:0,addedDate:""}
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
    }
}

export const storyBookProviderDecorator=createStore(rootReducer,initialState as AppRootType)


export const ReduxStoreProviderDecorator=(storyFn:any)=>{
    return <Provider store={storyBookProviderDecorator}>{storyFn()}</Provider>
}