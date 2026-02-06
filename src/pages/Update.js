import React, {useState, useEffect} from 'react';
import { useSharedState } from '../store';
import FormTemplate from '../components/FormTemplate';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom'
import moment from 'moment-with-locales-es6'
import { useNavigate } from "react-router-dom";
import {serverPost} from '../services/serverPost'
import { BUTTON_STYLE, MAX_LENGTH_DESC, CALENDAR, CALENDAR_TYPE } from '../services/const';
import Square from '../components/Square'
import {FORM_FIELDS} from '../services/formFields'
// import { generateEditorStateFromValue, emptyEditorState } from '../components/DraftEditor'

const styles={
    container:{
        paddingTop:30,
        display: 'flex',
        /*
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth:'100%'   
        */
    },
    button:{
        color:'black',
        border:'1px solid red'
    }    

}


  
export default () => {
    const [sharedState, setSharedState] = useSharedState()
    const [value, setValue] = useState()
    const [buttonStyle, setButtonStyle] = useState()
    const navigate = useNavigate() 
    const location = useLocation()
    const event = location?.state?location.state:undefined
    const {calendarType, email} = event?event:{}
    const calendarEmail = email
    const fields = calendarType?FORM_FIELDS[calendarType].UPDATE:[]



    useEffect(()=>{
        setValue(event)
    }, [])

    const handleReply = reply => {
        setButtonStyle(BUTTON_STYLE.SAVED)
        const calendarDate = value.startDateTime.substring(0,10)
        setSharedState({...sharedState, calendarDate})
        // alert(JSON.stringify(reply))
        if (reply.status==='OK') {
            setButtonStyle(BUTTON_STYLE.SAVED)
            setTimeout(() => {
               const addEmail = (calendarType !== CALENDAR_TYPE.REGULAR) 
               navigate('/calendar/' + sharedState.region + '/' + calendarType + (addEmail?'/' + email:''))   
            }, 500);
        } else if (reply.status ==='WARNING') {
            setButtonStyle(BUTTON_STYLE.WARNING)
            setTimeout(() => alert('WARNING:' + reply.message), 5000);
        } else {
            setButtonStyle(BUTTON_STYLE.WARNING)
            setTimeout(() => alert('WARNING:' + reply.message), 5000);
        }    
    }
    const handleSubmit = e => {
        e.preventDefault()

        // alert('[handleSubmit]:calendarType:' + calendarType)
        setButtonStyle(BUTTON_STYLE.CLICKED)

        /* When changeAll is set, we do not use startDateTime or endDateTime, only startTime and endTime */
        if (!value.changeAll) {
            if (moment(value.startDateTime) > moment(value.endDateTime)) {
                alert('WARNING: End of the event must be set later than start of the event. Please check dates and times.')
                return
            }
        }

        if (value.description?value.description.length > MAX_LENGTH_DESC:false) {
            alert('Warning: The length of description field is not allowed to exceed ' + MAX_LENGTH_DESC + ' characters')
            return
        }

        const backgroundImage = sharedState.backgroundImage?sharedState.backgroundImage:""
            
        const startTime = value.changeAll?value.startTime:undefined 
        const endTime = value.changeAll?value.endTime:undefined
        const tableName = CALENDAR[calendarType].TBL_CALENDAR
        const email = undefined // Do not update email
        const eventId = event.eventId

        //alert('[Update] id = ' + event.id)
        const data = {...value, startTime, endTime, email, tableName } 

        const irl = '/updateEvent'
        console.log('Update: data = ', JSON.stringify(data))
        serverPost(irl,  data, handleReply)
    }    

    const handleReset = () => {setValue(event)}

    const handleEmpty = () => {setValue({})}

    const buttons=[
        {
            type:'submit',
            label:'Update',
            style:buttonStyle,
        },    
        {
            type:'button',
            label:'Undo',
            style:buttonStyle,
            handleClick:handleReset
        },    
        {
            type:'button',
            label:'Empty',
            style:buttonStyle,
            handleClick:handleEmpty
        },    
    ]
            
    return (
        <div style={styles.container}>
            {!event?
                <div style={{textAlign:'center', width:'100vw'}}>
                <h1 style={{color:'red'}}>Update must be called with an event via route</h1>
                </div>
            :value?    
                <div className='columns m-2 is-centered is-half'>
                    <div className="column is-5">
                        <FormTemplate 
                            fields={fields} 
                            value={value}
                            setValue={setValue}
                            buttons={buttons}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            :
                null
            }
        </div>
   )
}

// {JSON.stringify(value)}
