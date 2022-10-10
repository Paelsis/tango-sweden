
import React, {useEffect, useState, ReactNode, SyntheticEvent} from 'react';
import ApiCalendar from 'react-google-calendar-api';
import Button from '@mui/material/Button';
import { setMaxListeners } from 'superagent';
import moment from 'moment-with-locales-es6'



const config = {
  clientId:process.env.REACT_APP_CLIENT_ID_PER,
  apiKey:process.env.REACT_APP_API_KEY_PER,
  "scope": "https://www.googleapis.com/auth/calendar",
  "discoveryDocs": [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
}

const styles = {
  button: {
    color:'red',
    borderColor:'red',
    backgroundColor:'transparent',
  }
}

const apiCalendar = new ApiCalendar(config)

export default () => {
    const [list, setList] = useState([])
    const createList = () =>{
        apiCalendar.listEvents({
          timeMin: moment().startOf('day'),
          timeMax: moment().endOf('month').add(3,'months').add(7, 'days'),
          //timeMin: new Date().toISOString(),
          //timeMax: new Date().addDays(10).toISOString(),
          showDeleted: true,
          maxResults: 10,
          orderBy: 'updated'
         
        }).then(({ result }) => {
          setList(result);
        });
      }

      const signIn = e => {apiCalendar.handleAuthClick();  createList()}
      const signOut = e => {apiCalendar.handleSignoutClick(); console.log('Signed out')}
      return (
        <>
          <Button style={styles.button} variant="outlined" onClick={signIn} > 
            sign-in
          </Button>
          <Button style={styles.button} variant="outlined" onClick={signOut} > 
            sign-out
          </Button>
          {list.map(it =>
            <div>{JSON.stringify(it, null, '\t')}</div>
          )}
        </>
      )
}