import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSharedState} from '../store';
import Button from '@mui/material/Button';
import {serverFetchData} from '../services/serverFetch'
import {labelSwedish} from '../services/functions'
import Image from '../images/tangosweden.jpg';
import {COLORS} from '../services/const'


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
    buttonRegion:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        color:'#FFFFA7',
        borderColor:COLORS.RED,
        backgroundColor:'transparent'
    },
    buttonDenmark:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        color:COLORS.WHITE,
        borderColor:COLORS.RED,
        backgroundColor:'transparent'
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
    const [sharedState] = useSharedState()
    const [cities, setCities] = useState([])
    const [regions, setRegions] = useState([])
    const navigate = useNavigate()
    const handleNavigate = lnk => {
        navigate(lnk)
    }

    useEffect(()=>{
        const irl = '/getCalendarNames'
        serverFetchData(irl,  reply=>{setCities(reply.cities); setRegions(reply.regions)})
    }, [])


    return(
        <div style={styles.container}>
            <img style={styles.img} src={Image} onClick={()=>handleNavigate('/malmö')}/>
            <div style={styles.buttonContainer}>
                <p/>
                <h2>Regions</h2>
                {regions.map(it=>
                    <Button variant="outlined" type="button" style={styles.buttonRegion}  onClick={()=>handleNavigate('/calendar/' + it.region)}>
                        {it.region}                    
                    </Button>    
                )}    
                <Button variant="outlined" type="button" style={styles.buttonDenmark}  onClick={()=>handleNavigate('/denmark')}>
                    Danmark                    
                </Button>    
                <h2>Cities</h2>
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/malmö')}>
                    Malmö/Lund                    
                </Button>    
                {cities.filter(it => !it.city.toLowerCase().includes('malmö')).map(it=>
                    <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/calendar/' + it.city)}>
                        {it.city}                    
                    </Button>    
                )}    
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/halmstad')}>
                    Halmstad                    
                </Button>    
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/gothenburg')}>
                    Göteborg                    
                </Button>    
             </div>
        </div>
    )
}



//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
