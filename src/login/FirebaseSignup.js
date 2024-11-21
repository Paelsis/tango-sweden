import React, {useCallback, useState} from "react"
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSharedState } from '../store';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const DEFAULT_COLOR = 'green'

const styles = {
  container:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'center',
    color:DEFAULT_COLOR,
    fontSize:24,
    fontWeight:200,
    height:'50vh'
  },
  button: {
    color:DEFAULT_COLOR,
    border:'2px solid ' + DEFAULT_COLOR,
    padding:5
  },
  input: {
    color:DEFAULT_COLOR,
    borderColor:DEFAULT_COLOR,
    backgroundColor:'transparent',
    fontSize:24,
    fontWeight:200,
    outline: 0,
    border:'none',
    borderBottom: '2px solid ' + DEFAULT_COLOR,
    '&:hover':{
      backgroundColor:'red'
    }
  },
  reset:{
    fontSize:10, 
  },
}

const FirebaseSignUp = ({history}) =>  {
  const navigate = useNavigate()
  const [sharedState, setSharedState] = useSharedState()
  
  
  const handleSignup = useCallback(async e => {
    e.preventDefault()
    setSharedState({...setSharedState, name:undefined, region:undefined, city:undefined})
    const {email, password} = e.target.elements
    try {
      const auth = getAuth()   
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      navigate('/myProfile');
    } catch (error) {
      alert(error)
    }
  }, history)  

  return(
      <div style={styles.container}>
          <h3 style={{color:DEFAULT_COLOR}}>Signup for a free account at tangosweden.se</h3>
          <div style={{fontSize:14, color:DEFAULT_COLOR}}>With an account you can add TDJ info. 
          To receive priviliges to add/update events in calendar see note at bottom of page.</div>
          <p/>
          <form onSubmit={handleSignup}>
              <input name='email' type='email' placeholder='Enter your E-mail' style={styles.input} />
              <p/><p/>
              <input name='password' type='password' placeholder='Choose a password' style={styles.input} />
              <p/><p/>
              <Button variant="outlined" type="submit" style={styles.button}>
                  Submit     
              </Button>    
          </form>

          <small style={{position:'fixed', bottom:0, margin:'auto', fontSize:10, color:DEFAULT_COLOR}}>
            NOTE: To get access to update the calendar withe events, you make a send a request to the mail address&nbsp;
            <a href="mailto:paelsis@hotmail.com?subject=Request for authorisation for calendar update">paelsis@hotmail.com</a>
          </small>
      </div>
  )
}  

export default FirebaseSignUp