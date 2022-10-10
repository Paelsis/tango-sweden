import casaBlanca from '../images/VitaHuset.jpg';
import festivalito from '../images/festivalito_banner.jpg';
import summer from '../images/summer_banner.jpg';
import easter from '../images/easter_banner.jpg';
import maraton from '../images/maraton_banner.jpg';

  
  const stylesByCompany = [
    {
      searchValue:'CAMARIN',
      style:{background: 'linear-gradient(to bottom right, #BB0000, #222233'},
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
      style:{color:'#FFD8B1', background:'linear-gradient(to bottom right, #212121, blue'},
    },
    {
      searchValue:'HOMERO',
      style:{color:'red', height:'100%', background: 'linear-gradient(-45deg, #ffee62 0%, #ffffdd 100%', fontWeight:700,  border:'4px solid red'}
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
    {
      searchValue:'TANGOKOMPANIET',
      // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
      style:{color:"#f2e2e9", background: 'linear-gradient(to bottom right, #81185B, black'}
    },
    {
      searchValue:'DEFAULT',
      // style:{color:"yellow", backgroundImage: `url(${Dance})`},  
      style:{color:"#f2e2e9", background: 'linear-gradient(to bottom right, darkRed, orange'}
    },
  ]
    
  const getCompanyStyle = val => val?stylesByCompany.find(it => val.toUpperCase().indexOf(it.searchValue.toUpperCase()) > -1):undefined


  export default (company, title, description, opacity) => {
    let companyStyle=getCompanyStyle(company) // If company given, try this first
    if (companyStyle) {
      return {...companyStyle.style, padding:2, opacity}
    }  

    companyStyle=getCompanyStyle(title)  // Try to figure out company by title text
    if (companyStyle) {
      return {...companyStyle.style, padding:2, opacity}
    }  
    
    companyStyle=getCompanyStyle(description) // Try to figure out company by desc text
    if (companyStyle) {
      return {...companyStyle.style, padding:2, opacity}
    }  

    companyStyle=stylesByCompany[stylesByCompany.length-1]  // Use default style
    return {...companyStyle.style, padding:2, opacity}
  }  


  