import React, { ChangeEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { removeTaskTC, updateTaskTC } from '../../../state/tasks-reducer'
import { Checkbox, IconButton } from '@material-ui/core'
import { EditableSpan } from '../../common/EditableSpan/EditableSpan'
import DeleteIcon from '@material-ui/icons/Delete'
import { TaskStatuses, TaskType } from '../../../api/todolist-api'

export type TaskPropsType = {
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(props.todolistId, props.task.id))
    }, [])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(props.todolistId, props.task.id, { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New }))
    }, [ props.todolistId, props.task.id ])

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskTC(props.todolistId, props.task.id, { title: newTitle }))
    }, [ props.todolistId, props.task.id ])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeHandler}/>
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitleHandler}/>
            <IconButton onClick={removeTask} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </div>
    )
})
Task.displayName = 'Task'
