import React, {useState, useEffect} from 'react';
import { useSharedState } from '../store';
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
import AddEvent from '../components/AddEvent'



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
        label:'Company (Only used by Malmö/Lund for default color values)',
        name:'company',
        tooltip:'If this value is set then the colors defined in the Settings page are disabled'
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

  
export default props => {
    const [userSettings, setUserSettings] = useSharedState()
    const [copy, setCopy] = useState()
    const navigate = useNavigate() 
    const location = useLocation();
    const event = location.state?location.state:undefined
    const originalStartDateTime=location.state?location.state.startDateTime:undefined
    const handleReply = reply => {
        reply.status==='OK'?navigate('/calendar/' + userSettings.calendarName):reply.message?alert(reply.message):alert('ERROR with no reply message')     
    }
    const handleSubmit = (e, value) => {
        const irl = '/updateEvent'
        const hideLocationAndTime = value['hideLocationAndTime']?1:0
        e.preventDefault();
        if (moment(value.startDateTime) > moment(value.endDateTime)) {
            alert('WARNING: End of the event must be set later than start of the event. Please check dates and times.')
            return
        }
        const data = {...value, ...userSettings, originalStartDateTime, hideLocationAndTime}
        // alert('data:' + JSON.stringify(data))
        serverPost(irl, '', '', data, handleReply)
    }    

    const handleCopy = value => {
            setCopy({...value, id:undefined})
    }    

    const handleCancel = () => setCopy(undefined)

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
            <h3>Calendar name: {userSettings.calendarName}</h3>
            {copy?
                <>
                <h3>Change in the copy below and save</h3>
                <AddEvent 
                    {...props}
                    init={copy} 
                    handleCancel={handleCancel}
                />
            </>
            :event?
                <>
                    <FormTemplate 
                        fields={fields} 
                        init={adjustEvent(event)} 
                        handleCopy={handleCopy}
                        handleSubmit={handleSubmit}
                        submitButtonLabel={'Update'}
                        submitTooltipTitle={'Update calendar'}
                        submitButtonText={'UPDATE'}
                        submitButtonColor='grey'
                        update={true}
                    />
                </>
            :
                <h4>Click on Update button of any event in the calendar</h4>
            }        
        </div>
   )
}
