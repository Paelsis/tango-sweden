import React, {useState, useEffect} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment-with-locales-es6'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../style.css';
import {getEvents, getEventsTable} from '../services/getEvents'
import DialogSlide from './DialogSlide'
import SmallCalendarView from './SmallCalendarView'
import { isMobile} from "react-device-detect"
import ShowTable from "../components/ShowTable"
import { Navigate, useParams } from 'react-router-dom';




const DeviceDetector = () => (
  <div>I am rendered on: {isMobile ? "Mobile" : "Desktop"}</div>
);


const calendarId_TS=process.env.REACT_APP_CALENDAR_ID_TS
const apiKey_TS=process.env.REACT_APP_CALENDAR_API_KEY_TS

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

function CalendarByCity() {
  const [events, setEvents] = useState([])
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [event, setEvent] = useState({})
  const params = useParams()
  const city = params.city

  useEffect(()=>{
    const timeMin = moment().startOf('day')
    const timeMax = moment().endOf('month').add(3,'months').add(7, 'days')

    moment.locale('sv');
    // alert(city)

    const irl = city?'/getEvents?city='+ city:'/getEvents?city=malmo'

    getEventsTable(
      irl,
      events => setEvents(events),
      timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
      timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
      'SV'
    )
  }, [])
  const handleEvent = e=>{setDescription(e.description); setLocation(e.location); setEvent(e); setOpen(true)}
  return (
    <>
    {city?
    <div className="App">
          {isMobile?
            <SmallCalendarView 
                      events={events} 
                      handleEvent={handleEvent} 
            />
          : 
            <Calendar 
              class='element'
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleEvent}
              eventPropGetter={(ev, start, end, isSelected) => (
                {style:ev.style})} 
              views={['month', 'agenda']}
              style={{ height: '90vh' }}
            />
        }  

        <DialogSlide
          open={open}
          setOpen={setOpen}
          description={description}
          location={location}
          event={event}
          city={city}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        />
    </div>
    :<Navigate to={'/malmo'} />
    }

    </>
  );
}

export default CalendarByCity;
