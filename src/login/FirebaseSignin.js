import React, {useCallback, useContext, useEffect, useState} from "react"
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom';
import firebaseApp from '../services/firebaseApp'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import { useSharedState } from '../store';
import Button from '@mui/material/Button';
import {serverFetchDataResult} from '../services/serverFetch'

const styles = {
  container:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'center',
    color:'green',
    fontSize:24,
    fontWeight:200,
    height:'50vh'
  },
  button: color=>({
    color,
    border:'2px solid ' + color,
    padding:5
  }),
  input: color=>({
    color,
    borderColor:color,
    backgroundColor:'transparent',
    fontSize:24,
    fontWeight:200,
    outline: 0,
    border:'none',
    borderBottom: '2px solid ' + color,
    '&:hover':{
      backgroundColor:'red'
    }
  }),
  reset:{
    fontSize:10, 
  },
}

const FirebaseSignin = () => {
  const navigate = useNavigate()
  const [buttonColor, setButtonColor] = useState('green')
  const [credentials, setCredentials] = useState(undefined)
  const [uid, setUid] = useState(undefined)
  const [userSettings, setUserSettings] = useSharedState()

  const auth = getAuth()

  const handleResult = result => {
    //alert('AppBar 0:' + JSON.stringify(result?result:'No result'))
    if (result && result.region) {
        // alert('AppBar 1' + JSON.stringify(result))
        setUserSettings(result)
        navigate('/calendar/' + result.region);
    } else {
        // No user found in database, redirect to /settings
        navigate('/myProfile');
    }
  }

  const handleSignin = e => {
    e.preventDefault()
    setButtonColor('blue')
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then(userCredential => {
      // Signed in 
      const uid = userCredential.user.uid;
      setUid(uid)
      setButtonColor('green')
      const irl = '/getUser?email=' +  credentials.email
      serverFetchDataResult(irl, '', '', result=>handleResult(result))
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setButtonColor('red')
      alert(error.message)
    });
  }  

  const handleSignout = ()=>{
    setUid(undefined)
    signOut(auth)       
    navigate('/home');
  }

  const handleChange = e =>setCredentials({...credentials, [e.target.name]:e.target.value})
  const inputStyle = styles.input(buttonColor)
  const buttonStyle = styles.button(buttonColor)
  return(
    uid===undefined?
      <>
        <div style={styles.container}>
            <form  onSubmit={handleSignin}>
                 <p/>  
                <label>
                Signin with email and password<p/>
                </label>
                <input style={inputStyle} name='email' type='email' placeholder='Email' onChange={handleChange} />
                <p/>
                <input style={inputStyle} name='password' type='password' placeholder='Password' onChange={handleChange} />
                <p/>
                <Button variant="outlined"  type="submit" style={buttonStyle}>
                  Submit     
                </Button>    
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <p/>      
                <p/>      
                <p/>      
                <div style={{fontSize:14}}>Reset your password by double-click <Link to='/resetPassword'>here</Link></div>
                <div style={{fontSize:14}}>Signup for a free account by double-click <Link to='/signup'>here</Link></div>
            </form>
          </div>
        </>
    :
        <div style={styles.container}>
          <h4>You are signed in</h4>
          <Button style={buttonStyle} variant="outlined" onClick={() => handleSignout()}>
              Signout
          </Button>          
        </div>
      
  )
}  
 

export default FirebaseSignin