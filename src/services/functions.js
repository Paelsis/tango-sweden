import { generateEditorStateFromValue, emptyEditorState } from '../components/DraftEditor'
import { makeStyles } from '@mui/styles';

export const labelSwedish = name => {
    switch (name.toLowerCase()) {
        case 'goteborg':return 'Göteborg'
        case 'malmö':return 'Malmö/Lund'
        case 'jamtland':return 'Jämtland'
        default: return name.toLowerCase()
    }
}

export const replaceSwedishChars = value => {
    return value
      .replace(/å/g, 'a')
      .replace(/Å/g, 'A')
      .replace(/ä/g, 'a')
      .replace(/Ä/g, 'A')
      .replace(/ö/g, 'o')
      .replace(/Ö/g, 'O');
}

export const replaceChar = (origString, replaceChar, index) => {
    let firstPart = origString.substring(0, index);
    let lastPart = origString.substring(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

export const isEmail = value => {
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return value?.toLowerCase().match(validRegex)?true:false 
}    

export const styleSquare = sharedState=>{
    const color = sharedState.color
    const background = 'linear-gradient(to bottom right, ' + sharedState.backgroundColorLight + ' ,' + sharedState.backgroundColorDark + ')'
    const borderWidth = sharedState.borderWidth
    const borderColor = sharedState.borderColor
    const backgroundColor = sharedState.backgroundColorLight
    const backgroundImage = `url(${sharedState.backgroundImage})`
    return(
        
    sharedState.backgroundImage?
        {textAlign:'center', color, backgroundSize:'50% 100%', backgroundImage:backgroundImage, backgroundColor, borderStyle:'solid', borderWidth, borderColor}
    :
        {width:300, height:150, textAlign:'center', color, background, borderStyle:'solid', borderWidth, borderColor}
    )
}       

export const defaultDate = () =>{
    const today = new Date();
    const date = today.setDate(today.getDate()); 
    const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd
    return defaultValue
} 

export const useStyles = makeStyles({
    btn: {
      // you'll probably want the hex color code below
      background: 'yellow',
      // ... other css properties
    },
});




export const uniqueList = list => {return([...new Set(list)])}


// get draft value when you have some fileds thtat uses draft




    





    




