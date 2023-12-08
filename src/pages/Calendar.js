import React, {useState, useEffect, useCallback} from 'react'
import { useParams } from 'react-router-dom';
import {
  Calendar,
  DateLocalizer,
  momentLocalizer,
  globalizeLocalizer,
  move,
  Views,
  Navigate,
  components,
} from 'react-big-calendar'

import moment from 'moment-with-locales-es6'
// import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../style.css';
import {getEventsFromGoogleCal, getEventsFromTable} from '../services/getEvents'
import DialogSlide from '../components/DialogSlide'
import CalendarSmall from './CalendarSmall'
import { isMobile} from "react-device-detect"
import ShowTable from "../components/ShowTable"
import Button from '@mui/material/Button';
import { transferAnitasCalendar } from '../services/transferAnitasCalendar'
import { layoutGenerator } from 'react-break';
import { PropaneSharp } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import {COLORS} from '../services/const'
import {replaceSwedishChars} from '../services/functions'

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

const apiKey_TK=process.env.REACT_APP_CALENDAR_API_KEY_TK
const calendarId_TK=process.env.REACT_APP_CALENDAR_ID_TK

const apiKey_TS=process.env.REACT_APP_CALENDAR_API_KEY_TS
const calendarId_STO=process.env.REACT_APP_CALENDAR_ID_STO

const localizer = momentLocalizer(moment)

var defaultMessages = {
  date: 'Datum',
  time: 'tid',
  event: 'Händelse',
  allDay: 'Heldagsevent',
  week: 'Vecka',
  work_week: 'Arbetsvecka',
  day: 'Dag',
  month: 'Månad',
  previous: 'Bakåt',
  next: 'Framåt',
  yesterday: 'I går',
  tomorrow: 'I morgon',
  today: 'Idag',
  agenda: 'Agenda',
  noEventsInRange: 'Där finns inga events i denna serie.',
  showMore: function showMore(total) {
    return "+" + total + " more";
  }
};




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
  const calendarName=params?params.calendarName?params.calendarName.toLowerCase():'skåne':'skåne'
  const [eventsGoogleCal, setEventsGoogleCal] = useState([])
  const [events_TAB, setEvents_TAB] = useState([])
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState({})
  const [agenda, setAgenda] = useState(false) 

  //const OnMobile = layout.is('mobile');
  const OnAtMostPhablet = layout.isAtMost('phablet');
  const OnAtLeastTablet = layout.isAtLeast('tablet');
  //const OnDesktop = layout.is('desktop');

  useEffect(()=>{
    const timeMin = moment().startOf('day')
    const timeMax = moment().endOf('month').add(12,'months').add(7, 'days')
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
    if (calendarName === 'malmö' || calendarName === 'skåne') {
      const staticStyleId = 'TANGOKOMPANIET'
      getEventsFromGoogleCal(
        calendarId_TK,
        apiKey_TK,
        timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
        timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
        'SV',
        staticStyleId,
        events => setEventsGoogleCal(events),
      )
    } else if (calendarName === 'stockholm' || calendarName === 'mitt') {
      const staticStyleId = 'STOCKHOLM'
      getEventsFromGoogleCal(
        calendarId_STO,
        apiKey_TS,
        timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
        timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
        'SV',
        staticStyleId,
        events => setEventsGoogleCal(events),
      )
    } else {
      setEventsGoogleCal([])
    }

    getEventsFromTable(
      '/getEvents?calendarName=' + calendarName,
      events => setEvents_TAB(events),
      timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
      timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
      'SV'
    )
  }, [calendarName])

  const dayPropGetter = useCallback(
    (date) => ({
      ...(moment(date) === 2 && {
        className: 'tuesday',
      }),
      ...(moment(date).isSame(moment(), "day") && {
        style: {
          backgroundColor: COLORS.YELLOW,
          // color: 'green',
        },
      }),
    }),
    []
  )

  const handleEvent = ev=>{setEvent(ev); setOpen(true)}
  let previousDateRange = ''

  const events = [...eventsGoogleCal, ...events_TAB].sort((a,b)=>a.start.localeCompare(b.start)).map(it => {
    if (it.dateRange === previousDateRange) {
      return {...it, sameDate:true}
    } else {
      previousDateRange = it.dateRange
      return({...it, sameDate:undefined})
    }
  })
  
  const style = (calendarName === 'stockholm' || calendarName === 'mitt')?
      {
        background:COLORS.LIGHT_YELLOW
      } 
    :
      {
        background:COLORS.LIGHT_YELLOW
      }
  return (
    <>
    {events?events.length?
      <div className="App">
            <OnAtMostPhablet>
              {agenda?
                <Calendar 
                  localizer={localizer}
                  events={events}
                  startAccessor={(event) => {return new Date(event.start)}}
                  endAccessor={(event) => {return new Date(event.end)}}
                  onSelectEvent={handleEvent}
                  dayPropGetter={dayPropGetter}
                  eventPropGetter={(ev, start, end, isSelected) => (
                    {style:{...ev.style, height:30}})} 
                  defaultView={'agenda'}
                  min={moment('12:00am', 'h:mma').toDate()}
                  showMultiDayTimes={true}  
                  showAllEvents={true}              
                  views={['agenda']}
                  messages={defaultMessages}
                  style={style}
                />
              :
                <CalendarSmall 
                        events={events} 
                        handleEvent={handleEvent} 
                />
              }  
              <Button variant='outlined' onClick={()=>setAgenda(agenda?false:true)}>{agenda?'Normal':'Agenda'}</Button>
            </OnAtMostPhablet>
            <OnAtLeastTablet>
              <div style={{height:'100vh'}}>
              <Calendar 
                localizer={localizer}
                events={events}
                startAccessor={(event) => {return new Date(event.start)}}
                endAccessor={(event) => {return new Date(event.end)}}
                onSelectEvent={handleEvent}
                dayPropGetter={dayPropGetter}
                eventPropGetter={(ev, start, end, isSelected) => (
                  {style:{...ev.style, height:30}})} 
                defaultView={'week'}
                min={moment('12:00am', 'h:mma').toDate()}
                showMultiDayTimes={true}  
                showAllEvents={true}              
                views={['day', 'week', 'month', 'agenda']}
                messages={defaultMessages}
                style={{...style, height:'100vh'}}
              />
              </div>
          </OnAtLeastTablet>  

          <DialogSlide
            open={open}
            setOpen={setOpen}
            event={event}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          />    
      </div>
    :
      <div style={{width:'100%', height:'100vh', background:'black'}}>
        <div style={{position:'absolute', width:'100%', textAlign:'center', top:'40vh', color:COLORS.YELLOW, background:'transparent'}}>
        <h3>No Events</h3>
        </div>            
      </div>              
    :  
      <div style={{width:'100%', height:'100vh', background:'black'}}>
        <div style={{position:'absolute', width:'100%', textAlign:'center', top:'40vh', color:COLORS.RED, background:'transparent'}}>
        <h3>ERROR: Events does not exist</h3>
        </div>            
      </div>              
    }              
    </>

  );
}

