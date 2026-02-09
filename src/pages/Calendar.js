import React, {useState, useEffect, useContext, useCallback} from 'react'
import {AuthContext} from "../login/FirebaseAuth"
import { useSharedState } from '../store';
import { useParams, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
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
import {getEventsFromGoogleCalendar, getEventsFromTable} from '../services/getEvents'
import DialogueSlide from '../components/DialogueSlide'
import CalendarSmall from '../components/CalendarSmall'
import { isMobile} from "react-device-detect"
import ShowTable from "../components/ShowTable"
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'
import HistoryIcon from '@mui/icons-material/History'
// import { transferAnitasCalendar } from '../services/transferAnitasCalendar'
import { layoutGenerator } from 'react-break';
import {COLORS, CALENDAR, CALENDAR_TYPE} from '../services/const'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../style.css';
import { Toolbar } from '@mui/material';


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

export default () => {
  const params = useParams()
  const calendarType = params?.calendarType?params.calendarType:CALENDAR_TYPE.REGULAR
  const {calendarName, calendarEmail} = params
  const [sharedState, setSharedState] = useSharedState()
  const forceReloadCount = sharedState.forceReloadCount?sharedState.forceReloadCount:0
  const [eventsGoogleCal, setEventsGoogleCal] = useState([])
  const [eventsTable, setEventsTable] = useState([])
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState({})
  const [agenda, setAgenda] = useState(false) 
  const [momentStart, setMomentStart] = useState(undefined)
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const tblCalendar = CALENDAR[calendarType].TBL_CALENDAR
  const tblRegistration = CALENDAR[calendarType].TBL_REGISTRATION
  const navigate = useNavigate()


  //const OnMobile = layout.is('mobile');
  const OnAtMostPhablet = layout.isAtMost('phablet');
  const OnAtLeastTablet = layout.isAtLeast('tablet');
  const timeMin = momentStart?momentStart:moment().startOf('day')
  const timeMax = moment().endOf('month').add(24,'months').add(7, 'days')
  moment.locale('sv');
  const region = sharedState.region.toLowerCase()
  const city = sharedState.city.toLowerCase()
  const regionOrCityMatch = [region, city].includes(calendarName.toLowerCase())
  const {user} = useContext(AuthContext)  
  const signinEmail = (user?.email?user.email:undefined)
  const authLevel = sharedState.authLevel
  const showPlusButton = signinEmail ? ((authLevel === 16) || regionOrCityMatch):false
  const calendarDate = sharedState.calendarDate

  useEffect(()=>{
    if (calendarType===CALENDAR_TYPE.REGULAR || !calendarType) { 
      getEventsFromGoogleCalendar(calendarName, timeMin, timeMax, setEventsGoogleCal) 
    }   
    
    const url = '/getEvents?calendarName=' 
      + (calendarName?calendarName:'skåne') 
      + (tblCalendar?'&tblCalendar=' + tblCalendar:'')
      + (tblRegistration?'&tblRegistration=' + tblRegistration:'')
      + (calendarEmail?'&email=' + calendarEmail:'')
  
    getEventsFromTable(url,
      timeMin.format('YYYY-MM-DD') + 'T00:00:00Z', 
      timeMax.format('YYYY-MM-DD') + 'T23:59:00Z',
      'SV',
      events => {
        setEventsTable(events)
      }  
    )
  }, [calendarName, momentStart, forceReloadCount])

  const toggleHistory = () => setMomentStart(momentStart?undefined:moment().startOf('month').add(-2,'months').add(-7, 'days'))

  const handleAdd = () =>{
    navigate('/add/' + (calendarType?calendarType:CALENDAR_TYPE.REGULAR))
  }  

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

  const listRegistration = ev => {
    // alert('[DialogueSlide] eventIdExtended = ' + eventIdExtended)
    const {eventIdExtended} = ev

    // alert(JSON.stringify(ev))
    navigate('/listRegistration', {state:{eventIdExtended, tblRegistration}})
  }


  const goToRegistration = ev => {
    // alert('[DialogueSlide] eventIdExtended = ' + eventIdExtended)
    const {eventIdExtended, maxLimit, ava, title, email, dateRangeTime} = ev
    // alert(JSON.stringify(ev))
    navigate('/registration', {state:{calendarType, eventIdExtended, maxLimit, ava, title, organizerEmail:email, dateRangeTime}})
  }



  const handleSelectEvent = ev =>{
    const isDefaultCalendar = (calendarType === CALENDAR_TYPE.REGULAR) || !calendarType
    const isAllowed = signinEmail?(authLevel === 16|| (signinEmail == ev.email)):false
    /*
    const isAlert = signinEmail?(authLevel < 16 && (signinEmail !== ev.email)):false
    if (isAlert) {
      alert('This event is owned by ' +  ev.email + ' and you signed in as ' + signinEmail + '\nYou will therfore not be able to modify the event !')
    } 
    */   
    if (isDefaultCalendar) {
        setEvent(ev); 
        setOpen(true)
    } else {
        // If the event belongs to the logged in email
        if (isAllowed) {
          setEvent(ev); 
          setOpen(true)
        } else {  
          if (!signinEmail) {
            goToRegistration(ev)
          }
        }
    }  
  }
  
  let previousDateRange = ''

  const events = [...eventsGoogleCal, ...eventsTable].sort((a,b)=>a.start.localeCompare(b.start)).map(it => {
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

  const handleNavigate =  date=> setSharedState({...sharedState, calendarDate:date})
  
  // Render the calendar div
  const renderCalendarDiv = () => 
    <div className='column is-narrow m-0 p-0' style={{height:'90vh'}}>
      {events?events.length?
        <>
          <OnAtMostPhablet>
            {agenda?
              <Calendar 
                onNavigate={handleNavigate}
                localizer={localizer}
                events={events}
                startAccessor={event => {return new Date(event.start)}}
                endAccessor={event => {return new Date(event.end)}}
                onSelectEvent={handleSelectEvent}
                dayPropGetter={dayPropGetter}
                eventPropGetter={(ev, start, end, isSelected) => (
                  {style:{...ev.style, height:30}})} 
                defaultView={'agenda'}
                min={moment('08:00', 'hh:mm').toDate()}
                showMultiDayTimes={true}  
                showAllEvents={true}              
                views={['agenda']}
                messages={defaultMessages}
                style={style}
              />
            :
              <CalendarSmall 
                      calendarType={calendarType}
                      events={events?events:[]} 
                      signinEmail={signinEmail}
                      handleSelectEvent={handleSelectEvent} 
              />
            }
          </OnAtMostPhablet>
          <OnAtLeastTablet>
            <Calendar 
              date={moment(calendarDate)}
              localizer={localizer}
              events={events}
              startAccessor={(event) => {return new Date(event.start)}}
              endAccessor={(event) => {return new Date(event.end)}}
              onSelectEvent={handleSelectEvent}
              dayPropGetter={dayPropGetter}
              eventPropGetter={(ev, start, end, isSelected) => (
                {style:{...ev.style, height:35}})} 
              defaultView={'week'}
              min={moment('08:00', 'hh:mm').toDate()}
              showMultiDayTimes={true}  
              showAllEvents={true}              
              views={['week', 'month']}
              view={view} // Include the view prop
              onView={(view) => setView(view)}
              onNavigate={handleNavigate}
              messages={defaultMessages}
              style={{...style, height:'100%'}}
            />
        </OnAtLeastTablet>  

        <DialogueSlide
          open={open}
          setOpen={setOpen}
          event={event}
          calendarType={calendarType}
          signinEmail={signinEmail}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        />    
      </>
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
  </div>

  return (
    <div style={{background:COLORS.LIGHT_YELLOW, marginTop:0, paddingTop:0, paddingBottom:200}} className="columns">
        <div className='column pt-0' >
          {renderCalendarDiv()}
        </div>   
        {showPlusButton?
          <div className='column is-1'>
              <p/>
              <Tooltip title = "Move back to earlier events">
                  <IconButton onClick={toggleHistory}>
                    <HistoryIcon />
                  </IconButton> 
              </Tooltip>
              <br/>
              <Tooltip title = "Add new event to calendar">
                <IconButton onClick={handleAdd}>
                  <AddIcon />
                </IconButton> 
              </Tooltip>
          </div>
        :null}  
    </div>
  );
}

              /*  
              <Button variant='outlined' onClick={()=>setAgenda(agenda?false:true)}>{agenda?'Normal':'Agenda'}</Button>
              */

