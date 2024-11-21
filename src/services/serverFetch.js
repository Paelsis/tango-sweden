import axios from 'axios'
const username = process.env.REACT_APP_SLIM_USERNAME
const password = process.env.REACT_APP_SLIM_PASSWORD
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const auth = {
    username,
    password,
}

// serverFetchDataResult
export function serverFetchDataResultApi(apiBaseUrl, irl, handleResult) {
    const url= irl.slice(0,4).toLowerCase().localeCompare('http')===0?irl:apiBaseUrl + irl
    console.log('fetch url:', url)
    axios({
        method: 'get',
        url,
        auth,
      })
    .then(response => {
        const data = response.data?response.data:response
        const status = data?.status?data.status:undefined
        if (status?(status === 'OK' || status === 'WARNING'):false) {
            handleResult(response?.data?.data.result);
        } else {    
            const message = response?.data?.message?response.data.message:undefined
            alert('[serverFetchDataResult]' + status?status:'NO STATUS' + ': No result found in response to ' + irl + ', message:' + message?message:'No message')
        } 
    })
    .catch(e => {
        if (e?!!e.message:false) {
            const errorMessage = 'url=' + url + ' e:' + JSON.stringify(e.message)
            alert(errorMessage)
            console.log('[serverFerchDataResult] ERROR: message =' , errorMessage);
        }
        handleResult(undefined);
    });
}

// serverFetchData
function serverFetchDataApi(apiBaseUrl, irl, handleReply) {
    const url = irl.slice(0,4).toLowerCase().localeCompare('http')===0?irl:apiBaseUrl + irl
    console.log('fetch url:', url)
    axios({
        method: 'get',
        url,
        auth,
      })
    .then(response => {
        const data = response?.data?response.data:response
        if (data) {
            if (data.status === 'OK' || data.status === 'true' || data.status) {
                //const message = '[serverFetchData] status:' + data.status + ' WARNING: data:' + JSON.stringify(data)
            } else {
                const message = '[serverFetchData] status:' + data.status + ' WARNING: data:' + JSON.stringify(data)
                alert(message)
                handleReply(data)
            }
            handleReply(data);
        } else {    
            const message = '[serverFetchData] No data for request url:' + url
            alert(message)
        } 
    })
    .catch(e => {
        if (e?!!e.message:false) {
            const errorMessage = 'url=<' + url + '> message:' + JSON.stringify(e.message)
            console.log('[serverFerchData] Error message:', errorMessage);
            alert('[serverFerchData] ERROR: axios call failed, message:' + errorMessage)
        }
    });
}

export const serverFetchDataResult = (irl, handleReply) => serverFetchDataResultApi(API_BASE_URL, irl, handleReply)
export const serverFetchData = (irl, handleReply) =>  serverFetchDataApi(API_BASE_URL, irl, handleReply)

