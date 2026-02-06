import React, {useState, useRef, useEffect} from 'react';
import Button, { buttonClasses } from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormField from './FormField';
import {COLORS} from '../services/const'
import getTypeFromColumnType from '../services/getTypeFromColumnType'
import {isEmail} from '../services/functions'
const TEXTS={
    BUTTON:'Send registration'
}

const getField = column => {
    const name = column.Field    
    const type = getTypeFromColumnType(column)
    return {type, name, label:name, tooltip:'No helptext', names:undefined,  required:false}
}    

const isHidden = (fld, value) => (fld.hiddenIf?value?value[fld.hiddenIf]?true:false:true:false) || (fld.notHiddenIf?value?value[fld.notHiddenIf]?false:true:true:false)

const isValid = (fields, value) => {
    const isValidFld = fld => {
        if (!value) {
            return(false)
        } else if (isHidden(fld, value)) {
            return true
        } else if (fld.required && !value[fld.name]) {
            return false
        } else {    
            switch (fld.type) {
                case 'email': return isEmail(value[fld.name])
                default: return true
            }        
        }    
    }
    
    return fields.find(fld => !isValidFld(fld))
}    


// FormTemplate.js
export default props => {
    const {fields, buttons, value, handleSubmit, setValue} = props
    const handleKeyPress = e => {
        if (e.key === 'Enter' && !!props.handlePressEnter) {
            props.handlePressEnter()
        } 
    }

    return(
        <div>   
            <form onSubmit={handleSubmit}>
                <div>
                    {props.children}
                    {fields.filter(fld=>!isHidden(fld, value)).map((fld, index) => 
                        <Tooltip 
                            title={<h4 style={{textAlign:'left' , fontSize:22, fontWeight:700, color:COLORS.WHITE}}>{fld.tooltip}</h4>}
                            open={fld.tooltip?undefined:false}
                        >    
                            <div>
                                <FormField key={index} fld={fld} value={value?value:''} setValue={setValue} handleKeyPress={handleKeyPress} />
                            </div>
                        </Tooltip>
                    )}
                </div>
                {fields && false?
                    fields.filter(fld => fld.required===true).map(fld=>value[fld.name]?null:<span style={{color:'red', fontSize:'8'}}>Required:{fld.label}<br/></span>)    
                :
                    null
                }    

                {buttonClasses?
                    <div style={{paddingTop:20, paddingBottom:20}}>
                        {buttons.map(button =>
                            <Tooltip 
                                title={<h2>{button.tooltip}</h2>} 
                                enterDelay={500} 
                                open={button.tooltip?undefined:false}
                            >
                            <span style={button.style}>
                                {
                                    <IconButton 
                                        onClick={button.onClick?button.onClick:button.handleClick}
                                        disabled={button.disabled}
                                    >
                                        <Button 
                                            type={button.type?button.type:'button'}
                                            variant={button.variant?button.variant:"outlined"}
                                            style={button.style}
                                            color={"inherit"}
                                            disabled={button.disabled}
                                        >
                                            {button.label}
                                        </Button>
                                    </IconButton>
                                }                      
                                &nbsp;
                            </span>
                            </Tooltip>
                        )}
                        &nbsp;
                    </div>
                :<h1>No buttons</h1>}    
            </form>
        </div>
    )
}


//{JSON.stringify(fld)}





