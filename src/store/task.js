import { createAction, createReducer } from "@reduxjs/toolkit";

const updated = createAction("task/updated");
const remove = createAction("task/removed");
const initialState = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
];

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

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updated, (state, action) => {
      const elementIndex = state.findIndex(
        (element) => element.id === action.payload.id
      );
      state[elementIndex] = {
        ...state[elementIndex],
        ...action.payload,
      };
    })
    .addCase(remove, (state, action) => {
      return state.filter((element) => element.id !== action.payload.id);
    });
});

export default taskReducer;
