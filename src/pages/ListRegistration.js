import React, {useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom'
import {serverFetchData} from '../services/serverFetch'
import ViewTable from '../components/ViewTable'
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export default () => {
    const [list, setList] = useState()
    const [colObjList, setColObjList] = useState()
    const location = useLocation()
    const {eventIdExtended, tableName} = location?.state?location.state:{}
    const url1 = eventIdExtended?apiBaseUrl + '/fetchRows?tableName=' + tableName + '&eventIdExtended=' + eventIdExtended:undefined
    const url2=eventIdExtended?apiBaseUrl + '/getColumns?tableName=' + tableName:undefined

      
    const handleReply1 = reply => {
        if (reply.status === 'OK') {
          setList(reply.result)
        } else if (reply.status === 'ERROR') {
          console.log('Failed to fetch registrations message:' + reply.message)
        } else {
          console.log('Failed to fetch registrations' + JSON.stringify(reply))
        }
    }

    const handleReply2 = reply => {
        if (reply.status === 'OK') {
          setColObjList(reply.result)
        } else {
          alert('Failed to fetch registrations' + JSON.stringify(reply))
        } 
    }
    
    useEffect(()=>{
        if (url1) {
          serverFetchData(url1, handleReply1)
        }  
        if (url2) {
          serverFetchData(url2, handleReply2)
        }
    }, [])    

    const colsEdit = ['firstName', 'lastName', 'email', 'phone', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'phonePartner', 'comment']
    const colsView = ['firstName', 'lastName', 'email', 'phone', 'firstNamePartner', 'lastNamePartner', 'emailPartner', 'phonePartner', 'message', 'comment']

    return(
        list&&colObjList?
          <ViewTable tableName={tableName} colObjList={colObjList} originalList={list} setOriginalList={setList} list={list} setList={setList} colsView={colsView} colsEdit={colsEdit} />
        :
          <h1>No registrations found</h1>
    )
}