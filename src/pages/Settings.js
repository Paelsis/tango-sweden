import React, {useEffect, useRef, useState} from "react"
import { useSharedState } from '../store';
import { Navigate, useNavigate } from 'react-router-dom';
import firebaseApp from '../services/firebaseApp'
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import FormTemplate from '../components/OLD_FormTemplate';
import serverFetch from '../services/serverFetch'
import Add from '../components/AddEvent'
import serverPost from "../services/serverPost";

const styles = {
    container:{
      position:'relative',
      top:100,
      display:'flex',
      alignItems:'center',
      flexDirection:'column',
      justifyContent:'center',
      color:'green',
      fontSize:24,
      fontWeight:200,
      height:'50vh',
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
    },
    {
      type:'text',
      label:'Region:',
      name:'region',
      required:true,
      tooltip:'Events with same region is show in same calendar for that region',
    },
    {
        type:'text',
        label:'User name',
        name:'name',
        required:'true', 
        tooltip:'First and last name of the logged in user'
    },
    {
        type:'text',
        label:'Text color',
        tooltip: 'Text color in text or hex code, Ex 1:red Ex 2:#F6A3BB',
        name:'color',
    },
    {
        type:'text',
        label:'Background color light',
        tooltip: 'Light background color when shifting from dark to light, Ex 1:lightBlue Ex 2:#F6A3BB',
        name:'backgroundColorLight',
    },
    {
        type:'text',
        label:'Background color dark',
        tooltip: 'Dark background color when shifting from dark to light, Ex 1:darkBlue Ex 2:#F6A3BB',
        name:'backgroundColorDark',
    },
]


export default props => {
    const [userSettings, setUserSettings] = useSharedState();
    const [email, setEmail] = useState(undefined)
    const [submitButtonColor, setSubmitButtonColor] = useState('grey')
    const [submitButtonVariant, setSubmitButtonVariant] = useState('outlined')

    const navigate=useNavigate();
    const auth = getAuth()

    const handleResult = (email, result) => {
      if (result !== undefined) {
        if (result.calendarName) {
          // alert('Settings:' + JSON.stringify(result) + ' email:' + email)
          setUserSettings(result)
        } else {
          alert('WARNING: No user found')
          setUserSettings({...userSettings, city:'U-N-K-N-O-W-N CITY', region:'U-N-K-N-O-W-N REGION'})
        }
      }   
    }
  
    useEffect(()=>{
      onAuthStateChanged(auth, user => {
        if (user.email) {
          setEmail(user.email);
          const irl = '/getUser?email=' +  user.email
          serverFetch(irl, '', '', result=>handleResult(user.email, result))
        } else {
          alert('Cannot fetch user from database')
        } 
      })
    }, [])
  
  
    const handleReplySubmit = (result) => {
      setSubmitButtonColor('green')
      if (result.status === 'OK') {
        const rec = result.rows.find(it=>it.email === email)
        // alert('RESULT value :' +  JSON.stringify(rec) + ' email:' + email)
        setUserSettings(rec)
        setTimeout(() => {setSubmitButtonColor('grey'); setSubmitButtonVariant('outlined')}, 1000);
      } else {
        setSubmitButtonColor('red') 
        setTimeout(() => {setSubmitButtonColor('grey'); setSubmitButtonVariant('contained')}, 2000);
      }
    }


    const handleSubmit = (e, value) => {

        e.preventDefault()
        setSubmitButtonColor('lightGreen')
        setSubmitButtonVariant('contained')
        if (!!email) {
          const record = {...value, email, creaTimestamp:undefined, updTimestamp:undefined, authLevel:undefined}
          const data = {tableName:'tbl_user', record, fetchRows:true}
          // alert('handleSubmit data:' + JSON.stringify(data))
          serverPost('/replaceRow', '', '', data, result=>handleReplySubmit(result))
        } else {
          alert('Error: Dont save data since system cannot find any valid login email address')
        }         
    }

    const color = userSettings.color
    const background = 'linear-gradient(to bottom right, ' + userSettings.backgroundColorLight + ' ,' + userSettings.backgroundColorDark + ')'

    const filterFields = fields.filter(it=>it.authLevel?userSettings.authLevel>=it.authLevel:true)

    return(  
      <div style={{...styles.container}}>
        {email?
          <>
            <FormTemplate 
                init={userSettings}
                fields={filterFields} 
                handleSubmit={handleSubmit}
                submitTooltipTitle={'Add to candidate list'}
                submitButtonText={'Add to list'}
                submitButtonColor={submitButtonColor}
                submitButtonVariant={submitButtonVariant}
            />
            <div>
              <div style={{position:'absolute', width:200, height:100, textAlign:'center', color, background}}>
                Show colors
              </div>  
            </div>
          </>           
        :
            <h1>
                No access
            </h1>
        }    
    </div>
  )  
}

