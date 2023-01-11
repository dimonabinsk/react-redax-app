import { taskUpdated, taskDelete } from "./actionTypes";

export function taskReducer(state = [], action) {
  console.log(state);
  switch (action.type) {
    case taskUpdated:
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (element) => element.id === action.payload.id
      );
      newArray[elementIndex] = {
        ...newArray[elementIndex],
        ...action.payload,
      };
      return newArray;
    case taskDelete:
      return state.filter((element) => element.id !== action.payload.id);
    default:
      return state;
  }
}
