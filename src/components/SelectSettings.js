import React, {useEffect, useRef, useState} from "react"
import { useSharedState } from '../store';
import { Navigate, useNavigate } from 'react-router-dom'
import firebaseApp from '../services/firebaseApp'
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import FormTemplate from '../components/FormTemplate'
import {serverFetchDataResult} from '../services/serverFetch'
import Add from '../components/AddEvent'
import serverPost from "../services/serverPost"
import Square from "../components/Square"
import { ADMINISTRATORS } from "../services/const";

export default ({email, userSettings, setUserSettings}) => {
    const [users, setUsers] = useState([])

    const handleResult = result => {
        if (!!result) {
           setUsers(result)
        } else {
          alert(JSON.stringify(result))
          alert('Failed to fetch rows from tbl_user')
        }   
      }
  
    useEffect(()=>{
            const irl = '/getUsers'
            serverFetchDataResult(irl, '', '', result=>handleResult(result))
    }, [])

    const handleChange = e => {
        const user = users.find(it => e.target.value === it.email)
        setUserSettings(user)
        //alert(e.target.name + '=' + JSON.stringify(e.target.value))
    }

    return (
        <>
        {ADMINISTRATORS.includes(email)?
        <>
        <label>Choose user (only for administrators):</label>
        <select 
            name='email' 
            value={userSettings.email}
            onChange={handleChange}
        >
            <option selected disabled value={'test'}>Choose settings</option>
            {users.map(user => <option name={user.name} value={user.email} defaultValue={userSettings.email === user.email} >{user.name}</option>)}
        </select>
        </>
        :null}
        </>
    )    
}



