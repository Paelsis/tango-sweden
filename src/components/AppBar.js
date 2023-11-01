import React, {useState, useEffect, useContext} from 'react';
import { useSharedState } from '../store';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import {AuthContext} from "../login/FirebaseAuth"
import {serverFetchDataResult} from '../services/serverFetch'
// AppBar.js
export default () => {
  const [userSettings, setUserSettings] = useSharedState()
  const [email, setEmail] = useState(undefined)
  //const [userSettings, setUserSettings] = useGlobalState('USER_SETTINGS')
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const auth = getAuth()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = e => {
    setAnchorEl(null);
  };

  const handleResult = result => {
    //alert('AppBar 0:' + JSON.stringify(result?result:'No result'))
    if (result && !!result.region) {
      setUserSettings({...userSettings, ...result})
    } else {
      navigate('/settings')
    }
  }
  
  useEffect(()=>{
    onAuthStateChanged(auth, user => {

      setEmail(user?user.email:undefined);
      if (user?user.email:false) {
        const irl = '/getUser?email=' +  user.email
        serverFetchDataResult(irl, '', '', result=>handleResult(result))
      } 
    })
  }, [])

  const handleNavigate = route => {
    navigate(route)
  }

  const handleSignout = () => {
    setEmail(undefined)
    signOut(auth)
    window.location.reload()
    navigate('/signin')
  }

  const handleSignin = () => {
    navigate('/signin')
  }

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
        <MenuItem onClick={()=>handleNavigate('/calendars')}>Alla kalendrar</MenuItem>
        <Divider />
        <MenuItem><ListItemText inset></ListItemText></MenuItem>
        {email?<MenuItem onClick={()=>handleSignout()}>Signout</MenuItem>
        :<MenuItem onClick={()=>handleSignin()}>Signin</MenuItem>}
        {email?<MenuItem onClick={()=>navigate('/settings')}>Settings</MenuItem>:null}
        {email?<MenuItem onClick={()=>navigate('/add')}>Add Event</MenuItem>:null}
        {(email&& (userSettings?userSettings.authLevel >=8:false))?<MenuItem onClick={()=>navigate('/setupUser')}>Setup users</MenuItem>:null}
        <MenuItem onClick={()=>handleNavigate('/usage')}>Usage</MenuItem>
      </Menu>

      <Box sx={{ flexGrow: 2}}>
        <AppBar position="static" sx={{color:'#FFFFA7',  backgroundColor:'#232323'}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0 }}
            >
              <HomeIcon 
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={()=>handleNavigate('/home')}
              />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}  onClick={()=>handleNavigate('/home')}>
            </Typography>
            <Typography variant="h8" component="div" sx={{ flexGrow: 4 }}  onClick={()=>handleNavigate('/home')}>
              {email?'Signed in ' + (userSettings.city?userSettings.city:'') + ' ' +  (userSettings.region?userSettings.region:'') + ' ' + (email?email:null):null}
            </Typography>
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
          </Toolbar>
        </AppBar>
      </Box>
      </div>
  );
}

/* {email?ADMINISTRATORS.includes(email)?<small>{JSON.stringify(userSettings)}</small>:null:null} */
