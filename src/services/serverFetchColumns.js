import {extendedColumns} from './functions'
import { serverFetchData } from './serverFetch';

const serverFetchColumns = (tableName, setColumns) => {
    let url = "/admin/getColumns?tableName=" + tableName;

    const handleReply = data => {
        const status = data.status?data.status:'No status'
        if (status === 'OK') {
            setColumns(extendedColumns(data.result))
        } else {
            const message = data.message?data.message:'No message'
            alert('[serverFetchColumns] ' + status + ': ' + message);
        }
    }
    serverFetchData(url, handleReply)
}

export default serverFetchColumns

