import React, {useEffect, useRef, useState} from "react"
import { useSharedState } from '../store';
import { Navigate, useNavigate } from 'react-router-dom'
import firebaseApp from '../services/firebaseApp'
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import FormTemplate from '../components/FormTemplate'
import {serverFetchData} from '../services/serverFetch'
import Add from '../components/AddEvent'
import {serverPost} from "../services/serverPost"
import Square from "../components/Square"
import { ADMINISTRATORS } from "../services/const";

export default ({email}) => {
    const [users, setUsers] = useState([])
    const [sharedState, setSharedState] = useSharedState()
    const handleResult = data => {
        if (data.status === 'OK') {
           setUsers(data.result)
        } else {
          alert('ERROR in response data:' + JSON.stringify(data))
          alert('Failed to fetch rows from tbl_user')
        }   
      }
  
    useEffect(()=>{
            const irl = '/getUsers'
            serverFetchData(irl,  result=>handleResult(result))
    }, [])

    const handleChange = e => {
        const user = users.find(it => e.target.value === it.email)
        const newSharedState = {...user, authLevel:sharedState.authLevel, authLevelOverride:user.authLevel?user.authLevel:1}
        // alert(JSON.stringify(newSharedState))
        setSharedState(newSharedState)
        //alert(e.target.name + '=' + JSON.stringify(e.target.value))
    }
    const authLevel = sharedState.authLevel
    return (
        <>
            {authLevel >= 8?
                <>
                <label>Choose user (only for administrators):</label>
                <select 
                    name='email' 
                    value={email}
                    onChange={handleChange}
                >
                    <option selected disabled value={email}>Select user</option>
                    {users.map(user => <option name={user.name} value={user.email}>{user.name}</option>)}
                </select>
                </>
            :null}    
        </>
    )    
}



