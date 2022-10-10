import React, {useEffect, useState} from "react"
import { Navigate, useNavigate } from 'react-router-dom';
import firebaseApp from '../services/firebaseApp'
import { getAuth, onAuthStateChanged} from 'firebase/auth';

import Add from './Add'

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
  

const Admin = () => {
    const [email, setEmail] = useState(undefined)
    const navigate=useNavigate();
    const auth = getAuth()
    useEffect(()=>onAuthStateChanged(auth, user => {
          setEmail(user.email)
    }), [])
    return(  
      email?
          <Add />
      :
        <div style={styles.container}>
          <h1>
                  No access
            </h1>
        </div>
    )
      
}

export default Admin