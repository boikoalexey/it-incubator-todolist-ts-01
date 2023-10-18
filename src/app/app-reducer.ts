import { authAPI } from '../api/todolist-api'
import { Dispatch } from 'react'
import { setIsLoggedInAC, SetIsLoggedInActionType } from '../components/Login/auth-reducer'

const initialState = {
    initialized: false,
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-IS-INITIALIZED':
            return { ...state, initialized: action.value }
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
}

export const setIsInitializedAC = (value: boolean) => ({ type: 'APP/SET-IS-INITIALIZED', value } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
            dispatch(setIsLoggedInAC(false))
        }
        dispatch(setIsInitializedAC(true))
    })
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppInitializedActionType = ReturnType<typeof setIsInitializedAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type ActionsType = SetAppInitializedActionType | SetAppStatusActionType | SetAppErrorActionType | SetIsLoggedInActionType
