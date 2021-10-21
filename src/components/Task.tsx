import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Editablespan} from "./Editablespan";
import {DeleteForeverTwoTone} from "@material-ui/icons";
import {TaskStatus, tasksType} from "../api/tasks-api";

type TaskPropsType = {
    task: tasksType
    todolistID: string
    removetask: (id: string, todolistID: string) => void
    changeChecked: (id: string, status: TaskStatus, todolistID: string) => void
    onChangeNewTitle: (id: string, newtitle: string, todolistID: string) => void
}
export const Task =React.memo( (props: TaskPropsType) => {
    console.log("Task")
    const removetask = () => props.removetask(props.todolistID, props.task.id)
    const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeChecked(props.task.id, e.currentTarget.checked?TaskStatus.Completed:TaskStatus.New, props.todolistID)
    }
    const onChangeNewTitle =useCallback( (newtitle: string,) => {
        props.onChangeNewTitle(props.task.id, newtitle, props.todolistID)
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