import React, {useEffect, useState} from 'react';
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

// FormTemplate
export default props => {
    //const [value, setValue] = useState({})
    const {init, fields, submitButtonText, submitTooltipTitle, submitButtonLabel, submitButtonColor, submitButtonVariant, submitButtonTooltip, handleSubmit, handleGet, handleUpdate, handleCopy, handleDelete, handleCancel, update} = props
    const language='EN'
    const development = process.env.NODE_ENV === 'development'
    const [value, setValue] = useState(init?init:{})
    const [valueRte, setValueRte] = useState({})
    const variant = submitButtonVariant?submitButtonVariant:'outlined'
    const color = variant?variant === 'contained'?'white':submitButtonColor:submitButtonColor
    const backgroundColor = variant?variant === 'contained'?submitButtonColor:'transparent':'transparent'
    const style = {color, borderColor:color, backgroundColor}
    const handleChange = e => setValue({...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value})
    const handleChangeRte = (fld, val) => setValue({...value, [fld]:val})
    const renderField = fld => {
        const show = (fld.hiddenIf?value[fld.hiddenIf]?false:true:true) && (fld.notHiddenIf?value[fld.notHiddenIf]?true:false:true)
        const radioValues = fld['radioValues' + language]?fld['radioValues' + language].split(',').map(it=>it.trim()):fld.values?fld.values:undefined
        const label = fld['label' + language]?fld['label' + language]:fld.label?fld.label:'No label'
        if (show) {
            switch (fld.type) {
                case 'info':
                            return(
                                <p>
                                    <>
                                        {label}&nbsp;
                                    </>
                                    <span>{value[fld.name]}</span>
                                </p> 
                            )
                case 'checkbox':
                        return(
                            <p>
                                <Tooltip title={fld['tooltip']?fld['tooltip']:''}>
                                    <>
                                        {label}&nbsp;
                                    </>
                                </Tooltip>
                                <input size={200} type={fld.type} checked={value[fld.name]?true:false} name={fld.name} style={fld.style}  required={fld.required} onChange={handleChange} />
                            </p> 
                        )
                case 'checkboxes':
                        return(
                            <p>
                                <Tooltip title={fld['tooltip']?fld['tooltip']:''}>
                                    <>
                                        {label}&nbsp;{fld.required?<sup style={{color:'red'}}>*</sup>:null}
                                    </>
                                 </Tooltip>   
                                <br/>
                                {fld.names.map(name =>
                                    <>
                                        {name}&nbsp;<input keytype={'checkbox'} name={name} required={fld.required} checked={value[fld.name]?true:false} onChange={handleChange}/>
                                    </>
                                )}
                            </p> 
                        )
                case 'radio':
                        return(
                            <p>
                                <Tooltip title={fld['tooltip']?fld['tooltip']:''}>
                                    <>
                                        {label}&nbsp;{fld.required!==null?<sup style={{color:'red'}}>*</sup>:null}<br/>
                                    </>
                                </Tooltip>
                                {radioValues?radioValues.map(val =>
                                    <>
                                        <input type={fld.type} value={val} name={fld.name} required={fld.required} checked={value[fld.name] === val} onChange={handleChange}/>
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
                                    <textarea rows={5} cols={40} name={fld.name} value={value[fld.name]} required={fld.required} onChange={handleChange}/>
                            :
                                    <RteEditor value={value[fld.name]} name={fld.name} style={fld.style} required={fld.required} onChange={val => handleChangeRte(fld.name, val)} />
                            }
                        </p>
                            
                        )    
                case 'textareaSimple':
                            return(
                                    <p>
                                            <Tooltip title={fld['tooltip']?fld['tooltip']:''}>
                                                <>
                                                    {label}&nbsp;{fld.required?<sup style={{color:'red'}}>*</sup>:null}&nbsp;<br/>
                                                </>    
                                            </Tooltip>
                                            <textarea rows={5} cols={40} name={fld.name} value={value[fld.name]} required={fld.required} onChange={handleChange}/>
                                    </p>
                                
                            )    
                default:
                        return(
                            <p>
                                    <Tooltip title={fld['tooltip']?fld['tooltip']:''}>
                                        <>
                                            {label}
                                        </>
                                    </Tooltip>
                                    &nbsp;
                                    {fld.required?<sup style={{color:'red'}}>*</sup>:null}&nbsp;<br/>
                                    <input {...fld} type={fld.type} size={40} value={value[fld.name]?value[fld.name]:''} name={fld.name} style={fld.style} onChange={handleChange} required={fld.required} />
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
                {handleGet?<Button type="submit" variant="outlined" className="button" style={style}>Hämta</Button>:null}
                &nbsp;
                {handleUpdate?<Button submit color={'red'} variant="outlined" className="button" style={style}>Uppdatera</Button>:null}
                &nbsp;
                {handleSubmit?
                    <Tooltip title={submitButtonTooltip?submitButtonTooltip:'No help-text'} >
                        <Button type="submit" variant={variant} className="button" style={style}
                            >{submitButtonLabel?submitButtonLabel:'Submit'}
                        </Button>
                    </Tooltip>
                :null}
                &nbsp;
                {handleCopy?<Button type="button" variant={variant} className="button" style={style} onClick={()=>handleCopy(value)}>Copy</Button>:null}
                &nbsp;
                {handleCancel?<Button variant="outlined" className="button" style={style} onClick={handleCancel}>Cancel</Button>:null}
                &nbsp;
                {handleDelete?<Button variant="outlined" className="button" style={style}>Delete</Button>:null}
        </form>
    )
}

//<textarea value={value[fld.name]} name={fld.name} style={fld.style} onChange={handleChange} required={fld.required} />

