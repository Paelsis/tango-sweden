import React, {useState, useRef, useEffect} from 'react';
import Button, { buttonClasses } from '@mui/material/Button';
import FormField from './FormField';
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
    const {fields, buttons, value, setValue} = props
    const handleKeyPress = e => {
        if (e.key === 'Enter' && !!props.handlePressEnter) {
            props.handlePressEnter()
        } 
    }

    const inputRef = useRef(null);
    const isHidden = fld => (fld.hiddenIf?value[fld.hiddenIf]?true:false:false) || (fld.notHiddenIf?value[fld.notHiddenIf]?false:true:false)

    const isValidFld = fld => {
        if (isHidden(fld)) {
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
                <form>
                    <div>
                        {props.children}
                        {fields.filter(fld=>!isHidden(fld)).map((fld, index) => 
                            <>
                                <FormField inputRef={fld.focus?inputRef:undefined} key={index}  fld={fld} value={value} setValue={setValue} handleKeyPress={handleKeyPress} />
                            </>
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
                                <span style={button.style}>
                                    {
                                        <Button 
                                            type={button.type} 
                                            variant="outlined" 
                                            color="inherit" 
                                            disabled={button.disabled?true:button.validate?isValid:false}
                                            onClick={button.handleClick}
                                        >
                                            {button.label}
                                        </Button>
                                    }                      
                                    &nbsp;
                                </span>
                            )}
                            &nbsp;
                        </div>
                    :<h1>No buttons</h1>}    
                </form>
        </div>
    )
}


//{JSON.stringify(fld)}





