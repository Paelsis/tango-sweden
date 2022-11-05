import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import serverFetch from '../services/serverFetch'
import Image from '../images/tangosweden.jpg';
import { LunchDining } from '@mui/icons-material';


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
        color:'#FFFFA7',
        borderColor:'#FFFF87',
        backgroundColor:'transparent'
    }

}

//AllCalendars
export default () => {
    const [list, setList] = useState([])
    const navigate = useNavigate()
    const handleNavigate = lnk => {
        navigate(lnk)
    }

    useEffect(()=>{
        const irl = '/getCalendarNames'
        serverFetch(irl, '', '', result=>setList(result))
    }, [])

    const LabelSwedishChars = name => {
        switch (name.toLowerCase()) {
            case 'goteborg':return 'Göteborg'
            case 'malmo':return 'Malmö/Lund'
            default: return name.toLowerCase()
        }
    }
        


    return(
        <div style={styles.container}>
            <img style={styles.img} src={Image} onClick={()=>handleNavigate('/malmo')}/>
            <div style={styles.buttonContainer}>
                {list.map(it=>
                    <>
                        <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/calendar/' + it.calendarName)}>
                            {LabelSwedishChars(it.calendarName)}
                        </Button>    
                        &nbsp;
                    </>
                )}
                    
                <p/>
                &nbsp;
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/denmark')}>
                    Denmark                    
                </Button>    
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/gothenburg')}>
                    Gothenburg                    
                </Button>    
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/halmstad')}>
                    Halmstad                    
                </Button>    
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/helsingborg')}>
                    Helsingborg                    
                </Button>    
                &nbsp;
             </div>
        </div>
    )
}



//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
