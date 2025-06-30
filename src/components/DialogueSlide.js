import * as React from 'react';
import {useContext, useState, useEffect} from 'react';
import {serverFetchData} from '../services/serverFetch'
import {IconButton} from '@mui/material';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import {AuthContext} from "../login/FirebaseAuth"
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import {serverPost} from '../services/serverPost'
import { useNavigate } from "react-router-dom";
import {ADMINISTRATORS, MAX_LIMIT_UNSET, CALENDAR} from '../services/const'
import { useSharedState } from '../store';
import ViewRegistrationSimple from './ViewRegistrationSimple'
import moment from 'moment'

const styles = {
  textarea:{
    backgroundColor:'transparent',
    padding:0,
    margin:0, 
    whiteSpace: 'pre-wrap',       
    wordWrap: 'break-word',
  },

  rte:{
    maxWidth:'98vw', 
    fontWeight:700
  }
}

/*
const renderDescription = (description, type, handleClose) => {
  return(
    type==='rte'?
       <div style={styles.rte} dangerouslySetInnerHTML={{__html: description}} onClick={handleClose} />
    :type==='textarea'?
      <pre className = 'is-family-primary' style={styles[type]} onClick={handleClose} >{description}</pre>
    :<div style={styles['textarea']} onClick={handleClose} >{description}</div>
  )
}
*/

