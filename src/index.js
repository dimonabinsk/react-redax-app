import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function taskReducer(state, action) {
  switch (action.type) {
    case "task/completed":
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (element) => element.id === action.payload.id
      );
      newArray[elementIndex].completed = !newArray[elementIndex].completed;
      return newArray;

    default:
      break;
  }
}

function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function subscribe(listener) {
    listeners.push(listener);
  }
  return { getState, dispatch, subscribe };
}

const store = createStore(taskReducer, [
  { id: 1, description: "Task 1", completed: false },
  { id: 2, description: "Task 2", completed: false },
]);

function App() {
  console.log(store.getState());
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (idTask) => {
    store.dispatch({ type: "task/completed", payload: { id: idTask } });
  };
  return (
    <>
      <h1 className="App">App</h1>
      <ul>
        {state.map(({ id, description, completed }) => (
          <li key={id}>
            <p>{description}</p>
            <p> {`Status: ${completed} `}</p>
            <button onClick={() => completeTask(id)}>Complete</button>
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
