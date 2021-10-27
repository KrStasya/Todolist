import React, {useEffect, useState} from 'react'
import {tasksApi} from "../api/tasks-api";

export default {
    title: 'API-TASKS'
}


export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, settodolistId] = useState<string>("")
    const getTask=()=>{
        tasksApi.getTasks(todolistId)
            .then(res=>{
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"}
               value={todolistId}
               onChange={e=>settodolistId(e.currentTarget.value)}
        />
        <button onClick={getTask}>Get Task</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, settodolistId] = useState<string>("")
    const [taskTitle, settaskTitle] = useState<string>("")
    const createTask=()=>{
            tasksApi.createTask(todolistId,taskTitle)
                .then((res)=>{
                    setState(res.data)
                })
    }

    return <div> {JSON.stringify(state)}
        <input placeholder={"todolistId"}
               value={todolistId}
               onChange={e=>settodolistId(e.currentTarget.value)}
        />
        <input placeholder={"taskTitle"}
               value={taskTitle}
               onChange={e=>settaskTitle(e.currentTarget.value)}
        />
        <button onClick={createTask}>Add Task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, settodolistId] = useState<string>("")
    const [taskId, settaskId] = useState<string>("")

   const deleteTask =()=>{
       tasksApi.deleteTask(todolistId,taskId)
           .then((res)=>{
               setState(res.data)
           })
   }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={"todolistId"}
               value={todolistId}
               onChange={e=>settodolistId(e.currentTarget.value)}
        />
        <input placeholder={"taskId"}
               value={taskId}
               onChange={e=>settaskId(e.currentTarget.value)}
        />
        <button onClick={deleteTask}>Delete Task</button>
    </div>
</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, settodolistId] = useState<string>("")
    const [taskId, settaskId] = useState<string>("")
    const [newTitle, setnewTitle] = useState<string>("")
    const [description, setdescription] = useState<string>("")
    const [status, setstatus] = useState<number>(0)
    const [priority, setpriority] = useState<number>(0)
    const [startDate, setstartDate] = useState<string>("")
    const [deadline, setdeadline] = useState<string>("")


    const changeTask=()=>{
        tasksApi.updateTask(todolistId,taskId,{
            description: description,
            startDate: "",
            title: newTitle,
            //completed: boolean
            status: status,
           priority:  priority,
           deadline: "",
        })
            .then((rec)=>{
                setState(rec.data)
            })
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={e=>settodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId} onChange={e=>settaskId(e.currentTarget.value)}/>
            <input placeholder={"taskTitle"} value={newTitle} onChange={e=>setnewTitle(e.currentTarget.value)}/>

            <input placeholder={"status"} value={status} type={"number"} onChange={e=>setstatus(+e.currentTarget.value)}/>
            <input placeholder={"priority"} value={priority} type={"number"} onChange={e=>setpriority(+e.currentTarget.value)}/>

            <input placeholder={"startDate"} value={startDate} onChange={e=>setstartDate(e.currentTarget.value)}/>
            <input placeholder={"deadline"} value={deadline} onChange={e=>setdeadline(e.currentTarget.value)}/>
            <input placeholder={"description"} value={description} onChange={e=>setdescription(e.currentTarget.value)}/>


            <button onClick={changeTask}>Change Task Title</button>
        </div>

    </div>
}

