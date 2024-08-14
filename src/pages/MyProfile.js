import React, {useEffect, useRef, useReducer, useState} from "react"
import { useSharedState } from '../store';
import { Navigate, useNavigate } from 'react-router-dom'
import firebaseApp from '../services/firebaseApp'
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import FormTemplate from '../components/FormTemplate'
import SelectSettings from '../components/SelectSettings'
import {serverFetchData} from '../services/serverFetch'
import serverPost from "../services/serverPost"
import Square from "../components/Square"
import {BUTTON_STYLE, REGIONS, DEFAULT_AUTH_LEVEL, STATUSLINE_STYLE, COLORS} from '../services/const'
import withStatusLine from '../components/withStatusLine'


const styles = {
    container:{
      top:400,
      color:'green',
      fontSize:18,
      fontWeight:400,
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
  

  const fields = [
    {
      type:'text',
      label:'City:',
      name:'city',
      required:true,
      tooltip:'Events with same city is show in same calendar for that city',
      placeholder:'Please enter your city'
    },
    {
      type:'radio',
      label:'Region:',
      name:'region',
      radioValues:REGIONS,
      required:true,
      tooltip:'Events with same region is show in same calendar for that region',
    },
    {
        type:'text',
        label:'User name',
        name:'name',
        required:'true', 
        tooltip:'First and last name of the logged in user',
        placeholder:'Please enter your name'
    },
    {
      type:'comment',
      label:' ',
      name:'calendarProps',
    },
    {
      type:'comment',
      label:'---- The fields below only required by calendar ----',
      name:'calendarProps',
    },
    {
      type:'comment',
      label:' ',
      name:'calendarProps',
    },
    {
        type:'text',
        label:'Text color',
        tooltip: 'Text color in text or hex code, Ex 1:red Ex 2:#F6A3BB',
        name:'color',
    },
    {
        type:'text',
        label:'Background color dark (for calendar)',
        tooltip: 'Dark background color when shifting background color from dark to light, Ex 1:darkBlue Ex 2:#F6A3BB',
        name:'backgroundColorDark',
    },
    {
      type:'text',
      label:'Background color light (for calendar)',
      tooltip: 'Light background color when shifting background color from dark to light, Ex 1:lightBlue Ex 2:#F6A3BB',
      name:'backgroundColorLight',
  },
  {
      type:'text',
      label:'Background image (Use url of image-background in calendar)',
      tooltip: 'You can use a url to an image stored on internet type https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png',
      name:'backgroundImage',
    },
    { 
      type:'checkbox',
      name:'hasBorder',
      label:'I want a border (for calendar)',
      tooltip: 'I want a border around my event',
    },
    { 
      type:'radio',
      name:'borderStyle',
      label:'BorderStyle',
      radioValues:['none', 'solid', 'dotted', 'dashed'],
      tooltip: 'Border style (for calendar)',
      notHiddenIf:'hasBorder'
    },
    { 
      type:'radio',
      name:'borderWidth',
      label:'Border thickness',
      radioValues:['1px', '2px', '3px', '4px'],
      tooltip: 'Thickness of border (for calendar)',
      notHiddenIf:'hasBorder'
    },
    {
      type:'text',
      label:'Border color',
      tooltip: 'Color of border',
      //disabled:true,
      name:'borderColor',
      notHiddenIf:'hasBorder'
    },
    {
      type:'checkbox',
      label:'Is diskjockey',
      tooltip: 'If you are a DJ you will after login be directly redirected to Add/Update DJ page',
      //disabled:true,
      name:'isDiskjockey',
    },
]

// Settings.js
const Func = props => {
    const [email, setEmail] = useState(undefined)
    const [userSettings, setUserSettings] = useSharedState()
    const [buttonStyle, setButtonStyle] = useState(BUTTON_STYLE.DEFAULT)
    const auth = getAuth()

    const navigate = useNavigate();

    const handleReply = (email, data) => {
      if (data) {
        if (data.status === 'OK' && !!data.result) {
            setUserSettings({...userSettings, email, ...data.result})
        } 
      } else {
        alert('Please enter region, name and save your profile')
      }  
    }

    useEffect(()=>{
      onAuthStateChanged(auth, user => {
        if (user?user.email:false) {
          setEmail(user.email);
          const irl = '/getUser?email=' +  user.email
          serverFetchData(irl, '', '', data=>handleReply(email, data))
        }  
      })
    }, [])
   
  
    const handleSaveReply = result => {
      if (result.status === 'OK') {
        const rec = result.rows.find(it=>it.email === email)
        // alert('RESULT value :' +  JSON.stringify(rec) + ' email:' + email)
        setButtonStyle(BUTTON_STYLE.SAVED)
        if (rec.namn) {
          setUserSettings(rec)
        }  
        setTimeout(() => 
          {
            setButtonStyle(BUTTON_STYLE.DEFAULT) 
          },  
        2000);
      } else {
        setButtonStyle(BUTTON_STYLE.ERROR) 
        setTimeout(() => setButtonStyle(BUTTON_STYLE.DEFAULT), 5000);
      }
    }

    const handleSave = (e, value) => {

        e.preventDefault()
        setButtonStyle(BUTTON_STYLE.CLICKED)
        if (!!email) {
          const backgroundImage = value.backgroundImage?value.backgroundImage:null
          const borderStyle = value.hasBorder?value.borderStyle:'none'
          const authLevel = value.authLevel?value.authLevel:DEFAULT_AUTH_LEVEL // Set auth level to default value if it is not set before
          const record = {...value, email, backgroundImage, creaTimestamp:undefined, updTimestamp:undefined, authLevel:undefined, borderStyle, authLevel}
          const data = {tableName:'tbl_user', record, fetchRows:true}
          //alert('Data:' + JSON.stringify(record))
          serverPost('/replaceRow', '', '', data, result=>handleSaveReply(result))
        } else {
          alert('Error: Dont save data since system cannot find any valid login email address')
        }         
    }

    const filterFields = fields.filter(it=>it.authLevel?userSettings.authLevel>=it.authLevel:true)
    const buttons=[
      {
          type:'button',
          label:'Save',
          style:buttonStyle,
          validate:true,
          variant:(buttonStyle===BUTTON_STYLE.SAVED)?'contained':'outlined',
          color:'green',
          tooltip:'Ensire to save your profile before continue',
          handleClick:e=>handleSave(e, userSettings)
      },    
    ]

    return(  
      <div style={styles.container}>
        {email?
          <>
            <h4 style={{color:'green', textAlign:'center'}}>Please choose your city, region and enter your name and save</h4>
            <div className='columns m-4 is-centered'>
              {/*JSON.stringify(allUsers)*/}
              <div className='column is-4'>
              <FormTemplate 
                  fields={filterFields} 
                  value={userSettings}
                  setValue={setUserSettings}
                  buttons={buttons}
              />
              </div>
              <div className='column is-2'>
                <Square settings={userSettings} />
                <SelectSettings email={email} userSettings={userSettings} setUserSettings={setUserSettings} /> 
              </div>
            </div>           
          </>
        :null
    }    
    </div>
  )  
}

export default withStatusLine(Func)

