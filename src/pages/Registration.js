import React, {useState, useEffect} from 'react';
import { useSharedState } from '../store.js';
import { useNavigate, useLocation } from 'react-router-dom';
import FormTemplate from '../components/FormTemplate.js';
import Button from '@mui/material/Button';
import moment from 'moment'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import {serverPost, replaceRow} from '../services/serverPost.js'
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { BUTTON_STYLE } from '../services/const.js';
import {serverFetchData} from '../services/serverFetch.js'
import {MAX_LIMIT_UNSET, CALENDAR, CALENDAR_TYPE} from '../services/const.js'

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
        type:'radio',
        label:'Dance role:',
        name:'role',
        radioValues:
        [
            {label:'FOLLOWER', value:'FOLLOWER'},
            {label:'LEADER', value:'LEADER'},
            {label:'BOTH', value:'BOTH'},
        ],
        tooltip:'Dance role can be leader, follower or both',
        required:true,
    },
    {
        type:'text',
        label:'First name',
        name:'firstName',
        required:true
    },
    {
        type:'text',
        label:'Last name',
        name:'lastName',
        required:true
    },
    {
        type:'email',
        label:'E-mail',
        name:'email',
        required:true
    },
    {
        type:'text',
        label:'Phone number',
        name:'phone',
        required:true
    },
    {
        type:'checkbox',
        label:'I make a registration for my partner as well',
        name:'havePartner',
    },
    {
        type:'text',
        label:'First name partner',
        name:'firstNamePartner',
        required:true,
        notHiddenIf:'havePartner',
    },
    {
        type:'text',
        label:'Last name partner',
        name:'lastNamePartner',
        required:true,
        notHiddenIf:'havePartner',

    },
    {
        type:'email',
        label:'E-mail partner',
        name:'emailPartner',
        required:true,
        notHiddenIf:'havePartner',
    },
    {
        type:'text',
        label:'Phone partner',
        name:'phonePartner',
        required:true,
        notHiddenIf:'havePartner',
    },
    {
        // type:'rte',
        type:'TextArea',
        label:'Message to organizer',
        name:'message',
    },
]

