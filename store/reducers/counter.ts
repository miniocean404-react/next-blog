import type { Action } from '@reduxjs/toolkit'
import { ADD, MINUS } from '../constants/counter'

const INITIAL_STATE = {
  num: 0,
}

export default function counter(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1,
      }
    default:
      return state
  }
}
