import {addTodolistAC, TodolistDomainType, todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskaType} from "../AppWithRedux";


test('ids should be equals', () => {
    const startTasksState: TaskaType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC ({todolist: {id: "todolistID2", title: "Список дел", order: 0, addedDate: ""}});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
