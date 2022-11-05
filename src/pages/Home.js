import React, {useState} from 'react';
import Image from '../images/tangosweden.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


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
        maxWidth:'100%',
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

const Home = () => {
    const navigate = useNavigate()
    const handleNavigate = lnk => {
        navigate(lnk)
    }

    return(
        <div style={styles.container}>
            <img style={styles.img} src={Image} onClick={()=>handleNavigate('/malmo')}/>
            <div style={styles.buttonContainer}>
                <p/>
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/malmo')}>
                    Malmö/Lund                    
                </Button>    
                &nbsp;
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/denmark')}>
                    Denmark                    
                </Button>    
                &nbsp;
                <Button variant="outlined" type="button" style={styles.button}  onClick={()=>handleNavigate('/stockholm')}>
                    Stockholm                    
                </Button>    
             </div>
        </div>
    )
}

export default Home


//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
