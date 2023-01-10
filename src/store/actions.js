import * as actionsType from "./actionTypes";

export function taskCompeted(id) {
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
