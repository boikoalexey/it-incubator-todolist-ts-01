import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChangeTitle(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <input onBlur={activateViewMode} value={title} onChange={onChangeHandler} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}