import React, {useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { useSharedState } from '../store';
import { useNavigate } from 'react-router-dom';
import FormTemplate from './FormTemplate';
import Button from '@mui/material/Button';
import moment from 'moment'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import {serverPost} from '../services/serverPost'
import {isAndroidOperatingSystem} from '../services/isAndroid'
import Square from '../components/Square'
import {serverFetchData} from '../services/serverFetch';
import { MAX_LENGTH_DESC } from '../services/const';

import { generateEditorStateFromValue, emptyEditorState, enhanceValueWithDraftVariables} from '../components/DraftEditor'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const isAndroid = isAndroidOperatingSystem()

const styles={
    container:{
        paddingTop:30,
        /*
        display: 'flex',
        flexDirection:'column',
        maxWidth:'100%',   
        alignItems:'center'
        */
    },
  }

const BUTTON_STYLE = {
    DEFAULT:{color:'black', borderColor:'black'},
    CLICKED:{color:'yellow', borderColor:'yellow'},
    SAVED:{color:'green', borderColor:'green'},
    ERROR:{color:'red', borderColor:'red'},
}
  

const DeleteButton = ({onClick}) =>
    <IconButton
    size="small"
    edge="start"
    color="inherit"
    sx={{ mr: 0 }}
    onClick={onClick}
    >
        <DeleteIcon 
            id="basic-button"
        />
    </IconButton>

const RemoveCircle = ({onClick}) =>
    <IconButton
    size="small"
    edge="start"
    color="inherit"
    sx={{ mr: 0 }}
    onClick={onClick}
    >
        <RemoveCircleIcon 
            id="basic-button"
        />
    </IconButton>

const Save = ({onClick}) =>
    <IconButton
    size="large"
    edge="start"
    color="inherit"
    sx={{ mr: 0 }}
    onClick={onClick}
    >
        <SaveIcon 
            id="basic-button"
        />
    </IconButton>

const SelectTemplate = ({list, name, value, setValue}) => {
    const handleChange = e => {
        // alert(e.target.value + ' ' + JSON.stringify(list))
        const foundRec = list.find(it => (it.id == e.target.value))
        const valueWithDraft = enhanceValueWithDraftVariables(fields, foundRec)
        setValue(valueWithDraft);
    }
    return(
      <select 
        key={'selectTemplate'}
        name={'id'} 
        value={value.id}
        onChange={handleChange}
      >
        <option disables value={""}>Select template</option>
        {list.map(it => 
            <option key={it.id} value={it.id}>{it[name]}</option>
        )}
      </select>
    )
}    
  


const fields = [
    {
        name:'title',
        label:'Title',
        type:'text',
        required:true,
        tooltip:'The event title shown in the calendar',

    },
    {
        name:'hideLocationAndTime',
        label:'Hide location and time in popup window',
        type:'checkbox',
        tooltip: 'Check this box if you want to hide the location and time in the popup window when clicking at event'
    },
    {
        name:'location',
        label:'Location',
        type:'text',
        hiddenIf:'hideLocationAndTime', 
        tooltip: 'Location of the event'
    },
    {
        name:'startDate',
        label:'Startdate',
        type:'date',
        tooltip: 'Start date of the event',
        required:true
    },
    {
        name:'multipleDays',
        label:'Event ends on another day',
        type:'checkbox',
        tooltip: 'Check this box if the event ends on another day'
    },
    {
        name:'endDate',
        label:'Enddate',
        type:'date',
        notHiddenIf:'multipleDays',
        required:true,
        tooltip: 'End date of the event. Only required if event ends on other day than it starts',
    },
    {
        name:'startTime',
        label:'Starttime',
        tooltip:'Endtime of the event (for full day events set to 00:00)',
        type:'time',
        required:true
    },
    {
        type:'time',
        label:'Endtime',
        name:'endTime',
        tooltip:'Endtime of the event (for full day events set to 23:59)',
        required:true
    },
    {
        type:'checkbox',
        label:'HTML-editor',
        name:'htmlEditor',
        tooltip: 'If you want to write your Description in html instead of using the editor, check this box'
    },
    {
        // type:'rte',
        type:'draft',
        label:'Description',
        name:'description',
        hiddenIf:'htmlEditor',
        tooltip:'The text shown in the popup window when you click the event in the calendar',
        maxlength:65000,
    },
    {
        type:'textarea',
        label:'Description',
        name:'description',
        required:false,
        notHiddenIf:'htmlEditor',
        tooltip:'The description given as html',
        maxlength:65000,
    },
    {
        name:'facebookEventLink',
        type:'text',
        style:{width:120},
        width:20,
        label:'Facebook event link (https-address)',
        tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
        maxLength:200,
    },
    {
        name:'facebookEventId',
        type:'number',
        style:{width:120},
        width:200,
        label:'Facebook event id',
        tooltip:'The facebook event id (Ex: 1123264745523165)',
        hiddenIf:'facebookEventLink',

    },
    {
        type:'checkbox',
        label:'Repeat',
        name:'repeat',
        tooltip: 'Check this box if you want to repeat the event with a certain frequency'
    },
    {
        type:'number',
        label:'Offset between events',
        name:'offset',
        style:{width:40},
        notHiddenIf:'repeat',
        min:1, 
        max:31,
        required:true,
        tooltip: 'The number of days/weeks/months between repeated events'
    },
    {
        type:'radio',
        label:'Offset unit',
        name:'unit',
        radioValues:['days', 'weeks', 'months'],
        notHiddenIf:'repeat',
        required:true,
        tooltip: 'The unit of the field \"Offset between events\" right above' 
    },
    {
        type:'number',
        label:'Repeat number of times',
        style:{width:40},
        name:'numberOfTimes',
        notHiddenIf:'repeat',
        min:2, 
        max:52,
        tooltip: 'Repeat the event this number of times (Ex: 20 means 20 repeated events with an offset given in units specified above)'
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
const fieldsSettings = [
    {
        type:'text',
        label:'Text color',
        tooltip: 'Text color in text or hex code, Ex 1:red Ex 2:#F6A3BB',
        name:'color',
    },
    {
        type:'text',
        label:'Background color light',
        tooltip: 'Light background color when shifting from dark to light, Ex 1:lightBlue Ex 2:#F6A3BB',
        name:'backgroundColorLight',
    },
    {
        type:'text',
        label:'Background color dark',
        tooltip: 'Dark background color when shifting from dark to light, Ex 1:darkBlue Ex 2:#F6A3BB',
        name:'backgroundColorDark',
    },
    {
        type:'text',
        label:'Background image (Use url of image)',
        tooltip: 'You can use a url to an image stored on internet type https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png',
        name:'backgroundImage',
    },
    { 
        type:'radio',
        label:'Border thickness',
        radioValues:['0px', '1px', '2px', '3px', '4px'],
        tooltip: 'Thickness of border',
        name:'borderWidth',
    },
    {
        type:'text',
        label:'Border color',
        tooltip: 'Color of border',
        //disabled:true,
        name:'borderColor',
    },
]


/*
{
    type:'date',
    label:'Repeat until end-date',
    name:'until',
    notHiddenIf:'repeat',
    tooltip: 'End of repeat perod'
},
*/

const offset = {
    DAYS:'days',
    WEEKS:'weeks',
    MONTHS:'months',
    YEARS:'years'
} 

const CandidateTable = ({list, deleteRow, clearAll, handleAddToCalendar, buttonStyle}) =>
    list.length >0?
    <div>
        <h3 style={{margin:10}}>Candidates for this event</h3>
        <table style={{border:'1px solid lightGrey', margin:10}} >
            <tbody>
                {list.map((row, idx) => 
                    <tr>
                        <td>{moment(row.startDateTime).format('ll H:mm')}</td>
                        <Tooltip title='Remove single entry from list'>
                            <RemoveCircleIcon onClick={()=>deleteRow(idx)} />
                        </Tooltip>
                    </tr>            
                )}      
            <tr>
                <td colSpan={1} style={{textAlign:'center'}}>
                    <Tooltip title='Push candidates to calendar'>
                    <Button variant="outlined" className="button" style={buttonStyle} onClick={handleAddToCalendar}>Push to calendar</Button>
                    </Tooltip>
                </td>
                <td colSpan={1} style={{textAlign:'center'}}>
                        <Tooltip title='Delete all entries from list'>
                            <DeleteIcon onClick={()=>clearAll()} />
                        </Tooltip>
                </td>
            </tr>
            </tbody>    
        </table>
    </div>
    :null
                    
 


export default ({init}) => {
    const [sharedState, ] = useSharedState()
    const [email, setEmail] = useState()
    const [value, setValue] = useState()
    const [templates, setTemplates] = useState([])
    const [buttonStyle, setButtonStyle] = useState(BUTTON_STYLE.DEFAULT)
    const [list, setList] = useState([])
    const navigate = useNavigate()
    const auth = getAuth()

    // useEffect(()=>setValue(props.init),[props.init])

    const handleFetchTemplate = reply => {
        if (reply.status === 'OK') {
            // alert(JSON.stringify(reply.result))
            setTemplates(reply.result)
        } 
   }

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            setEmail(user?user.email:undefined);
            setList([])
            if (user.email) {
                let url = apiBaseUrl + "/fetchRows?tableName=tbl_template&email=" + user.email
                serverFetchData(url,  handleFetchTemplate)
                moment.locale('sv', {week:{dow : 1}})
                setValue({...init, id:undefined})
            }    
        })
    }, [init])

    const deleteRow = index => setList(list.filter((it, idx)=>idx !== index))  
    const handleReply = reply => {
        if (reply.status==='OK') {
            setButtonStyle(BUTTON_STYLE.DEFAULT)
            navigate('/calendar/' + (sharedState.region?sharedState.region:'Skåne'))
        } else {
            setButtonStyle(BUTTON_STYLE.ERROR)
            alert(reply.message?('Error message:' + reply.message):JSON.stringify(reply))
        }
    }
    const handleCancel = () => {
        navigate('/calendar/' + sharedState.region)
    }

    const handleReset = () => {
        setValue({})
    }

    const handleAddToCalendar = () => {
        const irl = '/addEvents'
        // alert(JSON.stringify(list))
        setButtonStyle(BUTTON_STYLE.CLICKED) 
        serverPost(irl, list, handleReply)
    }

    const changeToDbEntry = val => ({
            ...val,
            ...sharedState, // Not all columns in sharedState that has the corresponding column in tbl_calendar will copy this value from tbl_user to tbl_calendar
            startDateTime:val.startDate + 'T' + (val.startTime?val.startTime:'00:00'),
            endDateTime:(val.endDate?val.endDate:val.startDate) + 'T' + (val.endTime?val.endTime:'23:59'),
            authLevel:sharedState.authLevelOverride?sharedState.authLevelOverride:sharedState.stateAuthLevel,
            id:undefined,
    })

    const adjustValue = () => {
        if (value.multipleDays) {
            return value
        } else {
            return {...value, endDate:value.startDate}
        }
    }

    const handleAddList = () => {
        let dbEntry = changeToDbEntry(adjustValue(value))
        let myList =[dbEntry]

        // Endddate must be greater than start date
        if (moment(dbEntry.startDateTime) >= moment(dbEntry.endDateTime)) {
            alert('Warning: End time must be later than start time of the event.')
            return
        }

        if (dbEntry.description?dbEntry.description.length > MAX_LENGTH_DESC:false) {
            alert('Warning: The length of description field is not allowed to exceed ' + MAX_LENGTH_DESC + ' characters')
            return
        }
    
        if (value.repeat) {
            let offset = value.offset
            let unit = value.unit
            let until = value.until
            let numberOfTimes = value.numberOfTimes
            let startDate = value.startDate
            let endDate = value.endDate?value.endDate:value.startDate
            let cnt = 1
            do {
                startDate = moment(startDate).add(offset, unit).format('YYYY-MM-DD')
                endDate = moment(endDate).add(offset, unit).format('YYYY-MM-DD')
                let offsetValue = {...value, startDate, endDate}
                dbEntry = changeToDbEntry(offsetValue);
                myList = [...myList, dbEntry]
                cnt++
                // alert(startDate + ' offset:' + offset)
            } while (until?(moment(startDate) <= moment(until, 'YYYY-MM-DD')):numberOfTimes > 1?cnt < numberOfTimes:false)
        }
        
        setList([...list, ...myList].sort((a,b)=> moment(a.startDateTime)-moment(b.startDateTime)))
    }
    const buttons=[
        {
            type:'button',
            label:'Add to list',
            style:buttonStyle,
            validate:true,
            handleClick:handleAddList
        },    
        {
            type:'button',
            label:'Undo',
            style:buttonStyle,
            handleClick:handleReset
        },    
        {
            type:'button',
            label:'Cancel',
            style:buttonStyle,
            handleClick:handleCancel
        },    
    ]
    return(
        <div style={styles.container}>
            {email?
                <>
                    <div className='columns is-centered'>
                        <div className='is-2 column'>
                            <h3>City: {sharedState?sharedState.city:''} Region:{sharedState?sharedState.region:''}</h3>    
                        </div>
                    </div>    
                    <div className='columns m-2 is-centered'>
                        {value?
                            <div className='column is-6 is-narrow'>
                                {templates.length > 0?<SelectTemplate list={templates} name='title' value={value} setValue={setValue} />:null}
                                <p/>
                                <FormTemplate 
                                            fields={fields} 
                                            value={value}
                                            setValue={setValue}
                                            setList={setList}
                                            buttons={buttons}
                                />
                            </div>
                        :null}
                        <div className='column is-4 is-narrow'>
                            <CandidateTable 
                                buttonStyle={buttonStyle} 
                                list={list} 
                                deleteRow={deleteRow} 
                                handleAddToCalendar={handleAddToCalendar} 
                                clearAll={()=>setList([])}
                            />
                        </div>
                        <div className='column is-2 is-narrow'>
                            {(sharedState&&!!init)?
                                <div className="column is-hidden-mobile">
                                    <Square settings={sharedState} />
                                    <small>email:{init.email?init.email:'No email'}</small>
                                </div>  
                            :null}
                        </div>    
                    </div>     
                </>
            :
                <div style={{margin:'auto', top:300, width:'100vw', textAlign:'center'}}>
                    Please signin first if you want to add events.<p/>
                </div>
            }
        </div>
        
    )
        
}

