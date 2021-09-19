import React, {ChangeEvent, useState} from "react";

type EditablespanPropsType = {
    title: string
    onChangeNewTitle:(newtitle:string)=>void
}

export function Editablespan(props: EditablespanPropsType) {
    let [editMode, seteditMode] = useState(false)
    let[newtitle,setnewtitle]=useState("")

    const activateEditMode = () => {
        seteditMode(true)
    setnewtitle(props.title)}

    const disactivateEditMode = () => {seteditMode(false)
    props.onChangeNewTitle(newtitle)}

    const ChangeEditapleSpan=(e:ChangeEvent<HTMLInputElement>)=> {setnewtitle(e.currentTarget.value)}

    return editMode
        ? <input value={newtitle} onChange={ChangeEditapleSpan} onBlur={disactivateEditMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}