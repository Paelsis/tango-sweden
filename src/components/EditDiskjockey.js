import React, {useState, useEffect, useReducer} from 'react';
import { useSharedState } from '../store';
import { useNavigate } from 'react-router-dom';
import FormTemplate from './FormTemplate';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import {serverPost} from '../services/serverPost'
import {serverFetchData} from '../services/serverFetch'
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import {REGIONS} from '../services/const'
import AddPhotoSingle from '../camera/AddPhotoSingle'
import { enhanceValueWithDraftVariables } from './DraftEditor'
const MAX_DESC_LENGTH = 40000

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const styles={
    container:{
        paddingTop:30,
        /*
        display: 'flex',
        flexDirection:'column',
        maxWidth:'100%',   
        alignItems:'center'
        */
       color:'black'
    },
  }

const fields = [
    {
        type:'text',
        label:'Nickname (if this is filled in, your real name is hidden on page)',
        name:'nickname',
        maxlength:100,
    },
    {
        type:'text',
        label:'First Name',
        name:'firstName',
        required:true,
        maxlength:100,
    },
    {
        type:'text',
        label:'Last Name',
        name:'lastName',
        required:true,
        maxlength:100,
    },
    /*
    {
        type:'email',
        label:'E-mail',
        name:'email',
        required:true
    },
    */
    {
        type:'text',
        label:'Phone',
        name:'phone',
        maxlength:16,
    },
    {
        type:'text',
        label:'City of DJ:',
        name:'city',
        required:true,
        tooltip:'Events with same city is show in same calendar for that city',
        placeholder:'Please enter your city',
        maxlength:80,
    },
    {
        type:'select',
        label:'Region of DJ:',
        name:'region',
        radioValues:REGIONS,
        selectValues:REGIONS,
        required:true,
        tooltip:'Events with same region is show in same calendar for that region',
        maxlength:80,

    },    
    {
        type:'checkbox',
        label:'Active',
        name:'active',
        tooltip: 'Checked if the DJ is active and want to be shown on the WEB-page'
    },
    {
        type:'comment',
        label:'Image of DJ',
        name:'urlImage',
        maxlength:100,
    },
    {
        type:'checkbox',
        label:'HTML-editor',
        name:'htmlEditor',
        tooltip: 'Event enddate defaults to same as startdate',
        maxlength:10,
    },
    {
        // type:'rte',
        type:'draft',
        label:'Description of DJ',
        name:'description',
        draftName:'draft_description',
        required:false,
        hiddenIf:'htmlEditor',
        maxlength:200,
    },
    {
        type:'textarea',
        label:'Description of DJ (in HTML)',
        name:'description',
        required:false,
        notHiddenIf:'htmlEditor',
        maxlength:40000,
    },
]

