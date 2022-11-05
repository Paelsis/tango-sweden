import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment-with-locales-es6'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../style.css';
import {getEvents, getEventsTable} from '../services/getEvents'
import DialogSlide from './DialogSlide'
import SmallCalendarView from './SmallCalendarView'
import { isMobile} from "react-device-detect"
import ShowTable from "../components/ShowTable"
import Button from '@mui/material/Button';
import { transferAnitasCalendar } from '../services/transferAnitasCalendar'
import { layoutGenerator } from 'react-break';
import { PropaneSharp } from '@mui/icons-material';


const DeviceDetector = () => (
  <div>I am rendered on: {isMobile ? "Mobile" : "Desktop"}</div>
);

const layout = layoutGenerator({
  mobile: 0,
  phablet: 550,
  tablet: 768,
  desktop: 992,
});

/*
const calendarId_TS=process.env.REACT_APP_CALENDAR_ID_TS
const apiKey_TS=process.env.REACT_APP_CALENDAR_API_KEY_TS
*/

const calendarId_TK=process.env.REACT_APP_CALENDAR_ID_TK
const apiKey_TK=process.env.REACT_APP_CALENDAR_API_KEY_TK


const localizer = momentLocalizer(moment)


const changeToDbEntry = ev => {
  let ret = 
  {
      eventId:ev.eventId,
      title:ev.title, 
      description:ev.description,
      startDateTime:ev.start,
      endDateTime:ev.end,
      location:ev.location,
   }
   return(ret)
  }


const ListData = ({list}) => {
  const [toggle, setToggle] = useState(false)
  //const handleClick = ev => alert(JSON.stringify(ev))
  const filterList = list.map(it =>changeToDbEntry(it))
  return(
     <> 
    <button onClick={()=>setToggle(!toggle)}>Show data</button>
    {toggle?<ShowTable list={filterList} />:null} 
    </>
  )
}

export default props => {
  const params = useParams()
  const calendarName=params?params.calendarName?params.calendarName:'malmo':'malmo'
  const [events_TK, setEvents_TK] = useState([])
  const [events_TAB, setEvents_TAB] = useState([])
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState({})

  //const OnMobile = layout.is('mobile');
  const OnAtMostPhablet = layout.isAtMost('phablet');
  const OnAtLeastTablet = layout.isAtLeast('tablet');
  //const OnDesktop = layout.is('desktop');

  useEffect(()=>{
    const timeMin = moment().startOf('day')
    const timeMax = moment().endOf('month').add(3,'months').add(7, 'days')
    moment.locale('sv');
    /*
    getEvents(
      calendarId_TS,
      apiKey_TS,
      timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
      timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
      'SV',
      '',
      events => setEvents_TS(events.filter(ev=>ev.description.toUpperCase().indexOf('TANGOKOMPANIET') < 0)),
    )
    */
    if (calendarName.toLowerCase() === 'malmo') {
      getEvents(
        calendarId_TK,
        apiKey_TK,
        timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
        timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
        'SV',
        'TANGOKOMPANIET',
        events => setEvents_TK(events),
      )
    } else {
      setEvents_TK([])
    }
    
    getEventsTable(
      '/getEvents?calendarName=' + calendarName,
      events => setEvents_TAB(events),
      timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
      timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
      'SV'
    )
  }, [calendarName])

  const handleEvent = ev=>{setEvent(ev); setOpen(true)}
  const events = [...events_TK, ...events_TAB].sort((a,b)=>a.start.localeCompare(b.start))
  return (
    <div className="App">
          <OnAtMostPhablet>
            <SmallCalendarView 
                      events={events} 
                      handleEvent={handleEvent} 
            />
          </OnAtMostPhablet>
          <OnAtLeastTablet>
            <Calendar 
              class='element'
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleEvent}
              eventPropGetter={(ev, start, end, isSelected) => (
                {style:ev.style})} 
              views={['month']}
              style={{ height: '90vh' }}
            />
          </OnAtLeastTablet>  

        <DialogSlide
          open={open}
          setOpen={setOpen}
          event={event}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        />    
    </div>
  );
}

