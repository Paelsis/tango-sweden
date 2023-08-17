import React, {useEffect, useState} from "react"
import { useSharedState, SharedStateProvider} from './store';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Calendar from "./pages/Calendar";
import AllCalendars from "./pages/AllCalendars";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Usage from "./pages/Usage";
import Privacy from "./pages/Privacy";
import Service from "./pages/Service";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Copy from "./pages/Copy";
import SetupUser from './pages/SetupUser'
import AppBar from './components/AppBar'
import RedirectToMultiple from './pages/RedirectToMultiple'
import FirebaseAuth from './login/FirebaseAuth'
import FirebaseSignin from './login/FirebaseSignin';
import FirebaseResetPassword from './login/FirebaseResetPassword';
import serverFetch from './services/serverFetch'
import {COLORS} from './services/const'
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
        return (
        <BrowserRouter> 
           <SharedStateProvider>
           <FirebaseAuth>
           <AppBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="/calendar/:calendarName" element={<Calendar />} />
                <Route path="stockholmPages" element={<RedirectToMultiple 
                        Tangohelheten='https://www.tangohelheten.se/kalender' 
                        Tantonorte='http://www.tangonorte.com/events.php' 
                        Tango08='https://www.facebook.com/pg/Tango08Stockholm/events/'
                        Stockholmtango='https://stockholmtango.com/praktika/'
                        Argentango='http://argentango.se/milonga.php'
                        Tangoverkstaden='https://tangoverkstan.se/kalender'
                    />}
                />
                <Route path="gothenburgNew" element={<Navigate to={'/calendar/gothenburgNew'} />} />
                <Route path="calendars" element={<AllCalendars />} />
                <Route path="denmark" element={<RedirectTo url='https://www.brownbearsw.com/cal/tangodk_mil_kbh' />} />
                <Route path="fortuna" element={<RedirectTo url='https://www.tangofortuna.com/' />} />
                <Route path="tangorama" element={<RedirectTo url='https://www.tangorama.se/kalendar' />} />
                <Route path="halmstad" element={<RedirectTo url='http://www.tangoexperimental.com/sv-SE' />} />
                <Route path="gothenburg" element={<RedirectTo url={"https://teamup.com/ks863ac26a05ed5d28"} />} />
                <Route path="settings" element={<Settings />} />
                <Route path="usage" element={<Usage />} />
                <Route path="privacy" element={<Privacy/>} />
                <Route path="service" element={<Service />} />
                <Route path="add" element={<Add />} />
                <Route path="update" element={<Update />} />
                <Route path="copy" element={<Copy />} />
                <Route path="signin" element={<FirebaseSignin  />} />
                <Route path="setupUser" element={<SetupUser  />} />
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
  
