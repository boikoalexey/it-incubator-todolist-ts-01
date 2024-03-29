import React, { useCallback } from 'react'
import AddItemForm from '../common/AddItemForm/AddItemForm'
import { FilterValuesType } from '../../AppWithRedux'
import { EditableSpan } from '../common/EditableSpan/EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../state/store'
import { addTaskAC } from '../../state/tasks-reducer'
import { Task } from './Task/Task'

export type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = React.memo((props: TodoListPropsType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const addTask = useCallback((newTaskTitle: string) => {
        dispatch(addTaskAC(newTaskTitle, props.todolistId))
    }, [ props.todolistId ])

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.todolistId)
    }, [ props.removeTodoList, props.todolistId ])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }, [ props.changeTodolistTitle, props.todolistId ])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'all')
    }, [ props.changeFilter, props.todolistId ])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'active')
    }, [ props.changeFilter, props.todolistId ])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, 'completed')
    }, [ props.changeFilter, props.todolistId ])

    const getFilteredTasks = (tasks: Array<TaskType>) => {
        switch (props.filter) {
            case 'active':
                return tasks.filter((task: TaskType) => !task.isDone)
            case 'completed':
                return tasks.filter((task: TaskType) => task.isDone)
            default:
                return tasks
        }
    }
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks)

    return (
        <div>
            <h2>
                <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h2>
            <AddItemForm addItem={addTask}/>
            <div>
                {filteredTasks.length ? filteredTasks.map((task: TaskType) =>
                    <Task
                        key={task.id}
                        todolistId={props.todolistId}
                        task={task}
                    />
                ) : <span>Your taskslist is empty</span>}
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    name={'All'} onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    name={'Active'} onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    name={'Completed'} onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )

})

TodoList.displayName = 'TodoList'
export default TodoList
