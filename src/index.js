import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as action from "./store/actions";
// import { createStore } from "./store/createStore";
import { initialStore } from "./store/store";
// import { taskReducer } from "./store/taskReducer";

// const initialState = [
//   { id: 1, title: "Task 1", completed: false },
//   { id: 2, title: "Task 2", completed: false },
// ];

const store = initialStore();

function App() {
  console.log(store.getState());
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (idTask) => {
    store.dispatch(action.taskCompeted(idTask));
  };

  const changeTitle = (idTask) => {
    store.dispatch(action.titleChange(idTask));
  };
  return (
    <>
      <h1 className="App">App</h1>
      <ul>
        {state.map(({ id, title, completed }) => (
          <li key={id}>
            <p>{title}</p>
            <p> {`Status: ${completed} `}</p>
            <button onClick={() => completeTask(id)}>Complete</button>
            <button onClick={() => changeTitle(id)}>Title</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
