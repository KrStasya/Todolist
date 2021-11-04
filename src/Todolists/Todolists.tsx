import React, {useCallback, useEffect} from "react";
import {
    addTodolistTC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleTC,
    filterType,
    removeTodolistTC,
    setTodolistTC,
    TodolistDomainType
} from "../state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../state/store";
import {addTaskTC, removetaskTC, updateTaskStatusTC, updateTaskTitleTC} from "../state/tasks-reducer";
import {TaskStatus} from "../api/tasks-api";

import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {TaskaType} from "../AppWithRedux";
import { Todolist } from "./Todolist/Todolist";
import Grid from "@mui/material/Grid/Grid";
import {Paper} from "@mui/material";

export const Todolists: React.FC = () => {

    useEffect(() => {
        dispatch(setTodolistTC())
    }, [])

    const dispatch = useDispatch()
    const todolist = useSelector<AppRootType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootType, TaskaType>(state => state.tasks)

    const ChangeFilter = useCallback((filter: filterType, todolistID: string) => {
        dispatch(ChangeTodolistFilterAC(todolistID, filter))
    }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    }, [dispatch])
    const AddNewTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const onChangeNewTaskTitle = useCallback((todolistID: string, newtitle: string) => {
        dispatch(ChangeTodolistTitleTC(todolistID, newtitle))
    }, [dispatch])


    const removetask = useCallback((todolistID: string, id: string,) => {
        dispatch(removetaskTC(todolistID, id))
    }, [dispatch])

    const changeChecked = useCallback((todolistID: string, id: string, status: TaskStatus) => {
        dispatch(updateTaskStatusTC(todolistID, id, status))
    }, [])

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskTC(todolistID, title))
    }, [dispatch])

    const onChangeNewTitle = useCallback((todolistID: string, id: string, newtitle: string) => {
        dispatch(updateTaskTitleTC(todolistID, id, newtitle))
    }, [dispatch])


    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={AddNewTodolist}/>
        </Grid>
        <Grid container spacing={3}>{
            todolist.map(m => {
                let filteredTasks = tasks[m.id]

                return <Grid item key={m.id}>
                    <Paper style={{padding: "10px"}}>
                        <Todolist
                            todolistID={m.id}
                            title={m.title}
                            entityStatus={m.entityStatus}
                            tasks={filteredTasks}
                            ChangeFilter={ChangeFilter}
                            filter={m.filter}
                            removetask={removetask}
                            changeChecked={changeChecked}
                            addTask={addTask}
                            removeTodolist={removeTodolist}
                            onChangeNewTitle={onChangeNewTitle}
                            onChangeNewTaskTitle={onChangeNewTaskTitle}
                        />
                    </Paper>
                </Grid>
            })
        }
        </Grid>

    </>
}