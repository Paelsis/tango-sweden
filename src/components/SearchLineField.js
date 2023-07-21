
import React, {useState, useEffect} from 'react';
import RteEditor from './RteEditor'
import Tooltip from '@mui/material/Tooltip';
import {isAndroidOperatingSystem} from '../services/isAndroid'


const isAndroid = isAndroidOperatingSystem()

export default props=> {
    const {fld, value, setValue, handleKeyPress} = props
    const show = (fld.hiddenIf?value[fld.hiddenIf]?false:true:true) && (fld.notHiddenIf?value[fld.notHiddenIf]?true:false:true)
    const radioValues = fld.radioValues?fld.radioValues.map(it=>it.trim()):fld.values?fld.values:undefined
    const selectValues = fld.selectValues?fld.selectValues.map(it=>it.trim()):undefined
    const label = fld.label?fld.label:'No label'
    const tooltip=fld['tooltip']?fld['tooltip']:''
    const handleChange = e => setValue({...value, [e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value})
    const labelStyle={fontWeight:700, ...props.labelStyle?props.labelStyle:{}}
    const fldStyle={width:300}
    if (show) {
        return(
            <p>
                <label style={labelStyle}>
                        {label}
                </label>    
                <br/>
                <Tooltip title={fld['tooltip']?fld['tooltip']:''}>
                        <input {...fld} 
                            type={fld.type} 
                            value={value[fld.name]?value[fld.name]:''} 
                            name={fld.name} 
                            style={fld.style?fld.style:fldStyle} 
                            //placeholder={fld.label?fld.label:fld.name} 
                            onChange={handleChange} 
                            onKeyPress={handleKeyPress}
                            ref={fld.inputRef?fld.inputRef:undefined}
                        />
                </Tooltip>
            </p>
        )
    } else {
            return(null)
    }    
}
