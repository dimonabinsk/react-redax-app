import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { completeTask, getTasks, taskDelete, titleChange } from "./store/task";

function App() {
  const state = useSelector((state) => state.tasks.entities);
  const isLoading = useSelector((state) => state.tasks.isLoading);

  const error = useSelector((state) => state.errors.entities[0]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
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
