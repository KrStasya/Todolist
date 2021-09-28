import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";
import {addTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type tasksType = {
    id: string
    isDone: boolean
    title: string
}
export type filterType = "All" | "Active" | "Complete"
export type todolistType = {
    id: string
    title: string
    filter: filterType
}
export type TaskaType = { [key: string]: Array<tasksType> }

function AppWithRedux() {

const dicpatch=useDispatch()
    const todolists=useSelector<AppRootType, Array<todolistType>>(state=>state.todolists)

    function ChangeFilter(filter: filterType, todolistID: string) {
        dicpatch(ChangeTodolistFilterAC(todolistID,filter))
    }

    function removeTodolist(todolistID: string) {
        dicpatch(removeTodolistAC(todolistID))
    }

    function AddNewTodolist(title: string) {
        dicpatch(addTodolistAC(title))
    }

    function onChangeNewTaskTitle(todolistID: string, newtitle: string) {
        dicpatch(ChangeTodolistTitleAC(todolistID,newtitle))
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
                    todolists.map(m => {
                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <TodolistWithRedux
                                    key={m.id}
                                    todolistID={m.id}
                                    title={m.title}
                                    ChangeFilter={ChangeFilter}
                                    filter={m.filter}
                                    removeTodolist={removeTodolist}
                                    onChangeNewTaskTitle={onChangeNewTaskTitle}
                                /></Paper>
                        </Grid>
                    })
                }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