// Registration
export default () => {
    const location = useLocation();
    const event = location?.state?location.state:{}
    const {calendarType, eventIdExtended, ava, maxLimit, title, dateRangeTime, organizerEmail} = event
    const [sharedState, setSharedState] = useSharedState()
    const forceReloadCount = sharedState.forceReloadCount?sharedState.forceReloadCount:0
    const [value, setValue] = useState()
    const [mailSubject, setMailSubject] = useState()
    const [mailBody, setMailBody] = useState()
    const [list, setList] = useState([])
    const [buttonStyle, setButtonStyle] = useState(BUTTON_STYLE.DEFAULT)
    const navigate = useNavigate()
    const calType = calendarType?calendarType:sharedState.calendarType?sharedState.calendarType:CALENDAR_TYPE.REGULAR
    const tblRegistration = CALENDAR[calType].TBL_REGISTRATION
    const url = '/fetchRows?tableName=' + tblRegistration + '&eventIdExtended=' + eventIdExtended

    const handleReply = (data, url) => {
        if (data.status === 'OK') {
            setList(data.result) 
        } else {
            console.log('ERROR: Failed to fetch with url: ' + url)
        }
    }

    useEffect(()=>{
        moment.locale('sv', {week:{dow : 1}})
        if (event.maxLimit !== MAX_LIMIT_UNSET) {
            serverFetchData(url, data=>handleReply(data, url))
        }    
    }, [forceReloadCount])

    const handleCancel = () => {
        navigate(-1)
    }

    const handleEmpty = () => {
        setValue({})
    }

    const handleMailReply = reply => {
        if (reply.status === 'OK') {
            alert('Check your mailbox for a confirmation mail')
            setButtonStyle(BUTTON_STYLE.DEFAULT) 
            navigate(-1)
        } else if (reply.status === 'ERROR') {
            alert('Message: ' + reply.message?reply.message:'No message')
            setButtonStyle(BUTTON_STYLE.DEFAULT) 
        } else {   
            alert('ERROR:Failed to send reply mail')
        }    
    }

    const handleRegReply = reply => {
        if (reply.status === 'OK') {
            setButtonStyle(BUTTON_STYLE.SAVED)
            setSharedState({...sharedState, forceReloadCount:forceReloadCount+1, calendarType}) // Update shared state to trigger reload from database
            setTimeout(() => {
                setList([...list, value])
                if (process.env.NODE_ENV === 'production') {
                    const data = {
                        customerEmail:value.email, // The registrants email
                        organizerEmail, // The email that was inserted when event was created
                        mailSubjectToCustomer:reply.mailSubject, 
                        mailBodyToCustomer:reply.mailBody,
                        mailSubjectToOrganizer:reply.mailSubject, 
                        mailBodyToOrganizer:reply.mailBody,
                    }     
                    serverPost('/sendMailReg', data, handleMailReply)
                } else {
                    setButtonStyle(BUTTON_STYLE.DEFAULT) 
                    setMailSubject(reply.mailSubject)
                    setMailBody(reply.mailBody)
                    alert("OK: Your registration was successful but no mail sent since you are on DEV-system\n(customerEmail=" + value.email + " organizerEmail=" + organizerEmail + ")")
                    navigate(-1)
                }
            }, 2000);
        } else {
          alert(reply.message)  
          setButtonStyle(BUTTON_STYLE.ERROR) 
          setTimeout(() => setButtonStyle(BUTTON_STYLE.DEFAULT), 5000);
        }
    }

    const registrationRegistrant = token => {
        if (!!value.email) {
            const reg = {...event, ...value}
            serverPost('/registration', {tableName:tblRegistration, reg, token}, handleRegReply)
        }   
    }

    const registrationPartnerAndRegistrant = () => {
        if (value.havePartner) {
            // Reverse names
            const regPartner = {...event, ...value, 
                firstName:value.firstNamePartner,
                lastName:value.lastNamePartner,
                firstNamePartner:value.firstName,
                lastNamePartner:value.lastName,
                token:undefined
            }
            // alert('handleSubmit record:' + JSON.stringify(record))
            serverPost('/registration', {tableName:tblRegistration, reg:regPartner}, reply=>{
                if (reply.status === 'OK') {
                    setList([...list, regPartner])

                    // Make registration with same cancellation token
                    registrationRegistrant(reply.token)
                } else {
                    alert(reply.message)
                }  
            })
            // replaceRow(tableName, recordPartner, handleRegReplyPartner)
        } 
    }

  
    const handleSubmit = e => {
        e.preventDefault()
        setButtonStyle(BUTTON_STYLE.CLICKED)
        if (value.havePartner) {
            // Register first first partner, then registrant 
            registrationPartnerAndRegistrant();
        } else {
            // Only register registrant
            registrationRegistrant(undefined);
        }    
    }
    
    const buttons=[
        {
            type:'submit',
            label:'Send registration',
            style:buttonStyle,
        },    
        {
            type:'button',
            label:'Empty',
            style:buttonStyle,
            handleClick:handleEmpty
        },    
        {
            type:'button',
            label:'Cancel',
            style:buttonStyle,
            handleClick:()=>navigate(-1)
        },    
    ]
    return(
        <div style={styles.container}>
            {eventIdExtended?

                ava <=0?
                    <h1 className='title is-3'>No space left</h1>
                :    
                    <div className='columns m-2 is-centered'>
                        <div className='column is-6 is-narrow'>
                            <h3 className='title is-3'>Registration for {title?title:'No title'} ava = {event.ava}</h3>
                            <h4 className='title is-4'>{dateRangeTime?dateRangeTime:'No date info'}</h4>
                            {maxLimit === MAX_LIMIT_UNSET?
                                null
                            :    
                                <h5 className='title is-6'>Available at this event:{ava}</h5>
                            }    
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
                <h1 className='title is-3'>Registration must be done by first clicking on event in calender</h1>
            }
            {process.env.NODE_ENV === 'development'?mailSubject?
                <h3 className='title is-3'>
                    {mailSubject}
                </h3>
            :null:null}
            {process.env.NODE_ENV === 'development'?mailBody?
                <h3 className='title is-3'>
                    <div dangerouslySetInnerHTML={{__html: mailBody}} />
                </h3>
            :null:null}
        </div>
    )
        
}

