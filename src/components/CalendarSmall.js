import React, {useState} from 'react';
import {AVA_STATUS, MAX_LIMIT_UNSET, TBL_REGISTRATION_CALENDAR} from '../services/const'
import { useNavigate } from 'react-router-dom';
import { CALENDAR } from '../services/const'
import Tooltip from '@mui/material/Tooltip';

//import moment from 'moment';
import moment from 'moment-with-locales-es6'
import {IconButton} from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
const language = 'SV'

const CULTURE = (language) => language==='SV'?'sv':language==='ES'?'es':'en'


const TEXTS = {
    button:{
        SV:'Info',
        ES:'Info',
        EN:'Info',
    },
    GO_BACK:{
        SV:'Stäng',
        ES:'Cerrer',
        EN:'Close',
    },
    REG:{
        SV:'Anmälan',
        ES:'Registrar',
        EN:'Register',
    },
    DANCE:{
        SV:'Dansa',
        ES:'Bailar',
        EN:'Dance',
    },
    CLASSES:{
        SV:'Lektioner',
        ES:'Clases',
        EN:'Classes',
    },
    ENDED:{
        SV:'Slutade',
        ES:'Terminó',
        EN:'Ended',
    },
    WHOLE_DAY:{
        SV:'hela dagen', 
        EN:'all day',
        ES:'toto el dia'
    }
}

const calcTr = ev => {
    const {style, durationHours} = ev
    const length = ev.title.trim().length
    const border = 'none'
    const height = durationHours < 4?durationHours*20
        :(4*20 + Math.min((durationHours-4)*3, 90))

    let fontSize = durationHours < 2.5?16
    :durationHours <3.0?18
    :durationHours <4.0?20
    :durationHours <11?22
    :durationHours <48?24
    :26
    
    fontSize = length > 40?fontSize-5:length > 60?fontSize-5:fontSize    

    const display = 'table-row'
    return {...style, height, fontSize, fontWeight:600, verticalAlign:'middle', border, display}
}

let styles = {
    table: {
        display:'table',
        width:'100%',
        marginRight:'auto',
        marginLeft:'auto',
        marginTop:0,
        paddingTop:0,
        borderCollapse:'collapse',
    },
    tbody: {
        cellPadding:1,
    },
    tr: ev => calcTr(ev),
    verticalCenter:{
        margin: 0,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    tdDateTime:{
        display:'table-cell',
        fontSize:18, 
        fontWeight:600
    },
    td:{
        display:'table-cell',
        fontSize:18, 
        fontWeight:600
    }

};



// CalendarSmall
export default props => {
    const {events, handleSelectEvent, calendarType, signinEmail} = props
    const [fontSize, setFontSize] = useState() 
    const navigate = useNavigate()

    moment.locale(CULTURE(language))

    const renderEvent = event => {
        const mstart = event.mstart
        const mend = event.mend
        const ava = event.ava
        const maxLimit = event.maxLimit?event.maxLimit:MAX_LIMIT_UNSET // Max number of registrations
        let weekday = mstart.format('dddd')
        let weekdayEnd = mend.format('dddd')
        weekday = weekday.toUpperCase().charAt(0) + weekday.slice(1,3)
        weekdayEnd = weekdayEnd.toUpperCase().charAt(0) + weekdayEnd.slice(1,3)
        const timeRange = event.timeRange
        const dateRange=event.dateRange
        const organizerEmail = event.email
        const title=event.title
        const dateRangeTime=event.dateRangeTime
        const useRegistrationButton = event.useRegistrationButton
        const trStyle = event.style
        //const forcedSmallFonts= ['milonga', 'practica', 'pratika'].find(it  => event.title.toLowerCase().includes(it)) && event.durationHours >12
        const forceSmallFonts = event.forceSmallFonts
        const authorized = signinEmail === organizerEmail

        const goToRegistration = () => {
            const eventIdExtended = event.eventId + event.startDate
            // alert('[CalendarSmall] eventIdExtended = ' + eventIdExtended)
            navigate('/registration', {state:{calendarType, eventIdExtended, maxLimit, ava, title, organizerEmail, dateRangeTime}})
        }

        const listRegistration = () => {
            const eventIdExtended = event.eventId + event.startDate
            const tblRegistration = CALENDAR[calendarType?calendarType:'DEFAULT'].TBL_REGISTRATION
            navigate('/listRegistration', {state:{eventIdExtended, tblRegistration}})
        }    

        const handleClickButton = () => {
            if (calendarType === CALENDAR.DEFAULT || !calendarType) {
              goToRegistration(event); 
            } else if (authorized) {
              listRegistration(event)
            } else {  
              goToRegistration(event)
            }
        }

        return(

            <tr 
                key={'Row' + event.productId} 
                style={styles.tr(event)}
            > 
                {event.moreThan11Hours && !forceSmallFonts?
                    <td colSpan={useRegistrationButton?4:4} onClick={()=>handleSelectEvent(event)}>  
                        {event.title}<br/>{dateRange}
                    </td>
                :
                    <>
                        <td style={styles.tdDateTime} onClick={()=>handleSelectEvent(event)}>  
                            <small>{dateRange}</small>
                        </td>
                        <td style={styles.tdDateTime} onClick={()=>handleSelectEvent(event)}>  
                            <small>{timeRange}</small>
                        </td>
                        <td style={styles.td} colSpan={useRegistrationButton==1?2:2} onClick={()=>handleSelectEvent(event)}>  
                            <small>{event.title}</small>
                        </td>
                    </>
                }
                {useRegistrationButton==1?
                    <td style={styles.td}>  
                        {event.cnt < event.maxLimit?
                                <IconButton 
                                    key={event.productId} 
                                    className="button" 
                                    style={{backgroundColor:'transparent', color:trStyle.color, borderColor:trStyle.color, padding:1, fontSize:'small'}}
                                    varant='outlined'
                                    handleClick = {handleClickButton}
                                >
                                    <AppRegistrationIcon />
                                </IconButton>
                            :           
                                <Tooltip title='Fully booked'>
                                    <IconButton 
                                        variant="outlined"
                                        style={{backgroundColor:'transparent', color:trStyle.color, borderColor:trStyle.color, padding:1, fontSize:'small'}}
                                        handleClick = {handleClickButton}
                                        >
                                        <PersonAddDisabledIcon />
                                    </IconButton>
                                </Tooltip>                  
                        }
                    </td>
                :<td style={styles.td} />}    
            </tr>
        )
    }    

    const renderAllEvents = events => {
        return(
            events.map(ev =>renderEvent(ev))
        )    
    }

    return (
        <table style={styles.table}>
            <tbody style={styles.tbody}>
                {renderAllEvents(events)}
            </tbody>
        </table>
    )
} 

