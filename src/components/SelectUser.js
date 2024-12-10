import React, {useEffect, useRef, useState} from "react"
import { useSharedState } from '../store';
import { Navigate, useNavigate } from 'react-router-dom'
import firebaseApp from '../services/firebaseApp'
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import FormTemplate from './FormTemplate'
import {serverFetchData} from '../services/serverFetch'
import Add from '../pages/AddEvent'
import {serverPost} from "../services/serverPost"
import Square from "./Square"
import { ADMINISTRATORS } from "../services/const";

// SelectUser
export default ({email}) => {
    const [users, setUsers] = useState()
    const [sharedState, setSharedState] = useSharedState()
    const handleResult = data => {
        if (data.status === 'OK') {
            let usersLcl = undefined;
            if (sharedState.authLevel >=16) {
                usersLcl = data.result.map(it=>({...it, authLevel:sharedState.authLevel}))
            } else if (sharedState.authLevel >=8) {
                usersLcl = data.result.filter(it=>it.private !=1).map(it=>({...it, authLevel:sharedState.authLevel}))
            }
            setUsers(usersLcl)
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
        // Keep the auth level you logged in with
        const newSharedState = {...sharedState, ...user}
        // alert('getUsers:' + JSON.stringify(newSharedState))
        setSharedState(newSharedState)
        //alert(e.target.name + '=' + JSON.stringify(e.target.value))
    }
    const authLevel = sharedState.authLevel
    return (
        <>
            {users?
                <>
                <label>Choose user (only for administrators):</label>
                <select 
                    name='email' 
                    value={email}
                    onChange={handleChange}
                >
                    <option selected disabled value={email}>Select user</option>
                    {users.map(user =>
                        <option value={user.email}>
                            {user.name + ' ' + user.email}
                        </option>)
                    }
                </select>
                </>
            :null}    
        </>
    )    
}



