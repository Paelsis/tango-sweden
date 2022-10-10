import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarByCity from "./pages/CalendarByCity";
import CalendarMalmoLund from "./pages/CalendarMalmoLund";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
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



export default function App() {
        return (
        <BrowserRouter> 
           <FirebaseAuth>
           <AppBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/calendar/:city" element={<CalendarByCity />} />
                <Route path="/calendar" element={<CalendarByCity />} />
                <Route path="malmo" element={<CalendarMalmoLund />} />
                <Route path="lund" element={<CalendarMalmoLund />} />
                <Route path="denmark" element={<RedirectTo url='http://www.tango.dk/milongas-practicas-events/' />} />
                <Route path="helsingborg" element={<RedirectToMultiple Tangorama='https://www.tangorama.se/kalendar' Fortuna='https://www.tangofortuna.com/' />} />
                <Route path="fortuna" element={<RedirectTo url='https://www.tangofortuna.com/' />} />
                <Route path="tangorama" element={<RedirectTo url='https://www.tangorama.se/kalendar' />} />
                <Route path="halmstad" element={<RedirectTo url='http://www.tangoexperimental.com/sv-SE' />} />
                <Route path="gothenburg" element={<RedirectTo url={"https://teamup.com/ks863ac26a05ed5d28"} />} />
                <Route path="gothenburgTest" element={<RedirectTo url={"https://teamup.com/ks863ac26a05ed5d28"} />} />
                <Route path="stockholm" element={<PendingData />} />
                <Route path="admin" element={<Admin/>} />
                <Route path="privacy" element={<Privacy/>} />
                <Route path="service" element={<Service />} />
                <Route path="add" element={<Add />} />
                <Route path="update" element={<Update />} />
                <Route path="signin" element={<FirebaseSignin />} />
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
        </BrowserRouter>
    );
  }
  