// DialogSlide
export default props => {
  const {open, setOpen, event, calendarType} = props
  const [sharedState, setSharedState] = useSharedState()
  const forceReloadCount = sharedState.forceReloadCount?sharedState.forceReloadCount:0
  const [signinEmail, setSigninEmail] = useState(undefined)
  const navigate = useNavigate();
  const handleClose = () => setOpen(false)
  const eventId = event.eventId?event.eventId:'Missing'
  const eventIdExtended = event.eventId + event.startDate
  const organizerEmail = event.email
  const maxLimit = event.maxLimit?event.maxLimit:MAX_LIMIT_UNSET
  const title = event.title
  const dateRangeTime = event.dateRangeTime
  const tblCalendar = CALENDAR[calendarType?calendarType:'DEFAULT'].TBL_CALENDAR
  const tblRegistration = CALENDAR[calendarType?calendarType:'DEFAULT'].TBL_REGISTRATION
  const ava = event.ava


  const handleUpdate = e => {
    e.preventDefault(); 
    // alert('Update:' + JSON.stringify(ev))
    const ev = event
    // alert(JSON.stringify(event))
    
    navigate('/update', {
      state: { 
        private:ev.private,
        eventId:ev.eventId, 
        title:ev.title, 
        company:ev.company, 
        description:ev.description, 
        location:ev.location, 
        startDateTime:ev.start, 
        endDateTime:ev.end,
        startTime:ev.start.substring(11,16),
        endTime:ev.end.substring(11,16),
        authLevel:ev.authLevel,
        facebookEventLink:ev.facebookEventLink,
        facebookEventId:ev.facebookEventId,
        color:ev.color,
        backgroundColorLight:ev.backgroundColorLight,
        backgroundColorDark:ev.backgroundColorDark,
        borderStyle:ev.borderStyle,
        borderWidth:ev.borderWidth,
        borderColor:ev.borderColor,
        backgroundImage:ev.backgroundImage,
        useRegistrationButton:ev.useRegistrationButton,
        maxLimit:ev.maxLimit,
        calendarType:calendarType?calendarType:'DEFAULT',
        email:ev.email,
      }
    })
  }



  const handleCopy = e => {
      e.preventDefault(); 

      const ev = event
      navigate('/copy', {
        state: {
          email:ev.email,
          private:ev.private,
          eventId:ev.eventId, 
          title:ev.title, 
          company:ev.company, 
          description:ev.description, 
          location:ev.location, 
          startDateTime:ev.start, 
          endDateTime:ev.end,
          startTime:ev.start.substring(11,16),
          endTime:ev.end.substring(11,16),
          authLevel:ev.authLevel,
          facebookEventLink:ev.facebookEventLink,
          facebookEventId:ev.facebookEventId,
          hideLocationAndTime:ev.hideLocationAndTime==1?1:0, 
          useRegistrationButton:ev.useRegistrationButton==1?1:0,
          color:ev.color,
          backgroundColorLight:ev.backgroundColorLight,
          backgroundColorDark:ev.backgroundColorDark,
          borderStyle:ev.borderStyle,
          borderColor:ev.borderColor,
          borderWidth:ev.borderWidth,
          backgroundImage:ev.backgroundImage,
          useRegistrationButton:ev.useRegistrationButton,
          maxLimit:ev.maxLimit,
          calendarType:calendarType?calendarType:'DEFAULT',
        }
      })
  }

  const handleDeleteReply = reply => {
    if (reply.status === 'OK') {
      setSharedState({...sharedState, forceReloadCount:forceReloadCount+1})
      // window.location.reload() Replaced full reload with forceReloadCount 12/1-2025
    } else if (reply.status === 'ERROR') {
       alert(reply.message?reply.message:'No message')
    } else {
       alert('[DialogueSlide] ERROR: severe error: ' + JSON.stringify(reply))
    }  
  }  

  const handleDeleteSingle = () =>  {
      let text = "Press OK to delete this event (eventId=" + eventId + ")";
      // eslint-disable-next-line no-restricted-globals
      //if (confirm(text) === true) {
        const irl = '/cancelEvent'
        serverPost(irl,  {tblCalendar, eventId, email:signinEmail, startDateTime:event.start}, handleDeleteReply)
      // } 
  }  

  const handleDeleteAll = () => {
      let reply = "Press OK to delete all occurrences of this event (eventId=" + eventId + ")";
      // eslint-disable-next-line no-restricted-globals
      if (confirm(reply) === true) {
        const irl = '/cancelEvent'
        serverPost(irl,  {tblCalendar, eventId, email:signinEmail}, handleDeleteReply)
      } 
  }
  
  const handleListRegistrations = e => {
      navigate('/listRegistration', {state:{eventIdExtended, tblRegistration}})
  }

    const handleRegistration = e => {
        // alert('[DialogSlide] eventIdExtended = ' + eventIdExtended)
        if (!organizerEmail) {
          alert('No organizerEmail')
        }
        navigate('/registration', {state:{calendarType, eventIdExtended, maxLimit, ava, title, organizerEmail, dateRangeTime}})
    }


  const auth = getAuth()
  useEffect(()=>onAuthStateChanged(auth, user => {
    if (user?user.email:false) {
        setSigninEmail(user.email)
    }    
  }), [])

  const authLevel = sharedState.authLevel
  const privateEvent = event.private==1?true:false

 
  // You are authorized if you own event or (authLevel is 8 and not private) or authLevel=16
  const authorized = (signinEmail === event.email) || (authLevel === 16) || ((authLevel === 8) && !privateEvent)

  const linkToFacebook=event.facebookEventLink?event.facebookEventLink:event.facebookEventId?"https://www.facebook.com/events/" + event.facebookEventId:undefined
  return (
    <div style={{maxWidth:'100%'}}>
        <Dialog
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {event.hideLocationAndTime==1?null:
          <DialogTitle id="alert-dialog-title">
            {event.location + ' ' + event.dateRangeTime}
          </DialogTitle>
          }
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {linkToFacebook?<a href={linkToFacebook}>Link to Facebook</a>:null}
              <p/>
              <div style={styles.rte} className='content' dangerouslySetInnerHTML={{__html: event.description}} onClick={handleClose} />
              {authorized===true?<ViewRegistrationSimple eventIdExtended={eventIdExtended} tblRegistration={tblRegistration} />:null}
              {authorized===true?<div style={styles.rte} className='content' dangerouslySetInnerHTML={{__html: event.message}} onClick={handleClose} />:null}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {event.useRegistrationButton?
                <>
                {event.ava > 0? 
                  <Tooltip title='Click here to register'>
                    <IconButton variant="outlined" onClick={()=>handleRegistration(event)}>
                      <AppRegistrationIcon />
                    </IconButton>
                  </Tooltip>
                :
                  <Tooltip title='Fully booked'>
                    <IconButton variant="outlined">
                      <PersonAddDisabledIcon />
                    </IconButton>
                  </Tooltip>
                }
                </>
            :
              null
            }       
            {authorized===true? 
               <>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 0 }}
                  onClick={handleUpdate}
                >
                  <Tooltip title='Update this event'>
                    <EditIcon />
                  </Tooltip>          
                </IconButton>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 0 }}
                  onClick={handleCopy}
                >
                  <Tooltip title='Copy this event to new dates and times'>
                  <ContentCopyIcon />
                  </Tooltip>
                </IconButton>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 0 }}
                  onClick={e=>handleDeleteSingle(e, event)}
                >
                  <Tooltip title='Delete this event'>
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 0 }}
                  onClick={e=>handleDeleteAll(e, event)}
                >
                  <Tooltip title='Delete all repeated events when repeat checkbox was marked in Add'>
                    <DeleteSweepIcon />
                  </Tooltip>
                </IconButton>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 0 }}
                  onClick={handleListRegistrations}
                >
                  <Tooltip title='list all registrations'>
                  <PeopleAltIcon />
                  </Tooltip>
                </IconButton>
                </>
            :null
            }   
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              sx={{ mr: 0 }}
              onClick={handleClose}
            >
              <Tooltip title='Close this window'>
              <CloseIcon />
              </Tooltip>
            </IconButton>
          </DialogActions>
        </Dialog>
    </div>
  );

}


