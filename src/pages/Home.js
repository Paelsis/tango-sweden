import React, {useState, useEffect} from 'react';
import Image from '../images/tangosweden.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {serverFetchData} from '../services/serverFetch'
import {COLORS} from '../services/const'

  

const FONT_SIZE = {
    BIG:18,
    SMALL:12
}

const colors = {
    skane:{
        color:COLORS.YELLOW,
        borderColor:COLORS.YELLOW,
        backgroundColor:'black',
    },
    sverige:{
        color:COLORS.YELLOW,
        borderColor:COLORS.YELLOW,
        backgroundColor:'black',
    },
    norge:{    
        color:COLORS.WHITE,
        borderColor:COLORS.WHITE,
        backgroundColor:'black'
    },
    danmark:{    
        color:'white',
        borderColor:'red',
        backgroundColor:'black'
    },
    finland:{    
        color:COLORS.WHITE,
        borderColor:COLORS.WHITE,
        backgroundColor:'black'
    }
    /*
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
    */
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
    const [cities, setCities] = useState([])
    const [regions, setRegions] = useState([])
    const [cityRegionCountry, setCityRegionCountry] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const irl = '/getCalendarNames'
        serverFetchData(irl,  reply=>{
            setCityRegionCountry(reply.cityRegionCountry); 
            setCities(reply.cities); 
            setRegions(reply.regions)
        })
    }, [])

    const regionStyle = (region, fontSize) => {
        let style = styles.region[region.toLowerCase()]?styles.region[region.toLowerCase()]
        :region.toLowerCase()==='skåne'?styles.region.skane
        :styles.region.sverige
        return {...style, fontSize}
    }

    const cityToRegion = city => {
        const foundRec = cityRegionCountry.find(it=>it.city===city)        
        if (foundRec) {
            return foundRec.region
        } else {
            return 'sverige'
        }
    }

    const handleClickRegion = region => {
        switch (region.toLowerCase()) { 
        case 'danmark': 
            navigate('/denmark')
            break;
        default:
            navigate('/calendar/' + region)
            break;
        }
    }

    const handleClickCity = city => {
        switch (city.toLowerCase()) { 
        case 'göteborg': 
            navigate('/got')
            break;
        case 'halmstad': 
            navigate('/halmstad')
            break;
        default:
            navigate('/calendar/' + city)
            break;
        }
    }

    return(
        <div style={styles.container}>
            <img style={styles.img} src={Image} onClick={()=>handleClickRegion('skåne')}/>
            <div style={styles.buttonContainerRegion}>
                <p/>
                {regions.map((region, idx)=>
                    <Button 
                        key={idx}
                        variant="outlined" 
                        type="button" 
                        style={regionStyle(region, FONT_SIZE.BIG)}  
                        onClick={()=>handleClickRegion(region.toLowerCase())}
                    >
                        {region}                    
                    </Button>    
                )}    
            </div>
            <div style={styles.buttonContainerCity}>
                <div style={{height:15}} />
                <h4>Städer</h4>
                {cities.map((city, index)=>
                    <Button key = {index} variant="outlined" type="button" style={regionStyle(cityToRegion(city), FONT_SIZE.SMALL)}  onClick={()=>handleClickCity(city)}>
                        {city}                    
                    </Button>    
                )}    
            </div>    
        </div>
    )
}

export default Home

// <div style={styles.lowerLeftCorner} onClick={()=>handleNavigate('/djs')}>DJs</div>

//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
