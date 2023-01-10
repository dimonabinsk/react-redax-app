import { taskUpdated, taskDelete } from "./actionTypes";

export function taskReducer(state = [], action) {
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
      const newArray1 = [...state];
      const elementIndex1 = newArray1.findIndex(
        (element) => element.id === action.payload.id
      );
      newArray1[elementIndex1] = {
        ...newArray1[elementIndex1],
        ...action.payload,
      };
      return newArray1;
    default:
      return state;
  }
}
