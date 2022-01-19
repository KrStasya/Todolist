import {appReducer, RequestStatusType, setAppErrorAC, setAppStatusAC, setisInitializedAC} from "../state/app-reducer";


let startState={
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}


test('Initialized should be changed', () => {

    const endState = appReducer(startState, setisInitializedAC({isInitialized:true}))
    expect(endState.isInitialized).toBe(true)

});

test('App status should be changed', () => {

    const endState = appReducer(startState, setAppStatusAC({status:"loading"}))
    expect(endState.status).toBe("loading")
});

test('error should be added', () => {

    const error="Error message "
    const endState = appReducer(startState, setAppErrorAC({error}))
    expect(endState.error).toBe(error)
});

