import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updated(state, action) {
      const elementIndex = state.findIndex(
        (element) => element.id === action.payload.id
      );
      state[elementIndex] = {
        ...state[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      return state.filter((element) => element.id !== action.payload.id);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { updated, remove } = actions;

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

export default taskReducer;
