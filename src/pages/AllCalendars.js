import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSharedState} from '../store';
import Button from '@mui/material/Button';
import serverFetch from '../services/serverFetch'
import {labelSwedish} from '../services/functions'
import Image from '../images/tangosweden.jpg';


const styles = {
    container:{
        backgroundColor:'black',
        style:'absolute',
        top:0,
        width:'100%',
        height:'100vh',
    },
    img:{
        display:'block',
        marginLeft:'auto', marginRight:'auto',
        maxWidth:'25%',
        maxHeight:'calc(80vh - 70px)',
    },
    buttonContainer:{
        style:'absolute',
        width:'100%',
        height:'50vh',
        width:'100%',
        textAlign:'center',
        color:'#FFFFA7'
    },
    button:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        color:'#FFFFA7',
        borderColor:'#FFFF87',
        backgroundColor:'transparent'
    }

}

//AllCalendars
export default () => {
    const [userSettings] = useSharedState()
    const [list, setList] = useState([])
    const navigate = useNavigate()
    const handleNavigate = lnk => {
        navigate(lnk)
    }

    useEffect(()=>{
        const irl = '/getCalendarNames'
        serverFetch(irl, '', '', lst=>setList(lst))
    }, [])


    return(
        <div style={styles.container}>
            <img style={styles.img} src={Image} onClick={()=>handleNavigate('/malmo')}/>
            <div style={styles.buttonContainer}>
                <h2>Our calendars</h2>
                {list.map(it=>
                    <>
                        <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/calendar/' + it.calendarName)}>
                            {labelSwedish(it.calendarName)}
                        </Button>    
                        &nbsp;
                    </>
                )}
                <h2>External calendars</h2>
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/denmark')}>
                    Danmark                    
                </Button>    
                &nbsp;
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/gothenburg')}>
                    Göteborg                    
                </Button>    
                &nbsp;
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/halmstad')}>
                    Halmstad                    
                </Button>    
                &nbsp;
             </div>
        </div>
    )
}



//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
