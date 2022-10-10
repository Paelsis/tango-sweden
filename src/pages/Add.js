import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import FormTemplate from '../components/FormTemplate';
import Button from '@mui/material/Button';
import moment from 'moment'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import serverPost from '../services/serverPost'
import { getAuth, onAuthStateChanged} from 'firebase/auth';

const styles={
    container:{
        maxWidth:'100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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


const fields = [
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
        type:'textarea',
        label:'Description',
        name:'description',
        required:true,
        html:true,
    },
    {
        type:'checkbox',
        label:'Hide location and time in popup window',
        name:'hideLocationAndTime',
    },
    {
        type:'text',
        label:'Location',
        name:'location',
        hiddenIf:'hideLocationAndTime'
    },
    {
        type:'date',
        label:'Startdate',
        name:'startDate',
        required:true
    },
    {
        type:'time',
        label:'Starttime',
        name:'startTime',
        required:true
    },
    {
        type:'time',
        label:'Endtime',
        name:'endTime',
        required:true
    },
    {
        type:'checkbox',
        label:'Event ends on another day',
        name:'multipleDays',
        tooltip: 'Event enddate defaults to same as startdate'
    },
    {
        type:'date',
        label:'Enddate',
        name:'endDate',
        notHiddenIf:'multipleDays',
        required:true,
        tooltip: 'Event enddate is filled in when not same as startdate'
    },
    {
        type:'checkbox',
        label:'Repeat',
        name:'repeat',
        tooltip: 'Repeat the event every N days, N weeks or N monthsweekly, monthly or annualy'
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
        tooltip: 'Offset between the events'
    },
    {
        type:'radio',
        label:'Offset unit',
        name:'unit',
        values:['days', 'weeks', 'months'],
        notHiddenIf:'repeat',
        required:true,
        tooltip: 'The offset between events should be combined with offset unit'
    },
    {
        type:'number',
        label:'Repeat number of times',
        style:{width:40},
        name:'numberOfTimes',
        notHiddenIf:'repeat',
        min:2, 
        max:52,
        tooltip: 'Repeat the event a number of times (1 means single event)'
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

const CandidateTable = ({list, deleteRow, clearAll, handleAddToCalendar, style}) =>
    list.length >0?
    <div>
        <h3 style={{margin:10}}>Dates for this event</h3>
        <table style={{border:'1px solid lightGrey', ...style, margin:10}} >
            <tbody>
                {list.map((row, idx) => 
                    <tr>
                        <td>{moment(row.startDateTime).format('ll')}</td>
                        <Tooltip title='Remove single entry from list'>
                            <RemoveCircleIcon onClick={()=>deleteRow(idx)} />
                        </Tooltip>
                    </tr>            
                )}      
            <tr>
                <td colSpan={1} style={{textAlign:'center'}}>
                    <Tooltip title='Add the list of candidates to calendar'>
                    <Button variant="outlined" className="button" style={style} onClick={handleAddToCalendar}>Add to calendar</Button>
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
                    


export default () => {
    const [email, setEmail] = useState(undefined)
    const [color, setColor] = useState('black')
    const navigate = useNavigate()
    const auth = getAuth()
    useEffect(()=>onAuthStateChanged(auth, user => {
        setEmail(user.email)
        moment.locale('sv', {week:{dow : 1}})
    }))
	
    const [list, setList] = useState([])
    const irl = '/addEvents'
    const deleteRow = index => setList(list.filter((it, idx)=>idx !== index))  
    const handleReply = reply => {
        setColor('black');
        reply.status==='OK'?navigate('/malmo'):alert(reply.message?reply.message:JSON.stringify(reply))
    }
    const handleAddToCalendar = () => {setColor('yellow'); serverPost(irl, '', '', list, handleReply);}



    const changeToDbEntry = form => ({
            title:form.title, 
            description:form.description,
            company:form.company,
            startDateTime:form.startDate + 'T' + (form.startTime?form.startTime:'00:00'),
            endDateTime:(form.endDate?form.endDate:form.startDate) + 'T' + (form.endTime?form.endTime:'23:59'),
            location:form.location,
            email,
    })
    

    const adjustForm = originalForm => {
        if (originalForm.multipleDays) {
            return originalForm
        } else {
            return {...originalForm, endDate:originalForm.startDate}
        }
    }

    const handleSubmit = (e, form) => {
        e.preventDefault(); 
        let dbEntry = changeToDbEntry(adjustForm(form))
        let myList =[dbEntry]

        // Endddate must be greater than start date
        if (moment(dbEntry.startDateTime) >= moment(dbEntry.endDateTime)) {
            alert('Check start and end date. End of this event must be later than start of the event.')
            return
        }
    
        if (form.repeat) {
            let offset = form.offset
            let unit = form.unit
            let until = form.until
            let numberOfTimes = form.numberOfTimes
            let startDate = form.startDate
            let endDate = form.endDate?form.endDate:form.startDate
            let cnt = 1
            do {
                startDate = moment(startDate, ).add(offset, unit).format('YYYY-MM-DD')
                endDate = moment(endDate, 'YYYY-MM-DD').add(offset, unit).format('YYYY-MM-DD')
                let offsetForm = {...form, startDate, endDate}
                dbEntry = changeToDbEntry(offsetForm);
                myList = [...myList, dbEntry]
                cnt++
            } while (until?(moment(startDate, 'YYYY-MM-DD').add(offset, unit) <= moment(until, 'YYYY-MM-DD')):numberOfTimes > 1?cnt < numberOfTimes:false)
        }
        
        setList([...list, ...myList].sort((a,b)=> moment(a.startDateTime)-moment(b.startDateTime)))
    }
    return(
        <div style={{...styles.container, color}}>
        <FormTemplate 
            fields={fields} 
            handleSubmit={handleSubmit}
            submitTooltipTitle={'Add to candidate list'}
            submitButtonText={'Add to list'}
        />
        <CandidateTable style={{color:color, borderColor:color}} list={list} deleteRow={deleteRow} handleAddToCalendar={handleAddToCalendar} clearAll={()=>setList([])} />
        </div>           
    )
        
}

