import {COLORS} from '../services/const'
import tangokompaniet from '../images/tangokompanietNew.jpg';
// change 5/9-2024 import tangokompaniet from '../images/tangokompaniet.jpg';

const darkDarkRed = 'rgb(16, 14, 14)'
  
const STYLES = {
  TANGOKOMPANIET:{
      color:"yellow", 
      fontWeight:700,
      color:'white', // #f2e2e9', 
      background: 'linear-gradient(to bottom right, #211811, #AA1111)',
      /*
      background: 'linear-gradient(to bottom right, #81185B, #442222)',
      backgroundImage: `url(${tangokompaniet})`,
      backgroundPosition: 'left center',   
      backgroundRepeat:'auto', 
      backgroundSize:'200%', // 5000%
      backgroundColor:'#81185B',

      fontWeight:700,
      */
  },
  STOCKHOLM:{
      fontWeight:700,
      color:'white', // #f2e2e9', 
      background: 'linear-gradient(to bottom right, #211811, #AA1111)',
      //background: 'linear-gradient(to bottom right, #21185B, #FF2222)',
  },
  MALMÖ:{
      fontWeight:700,
      color:'white', // #f2e2e9', 
      background: 'linear-gradient(to bottom right, #211811, #770808)',
  },
  LUND:{
    fontWeight:700,
    color:'lightYellow', 
    background: 'linear-gradient(to bottom right, #661811, #881811)',
  },
  HELSINGBORG:{
    fontWeight:700,
    color:'lightYellow', 
    background: 'linear-gradient(to bottom right, #550808, #770808)',
  },
  YSTAD:{
    fontWeight:700,
    color:'lightYellow', 
    background: 'linear-gradient(to bottom right, #440606 , #660606)',
  },
  DEFAULT:{
    fontWeight:700,
    color:'lightYellow', // #f2e2e9', 
    background: 'linear-gradient(to bottom right, #330404 , #550404)',
  }     
}
  
// findStaticStyle
export default key => STYLES[key]?STYLES[key]:STYLES.DEFAULT
