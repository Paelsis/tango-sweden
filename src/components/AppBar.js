import React, {useState, useEffect, useContext} from 'react';
import { useSharedState } from '../store';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import { TbVinyl } from "react-icons/tb";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import {AuthContext} from "../login/FirebaseAuth"
import {serverFetchData} from '../services/serverFetch'
import {COLORS, isProduction} from '../services/const'
// AppBar.js
export default () => {
  const [sharedState, setSharedState] = useSharedState({})
  //const [sharedState, setSharedState] = useGlobalState('USER_SETTINGS')
  const [anchorEl, setAnchorEl] = useState(null)
  const {user} = useContext(AuthContext)  
  const signinEmail = user?.email?user.email:undefined
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const handleClick = (event) => {
    if (event?event.currentTarget:false) {
      setAnchorEl(event.currentTarget);
    }  
  };
  const handleClose = e => {
    setAnchorEl(null);
  };

  const handleResultUser = data => {
    //alert('AppBar 0:' + JSON.stringify(result?result:'No result'))
    if (data.status === 'OK') {
      if (data.message) {
        alert(data.message)
      }
      // getUser returns an sharedState object in data.result 
      const obj = data.result;
      setSharedState({...sharedState, ...obj})
    } else {
      setSharedState({...sharedState, authLevel:4, productLevel:1, city:'Ankeborg', region:'Skåne', userName:'Kalle Anka'}) 
      navigate('/myProfile')
    }
  }
  
  useEffect(()=>{
     if (signinEmail?true:false) {
       const irl = '/getUser?email=' +  user.email
       serverFetchData(irl,  data=>handleResultUser(data))
     } 
  }, [signinEmail])

  const handleNavigate = route =>  navigate(route)
  const handleSignup = () => navigate('/signup')
  const handleSignin = () => navigate('/signin')
  
  const handleSignout = () => {
    const auth=getAuth()
    signOut(auth)
    navigate('/signin')
    // window.location.reload()
  }

  const authLevel = sharedState?.authLevel?sharedState.authLevel:0
  const productLevel = sharedState?.productLevel?sharedState.productLevel:0
  const isPrivateTeacher = sharedState?.isPrivateTeacher?sharedState.isPrivateTeacher:0

//  {(signinEmail && authLevel >= 4 && isPrivateTeacher==1)?<MenuItem onClick={()=>navigate('/add/PRIVATE_LESSON')}>Add private lesson</MenuItem>:null}

  return (
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem><ListItemText inset></ListItemText></MenuItem>
          {(signinEmail&&authLevel >= 1)?<MenuItem onClick={()=>handleSignout()}>Signout</MenuItem>:<MenuItem onClick={()=>handleSignin()}>Signin</MenuItem>}
          {signinEmail?null:<MenuItem onClick={()=>handleSignup()}>Signup</MenuItem>}
          {(signinEmail && authLevel >= 1)?<Divider />:null}
          {(signinEmail && authLevel >= 4)?<MenuItem onClick={()=>{navigate('/add');handleClose()}}>Add event</MenuItem>:null}
          {(signinEmail && authLevel >= 1)?<MenuItem onClick={()=>{navigate('/myProfile');handleClose()}}>My profile</MenuItem>:null}
          {(signinEmail && authLevel >= 16)?<MenuItem onClick={()=>{navigate('/updateUser'); handleClose()}}>Define users</MenuItem>:null}
          <MenuItem onClick={()=>{handleNavigate('/usage'); handleClose()}}>Usage</MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 2}}>
          <AppBar position="static" sx={{color:COLORS.YELLOW,  backgroundColor:'#222222'}}>
            <Toolbar>
              <Tooltip title={<h1 style={{color:COLORS.YELLOW, fontSize:14}}>Go to Home {productLevel}</h1>}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={()=>handleNavigate('/home')}
                >
                <HomeIcon 
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                />
              </IconButton>
              </Tooltip>
              
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}  onClick={()=>handleNavigate('/home')}>
              </Typography>
              <Typography variant="h8" component="div" sx={{ flexGrow: 4 }}  onClick={()=>handleNavigate('/home')}>
                {signinEmail?('Signed in as ' + (signinEmail?signinEmail:null) + ' ' + (authLevel >=16?'Administrator':authLevel>=8?'Superuser':'')):''}
              </Typography>

              <Tooltip title={<h1 style={{color:COLORS.YELLOW, fontSize:20}}>Book a private lesson</h1>}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 0 }}
                  onClick={()=>handleNavigate('/privateLessons')}
                >
                  <SchoolIcon 
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title={<h1 style={{color:COLORS.YELLOW, fontSize:20}}>List of Tango Diskjockeys</h1>}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={()=>handleNavigate('/djs')}
              >
                <TbVinyl 
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                />
              </IconButton>
              </Tooltip>


              <Tooltip title={<h1 style={{color:COLORS.YELLOW, fontSize:20}}>Menu to signup, signin, signout, add events ...</h1>}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={handleClick}
                >
                <MenuIcon 
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                />
              </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
  );
}

/* {email?ADMINISTRATORS.includes(email)?<small>{JSON.stringify(sharedState)}</small>:null:null} */
/*

*/