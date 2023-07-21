import React, {useState, useEffect} from 'react';
import serverPost from '../services/serverPost'
import SaveIcon from '@mui/icons-material/Save';
import EditIconOutlined from '@mui/icons-material/EditOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const styles={
    container: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth:'100%', 
    },
    button:{
        color:'black',
        border:'1px solid red'
    },
    tr:{
        borderBottom:'1px solid grey'

    },
    th:{
        padding:3
    },
    td:{
        padding:3
    }

}

  
export default props => {
    const [edit, setEdit] = useState([])
    const {searchFields, tableName, list, setList, fields, constants, handleStatus} = props;

        
    const handleReplySave = reply => {
        if (reply.status==='OK') {
            setEdit({})
            handleStatus({color:'white', backgroundColor:'green'}, 'Data sparade med id=' + reply.id)
        } else {
            handleStatus({color:'white', backgroundColor:'green'}, 'Fel vid sparande av data. Meddelande:' + JSON.stringify(reply))
        }    
    }    
    const handleSave = record => {
        let recordSave = {}
        if (fields) {
            fields.forEach(it => {
                if (record[it.name]!==undefined) {
                    recordSave = {...recordSave, [it.name]:record[it.name]}
                }
            })
            recordSave = {id:record.id?record.id:0, ...recordSave, ...constants}
            alert('Saving' + JSON.stringify(recordSave))
        } else {
            recordSave = record;
        }   

        serverPost('/replaceRow', '', '', {tableName:tableName, record:recordSave}, handleReplySave)
    }

    const handleReplyDelete = reply => {
        if (reply.status==='OK') {
            const id=reply.id
            
            if (reply.rows) {
                setList(reply.rows)
            } 
            handleStatus({color:'white', backgroundColor:'green'}, reply.message)
        } else {
            handleStatus({color:'white', backgroundColor:'green'}, 'Fel vid borttagande av kund. Meddelande:' + JSON.stringify(reply))
        }    
    }    
    const handleDelete = id => {
        let obj = list.find(it=>it.id)
        let text = "Tag bort bort id:" + id + " från tabellen. \n\nNamn:" + (obj?obj.namn?obj.namn:'Saknas':'Saknas') + '\n\nRecord:\n' + JSON.stringify(obj)
        // eslint-disable-next-line no-restricted-globals
        if (confirm(text)) {
            handleStatus({color:'white', backgroundColor:'green'}, 'Remove from table ' + tableName); 
            serverPost('/deleteRow', '', '', {tableName, 'id':id, 'fetchRows':true}, handleReplyDelete)
        }
    }

    const handleChange = (e, id) => setList(list.map(it=>{
        if (it.id===id) {
            return {...it,  [e.target.name]:e.target.value}
        } else {
            return it
        }    
    }
    ))
    const toggleEdit = id =>  {
        if (edit[id]===true) {
            setEdit({...edit, [id]:false})    
            if (handleSave) {
                const record = list.find(it=>it.id === id)
                handleSave(record)            
            }
        } else {
            setEdit({...edit, [id]:true})    
        }   
    }    

    const renderHeader = row => {
        return(
            searchFields?
                searchFields.map(fld=><th style={styles.th}>{fld.labelResult?fld.labelResult:fld.label?fld.label:fld.name}</th>)
            :<h4>No searchFields</h4>)    

    }    

    const handleClickLine = row => {
        if (!edit) {
            props.handleClickLine(row)
        }    
    }

    const renderRow = row => {
        return(
            searchFields?
                <tr style={styles.tr}>
                    {searchFields.map(fld=>
                        <>
                            {(edit[row.id]===true)?
                                <td style={styles.td} onClick={()=>handleClickLine(row)}>
                                    <input type='text' name={fld.name} value={row[fld.name]?row[fld.name]:null} onChange={e=>handleChange(e, row.id)} />
                                </td>
                            :
                                <td style={styles.td} onClick={()=>props.handleClickLine(row)}>
                                    {row[fld.name]?row[fld.name]:null}
                                </td>
                            }
                        </>
                    )}
                    {toggleEdit?
                        <td style={styles.td}>
                            {edit[row.id]===true?<SaveIcon onClick={()=>toggleEdit(row.id)} />:<EditIcon onClick={()=>toggleEdit(row.id)} />}
                        </td>
                    :
                        null        
                    }
                    {handleDelete?
                        <td>
                            <DeleteIcon onClick={()=>handleDelete(row.id)} />
                        </td>
                    :
                        null        
                    }
                </tr>
            :
                null
        )
    }

    const getLabel = name => {
        if (fields) {
            const found = fields.find(fld => fld.name===name)
            const label = found?found.name:name
            return label
        } else {
            return name
        }    
    }

    return (
        list?list.length > 0?
            <div>
                <>
                    <table style={{border:'5px solid lightGrey', borderStyle:'outset', margin:10, maxWidth:'50vh'}}>
                        <thead style={{bottomBorder:'1px solid lightGrey', borderStyle:'outset', margin:10}}>
                            {renderHeader(list[0])}
                        </thead>
                        <tbody style={{border:'1px solid lightGrey', borderStyle:'outset', margin:10}}>
                            {list.map(li=>
                                renderRow(li)
                            )}    
                        </tbody>
                    </table>
                </>
        </div>
        :
            null:null
    )
}


