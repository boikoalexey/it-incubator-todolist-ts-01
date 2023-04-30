import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle)
            setTitle('')
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        event.key === 'Enter' && addTask()
    }
    return (
        <div>
            <TextField
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                variant={"outlined"}
                size="small"
                label={"Type title"}
                error={!!error}
                helperText={error}
            />
            <Button onClick={addTask} variant={'contained'} color="primary">+</Button>
        </div>
    );
};

export default AddItemForm;