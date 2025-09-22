import axios from 'axios'

const username = process.env.REACT_APP_SLIM_USERNAME
const password = process.env.REACT_APP_SLIM_PASSWORD
const axiosConfig = {
    auth : {username, password}
}

// serverPostApi
const serverPostApi = (apiBaseUrl, irl,  record, handleReply) => {
    const url = irl.slice(0,4).toLowerCase().localeCompare('http')===0?irl:apiBaseUrl + irl
    axios.post(url, record, axiosConfig)
    .then(reply => {
        const data = reply.data?reply.data:reply
        if (data) {
            if (data.status ==='OK') {
                // Controlled OK reply
                //const message = '[serverPostApi] status:OK data:' + JSON.stringify(data)
                handleReply(data);
            } else if (data.status ==='WARNING'){
                // Controlled ERROR reply
                // const message = '[serverPostApi] status:' + data.message?data.message:'No message ???'
                handleReply(data);
            } else if (data.status ==='ERROR'){
                // Controlled ERROR reply
                const message = '[serverPostApi] status:' + data.message?data.message:'No message ???'
                alert(message)
            } else {
                // Uncontrolled ERROR reply
                const message = '[serverPostApi] Uncontrolled error with no status. data:' + JSON.stringify(data) 
                alert(message)
            }   
        } else {
            const message = '[serverPost] ERROR: serverPostApi failed. No data.' 
                + ' url:' + url +  ' record:' + JSON.stringify(record);
            alert(message)
        }
    })
    .catch((e) => {
        const message = '[serverPost] ERROR: axios.post falied for url:' + url + ' message:' + e?.message
        alert(message)
    });
}

// addRowApi
export const addRowApi = (apiBaseUrl, tableName, row, handleReply) =>
{
    const irl = '/replaceRow'
    const value = {
        tableName,
        table:tableName,
        data:row,
    }  

    serverPostApi(apiBaseUrl, irl, value, handleReply)
}

// replaceRowApi
export const replaceRowApi = (apiBaseUrl, tableName, record, handleReply) =>
{
    const irl = '/replaceRow'
    const value = {
        tableName,
        record,
        fetchRows:true, 
    }  
    serverPostApi(apiBaseUrl, irl, value, handleReply)
}

// deleteRowApi
export const deleteRowApi = (apiBaseUrl, tableName, id, handleReply) =>
{
    const url=apiBaseUrl + '/deleteRow'
    const value = {
        tableName,
        table:tableName, 
        id
    }  
    serverPost(url, value, handleReply)
}

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export const serverPost = (irl,  record, handleReply) => serverPostApi(apiBaseUrl, irl, record, handleReply)
export const replaceRow = (tableName, record, handleReply) => replaceRowApi(apiBaseUrl, tableName, record, handleReply)
export const deleteRow = (tableName, id, handleReply) => deleteRowApi(apiBaseUrl, tableName, id, handleReply)


