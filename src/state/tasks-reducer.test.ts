import {TaskaType} from "../AppWithRedux";
import {
    addTaskTC,
    removetaskTC,
    setTaskTC,
    tasksReducer, updateTaskTC
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistAC} from "./todolist-reducer";
import { TaskPriority, TaskStatus, tasksType} from "../api/tasks-api";


let startState: TaskaType

beforeEach(()=>{
    startState ={
        "todolistID1": [
            {id: "1", status: TaskStatus.Completed, title: "Вино",todoListId:"todolistID1",startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: "2", status: TaskStatus.New, title: "Сыр",todoListId:"todolistID1",startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: "3", status: TaskStatus.Completed, title: "Булочка",todoListId:"todolistID1",startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
        ],
        "todolistID2": [
            {id: "1", status: TaskStatus.Completed, title: "Вино",todoListId:"todolistID2",startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: "2", status: TaskStatus.New, title: "Сыр",todoListId:"todolistID2",startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
            {id: "3", status: TaskStatus.Completed, title: "Булочка",todoListId:"todolistID2",startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
        ],
    }

})


test('correct task should be removed', () => {

    const endState = tasksReducer(startState, removetaskTC.fulfilled({todolistID:'todolistID1',taskID:"2"},'',{todolistID:'todolistID1',taskID:"2"}))
    expect(endState["todolistID1"].length).toBe(2)
    expect(endState["todolistID2"].length).toBe(3)
    expect(endState["todolistID1"].every(t=>t.id!="2")).toBeTruthy()
});

test('new task should be added', () => {
const newTask:tasksType={
    id: "4",
    status: TaskStatus.New,
    title: "Soup",
    todoListId:"todolistID1",
    startDate:"",
    deadline:"",
    priority: TaskPriority.Middle,
    addedDate:"",
    order: 0,
    description:""
}

    const endState = tasksReducer(startState, addTaskTC.fulfilled({newTask},'',{todolistId:newTask.id, title:newTask.title}))
    expect(endState['todolistID1'].length).toBe(4)
    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID1'][0].id).toBeDefined()
    expect(endState['todolistID1'][0].title).toBe("Soup")
    expect(endState['todolistID1'][0].status).toBe(TaskStatus.New)
});

test('statys should be changed', () => {

    let updateModel={todolistID:"todolistID1",taskId: "1", model: {status: TaskStatus.New}}

   /* const endState = tasksReducer(startState, updateTaskTC.fulfilled(updateModel,"",updateModel))

    expect(endState['todolistID1'][0].status).toBe(TaskStatus.New)
    expect(endState['todolistID2'][0].status).toBe(TaskStatus.Completed)*/

});


test('title should be changed', () => {
   /* const endState = tasksReducer(startState, ChangeTaskAC({todolistID:"todolistID1",taskID: "1",{title: "false"}}))
    expect(endState['todolistID1'][0].title).toBe('false')
    expect(endState['todolistID2'][0].title).toBe("Вино")*/
});


test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        todolist: {
            id: "todolistId1",
            title: "NewTitle",
            addedDate: "",
            order: 0
        }
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC({todolistID:"todolistId2"});
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {

    const netToDoLists=[
        {id: "1", title: "Вино",order: 0, addedDate:"" },
        {id: "2",  title: "Сыр", order: 0, addedDate:""},
    ]
    const action = setTodolistAC({todolists: netToDoLists});
    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).not.toBe([]);
    expect(endState["2"]).not.toBe([]);
});

test('tasks should be added for todolist', () => {

    const action = setTaskTC.fulfilled({todolistId:"todolistID1", tasks:startState["todolistID1"]},"","todolistID1")
    const endState = tasksReducer({
        "todolistID1": [],
        "todolistID2": [],
    }, action)


    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(0);

});
