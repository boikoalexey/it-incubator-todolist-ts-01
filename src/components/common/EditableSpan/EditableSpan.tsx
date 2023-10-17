import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@material-ui/core'

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    let [ editMode, setEditMode ] = useState(false)
    let [ title, setTitle ] = useState('')

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
        ? <TextField onBlur={activateViewMode} value={title} onChange={onChangeHandler} disabled={props.disabled} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})

EditableSpan.displayName = 'EditableSpan'
