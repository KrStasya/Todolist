import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {TaskPriority, TaskStatus, tasksType} from "./api/tasks-api";
import {filterType, TodolistDomainType} from "./state/todolist-reducer";



type TaskaType = { [key: string]: Array<tasksType> }

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()


    let [tasks, settasks] = useState<TaskaType>({
        [todolistID1]: [
            {id: v1(), status: TaskStatus.Completed, title: "Вино",todoListId:todolistID1,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: v1(), status: TaskStatus.New, title: "Сыр",todoListId:todolistID1,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: v1(), status: TaskStatus.Completed, title: "Булочка",todoListId:todolistID1,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
        ],
        [todolistID2]: [
            {id: v1(), status: TaskStatus.Completed, title: "Вино",todoListId:todolistID2,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: v1(), status: TaskStatus.New, title: "Сыр",todoListId:todolistID2,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: v1(), status: TaskStatus.Completed, title: "Булочка",todoListId:todolistID2,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
        ],
    })


    let [todolist, settodolist] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: "Список покупок", filter: "All",addedDate:"",order:0},
        {id: todolistID2, title: "Список дел", filter: "All",addedDate:"",order:0}
    ])

    function ChangeFilter(filter: filterType, todolistID: string) {
        settodolist(todolist.map(m => todolistID === m.id ? {...m, filter: filter} : m))
    }


    function removetask(id: string, todolistID: string) {
        settasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
    }

    function changeChecked( todolistID: string,id: string, status: TaskStatus) {
        settasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === id ? {...m, status: status} : m)})
    }

    function addTask(title: string, todolistID: string) {
        settasks({...tasks, [todolistID]: [{id: v1(), status: TaskStatus.New, title: title.trim(),todoListId:todolistID,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""}, ...tasks[todolistID]]})

    }

    function removeTodolist(todolistID: string) {
        settodolist(todolist.filter(m => m.id !== todolistID))
        /*  delete tasks[todolistID]
          settasks({...tasks})*/
    }

    function AddNewTodolist(title: string) {
        settodolist([{id: todolistID3, title: title, filter: "All",addedDate:"",order:0}, ...todolist])
        settasks({...tasks, [todolistID3]: []})
    }

    function onChangeNewTitle(id: string, newtitle: string, todolistID: string) {
        settasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === id ? {...m, title: newtitle} : m)})
    }

    function onChangeNewTaskTitle(todolistID: string, newtitle: string) {
        settodolist(todolist.map(m => m.id === todolistID ? {...m, title: newtitle} : m))
    }

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
                        if (m.filter === "Active") {
                            filteredTasks = tasks[m.id].filter(f => f.status===TaskStatus.New)
                        }
                        if (m.filter === "Complete") {
                            filteredTasks = tasks[m.id].filter(f => f.status===TaskStatus.Completed)
                        }
                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={m.id}
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

export default App;

