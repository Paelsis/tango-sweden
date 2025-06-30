
import React, {useState, useEffect} from 'react';
import {serverFetchData} from '../services/serverFetch'
import ViewTableSimple from './ViewTableSimple'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export default ({eventIdExtended, tblRegistration}) => {
  const [list, setList] = useState()
  const [colObjList, setColObjList] = useState()
    
  const handleReply1 = reply => {
      if (reply.status === 'OK') {
        setList(reply.result)
      } else if (reply.status === 'ERROR') {
        const msg = '[EditRegistration] Failed to fetch registrations from = ' + tblRegistration + ' message = ' + reply.message
        console.log(msg)
      } else {
        const msg = '[EditRegistration] Failed to fetch registrations from = ' + tblRegistration + ' reply = ' + JSON.stringify(reply)
        alert(msg)
      }
  }

  const handleReply2 = reply => {
      if (reply.status === 'OK') {
        setColObjList(reply.result)
      } else {
        const msg = 'Failed to fetch columns for = ' + tblRegistration + ' reply = ' + JSON.stringify(reply)
        alert(msg)
      } 
  }

  useEffect(()=>{
      const url1 = eventIdExtended?apiBaseUrl + '/fetchRows?tableName=' + tblRegistration + '&eventIdExtended=' + eventIdExtended:undefined
      if (url1) {
        serverFetchData(url1, handleReply1)
      }  
      const url2 = eventIdExtended?apiBaseUrl + '/getColumns?tableName=' + tblRegistration:undefined
      if (url2) {
        serverFetchData(url2, handleReply2)
      }
  }, [])    

  const colsView = ['firstName', 'lastName', 'email', 'phone', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'phonePartner', 'message', 'comment']
  return(
      list&&colObjList?
        <ViewTableSimple list={list} cols={colsView} />
      :
        <h1>No registrations found</h1>
  )
}
