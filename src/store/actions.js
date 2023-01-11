import * as actionsType from "./actionTypes";

export function taskCompleted(id) {
  return {
    type: actionsType.taskUpdated,
    payload: { id, completed: true },
  };
}

export function titleChange(id) {
  return {
    type: actionsType.taskUpdated,
    payload: {
      id,
      title: `New title ${id}`,
    },
  };
}

export function taskDelete(id) {
  return {
    type: actionsType.taskDelete,
    payload: {
      id,
    },
  };
}
