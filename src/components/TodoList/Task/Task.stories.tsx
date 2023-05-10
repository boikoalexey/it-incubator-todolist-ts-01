import type { Meta, StoryObj } from '@storybook/react'
import { ReduxStoreProviderDecorator } from '../../../stories/decorators/ReduxStoreProviderDecorator'
import { Task } from './Task'

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: [ 'autodocs' ],
    decorators: [ ReduxStoreProviderDecorator ],
    args: {
        task: { id: '12wsdewfijdei', title: 'JS', isDone: false },
        todolistId: 'fgdosrg8rgjuh'
    }
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
    args: {
        task: { id: '12wsdewfijdei2343', title: 'CSS', isDone: true }
    }
}
