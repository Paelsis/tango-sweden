// formFields
export default {
    PRIVATE_LESSON:{ // calendarType
        ADD:[
            {
                name:'title',
                label:'Title',
                type:'text',
                required:true,
                tooltip:'The event title shown in the calendar',
        
            },
            {
                name:'location',
                label:'Location',
                type:'text',
                hiddenIf:'hideLocationAndTime', 
                tooltip: 'Location of the event'
            },
            {
                name:'startDate',
                label:'Startdate',
                type:'date',
                tooltip: 'Start date of the event',
                required:true
            },
            {
                name:'multipleDays',
                label:'Event ends on another day',
                type:'checkbox',
                tooltip: 'Check this box if the event ends on another day'
            },
            {
                name:'endDate',
                label:'Enddate',
                type:'date',
                notHiddenIf:'multipleDays',
                required:true,
                tooltip: 'End date of the event. Only required if event ends on other day than it starts',
            },
            {
                name:'startTime',
                label:'Starttime',
                tooltip:'Endtime of the event (for full day events set to 00:00)',
                type:'time',
                required:true
            },
            {
                type:'time',
                label:'Endtime',
                name:'endTime',
                tooltip:'Endtime of the event (for full day events set to 23:59)',
                required:true
            },
            {
                type:'checkbox',
                label:'HTML-editor',
                name:'htmlEditor',
                tooltip: 'If you want to write your Description in html instead of using the editor, check this box'
            },
            {
                // type:'rte',
                type:'draft',
                label:'Description',
                name:'description',
                hiddenIf:'htmlEditor',
                tooltip:'The text shown in the popup window when you click the event in the calendar',
                required:true,
                maxlength:32768, // 2**15
            },
            {
                type:'textarea',
                label:'Description',
                name:'description',
                required:false,
                notHiddenIf:'htmlEditor',
                tooltip:'The description given as html',
                maxlength:32768, // 2**15
            },
            {
                type:'checkbox',
                label:'Repeat',
                name:'repeat',
                tooltip: 'Check this box if you want to repeat the event with a certain frequency'
            },
            {
                type:'number',
                label:'Offset between events',
                name:'offset',
                style:{width:40},
                notHiddenIf:'repeat',
                min:1, 
                max:31,
                required:true,
                tooltip: 'The number of days/weeks/months between repeated events'
            },
            {
                type:'radio',
                label:'Offset unit',
                name:'unit',
                radioValues:['days', 'weeks', 'months'],
                notHiddenIf:'repeat',
                required:true,
                tooltip: 'The unit of the field \"Offset between events\" right above' 
            },
            {
                type:'number',
                label:'Repeat number of times',
                style:{width:40},
                name:'numberOfTimes',
                notHiddenIf:'repeat',
                min:2, 
                max:52,
                tooltip: 'Repeat the event this number of times (Ex: 20 means 20 repeated events with an offset given in units specified above)'
            },
            {
                type:'checkbox',
                label:'Use registration button',
                name:'useRegistrationButton',
                tooltip:'If you want a registration button and save registrations for the event',
            },    
            {
                type:'email',
                label:'E-mail of responsible organizer',
                name:'email',
                tooltip:'E-mail that will recieve the confirmation mails from the registrations',
                notHiddenIf:'useRegistrationButton',
            },    
            {
                type:'number',
                label:'Maximum number of registrants',
                style:{width:40},
                name:'maxLimit',
                min:1, 
                max:500,
                notHiddenIf:'useRegistrationButton',
                tooltip: 'Maximum number of registrants for this event. Defaults to 1 for private lessons.'
            },
        ],

        UPDATE:[
            {
                type:'text',
                label:'Title',
                name:'title',
                required:true,
                tooltip:'The event title shown in the calendar',
            },
            {
                type:'text',
                label:'Location',
                name:'location',
                hiddenIf:'hideLocationAndTime',
                tooltip: 'Location of the event'
        
            },
            {
                type:'datetime-local',
                label:'Start date and time',
                name:'startDateTime',
                required:true,
                hiddenIf:'changeAll',
                tooltip:'Start date and time of the single event'
            },
            {
                type:'datetime-local',
                label:'End date and time',
                name:'endDateTime',
                required:true,
                hiddenIf:'changeAll',
                tooltip:'End date and time for the single event'
            },
            {
                type:'time',
                label:'Start time',
                name:'startTime',
                required:true,
                notHiddenIf:'changeAll',
                tooltip:'Change start time in all events of the series created at the same occation'
        
            },
            {
                type:'time',
                label:'End time',
                name:'endTime',
                required:true,
                notHiddenIf:'changeAll',
                tooltip:'Change end time in all events of the series created at the same occation'
            },
            {
                type:'checkbox',
                label:'Use HTML-editor',
                name:'htmlEditor',
                tooltip: 'If you want to write your Description in html instead of using the editor, check this box'
            },
            {
                // type:'rte',
                type:'draft',
                label:'Description',
                name:'description',
                //draftName:'draft_description',
                required:true,
                hiddenIf:'htmlEditor',
                tooltip:'The description shown whenever you click at an event in the calendar',
        
            },
            {
                name:'description',
                label:'Description',
                type:'textarea',
                required:false,
                notHiddenIf:'htmlEditor',
                tooltip:'The description given as html',
                maxlength:32768, // 2**15
            },
            {
                name:'facebookEventLink',
                label:'Facebook event link',
                type:'text',
                maxLength:200,
                tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
                hiddenIf:'facebookEventId',
            },
            {
        
                name:'facebookEventId',
                label:'Facebook event id',
                type:'number',
                tooltip:'The facebook event id given as a long digit number (Ex: 1123264745523165)',
                maxLength:20,
                hiddenIf:'facebookEventLink',
            },
            {
                type:'checkbox',
                label:'Use registration button',
                name:'useRegistrationButton',
                tooltip:'If you want a registration button and save registrations for the event',
            },    
            {
                type:'email',
                label:'E-mail of respoinsible organizer',
                name:'email',
                tooltip:'E-mail that will recieve the confirmation mails from the registrations',
                notHiddenIf:'useRegistrationButton',
            },    
            {
                type:'number',
                label:'Maximum number of registrants',
                style:{width:40},
                name:'maxLimit',
                min:1, 
                max:500,
                notHiddenIf:'useRegistrationButton',
                tooltip: 'Maximum number of registrants for this event. Registration not possible when max is reached.'
            },
            {
                type:'checkbox',
                label:'Change all events in list',
                name:'changeAll',
                tooltip:'Change the whole list of events that you established with button SEND LIST TO CALENDAR',
            },
        ]
    },
    DJ:{ // calendarType
        ADD:[
            {
                name:'location',
                label:'Location',
                type:'text',
                hiddenIf:'hideLocationAndTime', 
                tooltip: 'Location of the event'
            },
            {
                name:'title',
                label:'Title',
                type:'text',
                required:true,
                tooltip:'The event title shown in the calendar',
        
            },
            {
                name:'startDate',
                label:'Startdate',
                type:'date',
                tooltip: 'Start date of the event',
                required:true
            },
            {
                name:'multipleDays',
                label:'Event ends on another day',
                type:'checkbox',
                tooltip: 'Check this box if the event ends on another day'
            },
            {
                name:'endDate',
                label:'Enddate',
                type:'date',
                notHiddenIf:'multipleDays',
                required:true,
                tooltip: 'End date of the event. Only required if event ends on other day than it starts',
            },
            {
                name:'startTime',
                label:'Starttime',
                tooltip:'Endtime of the event (for full day events set to 00:00)',
                type:'time',
                required:true
            },
            {
                type:'time',
                label:'Endtime',
                name:'endTime',
                tooltip:'Endtime of the event (for full day events set to 23:59)',
                required:true
            },
            {
                type:'checkbox',
                label:'HTML-editor',
                name:'htmlEditor',
                tooltip: 'If you want to write your Description in html instead of using the editor, check this box'
            },
            {
                // type:'rte',
                type:'draft',
                label:'Description',
                name:'description',
                hiddenIf:'htmlEditor',
                tooltip:'The text shown in the popup window when you click the event in the calendar',
                required:true,
                maxlength:32768, // 2**15
            },
            {
                type:'textarea',
                label:'Description',
                name:'description',
                required:false,
                notHiddenIf:'htmlEditor',
                tooltip:'The description given as html',
                maxlength:32768, // 2**15
            },
            {
                name:'facebookEventLink',
                type:'text',
                style:{width:120},
                width:20,
                label:'Facebook event link (https-address)',
                tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
                maxLength:200,
            },
            {
                name:'facebookEventId',
                type:'number',
                style:{width:120},
                width:200,
                label:'Facebook event id',
                tooltip:'The facebook event id (Ex: 1123264745523165)',
                hiddenIf:'facebookEventLink',
        
            },
            {
                type:'checkbox',
                label:'Repeat',
                name:'repeat',
                tooltip: 'Check this box if you want to repeat the event with a certain frequency'
            },
            {
                type:'number',
                label:'Offset between events',
                name:'offset',
                style:{width:40},
                notHiddenIf:'repeat',
                min:1, 
                max:31,
                required:true,
                tooltip: 'The number of days/weeks/months between repeated events'
            },
            {
                type:'radio',
                label:'Offset unit',
                name:'unit',
                radioValues:['days', 'weeks', 'months'],
                notHiddenIf:'repeat',
                required:true,
                tooltip: 'The unit of the field \"Offset between events\" right above' 
            },
            {
                type:'number',
                label:'Repeat number of times',
                style:{width:40},
                name:'numberOfTimes',
                notHiddenIf:'repeat',
                min:2, 
                max:52,
                tooltip: 'Repeat the event this number of times (Ex: 20 means 20 repeated events with an offset given in units specified above)'
            },
            {
                type:'checkbox',
                label:'Use registration button',
                name:'useRegistrationButton',
                tooltip:'If you want a registration button and save registrations for the event',
            },    
            {
                type:'email',
                label:'E-mail of respoinsible organizer',
                name:'email',
                tooltip:'E-mail that will recieve the confirmation mails from the registrations',
                notHiddenIf:'useRegistrationButton',
            },    
            {
                type:'number',
                label:'Maximum number of registrants',
                style:{width:40},
                name:'maxLimit',
                min:1, 
                max:500,
                notHiddenIf:'useRegistrationButton',
                tooltip: 'Maximum number of registrants for this event. Registration not possible when max is reached.'
            },
        ],
        UPDATE:[
            {
                type:'text',
                label:'Title',
                name:'title',
                required:true,
                tooltip:'The event title shown in the calendar',
            },
            {
                type:'text',
                label:'Location',
                name:'location',
                hiddenIf:'hideLocationAndTime',
                tooltip: 'Location of the event'
            },
            {
                type:'datetime-local',
                label:'Start date and time',
                name:'startDateTime',
                required:true,
                hiddenIf:'changeAll',
                tooltip:'Start date and time of the single event'
            },
            {
                type:'datetime-local',
                label:'End date and time',
                name:'endDateTime',
                required:true,
                hiddenIf:'changeAll',
                tooltip:'End date and time for the single event'
            },
            {
                type:'time',
                label:'Start time',
                name:'startTime',
                required:true,
                notHiddenIf:'changeAll',
                tooltip:'Change start time in all events of the series created at the same occation'
        
            },
            {
                type:'time',
                label:'End time',
                name:'endTime',
                required:true,
                notHiddenIf:'changeAll',
                tooltip:'Change end time in all events of the series created at the same occation'
            },
            {
                type:'checkbox',
                label:'Use HTML-editor',
                name:'htmlEditor',
                tooltip: 'If you want to write your Description in html instead of using the editor, check this box'
            },
            {
                // type:'rte',
                type:'draft',
                label:'Description',
                name:'description',
                //draftName:'draft_description',
                required:true,
                hiddenIf:'htmlEditor',
                tooltip:'The description shown whenever you click at an event in the calendar',
        
            },
            {
                name:'description',
                label:'Description',
                type:'textarea',
                required:false,
                notHiddenIf:'htmlEditor',
                tooltip:'The description given as html',
                maxlength:32768, // 2**15
            },
            {
                name:'facebookEventLink',
                label:'Facebook event link',
                type:'text',
                maxLength:200,
                tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
                hiddenIf:'facebookEventId',
            },
            {
        
                name:'facebookEventId',
                label:'Facebook event id',
                type:'number',
                tooltip:'The facebook event id (Ex: 1123264745523165)',
                maxLength:20,
                hiddenIf:'facebookEventLink',
            },
            {
                type:'checkbox',
                label:'Use registration button',
                name:'useRegistrationButton',
                tooltip:'If you want a registration button and save registrations for the event',
            },    
            {
                type:'email',
                label:'E-mail of respoinsible organizer',
                name:'email',
                tooltip:'E-mail that will recieve the confirmation mails from the registrations',
                notHiddenIf:'useRegistrationButton',
            },    
            {
                type:'number',
                label:'Maximum number of registrants',
                style:{width:40},
                name:'maxLimit',
                min:1, 
                max:500,
                notHiddenIf:'useRegistrationButton',
                tooltip: 'Maximum number of registrants for this event. Registration not possible when max is reached.'
            },
            {
                type:'checkbox',
                label:'Change all events in the same group',
                name:'changeAll',
                tooltip:'Change the whole list of events that you established with button SEND LIST TO CALENDAR',
            },
            {
                type:'checkbox',
                label:'Hide location and time in popup window',
                name:'hideLocationAndTime',
                tooltip: 'Check this box if you want to hide the location and time in the popup windo when clicking at event'
            },
        ]
    },    
    DEFAULT:{ // calendarType
        ADD:[
            {
                name:'title',
                label:'Title',
                type:'text',
                required:true,
                tooltip:'The event title shown in the calendar',
        
            },
            {
                name:'location',
                label:'Location',
                type:'text',
                hiddenIf:'hideLocationAndTime', 
                tooltip: 'Location of the event'
            },
            {
                name:'startDate',
                label:'Startdate',
                type:'date',
                tooltip: 'Start date of the event',
                required:true
            },
            {
                name:'multipleDays',
                label:'Event ends on another day',
                type:'checkbox',
                tooltip: 'Check this box if the event ends on another day'
            },
            {
                name:'endDate',
                label:'Enddate',
                type:'date',
                notHiddenIf:'multipleDays',
                required:true,
                tooltip: 'End date of the event. Only required if event ends on other day than it starts',
            },
            {
                name:'startTime',
                label:'Starttime',
                tooltip:'Endtime of the event (for full day events set to 00:00)',
                type:'time',
                required:true
            },
            {
                type:'time',
                label:'Endtime',
                name:'endTime',
                tooltip:'Endtime of the event (for full day events set to 23:59)',
                required:true
            },
            {
                type:'checkbox',
                label:'HTML-editor',
                name:'htmlEditor',
                tooltip: 'If you want to write your Description in html instead of using the editor, check this box'
            },
            {
                // type:'rte',
                type:'draft',
                label:'Description',
                name:'description',
                hiddenIf:'htmlEditor',
                tooltip:'The text shown in the popup window when you click the event in the calendar',
                required:true,
                maxlength:32768, // 2**15
            },
            {
                type:'textarea',
                label:'Description',
                name:'description',
                required:false,
                notHiddenIf:'htmlEditor',
                tooltip:'The description given as html',
                maxlength:32768, // 2**15
            },
            {
                name:'facebookEventLink',
                type:'text',
                style:{width:120},
                width:20,
                label:'Facebook event link (https-address)',
                tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
                maxLength:200,
            },
            {
                name:'facebookEventId',
                type:'number',
                style:{width:120},
                width:200,
                label:'Facebook event id',
                tooltip:'The facebook event id (Ex: 1123264745523165)',
                hiddenIf:'facebookEventLink',
        
            },
            {
                type:'checkbox',
                label:'Repeat',
                name:'repeat',
                tooltip: 'Check this box if you want to repeat the event with a certain frequency'
            },
            {
                type:'number',
                label:'Offset between events',
                name:'offset',
                style:{width:40},
                notHiddenIf:'repeat',
                min:1, 
                max:31,
                required:true,
                tooltip: 'The number of days/weeks/months between repeated events'
            },
            {
                type:'radio',
                label:'Offset unit',
                name:'unit',
                radioValues:['days', 'weeks', 'months'],
                notHiddenIf:'repeat',
                required:true,
                tooltip: 'The unit of the field \"Offset between events\" right above' 
            },
            {
                type:'number',
                label:'Repeat number of times',
                style:{width:40},
                name:'numberOfTimes',
                notHiddenIf:'repeat',
                min:2, 
                max:52,
                tooltip: 'Repeat the event this number of times (Ex: 20 means 20 repeated events with an offset given in units specified above)'
            },
            {
                type:'checkbox',
                label:'Use registration button',
                name:'useRegistrationButton',
                tooltip:'If you want a registration button and save registrations for the event',
            },    
            {
                type:'email',
                label:'E-mail of respoinsible organizer',
                name:'email',
                tooltip:'E-mail that will recieve the confirmation mails from the registrations',
                notHiddenIf:'useRegistrationButton',
            },    
            {
                type:'number',
                label:'Maximum number of registrants',
                style:{width:40},
                name:'maxLimit',
                min:1, 
                max:500,
                notHiddenIf:'useRegistrationButton',
                tooltip: 'Maximum number of registrants for this event. Registration not possible when max is reached.'
            },
            {
                name:'hideLocationAndTime',
                label:'Hide location and time in popup window',
                type:'checkbox',
                tooltip: 'Check this box if you want to hide the location and time in the popup window when clicking at event'
            },
        ],
        UPDATE:[
            {
                type:'text',
                label:'Title',
                name:'title',
                required:true,
                tooltip:'The event title shown in the calendar',
            },
            {
                type:'text',
                label:'Location',
                name:'location',
                hiddenIf:'hideLocationAndTime',
                tooltip: 'Location of the event'
        
            },
            {
                type:'datetime-local',
                label:'Start date and time',
                name:'startDateTime',
                required:true,
                hiddenIf:'changeAll',
                tooltip:'Start date and time of the single event'
            },
            {
                type:'datetime-local',
                label:'End date and time',
                name:'endDateTime',
                required:true,
                hiddenIf:'changeAll',
                tooltip:'End date and time for the single event'
            },
            {
                type:'time',
                label:'Start time',
                name:'startTime',
                required:true,
                notHiddenIf:'changeAll',
                tooltip:'Change start time in all events of the series created at the same occation'
        
            },
            {
                type:'time',
                label:'End time',
                name:'endTime',
                required:true,
                notHiddenIf:'changeAll',
                tooltip:'Change end time in all events of the series created at the same occation'
            },
            {
                type:'checkbox',
                label:'Use HTML-editor',
                name:'htmlEditor',
                tooltip: 'If you want to write your Description in html instead of using the editor, check this box'
            },
            {
                // type:'rte',
                type:'draft',
                label:'Description',
                name:'description',
                //draftName:'draft_description',
                required:true,
                hiddenIf:'htmlEditor',
                tooltip:'The description shown whenever you click at an event in the calendar',
                maxlength:32768, // 2**15
        
            },
            {
                type:'textarea',
                name:'description',
                label:'Description',
                required:false,
                notHiddenIf:'htmlEditor',
                tooltip:'The description given as html',
                maxlength:32768, // 2**15
            },
            {
                name:'facebookEventLink',
                label:'Facebook event link',
                type:'text',
                maxLength:200,
                tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
                hiddenIf:'facebookEventId',
            },
            {
        
                name:'facebookEventId',
                label:'Facebook event id',
                type:'number',
                tooltip:'The facebook event id (Ex: 1123264745523165)',
                maxLength:20,
                hiddenIf:'facebookEventLink',
            },
            {
                type:'checkbox',
                label:'Use registration button',
                name:'useRegistrationButton',
                tooltip:'If you want a registration button and save registrations for the event',
            },    
            {
                type:'email',
                label:'E-mail of respoinsible organizer',
                name:'email',
                tooltip:'E-mail that will recieve the confirmation mails from the registrations',
                notHiddenIf:'useRegistrationButton',
            },    
            {
                type:'number',
                label:'Maximum number of registrants',
                style:{width:40},
                name:'maxLimit',
                min:1, 
                max:500,
                notHiddenIf:'useRegistrationButton',
                tooltip: 'Maximum number of registrants for this event. Registration not possible when max is reached.'
            },
            {
                type:'checkbox',
                label:'Change all events in the same group',
                name:'changeAll',
                tooltip:'Change the whole list of events that you established with button SEND LIST TO CALENDAR',
            },
            {
                type:'checkbox',
                label:'Hide location and time in popup window',
                name:'hideLocationAndTime',
                tooltip: 'Check this box if you want to hide the location and time in the popup windo when clicking at event'
            },
        ]
    },    
}