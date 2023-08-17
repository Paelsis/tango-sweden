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
