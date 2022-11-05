import React, {useEffect, useRef, useState} from "react"
import { useSharedState } from '../store';
import { Navigate, useNavigate } from 'react-router-dom';
import firebaseApp from '../services/firebaseApp'
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import FormTemplate from '../components/FormTemplate';
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
        label:'User name',
        name:'name',
        required:'true', 
        tooltip:'First and last name of the logged in user'
  },
  {
      type:'text',
      label:'Calendar name (Stockholm, Malmo, Gothemburg, Helsingborg, Halmstad, ...)',
      name:'calendarName',
      required:true,
      tooltip:'Events with same calendarName is show in same calendar'
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

    useEffect(()=>onAuthStateChanged(auth, user => {
        setEmail(user.email)
    }), [])

    const handleReply = (result, value) => {
      setSubmitButtonColor('green')
      if (result.status === 'OK') {
        setUserSettings({...userSettings, ...value})
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
          // alert('user:', user)
          const record = {...value, email}
          const data = {tableName:'tbl_user', record, fetchRows:true}
          //alert('handleSubmit:' + JSON.stringify(data))
          serverPost('/replaceRow', '', '', data, result=>handleReply(result, value))
        } else {
          alert('Error: Dont save data since system cannot find any valid login email address')
        }         
    }

    return(  
      <div style={{...styles.container}}>
        {email?
          <>
            <FormTemplate 
                init={userSettings}
                fields={fields} 
                handleSubmit={handleSubmit}
                submitTooltipTitle={'Add to candidate list'}
                submitButtonText={'Add to list'}
                submitButtonColor={submitButtonColor}
                submitButtonVariant={submitButtonVariant}
            />
          </>           
        :
            <h1>
                No access
            </h1>
        }    
    </div>
  )  
}

