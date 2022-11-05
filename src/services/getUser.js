import request from 'superagent'
import moment from 'moment-with-locales-es6'
import getStyle from './getStyle'
import serverFetch from './serverFetch'

export function getUser (irl, callback) {
  moment.locale(CULTURE(language))
  serverFetch(irl, '', '', user => callback(user))
}

