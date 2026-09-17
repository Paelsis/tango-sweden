import React, {useState, useEffect, useRef, useContext} from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import {AuthContext} from "../login/FirebaseAuth"
import { useSharedState } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import FormTemplate from './FormTemplate';
import Button from '@mui/material/Button';
import moment from 'moment'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import {serverPost} from '../services/serverPost'
import {MAX_LENGTH_DESC, 
    CALENDAR, 
    CALENDAR_TYPE, 
    QUILL_EDITOR, 
    COUNTRIES, 
    REGIONS, 
} from '../services/const'
import {REGIONS_BY_COUNTRY, DEFAULT_COUNTRY} from '../services/regionsByCountry'

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

const FORM_FIELDS = {
    PRIVATE_LESSON:[
        {
            name:'title',
            label:'Title',
            type:'text',
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
            type:'select',
            label:'Country (default value):',
            name:'country',
            selectValues:Object.keys(REGIONS_BY_COUNTRY),
            required:true,
            tooltip:'Events from same country will have button in the color of the country',
        },
        {
            type:'select',
            label:'Region (default value):',
            name:'region',
            selectValues:REGIONS_BY_COUNTRY.Sweden,
            selectValuesFunc:value=>REGIONS_BY_COUNTRY[value.country]??REGIONS_BY_COUNTRY.Sweden,
            required:true,
            tooltip:'Events with same region is show in same calendar for that region',
        },
        {
            name:'city',
            label:'City (overrides default City)',
            type:'text',
            tooltip: 'City of the event (overrides default the city defined in User Settings)'
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
            tooltip:'Starttime of the event (for full day events set to 00:00)',
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
            // ACTIVE editor type is set to QUILL or DRAFT
            type:QUILL_EDITOR,
            label:'Description',
            name:'description',
            hiddenIf:'htmlEditor',
            tooltip:'The description shown when clicking on event in calendar',
            required:true,
            maxlength:32768, // 2**15
        },
        {
            type:'textarea',
            label:'Description',
            name:'description',
            required:false,
            notHiddenIf:'htmlEditor',
            tooltip:'The description in html format',
            maxlength:32768, // 2**15
        },
        {
            type:'checkbox',
            label:'Repeat',
            name:'repeat',
            tooltip: 'Check this box if you want to repeat the event with a certain frequency'
        },
        {
            type:'number',
            label:'Every',
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
            label:'Days, Weeks, Moths',
            name:'unit',
            radioValues:['days', 'weeks', 'months'],
            notHiddenIf:'repeat',
            required:true,
            tooltip: 'The unit of the field \"Every\" right above' 
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
            label:'E-mail of responsible organizer',
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
            tooltip: 'Maximum number of registrants for this event. Defaults to 1 for private lessons.'
        },
    ],
    DISKJOCKEY:[
        {
            name:'location',
            label:'Location',
            type:'text',
            tooltip: 'Location of the event'
        },
        {
            name:'country',
            label:'Country',
            type:'select',
            selectValues:COUNTRIES,
            tooltip: 'Country of the event (overrides default city defined in User Settings)'
        },
        {
            name:'region',
            label:'Region',
            type:'select',
            selectValues:REGIONS,
            selectValuesFunc:country=>REGIONS_BY_COUNTRY[country?country:DEFAULT_COUNTRY],
            tooltip:'Region of the event (overrides default Region defined in User Settings)',
        },      
        {
            name:'city',
            label:'City',
            type:'text',
            tooltip: 'City of the event (overrides default city defined in User Settings)'
        },
        {
            name:'title',
            label:'Title',
            type:'text',
            required:true,
            tooltip:'The event title shown in the calendar',
    
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
            type:QUILL_EDITOR,
            label:'Description',
            name:'description',
            hiddenIf:'htmlEditor',
            tooltip:'The description shown when clicking on event in calendar',
            required:true,
            maxlength:32768, // 2**15
        },
        {
            type:'textarea',
            label:'Description',
            name:'description',
            required:false,
            notHiddenIf:'htmlEditor',
            tooltip:'The description in html format',
            maxlength:32768, // 2**15
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
            type:'checkbox',
            label:'Repeat',
            name:'repeat',
            tooltip: 'Check this box if you want to repeat the event with a certain frequency'
        },
        {
            type:'number',
            label:'Every',
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
            label:'Days, Weeks, Moths',
            name:'unit',
            radioValues:['days', 'weeks', 'months'],
            notHiddenIf:'repeat',
            required:true,
            tooltip: 'The unit of the field \"Every\" right above' 
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
    ],
    REGULAR:[
        {
            name:'title',
            label:'Title',
            type:'text',
            required:true,
            tooltip:'The event title shown in the calendar',
    
        },
        {
            name:'location',
            label:'Location',
            type:'text',
            tooltip: 'Name of venue and street address'
        },
        {
            type:'select',
            label:'Country (default value):',
            name:'country',
            selectValues:Object.keys(REGIONS_BY_COUNTRY),
            required:true,
            tooltip:'Events from same country will have button in the color of the country',
        },
        {
            type:'select',
            label:'Region (default value):',
            name:'region',
            selectValues:REGIONS_BY_COUNTRY.Sweden,
            selectValuesFunc:value=>REGIONS_BY_COUNTRY[value.country]??REGIONS_BY_COUNTRY.Sweden,
            required:true,
            tooltip:'Events with same region is show in same calendar for that region',
        },
        {
            name:'city',
            label:'City',
            type:'text',
            tooltip: 'City of the event (overrides default the city defined in User Settings)'
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
            tooltip: 'Use html-editor to edit the text'
        },
        {
            // type:'rte',
            type:QUILL_EDITOR,
            label:'Description',
            name:'description',
            hiddenIf:'htmlEditor',
            tooltip:'The description shown when clicking on event in calendar',
            required:true,
            maxlength:32768, // 2**15
        },
        {
            type:'textarea',
            label:'Description',
            name:'description',
            required:false,
            notHiddenIf:'htmlEditor',
            tooltip:'The description in html format',
            maxlength:32768, // 2**15
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
            type:'checkbox',
            label:'Repeat',
            name:'repeat',
            tooltip: 'Check this box if you want to repeat the event with a certain frequency'
        },
        {
            type:'number',
            label:'Every',
            name:'offset',
            style:{width:40},
            notHiddenIf:'repeat',
            min:1, 
            max:31,
            required:true,
            tooltip: 'Example: A value of 2 in Every means \"Every 2 <unit>\" (where unit=days/months/weeks)'
        },
        {
            type:'radio',
            label:'Days, Weeks, Moths',
            name:'unit',
            radioValues:['days', 'weeks', 'months'],
            notHiddenIf:'repeat',
            required:true,
            tooltip: 'Example: Unit of field Every.'
        },
        {
            name:'lastRepeatDate',
            label:'Last repeat date',
            type:'date',
            tooltip: 'After this date the repeat is stopped',
            notHiddenIf:'repeat',
            required:true
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
    const fields = FORM_FIELDS[calendarType]
    
    const {user} = useContext(AuthContext)
    const signinEmail = user?.email?user.email:null
    const addEmailToPath = (calendarType !== CALENDAR_TYPE.REGULAR) && !!signinEmail 
  
    
    useEffect(()=>{
        setList([])
        if (signinEmail) {
            moment.locale('sv', {week:{dow : 1}})
            setValue({...props, ...sharedState, ...value, calendarType:undefined, description:'', id:undefined, region:undefined})
        }    
    }, [calendarType, signinEmail])

    useEffect (()=>{
        setValue({...value, country:sharedState.country, region:sharedState.region, city:sharedState.city})
    }, [sharedState.country, sharedState.region, sharedState.city])

    const deleteRow = index => setList(list.filter((it, idx)=>idx !== index))  
    const handleReply = reply => {
        if (reply.status==='OK') {
            if (value.region || value.city) {
                const replyPath='/calendar/' + (value.region?value.region:value.city) + (calendarType?'/' + calendarType:'') + (addEmailToPath?'/' + signinEmail:'')
                navigate(replyPath)
            } else {
                alert('[AddEvent] ERROR: Could not return to region or city for ' + tblCalendar + ' calendarType=' + calendarType)
            }    
        } else {
            alert('[AddEvent.handleReply] ERROR: Failed to add event to table ' + tblCalendar)
        }
    }
    const handleCancel = ()  => {
        if (value.region || value.city) {
            const replyPath='/calendar/' + (value.region?value.region:value.city) + (calendarType?'/' + calendarType:'') + (addEmailToPath?'/' + signinEmail:'')
            navigate(replyPath)
        } else {
            alert('[AddEvent.handleCancel] ERROR: Could not return to region or city for ' + tblCalendar + ' calendarType=' + calendarType)
        }    
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
                    {calendarType!==CALENDAR_TYPE.REGULAR?
                        <div className='columns m-2 is-centered'>
                            <div className='column is-full'>
                                    <>
                                    <h5 className='title is-4' style={{color:'teal'}}>
                                        Add hours available for registration of calendar type = {calendarType}
                                    </h5>
                                    <h6 className='title is-5' style={{color:'teal'}}>
                                        Owner of this table is E-mail {signinEmail}
                                    </h6>
                                    </>
                            </div>
                        </div>
                    :null}
                    <div className='columns m-2 is-centered'>
                        {sharedState?value?
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
                        :null:null}
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

