import casaBlanca from '../images/VitaHuset.jpg';

export const MAX_LENGTH_DESC = 40000
export const DEFAULT_AUTH_LEVEL = 1
export const MAX_LIMIT_UNSET = 1000

export const AVA_STATUS = {
    AV:'AV', // Avaiable space
    CC:'CC', // Completely closed
    CL:'CL', // Closed for leaders
    OL:'OL', // Overflow leaders (more than +3 leaders)
    CF:'CF', // Closed for followers
    OF:'OF', // Overflow followers (more than +3 followers)
}

export const AVA_STATUS_TEXT = {
    AV:{
      SV:'Platser kvar för både förare och följare.',
      EN:'Space available for both leaders and followers',
      ES:'Space available for both leaders and followers',
    }, 
    CC:{
      SV:'Dansen är fullbokad. Kontakta Tangkompaniet för eventuella återbud.',
      EN:'No space available. Contact Tangokompaniet and check for cancellations',
      ES:'No space available. Contact Tangokompaniet and check for cancellations',
    }, 
    CL:{
      SV:'Fullbokat för förare, bara platser kvar till följare',
      EN:'Fully booked for leaders, only space availabile for followers',
      ES:'Fully booked for leaders, only space availabile for followers',
    }, 
    OL:{
      SV:'Tillfälligt överskott på förare (+3), vänta och se om fler följare bokar sig',
      EN:'Temporary overflow of leaders (3), wait and see if more followers books',
      ES:'Temporary overflow of leaders (3), wait and see if more followers books',
    }, 
    CF:{
      SV:'Fullbokat för följare, bara platser kvar till förare',
      EN:'Fully booked for followers, only space availabile for leaders',
      ES:'Fully booked for followers, only space availabile for leaders',
    },
    OF:{
      SV:'Tillfälligt överskott på följare (+3), vänta och se om fler förare bokar sig',
      EN:'Temporary overflow of followers (3), wait and see if more förare bookar sig',
      ES:'Temporary overflow of followers (3), wait and see if more förare bookar sig',
    },
}     

export const COLORS = {
  WHITE:'#FFFFF0',
  YELLOW:'#FFFFa7',
  LIGHT_YELLOW:'#FFFFDA',
  BLACK:'#0C090A',
  RED:'#FF4D4D',
  BLUE:'blue',
  LIGHTBLUE:'lightBlue',
  ICEBLUE:'#baf2ef',
  REGION:{
    TEXT:'#ffffa7',
    BORDER:'#dcf3ff',
  },
  CITY:{
    TEXT:'yellow',
    BORDER:'#FFFFDA',
  },
  HELSINGBORG:{
    TEXT:'#d50000',
    BORDER:'#d50000',
  },
  HALMSTAD:{
    TEXT:'#d40000', // röd
    BORDER:'2596be', //blå
  },
  DENMARK:{
    TEXT:'white', // vit
    BORDER:'#FF4D4D', // röd  
  },
  GOTHENBURG:{
    TEXT:'#F8CB0A', // gul 
    BORDER:'1251a0', // blå
  },
  STOCKHOLM:{
    TEXT:'#ffcd50', // gul
    BORDER:'#003d8f', // blå  
    BACKGROUND:'#FF2222', 
  },
  MALMO:{
    TEXT:'#bd9009', // gul
    BORDER:'#ee1d23', // röd  
  },
  SUNDSVALL:{
    TEXT:'#eeeeee', // grå
    BORDER:'#003d84', // blå  
  },
}

export const backgroundImages = {
  casaBlanca:`url(${casaBlanca})`
}  


export const REGIONS = 
[
  'Mitt',
  'Skåne',
  'Halland',
  'Sydost',
  'Västra Götaland',
  'Norr',
  'Danmark',
  'Norge',
  'Finland',
] 

export const COUNTRIES = 
[
  'Sverige',
  'Danmark',
  'Norge',
  'Finland',
] 


export const BUTTON_STYLE = {
  DEFAULT:{color:'black', borderColor:'black'},
  CLICKED:{color:'grey', borderColor:'grey'},
  SAVED:{color:'green', borderColor:'green'},
  ERROR:{color:'red', borderColor:'red'},
}

export const STATUSLINE_STYLE = {
  DEFAULT:{backgroundColor:'transparent', color:'green'},
  PROCESSING:{backgroundColor:'lightGreen', color:'lightYellow'},
  OK:{backgroundColor:'green', color:'white'},
  WARNING:{backgroundColor:'yellow', color:'black'},
  ERROR:{backgroundColor:'red', borderColor:'lightYellow'},
}

export const SHOE_RADIO_VALUES = 
[
  {label:'Keep healthy feet', value:'healty'},
  {label:'Worst misstakes when bying shoes', value:'worst'}
]

export const PRODUCT_LEVEL = {
  CALENDAR:1,
  PRIVATE_CLASSES:2,
  COURSE:4,
  FESTIVAL:8
}

export const ADMINISTRATORS=['tangosmedjan@gmail.com', 'anita.e.dobi@gmail.com', 'admin@tangosweden.se'];


export const CALENDAR={
  PRIVATE_LESSON:{ // calendarType
    TBL_CALENDAR:'tbl_calendar_private_lesson',
    TBL_REGISTRATION:'tbl_registration_private_lesson',
    EVENT_DEFAULT:{
      maxLimit:1, // Max number of allowed registrations
    }
  }, 
  DJ:{ // calendarType
    TBL_CALENDAR:'tbl_calendar_dj',
    TBL_REGISTRATION:'tbl_registration_dj',
    EVENT_DEFAULT:{
      maxLimit:1, // Max number of allowed registrations
    }
  }, 
  DEFAULT:{ // calendarType
    TBL_CALENDAR:'tbl_calendar',
    TBL_REGISTRATION:'tbl_registration_calendar',
  },
}  

export const isProduction = process.env.REACT_APP_ENVIRONMENT==='production'
export const isDevelopment = process.env.REACT_APP_ENVIRONMENT==='development'
export const isPL = process.env.REACT_APP_ENVIRONMENT==='pl'
