
import React, { useState, useEffect } from 'react';

const STYLE = {position:'fixed', bottom:0, left:0, height:50, width:'100vw', padding:10, textAlign:'center', color:'white', backgroundColor:'green'} 

export default ({milliseconds, style, message}) => {
    const [show, setShow]=useState(true)    
    const timeout = milliseconds?milliseconds:10000
    useEffect(() => {
        setShow(message?true:false)
        const timer = setTimeout(() => {
          setShow(undefined);
        }, timeout);
        return () => clearTimeout(timer);
    }, [message]); 
    const myStyle = style?style:{}
    return (
      show?message?<div style={{...STYLE, ...myStyle}}>{message}</div>
      :null
      :null
    );
};

