import axios from 'axios'
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

// serverFetchDataResult
export function serverFetchDataResult(irl, username, password, handleResult) {
    const url= irl.slice(0,4).toLowerCase().localeCompare('http')===0?irl:apiBaseUrl + irl
    console.log('fetch url:', url)
    axios({
        method: 'get',
        url,
        auth: {
            username,
            password,
        }
      })
    .then(response => {
        const status = response?response.data?response.data.status?response.data.status:undefined:undefined:undefined
        if (status?(status === 'OK' || status === 'WARNING'):false) {
            const result = response?response.data?response.data.result:undefined:undefined
            handleResult(result);
        } else {    
            const message = response.data.message?response.data.message:undefined
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

// serverFetchDataResult
export function serverFetchData(irl, username, password, handleReply) {
    const url= irl.slice(0,4).toLowerCase().localeCompare('http')===0?irl:apiBaseUrl + irl
    console.log('fetch url:', url)
    axios({
        method: 'get',
        url,
        auth: {
            username,
            password,
        }
      })
    .then(response => {
        const data = response?response.data?response.data:undefined:undefined
        if (data === undefined) {
            alert('[serverFetchData] ERROR: axios get call returned no data')
        } else {
            handleReply(data);
        }    
    })
    .catch(e => {
        if (e?!!e.message:false) {
            const errorMessage = 'url=' + url + ' e:' + JSON.stringify(e.message)
            console.log('[serverFerchData] Error message:', errorMessage);
            alert('[serverFerchData] ERROR: axios call failed, message:' + errorMessage)
        }
        handleReply(undefined);
    });
}

