import React, {useState, useEffect} from 'react';
import { useSharedState } from '../store';
import FormTemplate from '../components/FormTemplate';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom'
import moment from 'moment-with-locales-es6'
import { useNavigate } from "react-router-dom";
import serverPost from '../services/serverPost'
import AddEvent from '../components/AddEvent'
import { BUTTON_STYLE } from '../services/const';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import Square from '../components/Square'
import {enhanceValueWithDraftVariables} from '../components//DraftEditor'
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
        label:'Change all occurances (default change only single)',
        name:'changeAll',
        tooltip:'Change all events that was creted with this eventId'
    },
    {
        type:'checkbox',
        label:'Update event with latest settings',
        name:'updateWithSettings',
        tooltip:'Change colors of the latest updated ones in settings'
    },
    {
        type:'text',
        label:'Title',
        name:'title',
        required:true,
    },
    {
        type:'checkbox',
        label:'Hide location and time in popup window',
        name:'hideLocationAndTime',
        tooltip:'Hide the location and time in popup window'
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
    {
        type:'checkbox',
        label:'Use HTML-editor',
        name:'htmlEditor',
        tooltip: 'You can use the HTML-editor if you desire to use more advanced featurs with html for you description field'
    },
    {
        // type:'rte',
        type:'draft',
        label:'Description',
        name:'description',
        draftName:'draft_description',
        required:true,
        hiddenIf:'htmlEditor',
    },
    {
        type:'textarea',
        label:'Description',
        name:'description',
        required:false,
        notHiddenIf:'htmlEditor',
    },
    {
        type:'text',
        label:'Facebook event id',
        tooltip:'The facebook event id (A long digit number)',
        name:'facebookEventId',
    },
]


  
export default () => {
    const [userSettings, ] = useSharedState()
    const [value, setValue] = useState({})
    const [buttonStyle, setButtonStyle] = useState()
    const navigate = useNavigate() 
    const location = useLocation();

    const initEvent = () => {
        const event = location.state?location.state:{}
        const changeAll = event.changeAll
        const eventWithDraft = enhanceValueWithDraftVariables(fields, event)
        return( 
            {
                ...eventWithDraft,
                startDateTimeOriginal:changeAll?undefined:event.startDateTime.substring(0,16),
                startDateTime:changeAll?undefined:event.startDateTime.substring(0,16),
                endDateTime:changeAll?undefined:event.endDateTime.substring(0,16),
            }
        )    
    }

    useEffect(()=>{
        if (location.state) {
            setValue(initEvent())
        } else {
            navigate('/home')
        }    
    }, [location.state])

    const handleReply = reply => {
        setButtonStyle(BUTTON_STYLE.SAVED)
        if (reply.status==='OK') {
            setButtonStyle(BUTTON_STYLE.SAVED)
            setTimeout(() => {
                navigate('/calendar/' + userSettings.region)    
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
        const backgroundImage = userSettings.backgroundImage?userSettings.backgroundImage:""
        const settings = value.updateWithSettings?{...userSettings, backgroundImage}:{}
        const startDateTime = value.changeAll?undefined:value.startDateTime;
        const endDateTime = value.changeAll?undefined:value.endDateTime;
        

        const data = {...value, ...settings, startDateTime, endDateTime, startTime:undefined, endTime:undefined} 

        // alert('handleUpdate:' + JSON.stringify(data))

        const irl = '/updateEvent'
        serverPost(irl, '', '', data, handleReply)
    }    

    const handleReset = () => {setValue(initEvent())}

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
            <div className='columns m-2 is-centered is-half'>
                <div className="column is-three-quarters">
                <FormTemplate 
                    fields={fields} 
                    value={value}
                    setValue={setValue}
                    buttons={buttons}
                />
                </div>
                <Square settings={value.updateWithSettings?userSettings:value} />
            </div>
        </div>
   )
}

// {JSON.stringify(value)}
