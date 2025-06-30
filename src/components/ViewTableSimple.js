// _View uses id and not index to identify a row
const styles = {
    table:{
        padding:10
    },
    td:{
        padding:5
    }

    

}

export default ({list, cols, sortCol})=> {
    const compareFunc = (a, b) => {
        if (a[sortCol] && b[sortCol]) {
            if (typeof a[sortCol] === 'string' && typeof b[sortCol] === 'string') {
                return a[sortCol].localeCompare(b[sortCol]) 
            } else {    
                return a[sortCol] - b[sortCol] 
            }    
        } else if (a[sortCol]) {
            return (-1)
        } else {
            return (-1)
        }
    }    
    const sortedList = sortCol?list.sort(compareFunc):list
    return(
        cols?
                <table>
                    <tbody >
                        {sortedList.map(li=>
                            <tr>
                                {cols.map(col=>
                                    <td style={styles.td}>
                                        {
                                                (typeof li[col] == "boolean")?(li[col]?'true':'false')
                                                :(typeof li[col] == "string")?<div dangerouslySetInnerHTML={{__html: li[col]}} /> 
                                                :li[col] === null?'-'
                                                :li[col]
                                        }
                                    </td>
                                )}    
                            </tr>
                        )}
                    </tbody>
                </table>
    :
        <h1>No colsView</h1>  
    )   
}
