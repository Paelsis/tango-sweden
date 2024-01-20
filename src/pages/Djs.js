import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {serverFetchData} from '../services/serverFetch'
import { COLORS, REGIONS} from '../services/const'
// import './Djs.css';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const styles = {
    container:{
        backgroundColor:'black',
        style:'absolute',
        top:0,
        width:'100%',
        minHeight:'100vh',
        textAlign:'center',
        color:'#FFFF87',
    },
    buttonContainer:{
        style:'absolute',
        width:'100%',
        height:'50vh',
        width:'100%',
        textAlign:'center',
        color:COLORS.YELLOW, //'#FFFFA7',

    },
    buttonContained:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        fontWeight:900,
        color:'black',
        borderColor:'#FFFF87',
        background:'#FFFF87',
    },
    buttonOutlined:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        fontWeight:900,
        color:'#FFFF87',
        borderColor:'#FFFF87',
    },
    buttonDj:{
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        color:'#FFFF87',
        borderColor:'#FFFF87',
        fontWeight:900,
    },
    anchor:{
        color:'#FFFF87',
        textDecoration:'underline'
        // backgroundColor:'transparent'
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

const largeIcons =['Skåne','Västra Götaland', 'Mitt']

const viewDjsForRegion = (djs, region, dj, setDj) => {
    const subdir = 'images/djs'
    const src = dj?dj.urlImage?dj.urlImage.includes('http')?dj.urlImage:(apiBaseUrl + '/' + subdir + '/' + dj.urlImage):undefined:undefined
    const alt = dj?dj.urlImage?('File ' + dj.urlImage + ' not found'):'No url for image':'No dj'
    return(
    <div >
        <div className='column is-12'>
            <h4 style={{color:COLORS.YELLOW}}>Diskjockeys</h4>
            {djs.filter(dj=> dj.region === region).map(it=>
                <Button 
                variant={it.email===dj.email?'contained':'outlined'} 
                type="button" 
                style={it.email===dj.email?styles.buttonContained:styles.buttonOutlined}  
                onClick={()=>setDj(it)}>{it.nickname?it.nickname:(it.firstName + ' ' + it.lastName)}
                </Button>
            )}    
        </div>
        {dj.email?
            <div className="columns is-centered" style={{color:COLORS.WHITE, width:'100vw', textAlign:'left', padding:40}}>
                <div className="column is-6 has-white-text">
                    <div style={{textAlign:'center'}}>
                        <strong style={{fontSize:36, fontWeight:'bold'}}>{dj.nickname?dj.nickname:(dj.firstName + ' ' + dj.lastName)}</strong>
                        <p/><p/>
                        <strong style={{fontSize:16}}>
                        City:{dj.city}
                        &nbsp;
                        Phone:{dj.phone}
                        &nbsp;
                        E-mail:{dj.email?<a href={"mailto:" + (dj.email?dj.email:null)}>{dj.email}</a>:null}
                        </strong>
                    </div>
                    <div style={{height:20}}/>
                    <div className='has-white-text'>
                        <div className='content' dangerouslySetInnerHTML={{__html: dj.description}} />
                    </div>
                </div>
                <div className="column is-3" style={{textAlign:'left', paddingTop:40}}>
                    <img src={src} alt={alt} />
                </div>
            </div>    
        :null}
    </div>
)}


//AllCalendars
export default () => {
    const [djs, setDjs] = useState([])
    const [dj, setDj] = useState({})
    const [region, setRegion] = useState([])
    const navigate = useNavigate()
    const handleNavigate = lnk => {
        navigate(lnk)
    }
    const uniqueList = list => {return([...new Set(list)])}

    useEffect(()=>{
        const irl = '/getDjs'
        serverFetchData(irl, '', '', handleReply)
    }, [])

    // const cities = uniqueList(djs.map(it => it['city']))
    const uniqueRegions = djs.map(it => it.region)
    const regions = REGIONS.filter(it =>uniqueRegions.includes(it))

    const handleReply = reply => {
        if (reply.status === 'OK') {
            // alert(JSON.stringify(reply))
            setDjs(reply.result)
        } else {
            alert('ERROR: No DJ-s in database')
        }
    }
    return(
        <div style={styles.container}>
                <div style={{width:'100vw', textAlign:'center'}}>
                    <h4 style={{color:COLORS.YELLOW}}>Regions</h4>
                    {regions.map(reg => 
                        <span>
                            <Button 
                                variant={reg===region?"contained":"outlined"} 
                                // size={largeIcons.includes(reg)?'medium':'small'}
                                type="button" style={reg===region?styles.buttonContained:styles.buttonOutlined}  
                                onClick={()=>{setRegion(reg);setDj({})}}>{reg}
                            </Button>
                        </span>    
                    )}   
                </div>     
                <div style={{width:'100vw', textAlign:'center', margin:'auto'}}>
                        {viewDjsForRegion(djs, region, dj, setDj)} 
                </div>
        </div>
    )
}



//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
