import React, {useEffect, useRef, useReducer, useState} from "react"
import { useSharedState } from '../store';
import { Navigate, useNavigate } from 'react-router-dom'
import firebaseApp from '../services/firebaseApp'
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import FormTemplate from '../components/FormTemplate'
import SelectUser from '../components/SelectUser'
import {replaceRow} from "../services/serverPost"
import Square from "../components/Square"
import {BUTTON_STYLE, REGIONS, COUNTRIES, DEFAULT_AUTH_LEVEL, STATUSLINE_STYLE, COLORS} from '../services/const'
import {serverFetchData} from '../services/serverFetch'
import MyImage from '../camera/MyImage'

const TBL_USER = 'tbl_user'

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
  

  const fieldsDJ = [
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
      type:'radio',
      label:'Country:',
      name:'country',
      radioValues:COUNTRIES,
      required:true,
      tooltip:'Events from same country will have button in the color of the country',
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
      type:'checkbox',
      label:'Is diskjockey',
      tooltip: 'If you are a DJ you will after login be directly redirected to Add/Update DJ page',
      //disabled:true,
      name:'isDiskjockey',
    },
]

const fieldsCAL = [
  {
      type:'text',
      label:'Full name',
      name:'name',
      required:'true', 
      tooltip:'First and last name of the logged in user',
      placeholder:'Please enter your name'
  },
  {
    type:'text',
    label:'Nickname',
    name:'nickname',
    tooltip:'First and last name of the logged in user',
    placeholder:'Only for DJs and Private teachers'
  },
  {
    type:'text',
    label:'Phone',
    name:'phone',
    tooltip:'Phone number of the user',
  },
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
    type:'radio',
    label:'Country:',
    name:'country',
    radioValues:COUNTRIES,
    required:true,
    tooltip:'Events from same country will have button in the color of the country',
  },
  {
    type:'checkbox',
    label:'Is diskjockey',
    tooltip: 'If you are a DJ you will after login be directly redirected to Add/Update DJ page',
    //disabled:true,
    name:'isDiskjockey',
  },
  {
    // type:'rte',
    type:'draft',
    label:'Description of DJ',
    name:'descriptionDJ',
    //draftName:'draft_descriptionDJ',
    required:false,
    notHiddenIf:'isDiskjockey',
    maxlength:5000,
  },
  {
    type:'checkbox',
    label:'Is private teacher',
    tooltip: 'If you are a DJ you will after login be directly redirected to Add/Update DJ page',
    //disabled:true,
    name:'isPrivateTeacher',
  },
  {
    // type:'rte',
    type:'draft',
    label:'Description of private teacher',
    name:'descriptionPT',
    // draftMNdraftName:'draft_descriptionPT',
    required:false,
    notHiddenIf:'isPrivateTeacher',
    maxlength:200,
  },
  {
    type:'checkbox',
    label:'Private',
    tooltip: 'If this box is checked, you are the only person who can change your events, i.e. your events are completely private',
    //disabled:true,
    name:'private',
  },
  /*  
  {
      type:'text',
      label:'Text color',
      tooltip: 'Text color in text or hex code, Ex 1:red Ex 2:#F6A3BB',
      name:'color',
  },
  {
    type:'text',
    label:'Background color top left (for calendar)',
    tooltip: 'Background color shift from top left to bottom right. This is the top left color',
    name:'backgroundColorLight',
  },
  {
    type:'text',
    label:'Background color bottom right (for calendar)',
    tooltip: 'Background color shift from top left to bottom right. This is the bottom right color',
    name:'backgroundColorDark',
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
  */
]


// MyProfile
export default () => {
    const [sharedState, setSharedState] = useSharedState()
    const [signinEmail, setSigninEmail] = useState(undefined)
    const buttonStyle = useState(BUTTON_STYLE.DEFAULT)
    const auth = getAuth()
    const subdir = 'images/user'
    const navigate = useNavigate()

    const handleReply = (data) => {' '
      if (data.status === 'OK') {
        setSharedState({...sharedState, ...data.result})
        if (data.message) {
            console.log('Message:' + data.message)
        }
      } else {
        console.log('ERROR: data.status = ' + data.status + ' message:' + data.message)
        alert('ERROR: Failed to fetch user')
      }  
    }

    useEffect(()=>{
      onAuthStateChanged(auth, user => {
        if (user?user.email:false) {
          const irl = '/getUser?email=' +  user.email
          setSigninEmail(user.email);
          serverFetchData(irl,  data=>handleReply(data))
        }  
      })
    }, [])
  
    const handleSaveReply = reply => {
      if (reply.status === 'OK') {
        const rec = reply.list.find(it=>it.email === signinEmail)
        if (rec?.name?rec.name:undefined) {
            alert('You saved the profile successfully for user ' + (rec.name?rec.name:'<Name undefined>'))
            setSharedState({...rec, authLevel:sharedState.authLevel})
            navigate(-1)
        }  

      } else {
        alert('ERROR: Failed to save the profile')
      }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!!signinEmail) {
          const backgroundImage = sharedState.backgroundImage?sharedState.backgroundImage:null
          const borderStyle = sharedState.hasBorder?sharedState.borderStyle:'none'
          const record = {...sharedState, email:signinEmail, backgroundImage,  borderStyle, creaTimestamp:undefined, updTimestamp:undefined, authLevel:sharedState.authLevel}
          const data = {...record, fetchRows:true}
          //alert('Data:' + JSON.stringify(record))
          replaceRow(TBL_USER, data, reply=>handleSaveReply(reply))
        } else {
          alert('Error: Dont save data since system cannot find any valid login email address')
        }         
    }

    const buttons=[
      {
          type:'submit',
          label:'Save',
          style:BUTTON_STYLE.DEFAULT,
          variant:'outlined',
          color:'grey',
          tooltip:'Save your profile',
      },    
      {
        type:'button',
        label:'Back',
        style:BUTTON_STYLE.DEFAULT,
        variant:'outlined',
        color:'grey',
        tooltip:'Go to previous page',
        onClick:()=>navigate(-1)
      },    
    ]

    return(  
      <div style={styles.container}>
        {sharedState?
          <>
            <h4 style={{color:'green', textAlign:'center'}}>Please choose your city, region and enter your name and save</h4>
              {/*JSON.stringify(allUsers)*/}
              {sharedState.authLevel >=4?   
                <div className='columns m-4 is-centered'>
                  <div className='column is-4'>
                    <FormTemplate 
                      fields={fieldsCAL} 
                      value={sharedState}
                      setValue={setSharedState}
                      buttons={buttons}
                      handleSubmit={handleSubmit}
                    />
                  </div>
                  <div className='column is-2'>
                    <SelectUser email={signinEmail} sharedState={sharedState} setSharedState={setSharedState} /> 
                    <MyImage tableName={TBL_USER} email={signinEmail} subdir={subdir} value={sharedState} setValue={setSharedState} />
                    </div>
                </div>
              :
                <div className='columns m-4 is-centered'>
                  <div className='column is-4'>
                    <FormTemplate 
                      fields={fieldsDJ} 
                      value={sharedState}
                      setValue={setSharedState}
                      buttons={buttons} 
                      handleSubmit={handleSubmit}
                    />
                  </div>  
                </div>  
              }              
          </>
        :null
    }    
    </div>
  )  
}
/*
<Square settings={sharedState} />
*/



