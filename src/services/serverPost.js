import axios from 'axios'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const serverPost = (irl, username, password, data, handleReply) => {
    const url = irl.slice(0,4).toLowerCase().localeCompare('http')===0?irl:apiBaseUrl + irl
    console.log('--- serverPost --- url:', url, ' data:', data);
    axios.post(url, data, {auth: {username, password}})
    .then(response => {
        const status = response.status?response.status:'No status'
        if (response.status === 200) {
            if (response.data.status) {
                if (response.data.status ==='OK') {
                    // statusMessage(STATUS_OK, 'OK: database modified successfully (response.data.status=' + response.data.status + 'JSON:'+ JSON.stringify(response.data) + ')');
                    console.log('response', response)
                } else {
                    console.log('response', response)
                }    
            } else {
                console.log('response', response)
            }
        } else {    
            console.log('WARNING: serverPost responed back status code:', response.status);
        }    
        handleReply(response.data);
    })
    .catch((e) => {
        console.log('ERROR: Failed in function serverPost for url ', url);
        console.log('Error message:', e); // Error
        handleReply({code:501, status:'ERROR', message:'ERROR: No response when calling irl:' + irl + ' url:' + url});
    });
}

export default serverPost;

