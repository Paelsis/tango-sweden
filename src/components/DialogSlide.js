import * as React from 'react';
import {useContext, useState, useEffect} from 'react';
import {serverFetchData} from '../services/serverFetch'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
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

const renderDescription = (description, type, handleClose) => {
  return(
    type==='rte'?
       <div style={styles.rte} dangerouslySetInnerHTML={{__html: description}} onClick={handleClose} />
    :type==='textarea'?
      <pre className = 'is-family-primary' style={styles[type]} onClick={handleClose} >{description}</pre>
    :<div style={styles['textarea']} onClick={handleClose} >{description}</div>
  )
}


// DialogSlide
export default props => {
  const {open, setOpen, event, calendarType} = props
  const  [email, setEmail] = useState(undefined)
  const  [sharedState,] = useSharedState()
  const  [copy, setCopy] = useState(undefined)
  const navigate = useNavigate();
  const handleClose = () => setOpen(false)
  const eventId = event.eventId?event.eventId:'Missing'
  const eventIdExtended = event.eventId + event.startDate
  const maxLimit = event.maxLimit?event.maxLimit:MAX_LIMIT_UNSET
  const tableName = CALENDAR[calendarType?calendarType:'DEFAULT'].TBL_REGISTRATION

  const handleReply = reply => {
    reply.status === 'OK'?window.location.reload():alert(JSON.stringify(reply.message?reply.message:reply))
  }  

  const handleUpdate = e => {
    e.preventDefault(); 
    // alert('Update:' + JSON.stringify(ev))
    const ev = event
    // alert(JSON.stringify(event))
    
    navigate('/update', {
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

  const handleDeleteSingle = () =>  {
      let text = "Press OK to delete this event (eventId=" + eventId + ")";
      // eslint-disable-next-line no-restricted-globals
      //if (confirm(text) === true) {
        const irl = '/cancelEvent'
        serverPost(irl,  {eventId, email, startDateTime:event.start}, handleReply)
      // } 
  }  

  const handleDeleteAll = () => {
      let reply = "Press OK to delete all occurrences of this event (eventId=" + eventId + ")";
      // eslint-disable-next-line no-restricted-globals
      if (confirm(reply) === true) {
        const irl = '/cancelEvent'
        serverPost(irl,  {eventId, email}, handleReply)
      } 
  }

  const handleReplyFetchRegistrations = reply => {
      if (reply.status === 'OK') {
        alert(JSON.stringify(reply.result))
      } else {
        alert('Failed to fetch registrations' + JSON.stringify(reply))
      } 
  }
  
  const handleListRegistrations = e => {
      navigate('/listRegistration', {state:{eventIdExtended, tableName}})
  }

    const handleRegistration = e => {
        const ev = event
        alert(calendarType)
        navigate('/registration', 
        {
          state:{
            tableName,
            eventId:ev.eventId, 
            eventIdExtended:eventIdExtended, 
            maxLimit,
            email:ev.email,
            title:ev.title, 
            company:ev.company, 
            description:ev.description, 
            location:ev.location, 
            startDateTime:ev.start, 
            endDateTime:ev.end,
            startDate:ev.start.substring(0,10), 
            endDate:ev.end.substring(0,10),
            startTime:ev.start.substring(11,16),
            dateRangeTime:ev.dateRangeTime, 
            endTime:ev.end.substring(11,16),
            calendarType:calendarType?calendarType:'DEFAULT',
          }
        })
    }


  const auth = getAuth()
  useEffect(()=>onAuthStateChanged(auth, user => {
    if (user?user.email:false) {
        setEmail(user.email)
    }    
  }), [])

  const authLevel = sharedState.authLevel
  const privateEvent = event.private==1?true:false

 
  // You are authorized if you own event or (authLevel is 8 and not private) or authLevel=16
  const authorized = (email === event.email) || (authLevel === 16) || ((authLevel === 8) && !privateEvent)

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
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {event.useRegistrationButton?
                <IconButton variant="outlined" onClick={()=>handleRegistration(event)} autoFokus>
                  <AppRegistrationIcon />
                </IconButton>
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


