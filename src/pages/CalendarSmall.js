import React, {useState} from 'react';
import {AVA_STATUS, MAX_LIMIT_UNSET} from '../services/const'
import { useNavigate } from 'react-router-dom';

//import moment from 'moment';
import moment from 'moment-with-locales-es6'
import {IconButton} from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
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
    const {style, isToday, durationHours} = ev
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

    return {...style, height, fontSize, fontWeight:600, verticalAlign:'middle', border}
}

let styles = {
    table: {
        width:'100%',
        marginRight:'auto',
        marginLeft:'auto',
        borderSpacing:1,
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
    }
};

// CalendarSmall
export default props => {
    const {events, handleEvent} = props
    const [fontSize, setFontSize] = useState() 
    const navigate = useNavigate()

    moment.locale(CULTURE(language))


    const onClick = () => {
        setFontSize(fontSize==='small'?'large':'small')
    }

    const renderEvent = event => {
        const mstart = event.mstart
        const mend = event.mend
        const maxLimit = event.maxLimit?event.maxLimit:MAX_LIMIT_UNSET
        let weekday = mstart.format('dddd')
        let weekdayEnd = mend.format('dddd')
        weekday = weekday.toUpperCase().charAt(0) + weekday.slice(1,3)
        weekdayEnd = weekdayEnd.toUpperCase().charAt(0) + weekdayEnd.slice(1,3)
        
        const timeRange = event.timeRange
        const dateRange=event.dateRange
        const useRegistrationButton = event.useRegistrationButton
        const trStyle = event.style
        const tdStyleDateTime = {fontSize:18, fontWeight:600}
        const tdStyle = {}
        //const forcedSmallFonts= ['milonga', 'practica', 'pratika'].find(it  => event.title.toLowerCase().includes(it)) && event.durationHours >12
        const forceSmallFonts = event.forceSmallFonts
        const handleRegistration = e => {
            const eventIdExtended = event.eventId + event.startDate
            // alert(eventIdExtended)
            navigate('/registration', {state:{eventIdExtended, maxLimit}})
        }

        return(

            <tr 
                key={'Row' + event.productId} 
                style={styles.tr(event)}
            > 
                {event.moreThan11Hours && !forceSmallFonts?
                    <td colSpan={4} onClick={()=>handleEvent(event)}>  
                        {event.title}<br/>{dateRange}
                    </td>
                :
                    <>
                        <td style={tdStyleDateTime} onClick={()=>handleEvent(event)}>  
                            <small>{event.sameDate?'':dateRange}</small>
                        </td>
                        <td style={tdStyleDateTime} onClick={()=>handleEvent(event)}>  
                            <small>{timeRange}</small>
                        </td>
                        <td colspan={useRegistrationButton==1?1:2} onClick={()=>handleEvent(event)}>  
                            <small>{event.title}</small>
                        </td>
                    </>
                }
                {useRegistrationButton?
                    <td style={tdStyle}>  
                        {event.avaStatus=== AVA_STATUS.CC?
                            'Fully Booked'
                        :
                            <IconButton 
                                key={event.productId} 
                                className="button" 
                                style={{backgroundColor:'transparent', color:trStyle.color, borderColor:trStyle.color, padding:1, fontSize:'small'}}
                                onClick = {handleRegistration}
                            >
                                <AppRegistrationIcon />
                            </IconButton>
                        }
                    </td>
                :null}    
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

