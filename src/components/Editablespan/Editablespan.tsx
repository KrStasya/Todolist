import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";


type EditablespanPropsType = {
    title: string
    onChangeNewTitle: (newtitle: string) => void
}

export const Editablespan=React.memo((props: EditablespanPropsType)=> {
    console.log("Editablespan")
    let [editMode, seteditMode] = useState(false)
    let [newtitle, setnewtitle] = useState(props.title)

    const activateEditMode = () => {
        seteditMode(true)
        setnewtitle(props.title)
    }

    const disactivateEditMode = () => {
        seteditMode(false)
        props.onChangeNewTitle(newtitle)
    }

    const ChangeEditapleSpan = (e: ChangeEvent<HTMLInputElement>) => {
        setnewtitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={newtitle}
                     size={"small"}
                     onBlur={disactivateEditMode}
                     variant="outlined"
                     onChange={ChangeEditapleSpan}
                     autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})