import React, {useState, useEffect} from 'react';
import RichTextEditor, {createEmptyValue, createValueFromString} from 'react-rte';

const RteEditor = props => {

  const [value, setValue]=useState(createValueFromString(props.value?props.value:'', 'html'))
  
  //useEffect(()=>{setValue(props.value?createValueFromString(props.value, 'html'):createEmptyValue())}, [value])
  
  const onChange = val => {
    setValue(val)
    if (props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      props.onChange(val.toString('html'))
    }
  };

  const toolbarConfig = {
    display: [],
  };

  const onMouseLeave = () => {
    props.onChange(value.toString('html'))
  }

  return (
      <>
        <RichTextEditor
          value={value}
          onChange={onChange} 
          // onMouseLeave={onMouseLeave}
        />  
      </>
  );
}

export default RteEditor