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
    /*
    {
        type:'checkbox',
        label:'Update settings for this event',
        name:'updateSettings',
        tooltip:'Change colors for this particular event'
    },
    {
        type:'text',
        label:'Text color',
        tooltip: 'Text color in text or hex code, Ex 1:red Ex 2:#F6A3BB',
        name:'color',
        notHiddenIf:'updateSettings'
    },
    {
        type:'text',
        label:'Background color light',
        tooltip: 'Light background color when shifting from dark to light, Ex 1:lightBlue Ex 2:#F6A3BB',
        name:'backgroundColorLight',
        notHiddenIf:'updateSettings'
    },
    {
        type:'text',
        label:'Background color dark',
        tooltip: 'Dark background color when shifting from dark to light, Ex 1:darkBlue Ex 2:#F6A3BB',
        name:'backgroundColorDark',
        notHiddenIf:'updateSettings'
    },
    {
      type:'text',
      label:'Background image (Use url of image)',
      tooltip: 'You can use a url to an image stored on internet type https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png',
      name:'backgroundImage',
      notHiddenIf:'updateSettings'
    },
    { 
      type:'radio',
      label:'Border thickness',
      radioValues:['0px', '1px', '2px', '3px', '4px'],
      tooltip: 'Thickness of border',
      name:'borderWidth',
      notHiddenIf:'updateSettings'
    },
    {
      type:'text',
      label:'Border color',
      tooltip: 'Color of border',
      //disabled:true,
      name:'borderColor',
      notHiddenIf:'updateSettings'
    },
    /*
    {
        type:'checkbox',
        label:'Use registration button',
        name:'useRegistrationButton',
        tooltip:'If you want a registration button and save registrations for the event',
        styleLabel:{opacity:0.4},
        disabled:true,
    },
    */
]

function generateEditorStateFromValue(value) {
    const blocksFromHTML = convertFromHTML(value)
    const content = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
    return EditorState.createWithContent(content)
}


  
export default props => {
    const [userSettings, ] = useSharedState()
    const [value, setValue] = useState({})
    const [buttonStyle, setButtonStyle] = useState()
    const navigate = useNavigate() 
    const location = useLocation();

    const initEvent = () => {
        const event = location.state?location.state:undefined
        if (event) {
            const changeAll = event.changeAll

            return {...event,
                    startTime:event.startDateTime.substring(11, 16),
                    endTime:event.endDateTime.substring(11,16),
                    startDateTime:changeAll?undefined:event.startDateTime.substring(0,16),
                    endDateTime:changeAll?undefined:event.endDateTime.substring(0,16),
                    draft_description: generateEditorStateFromValue(event.description),
            }
        } else {
            // Draft editor init without value
            const draft_description = EditorState.createEmpty()
            return {draft_description}
        }
    }
    const init = initEvent()

    useEffect(()=>{
        if (location.state) {
            setValue(init)
        } else {
            navigate('/home')
        }    
    }, [location.state])

    const handleReply = reply => {
        setButtonStyle(BUTTON_STYLE.SAVED)
        if (reply.status==='OK') {
            navigate('/calendar/' + userSettings.region)
            setButtonStyle(BUTTON_STYLE.SAVED)
            setTimeout(() => setButtonStyle(BUTTON_STYLE.DEFAULT), 2000);
    
        } else {
            setButtonStyle(BUTTON_STYLE.ERROR)
            setTimeout(() => alert('ERROR:' + reply.message), 5000);
        }     
    }
    const handleUpdate = () => {
        const irl = '/updateEvent'
        setButtonStyle(BUTTON_STYLE.CLICKED)

        if (moment(value.startDateTime) > moment(value.endDateTime)) {
            alert('WARNING: End of the event must be set later than start of the event. Please check dates and times.')
            return
        }
        const backgroundImage = userSettings.backgroundImage?userSettings.backgroundImage:""
        const settings = value.updateWithSettings?{...userSettings, backgroundImage}:{}
        const startDateTime = value.changeAll?undefined:value.startDateTime;
        const endDateTime = value.changeAll?undefined:value.endDateTime;
        const data = {...value, ...settings, startDateTime, endDateTime} 

        // alert('handleUpdate:' + JSON.stringify(data))
        
        serverPost(irl, '', '', data, handleReply)
    }    

    const handleReset = () => {setValue(init)}

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
            label:'Reset',
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
