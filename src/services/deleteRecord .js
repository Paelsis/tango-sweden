

import {serverPost} from './serverPost'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
const url = apiBaseUrl + '/deleteRecord'


export default (table, record, handleReply) => {
    serverPost(url,  {table, record}, handleReply)
}    

