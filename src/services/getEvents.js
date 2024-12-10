import request from 'superagent'
import moment from 'moment-with-locales-es6'
import findStaticStyle from './findStaticStyle'
import {serverFetchData} from './serverFetch'
import {replaceChar} from '../services/functions'
import casaBlanca from '../images/VitaHuset.jpg';
import {replaceRow} from "../services/serverPost"
import { TbMessage } from 'react-icons/tb'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
const LANGUAGE_SV='SV'

const CULTURE = (language) => language===LANGUAGE_SV?'sv':'en'

const TEXTS = {
  ENDED:{
      SV:'Slutade',
      EM:'Ended',
  },
  WHOLE_DAY:{
      SV:'hela dagen', 
      EN:'all day',
  },
  NO_LOCATION:{
    SV:'ingen plats angiven', 
    EN:'location missing',
  },
  NO_CITY:{
    SV:'ingen plats angiven', 
    EN:'location missing',
  }
}


const findParameter = (s, val) => {
  const idx = s.indexOf(val)  
  /* console.log('findParameter', val, 'idx',  idx) */
  if (idx !== -1) {
    const value = s.slice(idx).match(/(\d+)/)[0]
    return value
  } else {
    return undefined
  }  
}  

function _createEvent(props)  {
  const {start, end, language, description, location, email, staticStyleId, color, backgroundColorLight, backgroundColorDark, backgroundImage, borderStyle, borderWidth, borderColor} = props
  const mnow = moment()
  const mstart=moment(start)
  const mend=moment(end).add((end.length <= 10?-1:0), 'minutes')

  const dateShift =  moment(end).dayOfYear() - moment(start).dayOfYear() 
  const yearShift = mstart.format('YY') !== mnow.format('YY') 
  const timeStart = (start.length <= 10)?'00:00':mstart.format('LT')
  const timeEnd = (end.length <=10)?'23:59':mend.format('LT')
  const fullDay = (start.length <= 10) || (timeStart==="00:00" && (timeEnd === "00:00" || timeEnd === '23:59'))
  const moreThan11Hours=(mstart.calendar('l') !== mend.calendar('l')) && (mend.diff(mstart, 'hours') > 11) 
  const durationHours = moment.duration(mend.diff(mstart)).asHours()
  const startDate=mstart.format('L')
  const hasEventEnded = (mnow >= mend)
  const timeRange = hasEventEnded?(TEXTS.ENDED[language] + ' ' + mend.format('LT'))
    :fullDay?TEXTS.WHOLE_DAY[language]
    :(mstart.format('LT') + '-' + mend.format('LT'))
 
  const formatDateRange = moreThan11Hours?(yearShift?'ddd ll':'ddd D MMM'):(yearShift?'ddd D/M/YY':'ddd D/M')
  // const formatDateRangeTime = yearShift?'ddd D/M/YY LT':'ddd D/M LT'
  const dateRange=(mstart.format(formatDateRange) 
    + ((dateShift && durationHours > 11)?(' - ' +  mend.format(formatDateRange)):''))  
  const dateRangeTime=mstart.format('llll') + ' - ' 
    + ((dateShift && durationHours > 11)?mend.format('llll'):timeEnd)  
 
  
  const maxPar = description?Number(findParameter(description, 'MAX_PAR')):99999
  const maxInd = description?Number(findParameter(description, 'MAX_IND')):99999
  const ongoing = (mnow >= mstart) && (mnow < mend)
  const staticStyle = staticStyleId?findStaticStyle(staticStyleId):undefined
  const isToday = mnow.isSame(mstart, 'day')?true:false
  const background = "linear-gradient(to bottom right, " + backgroundColorLight + ", " + backgroundColorDark + ")"
  const border = ongoing?'2px dotted':'0px'
  const opacity = hasEventEnded?0.4:1.0
  const style = staticStyle?{...staticStyle, border, opacity}
  :backgroundImage?
      {
        color,
        backgroundImage:`url(${apiBaseUrl + backgroundImage})`, // Note images is stored in SLIM4 public dir
        backgroundPosition: 'center center',   
        backgroundRepeat:'auto', 
        backgroundSize:'cover', 
        backgroundColor:backgroundColorLight, 
        opacity,
        border
      }
  :  
      {color, background, borderStyle:border?undefined:borderStyle, borderWidth:border?undefined:borderWidth, borderColor, border, opacity}

  
    const reply = {
        ...props,
        email,    
        mstart,
        mend,
        maxInd,
        maxPar,
        startDate,
        timeRange,
        dateRange,
        dateRangeTime,
        durationHours, 
        isToday,
        moreThan11Hours,
        ongoing, 
        calendar:mstart.calendar(),
        location:location?location:'No location',
        // weekNumber: mstart.isoWeek(),
        style,
        /* Registration props */
        maxRegistrants : Number(maxInd?maxInd:maxPar?(maxPar*2):500),
    }


    return reply
}


