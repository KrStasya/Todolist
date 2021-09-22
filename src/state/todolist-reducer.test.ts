import {v1} from "uuid";
import {filterType, todolistType} from "../App";
import {addTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, removeTodolistAC, todolistReducer} from "./todolist-reducer";

let todolistID1: string
let todolistID2: string

let startState: Array<todolistType>

beforeEach(()=>{
     todolistID1 = v1()
    todolistID2 = v1()

    startState = [
        {id: todolistID1, title: "Список покупок", filter: "All"},
        {id: todolistID2, title: "Список дел", filter: "All"}
    ]

})


test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
});

test('new todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = "New Todolist";

    const startState: Array<todolistType> = [
        {id: todolistID1, title: "Список покупок", filter: "All"},
        {id: todolistID2, title: "Список дел", filter: "All"}
    ]

    const endState = todolistReducer(startState, addTodolistAC (newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
});

test('filter should be changed', () => {

    let newFilter: filterType = "Complete";
    const endState = todolistReducer(startState, ChangeTodolistFilterAC(todolistID1,newFilter))
    expect(endState[1].filter).toBe("All")
    expect(endState[0].filter).toBe(newFilter)
});

test('title of Todolist should be changed', () => {

    let changedTodolistTitle = "New Todolist";

    const endState = todolistReducer(startState, ChangeTodolistTitleAC(todolistID1,changedTodolistTitle))
    expect(endState[1].title).toBe("Список дел")
    expect(endState[0].title).toBe(changedTodolistTitle)
});