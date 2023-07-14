/*
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Todos = props => {
  //initialize the tasks variable to an empty array and hook it to setTasks function
  const [tasks, setTasks] = useState(null);
  //this function useEffect will run only one time, when the component is finally lodaded the first time.
  useEffect(
    () =>
      // here i fetch my todos from the API
      fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr")
        .then(r => r.json()) //convert incoming JSON formated response into an object
        .then(data => setTasks(data)), //here it re-set the variable tasks with the incoming data
    [] // <---- thanks to this empty array the use effect will be called only once
  );
  return (
    <div>
      <input
        onKeyUp={e =>
          //listen to the key up and wait for the return key to be pressed (KeyCode === 13)
          e.keyCode === 13 &&
          setTasks(tasks.concat({ label: e.target.value, done: false }))
        }
      />
      <ul>
        {tasks === null
          ? "Loading..."
          : tasks.map(t => (
              <li>
                {t.label} ({t.done ? "done" : "not done"})
              </li>
            ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<Todos />, document.getElementById("root"));
*/ 


/* 💡 Pista
Utiliza la siguiente fetch call para sincronizar tus tareas con el servidor cada vez que haya un cambio en la lista.*/
fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado ex1`acto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });
*/ 