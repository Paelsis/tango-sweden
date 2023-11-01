import React, {useState, useEffect} from 'react';
import { useSharedState} from '../store';
import Image from '../images/tangosweden.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {serverFetchData} from '../services/serverFetch'
import {COLORS} from '../services/const'

const FONT_SIZE = {
    BIG:16,
    SMALL:14
}


const styles = {
    container:{
        backgroundColor:COLORS.BLACK,
        fontWeight:'bold', 
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
        color:COLORS.YELLOW,
        style:'absolute',
        width:'100%',
        height:'50vh',
        width:'100%',
        textAlign:'center',
    },
    button:{
        fontWeight:'bold', 
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        color:COLORS.YELLOW,
        borderColor:COLORS.ICEBLUE,
        backgroundColor:'transparent'
    },
    region:{
        skane:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.BIG,
            borderWidth:'3px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.YELLOW,
            borderColor:COLORS.RED,
            backgroundColor:'transparent'
        },
        danmark:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.BIG,
            borderWidth:'3px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.WHITE,
            borderColor:COLORS.RED,
            backgroundColor:'transparent'
        },
        norr:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.SMALL,
            borderWidth:'2px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.WHITE,
            borderColor:COLORS.BLUE,
            backgroundColor:'transparent'
        }, 
        default:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.BIG,
            borderWidth:'3px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.REGION.TEXT,
            borderColor:COLORS.REGION.TEXT,
            backgroundColor:'transparent'
        }    
    },
    city:{
        helsingborg:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.SMALL,
            borderWidth:'2px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.HELSINGBORG.TEXT,
            borderColor:COLORS.HELSINGBORG.BORDER,
            backgroundColor:'transparent'
        },
        malmo:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.SMALL,
            borderWidth:'2px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.MALMO.TEXT,
            borderColor:COLORS.MALMO.BORDER,
            backgroundColor:'transparent'
        },
        stockholm:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.SMALL,
            borderWidth:'2px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.STOCKHOLM.TEXT,
            borderColor:COLORS.STOCKHOLM.BORDER,
            backgroundColor:'transparent'
        },
        gothemburg:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.SMALL,
            borderWidth:'2px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.GOTHENBURG.TEXT,
            borderColor:COLORS.GOTHENBURG,
            backgroundColor:'transparent'
        },
        halmstad:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.SMALL,
            borderWidth:'2px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.HALMSTAD.TEXT,
            borderColor:COLORS.HALMSTAD.BORDER,
            backgroundColor:'transparent'
        },
        sundsvall:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.SMALL,
            borderWidth:'2px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.SUNDSVALL.TEXT,
            borderColor:COLORS.SUNDSVALL.BORDER,
            backgroundColor:'transparent'
        },
        default:{
            fontWeight:'bold', 
            fontSize:FONT_SIZE.SMALL,
            borderWidth:'2px',
            marginTop:10,
            marginLeft:5,
            marginRight:5,
            color:COLORS.CITY.TEXT,
            borderColor:COLORS.CITY.BORDER,
            backgroundColor:'transparent'
        },    
    },    
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
                    <Button 
                        variant="outlined" 
                        type="button" 
                        style={styles.region[it.region]?styles.region[it.region]:styles.region.default}  
                        onClick={()=>handleNavigate('/calendar/' + it.region)}
                    >
                        {it.region}                    
                    </Button>    
                )}    
                <Button variant="outlined" type="button" style={styles.region.danmark}  onClick={()=>handleNavigate('/denmark')}>
                    Danmark                    
                </Button>    

                <div style={{height:15}}/>
                <h4>Städer</h4>
                <Button 
                    variant="outlined" 
                    type="button" 
                    style={styles.city.malmo}  
                    onClick={()=>handleNavigate('/calendar/malmö')}
                >
                    Malmö/Lund                    
                </Button>    
                {cities.filter(it => !it.city.toLowerCase().includes('malmö')).map(it=>
                    <Button 
                        variant="outlined" 
                        type="button" style={styles.city[it.city.toLowerCase()]?styles.city[it.city.toLowerCase()]:styles.city.default}  
                        onClick={()=>handleNavigate('/calendar/' + it.city)}
                    >
                        {it.city}                    
                    </Button>    
                )}    
                <Button variant="outlined" type="button" style={styles.city.stockholm}  onClick={()=>handleNavigate('/stockholm')}>
                    Stockholm                    
                </Button>    
                <Button variant="outlined" type="button" style={styles.city.halmstad}  onClick={()=>handleNavigate('/halmstad')}>
                    Halmstad                    
                </Button>    
                <Button variant="outlined" type="button" style={styles.city.gothemburg}  onClick={()=>handleNavigate('/gothenburg')}>
                    Göteborg                    
                </Button>    
             </div>
        </div>
    )
}

export default Home


//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
