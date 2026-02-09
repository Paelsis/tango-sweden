// formFields
export const FORM_FIELDS = {
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
                tooltip:'Starttime of the event (for full day events set to 00:00)',
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
                tooltip:'The description shown when clicking on event in calendar',
                required:true,
                maxlength:32768, // 2**15
            },
            {
                type:'textarea',
                label:'Description',
                name:'description',
                required:false,
                notHiddenIf:'htmlEditor',
                tooltip:'The description in html format',
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
                label:'Every',
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
                label:'Days, Weeks, Moths',
                name:'unit',
                radioValues:['days', 'weeks', 'months'],
                notHiddenIf:'repeat',
                required:true,
                tooltip: 'The unit of the field \"Every\" right above' 
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
                type:'checkbox',
                label:'Change all events in group (special case)',
                name:'changeAll',
                tooltip:'Mark if you want to change all events in the group in one go',
            },
            {
                name:'location',
                label:'Location',
                type:'text',
                tooltip: 'Location of the event'
            },
            {
                type:'text',
                label:'Title',
                name:'title',
                required:true,
                tooltip:'The event title shown in the calendar',
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
                tooltip:'The description in html format',
                maxlength:32768, // 2**15
            },
            {
                name:'facebookEventLink',
                label:'Facebook event link',
                type:'text',
                maxLength:200,
                tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
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
        ]
    },
    DJ:{ // calendarType
        ADD:[
            {
                name:'location',
                label:'Location',
                type:'text',
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
                tooltip:'The description shown when clicking on event in calendar',
                required:true,
                maxlength:32768, // 2**15
            },
            {
                type:'textarea',
                label:'Description',
                name:'description',
                required:false,
                notHiddenIf:'htmlEditor',
                tooltip:'The description in html format',
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
                type:'checkbox',
                label:'Repeat',
                name:'repeat',
                tooltip: 'Check this box if you want to repeat the event with a certain frequency'
            },
            {
                type:'number',
                label:'Every',
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
                label:'Days, Weeks, Moths',
                name:'unit',
                radioValues:['days', 'weeks', 'months'],
                notHiddenIf:'repeat',
                required:true,
                tooltip: 'The unit of the field \"Every\" right above' 
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
                type:'checkbox',
                label:'Change multiple events at one time (special case)',
                name:'changeAll',
                tooltip:'Mark only if you want to change multiple events in one go (list with more than 1 element)',
            },
            {
                name:'location',
                label:'Location',
                type:'text',
                tooltip: 'Location of the event'
            },
            {
                type:'text',
                label:'Title',
                name:'title',
                required:true,
                tooltip:'The event title shown in the calendar',
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
                tooltip:'The description in html format',
                maxlength:32768, // 2**15
            },
            {
                name:'facebookEventLink',
                label:'Facebook event link',
                type:'text',
                maxLength:200,
                tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
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
        ]
    },    
    REGULAR:{ // calendarType
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
                tooltip: 'Use html-editor to edit the text'
            },
            {
                // type:'rte',
                type:'draft',
                label:'Description',
                name:'description',
                hiddenIf:'htmlEditor',
                tooltip:'The description shown when clicking on event in calendar',
                required:true,
                maxlength:32768, // 2**15
            },
            {
                type:'textarea',
                label:'Description',
                name:'description',
                required:false,
                notHiddenIf:'htmlEditor',
                tooltip:'The description in html format',
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
                type:'checkbox',
                label:'Repeat',
                name:'repeat',
                tooltip: 'Check this box if you want to repeat the event with a certain frequency'
            },
            {
                type:'number',
                label:'Every',
                name:'offset',
                style:{width:40},
                notHiddenIf:'repeat',
                min:1, 
                max:31,
                required:true,
                tooltip: 'Example: A value of 2 in Every means \"Every 2 <unit>\" (where unit=days/months/weeks)'
            },
            {
                type:'radio',
                label:'Days, Weeks, Moths',
                name:'unit',
                radioValues:['days', 'weeks', 'months'],
                notHiddenIf:'repeat',
                required:true,
                tooltip: 'Example: Unit of field Every.'
            },
            {
                name:'lastRepeatDate',
                label:'Last repeat date',
                type:'date',
                tooltip: 'After this date the repeat is stopped',
                notHiddenIf:'repeat',
                required:true
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
                type:'checkbox',
                label:'Change multiple events at one time (special case)',
                name:'changeAll',
                tooltip:'Mark only if you want to change multiple events in one go (list with more than 1 element)',
            },
            {
                type:'text',
                label:'Title',
                name:'title',
                required:true,
                tooltip:'The event title shown in the calendar',
            },
            {
                name:'location',
                label:'Location',
                type:'text',
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
                tooltip:'The description in html format',
                maxlength:32768, // 2**15
            },
            {
                name:'facebookEventLink',
                label:'Facebook event link',
                type:'text',
                maxLength:200,
                tooltip:'The https-link to the facebook event (Ex: https://fb.me/e/1OwKAA8Lm)',
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
        ]
    },    
}