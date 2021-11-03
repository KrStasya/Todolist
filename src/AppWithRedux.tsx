import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {tasksType} from './api/tasks-api';
import {Todolists} from "./Todolists/Todolists";


export type TaskaType = { [key: string]: Array<tasksType> }

function AppWithRedux() {
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
                        <Todolists/>
            </Container>
        </div>
    );
}

export default AppWithRedux;




