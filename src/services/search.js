import {serverFetchData} from './serverFetch';

// search and pass a list of objects in the callack function handleReply
export const search = (tableName, value, handleReply) =>
{
    const searchValues = value?value:{}
    let link = ''
    let args =""
    Object.entries(searchValues).map(it=> {
        if (it[1]) {
            args += '&'
            args += it[0] +  '=' + it[1]
        }
    })
    if (tableName) {
        link = '/fetchRows?tableName=' + tableName + args
    } else {
        alert('No table name')
    }    
    serverFetchData(link, data=>{
        //alert(JSON.stringify(list))
        if (data.status === 'OK') {
            const list = data.result
            if (!!handleReply) {
                handleReply(list)
            } else {
                handleReply([])
            } 
        } else {     
            alert('ERROR:Failed to fetch data in search')
        }   
    })
}        

