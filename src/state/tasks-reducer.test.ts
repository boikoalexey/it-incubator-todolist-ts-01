import { addTaskAC, updateTaskAC, removeTaskAC, tasksReducer } from './tasks-reducer'
import { addTodolistAC, removeTodolistAC } from './todolists-reducer'
import { TasksStateType } from './tasks-reducer'
import { TaskPriorities, TaskStatuses } from '../api/todolist-api'

let startState: TasksStateType

beforeEach(()=> {
    startState = {
        'todolistId1': [
            { id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '' },
            { id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '' },
            { id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '' }
        ],
        'todolistId2': [
            { id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId2', startDate: '', addedDate: '', deadline: '' },
            { id: '2', title: 'milk', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId2', startDate: '', addedDate: '', deadline: '' },
            { id: '3', title: 'tea', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId2', startDate: '', addedDate: '', deadline: '' }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            { id: '1', title: 'CSS', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '' },
            { id: '2', title: 'JS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '' },
            { id: '3', title: 'React', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '' }
        ],
        'todolistId2': [
            { id: '1', title: 'bread', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId2', startDate: '', addedDate: '', deadline: '' },
            { id: '3', title: 'tea', status: TaskStatuses.New, description: '', priority: TaskPriorities.Low, order: 0, todoListId: 'todolistId2', startDate: '', addedDate: '', deadline: '' }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        todoListId: 'todolistId2',
        title:'juice',
        status: TaskStatuses.New,
        addedDate: '',
        description: '',
        deadline: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        id: 'exists'
    })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC('todolistId2', '2', { status: TaskStatuses.New })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][1].title).toBe('milk')
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId2'][2].title).toBe('tea')
    expect(endState['todolistId2'][2].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {

    const action = updateTaskAC('todolistId1', '1', { title:'Tailwind' })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId1'][0].title).toBe('Tailwind')
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({ title: 'newTodolistTitle', order: 0, id: 'exist', addedDate: '' })
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