const Func = () => {
    const [sharedState, ] = useSharedState()
    const [signinEmail, setSigninEmail] = useState()
    const [value, setValue] = useState()
    const [list, setList] = useState([])
    const navigate = useNavigate()
    const auth = getAuth()

    const subdir = '/images/user'


    // useEffect(()=>setValue(props.init),[props.init])
    const handleReplyDj = reply => {

        if (reply?reply.status === 'OK':false) {
            if (reply.result) {
                setValue(enhanceValueWithDraftVariables(fields, reply.result))
            } else {
                console.log('[EditDj.js] No current info about DJ') 
            }    
        } else {
            setValue(enhanceValueWithDraftVariables(fields, undefined))
            console.log('Currently no info regarding DJ')
        }
    }


    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            if (user?user.email:false) {
                // Get DJ for the email of the logged in user
                setSigninEmail(user.email);
                const irl1 = '/getDj?email=' + user.email
                serverFetchData(irl1, handleReplyDj)
            } 
        })
    }, [])

    const deleteRow = index => setList(list.filter((it, idx)=>idx !== index))  

    const handleCancel = () => {
        navigate('/calendar/' + sharedState.region)
    }

    const handleReset = () => {
        setValue({})
    }

    const handleSaveReply = result => {
        if (result.status === 'OK') {
          console.log('Description saved on disk')  
        } else {
          if (result.message) {
            alert(JSON.stringify(result.message))  
          }  
          console.log('ERROR:Save DJ failed')  
        }
    }
  
    const handleSave = () => {
        if (!!signinEmail) {
            const active = value.active == 1?1:0
            const record = {...value, active, email:signinEmail, authLevel:undefined, html:undefined, draft_description:undefined, creaTimestamp:undefined, updTimestamp:undefined}
            const data = {tableName:'tbl_dj', record, fetchRows:true}
            if (value.description?value.description.length > MAX_DESC_LENGTH:false) {
                alert('WARNING: Application doew not does not allow to save text longer than ' + MAX_DESC_LENGTH + ' characthers')
            } else {
                serverPost('/replaceRow', data, handleSaveReply)
            }    
        } else {
            alert('No valid email when saving')
        }   
    }

    const handleSaveImage = (urlImage, result) => {
        if (result.status === 'OK') {
            const row = result.list.find(it=>it.email === signinEmail)
            if (row) {
                console.log('Image ' + urlImage + ' saved to disk')  
                setTimeout(()=>{
                    URL.revokeObjectURL(urlImage)
                    window.location.reload(false);
                }, 
                2000);
        
            } else {
                setValue({...row, urlImage:undefined})
                console.log('[EditDisckjockey] Image not found in list')  
            }
          } else {
            if (result.message) {
              alert(JSON.stringify(result.message))  
            }  
            console.log('ERROR:Save DJ failed')  
        }
  
    }

    const setUrlImage = fname => {
        if (fname) {
            const urlImage = apiBaseUrl + '/' + subdir + '/' + fname
            const active = value.active == 1?1:0
            const record = {...value, active, email:signinEmail, urlImage, html:undefined, draft_description:undefined, creaTimestamp:undefined, updTimestamp:undefined}
            const data = {tableName:'tbl_dj', record, fetchRows:true}
            setValue({...value, urlImage})
            serverPost('/replaceRow', data, result=>handleSaveImage(urlImage, result))
        } else {
            alert("ERROR: Image not loaded")
        }
    }    

    const buttons=[
        {
            type:'button',
            label:'Save',
            validate:true,
            handleClick:handleSave
        },    
        {
            type:'button',
            label:'Undo',
            handleClick:handleReset
        },    
        {
            type:'button',
            label:'Cancel',
            onClick:handleCancel
        },    
    ]

    return(
        <div style={styles.container}>
            {value?
                <>
                    <h3 style={{textAlign:'center'}}>If you are a TDJ, please enter your data</h3>
                    <div className='columns m-6 is-center'>
                        <div className='column is-8'>
                            <FormTemplate 
                                        fields={fields} 
                                        value={value}
                                        setValue={setValue}
                                        setList={setList}
                                        buttons={buttons}
                            />
                        </div>
                        <div className='column is-4'>

                            <img src={value.urlImage?value.urlImage:''} alt={'No photo (Fill in data before uploading photo'}/>
                            {signinEmail?<AddPhotoSingle 
                                remove={true}
                                filename={signinEmail} 
                                matching={signinEmail} 
                                subdir={subdir}
                                list={list} 
                                setUrlImage={setUrlImage} />
                            :null}  
                        </div> 
                    </div>    
                </>
            :
                <div className='content' style={{textAlign:'center', margin:'auto'}}>
                    <h4>Please signup/signin to add/edit your TDJ info</h4>
                    <h4>If you want access to add/update events in calendar, please contact Per Gustav Eskilson at <a href="mailto:paelsis@hotmail.com">paelsis@hotmail.com</a></h4>
                </div>
            }    
        </div>
    )
        
}

export default Func

