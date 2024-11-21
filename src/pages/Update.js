import React, {useState, useEffect} from 'react';
import { useSharedState } from '../store';
import FormTemplate from '../components/FormTemplate';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom'
import moment from 'moment-with-locales-es6'
import { useNavigate } from "react-router-dom";
import {serverPost} from '../services/serverPost'
import { BUTTON_STYLE, MAX_LENGTH_DESC } from '../services/const';
import Square from '../components/Square'
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


const development = process.env.NODE_ENV === 'development'
  
const fields = [
    {
        type:'checkbox',
        label:'Change all events in the same group',
        name:'changeAll',
        tooltip:'Change the whole list of events that you established with "Add" + "Send to calender" button'
    },
    {
        type:'checkbox',
        label:'Update event with latest settings',
        name:'updateWithSettings',
        tooltip:'Update this event with colors of the values un Settings'
    },
    {
        type:'text',
        label:'Title',
        name:'title',
        required:true,
        tooltip:'The event title shown in the calendar',
    },
    {
        type:'checkbox',
        label:'Hide location and time in popup window',
        name:'hideLocationAndTime',
        tooltip: 'Check this box if you want to hide the location and time in the popup windo when clicking at event'
    },
    {
        type:'text',
        label:'Location',
        name:'location',
        hiddenIf:'hideLocationAndTime',
        tooltip: 'Location of the event'

    },
    {
        type:'datetime-local',
        label:'Start date and time',
        name:'startDateTime',
        required:true,
        hiddenIf:'changeAll',
        tooltip:'Start date and time of the single event'
    },
    {
        type:'datetime-local',
        label:'End date and time',
        name:'endDateTime',
        required:true,
        hiddenIf:'changeAll',
        tooltip:'End date and time for the single event'
    },
    {
        type:'time',
        label:'Start time',
        name:'startTime',
        required:true,
        notHiddenIf:'changeAll',
        tooltip:'Change start time in all events of the series created at the same occation'

    },
    {
        type:'time',
        label:'End time',
        name:'endTime',
        required:true,
        notHiddenIf:'changeAll',
        tooltip:'Change end time in all events of the series created at the same occation'
    },
    {
        type:'checkbox',
        label:'Use HTML-editor',
        name:'htmlEditor',
        tooltip: 'If you want to write your Description in html instead of using the editor, check this box'
    },
    {
        // type:'rte',
        type:'draft',
        label:'Description',
        name:'description',
        draftName:'draft_description',
        required:true,
        hiddenIf:'htmlEditor',
        tooltip:'The description shown whenever you click at an event in the calendar',

    },
    {
        name:'description',
        label:'Description',
        type:'textarea',
        required:false,
        notHiddenIf:'htmlEditor',
        tooltip:'The description given as html',
        maxlength:65000,
    },
    {
        name:'facebookEventLink',
        label:'Facebook event link',
        type:'text',
        maxLength:200,
        tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
        hiddenIf:'facebookEventId',
    },
    {

        name:'facebookEventId',
        label:'Facebook event id',
        type:'number',
        tooltip:'The facebook event id (Ex: 1123264745523165)',
        maxLength:20,
        hiddenIf:'facebookEventLink',
    },
    {
        type:'checkbox',
        label:'Use registration button',
        name:'useRegistrationButton',
        tooltip:'If you want a registration button and save registrations for the event',
        notHiddenIf:'useRegistrationButton',
    },    
    {
        type:'email',
        label:'E-mail of respoinsible organizer',
        name:'email',
        tooltip:'E-mail that will recieve the confirmation mails from the registrations',
        notHiddenIf:'useRegistrationButton',
    },    
    {
        type:'number',
        label:'Maximum number of registrants',
        style:{width:40},
        name:'maxLimit',
        min:1, 
        max:500,
        notHiddenIf:'useRegistrationButton',
        tooltip: 'Maximum number of registrants for this event. Registration not possible when max is reached.'
    },
]


  
export default () => {
    const [sharedState, ] = useSharedState()
    const [value, setValue] = useState()
    const [buttonStyle, setButtonStyle] = useState()
    const navigate = useNavigate() 
    const location = useLocation();
    const event = location.state

    console.log('Update: value = ', value)
    const adjustEvent = ev => {
        if (ev) {
            const extendedEvent = {
                ...ev,
                id:undefined,
            }    
            return extendedEvent
        } 
    }

    useEffect(()=>{
        setValue(adjustEvent(event))
    }, [])

    const handleReply = reply => {
        setButtonStyle(BUTTON_STYLE.SAVED)
        if (reply.status==='OK') {
            setButtonStyle(BUTTON_STYLE.SAVED)
            setTimeout(() => {
                navigate('/calendar/' + sharedState.region)    
        }, 500);
    
        } else {
            setButtonStyle(BUTTON_STYLE.ERROR)
            setTimeout(() => alert('ERROR:' + reply.message), 5000);
        }     
    }
    const handleUpdate = () => {
        setButtonStyle(BUTTON_STYLE.CLICKED)

        if (moment(value.startDateTime) > moment(value.endDateTime)) {
            alert('WARNING: End of the event must be set later than start of the event. Please check dates and times.')
            return
        }

        if (value.description?value.description.length > MAX_LENGTH_DESC:false) {
            alert('Warning: The length of description field is not allowed to exceed ' + MAX_LENGTH_DESC + ' characters')
            return
        }

        const backgroundImage = sharedState.backgroundImage?sharedState.backgroundImage:""
        const settings = value.updateWithSettings?{
                ...sharedState, 
                authLevel:sharedState.authLevelOverride?sharedState.authLevelOverride:sharedState.authLevel,
                backgroundImage
            }
        :
            {}


        const startDateTime = value.changeAll?undefined:value.startDateTime;
        const endDateTime = value.changeAll?undefined:value.endDateTime;
        const startTime = value.changeAll?value.startTime:undefined 
        const endTime = value.changeAll?value.endTime:undefined
        const data = {...value, ...settings, startDateTime, endDateTime, startTime, endTime, email:undefined, id:undefined} 

        console.log('Update Just before update with /updateEvent: data =', data)

        const irl = '/updateEvent'
        serverPost(irl,  data, handleReply)
    }    

    const handleReset = () => {setValue(adjustEvent(event))}

    const handleEmpty = () => {setValue({})}

    const buttons=[
        {
            type:'button',
            label:'Update',
            style:buttonStyle,
            handleClick:handleUpdate
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
            {value?    
                <div className='columns m-2 is-centered is-half'>
                    <div className="column is-5">
                        <FormTemplate 
                            fields={fields} 
                            value={value}
                            setValue={setValue}
                            buttons={buttons}
                        />
                    </div>
                    <div className='column is-1' >
                    </div>    
                    <div className='column is-2'>
                        <Square settings={value.updateWithSettings?sharedState:value} />
                        <p/><p/>
                        <small>email:{event.email}</small>
                    </div>
                </div>
            :
                null
            }
        </div>
   )
}

// {JSON.stringify(value)}
