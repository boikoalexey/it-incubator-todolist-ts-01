import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ReduxStoreProviderDecorator } from '../../../stories/decorators/ReduxStoreProviderDecorator'
import { Task } from './Task'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../../state/store'
import { TaskType } from '../TodoList'

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: [ 'autodocs' ],
    decorators: [ ReduxStoreProviderDecorator ],
    args: {
        task: { id: '12wsdewfijdei', title: 'HTML&CSS', isDone: true },
        todolistId: 'todolistId1'
    }
}

export default meta
type Story = StoryObj<typeof Task>

const TaskExample = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <Task todolistId={'todolistId1'} task={task}/>
}

export const TaskWithReduxStory: Story = {
    render: () => <TaskExample/>
}
