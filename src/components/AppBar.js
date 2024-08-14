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
import { TbVinyl } from "react-icons/tb";
import { PiHighHeelLight } from "react-icons/pi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import {AuthContext} from "../login/FirebaseAuth"
import {serverFetchDataResult} from '../services/serverFetch'
import {COLORS} from '../services/const'
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
    if (event?event.currentTarget:false) {
      setAnchorEl(event.currentTarget);
    }  
  };
  const handleClose = e => {
    setAnchorEl(null);
  };

  const handleResultUser = result => {
    //alert('AppBar 0:' + JSON.stringify(result?result:'No result'))
    if (result) {
      if (!!result.region) {
        setUserSettings({...userSettings, ...result})
      }  
    } else {
      navigate('/myProfile')
    }
  }
  
  useEffect(()=>{
    onAuthStateChanged(auth, user => {
      setEmail(user?user.email:undefined);
      if (user?user.email:false) {
        const irl = '/getUser?email=' +  user.email
        serverFetchDataResult(irl, '', '', result=>handleResultUser(result))
      } 
    })
  }, [])

  const handleNavigate = route => {
    navigate(route)
  }

  const handleSignup = () => {
    navigate('/signup')
  }
  const handleSignin = () => {
    navigate('/signin')
  }

  const handleSignout = () => {
    setEmail(undefined)
    signOut(auth)
    navigate('/signin')
    // window.location.reload()
  }

  const authLevel4 = email?userSettings?(userSettings.authLevel>=4)?true:false:false:false
  const authLevel8 = email?userSettings?(userSettings.authLevel>=8)?true:false:false:false

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
        {email?<MenuItem onClick={()=>handleSignout()}>Signout</MenuItem>:<MenuItem onClick={()=>handleSignin()}>Signin</MenuItem>}
        {!email?<MenuItem onClick={()=>handleSignup()}>Signup</MenuItem>:null}
        <Divider />
        {(email&&authLevel4)?<MenuItem onClick={()=>navigate('/add')}>Add Event</MenuItem>:null}
        {email?<MenuItem onClick={()=>navigate('/editDj')}>My TDJ Info</MenuItem>:null}
        {userSettings.shoeStories && email?<MenuItem onClick={()=>navigate('/editShoe')}>My Shoe Story</MenuItem>:null}
        {email?<MenuItem onClick={()=>navigate('/myProfile')}>My Profile</MenuItem>:null}
        {authLevel8?<MenuItem onClick={()=>navigate('/setupUser')}>Define users</MenuItem>:null}
        <MenuItem onClick={()=>handleNavigate('/usage')}>Usage</MenuItem>
      </Menu>

      <Box sx={{ flexGrow: 2}}>
        <AppBar position="static" sx={{color:COLORS.YELLOW,  backgroundColor:'#232323'}}>
          <Toolbar>
            <Tooltip title={<h1 style={{color:COLORS.YELLOW, fontSize:20}}>Go to Home</h1>}>
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
            </Tooltip>
            
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}  onClick={()=>handleNavigate('/home')}>
            </Typography>
            <Typography variant="h8" component="div" sx={{ flexGrow: 4 }}  onClick={()=>handleNavigate('/home')}>
              {email?'Signed in ' + (userSettings.city?userSettings.city:'') + ' ' +  (userSettings.region?userSettings.region:'') + ' ' + (email?email:null):null}
            </Typography>
            <Tooltip title={<h1 style={{color:COLORS.YELLOW, fontSize:20}}>List of Tango Diskjockeys</h1>}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0 }}
            >
              <TbVinyl 
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={()=>handleNavigate('/djs')}
              />
            </IconButton>
            </Tooltip>
            {userSettings.shoeStories?
            <Tooltip title={<h1 style={{color:COLORS.YELLOW, fontSize:20}}>Discussion about tango shoes</h1>}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0 }}
            >
              <PiHighHeelLight 
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={()=>handleNavigate('/shoe')}
              />
            </IconButton>
            </Tooltip>
            :null}
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

/* {email?ADMINISTRATORS.includes(email)?<small>{JSON.stringify(userSettings)}</small>:null:null} */
