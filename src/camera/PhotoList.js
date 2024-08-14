import React, {useState, useEffect} from 'react'
import {serverFetchData} from '../services/serverFetch'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SaveIcon from '@mui/icons-material/Save';
import Rotate90DegIcon from '@mui/icons-material/RotateRight'
import serverPost from '../services/serverPost'
import Button, { buttonClasses } from '@mui/material/Button';
import withStatusLine from '../components/withStatusLine'
import {STATUSLINE_STYLE} from '../services/const'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
const BUTTON_COLOR={DEFAULT:'#888', OK:'green', PROCESSING:'lightGreen', WARNING:'orange', ERROR:'red'}

// PhotoList
const Func = props => {
        const {subdir, list, setList, matching, setStatusLine} = props; // If matching is among calling parameters, then only files matching this string is is shown
        const [buttonColor, setButtonColor] = useState(BUTTON_COLOR.DEFAULT)

        const styles = {
                button:{color:buttonColor, width:45, height:45, padding:0, border:0},
        }

        const handleReplyFetchData = data => {
                if (data.status === 'OK') {
                    if (matching) {
                        const newlist = data.result.filter(it=>it.fname.includes(matching) && !it.fname.includes('_thumb'))
                        setStatusLine('Fetch of'  + newlist.length + ' rows successful', STATUSLINE_STYLE.OK, 2000) 
                        setList(newlist)
                    } else {
                        setStatusLine('Fetch of'  + data.result.length + ' rows successful', STATUSLINE_STYLE.OK, 2000) 
                        setList(data.result)
                    }        
                } else {
                    alert('ERROR PhotoList:' +  JSON.stringify(data)) 
                }        
        }        


        useEffect(()=>{
                // Fetch the list of images from subdir in sorted order with latest mdate put first
                const irl='/listData?subdir=' + (subdir?subdir:'')
                /* setList([]) */
                serverFetchData(irl, '', '', handleReplyFetchData)
        },[subdir])

        const handleReply = reply =>{
                if (reply) {   
                    if (reply.status==='OK') {
                        setStatusLine('Delete successful', STATUSLINE_STYLE.OK, 2000) 
                    } else {
                        alert('Delete/Rotate failed. Message, status:' + reply.status + ' message:' + (reply.message?reply.message:'No message'))     
                    }
                } else {
                    alert('handleReply: ERROR: No reply from serverPost')     
                }    
            }
    

        const handleDelete = index => {
                const newList = list.map((it,idx)=>{
                        if (idx === index) {
                                return({...it, delete:it.delete?false:true})
                        } else {
                                return it
                        }
                })        
                const url = apiBaseUrl + '/removeOrRotateImages'
                const files = newList
                serverPost(url, '', '', {subdir, files}, handleReply)

        }

        const handleRotate = index => {
                const newList = list.map((it, idx)=>{
                        if (idx === index) {
                                return({...it, rotate:(it.rotate && it.rotate !== 360)?it.rotate+90:90})
                        } else {
                                return it
                        }
                })        
                setButtonColor(BUTTON_COLOR.PROCESSING)
                const url = apiBaseUrl + '/removeOrRotateImages'
                const files = newList
                serverPost(url, '', '', {subdir, files}, handleReply)
        }

        const path = apiBaseUrl + (subdir?('/'+subdir+'/'):'/') 
        return (
                <div className='column is-8'>
                        <div className="columns is-centered is-flex-wrap-wrap">
                                {list.map((li, idx) =>
                                        <div key={idx} className='column is-narrow is-full'>
                                                <img src={path + li.fname} style={{transform:li.rotate?"rotate(" + li.rotate + "deg)":undefined}} alt={path + li.fname} />
                                                <p/>
                                                <small>{path + li.fname}</small>   
                                                {li.delete?
                                                        <DeleteForeverIcon style={{color:'orange', fontSize:18}} onClick={()=>handleDelete(idx)} />     
                                                :        
                                                        <DeleteIcon style={{fontSize:16, opacity:0.3}} onClick={()=>handleDelete(idx)} />     
                                                }        
                                        </div>        
                                )}
                        </div>
                </div>

        )
}

export default withStatusLine(Func)

