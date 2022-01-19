import {authReducer} from "../state/auth-reducer.ts";
import { setIsLoggedInAC } from "./auth-reducer.ts";


let startState={
    isLoggedIn: false
}


test('Initialized should be changed', () => {

    const endState = authReducer(startState, setIsLoggedInAC({value:true}))
    expect(endState.isLoggedIn).toBe(true)

});


