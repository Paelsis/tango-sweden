import React, {useState, useEffect} from 'react';
import { useSharedState} from '../store';
import Image from '../images/tangosweden.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import serverFetch from '../services/serverFetch'
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
    buttonSkane:{
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
            <img style={styles.img} src={Image} onClick={()=>handleNavigate('/calendar/skane')}/>
            <div style={styles.buttonContainer}>
                <p/>
                <Button variant="outlined" type="button" style={styles.buttonSkane}  onClick={()=>handleNavigate('/calendar/skane')}>
                    Skåne                    
                </Button>    
                <Button variant="outlined" type="button" style={styles.buttonDenmark}  onClick={()=>handleNavigate('/denmark')}>
                    Denmark                    
                </Button>    
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/malmo')}>
                    Malmö/Lund                    
                </Button>    
                {list.find(it=>it.calendarName.toLowerCase()==='helsingborg')?
                    <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/calendar/helsingborg')}>
                        Helsingborg                    
                    </Button>    
                :
                    null
                }
                {list.find(it=>it.calendarName.toLowerCase()==='ystad')?
                    <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/calendar/ystad')}>
                        Ystad                    
                    </Button>
                :
                    null
                }    
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/halmstad')}>
                    Halmstad                    
                </Button>    
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/gothenburg')}>
                    Göteborg                    
                </Button>    
                {list.find(it=>it.calendarName.toLowerCase()==='stockholm')?
                    <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/calendar/stockholm')}>
                        Stockholm                    
                    </Button> 
                :
                    null
                }  
                {list.find(it=>it.calendarName.toLowerCase()==='jamtland')?
                    <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/calendar/jamtland')}>
                        Jämtland                    
                    </Button> 
                :
                    null
                }  
                {list.find(it=>it.calendarName.toLowerCase()==='norr')?
                    <Button variant="outlined" type="button" style={styles.buttonNorr}  onClick={()=>handleNavigate('/calendar/jamtland')}>
                        Norr                    
                    </Button> 
                :
                    null
                }  
             </div>
        </div>
    )
}

export default Home


//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
