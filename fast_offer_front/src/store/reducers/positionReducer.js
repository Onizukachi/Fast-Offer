import { REMEMBER_POSITION } from '@store/constants/actionTypes'

const initialState = null

const positionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMEMBER_POSITION:
     return action.payload
    default:
      return state
  }
}

export default positionReducer;
