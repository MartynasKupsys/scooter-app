import { ADD_RECORD, UPDATE_RECORD } from "../Constants/constants";

export function addRecord(obj) {
  return {
    type: ADD_RECORD,
    payload: obj,
  };
}

export function updateRecord(obj) {
  return {
    type: UPDATE_RECORD,
    payload: obj,
  };
}
