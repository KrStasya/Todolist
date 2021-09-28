import React, {ChangeEvent} from "react";
import {filterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {Editablespan} from "./Editablespan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {DeleteForeverTwoTone} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";
import {tasksType} from "./AppWithRedux";
import {addTaskAC, ChangeTaskStatysAC, ChangeTaskTitleAC, removetaskAC } from "./state/tasks-reducer";


type TasksType = {
    id: string
    isDone: boolean
    title: string
}
type TodolistPropsType = {
    title: string
    todolistID: string
    filter: filterType
    ChangeFilter: (filter: filterType, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    onChangeNewTaskTitle: (todolistID: string, newtitle: string) => void
}

export function TodolistWithRedux(props: TodolistPropsType) {
    const dicpatch=useDispatch()
    const tasks=useSelector<AppRootType, Array<tasksType>> (state=> state.tasks[props.todolistID])


    let filteredTasks = tasks
    if (props.filter === "Active") {
        filteredTasks = tasks.filter(f => f.isDone)
    }
    if (props.filter === "Complete") {
        filteredTasks = tasks.filter(f => !f.isDone)
    }

    const SetAll = () => {
        props.ChangeFilter("All", props.todolistID)
    }
    const SetActive = () => {
        props.ChangeFilter("Active", props.todolistID)
    }
    const SetComplete = () => {
        props.ChangeFilter("Complete", props.todolistID)
    }

    const addTask = (title: string) => {
        dicpatch(addTaskAC(props.todolistID,title))

    }
    const onChangeNewTaskTitle = (newtitle: string) => {
        props.onChangeNewTaskTitle(props.todolistID, newtitle)
    }
    const removeTodolist = () => {
       props.removeTodolist(props.todolistID)
    }
    return (
        <div>
            <h3><Editablespan title={props.title} onChangeNewTitle={onChangeNewTaskTitle}/> <IconButton
                onClick={removeTodolist}><DeleteForeverTwoTone/></IconButton> {/*<Button title={"X"} callback={removeTodolist}/>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <ul>
                    {filteredTasks.map((m) => {
                        const removetask = () => dicpatch(removetaskAC(props.todolistID,m.id))
                        const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            dicpatch(ChangeTaskStatysAC(props.todolistID,e.currentTarget.checked,m.id))
                        }
                        const onChangeNewTitle = (newtitle: string,) => {
                            dicpatch(ChangeTaskTitleAC(m.id,newtitle,props.todolistID))
                        }
                        return (
                            <div key={m.id}>
                                <Checkbox
                                    color={"secondary"}
                                    checked={m.isDone}
                                    onChange={changeChecked}/>
                                <Editablespan title={m.title} onChangeNewTitle={onChangeNewTitle}/>
                                <IconButton onClick={removetask}><DeleteForeverTwoTone/></IconButton>
                            </div>
                        )
                    })}
                </ul>


                <Button color="secondary"
                        size={"small"}
                        variant={props.filter === 'All' ? 'contained' : 'outlined'}
                        onClick={SetAll}>All</Button>
                <Button color="secondary"
                        size={"small"}
                        variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                        onClick={SetActive}>Active</Button>
                <Button color="secondary"
                        size={"small"}
                        variant={props.filter === 'Complete' ? 'contained' : 'outlined'}
                        onClick={SetComplete}>Complete</Button>
                {/*    <Button title={"All"} filter={props.filter} callback={SetAll} />
                <Button title={"Active"} filter={props.filter} callback={SetActive} />
                <Button title={"Complete"} filter={props.filter} callback={SetComplete} />*/}
            </div>


        </div>
    )
}

