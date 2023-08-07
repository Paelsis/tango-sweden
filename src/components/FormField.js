
import React, {useState, useEffect, useRef} from 'react';
import RteEditor from './RteEditor'
import {isAndroidOperatingSystem} from '../services/isAndroid'
import moment from 'moment'
import { FacebookAuthProvider } from 'firebase/auth';

const isAndroid = isAndroidOperatingSystem()

const styles  = {
    textarea:{
        //fontFamily: 'Regular', 
        overflow:'auto',
    }    
}

const FormField1 = props => {
    const {fld, key, value, setValue, handleKeyPress} = props
    const radioValues = fld.radioValues?fld.radioValues.map(it=>it.trim()):[]
    const selectValues = fld.selectValues?fld.selectValues.map(it=>it.trim()):[]
    const label = fld.label?fld.label:'No label'
    const handleChange = e => {
        setValue({...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked?1:0:e.target.value})
    }    
    const required = fld.required?true:false 
    const disabled = fld.disabledFunc?fld.disabledFunc(value):false
    const labelStyle={fontWeight:700, ...props.labelStyle?props.labelStyle:{}}
    const supStyle = {color:'red', fontWeight:700, ...props.subStyle?props.subStyle:{}}
    const valueStyle = props.valueStyle?props.valueStyle:{}

    return(
    <p>
        <h1 style={supStyle}>Before</h1>
        {JSON.stringify(props)}    
        <h1>After</h1>
        <p/>
    </p>
    )
}

// FormField 
const FormField = props => {
    const {fld, key, value, setValue, handleKeyPress} = props
    const radioValues = fld.radioValues
    const selectValues = fld.selectValues?fld.selectValues.map(it=>it.trim()):[]
    const label = fld.label?fld.label:'No label'
    const handleChange = e => {
        setValue({...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked?1:0:e.target.value})
    }    
    const handleChangeRte = (fld, val) => setValue({...value, [fld]:val})
    const handleChangeDate = e => {
        setValue({...value, [e.target.name]:e.target.value});
    }    
    const required = fld.required?true:false 
    const disabled = fld.disabled?fld.disabled:fld.disabledFunc?fld.disabledFunc(value):false
    const labelStyle={fontWeight:700, ...props.labelStyle?props.labelStyle:{}, opacity:disabled?0.4:1.0}
    const supStyle = {color:'red', fontWeight:700, ...props.subStyle?props.subStyle:{}}
    const valueStyle = props.valueStyle?props.valueStyle:{}

        switch (fld.type) {
            case 'checkbox':
                    return(
                        <p>  
                            <label style={labelStyle}>
                            <input 
                                key={key}
                                size={200} 
                                type={fld.type} 
                                checked={value[fld.name]?true:false} 
                                name={fld.name} 
                                style={valueStyle}  
                                required={required} 
                                ref={fld.ref}
                                disabled={disabled}
                                onChange={handleChange}
                            />
                            &nbsp;<span style={valueStyle}>{label}</span>&nbsp;&nbsp;&nbsp;&nbsp;{required?<sup style={supStyle}>*</sup>:null}
                            </label> 
                        </p>
                    )
            case 'checkboxes':
                return(
                    <p>
                        <label style={labelStyle}>
                                {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                        </label>    
                        <br/>
                        {fld.names?fld.names.map(name =>
                            <label>
                                {name}&nbsp;
                                <input 
                                    key={key}
                                    type={'checkbox'} 
                                    name={name} 
                                    checked={value[fld.name]?true:false} 
                                    required={required} 
                                    disabled={disabled}
                                    onChange={handleChange}
                                />
                            </label>
                        ):null}
                    </p> 
                )
            case 'radio':
                return(
                    <p>
                        <label style={{fontWeight:700}}>
                                {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                        </label>    
                        <br/>
                        {radioValues.map((val, idx) =>
                            <label>
                                <input 
                                    key={(val.value?val.value:val) + idx}
                                    type={fld.type}
                                    value={val.value?val.value:val} 
                                    name={fld.name} 
                                    required={required}
                                    disabled={disabled}
                                    checked={value[fld.name] === (val.value?val.value:val)}
                                    onChange={handleChange}
                                />
                                &nbsp;<span>{val.label?val.label:val}</span>&nbsp;
                            </label>
                        )}
                    </p> 
                )
                case 'select':
                    return(
                            <p>      
                            <label style={labelStyle}>
                                    {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                            </label>    
                            <br/>
                            <select 
                                key={key}
                                name={fld.name} 
                                value={value[fld.name]?value[fld.name]:''} 
                                required={required} 
                                disabled={disabled}
                                onChange={handleChange}
                            >
                                <option selected disabled value={""}>Välj</option>
                                {selectValues.map(val => <option value={val}>{val}</option>)}
                            </select>
                        </p>
                    )
                case 'textarea':
                return(
                    <p>
                        <label style={labelStyle}>
                                {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                        </label>    
                        <br/>
                        <textarea 
                            style={styles.textarea}
                            key={key}
                            rows={5} 
                            cols={fld.cols?fld.cols:40} 
                            name={fld.name} 
                            value={value[fld.name]?value[fld.name]:''} 
                            disabled={disabled}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                    </p>
                    )    
                case 'rte':
                    return(
                        <p>
                            <label style={labelStyle}>
                                    {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                            </label>    
                            <br/>
                            <RteEditor 
                                        value={value[fld.name]?value[fld.name]:''} 
                                        name={fld.name} 
                                        style={{cols:50}} 
                                        required={required} 
                                        disabled={disabled}
                                        onChange={val => handleChangeRte(fld.name, val)} 
                            />
                        </p>
                        )    
                
                case 'date':
                    return(
                        <p>
                            <label style={labelStyle}>
                                    {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                            </label>    
                            <br/>
                            <input 
                                key={key}
                                {...fld} 
                                type={fld.type} 
                                size={40}
                                value={value[fld.name]}
                                name={fld.name}
                                style={valueStyle} 
                                required={required}
                                disabled={disabled}
                                onChange={handleChangeDate} 
                            />
                        </p>
                    )    
                case 'comment':
                        return(
                            <p>
                                    <label style={labelStyle}>
                                            {label}
                                    </label>    
                                    <br/>
                                    {value[fld.name]?value[fld.name]:''}
                            </p>
                        )    
                case 'html':
                        return(
                            <p>
                                    <label style={labelStyle}>
                                            {label}
                                    </label>    
                                    <br/>
                                    {value[fld.name]?<div dangerouslySetInnerHTML={{__html: value[fld.name]}} />:''}
                            </p>
                        )    
                default:
            return(
                <p>
                    <label style={labelStyle} >
                            {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                    </label>    
                    <br/>
                    <input 
                        {...fld} 
                        key={key}
                        type={fld.type}
                        size={40}
                        name={fld.name} style={valueStyle} 
                        value={value[fld.name]?value[fld.name]:''} 
                        required={required} 
                        disabled={disabled}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        ref={fld.inputRef?fld.inputRef:undefined}
                    />
                </p>
            )   
        }   
}    


export default FormField

/*
export const RenderField1 = ({fld, value, setValue}) => {
    const handleChange = e => setValue({...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value})
    return(    
        <input {...fld} type={fld.type} size={40} value={value[fld.name]?value[fld.name]:''} name={fld.name} style={style} required={fld.required} onChange={handleChange} />
    )
}
*/