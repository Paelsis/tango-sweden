import React, {useState, useEffect} from 'react';
import { useSharedState} from '../store';
import Image from '../images/tangosweden.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {serverFetchData} from '../services/serverFetch'
import {COLORS} from '../services/const'


const styles = {
    container:{
        backgroundColor:COLORS.BLACK,
        style:'absolute',
        top:0,
        width:'100%',
        height:'100vh',
    },
    img:{
        display:'block',
        marginLeft:'auto', marginRight:'auto',
        maxWidth:'100%',
        maxHeight:'calc(80vh - 70px)',
    },
    buttonContainer:{
        style:'absolute',
        width:'100%',
        height:'50vh',
        width:'100%',
        textAlign:'center',
        color:COLORS.YELLOW
    },
    button:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        color:COLORS.YELLOW,
        borderColor:COLORS.YELLOW,
        backgroundColor:'transparent'
    },
    buttonRegion:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        color:COLORS.RED,
        borderColor:COLORS.YELLOW,
        backgroundColor:'transparent'
    },
    buttonSkane:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        color:COLORS.YELLOW,
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
    buttonNorr:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        color:COLORS.LIGHTBLUE,
        borderColor:COLORS.BLUE,
        backgroundColor:'transparent'
    }
}

const Home = () => {
    const [userSettings] = useSharedState()
    const [list, setList] = useState([])
    const [cities, setCities] = useState([])
    const [regions, setRegions] = useState([])
    const navigate = useNavigate()
    const handleNavigate = lnk => {
        navigate(lnk)
    }
    useEffect(()=>{
        const irl = '/getCalendarNames'
        serverFetchData(irl, '', '', reply=>{setCities(reply.cities); setRegions(reply.regions)})
    }, [])
    return(
        <div style={styles.container}>
            <img style={styles.img} src={Image} onClick={()=>handleNavigate('/calendar/skåne')}/>
            <div style={styles.buttonContainer}>
                <p/>
                {regions.map(it=>
                    <Button variant="outlined" type="button" style={styles.buttonRegion}  onClick={()=>handleNavigate('/calendar/' + it.region)}>
                        {it.region}                    
                    </Button>    
                )}    
                <Button variant="outlined" type="button" style={styles.buttonDenmark}  onClick={()=>handleNavigate('/denmark')}>
                    Danmark                    
                </Button>    
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/calendar/malmö')}>
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

export default Home


//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
