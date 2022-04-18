import { ADD_RECORD } from "../Constants/constants";

export function addRecord(obj) {
  return {
    type: ADD_RECORD,
    payload: obj,
  };
}
