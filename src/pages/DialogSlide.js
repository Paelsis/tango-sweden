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
  const handleUpdate = (e, ev) => {e.preventDefault(); navigate('/update', {state:{
    eventId:ev.eventId, 
    title:ev.title, 
    company:ev.company, 
    description:ev.description, 
    hideLocationAndTime:ev.hideLocationAndTime, 
    location:ev.location, 
    startDateTime:ev.start, 
    endDateTime:ev.end}
    })}
  const handleDeleteSingle = () =>  {
    let text = "Press OK to delete this event (eventId=" + eventId + ")";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(text) === true) {
      serverPost(irl, '', '', {eventId, email, startDateTime:event.start}, handleReply)
    } 
  }  
  const handleDeleteAll = () => {
    let reply = "Press OK to delete all occurrances of this event (eventId=" + eventId + ")";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(reply) === true) {
      serverPost(irl, '', '', {eventId, email}, handleReply)
    } 
  }
  const handleCopy = (e, event) => {
    e.preventDefault()  
    setCopy(event)
  }

  const handleCancel = () => {
    setCopy(undefined)
  }

  const auth = getAuth()
  useEffect(()=>onAuthStateChanged(auth, user => {
        setEmail(user.email)
  }), [])
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
              <div style={{maxWidth:'99vw', fontWeight:900}} dangerouslySetInnerHTML={{__html: event.description}} onClick={handleClose} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {email===event.email || email === 'anita@tangosweden.se' || email === 'admin@tangosweden.se' || process.env.NODE_ENV === 'development'? 
              <>
                <Button onClick={e=>handleUpdate(e, event)} autoFocus>
                  Update
                </Button>
                <Button onClick={handleDeleteSingle} autoFocus>
                  Delete single
                </Button>
                <Button onClick={handleDeleteAll} autoFocus>
                  Delete all
                </Button>
                </>
            :null
            }   
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );

}
