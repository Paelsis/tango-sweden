import React, {useState, useEffect} from 'react';
import { useSharedState } from '../store';
import FormTemplate from '../components/FormTemplate';
import {useLocation} from 'react-router-dom'
import moment from 'moment-with-locales-es6'
import { useNavigate } from "react-router-dom";
import {serverPost} from '../services/serverPost'
import { MAX_LENGTH_DESC, CALENDAR, CALENDAR_TYPE } from '../services/const';
import {QUILL_EDITOR} from '../services/const'

const styles={
    container:{
        paddingTop:30,
        textAlign:'left',
        maxWidth:1000,
        margin:'auto'
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

export const FORM_FIELDS = {
    PRIVATE_LESSON:[
        {
            type:'checkbox',
            label:'Change all events in group (special case)',
            name:'changeAll',
            tooltip:'Mark if you want to change all events in the group in one go',
        },
        {
            name:'location',
            label:'Location',
            type:'text',
            tooltip: 'Location of the event'
        },
        {
            type:'text',
            label:'Title',
            name:'title',
            required:true,
            tooltip:'The event title shown in the calendar',
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
            type:QUILL_EDITOR,
            label:'Description',
            name:'description',
            //draftName:'draft_description',
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
            tooltip:'The description in html format',
            maxlength:32768, // 2**15
            ref:null,
        },
        {
            name:'facebookEventLink',
            label:'Facebook event link',
            type:'text',
            maxLength:200,
            tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
        },
        {
            type:'checkbox',
            label:'Use registration button',
            name:'useRegistrationButton',
            tooltip:'If you want a registration button and save registrations for the event',
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
    ],
    DISKJOCKEY:[
        {
            type:'checkbox',
            label:'Change multiple events at one time (special case)',
            name:'changeAll',
            tooltip:'Mark only if you want to change multiple events in one go (list with more than 1 element)',
        },
        {
            name:'location',
            label:'Location',
            type:'text',
            tooltip: 'Name of venue and street address'
        },
        {
            type:'text',
            label:'Title',
            name:'title',
            required:true,
            tooltip:'The event title shown in the calendar',
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
            type:QUILL_EDITOR,
            label:'Description',
            name:'description',
            //draftName:'draft_description',
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
            tooltip:'The description in html format',
            maxlength:32768, // 2**15
        },
        {
            name:'facebookEventLink',
            label:'Facebook event link',
            type:'text',
            maxLength:200,
            tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
        },
        {
            type:'checkbox',
            label:'Use registration button',
            name:'useRegistrationButton',
            tooltip:'If you want a registration button and save registrations for the event',
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
    ],
    REGULAR:[ 
        {
            type:'checkbox',
            label:'Change multiple events at one time (special case)',
            name:'changeAll',
            tooltip:'Mark only if you want to change multiple events in one go (list with more than 1 element)',
        },
        {
            type:'text',
            label:'Title',
            name:'title',
            required:true,
            tooltip:'The event title shown in the calendar',
        },
        {
            name:'location',
            label:'Location',
            type:'text',
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
            type:QUILL_EDITOR,
            label:'Description',
            name:'description',
            required:true,
            hiddenIf:'htmlEditor',
            tooltip:'The description shown whenever you click at an event in the calendar',
            maxlength:32768, // 2**15
    
        },
        {
            type:'textarea',
            name:'description',
            label:'Description',
            required:false,
            notHiddenIf:'htmlEditor',
            tooltip:'The description in html format',
            maxlength:32768, // 2**15
        },
        {
            name:'facebookEventLink',
            label:'Facebook event link',
            type:'text',
            maxLength:200,
            tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
        },
        {
            type:'checkbox',
            label:'Use registration button',
            name:'useRegistrationButton',
            tooltip:'If you want a registration button and save registrations for the event',
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
}
  
export default () => {
    const [sharedState, setSharedState] = useSharedState()
    const [value, setValue] = useState()
    const navigate = useNavigate() 
    const location = useLocation()
    const event = location?.state?location.state:undefined
    const {calendarType, email} = event?event:{}
    const calendarEmail = email
    const fields = calendarType?FORM_FIELDS[calendarType]:[]

    useEffect(()=>{
        setValue(event)
    }, [])

    const handleReply = reply => {
        const calendarDate = value.startDateTime.substring(0,10)
        setSharedState({...sharedState, calendarDate})
        // alert(JSON.stringify(reply))
        if (reply.status==='OK') {
            setTimeout(() => {
               const addEmail = (calendarType !== CALENDAR_TYPE.REGULAR) 
               navigate('/calendar/' + sharedState.region + '/' + calendarType + (addEmail?'/' + email:''))   
            }, 500);
        } else if (reply.status ==='WARNING') {
            setTimeout(() => alert('WARNING:' + reply.message), 5000);
        } else {
            setTimeout(() => alert('WARNING:' + reply.message), 5000);
        }    
    }
    const handleSubmit = e => {
        e.preventDefault()


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

        //alert('[Update] id = ' + event.id)
        const data = {...value, startTime, endTime, email, tableName} 

        const irl = '/updateEvent'
        console.log('Update: data = ' +  JSON.stringify(data))
        serverPost(irl, data, handleReply)
    }    

    const handleReset = () => {setValue(event)}

    const handleEmpty = () => {setValue({})}

    const buttons=[
        {
            type:'submit',
            label:'Update',
        },    
        {
            type:'button',
            label:'Undo',
            handleClick:handleReset
        },    
        {
            type:'button',
            label:'Empty',
            handleClick:handleEmpty
        },    
    ]
            
    return (
        <div style={styles.container}>
            {!event?
                <div style={{textAlign:'center'}}>
                    <h2 style={{color:'orange'}}>
                        You have not chosen an event.
                    </h2>
                </div>
            :value?    
                <div className='columns p-2 is-centered is-half'>
                    <div className="column is-half">
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
