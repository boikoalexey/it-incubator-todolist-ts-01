import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button, TextField } from '@material-ui/core'

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [ newTaskTitle, setTitle ] = useState<string>('')
    const [ error, setError ] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        event.key === 'Enter' && addTask()
    }
    return (
        <div>
            <TextField
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                variant={'outlined'}
                size="small"
                label={'Type title'}
                error={!!error}
                helperText={error}
                disabled={props.disabled}
            />
            <Button onClick={addTask} disabled={props.disabled} variant={'contained'} color="primary">+</Button>
        </div>
    )
})

AddItemForm.displayName = 'AddItemForm'
export default AddItemForm
