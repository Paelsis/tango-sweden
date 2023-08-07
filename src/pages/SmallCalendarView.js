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
        color: 'white',
        border:'2px solid',
        borderColor:'transparent',
        backgroundColor:'transparent',
    },
    tbody: {
        cellpadding:30,
    },
    tr: (durationHours, isToday) => ({
        height:durationHours > 48?40:durationHours>11?30:isToday?30:20,
        verticalAlign:'center',
        fontSize:durationHours > 48?24:durationHours>24?20:durationHours>11?20:isToday?'large':'normal',
        fontWeight:durationHours > 48?700:durationHours > 11?600:isToday?500:400,
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
        const endsOtherDay=(mstart.calendar('l') !== mend.calendar('l')) && (mend.diff(mstart, 'hours') > 11)
        
        return(

            <tr 
                key={'Row' + event.productId} 
                style={styles.tr(event.durationHours, event.isToday)}
                onClick={()=>handleEvent(event)}
            > 
                {endsOtherDay?
                    <td colSpan={3} style={event.style}>  
                        {event.title}<br/>{dateTimeRange}
                    </td>
                :
                    <>
                        <td style={event.style} >  
                            <small>{dateRange}</small>
                        </td>
                        <td style={event.style}>  
                            <small>{timeRange}</small>
                        </td>
                        <td colspan={useRegistrationButton==1?1:2} style={event.style}>  
                            <small>{event.title}</small>
                        </td>
                    </>
                }
                {useRegistrationButton?
                    <td style={event.style} onClick={e=>this.handleRegistration(e, event)}>  
                        {event.avaStatus=== AVA_STATUS.CC?
                            'Fully Booked'
                        :
                            <Button 
                                variant='outlined'
                                key={event.productId} 
                                className="button" 
                                style={{backgroundColor:'transparent', color:event.style.color, borderColor:event.style.color, padding:1, fontSize:'small'}}
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
