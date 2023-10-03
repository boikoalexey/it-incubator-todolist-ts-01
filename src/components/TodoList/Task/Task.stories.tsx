import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ReduxStoreProviderDecorator } from '../../../stories/decorators/ReduxStoreProviderDecorator'
import { Task } from './Task'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../../state/store'
import { TaskPriorities, TaskStatuses, TaskType } from '../../../api/todolist-api'
import { TodolistDomainType } from '../../../state/todolists-reducer'

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: [ 'autodocs' ],
    decorators: [ ReduxStoreProviderDecorator ]
    // args: {
    //     task: {
    //         description: '',
    //         title: 'HTML&CSS',
    //         status: TaskStatuses.Completed,
    //         priority: TaskPriorities.Low,
    //         startDate: '',
    //         deadline: '',
    //         id: '12wsdewfijdei',
    //         todoListId: 'todolistId1',
    //         order: 0,
    //         addedDate: ''
    //     },
    //     todolistId: 'todolistId1'
    // }
}

export default meta
type Story = StoryObj<typeof Task>

const TaskExample = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    // Находим первый todolist (если он есть)
    const firstTodolistId = todolists[1]?.id

    // Если у нас есть id первого todolist, то находим его таски и выбираем первую таску
    const task = firstTodolistId ? useSelector<AppRootStateType, TaskType>(state => state.tasks[firstTodolistId][0]) : null

    // Если у нас нет таски, то ничего не рендерим
    if (!task) return null

    return <Task todolistId={firstTodolistId} task={task} />
}

export const TaskWithReduxStory: Story = {
    render: () => <TaskExample/>
}
