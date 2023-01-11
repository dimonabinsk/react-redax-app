import { createAction } from "@reduxjs/toolkit";

const updated = createAction("task/updated");
const remove = createAction("task/removed");


export function taskCompleted(id) {
  return updated({ id, completed: true });
}

export function titleChange(id) {
  return updated({
    id,
    title: `New title ${id}`,
  });
}

export function taskDelete(id) {
  return remove({
    id,
  });
}

function taskReducer(state = [], action) {
  console.log(state);
  switch (action.type) {
    case updated.type:
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (element) => element.id === action.payload.id
      );
      newArray[elementIndex] = {
        ...newArray[elementIndex],
        ...action.payload,
      };
      return newArray;
    case remove.type:
      return state.filter((element) => element.id !== action.payload.id);
    default:
      return state;
  }
}

export default taskReducer;