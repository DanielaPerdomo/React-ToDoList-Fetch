import React, { useState, useEffect } from "react";

const URLAPI = "https://assets.breatheco.de/apis/fake/todos/user/DanielaPerdomo"
const inicialTask =  {label: "", done: false}    // Tarea inicial
const ToDoList = () => {
  const [newTask, setNewTask] = useState(inicialTask); //Nueva tarea
  const [taskList, setTaskList] = useState([]); //Lista de Tareas
  const handlerChange = (event) => {
    setNewTask({...newTask , label:event.target.value})
  }

//Metodo GET
async function getToDo(){
  try { 
    const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/DanielaPerdomo" , {
    method: "GET", 
    headers: {"Content-Type": "application/json"} ,
    // body: JSON.strigify([])
    })
    console.log(response)
    if (response.status != 200  ){
      console.log("Solicitud no enviada")
      return
    }
    const body = await response.json() 
    setTaskList(body)
    console.log(body)
    } catch(error){
    console.log(error)
  }
}
// Metodo PUT para actualizar la lista de tareas anadir / eliminar tareas
async function updateTaskList(newTask){
  try {
    const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/DanielaPerdomo" ,{
      method : "PUT" ,
      headers: {"Content-Type": "application/json"} ,
      body: JSON.stringify(newTask)
    })
    console.log(response)
    if (response.status != 200  ){
      console.log("Solicitud no enviada")
      return
    } 
    getToDo()
  } catch(error){
    console.log(error)
  }
}
  // Metodo eliminar usuario DELETE
  async function deleteToDo(){
    try {
      const response = await fetch(URLAPI , {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      })
      if (response.status != 200){
        console.log("No se pudo borrar las tareas")
        return
      } 
    }catch(error){
      console.log(error)
    }
  }
    //Funcion Anade tareas
    const handlerTask =(event) => {
      if (event.key === "Enter"){
        if ( newTask.label.trim() != "") {
          updateTaskList([...taskList, newTask])
          setNewTask(inicialTask)
        }
        else {
          alert('No hay tarea escrita') //Alert de que no ha escrito nada
        }
      }
    }
  //Eliminar Tareas
  const deleteTask =(indexTask)=>{
    let newTasks = taskList.filter((tasks, index) => index !== indexTask)
    updateTaskList(newTasks)
  }
  //Funcion del Boton Borrar Tareas
  const deleteAllTask = ()=>{
    setTaskList ([])
  }
  useEffect (()=>{
    getToDo()
  }, [])
  return (
    <div className="body">
      <div className="container">
        <div className="tittle">
          <h1> Mi Lista de Tareas...!!!</h1>
        </div>
        <div className="entry">
          <input type="text" value={newTask.label} placeholder="Añadir nueva tarea"
          onChange={handlerChange} onKeyDown={handlerTask}
          />
        </div>
        <ul className="list-group">
              {taskList.map((task, index)=>{ 
              console.log(task)
              return <li className="list-group-item" key={index}> {task.label} <i className="delete fas fa-trash" onClick={() => deleteTask(index)}></i></li> 
              })}
        </ul>
        <div>{taskList.length == 0
            ? "No hay tarea pendiente"
            : taskList.length == 1
            ? `${taskList.length} tarea pendiente`
            : `${taskList.length} tareas pendientes`}</div>
          <button className="button" onClick={deleteAllTask}> Borrar Lista </button>
      </div>
    </div>
  );
};
export default ToDoList;


