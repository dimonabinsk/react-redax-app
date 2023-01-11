import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as action from "./store/task/actions";
import configureStore from "./store/store";

const store = configureStore();

function App() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (idTask) => {
    store.dispatch(action.taskCompleted(idTask));
  };

  const changeTitle = (idTask) => {
    store.dispatch(action.titleChange(idTask));
  };

  const deleteTask = (idTask) => {
    store.dispatch(action.taskDelete(idTask));
  };
  return (
    <>
      <h1 className="App">App</h1>
      <ul>
        {state.map(({ id, title, completed }) => (
          <li key={id}>
            {completed !== undefined && <p>{title}</p>}
            {completed !== undefined && <p> {`Status: ${completed}`}</p>}
            <button onClick={() => completeTask(id)}>Complete</button>
            <button onClick={() => changeTitle(id)}>Title</button>
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
