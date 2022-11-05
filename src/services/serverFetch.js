import axios from 'axios'
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export default function (irl, username, password, handleResult) {
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
        const result = response.data?response.data.result?response.data.result:undefined:undefined
        if (result === undefined) {
            alert('No result found in responsre' + JSON.stringify(response.data))
        }
        handleResult(result);
    })
    .catch(e => {
        const errorMessage = 'url=' + url + ' ERROR:' + JSON.stringify(e)
        // alert(errorMessage)
        console.log('(function: functions/fetch) Error message:', errorMessage);
        handleResult([]);
    });
}


