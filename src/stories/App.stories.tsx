import type { Meta, StoryObj } from '@storybook/react'
import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator'
import AppWithRedux from '../app/App'

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/App.tsx',
    component: AppWithRedux,
    tags: [ 'autodocs' ],
    decorators: [ ReduxStoreProviderDecorator ]
}

export default meta
type Story = StoryObj<typeof AppWithRedux>

export const AppWithReduxStory: Story = {}
