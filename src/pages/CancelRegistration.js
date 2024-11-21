import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {serverPost} from '../services/serverPost'


const apiBaseUrl=process.env.REACT_APP_API_BASE_URL;
const CANCEL_URL = apiBaseUrl + '/cancelRegistration';

const defaultStyle = {width:'90vw', marginLeft:'auto', marginRight:'auto', textAlign:'center', fontSize:20, color:'grey'}

//CancelRegistration
export default () => {
    const [style, setStyle] = useState(defaultStyle)
    const [cancel, setCancel] = useState()
    const [message, setMessage] = useState() 
    const params = useParams();
    const token = params?params.token:undefined
    const tableName = params?params.tableName:'tbl_registration_calendar'

    useEffect(()=>{
        setMessage(undefined)
        setCancel()
    }, [params.token])

    const handleReply = reply => {
        if (reply.status === 'OK') {
            setStyle({...style, color:'green'})
            setMessage(reply.message)
        } else if (reply.status === 'WARNING') {
            setStyle({...style, color:'orange'})
            setMessage(reply.message)
        } else {
            setStyle({...style, color:'red'})
            setMessage(reply.message?.reply.message?reply.message:'ERROR:Failed to cancel registration. Call respoinsible at tangosweden.se')
        }
    }

    useEffect(()=>{
        //eslint-disable-next-line
        if (confirm("Are you sure you want to cancel you registration (y/n) ?")) {
            setStyle({...style, color:'silver'})
            setMessage('Processing')
            const values = {token, tableName}
            serverPost(CANCEL_URL, values, handleReply);
        } else {
           setMessage('Your cancellation was ignored')
        }   
    }, [token, tableName])



    return(
        message?
            <div style={style}>
                {message}
            </div>
        :
            <div style={style}>
                Wait while deleting...
            </div>
    )

}

