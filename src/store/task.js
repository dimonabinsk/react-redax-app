import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";

const initialState = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    received(state, action) {
      return action.payload;
    },
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
const { updated, remove, received } = actions;

const taskRequested = createAction("task/requested");
const taskRequestFailed = createAction("task/requestFailed");

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(updated({ id, completed: true }));
};

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
