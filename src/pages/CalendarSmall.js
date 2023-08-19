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
    tr: (durationHours, isToday, forceSmallFonts) => ({
        //border:'1px solid',
        verticalAlign:'center',
        height:forceSmallFonts?20:durationHours > 48?50:durationHours>11?40:isToday?35:25,
        fontSize:forceSmallFonts?14:durationHours > 48?24:durationHours>11?20:isToday?'large':'normal',
        fontWeight:forceSmallFonts?500:durationHours > 48?800:durationHours > 11?700:isToday?600:500,
    }),
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
                style={styles.tr(event.durationHours, event.isToday, forceSmallFonts)}
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
