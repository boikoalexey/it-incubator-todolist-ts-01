import React, { ChangeEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../state/tasks-reducer'
import { Checkbox, IconButton } from '@material-ui/core'
import { EditableSpan } from '../EditableSpan'
import DeleteIcon from '@material-ui/icons/Delete'
import { TaskType } from './TodoList'

type TaskPropsType = {
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.todolistId))
    }, [ props.task.id, props.todolistId ])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistId, props.task.id, e.currentTarget.checked))
    }, [ props.todolistId, props.task.id ])

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.task.id, newTitle))
    }, [ props.todolistId, props.task.id ])

    return (
        <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox checked={props.task.isDone} onChange={onChangeHandler}/>
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitleHandler}/>
            <IconButton onClick={removeTask} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </div>
    )
})
Task.displayName = 'Task'
