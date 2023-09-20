import React, {useState, useEffect} from 'react';
import { useSharedState } from '../store';
import { useNavigate } from 'react-router-dom';
import FormTemplate from './FormTemplate';
import Button from '@mui/material/Button';
import moment from 'moment'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import serverPost from '../services/serverPost'
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { BUTTON_STYLE } from '../services/const';



const styles={
    container:{
        paddingTop:30,
        /*
        display: 'flex',
        flexDirection:'column',
        maxWidth:'100%',   
        alignItems:'center'
        */
    },
  }


const DeleteButton = ({onClick}) =>
    <IconButton
    size="small"
    edge="start"
    color="inherit"
    sx={{ mr: 0 }}
    onClick={onClick}
    >
        <DeleteIcon 
            id="basic-button"
        />
    </IconButton>

const RemoveCircle = ({onClick}) =>
    <IconButton
    size="small"
    edge="start"
    color="inherit"
    sx={{ mr: 0 }}
    onClick={onClick}
    >
        <RemoveCircleIcon 
            id="basic-button"
        />
    </IconButton>

const Save = ({onClick}) =>
    <IconButton
    size="large"
    edge="start"
    color="inherit"
    sx={{ mr: 0 }}
    onClick={onClick}
    >
        <SaveIcon 
            id="basic-button"
        />
    </IconButton>


const fields = [
    {
        type:'radio',
        label:'Dance role:',
        name:'role',
        radioValues:
        [
            {label:'Follower', value:0},
            {label:'Leader', value:1},
            {label:'Both', value:2},
        ],
        tooltip:'Dance role can be leader, follower or both',
        required:true,
    },
    {
        type:'text',
        label:'First name',
        name:'firstName',
        required:true
    },
    {
        type:'text',
        label:'Last name',
        name:'lastName',
        required:true
    },
    {
        type:'email',
        label:'E-mail',
        name:'email',
        required:true
    },
    {
        type:'text',
        label:'Phone number',
        name:'phone',
        required:true
    },
    {
        type:'checkbox',
        label:'I have a partner',
        name:'havePartner',
    },
    {
        type:'text',
        label:'First name partner',
        name:'firstName',
        required:true,
        notHiddenIf:'havePartner',
    },
    {
        type:'text',
        label:'Last name partner',
        name:'lastName',
        required:true,
        notHiddenIf:'havePartner',

    },
    {
        type:'email',
        label:'E-mail partner',
        name:'emailPartner',
        required:true,
        notHiddenIf:'havePartner',

    },
    {
        // type:'rte',
        type:'draft',
        label:'Comment',
        name:'comment',
    },
]



export default props => {
    const [userSettings,] = useSharedState()
    const [value, setValue] = useState({})
    const [buttonStyle, setButtonStyle] = useState(BUTTON_STYLE.DEFAULT)
    const [list, setList] = useState([])
    const navigate = useNavigate()
    const auth = getAuth()
    const irl = '/addEvents'

    // useEffect(()=>setValue(props.init),[props.init])

    useEffect(()=>{
        moment.locale('sv', {week:{dow : 1}})
    }, [])
    const deleteRow = index => setList(list.filter((it, idx)=>idx !== index))  
    const handleReply = reply => {
            if (reply.status==='OK') {
                setButtonStyle(BUTTON_STYLE.DEFAULT)
                navigate('/calendar/' + userSettings.region)
            } else {
                setButtonStyle(BUTTON_STYLE.ERROR)
                alert(reply.message?('Error message:' + reply.message):JSON.stringify(reply))
            }
    }
    const handleCancel = () => {
        navigate('/calendar/' + userSettings.region)
    }

    const handleReset = () => {
        setValue({})
    }


    const changeToDbValue = val => ({
            ...val, 
            productType:'course',
            productId:'TEST_PRODUCT_ID',
            status:'HK', 
            leader:0,
            draft_comment:undefined,
    })

    const handleSendReply = result => {
        if (result.status === 'OK') {
          // alert('RESULT value :' +  JSON.stringify(rec) + ' email:' + email)
          setButtonStyle(BUTTON_STYLE.SAVED)
          setTimeout(() => setButtonStyle(BUTTON_STYLE.DEFAULT), 2000);
        } else {
          alert(result.message)  
          setButtonStyle(BUTTON_STYLE.ERROR) 
          setTimeout(() => setButtonStyle(BUTTON_STYLE.DEFAULT), 5000);
        }
      }
  
    const handleSend = e => {
        e.preventDefault()
        let dbValue = changeToDbValue(value)
        setButtonStyle(BUTTON_STYLE.CLICKED)
        if (!!value.email) {
          alert('handleSubmit data:' + JSON.stringify(dbValue))
          serverPost('/registration', '', '', dbValue, result=>handleSendReply(result))
        }  
    }
    const buttons=[
        {
            type:'button',
            label:'Send registration',
            style:buttonStyle,
            validate:true,
            handleClick:handleSend
        },    
        {
            type:'button',
            label:'Reset',
            style:buttonStyle,
            handleClick:handleReset
        },    
        {
            type:'button',
            label:'Cancel',
            style:buttonStyle,
            handleClick:handleCancel
        },    
    ]
    return(
        <div style={styles.container}>
            <div className='columns m-2 is-centered'>
                <div className='column is-6 is-narrow'>
                    <FormTemplate 
                                fields={fields} 
                                value={value}
                                setValue={setValue}
                                setList={setList}
                                buttons={buttons}
                    />
                </div>
            </div>     
          </div>
    )
        
}

