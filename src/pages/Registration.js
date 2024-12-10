import React, {useState, useEffect} from 'react';
import { useSharedState } from '../store';
import { useNavigate, useLocation } from 'react-router-dom';
import FormTemplate from '../components/FormTemplate';
import Button from '@mui/material/Button';
import moment from 'moment'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import {serverPost, replaceRow} from '../services/serverPost'
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { BUTTON_STYLE } from '../services/const';
import {serverFetchData} from '../services/serverFetch'
import {MAX_LIMIT_UNSET, CALENDAR} from '../services/const.js'


const TABLE_NAME = 'tbl_registration_calendar'

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
    const {eventIdExtended, maxLimit, calendarType, title, dateRangeTime} = location?.state?location.state:{}
    const [sharedState, ] = useSharedState()
    const [value, setValue] = useState()
    const [mailSubject, setMailSubject] = useState()
    const [mailBody, setMailBody] = useState()
    const [list, setList] = useState([])
    const [buttonStyle, setButtonStyle] = useState(BUTTON_STYLE.DEFAULT)
    const navigate = useNavigate()
    const tableName = CALENDAR[calendarType?calendarType:'DEFAULT'].TBL_REGISTRATION

    // useEffect(()=>setValue(props.init),[props.init])
    const numberOfRegistrations = list?.length?list.length:0

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
            const url = '/fetchRows?tableName=' + tableName + '&eventIdExtended=' + event.eventIdExtended
            serverFetchData(url, data=>handleReply(data, url))
        }    
    }, [numberOfRegistrations])

    const handleCancel = () => {
        navigate('/calendar/' + sharedState.region)
    }

    const handleReset = () => {
        setValue({})
    }

    const handleMailReply = reply => {
        if (reply.status === 'OK') {
            alert('Check your mailbox for a confirmation mail')
            setButtonStyle(BUTTON_STYLE.DEFAULT) 
            navigate(-1)
        } else {
            alert('ERROR:Failed to send reply mail')
        }    
    }

    const handleRegReply = reply => {
        if (reply.status === 'OK') {
            setButtonStyle(BUTTON_STYLE.SAVED)
            setTimeout(() => {
                setList([...list, value])
                if (process.env.NODE_ENV === 'production') {
                    const data = {
                        email:value.email, 
                        emailOrganizer:event.email,
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
                    alert('OK: Your registration was successful but no mail sent since you are on DEV-system')
                    // navigate(-1)
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
            // alert('handleReg record:' + JSON.stringify(record))
           serverPost('/registration', {tableName, reg, token}, handleRegReply)
        }   
    }

    const registrationPartnerAndRegistrant = () => {
        if (value.havePartner) {
            // Reverse names
            const regPartner = {
                ...event, 
                ...value, 
                eventIdExtended, 
                firstName:value.firstNamePartner,
                lastName:value.lastNamePartner,
                firstNamePartner:value.firstName,
                lastNamePartner:value.lastName,
                token:undefined
            }
            // alert('handleReg record:' + JSON.stringify(record))
            serverPost('/registration', {tableName, reg:regPartner}, reply=>{
                if (reply.status === 'OK') {
                    setList([...list, regPartner])

                    // Make registration with same cancellation token
                    registrationRegistrant(reply.token)
                } else {
                    alert('Failed to register registrant')
                }  
            })
            // replaceRow(tableName, recordPartner, handleRegReplyPartner)
        } 
    }

  
    const handleReg = e => {
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
            label:'Reset',
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
            {eventIdExtended?
                numberOfRegistrations >= maxLimit?
                    <h1 className='title is-3'>The event is full (={maxLimit} dancers )</h1>
                :    
                    <div className='columns m-2 is-centered'>
                        <div className='column is-6 is-narrow'>
                            <h3 className='title is-3'>Registration for {title?title:'No title'}</h3>
                            <h4 className='title is-4'>{dateRangeTime?dateRangeTime:'No date info'}</h4>
                            {maxLimit === MAX_LIMIT_UNSET?
                                null
                            :    
                                <h5 className='title is-5'>Number of booked dancers on this event is {list?.length?list.length:0}   (max limit is {maxLimit})</h5>
                            }    
                            <FormTemplate 
                                        fields={fields} 
                                        value={value}
                                        setValue={setValue}
                                        buttons={buttons}
                                        handleSubmit={handleReg}
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

