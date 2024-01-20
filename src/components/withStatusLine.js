import React, {useState, useEffect} from 'react';
import {STATUSLINE_STYLE} from "../services/const"
import StatusLine from '../components/StatusLine'

export default WrappedComponent => props => {
    const [style, setStyle] = useState(STATUSLINE_STYLE.DEFAULT)
    const [text, setText] = useState()
    const setStatusLine = (text, style, timeout) => {
        setText(text)
        setStyle(style)
        setTimeout(()=>{
            setText(undefined)
            setStyle(STATUSLINE_STYLE.DEFAULT)
        }, 
        timeout);
    }
    return(
        <>
            <WrappedComponent {...props} setStatusLine={setStatusLine} />
            <StatusLine style={style} text={text} />
        </>
    )
}