import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function createStore(initialState) {
  let state = initialState;
  function getStore() {
    return state;
  }
  function dispatch(action) {
    console.log(action);
    if (action.type === "task/completed") {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (element) => element.id === action.payload.id
      );
      newArray[elementIndex].completed = true;
      state = newArray;
      console.log(state);
    }
  }
  return { getStore, dispatch };
}

const store = createStore([{ id: 1, description: "Task 1", completed: false }]);

function App() {
  // console.log(store.getStore());
  return (
    <>
      <div className="App">App</div>
      <button
        onClick={() =>
          store.dispatch({ type: "task/completed", payload: { id: 1 } })
        }
      >
        Payload
      </button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
