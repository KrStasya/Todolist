import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";

export type tasksType={
  id:string
  isDone:boolean
  title:string
}
export type filterType="All" | "Active" |"Complete"
export type todolistType={
  id:string
  title:string
  filter:filterType
}
type TaskaType= {[key:string] : Array<tasksType>}

function App() {
  let todolistID1=v1()
  let todolistID2=v1()
  let todolistID3=v1()


  let [tasks,settasks]=useState<TaskaType>({
    [todolistID1]: [
      {id: v1(), isDone: true, title: "Вино"},
      {id: v1(), isDone: false, title: "Сыр"},
      {id: v1(), isDone: true, title: "Булочка"},
    ],
    [todolistID2]: [
      {id: v1(), isDone: true, title: "Вино"},
      {id: v1(), isDone: false, title: "Сыр"},
      {id: v1(), isDone: true, title: "Булочка"},
    ],
  })

/*  let[tasks,settasks]=useState<Array<tasksType>>([
    {id:v1(),isDone:true,title:"Вино"},
    {id:v1(),isDone:false,title:"Сыр"},
    {id:v1(),isDone:true,title:"Булочка"},
  ])*/

  let[todolist,settodolist]=useState<Array<todolistType>>([
    {id:todolistID1,title:"Список покупок",filter:"All"},
    {id:todolistID2,title:"Список дел",filter:"All"}
  ])

  function ChangeFilter(filter:filterType,todolistID:string) {
    settodolist(todolist.map(m=>todolistID===m.id?{...m,filter:filter}:m))
  }


  function removetask (id:string,todolistID:string) {
   settasks({...tasks,[todolistID]:tasks[todolistID].filter(t=>t.id!==id)})
  }
function changeChecked(id:string,isDone:boolean,todolistID:string) {
    settasks({...tasks,[todolistID]:tasks[todolistID].map(m=>m.id===id?{...m,isDone:isDone}:m)})
}
function addTask(title:string,todolistID:string) {
 settasks({...tasks,[todolistID]:[{id:v1(),isDone:false,title:title.trim()},...tasks[todolistID]]})

}

function removeTodolist(todolistID:string) {
  settodolist(todolist.filter(m=>m.id!==todolistID))
/*  delete tasks[todolistID]
  settasks({...tasks})*/
}
  function AddNewTodolist (title:string) {
    settodolist([{id:todolistID3,title:title,filter:"All"},...todolist])
    settasks({...tasks,[todolistID3]:[]})
  }

  function onChangeNewTitle(id:string,newtitle:string,todolistID:string) {
    settasks({...tasks,[todolistID]:tasks[todolistID].map(m=>m.id===id?{...m,title:newtitle}:m)})
  }

  function onChangeNewTaskTitle(todolistID:string,newtitle:string){
    settodolist(todolist.map(m=>m.id===todolistID?{...m,title:newtitle}:m))
  }

  return (
    <div className="App">
      <AddItemForm addItem={AddNewTodolist}/>
      { todolist.map(m=>{
        let filteredTasks=tasks[m.id]
        if (m.filter==="Active") {filteredTasks=tasks[m.id].filter(f=>f.isDone)}
        if (m.filter==="Complete") {filteredTasks=tasks[m.id].filter(f=>!f.isDone)}
        return(
            <Todolist
                key={m.id}
                todolistID={m.id}
                title={m.title}
                      tasks={filteredTasks}
                      ChangeFilter={ChangeFilter}
                      filter={m.filter}
                      removetask={removetask}
                      changeChecked={changeChecked}
                      addTask={addTask}
                removeTodolist={removeTodolist}
                onChangeNewTitle={onChangeNewTitle}
                onChangeNewTaskTitle={onChangeNewTaskTitle}/>
        )
      })
      }
    </div>
  );
}

export default App;

