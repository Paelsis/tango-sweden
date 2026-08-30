
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {defaultDate} from '../services/functions'
import TextArea from 'react-textarea-autosize';
import {EDITOR_TYPE} from '../services/const'
import QuillEditor from './QuillEditor';

const styles  = {
    textarea:{
        //fontFamily: 'Regular', 
        overflow:'auto',
    }    
}

// FormField 
export default props => {
    const {fld, key, value, setValue, handleKeyPress, clearIndex} = props
    const selectValues = fld.selectValues?fld.selectValues.map(it=>it.trim()):[]
    const label = fld.label?fld.label:''
    const handleChange = e => {
        setValue({...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked?1:0:e.target.value})
    }    

    const setHtml = html => setValue({...value, html})

    const handleChangeWithPre = e => {
        if (fld.preSetValue) {
            setValue(fld.preSetValue({...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked?1:0:e.target.value}))
        } else {
            setValue({...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked?1:0:e.target.value})
        }    
    }    
    const handleChangeDate = e => {
        setValue({...value, [e.target.name]:e.target.value < 8?defaultDate():e.target.value});
    }    
    const handleEditorChange = useCallback(html=>{setValue(value=>({...value, [fld.name]:html}))}, [])
    const required = fld.required?true:false 
    const disabled = fld.disabledFunc?fld.disabledFunc(value):false
    const labelStyle={fontWeight:400, fontSize:16, ...props.labelStyle?props.labelStyle:{}}
    const supStyle = {color:'red', fontWeight:900, ...props.subStyle?props.subStyle:{}}
    const valueStyle = props.valueStyle?props.valueStyle:{}
    const placeholder = fld.placeholder

        switch (fld.type) {
            case 'checkbox':
                    const checked = value[fld.name]?1:0
                    return(
                        <p>
                            <label style={labelStyle}>
                            <input 
                                key={key}
                                size={200} 
                                type={fld.type} 
                                checked={checked} 
                                name={fld.name} 
                                style={valueStyle}  
                                required={required} 
                                ref={fld.ref}
                                disabled={disabled}
                                onChange={handleChangeWithPre}
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
                const radioValues = fld.radioValues?fld.radioValues:undefined
                return(
                    <p>
                        <label style={labelStyle}>
                                {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                        </label>    
                        <br/>
                        {radioValues?radioValues.map((it, idx) =>
                            <label>
                                <input 
                                    type={fld.type}
                                    key={idx}
                                    value={value?it.value?it.value:it:undefined} 
                                    name={fld.name} 
                                    required={required}
                                    disabled={disabled}
                                    checked={value?value[fld.name]?(value[fld.name] === (it.value?it.value:it)):undefined:undefined}
                                    onChange={handleChangeWithPre}
                                />
                                &nbsp;<span>{it.label?it.label:it}</span>&nbsp;
                            </label>
                        ):null}
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
                        {label?
                            <>
                            <label style={labelStyle}>
                                    {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                            </label>    
                            <br/>
                            </>
                        :null}    
                        <textarea 
                            style={styles.textarea}
                            key={key}
                            rows={fld.rows?fld.rows:5} 
                            cols={fld.cols?fld.cols:40} 
                            maxlength={fld.maxlength}
                            name={fld.name} 
                            value={value[fld.name]?value[fld.name]:''} 
                            disabled={disabled}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            autoFocus={fld.autoFocus}
                        />
                    </p>
                    )    
                case 'TextArea':
                    return(
                        <p>
                            <label style={labelStyle}>
                                    {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                            </label>    
                            <br/>
                            <TextArea
                                style={styles.textarea}
                                placeholder=''
                                name={fld.name}
                                value={value[fld.name]?value[fld.name]:''} 
                                variant="default"
                                borderRadius="medium"
                                cols={fld.cols?fld.cols:40} 
                                minRows={fld.minRows?fld.minRows:5}
                                maxRows={fld.maxRows?fld.maxRows:400}
                                maxlength={fld.maxlength}
                                fixedSize={true}
                                AutoGrow={true}
                                onChange={handleChange}
                                disabled={disabled}
                                addClass="myTextareaClass"
                                autoFocus={fld.autoFocus}
                                />
                        </p>
                        )    
                case EDITOR_TYPE.QUILL:      
                        return (
                            <p className='content'>
                                <label style={labelStyle}>
                                        {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                                </label>    
                                <br/>
                                <QuillEditor 
                                    key={key}
                                    html={value[fld.name]}
                                    clearIndex={clearIndex}
                                    setHtml={handleEditorChange}
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
                                    defaultValue={fld.useDefaultDate?defaultDate():undefined} 
                                    onChange={handleChangeDate} 
                                />
                            </p>
                        )    
                case 'number':
                    return(
                        <p>
                            <label style={labelStyle}>
                                    {label}&nbsp;{required?<sup style={supStyle}>*</sup>:null}&nbsp;
                            </label>    
                            <br/>
                            <input 
                                type={fld.type}
                                min={0}
                                max={fld.max}
                                step={fld.step}
                                style={styles.textarea}
                                key={key}
                                name={fld.name} 
                                value={value[fld.name]?value[fld.name]:''} 
                                disabled={disabled}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                autoFocus={fld.autoFocus}
                            />
                            {fld.txtName?value[fld.txtName]?<span>&nbsp;{'('+value[fld.txtName]+')'}</span>:null:null}
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
                        name={fld.name} 
                        style={valueStyle} 
                        value={value[fld.name]?value[fld.name]:''} 
                        required={required} 
                        disabled={disabled}
                        placeholder={placeholder}
                        maxlength={fld.maxlength}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        autoFocus={fld.autoFocus}
                    />
                </p>
            )   
        }   
}    

