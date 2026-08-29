import React, { useState } from 'react';
import QuillEditor from '../components/QuillEditor'

export default () => {
  const [html, setHtml] = useState('Adam');

  return (
   <>
     <QuillEditor theme="snow" html={html} setHtml={setHtml} />;
     HTML={html}
   </>   
  )
}