import { generateEditorStateFromValue, emptyEditorState } from '../components/DraftEditor'

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
    return value.toLowerCase().match(validRegex)?true:false 
}    

export const styleSquare = userSettings=>{
    const color = userSettings.color
    const background = 'linear-gradient(to bottom right, ' + userSettings.backgroundColorLight + ' ,' + userSettings.backgroundColorDark + ')'
    const borderWidth = userSettings.borderWidth
    const borderColor = userSettings.borderColor
    const backgroundColor = userSettings.backgroundColorLight
    const backgroundImage = `url(${userSettings.backgroundImage})`
    return(
        
    userSettings.backgroundImage?
        {textAlign:'center', color, backgroundSize:'50% 100%', backgroundImage:backgroundImage, backgroundColor, borderStyle:'solid', borderWidth, borderColor}
    :
        {width:300, height:150, textAlign:'center', color, background, borderStyle:'solid', borderWidth, borderColor}
    )
}        

export const uniqueList = list => {return([...new Set(list)])}


// get draft value when you have some fileds thtat uses draft




    





    




