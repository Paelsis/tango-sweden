import casaBlanca from '../images/VitaHuset.jpg';
import festivalito from '../images/festivalito_banner.jpg';
import summer from '../images/summer_banner.jpg';
import easter from '../images/easter_banner.jpg';
import maraton from '../images/maraton_banner.jpg';
import tangokompaniet from '../images/tangokompanietNew.jpg';
// change 5/9-2024 import tangokompaniet from '../images/tangokompaniet.jpg';

  
const staticStyleIds = [
  {
    searchValue:'TANGOKOMPANIET',
    // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
    style:{
      fontWeight:700,
      color:'white', // #f2e2e9', 
      background: 'linear-gradient(to bottom right, #81185B, #442222)',
      backgroundImage: `url(${tangokompaniet})`,
      backgroundPosition: 'left center',   
      backgroundRepeat:'auto', 
      backgroundSize:'200%', // 5000%
      backgroundColor:'#81185B',
    }
  },
  {
    searchValue:'STOCKHOLM',
    style:{
      fontWeight:700,
      color:'white', // #f2e2e9', 
      background: 'linear-gradient(to bottom right, #21185B, #FF2222)',
    }
  },
  /*
  {
    searchValue:'CAMARIN',
    style:{color:'white', background: 'linear-gradient(to bottom right, #BB0000, #222233'},
  },
  {
    searchValue:'MARCELA',
    style:{color:'yellow', background: 'linear-gradient(to bottom right, brown, #333344'},
  },  
  {
    searchValue:'ARRIBA',
    style:{color:"#ffe2e6", background: 'linear-gradient(to bottom right, #301939, #5491c8'}
  },
  {
    searchValue:'URBANA',
    style:{color:'#ffd8B1', background:'linear-gradient(to bottom right, #212121, blue'},
  },
  {
    searchValue:'HOMERO',
    style:{color:'red', height:'100%', background: 'linear-gradient(-45deg, #ffee62 0%, #ffffdd 100%', fontWeight:700,  border:'4px solid red', fontSize:20}
  },
  {
    searchValue:'CASA BLANCA',
    style:{color:"white", backgroundSize:'25% 100%', fontWeight:800, backgroundImage: `url(${casaBlanca})`},  
    // style:{color:'#232323', background:'linear-gradient(-45deg, #cc5500 0%, orange 50%'},
  },
  {
    searchValue:'NYDALA',
    // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
    style:{color:"blue", background: 'linear-gradient(to bottom right, #FF61D2, #FE9090'}
  },
  {
    searchValue:'JUANJO PASSO',
    style:{color:'blue', background: 'linear-gradient(-45deg, #9895d3 0%, lightBlue 100%'},
  },  
  {
    searchValue:'IVAN',
    style:{color:'yellow', background: 'linear-gradient(-45deg, darkRed 0%, red 100%'},
  },  
  {
    searchValue:'STREET TANGO',
    style:{color:'yellow', background: 'linear-gradient(-45deg, grey 0%, teal 100%'},
  },
  {
    searchValue:'STREET-TANGO',
    style:{color:'yellow', background: 'linear-gradient(-45deg, grey 0%, teal 100%'},
  },
  {
    searchValue:'ANNANDAG',
    // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
    style:{color:"#ececee", background: 'linear-gradient(-45deg, #d6001c 0%, #990066 100%', border:'4px solid #007152'}
  },
  {
    searchValue:'DEFAULT',
    style:{color:"darkBlue", background: 'linear-gradient(to bottom right, #009245, #FCEE21'}
  },
  {
    searchValue:'FESTIVALITO',
    // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
    style:{color:"#f2e2e9", background: 'linear-gradient(-45deg, #871A21 0%, #711A1C 100%'}
  },
  {
    searchValue:'MARATON',
    // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
    style:{color:"white", background: 'linear-gradient(-45deg, #05737A 0%, #026368 100%'}
  },
  {
    searchValue:'SUMMER',
    // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
    style:{color:"white", background: 'linear-gradient(-45deg, #8a973b 0%, #768438 100%'}
  },
  {
    searchValue:'EASTER',
    // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
    style:{color:"white", background: 'linear-gradient(-45deg, #D08E1F 0%, #C17E2F 100%'}
  },
  */
  {
    searchValue:'DEFAULT',
    // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
    style:{color:"#f2e2e9", background: 'linear-gradient(to bottom right, darkRed, orange'}
  },
]
  
const _findStyle = val => val?staticStyleIds.find(it => val.toUpperCase().indexOf(it.searchValue.toUpperCase()) > -1):undefined

export default staticStyleId => {
  let foundStyle=_findStyle(staticStyleId) // If staticStyleId given, try this first
  if (foundStyle) {
    return foundStyle.style
  } else { 
    foundStyle=staticStyleIds[staticStyleIds.length-1]  // Use default style
    return foundStyle.style
  }  
}  
