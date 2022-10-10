import React, {useState} from 'react';
import Button from '@mui/material/Button';
import moment from 'moment-with-locales-es6'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import RteEditor from './RteEditor'
import {createValueFromString} from 'react-rte';
import {isAndroidOperatingSystem} from '../services/isAndroid'

const TEXTS={
    BUTTON:'Send registration'
}


const DEV_TEST_OBJECT = {
    title:'Test titel',
    description:'Test desc ...',
    startDate:moment().format('YYYY-MM-DD'),
    startTime:'19:00',
    endTime:'20:30',
    location:'Malmö',
    repeat:false,
}

const PROD_OBJECT = {
    repeat:false,
    frequency:1,
    interval:'weeks',
    until:moment().add(4, 'weeks').add(1,'days').format('YYYY-MM-DD')
}

const isAndroid = isAndroidOperatingSystem()

const FormTemplate = props => {
    //const [value, setValue] = useState({})
    const {init, fields, submitButtonText, submitTooltipTitle, handleSubmit, handleGet, handleUpdate, handleDelete, update} = props
    const language='EN'
    const development = process.env.NODE_ENV === 'development'
    const [value, setValue] = useState(init?init:development?DEV_TEST_OBJECT:{})
    const [valueRte, setValueRte] = useState({})
    const [color, setColor] = useState('black')
    const handleChange = e => setValue({...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value})
    const handleChangeRte = (fld, val) => setValue({...value, [fld]:val})
    
    const renderField = fld => {
        const show = (fld.hiddenIf?value[fld.hiddenIf]?false:true:true) && (fld.notHiddenIf?value[fld.notHiddenIf]?true:false:true)
        const radioValues = fld['radioValues' + language]?fld['radioValues' + language].split(',').map(it=>it.trim()):fld.values?fld.values:undefined
        const label = fld['label' + language]?fld['label' + language]:fld.label?fld.label:'No label'
        if (show) {
            switch (fld.type) {
                case 'checkbox':
                        return(
                            <p>
                                {label}&nbsp;{fld.required?<sup style={{color:'red'}}>*</sup>:null}
                                <Tooltip title={fld['tooltip']?fld['tooltip']:''}>
                                <input size={200} type={fld.type} checked={value[fld.name]?true:false} name={fld.name} style={fld.style}  required={fld.required} onChange={handleChange} />
                                </Tooltip>
                            </p> 
                        )
                case 'checkboxes':
                    return(
                        <p>
                            {label}&nbsp;{fld.required?<sup style={{color:'red'}}>*</sup>:null}
                            <br/>
                            {fld.names.map(name =>
                                <>
                                    {name}&nbsp;<input keytype={'checkbox'} name={name} checked={value[fld.name]?true:false} required={fld.required} onChange={handleChange}/>
                                </>
                            )}
                        </p> 
                    )
                case 'radio':
                    return(
                        <p>
                            {label}&nbsp;{fld.required!==null?<sup style={{color:'red'}}>*</sup>:null}<br/>
                            {radioValues?radioValues.map(val =>
                                <>
                                    <Tooltip title={fld['tooltip']?fld['tooltip']:''}>
                                    <input type={fld.type} value={val} name={fld.name} checked={value[fld.name] === val} onChange={handleChange}/>
                                    </Tooltip>
                                    &nbsp;{val}
                                </>
                            ):[]}
                        </p> 
                    )
                case 'textarea':
                    return(
                        <p>
                        {label}&nbsp;{fld.required?<sup style={{color:'red'}}>*</sup>:null}&nbsp;<br/>
                        {isAndroid && value[fld.name] !== 'TEST'?
                            update?
                                <div style={{maxWidth:'99vw'}}dangerouslySetInnerHTML={{__html: value[fld.name]}} onClick={() => alert('Cannot be modified on Android mobile units. Make change of this description field on computer.')} />
                            :
                                <textarea rows={5} cols={40} name={fld.name} value={value[fld.name]} onChange={handleChange}/>
                        :
                            <RteEditor value={value[fld.name]} name={fld.name} style={fld.style} onChange={val => handleChangeRte(fld.name, val)} />
                        }
                       </p>
                        
                    )    
                case 'textareaSimple':
                        return(
                            <p>
                                    {label}&nbsp;{fld.required?<sup style={{color:'red'}}>*</sup>:null}&nbsp;<br/>
                                    <textarea rows={5} cols={40} name={fld.name} value={value[fld.name]} onChange={handleChange}/>
                           </p>
                            
                        )    
                default:
                    return(
                        <p>
                            {label}&nbsp;{fld.required?<sup style={{color:'red'}}>*</sup>:null}&nbsp;<br/>
                            <Tooltip title={fld['tooltip']?fld['tooltip']:'No help text'}>
                                    <input {...fld} type={fld.type} size={40} value={value[fld.name]?value[fld.name]:''} name={fld.name} style={fld.style} onChange={handleChange} required={fld.required} />
                            </Tooltip>
                        </p>
                    )
            }
        } else {
                return(null)
        }    
    
    }
    
    return(
        <form onSubmit={e=>handleSubmit(e, value)}>
            {fields.map(fld => renderField(fld))}  
                {handleGet?<Button type="submit" variant="outlined" className="button" style={{color:color, borderColor:color}}>Hämta</Button>:null}
                {handleUpdate?<Button sumbit variant="outlined" className="button" style={{color:color, borderColor:color}}>Uppdatera</Button>:null}
                {handleSubmit?<Button type="submit" variant="outlined" className="button" style={{color:color, borderColor:color}}>Send</Button>:null}
                {handleDelete?<Button variant="outlined" className="button" style={{color:color, borderColor:color}}>Delete</Button>:null}
        </form>
    )
}


export default FormTemplate

//<textarea value={value[fld.name]} name={fld.name} style={fld.style} onChange={handleChange} required={fld.required} />

