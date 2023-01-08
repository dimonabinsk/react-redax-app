import React from "react";
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
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
  }
  return { getState, dispatch };
}

const store = createStore(taskReducer, [
  { id: 1, description: "Task 1", completed: false },
]);

function App() {
  console.log(store.getState());

  const completeTask = () => {
    store.dispatch({ type: "task/completed", payload: { id: 1 } });
    console.log(store.getState());
  };
  return (
    <>
      <h1 className="App">App</h1>
      <button onClick={completeTask}>Payload</button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
