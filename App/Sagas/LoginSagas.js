import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
// attempts to login
export function * login (api) {
  console.log('test')

  const response = yield call(api.getUserAuth)
  const response2 = yield call(api.getUserInfo, response.data.user_id)

  console.log(response2)

  if (!response.data.ok && !response2.data.ok) {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(Object.assign(response.data, response2.data)))
  }
}
