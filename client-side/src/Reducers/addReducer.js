import { ADD_RECORD, UPDATE_RECORD } from "../Constants/constants";

function addReducer(state, action) {
  let newState = null;
  switch (action.type) {
    case ADD_RECORD:
      newState = action.payload;
      break;
    case UPDATE_RECORD:
      newState = action.payload;
      break;
    default:
  }

  return newState;
}

export default addReducer;
