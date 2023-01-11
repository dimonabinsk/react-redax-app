const TASK_UPDATED = "task/updated";
const TASK_DELETE = "task/delete";

export function taskCompleted(id) {
  return {
    type: TASK_UPDATED,
    payload: { id, completed: true },
  };
}

export function titleChange(id) {
  return {
    type: TASK_UPDATED,
    payload: {
      id,
      title: `New title ${id}`,
    },
  };
}

export function taskDelete(id) {
  return {
    type: TASK_DELETE,
    payload: {
      id,
    },
  };
}

function taskReducer(state = [], action) {
  console.log(state);
  switch (action.type) {
    case TASK_UPDATED:
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (element) => element.id === action.payload.id
      );
      newArray[elementIndex] = {
        ...newArray[elementIndex],
        ...action.payload,
      };
      return newArray;
    case TASK_DELETE:
      return state.filter((element) => element.id !== action.payload.id);
    default:
      return state;
  }
}

export default taskReducer;