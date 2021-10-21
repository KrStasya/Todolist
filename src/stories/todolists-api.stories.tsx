import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API-TODOLIST'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolist()
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title="New Title"
        todolistApi.createTodolist(title)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId=`1a6eb573-d2e0-4275-b165-d90e15db3e8e`
        todolistApi.deleteTodolist(todolistId)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId="8e981169-c66a-42ea-b317-b07d82c4e1b4"
        let title="Список дел"
        todolistApi.updateTodolistTitle(title,todolistId)
            .then(res=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

