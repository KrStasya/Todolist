import React, {useEffect} from 'react';
import './App.css';
import {tasksType} from './api/tasks-api';
import {Todolists} from "./Todolists/Todolists";
import AppBar from '@mui/material/AppBar/AppBar';
import IconButton from '@mui/material/IconButton/IconButton';
import {Button, CircularProgress, Container, LinearProgress, Toolbar, Typography} from "@mui/material";
import { Menu } from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";
import {initializeAppTC, RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import { Login } from './features/Login/login';
import {Navigate, Route, Routes} from "react-router-dom";
import { logoutTC } from './state/auth-reducer.ts';


export type TaskaType = { [key: string]: Array<tasksType> }

function AppWithRedux() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler=()=>{
        dispatch(logoutTC())
    }

    const status=useSelector<AppRootType,RequestStatusType>((state)=>state.app.status)
    const isInitialized=useSelector<AppRootType,boolean>((state)=>state.app.isInitialized)
    const isLoggedIn=useSelector<AppRootType,boolean>(state => state.auth.isLoggedIn)

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position={"static"} color={"secondary"}>
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>

                    {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
                </Toolbar>
                {status==='loading'&&<LinearProgress color="inherit"/>}
            </AppBar>

            <Container fixed>
                <Routes>
                    <Route path="/" element={<Todolists/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to= "/404"/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default AppWithRedux;




