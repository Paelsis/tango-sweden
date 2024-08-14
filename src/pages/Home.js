import React, {useState, useEffect} from 'react';
import { useSharedState} from '../store';
import Image from '../images/tangosweden.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {serverFetchData} from '../services/serverFetch'
import {COLORS} from '../services/const'
import Tooltip from '@mui/material/Tooltip';
import { createTheme } from '@mui/material/styles';

  

const FONT_SIZE = {
    BIG:18,
    SMALL:14
}

const colors = {
    skane:{
        color:COLORS.YELLOW,
        borderColor:COLORS.YELLOW,
        backgroundColor:'red',
    },
    sverige:{
        color:COLORS.YELLOW,
        borderColor:'yellow',
        backgroundColor:'blue',
    },
    norge:{    
        color:COLORS.WHITE,
        borderColor:COLORS.RED,
        backgroundColor:COLORS.BLUE,
    },
    danmark:{    
        color:'white',
        borderColor:'white',
        backgroundColor:'red'
    },
    finland:{    
        color:'white',
        borderColor:'white',
        backgroundColor:'blue'
    }
}

const buttons ={
    regions:{
        borderWidth:'3px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        fontWeight:900,
    },
    cities:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        fontWeight:900, 
    },
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
    buttonContainerRegion:{
        backgroundColor:COLORS.BLACK,
        color:COLORS.YELLOW,
        style:'absolute',
        width:'100%',
        textAlign:'center',
},
    buttonContainerCity:{
        backgroundColor:COLORS.BLACK,
        color:COLORS.YELLOW,
        style:'absolute',
        width:'100%',
        textAlign:'center',
    },
    djContainer:{
        backgroundColor:COLORS.BLACK,
        color:COLORS.YELLOW,
        style:'absolute',
        width:'100%',
        height:'10vh',
        textAlign:'center',
    },
    lowerLeftCorner:{
        marginBottom:1,
        marginLeft :1,
        width: 100,
        height: 100,
        padding:5,
        textAlign:'center',
        backgroundColor:COLORS.YELLOW,
        color: COLORS.BLACK,
        opacity:0.7,
        position: 'fixed',
        bottom: -50,
        left:-50,
        transform: 'rotateY(0deg) rotate(45deg)',
        transition: 'transform 2s',
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
            ...buttons.regions,
            ...colors.skane
        },
        danmark:{
            ...buttons.regions,
            ...colors.danmark
        },
        norge:{
            ...buttons.regions,
            ...colors.norge
        },
        finland:{
            ...buttons.regions,
            ...colors.finland
        },
        norr:{
            ...buttons.regions,
            ...colors.sverige
        }, 
        sverige:{
            ...buttons.regions,
            ...colors.sverige
        },    
        default:{
            ...buttons.regions,
            ...colors.sverige
        }    
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
    const compareRegion = (a,b) => {
        if (a.region.toLowerCase() === 'norge') {
            return 1
        } else if (b.region.toLowerCase() === 'norge') {
                return -1
        } else {    
            a.region.localeCompare(b.region)
        }    
    }

    useEffect(()=>{
        const irl = '/getCalendarNames'
        serverFetchData(irl, '', '', reply=>{
            setCities(reply.cities.sort(compareRegion)); 
            setRegions(reply.regions.sort(compareRegion))})
        }, [])
    const regionStyle = (region, fontSize) => {
        let style = styles.region[region.toLowerCase()]?styles.region[region.toLowerCase()]
        :region.toLowerCase()==='skåne'?styles.region.skane
        :styles.region.default
        return {...style, fontSize}
    }

    return(
        <div style={styles.container}>
            <img style={styles.img} src={Image} onClick={()=>handleNavigate('/calendar/skåne')}/>
            <div style={styles.buttonContainerRegion}>
                <p/>
                {['skåne', 'mitt', 'sydväst', 'västra götaland', 'väst', 'norr'].map(reg=>regions.filter(it=>it.region.toLowerCase() === reg).map(it=>
                    <Button 
                        key={it.region}
                        variant="outlined" 
                        type="button" 
                        style={regionStyle(it.region, FONT_SIZE.BIG)}  
                        onClick={()=>handleNavigate('/calendar/' + it.region)}
                    >
                        {it.region}                    
                    </Button>    
                ))}    
                <Button variant="outlined" type="button" style={regionStyle('danmark', FONT_SIZE.BIG)}  onClick={()=>handleNavigate('/denmark')}>
                    Danmark                    
                </Button>                    
                {regions.filter(it=>it.region.toLowerCase() === 'norge').map(it=>
                    <Button 
                        key={it.region}
                        variant="outlined" 
                        type="button" 
                        style={regionStyle(it.region, FONT_SIZE.BIG)}  
                        onClick={()=>handleNavigate('/calendar/' + it.region)}
                    >
                        {it.region}                    
                    </Button>    
                )}    
            {regions.filter(it=>it.region.toLowerCase() === 'finland').map(it=>
                    <Button 
                        key={it.region}
                        variant="outlined" 
                        type="button" 
                        style={regionStyle(it.region, FONT_SIZE.BIG)}  
                        onClick={()=>handleNavigate('/calendar/' + it.region)}
                    >
                        {it.region}                    
                    </Button>    
                )}    
            </div>
            <div style={styles.buttonContainerCity}>
                <div style={{height:15}} />
                <h4>Städer</h4>
                <Button key='Stockholm' variant="outlined" type="button" style={regionStyle('sverige', FONT_SIZE.SMALL)}  onClick={()=>handleNavigate('/calendar/stockholm')}>
                    Stockholm                    
                </Button>    
                <Button 
                    key='Malmoe'
                    variant="outlined" 
                    type="button" 
                    style={styles.region.skane}  
                    onClick={()=>handleNavigate('/calendar/malmö')}
                >
                    Malmö/Lund                    
                </Button>    

                {['mitt', 'skåne', 'västra götaland', 'väst', 'sydost', 'norr'].map(reg=>
                    cities.filter(it=>reg===it.region.toLowerCase() && it.city.toLowerCase() !== 'malmö').map(it=>
                        <Button key = {it.city} variant="outlined" type="button" style={regionStyle(it.region.toLowerCase(), FONT_SIZE.SMALL)}  onClick={()=>handleNavigate('/calendar/' + it.city)}>
                            {it.city}                    
                        </Button>    
                    )
                )}    

                <Button key = 'Halmstad' variant="outlined" type="button" style={regionStyle('sverige', FONT_SIZE.SMALL)}  onClick={()=>handleNavigate('/halmstad')}>
                    Halmstad                    
                </Button>    

                <Button key='Gothenburg' variant="outlined" type="button" style={regionStyle('sverige', FONT_SIZE.SMALL)}  onClick={()=>handleNavigate('/got')}>
                    Göteborg                    
                </Button>    

                {['norge', 'finland'].map(reg=>
                    cities.filter(it=>reg===it.region.toLowerCase() && it.city.toLowerCase() !== 'malmö').map(it=>
                        <Button key = {it.city} variant="outlined" type="button" style={regionStyle(it.region.toLowerCase(), FONT_SIZE.SMALL)}  onClick={()=>handleNavigate('/calendar/' + it.city)}>
                            {it.city}                    
                        </Button>    
                    )
                )}    
            </div>    
        </div>
    )
}

export default Home

// <div style={styles.lowerLeftCorner} onClick={()=>handleNavigate('/djs')}>DJs</div>

//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
