import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? "error" : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    );
};

export default AddItemForm;