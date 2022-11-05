import React, {useState} from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Calendar from "./pages/Calendar";
import AllCalendars from "./pages/AllCalendars";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import Service from "./pages/Service";
import Add from "./pages/Add";
import Update from "./pages/Update";
import PendingData from './pages/PendingData'
import AppBar from './components/AppBar'
import FirebaseAuth from './login/FirebaseAuth'
import FirebaseSignin from './login/FirebaseSignin';
import FirebaseResetPassword from './login/FirebaseResetPassword';
import Button from '@mui/material/Button';
import { SharedStateProvider } from './store';

import "./App.css"

const styles = {
    button: color => ({
        color,
        borderColor:color,
        backgroundColor:'transparent'
    }),
    notFound:{
        width:'100%', 
        textAlign:'center', 
        color:'232323'
    }

}

const RedirectTo = props =>  {
    window.location.replace(props.url);
    return null;
}

const RedirectToMultiple = props => {

    return(
        <>
            <div style={{width:'100%', textAlign:'center'}}>
                {Object.entries(props).map(it =>
                    <p>
                        <Button style={styles.button('#232323')} variant="outlined"  type="submit" onClick={()=>window.location.replace(it[1])}>Redirect to {it[0]}</Button>
                    </p>
                )}
            </div>
        </>
    )
}

const StringifyJSON = json => <h4>{JSON.stringify(json)}</h4>
//<h1>{StringifyJSON(userSettings)}</h1>

export default function App() {
        const [userSettings, setUserSettings] = useState({})
        return (
        <BrowserRouter> 
           <SharedStateProvider>
           <FirebaseAuth>

           <AppBar setUserSettings={setUserSettings} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="calendar" element={<Navigate to={'/calendar/malmo'} />} />
                <Route path="malmo" element={<Navigate to={'/calendar/malmo'} />} />
                <Route path="lund" element={<Navigate to={'/calendar/malmo'} />} />
                <Route path="stockholm" element={<Navigate to={'/calendar/stockholm'}/>} />
                <Route path="gothenburgNew" element={<Navigate to={'/calendar/gothenburgNew'} />} />
                <Route path="/calendar/:calendarName" element={<Calendar />} />
                <Route path="calendars" element={<AllCalendars />} />
                <Route path="denmark" element={<RedirectTo url='http://www.tango.dk/milongas-practicas-events/' />} />
                <Route path="helsingborg" element={<RedirectToMultiple Tangorama='https://www.tangorama.se/kalendar' Fortuna='https://www.tangofortuna.com/' />} />
                <Route path="fortuna" element={<RedirectTo url='https://www.tangofortuna.com/' />} />
                <Route path="tangorama" element={<RedirectTo url='https://www.tangorama.se/kalendar' />} />
                <Route path="halmstad" element={<RedirectTo url='http://www.tangoexperimental.com/sv-SE' />} />
                <Route path="gothenburg" element={<RedirectTo url={"https://teamup.com/ks863ac26a05ed5d28"} />} />
                <Route path="settings" element={<Settings userSettings={userSettings} setUserSettings={setUserSettings} />} />
                <Route path="privacy" element={<Privacy/>} />
                <Route path="service" element={<Service />} />
                <Route path="add" element={<Add userSettings={userSettings} />} />
                <Route path="update" element={<Update userSettings={userSettings} />} />
                <Route path="signin" element={<FirebaseSignin setUserSettings={setUserSettings} />} />
                <Route path="resetPassword" element={<FirebaseResetPassword />} />
                <Route
                    path="*"
                    element={
                    <div style={styles.notFound}>
                        <h2>Page not found</h2>
                    </div>
                    }
                />
                </Routes>
           </FirebaseAuth>
           </SharedStateProvider>
        </BrowserRouter>
    );
  }
  
