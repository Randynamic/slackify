import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
// attempts to login
export function * login (api) {
  console.log('test')

  const response = yield call(api.getUserInfo)

  if (!response.ok) {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(response.data))
  }
}
