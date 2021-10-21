import React from "react";
import {filterType} from "../state/todolist-reducer";


type ButtonPropsType={
    title:string
    callback:()=>void
    filter?:filterType
}

export function Button (props:ButtonPropsType) {
    return (
        <button  onClick={props.callback} className={props.title===props.filter? "activefilter":""}>{props.title}</button>
    )
}