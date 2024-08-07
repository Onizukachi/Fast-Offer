import { REMEMBER_POSITION } from '@store/constants/actionTypes'

export const rememberPosition = positionId => ({
  type: REMEMBER_POSITION,
  payload: positionId
})
