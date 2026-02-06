import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const username = process.env.REACT_APP_SLIM_USERNAME
const password = process.env.REACT_APP_SLIM_PASSWORD
const auth = {username, password}
const axiosConfig = {
    auth,
}

export const serverPost = (irl, indata, handleReply) => {
    const url = irl.includes(API_BASE_URL)?irl:API_BASE_URL + irl
    axios.post(url, indata, axiosConfig).then(response => {
        const data = response.data?response.data:response
        if (data) {
            const status = data.status?data.status:'Unknown status'
            if (status === 'OK') {
                handleReply(data);
            } else if (status === 'WARNING') {
                const message = 'WARNING [serverPost]:\n\n' + (data.message?data.message:"No message in warning reply from axios.post for url=$url")
                alert(message)
                handleReply(data);
            } else {
                const message = status + ' [serverPost]:\n\nProblem in reply from axios.post url:' 
                + url + '\nstatus:' + status + '\nmessage:' + (data.message?data.message:JSON.stringify(data))
                alert(message)
            }    
        } else {    
            const message = 'ERROR [serverPost]:\n\nNo data in reply from axios.post url:' + url + '\n\nindata:' + JSON.stringify(indata) 
            alert(message)
        } 
    })
    .catch(e => {
        const message = '[serverPost] Fatal error in reply from axios post from from url:' 
        + url + '\nindata:' + JSON.stringify(indata) + '\nerror:' + JSON.stringify(e?e.message?e.message:e:'No message')
        alert(message)
    });
}

export const addRow= (table, data, handleReply) =>
{
    const irl = '/admin/replaceRow'
    const indata = {
        table,
        data
    }  

    serverPost(irl, indata, handleReply)
}

export const replaceRow = (table, data, handleReply) =>
{
    const irl = '/admin/replaceRow'
    const indata = {
        table,
        data
    }  
    serverPost(irl, indata, handleReply)
}

export const replaceRowReturnList = (table, data, handleReply) =>
{
    const irl = '/admin/replaceRow'
    const indata = {
        table,
        data,
        fetchAll:true
    }  
    serverPost(irl, indata, handleReply)
}

export const updateRow = (table, data, handleReply) =>
{
    const irl = '/admin/updateRow'
    const indata = {
        table,
        data,
        id:data.id,
    } 
    serverPost(irl, indata, handleReply)
}

export const updateRowReturnList = (table, data, handleReply) =>
{
    const irl = '/admin/updateRow'
    const indata = {
        table,
        data,
        id:data.id,
        fetchAll:true
    } 
    serverPost(irl, indata, handleReply)
}

export const deleteRow = (table, id, handleReply) =>
{
    const irl='/admin/deleteRow'
    const indata = {
        table, 
        id
    }  
    serverPost(irl, indata, handleReply)
}
