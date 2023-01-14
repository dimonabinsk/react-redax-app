import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { completeTask, getTasks, taskDelete, titleChange } from "./store/task";
import createStore from "./store/store";

const store = createStore();

function App() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.dispatch(getTasks());
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const changeTitle = (idTask) => {
    store.dispatch(titleChange(idTask));
  };

  const deleteTask = (idTask) => {
    store.dispatch(taskDelete(idTask));
  };
  return (
    <>
      <h1 className="App">App</h1>
      <ul>
        {state.map(({ id, title, completed }) => (
          <li key={id}>
            <p>{title}</p>
            <p> {`Status: ${completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(id)}>Change Title</button>
            <button onClick={() => deleteTask(id)}>Delete</button>
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
