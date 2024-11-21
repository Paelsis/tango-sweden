import request from 'superagent'
import moment from 'moment-with-locales-es6'
import getStyle from './getStyle'
import {serverFetchDataResult} from './serverFetchDataResult'

export function getUser (irl, callback) {
  moment.locale(CULTURE(language))
  serverFetchDataResult(irl,  user => callback(user))
}

