import React, {useState, useEffect} from 'react'
import {serverFetchData} from '../services/serverFetch'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SaveIcon from '@mui/icons-material/Save';
import Rotate90DegIcon from '@mui/icons-material/RotateRight'
import serverPost from '../services/serverPost'
import Button, { buttonClasses } from '@mui/material/Button';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
const BUTTON_COLOR={DEFAULT:'#888', OK:'green', PROCESSING:'lightGreen', WARNING:'orange', ERROR:'red'}

// PhotoList
export default props => {
        const {subdir, list, setList} = props;
        const [buttonColor, setButtonColor] = useState(BUTTON_COLOR.DEFAULT)

        const irl='/listData?subdir=' + (subdir?subdir:'')

        const styles = {
                button:{color:buttonColor, width:45, height:45, padding:0, border:0},
        }

        const handleReplyFetchData = data => {
                if (data.status === 'OK') {
                    setList(data.result)
                } else {
                    alert('ERROR PhotoList:' +  JSON.stringify(data)) 
                }        
        }        


        useEffect(()=>{
                serverFetchData(irl, '', '', handleReplyFetchData)
        },[subdir])

        const handleDelete = index => {
                const newList = list.map((it,idx)=>{
                        if (idx === index) {
                                return({...it, delete:it.delete?false:true})
                        } else {
                                return it
                        }
                })        
                setList(newList)
        }

        const handleRotate = index => {
                const newList = list.map((it, idx)=>{
                        if (idx === index) {
                                return({...it, rotate:(it.rotate && it.rotate !== 360)?it.rotate+90:90})
                        } else {
                                return it
                        }
                })        
                setList(newList)
        }

        const handleReply = reply =>{
            if (reply) {   
                if (reply.status==='OK') {
                        // alert('Successful delete/rotate rotated: ' + reply.rotated + ' deleted: ' + reply.deleted + ' result:' + JSON.stringify(reply.result))
                        setList(reply.result)
                        setButtonColor(BUTTON_COLOR.OK)
                        setTimeout(() => setButtonColor(BUTTON_COLOR.DEFAULT), 3000);
                } else {
                        setButtonColor(BUTTON_COLOR.ERROR)
                        alert('Delete/Rotate failed. Message, status:' + reply.status + ' message:' + (reply.message?reply.message:'No message'))     
                        setTimeout(() => setButtonColor(BUTTON_COLOR.DEFAULT), 3000);
                }
            } else {
                alert('handleReply: ERROR: No reply from serverPost')     
            }    
        }


        const handleSubmit = () => {
                setButtonColor(BUTTON_COLOR.PROCESSING)
                const url = apiBaseUrl + '/removeOrRotateImages'
                const files = list
                serverPost(url, '', '', {subdir, files}, handleReply)
        }
        const path = apiBaseUrl + (subdir?('/'+subdir+'/'):'/') 
        return (
                <div className='column is-8'>
                        <div className="column is-12">
                                <SaveIcon style={styles.button} fontSize='large' onClick={handleSubmit} />
                        </div>
                        <div className="columns is-centered is-flex-wrap-wrap">
                                {list.map((li, idx) =>
                                        <div key={idx} className='column is-narrow is-2'>
                                                <img src={path + li.fname} style={{transform:li.rotate?"rotate(" + li.rotate + "deg)":undefined}} alt={path + li.fname} />
                                                <p/>
                                                <small>{path + li.fname}</small>   
                                                {li.delete?
                                                        <DeleteForeverIcon style={{color:'orange', fontSize:18}} onClick={()=>handleDelete(idx)} />     
                                                :        
                                                        <DeleteIcon style={{fontSize:16, opacity:0.3}} onClick={()=>handleDelete(idx)} />     
                                                }        
                                                {li.rotate?
                                                        <Rotate90DegIcon style={{color:'orange', fontSize:18}} onClick={()=>handleRotate(idx)} />     
                                                :     
                                                        <Rotate90DegIcon style={{fontSize:16, opacity:0.3}} onClick={()=>handleRotate(idx)} />     
                                                }          
                                        </div>        
                                )}
                        </div>
                </div>

        )
}


