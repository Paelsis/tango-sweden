import React, {useState, useEffect} from 'react';
import  {Component } from 'react'
import FormTemplate from '../components/FormTemplate';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom'
import moment from 'moment-with-locales-es6'
import { textAlign } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';
import { AirlineSeatReclineExtra, Description } from '@mui/icons-material';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import serverPost from '../services/serverPost'


const styles={
    container:{
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth:'100%'   
    },
    button:{
        color:'black',
        border:'1px solid red'
    }    

  }
  

const fields = [
    {
        type:'checkbox',
        label:'Change all occurances (default change only single)',
        name:'changeAll',
        tooltip:'Change all events that was creted with this eventId'
    },
    {
        type:'text',
        label:'Title',
        name:'title',
        required:true,
    },
    {
        type:'company',
        label:'Company (ex:Camarin)',
        name:'company',
        required:true,
    },
    {
        type:'checkbox',
        label:'Hide location and time in popup window',
        name:'hideLocationAndTime',
        tooltip:'Hide the location and time in popup window'
    },
    {
        type:'textarea',
        label:'Description',
        name:'description',
        required:true,
    },
    {
        type:'text',
        label:'Location',
        name:'location',
        hiddenIf:'hideLocationAndTime'
    },
    {
        type:'datetime-local',
        label:'Start date and time',
        name:'startDateTime',
        required:true,
        hiddenIf:'changeAll',
        tooltip:'Change start date and time for single event'
    },
    {
        type:'datetime-local',
        label:'End date and time',
        name:'endDateTime',
        required:true,
        hiddenIf:'changeAll',
        tooltip:'Change end date and time for single event'
    },
    {
        type:'time',
        label:'Start time',
        name:'startTime',
        required:true,
        notHiddenIf:'changeAll',
        tooltip:'Change start time on all events'

    },
    {
        type:'time',
        label:'End time',
        name:'endTime',
        required:true,
        notHiddenIf:'changeAll',
        tooltip:'Change end time on all events'
    },
]

  
export default (state) => {
   const navigate = useNavigate() 
   const location = useLocation();
   const event = location.state?location.state:undefined
   const originalStartDateTime=location.state?location.state.startDateTime:undefined
   const handleReply = reply => {
        reply.status==='OK'?navigate('/malmo'):reply.message?alert(reply.message):alert('ERROR with no reply message')     
   }
   const handleSubmit = (e, value) => {
        const irl = '/updateEvent'
        const hideLocationAndTime = value['hideLocationAndTime']?1:0
        e.preventDefault();
        if (moment(value.startDateTime) > moment(value.endDateTime)) {
            alert('WARNING: End of the event must be set later than start of the event. Please check dates and times.')
            return
        }
        serverPost(irl, '', '', {...value, originalStartDateTime, hideLocationAndTime}, handleReply)
   }    

   const adjustEvent = event => {
        return {...event,
            startTime:event.startDateTime.substring(11, 16), 
            endTime:event.endDateTime.substring(11,16), 
            startDateTime:event.startDateTime.substr(0,16),
            endDateTime:event.endDateTime.substr(0,16),
        }
   }
        
   return (
        <div style={styles.container}>
        {event?
            <>
                <FormTemplate 
                    fields={fields} 
                    init={adjustEvent(event)} 
                    handleSubmit={handleSubmit}
                    submitTooltipTitle={'Update calendar'}
                    submitButtonText={'UPDATE'}
                    update={true}
                />
            </>
        :
            <h4>Cannot update with no event</h4>
        }        
        </div>
    )
}
