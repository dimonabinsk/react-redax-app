import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTaskError } from "./store/middleware/errors";
import {
  completeTask,
  getTask,
  getTaskLoadingStatus,
  loadingTasks,
  taskDelete,
  titleChange,
} from "./store/task";

function App() {
  const state = useSelector(getTask());
  const isLoading = useSelector(getTaskLoadingStatus());
  const error = useSelector(getTaskError());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingTasks());
  }, [dispatch]);

  const changeTitle = (idTask) => {
    dispatch(titleChange(idTask));
  };

  const deleteTask = (idTask) => {
    dispatch(taskDelete(idTask));
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1 className="App">App</h1>
      <ul>
        {state.map(({ id, title, completed }) => (
          <li key={id}>
            <p>{title}</p>
            <p> {`Status: ${completed}`}</p>
            <button onClick={() => dispatch(completeTask(id))}>Complete</button>
            <button onClick={() => changeTitle(id)}>Change Title</button>
            <button onClick={() => deleteTask(id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
