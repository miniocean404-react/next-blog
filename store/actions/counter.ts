import { ADD, MINUS } from '../constants/counter'

export const add = () => ({
  type: ADD,
})
export const minus = () => ({
  type: MINUS,
})

// 异步的 actions
export function asyncAdd() {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
