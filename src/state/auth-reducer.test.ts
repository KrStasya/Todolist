import {authReducer} from "../state/auth-reducer";
import { setIsLoggedInAC } from "../state/auth-reducer";


let startState={
    isLoggedIn: false
}


test('Initialized should be changed', () => {

    const endState = authReducer(startState, setIsLoggedInAC({value:true}))
    expect(endState.isLoggedIn).toBe(true)

});


