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
import CalendarSmall from '../components/CalendarSmall'
import { isMobile} from "react-device-detect"
import ShowTable from "../components/ShowTable"
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History'
// import { transferAnitasCalendar } from '../services/transferAnitasCalendar'
import { layoutGenerator } from 'react-break';
import {COLORS} from '../services/const'

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
  const calendarName=params?.calendarName?params.calendarName.toLowerCase():'skåne'
  const [events_TAB, setEvents_TAB] = useState([])
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState({})
  const [agenda, setAgenda] = useState(false) 
  const [momentStart, setMomentStart] = useState(undefined)
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());



  //const OnMobile = layout.is('mobile');
  const OnAtMostPhablet = layout.isAtMost('phablet');
  const OnAtLeastTablet = layout.isAtLeast('tablet');
  //const OnDesktop = layout.is('desktop');
  const timeMin = momentStart?momentStart:moment().startOf('day')
  const timeMinStatic = moment().startOf('day')
  const timeMax = moment().endOf('month').add(24,'months').add(7, 'days')
  moment.locale('sv');

  useEffect(()=>{
    getEventsFromTable('/getEvents?calendarName=' + calendarName 
      + '&tableName=' + tableName,
      timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
      timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
      'SV',
      events => setEvents_TAB(events)
    )
  }, [calendarName, momentStart])

  const toggleHistory = () => setMomentStart(momentStart?undefined:moment().startOf('month').add(-2,'months').add(-7, 'days'))

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

  const handleEvent = ev =>{
    setEvent(ev); 
    setOpen(true)
  }
  
  let previousDateRange = ''

  const events = [...events_TAB].sort((a,b)=>a.start.localeCompare(b.start)).map(it => {
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
                        events={events?events:[]} 
                        handleEvent={handleEvent} 
                        tableNameRegistration='tbl_registration_private_lesson'
                />
              }
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
                showMultiDayTimes={false}  
                showAllEvents={true}              
                views={['day', 'week', 'month', 'agenda']}
                view={view} // Include the view prop
                date={date} // Include the date prop
                onView={(view) => setView(view)}
                onNavigate={(date) => {
                  setDate(new Date(date));
                }}
                messages={defaultMessages}
                style={{...style, height:'100vh'}}
              />
              </div>
              <IconButton onClick={toggleHistory}>
                <HistoryIcon />
              </IconButton> 
          </OnAtLeastTablet>  

          <DialogSlide
            tableNameRegistration='tbl_registration_private_lesson'
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

              /*  
              <Button variant='outlined' onClick={()=>setAgenda(agenda?false:true)}>{agenda?'Normal':'Agenda'}</Button>
              */

