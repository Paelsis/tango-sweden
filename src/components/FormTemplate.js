import React, {useState, useRef, useEffect} from 'react';
import Button, { buttonClasses } from '@mui/material/Button';
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

// FormTemplate.js
// FormTemplate.js
export default props => {
    const {fields, buttons, value, handleSubmit, setValue} = props
    const handleKeyPress = e => {
        if (e.key === 'Enter' && !!props.handlePressEnter) {
            props.handlePressEnter()
        } 
    }

    const isHidden = fld => (fld.hiddenIf?value?value[fld.hiddenIf]?true:false:true:false) || (fld.notHiddenIf?value?value[fld.notHiddenIf]?false:true:true:false)

    const isValidFld = fld => {
        if (!value) {
            return(false)
        } else if (isHidden(fld)) {
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

    const isValid = fields.find(fld => !isValidFld(fld))
    return(
        <div>   
            <form onSubmit={handleSubmit}>
                <div>
                    {props.children}
                    {fields.filter(fld=>!isHidden(fld)).map((fld, index) => 
                        <Tooltip 
                            title={<h4 style={{textAlign:'left' , fontSize:20, fontWeight:900, color:COLORS.WHITE}}>{fld.tooltip}</h4>}
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
                                open={button.tooptip?undefined:false}
                            >
                            <span style={button.style}>
                                {
                                    <Button 
                                        type={button.type} 
                                        variant={button.variant?button.variant:"outlined"}
                                        color={"inherit"}
s                                       onClick={button.submit?undefined:button.handleClick}
                                    >
                                        {button.label}
                                    </Button>
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





