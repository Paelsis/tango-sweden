export default function (column) {
    const columnType = column.Type.split('(')[0]
    switch(columnType) {
        case 'tinyint':
            return 'checkbox' 
        case 'interger':
            return 'number'
        case 'text':
            return 'textarea'
        case 'varchar':
            const length = column.Type.split('(')[1].split(')')[0]
            if (length > 1000) {
                return 'textarea'
            } else {
                return 'text' 
            }    
            break
        case 'varchar':
        default:
            return 'text'
    }        
}
