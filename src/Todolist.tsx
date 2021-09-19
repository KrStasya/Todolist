import React, {ChangeEvent, useState} from "react";
import {filterType} from "./App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {Editablespan} from "./Editablespan";

type TasksType={
    id:string
    isDone:boolean
    title:string
}

type TodolistPropsType={
    title:string
    todolistID:string
    filter:filterType
    tasks:Array<TasksType>
    ChangeFilter:(filter:filterType,todolistID:string)=>void
    removetask:(id:string,todolistID:string)=>void
    changeChecked:(id:string,isDone:boolean,todolistID:string)=>void
    addTask:(title:string,todolistID:string)=>void
    removeTodolist:(todolistID:string)=>void
    onChangeNewTitle:(id:string,newtitle:string,todolistID:string)=>void
    onChangeNewTaskTitle:(todolistID:string,newtitle:string)=>void
}
export function Todolist(props:TodolistPropsType) {

    const SetAll=()=>{props.ChangeFilter("All",props.todolistID)}
    const SetActive=()=>{props.ChangeFilter("Active",props.todolistID)}
    const SetComplete=()=>{props.ChangeFilter("Complete",props.todolistID)}

    const addTask=(title:string)=>{
        props.addTask(title,props.todolistID)
    }
const onChangeNewTaskTitle=(newtitle:string)=>{props.onChangeNewTaskTitle(props.todolistID,newtitle)}
const removeTodolist=()=>{props.removeTodolist(props.todolistID)}
    return (
        <div>
                <h3> <Editablespan title={props.title} onChangeNewTitle={onChangeNewTaskTitle}/> <Button title={"X"} callback={removeTodolist}/></h3>
           <AddItemForm addItem={addTask} />
            <div>
                <ul>
                    {props.tasks.map((m)=>{
                        const removetask=()=>props.removetask(m.id,props.todolistID)
                        const changeChecked=(e:ChangeEvent<HTMLInputElement>)=>{props.changeChecked(m.id,e.currentTarget.checked,props.todolistID)}
                        const onChangeNewTitle=(newtitle:string,)=>{props.onChangeNewTitle(m.id,newtitle,props.todolistID)}
                        return(
                            <li key={m.id}><input type={"checkbox"}
                                                  checked={m.isDone}
                                                  onChange={changeChecked}/>
                                <Editablespan title={m.title} onChangeNewTitle={onChangeNewTitle}/>
                                <Button title={"x"} callback={removetask}/>
                            </li>
                        )
                    })}
                </ul>
                <Button title={"All"} filter={props.filter} callback={SetAll} />
                <Button title={"Active"} filter={props.filter} callback={SetActive} />
                <Button title={"Complete"} filter={props.filter} callback={SetComplete} />
            </div>


        </div>
    )
}

