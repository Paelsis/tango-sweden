import React, {useState} from "react"
import {withRouter} from "react-router"
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import Button from '@mui/material/Button';

const DEFAULT_COLOR='green'

const styles = {
  container:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'center',
    fontSize:24,
    fontWeight:200,
    height:'50vh',
    color:DEFAULT_COLOR,
  },
  button:{
    border:'2px solid ' + DEFAULT_COLOR,
    padding:3,
    color:DEFAULT_COLOR,
  },
  input: {
    fontSize:24,
    fontWeight:200,
    outline: 0,
    border:'none',
    borderBottom: '2px solid ' + DEFAULT_COLOR,
    '&:hover':{
      backgroundColor:DEFAULT_COLOR
    },
    backgroundColor:'transparent',
    color:DEFAULT_COLOR,
    borderColor:DEFAULT_COLOR,
  },
  reset:{
    fontSize:10, 
  },
}

const FirebaseResetPassword = () =>  {
  const [email, setEmail] = useState(undefined)
  const [mailSent, setMailSent] = useState(undefined)
  const auth = getAuth()
  const handleChange = e => setEmail(e.target.value)
  const handleSubmit = e => {
    e.preventDefault()
    sendPasswordResetEmail(auth, email).then(() => {
        setMailSent(true)
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error)
    })
  }
  return(
    <div style={styles.container}>
      {mailSent?
        <h4 style={{color:DEFAULT_COLOR}}>Check for a mail that contains a link to reset your password</h4>
      :
        <div style={{color:DEFAULT_COLOR}}>
          <h4 style={{color:DEFAULT_COLOR}}>Please send me an email with a link to reset my password</h4>
          <form onSubmit={handleSubmit}>
              <label>
                <input name='email' style={styles.input} type='email' placeholder='Please enter your email' onChange={handleChange} />
              </label>
              <p/>
              <Button variant="outlined"  type="submit" style={styles.button}>
                  Submit    
              </Button>    
          </form>
        </div>
      }
    </div>
  )
}  

export default FirebaseResetPassword