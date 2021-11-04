import React, {ChangeEvent, useCallback} from "react";
import {Editablespan} from "./Editablespan/Editablespan";
import {TaskStatus, tasksType} from "../api/tasks-api";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import IconButton from "@mui/material/IconButton/IconButton";
import { DeleteForeverTwoTone } from "@mui/icons-material";

type TaskPropsType = {
    task: tasksType
    todolistID: string
    removetask: (id: string, todolistID: string) => void
    changeChecked: (todolistID: string, id: string,status: TaskStatus) => void
    onChangeNewTitle: (todolistID: string,id: string, newtitle: string) => void
}
export const Task =React.memo( (props: TaskPropsType) => {
    console.log("Task")
    const removetask = () => props.removetask(props.todolistID, props.task.id)
    const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeChecked(props.todolistID, props.task.id, e.currentTarget.checked? TaskStatus.Completed:TaskStatus.New)
    }
    const onChangeNewTitle =useCallback( (newtitle: string,) => {
        props.onChangeNewTitle(props.todolistID,props.task.id, newtitle)
    },[props])
    return (
        <div key={props.task.id} className={props.task.status===TaskStatus.Completed ? "is-done" : ""}>
            <Checkbox
                color={"secondary"}
                checked={props.task.status===TaskStatus.Completed}
                onChange={changeChecked}
            />
            <Editablespan title={props.task.title} onChangeNewTitle={onChangeNewTitle}/>
            {/*<Button title={"x"} callback={removetask}/>*/}
            <IconButton onClick={removetask}><DeleteForeverTwoTone/></IconButton>
        </div>
    )
})