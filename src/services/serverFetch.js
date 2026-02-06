import axios from 'axios'
const username = process.env.REACT_APP_SLIM_USERNAME
const password = process.env.REACT_APP_SLIM_PASSWORD
const auth = {username, password}
const axiosConfig = {
    auth,
}
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const alertMessage = (url, data, functionName) => {
    const status = data.status?data.status:'UNKOWN STATUS'
    const message = data.message?data.message:undefined;
    let alertMessage
    if (message) {
        alertMessage = '[' + functionName + ']\n' + status + ':' + message;    
    } else {   
        alertMessage = '[' + functionName + ']\n' + status +  '\nurl:' + url + '\njson:' + JSON.stringify(data)
    }    
    alert(alertMessage)
}            

// serverFetchDataResult
export const serverFetchDataResult =(irl, handleResult) => {
    const url= irl.includes(apiBaseUrl)?irl:apiBaseUrl + irl
 
    axios.get(url, axiosConfig).then((response) => {
        const data = response.data?response.data:response
        if (data) {
            const status = data.status?data.status:'Unkown status'
            if (status === 'OK') {
                handleResult(data.result);
            } else if (status === 'WARNING') {
                alertMessage(url, data, 'serverFetchDataResult')
                handleResult(data.result);
            } else {
                alertMessage(url, data, 'serverFetchDataResult')
            }    
        } else {    
            const result = data.result?data.result:'No result'
            const message = '[serverFetchDataResult] No data in reply from call to url:' + url  
            alert(message)
        } 
    }).catch(e => {
        const message = '[serverFetchDataResult] Fatal error in reply from url:' + url + 
        '\nmessage:' + (e.message?e.message:JSON.stringify(e))
        alert(message)
    });
}

// serverFetchData
export const serverFetchData = (irl, handleReply) => {
    const url= irl.includes(apiBaseUrl)?irl:apiBaseUrl + irl
    //alert('pre FETCH')
    axios.get(url, axiosConfig).then((response) => {
        //alert('post FETCH')
        const data = response.data?response.data:response
        if (data) {
            const status = data.status?data.status:'UNKOWN'
            if (status === 'OK') {
                handleReply(data);
            } else if (status === 'WARNING') {
                alertMessage(url, data, 'serverFetchData')
                handleReply(data);
            } else {
                alertMessage(url, data, 'serverFetchData')
            }    
        } else {    
            const message = '[serverFetchData]: No data in reply from url:' + url
            alert(message)
        } 
    }).catch(e => {
        const message = '[serverFetchData] Fatal error in reply from url:' + url + 
        '\nmessage:' + (e.message?e.message:JSON.stringify(e))
        alert(message)
    });
}