function _forceSmallFonts(event) {
  if ( (typeof _forceSmallFonts.mstartPreviousBigEvent == 'undefined')|| (event === undefined)) {
    // It has not... perform the initialization
    _forceSmallFonts.mstartPreviousBigEvent = moment('2000-01-01T00:00')
    return event
  } else if (event.durationHours > 24) {
      const daysBetweenEvents = moment.duration(event.mstart.diff(_forceSmallFonts.mstartPreviousBigEvent)).asDays()
      _forceSmallFonts.mstartPreviousBigEvent = event.mstart
      if (daysBetweenEvents < 6) {
        // alert(JSON.stringify({...event, forceSmallFonts:true}))
        return {...event, forceSmallFonts:true};
      } else {
        return event
      }
  } else {  
      return event
  }  
}  

// export means that this function will be available to any module that imports this module
export function getEventsFromGoogleCal (calendarId, apiKey, timeMin, timeMax, language, staticStyleId, handleReply) {
  const handleReplyReplaceRow = reply => {
    const data = reply
    if (data.status !== 'OK') {
      alert('ERROR: in replaceRow in tblCalendar, status =' + data.status + ' message = ' + data.message)
    }
  }

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=${true}&orderBy=startTime`
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        // create array to push events into
        const events = []
        let event={}
        let moreThan24Hours = undefined
        let mstartLastBig =moment('2000-01-01')
        let insertArr = []
        // in practice, this block should be wrapped in a try/catch block, 
        // because as with any external API, we can't be sure if the data will be what we expect
        moment.locale(CULTURE(language))
        _forceSmallFonts(undefined)

        JSON.parse(resp.text).items.forEach(it => {
          const start = it.start.dateTime?it.start.dateTime:it.start.date
          const end = it.end.dateTime?it.end.dateTime:it.end.date
          const title = it.summary?it.summary:'No Title'
          const description = it.description?it.description:''
          const location = it.location
          const eventId = it.id
          
          event = _createEvent({start, end, staticStyleId, title, description, location, eventId, email:'daniel@tangokompaniet.com', hideLocationAndTime:false, useRegistrationButton:false, language})

          event = _forceSmallFonts(event)

          // Insert into database, but no dupicates
         

          // CONVERSION: The insertArr is used to insert into table 
          /*
          if (calendarId ===process.env.REACT_APP_CALENDAR_ID_STO) {
            const email = 'regnolig@gmail.com'
            const city = 'Stockholm'
            const region = 'Mitt'
            const record = {startDateTime:start.substring(0,19), endDateTime:end.substring(0,19), title, description, location, region, city, eventId, email}
            insertArr.push(record)
          }
          */  
          
          if (calendarId !== process.env.REACT_APP_CALENDAR_ID_STO) {
            events.push(event)
          }  

          let previousEnd = end
        })

        /* CONVERSION
        if (calendarId ===process.env.REACT_APP_CALENDAR_ID_STO) {
          insertArr.forEach(it =>
            replaceRow('tbl_calendar', it, handleReplyReplaceRow)
          )
        }
        */  

        handleReply(events)
      } 
    })
}

// getEventsFromTable
export function getEventsFromTable (irl, timeMin, timeMax, language, handleReply) {
  moment.locale(CULTURE(language))
  let event = {}
  const events = []
  // Pick where end date of event lies in interval [date of timeMin, date of timeMax].
  const filterFunc = it => it.end.substring(0,10).localeCompare(timeMin.substring(0,10)) >= 0 && it.end.localeCompare(timeMax) < 0
  serverFetchData(irl,  data => {
    if (data.status === 'OK') {
      const list = data.result?data.result:[]
      list.filter(filterFunc).forEach(it => {
        const location = it.location?it.location:''
        const start = replaceChar(it.start, 'T', 10); // Fill in T between date and time in start (to get sorting work with Google Cal start)
        const end = replaceChar(it.end, 'T', 10); // Fill in T between date and time in start (to get sorting work with Google Cal start)
        const staticStyleId = it.city?.toUpperCase() === 'STOCKHOLM'?'STOCKHOLM':undefined;
        // alert(timeMin + ' ' + timeMax + ' ' + start + ' ' + end)
        //alert(JSON.stringify(it))
        event = _createEvent({...it, location, start, end, staticStyleId, language})
        events.push(event)
      })
    } else {
      const message = '[getEventsFromTable]:serverFetchDate did not retunr status OK'
      alert(message)
      console.log(message)
    } 
    handleReply(events)
  })
}

