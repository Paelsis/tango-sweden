import * as Reactfrom from 'react';
import {useContext, useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {AuthContext} from "../login/FirebaseAuth"
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import serverPost from '../services/serverPost'
import { useNavigate } from "react-router-dom";
import AddEvent from '../components/AddEvent'
import reactBreak from 'react-break';

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
  const handleCopy = (e, ev) => {
    e.preventDefault(); 
    // alert('Update:' + JSON.stringify(ev))
    navigate('/copy', {
      state: {
        eventId:ev.eventId, 
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
        borderColor:ev.borderColor,
        borderWidth:ev.borderWidth,
        backgroundImage:ev.backgroundImage,
      }
    })
  }

  const handleRegistration = (event) => {
    alert('Registration - eventId:' + event.eventId)
  }

  const auth = getAuth()
  useEffect(()=>onAuthStateChanged(auth, user => {
        setEmail(user.email)
  }), [])
  const linkToFacebook=event.facebookEventId?"https://www.facebook.com/events/" + event.facebookEventId:undefined
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
              <div style={styles.rte} dangerouslySetInnerHTML={{__html: event.description}} onClick={handleClose} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {email===event.email || email === 'anita@tangosweden.se' || email === 'admin@tangosweden.se'? 
               <>
                <Button variant='outlined' onClick={e=>handleUpdate(e, event)} autoFocus>
                  Update
                </Button>
                <Button variant='outlined' onClick={e=>handleCopy(e, event)} autoFocus>
                  Copy
                </Button>
                <Button variant='outlined' onClick={handleDeleteSingle} autoFocus>
                  Delete single
                </Button>
                <Button variant='outlined' onClick={handleDeleteAll} autoFocus>
                  Delete all
                </Button>
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
            <Button variant="outlined" onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );

}


