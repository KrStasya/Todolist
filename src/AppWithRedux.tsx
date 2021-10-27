import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    filterType,
    removeTodolistAC, setTodolistTC, TodolistDomainType
} from "./state/todolist-reducer";
import {
    addTaskAC,
    addTaskTC,
    ChangeTaskStatysAC,
    ChangeTaskTitleAC,
    removetaskAC,
    removetaskTC, updateTaskStatusTC
} from "./state/tasks-reducer";
import {TaskStatus, tasksType} from './api/tasks-api';


export type TaskaType = { [key: string]: Array<tasksType> }

function AppWithRedux() {

    useEffect(()=>{
        dispatch(setTodolistTC())
    },[])

    const dispatch=useDispatch()
    const todolist=useSelector<AppRootType,Array<TodolistDomainType>>(state => state.todolists)
    const tasks=useSelector<AppRootType,TaskaType>(state => state.tasks)

    const ChangeFilter= useCallback((filter: filterType, todolistID: string)=> {
        dispatch(ChangeTodolistFilterAC(todolistID,filter))
        //settodolist(todolist.map(m => todolistID === m.id ? {...m, filter: filter} : m))
    },[dispatch])
    const removeTodolist=useCallback((todolistID: string)=> {
        dispatch(removeTodolistAC(todolistID))
        //settodolist(todolist.filter(m => m.id !== todolistID))
        /*  delete tasks[todolistID]
          settasks({...tasks})*/
    },[dispatch])
    const AddNewTodolist=useCallback((title: string)=>{
        dispatch(addTodolistAC(title))
       // settodolist([{id: todolistID3, title: title, filter: "All"}, ...todolist])
        //settasks({...tasks, [todolistID3]: []})
    },[dispatch])
    const onChangeNewTaskTitle=useCallback((todolistID: string, newtitle: string)=>{
        dispatch(ChangeTodolistTitleAC(todolistID,newtitle))
        //settodolist(todolist.map(m => m.id === todolistID ? {...m, title: newtitle} : m))
    },[dispatch])


    const removetask=useCallback((todolistID: string, id: string,)=> {
        dispatch(removetaskTC(todolistID,id))
       // settasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
    },[dispatch])

    const changeChecked=useCallback((todolistID: string, id: string, status: TaskStatus)=> {
        dispatch(updateTaskStatusTC(todolistID,id,status))
        //settasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === id ? {...m, isDone: isDone} : m)})
    },[])

    const addTask=useCallback((title: string, todolistID: string)=> {
        dispatch(addTaskTC(todolistID,title))
        //settasks({...tasks, [todolistID]: [{id: v1(), isDone: false, title: title.trim()}, ...tasks[todolistID]]})

    },[dispatch])

    const onChangeNewTitle=useCallback((id: string, newtitle: string, todolistID: string)=> {
        dispatch(ChangeTaskTitleAC(todolistID,newtitle,id))
        //settasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === id ? {...m, title: newtitle} : m)})
    },[dispatch])


    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="secondary"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="secondary">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
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
            </Container>
        </div>
    );
}

export default AppWithRedux;

