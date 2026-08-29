import React, {useState, useEffect, useRef, useContext} from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import {AuthContext} from "../login/FirebaseAuth"
import { useSharedState } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import FormTemplate from './FormTemplate';
import Button from '@mui/material/Button';
import moment from 'moment'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import {serverPost} from '../services/serverPost'
import Square from './Square'
import {serverFetchData} from '../services/serverFetch';
import { MAX_LENGTH_DESC, CALENDAR } from '../services/const';
import {FORM_FIELDS} from '../services/formFields'
import {CALENDAR_TYPE} from '../services/const'


import { enhanceValueWithDraftVariables} from './DraftEditor'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const styles={
    container:{
        paddingTop:10,
        fontSize:18,
        maxWidth:1000,
        margin:'auto',
        textAlign:'left',
    },
    button:{
        color:'black', 
        borderColor:'black'
    }, 
    buttonDisabled:{
        color:'grey', 
        borderColor:'grey',
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

const Send = ({onClick}) =>
    <IconButton
    size="large"
    edge="start"
    color="inherit"
    sx={{ mr: 0 }}
    onClick={onClick}
    >
        <SendIcon 
            id="basic-button"
        />
    </IconButton>


const CandidateTable = ({list, setList, deleteRow}) =>
    list.length >0?
    <div className='columns'>
        <div className='column is-9 ml-4'>
            <h4 style={{marginLeft:0}}>Candidates for calendar</h4>
            <table style={{border:'1px solid lightGrey', margin:0}} >
                <tbody>
                    {list.map((row, idx) => 
                        <tr>
                            <td>{moment(row.startDateTime).format('dddd ll H:mm')}</td>
                            <td>
                            <Tooltip title='Remove single entry from list'>
                                <RemoveCircleIcon onClick={()=>deleteRow(idx)} />
                            </Tooltip>
                            </td>
                        </tr>            
                    )}      
                </tbody>    
            </table>
            <br/>
            <Tooltip title='Empty the list'>
                 <Button variant="outlined" className="button" style={styles.button} onClick={()=>setList([])}>Empty list</Button>
             </Tooltip>
        </div>    
    </div>    
:null
                    
 

// Component: AddEvent
export default props => {
    const [value, setValue] = useState()
    const [sharedState, setSharedState] = useSharedState()
    const [clearIndex, setClearIndex] = useState(0)
    const calendarType = props?.calendarType?props.calendarType:CALENDAR_TYPE.REGULAR
    const tblCalendar = CALENDAR[calendarType?calendarType:CALENDAR_TYPE.REGULAR].TBL_CALENDAR
    
    const [list, setList] = useState([])
    const navigate = useNavigate()
    const fields = FORM_FIELDS[calendarType].ADD
    
    const {user} = useContext(AuthContext)
    const signinEmail = user?.email?user.email:null
    const addEmailToPath = (calendarType !== CALENDAR_TYPE.REGULAR) && !!signinEmail 
    const replyPath='/calendar/' + sharedState.region + (calendarType?'/' + calendarType:'') + (addEmailToPath?'/' + signinEmail:'')
  
    
    useEffect(()=>{
        setList([])
        if (signinEmail) {
            moment.locale('sv', {week:{dow : 1}})
            setValue({...props, ...sharedState, ...value, calendarType:undefined, description:'', id:undefined})
        }    
    }, [calendarType, signinEmail])

    const deleteRow = index => setList(list.filter((it, idx)=>idx !== index))  
    const handleReply = reply => {
        if (reply.status==='OK') {
            navigate(replyPath)
        } else {
            alert('[AddEvent] ERROR: Failed to add event to table ' + tblCalendar)
        }
    }
    const handleCancel = ()  => {
        navigate(replyPath)
    }

    const handleReset = () => {
        setValue({title:'', description:''})
        setClearIndex(clearIndex++)
    }

    const addToCalendar = () => {
        const irl = '/addEvents'
        setSharedState({...sharedState, calendarDate:value.startDate})
        serverPost(irl, {tblCalendar, list}, handleReply)
    }

    const changeToDbEntry = val => ({
            ...sharedState,
            ...val, 
            startDateTime:val.startDate + 'T' + (val.startTime?val.startTime:'00:00'),
            endDateTime:(val.endDate?val.endDate:val.startDate) + 'T' + (val.endTime?val.endTime:'23:59'),
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

    const  addToCalendarList = () => {
        let dbEntry = changeToDbEntry(adjustValue())
        let myList =[dbEntry]
        const compareFunc = (a,b) => moment(a.startDateTime)-moment(b.startDateTime)

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
            let lastRepeatDate = value.lastRepeatDate
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
            } while (moment(startDate).add(offset, unit) <= moment(lastRepeatDate))
        }
        
        setList([...list, ...myList].sort(compareFunc))
    }

    const handleAddToList = e => {
        e.preventDefault()
        addToCalendarList()
    }    

    const buttons=[
        {
            type:'submit',
            label:'ADD TO EVENT LIST',
            style:styles.button,
            tooltip:<h4 className='title is-5 has-text-white'>Add the event to the event list. When list is complete click on SAVE TO CALENDAR.</h4>,
            validate:true,
        },    
        {
            type:'button',
            label:"PUBLISH TO CALENDAR",
            style:(list.length > 0)?styles.button:styles.buttonDisabled,
            disabled:list.length>0?undefined:true,
            tooltip:<h1 className='title is-5 has-text-white'>Publish all the events in the calendar</h1>,
            onClick:addToCalendar 
        },        
        {
            type:'button',
            label:'Clear',
            style:styles.button,
            tooltip:<h1 className='title is-5 has-text-white'>Clear the form</h1>,
            onClick:handleReset
        },    
        {
            type:'button',
            label:'Cancel',
            style:styles.button,
            tooltip:<h1 className='title is-5 has-text-white'>Cancel the operation and return back to the calendar</h1>,
            onClick:handleCancel
        },    
    ]
    return(
        <div style={styles.container}>
            {signinEmail?
                <>
                    <div className='columns m-2 is-centered'>
                        <div className='column is-6'>
                                <h1 className='title is-4'>
                                    Add event to calendar
                                    {calendarType===CALENDAR_TYPE.REGULAR?'':' of type = ' + calendarType}&nbsp;
                                </h1>
                        </div>
                    </div>
                    <div className='columns m-2 is-centered'>
                        {value?
                            <div className='column is-7'>
                                <FormTemplate 
                                            fields={fields} 
                                            value={value}
                                            setValue={setValue}
                                            setList={setList}
                                            buttons={buttons}
                                            clearIndex={clearIndex}
                                            handleSubmit={handleAddToList}
                                />
                            </div>
                        :null}
                        <div className='column is-4'>
                            <CandidateTable 
                                list={list} 
                                setList={setList}
                                deleteRow={deleteRow} 
                                addToCalendar={addToCalendar} 
                                clearAll={()=>setList([])}
                            />
                        </div>
                    </div>     
                </>
            :
                <div style={{margin:'auto', top:300, width:'100vw', textAlign:'center'}}>
                    Please signin befor you try to add events.<p/>
                </div>
            }
        </div>
        
    )
        
}

