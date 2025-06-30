import React, {useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { useSharedState } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
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
import Square from './Square'
import {serverFetchData} from '../services/serverFetch';
import { MAX_LENGTH_DESC, CALENDAR } from '../services/const';
import FORM_FIELDS from '../services/formFields'

import { enhanceValueWithDraftVariables} from './DraftEditor'

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
    button:{
        color:'black', 
        borderColor:'black'
    }
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


const SelectTemplate = ({fields, list, name, value, setValue}) => {
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
  
/*
const fieldsMOVED = [
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
        required:true,
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
    {
        type:'checkbox',
        label:'Private',
        name:'private',
        tooltip: 'Check this box if you want the event to be private, i.e. only email of owner can modify or delete it'
    },
]
*/

const CandidateTable = ({list, deleteRow, clearAll, submitToCalendar}) =>
    list.length >0?
    <div className='columns'>
        <div className='column is-9'>
            <h3 style={{margin:10}}>Candidates for this event</h3>
            <table style={{border:'1px solid lightGrey', margin:10}} >
                <tbody>
                    {list.map((row, idx) => 
                        <tr>
                            <td>{moment(row.startDateTime).format('dddd ll H:mm')}</td>
                            <Tooltip title='Remove single entry from list'>
                                <RemoveCircleIcon onClick={()=>deleteRow(idx)} />
                            </Tooltip>
                        </tr>            
                    )}      
                </tbody>    
            </table>
        </div>    
        <div className='column is-3'>
                <h3 style={{margin:10}}>Action on candidates</h3>
                <Tooltip title='Push events to calendar'>
                    <Button variant="outlined" className="button" style={styles.button} onClick={submitToCalendar}>Push to calendar</Button>
                </Tooltip>
                <br/>
                <Tooltip title='Clear the list with candidates'>
                <Button variant="outlined" className="button" style={styles.button} onClick={clearAll}>Clear list</Button>
                </Tooltip>
        </div>
    </div>    
:null
                    
 

// Component: AddEvent
export default props => {
    const [sharedState, ] = useSharedState()
    const calendarType = props.calendarType?props.calendarType:'DEFAULT'
    const [signinEmail, setSigninEmail] = useState()
    const [value, setValue] = useState()
    const [templates, setTemplates] = useState([])
    const [list, setList] = useState([])
    const navigate = useNavigate()
    const auth = getAuth()
    const tblCalendar = CALENDAR[calendarType].TBL_CALENDAR
    const fields = FORM_FIELDS[calendarType].ADD
    const replyPath='/calendar/' + sharedState.region + (props.calendarType?'/' + calendarType:'') + (props.calendarType&&signinEmail?'/' + signinEmail:'')

    const handleFetchTemplate = reply => {
        if (reply.status === 'OK') {
            // alert(JSON.stringify(reply.result))
            setTemplates(reply.result)
        } 
   }

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            setSigninEmail(user?user.email:undefined);
            setList([])
            if (user.email) {
                let url = apiBaseUrl + "/fetchRows?tableName=tbl_template&email=" + user.email
                serverFetchData(url,  handleFetchTemplate)
                moment.locale('sv', {week:{dow : 1}})
                setValue({...props, calendarType:undefined, id:undefined})
            }    
        })
    }, [calendarType])

    const deleteRow = index => setList(list.filter((it, idx)=>idx !== index))  
    const handleReply = reply => {
        if (reply.status==='OK') {
            // Event added to calendar
            navigate(replyPath)
        } else {
            alert('[AddEvent] ERROR: Failed to add event to table ' + tblCalendar)
        }
    }
    const handleCancel = ()  => {
        navigate(replyPath)
    }

    const handleReset = () => {
        setValue({})
    }

    const submitToCalendar = () => {
        const irl = '/addEvents'
        alert('Submit list to ' + tblCalendar)
        serverPost(irl, {tblCalendar, list}, handleReply)
    }

    const changeToDbEntry = val => ({
            ...val,
            ...sharedState, // Not all fields in sharedState with corresponding field in tbl_calendar be copied tbl_user to tbl_calendar
            startDateTime:val.startDate + 'T' + (val.startTime?val.startTime:'00:00'),
            endDateTime:(val.endDate?val.endDate:val.startDate) + 'T' + (val.endTime?val.endTime:'23:59'),
            authLevel:sharedState.authLevelOverride?sharedState.authLevelOverride:sharedState.stateAuthLevel,
            private:val.private?val.private:sharedState.private?sharedState.private:0,
            id:undefined,
    })

    const adjustValue = () => {
        if (value.multipleDays) {
            return value
        } else {
            return {...value, endDate:value.startDate}
        }
    }

    const createCalendarList = () => {
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

    const handleSubmit = e => {
        e.preventDefault()
        createCalendarList()
        window.scrollTo(0, 0)
    }    

    const buttons=[
        {
            type:'submit',
            label:'Add to list',
            style:styles.button,
            validate:true,
        },    
        {
            type:'button',
            label:'Undo',
            style:styles.button,
            handleClick:handleReset
        },    
        {
            type:'button',
            label:'Cancel',
            style:styles.button,
            handleClick:handleCancel
        },    
    ]
    return(
        <div style={styles.container}>
            {signinEmail?
                <>
                    <div className='columns is-centered'>
                        <div className='is-3 column'>
                            <h5>
                                {sharedState?sharedState.region:''}&nbsp;
                                {sharedState?sharedState.city:''}&nbsp; 
                                {calendarType==='DEFAULT'?'':calendarType}&nbsp;
                            </h5>    
                        </div>
                    </div>    
                    <div className='columns m-2 is-centered'>
                        {value?
                            <div className='column is-5 is-narrow'>
                                {templates.length > 0?<SelectTemplate fields={fields} list={templates} name='title' value={value} setValue={setValue} />:null}
                                <p/>
                                <FormTemplate 
                                            fields={fields} 
                                            value={value}
                                            setValue={setValue}
                                            setList={setList}
                                            buttons={buttons}
                                            handleSubmit={handleSubmit}
                                />
                            </div>
                        :null}
                        <div className='column is-6 is-narrow'>
                            <CandidateTable 
                                list={list} 
                                deleteRow={deleteRow} 
                                submitToCalendar={submitToCalendar} 
                                clearAll={()=>setList([])}
                            />
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

