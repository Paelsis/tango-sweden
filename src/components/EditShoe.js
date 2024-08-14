import React, {useEffect, useState} from 'react';
import { useSharedState } from '../store';
import { SHOE_RADIO_VALUES } from '../services/const'
import { removeAllDraftVariables, enhanceValueWithDraftVariables } from './DraftEditor';
import {serverFetchData} from '../services/serverFetch'
import serverPost from '../services/serverPost'
import firebaseApp from '../services/firebaseApp'
import { getAuth, onAuthStateChanged} from 'firebase/auth'

// import './Djs.css';
import FormTemplate from './FormTemplate'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const styles = {
    container:{
        style:'absolute',
        top:0,
        width:'80%',
        minHeight:'100vh',
        textAlign:'left',
        margin:20,
    },
    button:{
        color:'COLORS.BLACK',
        borderColor:'COLORS.BLACK'
    }
}

const fields = [
    {
        type:'radio',
        label:'Discussion thread',
        name:'thread',
        radioValues:SHOE_RADIO_VALUES, // objects
        required:true,
        tooltip: 'The thread where you want your story located',
        maxLength:200

    },
    {
        type:'text',
        label:'Title',
        name:'title',
        required:true,
        tooltip: 'The titel of your story',
        maxLength:1000,
    },
    {
        type:'draft',
        label:'Story',
        name:'story',
        required:true,
        maxLength:65000,
        tooltip: 'The story you want to tell (max 65000 chars, i.e. about 20 A4-pages)',
    },
    {
        type:'number',
        label:'Sequence number',
        name:'sortOrder',
        tooltip: 'Sequence number in which the story is shown on page (if empty, latest story is shown first)',
    },
    {
        type:'checkbox',
        label:'Publish',
        name:'publish',
        tooltip: 'If checked, the story will be published at tangosweden.se',
    },
]


// Shoes
export default () => {
    const [userSettings, ] = useSharedState()
    const [email, setEmail] = useState()
    const [list, setList] = useState([])
    const [value, setValue] = useState({})
    const [edit, setEdit] = useState()

    const handleReply = reply => {
        if (reply.status === 'OK') {
            setList(reply.result.filter(it=>it.email === email))
        } else {
            alert(reply.message)
        }
    }

    useEffect(()=>{
        const auth = getAuth()
        onAuthStateChanged(auth, user => {
            if (user?user.email:false) {
              setEmail(user.email);
              const tableName = 'tbl_shoe'
              const irl = '/fetchRows?tableName=' + tableName // + '&email=' + email
              serverFetchData(irl, '', '', handleReply)
            }  
          })
    }, [])

    const handleReplySave = reply => {
        if (reply.status === 'OK') {
            if (reply.rows) {
                alert('Saved with id:' +  reply.id)
                setList(reply.rows.filter(it=>it.email===email).sort((a,b)=>b.creaTimestamp.localeCompare(a.creaTimestamp)))
                setValue({})
                setEdit(undefined)
            } else {
                const id = reply.id 
                const record = {id, ...value}
                setList([record, ...list.sort((a,b)=>b.creaTimestamp.localeCompare(a.creaTimestamp))])
            }    
        } else {
            alert(reply.message)
        }
    }

    const handleSave = () => {
        const irl = '/replaceRow'
        const record = {...removeAllDraftVariables(value), email}
        serverPost(irl, '', '', {tableName:'tbl_shoe', record, fetchRows:true}, handleReplySave)
    }


    const handleReplyDelete = reply => {
        if (reply.status === 'OK') {
            if (reply.rows) {
                setList(reply.rows.sort((a,b)=>b.creaTimestamp.localeCompare(a.creaTimestamp)))
            } 
        } else {
            alert(reply.message)
        }
    }

    const handleDelete = it => {
        const irl = '/deleteRow'
        serverPost(irl, '', '', {tableName:'tbl_shoe', id:it.id, fetchRows:true}, handleReplyDelete)
    }

    const handleClear = () => {
        setValue({})
        setEdit(undefined)
    }

    const buttons=[
        {
            type:'button',
            label:'Save',
            style:styles.button,
            validate:true,
            handleClick:handleSave
        },    
        {
            type:'button',
            label:'Clear',
            style:styles.button,
            handleClick:handleClear
        },    
    ]
    const handleEdit = it => {
        setValue(enhanceValueWithDraftVariables(fields, it))
        setEdit(it.id)
    }

    const renderForm = () => 
        <div className='columns m-6 is-centered'>
            <div className='column is-18'>
                <FormTemplate 
                    fields={fields} 
                    value={value}
                    setValue={setValue}
                    setList={setList} 
                    buttons={buttons}
                />
            </div>
        </div>


    return(
        email?
        <div style={styles.container}>
            {!edit?renderForm():null}
            <table style = {{margin:'auto'}}>
                <thead>
                    <th>Sort Order</th>
                    <th>Title</th>
                    <th>Story</th>
                    <th colSpan={2}>Buttons</th>
                </thead>    

                <tbody>
                {list.map(it =>
                    <tr style={{color:it.publish==1?'green':'red', opacity:it.publish==1?1.0:0.5}}>
                        {edit===it.id?
                            <td colSpan={3}>
                                {renderForm()}
                            </td>
                        :
                            <>    
                                <td>{it.sortOrder?it.sortOrder:'-'}</td>
                                <td>{it.title}</td>
                                <td><div dangerouslySetInnerHTML={{__html:it.story}} /></td>
                            </>
                        }
                        <td>
                            <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 0 }}
                            onClick={()=>handleEdit(it)}
                            >
                                <EditIcon/>
                            </IconButton>    
                        </td>
                        <td>
                            <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 0 }}
                            onClick={()=>handleDelete(it)}
                            >
                                <DeleteIcon />
                            </IconButton>    
                        </td>
                    </tr>
                )}
                </tbody>
            </table>    
        </div>
        :null
    )
}
