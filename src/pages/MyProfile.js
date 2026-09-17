import React, {useEffect, useContext, useState} from "react"
import { useSharedState } from '../store';
import {AuthContext} from "../login/FirebaseAuth"
import { useNavigate } from 'react-router-dom'
import firebaseApp from '../services/firebaseApp'
import { getAuth, onAuthStateChanged} from 'firebase/auth'
import FormTemplate from '../components/FormTemplate'
import SelectUser from '../components/SelectUser'
import {replaceRow} from "../services/serverPost"
import Square from "../components/Square"
import {BUTTON_STYLE, REGIONS, COUNTRIES, DEFAULT_AUTH_LEVEL, STATUSLINE_STYLE, COLORS} from '../services/const'
import {REGIONS_BY_COUNTRY, DEFAULT_COUNTRY} from '../services/regionsByCountry'
import {serverFetchData} from '../services/serverFetch'
import MyImage from '../camera/MyImage'
import {QUILL_EDITOR} from '../services/const'


const TBL_USER = 'tbl_user'

const styles = {
    container:{
      top:400,
      color:'green',
      fontSize:18,
      fontWeight:400,
      textAlign:'left',
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
      type:'select',
      label:'Country (default value):',
      name:'country',
      selectValues:Object.keys(REGIONS_BY_COUNTRY),
      required:true,
      tooltip:'Events from same country will have button in the color of the country',
    },
    {
      type:'select',
      label:'Region (default value):',
      name:'region',
      selectValues:REGIONS_BY_COUNTRY.Sweden,
      selectValuesFunc:value=>REGIONS_BY_COUNTRY[value.country]??REGIONS_BY_COUNTRY.Sweden,
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
      type:'checkbox',
      label:'Is diskjockey',
      name:'isDiskjockey',
      tooltip: 'If you are a DJ you will after login be directly redirected to Add/Update DJ page',
      //disabled:true,
    },
]

const fieldsCAL = [
  {
      type:'text',
      label:'Name (first and last)',
      name:'name',
      required:true, 
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
    type:'select',
    label:'Country (default value):',
    name:'country',
    selectValues:Object.keys(REGIONS_BY_COUNTRY),
    required:true,
    tooltip:'Events from same country will have button in the color of the country',
  },
  {
    type:'select',
    label:'Region (default value):',
    name:'region',
    selectValues:REGIONS_BY_COUNTRY.Sweden,
    selectValuesFunc:value=>REGIONS_BY_COUNTRY[value.country]??REGIONS_BY_COUNTRY.Sweden,
    required:true,
    tooltip:'Events with same region is show in same calendar for that region',
  },
  {
    type:'text',
    label:'City (default value):',
    name:'city',
    required:true,
    tooltip:'Events with same city is show in same calendar for that city',
    placeholder:'Please enter your city'
  },
  {
    type:'checkbox',
    label:'Is diskjockey',
    name:'isDiskjockey',
    tooltip: 'If you are a DJ you will after login be directly redirected to Add/Update DJ page',
    //disabled:true,
  },
  {
    type:QUILL_EDITOR,
    label:'Description of DJ',
    name:'descriptionDJ',
    required:false,
    notHiddenIf:'isDiskjockey',
    maxlength:5000,
  },
  {
    type:'checkbox',
    label:'Is private teacher',
    name:'isPrivateTeacher',
    tooltip: 'If you are a DJ you will after login be directly redirected to Add/Update DJ page',
    //disabled:true,
  },
  {
    type:QUILL_EDITOR,
    label:'Description of private teacher',
    name:'descriptionPT',
    required:false,
    notHiddenIf:'isPrivateTeacher',
    maxlength:5000,
  },
  {
    type:'checkbox',
    label:'Private',
    name:'private',
    tooltip: 'If this box is checked, you are the only person who can change your events, i.e. your events are completely private',
    //disabled:true,
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
    const [value, setValue] = useState({})
    const subdir = process.env.REACT_APP_IMAGES_USER_DIR 
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)  
    const signinEmail = user?.email?user.email:undefined

    
    useEffect(()=>{
      if (signinEmail?true:false) {

        const handleResult = data => {
          //alert('AppBar 0:' + JSON.stringify(result?result:'No result'))
          if (data.status === 'OK') {
            if (data.message) {
              alert(data.message)
            }
            // getUser returns an sharedState object in data.result 
            const result = data.result;
            setValue({...value, ...result})
          } else {
            setValue({...sharedState, authLevel:4, productLevel:1, country:'Sweden', city:'Ankeborg', region:'Skåne', userName:'Kalle Anka'}) 
            navigate('/myProfile')
          } 
        }
        if (signinEmail) {
          const irl = '/getUser?email=' +  signinEmail
          serverFetchData(irl,  handleResult)
        } else {
          alert('[MyProfile] ERROR: No email')
        }  
      } 

    }, [signinEmail])

    const handleReplaceReply = reply => {
          const data = reply.data?reply.data:reply
          
          if (data.status === 'OK') {
            const rec = data?.list?data.list.find(it=>it.email === signinEmail):undefined
            if (rec?.name?rec.name:undefined) {
                setSharedState({...sharedState, country:value.country, region:value.region, city:value.city})
                // navigate(-1)
            } else {
                setSharedState({...sharedState, country:'Sverige', region:'Stockholm', city:'Stockholm', authLevel:4})
            }    
            alert('Successful save of profile')
          } else {
            alert('ERROR: Failed to save the profile for data:' + JSON.stringify(data))
          }
    }


    const handleSubmit = e => {
        e.preventDefault()
        if (!signinEmail) {
            navigate('/signin')
        } else {
          let record = {...sharedState, 
              ...value, 
              email:signinEmail, 
              creaTimestamp:undefined, 
              updTimestamp:undefined, 
              profileImage:sharedState.profileImage?sharedState.profileImage:'UNDEFINED',
              authLevel:sharedState.authLevel,
              fetchRows:true,   
          }
          replaceRow(TBL_USER, record, reply=>handleReplaceReply(reply))
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
          <>
            <h4 style={{color:'green', textAlign:'center'}}>Please chose your city, region and enter your name and save</h4>
            <div className='columns m-4 is-centered'>
              <div className='column is-4'>
                <FormTemplate 
                  fields={fieldsCAL} 
                  value={value}
                  setValue={setValue}
                  buttons={buttons}
                  handleSubmit={handleSubmit}
                />
              </div>
                <div className='column is-2'>
                  {sharedState.authLevel >=4?<SelectUser email={signinEmail} sharedState={sharedState} setSharedState={setSharedState} />:null}
                  <MyImage tableName={TBL_USER} email={signinEmail} subdir={subdir} sharedState={sharedState} setSharedState={setSharedState} />
                </div>
            </div>              
          </>
    </div>
  )  
}
/*
<Square settings={sharedState} />
*/



