import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type AddItemFormType = {
    addItem: (title: string ) => void

}
export function AddItemForm(props: AddItemFormType) {
    let [NewTaskTitle, setNewTaskTitle] = useState("")
    let [error, seterror] = useState<string | null>(null)
    const addTask = () => {
        if (NewTaskTitle.trim() !== "") {
            props.addItem(NewTaskTitle)
            setNewTaskTitle("")
        } else seterror("Ввидите название покупки")
    }

    const onChangeAddTask = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        seterror("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <input value={NewTaskTitle}
                   onChange={onChangeAddTask}
                   onKeyPress={onKeyPressAddTask}
                   className={error ? "error" : ""}/>
            <Button title={"+"} callback={addTask}/>
            {error && <div className={error ? "error" : ""}>{error}</div>}
        </div>
    )
}