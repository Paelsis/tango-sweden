import React, {useState} from 'react';
import RichTextEditor, {createEmptyValue, createValueFromString} from 'react-rte';

const RteEditor = ({value, onChange}) => {
  //const [lclValue, setLclValue]=useState(createEmptyValue())
  const [lclValue, setLclValue]=useState(value?createValueFromString(value, 'html'):createEmptyValue())
  const onChangeLocal = (val) => {
    setLclValue(val)
    if (onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      onChange(val.toString('html'))
    }
  };

  const onMouseLeave = () => {
    onChange(lclValue.toString('html'))
  }

  return (
      <>
        <RichTextEditor
          value={lclValue}
          onChange={onChangeLocal} 
          onMouseLeave={onMouseLeave}
        />  
      </>
  );
}

export default RteEditor