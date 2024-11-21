import React, {useEffect, useState} from 'react';
import { useSharedState } from '../store';
import { COLORS, SHOE_RADIO_VALUES} from '../services/const'
import { serverFetchData } from '../services/serverFetch';
import { uniqueList } from '../services/functions';
// import './Djs.css';
import FormTemplate from '../components/FormTemplate'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const styles = {
    container:{
        style:'absolute',
        top:0,
        width:'100%',
        minHeight:'100vh',
        textAlign:'center',
        backgroundColor:COLORS.BLACK,
        color:COLORS.YELLOW
    },
    button:{
        color:'COLORS.BLACK',
        borderColor:'COLORS.BLACK'
    },
    header:{
        color:COLORS.YELLOW
    },
    text:{
        textAlign:'left',
        color:COLORS.WHITE
    }
}

const getLabel = (radioValues, value) => {
    const record  = radioValues.find(it=>it.value === value) 
    return record?record.label?record.label:value:value
}

// Shoes
export default () => {
    const [sharedState, ] = useSharedState()
    const [value, setValue] = useState()
    const [list, setList] = useState([])
    const [labels, setLabels] = useState([])

    const handleReply = reply => {
        if (reply.status === 'OK') {
            const lst = reply.result.filter(it=>it.publish==1)
            setList(lst)
            const threads = 
            setLabels(uniqueList(lst.filter(it=>it.thread).map(it => it.thread?it.thread:undefined)))
        } else {
            alert(reply.message)
        }
    }

    useEffect(()=>{
        const tableName = 'tbl_shoe'
        const irl = '/fetchRows?tableName=' + tableName // + '&email=' + sharedState.email
        serverFetchData(irl,  handleReply)
    }, [])

    return(
        <div style={styles.container}>
            <h1 style={styles.header}>
                Tango shoes
            </h1>    
            <div className='columns is-centered'>
                {labels?
                    labels.map(it=>
                        <div className='column is-half' >
                            <h2 style={styles.header}>{getLabel(SHOE_RADIO_VALUES, it)}</h2>
                            <ul style={{listStyle:'none'}}>
                                {list?list.filter(li=>li.thread===it).map(it=>
                                    <li onClick={()=>setValue(it.story)}>{it.title?it.title:''}</li>
                                ):''}
                            </ul>
                        </div>
                    )
                :
                    null    
                }
            </div>
            {value?
                <div className='columns is-centered'>
                    <div className='column is-half has-white-text' 
                        style={styles.text} 
                        dangerouslySetInnerHTML={{__html:value}}
                    />
                </div>
            :null}
        </div>
    )
}
