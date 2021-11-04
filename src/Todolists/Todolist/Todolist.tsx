import React, {useCallback, useEffect} from "react";
import {TaskStatus, tasksType} from "../../api/tasks-api";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Editablespan} from "../../components/Editablespan/Editablespan";
import {Task} from "../../components/Task";
import {filterType} from "../../state/todolist-reducer";
import {setTaskTC} from "../../state/tasks-reducer";
import {useDispatch} from "react-redux";
import IconButton from "@mui/material/IconButton/IconButton";
import {DeleteForeverTwoTone} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {RequestStatusType} from "../../state/app-reducer";




type TodolistPropsType = {
    title: string
    todolistID: string
    filter: filterType
    entityStatus: RequestStatusType
    tasks: Array<tasksType>
    ChangeFilter: (filter: filterType, todolistID: string) => void
    removetask: (id: string, todolistID: string) => void
    changeChecked: (todolistID: string, id: string,status: TaskStatus,) => void
    onChangeNewTitle: (todolistID: string,id: string, newtitle: string) => void

    addTask: (title: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    onChangeNewTaskTitle: (todolistID: string, newtitle: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(setTaskTC(props.todolistID))
    },[])

    const SetAll = useCallback(() => {
        props.ChangeFilter("All", props.todolistID)
    },[props])
    const SetActive = useCallback( ()=> {
        props.ChangeFilter("Active", props.todolistID)
    },[props])
    const SetComplete =useCallback( () => {
        props.ChangeFilter("Complete", props.todolistID)
    },[props])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistID)
    },[props])
    const onChangeNewTaskTitle = useCallback((newtitle: string) => {
        props.onChangeNewTaskTitle(props.todolistID, newtitle)
    },[ props])
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }


    let filteredTasks = props.tasks
    if (props.filter === "Active") {
        filteredTasks = props.tasks.filter(f => f.status===TaskStatus.New)
    }
    if (props.filter === "Complete") {
        filteredTasks = props.tasks.filter(f => f.status===TaskStatus.Completed)
    }

    return (
        <div>
            <h3><Editablespan title={props.title} onChangeNewTitle={onChangeNewTaskTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.entityStatus==="loading"}>
                    <DeleteForeverTwoTone/>
                </IconButton> {/*<Button title={"X"} callback={removeTodolist}/>*/}
            </h3>
            <AddItemForm addItem={addTask} disabled={props.entityStatus==="loading"}/>
            <div>
                    {
                        filteredTasks.map(m => <Task
                            key={m.id}
                            task={m}
                            todolistID={props.todolistID}
                            removetask={props.removetask}
                            changeChecked={props.changeChecked}
                            onChangeNewTitle={props.onChangeNewTitle}
                        />
                    )}

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


