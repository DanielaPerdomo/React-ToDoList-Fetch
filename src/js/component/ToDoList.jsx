import React, { useState, useEffect } from "react";

const URL_API = "https://playground.4geeks.com/apis/fake/todos/user/DanielaPerdomo"
const inicialTask =  {label: "", done: false}    // Tarea inicial
const ToDoList = () => {
  const [newTask, setNewTask] = useState(inicialTask); //Nueva tarea
  const [taskList, setTaskList] = useState([]); //Lista de Tareas
  const handlerChange = (event) => {
    setNewTask({...newTask , label:event.target.value})
  }

//Metodo GET traer tareas / obtener datos
async function getToDo(){
  try { 
    const response = await fetch(URL_API , {
    method: "GET", 
    headers: {"Content-Type": "application/json"} , //documentacion
    })
    console.log(response)
    if (response.status == 404 ){
      createUser()
      return      // detener la funcion
    }
    if (response.status != 200){
      console.log("hay un error en el Get")
      return;
    }
    const body = await response.json() // Espera respuesta y la guarda en el Body
    setTaskList(body)
    console.log(body)
    } catch(error){
    console.log(error)
  }
}
// Metodo PUT para actualizar la lista de tareas anadir / eliminar tareas /  Actualizar la lista de tareas
async function updateTaskList(newTask){
  try {
    const response = await fetch(URL_API ,{
      method : "PUT" ,
      headers: {"Content-Type": "application/json"} ,
      body: JSON.stringify(newTask)     //Quiero la nueva lista de tareas Actualiza la tareas con este array!!!
    })
    console.log(response)
    if (response.status != 200  ){
      console.log("Solicitud no enviada")
      return
    } 
    getToDo() // Actualizamos y Traemos las tareas
  } catch(error){
    console.log(error)
  }
}
  // Metodo eliminar usuario DELETE / Borrar tareas
  async function deleteToDo(){
    try {
      const response = await fetch(URL_API , {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      })
      if (response.status != 201){
        console.log("No se pudo borrar las tareas")
        return
      } 
      getToDo() //Llamamos al metodo despues de eliminarlo para traer nuevamente una lista de tareas
    }catch(error){
      console.log(error)
    }
  }
  // Metodo POST crear usuario
  async function createUser(){
    try {
      const response = await fetch(URL_API , {
        method: "POST" ,
        headers: {"Content-Type": "application/json"} ,
        body: JSON.stringify([]) // DOCUMENTACION
      })
      if(response.status != 201) {
        console.log("No se creo el usuario")
        return
      }
      getToDo() // LLAMAMOS NUEVAMENTE EL GET PARA CREAR Y TRAER LA LISTA CON EL USUARIO
    } catch (error) {
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
    deleteToDo()
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
            {/*PASAMOS LA FUNCION PARA BORRAR LA TAREAS */}
          <button className="button" onClick={deleteAllTask}> Borrar Lista </button> 
      </div>
    </div>
  );
};
export default ToDoList;