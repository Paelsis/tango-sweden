import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, IconButton, Tooltip} from '@mui/material';
import {serverFetchData} from '../services/serverFetch'
import { COLORS, REGIONS} from '../services/const'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
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

const viewUsersForRegion = (region, users, selectedUser, setSelectedUser) => {
    const subdir = 'images/users'
    const src = selectedUser?.urlImage?selectedUser.urlImage.includes('http')?selectedUser.urlImage:(apiBaseUrl + '/' + subdir + '/' + selectedUser.urlImage):undefined
    const alt = selectedUser?.urlImage?('File ' + selectedUser.urlImage + ' not found'):'No image'
    return(
    <div >
        <div className='column is-12'>
            <h4 style={{color:COLORS.YELLOW}}>Private teachers</h4>
            {users.filter(selectedUser=> selectedUser.region === region).map(it=>
                <>
                    <Button 
                        variant={it.email===selectedUser?.email?'contained':'outlined'} 
                        type="button" 
                        style={it.email===selectedUser?.email?styles.buttonContained:styles.buttonOutlined}  
                        onClick={()=>setSelectedUser(it)}>{it.nickname?it.nickname:(it.name)}
                    </Button>
                </>
            )}    
        </div>
        {selectedUser?.email?
            <div className="columns is-centered" style={{color:COLORS.WHITE, width:'100vw', textAlign:'left', padding:40}}>
                <div className="column is-6 has-white-text">
                    <div style={{textAlign:'center'}}>
                        <strong style={{fontSize:36, fontWeight:'bold'}}>
                            {selectedUser.nickname?selectedUser.nickname:selectedUser.name}

                        </strong>
                            <Tooltip title='Registration for a private lesson'>
                                <IconButton color="inherit" variant="outlined" onClick={()=>alert('Register')} autoFokus>
                                    <br/>
                                    <AppRegistrationIcon size='large' color={'white'}/>
                                </IconButton>
                            </Tooltip>
                        <p/><p/>
                        <strong style={{fontSize:16}}>
                        City:{selectedUser.city}
                        &nbsp;
                        Phone:{selectedUser.phone?selectedUser.phone:'Unknown'}
                        &nbsp;
                        E-mail:{selectedUser.email?<a href={"mailto:" + (selectedUser.email?selectedUser.email:null)}>{selectedUser.email}</a>:null}
                        </strong>
                    </div>
                    <div style={{height:20}}/>
                    <div className='has-white-text'>
                        <div className='content' dangerouslySetInnerHTML={{__html: selectedUser.description?selectedUser.description:'Unknown'}} />
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
    const [region, setRegion] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState()
    const navigate = useNavigate()
    const handleNavigate = lnk => {
        navigate(lnk)
    }
    const handleReply = reply => {
        if (reply.status === 'OK') {
            // alert(JSON.stringify(reply))
            setUsers(reply.result)
        } else {
            alert('ERROR: No private teachers in database')
        }
    }

    useEffect(()=>{
        const irl = '/getPrivateTeachers'
        serverFetchData(irl,  handleReply)
    }, [])

    // const cities = uniqueList(djs.map(it => it['city']))
    const uniqueList = list => {return([...new Set(list)])}
    const uniqueRegions = uniqueList(users.map(it => it.region))
    const regions = REGIONS.filter(it =>uniqueRegions.includes(it))

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
                                onClick={()=>{setRegion(reg);setSelectedUser()}}>{reg}
                            </Button>
                        </span>    
                    )}   
                </div>     
                <div style={{width:'100vw', textAlign:'center', margin:'auto'}}>
                        {viewUsersForRegion(region, users, selectedUser, setSelectedUser)} 
                </div>
        </div>
    )
}



//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
