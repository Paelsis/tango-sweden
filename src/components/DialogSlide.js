import * as Reactfrom from 'react';
import {useContext, useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import {AuthContext} from "../login/FirebaseAuth"
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import serverPost from '../services/serverPost'
import { useNavigate } from "react-router-dom";
import {ADMINISTRATORS} from '../services/const'


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



export default function DialogSlide(props) {
  const {open, setOpen, event} = props
  const  [email, setEmail] = useState(undefined)
  const  [copy, setCopy] = useState(undefined)
  const navigate = useNavigate();
  const handleClose = () => setOpen(false)
  const eventId = event.eventId?event.eventId:'Missing'
  const handleReply = reply => {
    reply.status === 'OK'?window.location.reload():alert(JSON.stringify(reply.message?reply.message:reply))
  }  
  const irl = '/cancelEvent'

  const handleUpdate = (e, ev) => {
    e.preventDefault(); 
    // alert('Update:' + JSON.stringify(ev))
    navigate('/update', {
      state: { 
        eventId:ev.eventId, 
        facebookEventLink:ev.facebookEventLink,
        facebookEventId:ev.facebookEventId,
        title:ev.title, 
        company:ev.company, 
        description:ev.description, 
        location:ev.location, 
        startDateTime:ev.start, 
        endDateTime:ev.end,
        color:ev.color,
        backgroundColorLight:ev.backgroundColorLight,
        backgroundColorDark:ev.backgroundColorDark,
        borderStyle:ev.borderStyle,
        borderWidth:ev.borderWidth,
        borderColor:ev.borderColor,
        backgroundImage:ev.backgroundImage,

      }
    })
  }



  const handleCopy = (e, ev) => {
    e.preventDefault(); 
    navigate('/copy', {
      state: {
        eventId:ev.eventId, 
        facebookEventLink:ev.facebookEventLink,
        facebookEventId:ev.facebookEventId,
        title:ev.title, 
        company:ev.company, 
        description:ev.description, 
        location:ev.location, 
        startDateTime:ev.start, 
        endDateTime:ev.end,
        hideLocationAndTime:ev.hideLocationAndTime==1?1:0, 
        useRegistrationButton:ev.useRegistrationButton==1?1:0,
        color:ev.color,
        backgroundColorLight:ev.backgroundColorLight,
        backgroundColorDark:ev.backgroundColorDark,
        borderStyle:ev.borderStyle,
        borderColor:ev.borderColor,
        borderWidth:ev.borderWidth,
        backgroundImage:ev.backgroundImage,
      }
    })
  }

  const handleDeleteSingle = () =>  {
    let text = "Press OK to delete this event (eventId=" + eventId + ")";
    // eslint-disable-next-line no-restricted-globals
    //if (confirm(text) === true) {
    serverPost(irl, '', '', {eventId, email, startDateTime:event.start}, handleReply)
    // } 
  }  

  const handleDeleteAll = () => {
    let reply = "Press OK to delete all occurrances of this event (eventId=" + eventId + ")";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(reply) === true) {
      serverPost(irl, '', '', {eventId, email}, handleReply)
    } 
  }

  const handleRegistration = (event) => {
    alert('Registration - eventId:' + event.eventId)
  }

  const auth = getAuth()
  useEffect(()=>onAuthStateChanged(auth, user => {
    if (user?user.email:false) {
        setEmail(user.email)
    }    
  }), [])
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
            {event.location + ' ' + event.timeRangeWithDay}
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
            {ADMINISTRATORS.includes(email) || email === event.email ? 
               <>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 0 }}
                  onClick={e=>handleUpdate(e, event)}
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
                  onClick={e=>handleCopy(e, event)}
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
                </>
            :null
            }   
            {event.useRegistrationButton?
                <Button variant="outlined" onClick={()=>handleRegistration(event)} autoFokus>
                  Registration
                </Button>
            :
              null
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


