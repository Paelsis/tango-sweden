import React, {useEffect, useState} from "react"
import { SharedStateProvider} from './store';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Calendar from "./pages/Calendar";
import AllCalendars from "./pages/AllCalendars";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Usage from "./pages/Usage";
import Privacy from "./pages/Privacy";
import Service from "./pages/Service";
import Add from "./pages/Add";
import EditDj from "./pages/EditDj";
import Djs from "./pages/Djs";
import Update from "./pages/Update";
import Copy from "./pages/Copy";
import Camera from "./pages/Camera";
import SetupUser from './pages/SetupUser'
import AppBar from './components/AppBar'
import RedirectToMultiple from './pages/RedirectToMultiple'
import FirebaseAuth from './login/FirebaseAuth'
import FirebaseSignin from './login/FirebaseSignin';
import FirebaseResetPassword from './login/FirebaseResetPassword';
import {COLORS} from './services/const'
import {STATUSLINE_STYLE} from './services/const'
import StatusLine, {setStatusLine} from './components/StatusLine'

import 'bulma/css/bulma.min.css';
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
        color:COLORS.BLACK
    }

}

const RedirectTo = props =>  {
    window.location.replace(props.url);
    return null;
}


const StringifyJSON = json => <h4>{JSON.stringify(json)}</h4>

export default function App() {
        const [statusLineStyle, setStatusLineStyle] = useState(STATUSLINE_STYLE.DEFAULT)
        const [statusLineText, setStatusLineText] = useState()
        return (
        <div className='App'>
        <BrowserRouter> 
           <SharedStateProvider>
           <FirebaseAuth>
           <AppBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="/calendar/:calendarName" element={<Calendar />} />
                <Route path="calendars" element={<AllCalendars />} />
                <Route path="denmark" element={<RedirectTo url='https://www.brownbearsw.com/cal/tangodk_mil_kbh' />} />
                <Route path="fortuna" element={<RedirectTo url='https://www.tangofortuna.com/' />} />
                <Route path="tangorama" element={<RedirectTo url='https://www.tangorama.se/kalendar' />} />
                <Route path="halmstad" element={<RedirectTo url='http://www.tangoexperimental.com/sv-SE' />} />
                <Route path="got" element={<RedirectTo url={"https://teamup.com/ks863ac26a05ed5d28"} />} />
                <Route path="settings" element={<Settings />} />
                <Route path="usage" element={<Usage />} />
                <Route path="privacy" element={<Privacy/>} />
                <Route path="service" element={<Service />} />
                <Route path="add" element={<Add />} />
                <Route path="djs" element={<Djs />} />
                <Route path="update" element={<Update />} />
                <Route path="copy" element={<Copy />} />
                <Route path="editDj" element={<EditDj setStatusLineText={setStatusLineText} setStatusLineStyle={setStatusLineStyle} />} /> 
                <Route path="camera" element={<Camera setStatusLineText={setStatusLineText} setStatusLineStyle={setStatusLineStyle} />} />
                <Route path="setupUser" element={<SetupUser setStatusLineText={setStatusLineText} setStatusLineStyle={setStatusLineStyle} />} />
                <Route path="signin" element={<FirebaseSignin  />} />
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
        <StatusLine style={statusLineStyle} text={statusLineText} />
        </div>    
    );
  }
  
