import React, {Component} from 'react';
import {AVA_STATUS} from '../services/const.js'

//import moment from 'moment';
import moment from 'moment-with-locales-es6'
import Button from '@mui/material/Button';

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

const calcTr = (forceSmallFonts, isToday, durationHours) => {
    const opacity = isToday?1.0:1.0
    const border = 'none'


    if (forceSmallFonts || durationHours < 2.5) {
        return {height:30, fontSize:14, fontWeight:600, verticalAlign:'middle', border}
    } else if (durationHours < 3.0) {
        return {height:40, fontSize:16, fontWeight:700, verticalAlign:'middle', border}
    } else if (durationHours < 4.0) {
        return {height:50, fontSize:18, fontWeight:700, verticalAlign:'middle', border}
    } else if (durationHours < 11) {
        return {height:60, fontSize:20, fontWeight:700, verticalAlign:'middle', border}
    } else if (durationHours < 48) {
        return {height:80, fontSize:22, fontWeight:700, verticalAlign:'middle', border}
    } else {
        return {height:100, fontSize:24, fontWeight:800, verticalAlign:'middle', border}
    } 
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
    tr: (forceSmallFonts, isToday, durationHours) => calcTr(forceSmallFonts, isToday, durationHours),
    verticalCenter:{
        margin: 0,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    }
};

/**
 * This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.
 */
class SmallCalendarView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fontSize:'small',
            events:[],
            open:false,
            title:'',
            location:'',
            desc:'',
            name:undefined,
        };
        this.onClick = this.onClick.bind(this);
        this.renderEvent = this.renderEvent.bind(this);
        this.renderAllEvents = this.renderAllEvents.bind(this);
    }
 


    // invoked immediately after a component is mounted
    componentDidMount () {
        moment.locale(CULTURE(language));
    }


    onClick() {
        this.setState({fontSize: this.state.fontSize==='small'?'large':'small'})
    }

    renderEvent = event => {
        const {handleEvent} = this.props;
        const mstart = event.mstart
        const mend = event.mend
        let weekday = mstart.format('dddd')
        let weekdayEnd = mend.format('dddd')
        weekday = weekday.toUpperCase().charAt(0) + weekday.slice(1,3)
        weekdayEnd = weekdayEnd.toUpperCase().charAt(0) + weekdayEnd.slice(1,3)
        const dateRange=event.dateRange
        const timeRange = moment() <= mend?event.timeRange:(TEXTS.ENDED[language] + ' ' + mend.format('LT'))
        const dateTimeRange = mstart.format('ddd D MMM H:mm') + ' - ' +  mend.format('ddd D MMM H:mm')
        const opacity = moment() <= mend?1.0:0.3
        const useRegistrationButton = event.useRegistrationButton
        const endsOtherDay=(mstart.calendar('l') !== mend.calendar('l')) && (mend.diff(mstart, 'hours') > 11) && !event.fullDay
        const tdStyle = event.style
        //const forcedSmallFonts= ['milonga', 'practica', 'pratika'].find(it  => event.title.toLowerCase().includes(it)) && event.durationHours >12
        const forceSmallFonts = event.forceSmallFonts
        return(

            <tr 
                key={'Row' + event.productId} 
                style={styles.tr(forceSmallFonts, event.isToday, event.durationHours)}
                onClick={()=>handleEvent(event)}
            > 
                {endsOtherDay && !forceSmallFonts?
                    <td colSpan={3} style={tdStyle}>  
                        {event.title}<br/>{dateTimeRange}
                    </td>
                :
                    <>
                        <td style={tdStyle} >  
                            <small>{dateRange}</small>
                        </td>
                        <td style={tdStyle}>  
                            <small>{timeRange}</small>
                        </td>
                        <td colspan={useRegistrationButton==1?1:2} style={tdStyle}>  
                            <small>{event.title}</small>
                        </td>
                    </>
                }
                {useRegistrationButton?
                    <td style={tdStyle} onClick={e=>this.handleRegistration(e, event)}>  
                        {event.avaStatus=== AVA_STATUS.CC?
                            'Fully Booked'
                        :
                            <Button 
                                variant='outlined'
                                key={event.productId} 
                                className="button" 
                                style={{backgroundColor:'transparent', color:tdStyle.color, borderColor:tdStyle.color, padding:1, fontSize:'small'}}
                            >
                                Registration
                            </Button>
                        }
                    </td>
                :null}    
            </tr>
        )
    }    

    renderAllEvents = (events) => (events.map(event =>this.renderEvent(event)))

    render() {
        const {language, events} = this.props
        return (
            <table style={styles.table}>
                <tbody style={styles.tbody}>
                    {this.renderAllEvents(events)}
                </tbody>
            </table>
        )
    }
} 

export default SmallCalendarView
