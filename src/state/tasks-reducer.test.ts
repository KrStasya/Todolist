import {TaskaType} from "../AppWithRedux";
import {addTaskAC, ChangeTaskStatysAC, ChangeTaskTitleAC, removetaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import {TaskPriority, TaskStatus} from "../api/tasks-api";


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

    const endState = tasksReducer(startState, removetaskAC('todolistID1',"2"))
    expect(endState["todolistID1"].length).toBe(2)
    expect(endState["todolistID2"].length).toBe(3)
    expect(endState["todolistID1"].every(t=>t.id!="2")).toBeTruthy()
});

test('new task should be added', () => {

    const endState = tasksReducer(startState, addTaskAC('todolistID1', "Soup"))
    expect(endState['todolistID1'].length).toBe(4)
    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID1'][0].id).toBeDefined()
    expect(endState['todolistID1'][0].title).toBe("Soup")
    expect(endState['todolistID1'][0].status).toBe(TaskStatus.New)
});

test('statys should be changed', () => {

    const endState = tasksReducer(startState, ChangeTaskStatysAC("todolistID1", "1",TaskStatus.New))

    expect(endState['todolistID1'][0].status).toBe(TaskStatus.New)
    expect(endState['todolistID2'][0].status).toBe(TaskStatus.Completed)

});

test('title should be changed', () => {


    const endState = tasksReducer(startState, ChangeTaskTitleAC("todolistID1","false","1"))

    expect(endState['todolistID1'][0].title).toBe('false')
    expect(endState['todolistID2'][0].title).toBe("Вино")

});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist");
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

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
