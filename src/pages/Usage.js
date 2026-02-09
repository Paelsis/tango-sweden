import React, {useState} from 'react';
import Button from '@mui/material/Button';
import UsageEnglish from '../services/UsageEnglish';
import UsageSwedish from '../services/UsageSwedish';



export default () => {
    const [language, setLanguage] = useState('SV')
    return(
        <div className='columns is-centered'>
        <div className='column is-6 content'>
            {language==='SV'?<UsageSwedish />:<UsageEnglish/>}
        </div>
        <div className='column is-1'>
            <br/>
            <Button variant='outlined' color='inherit' onClick={()=>{setLanguage(language==='SV'?'EN':'SV')}}>
                {language==='SV'?'English':'Svenska'}
            </Button>
        </div>
        </div>
    )
}