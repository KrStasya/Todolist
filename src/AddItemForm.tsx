import Button from "@material-ui/core/Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

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
        } else seterror("Ввидите данные")
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
            <TextField variant="standard"
                      onChange={onChangeAddTask}
                       onKeyPress={onKeyPressAddTask}
                       error={!!error}
                       helperText={error}
                       value={NewTaskTitle}
            />
            <Button onClick={addTask}
                    variant="contained"
                    size="small"
                    color="secondary">{"+"}</Button>
            {/*<Button title={"+"} callback={addTask}/>*/}

        </div>
    )
}
