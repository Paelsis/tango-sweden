import React from 'react'
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

// Square
export default ({settings})=>{
    const color = settings.color
    const background = 'linear-gradient(to bottom right, ' + settings.backgroundColorLight + ' ,' + settings.backgroundColorDark + ')'
    const borderWidth = settings.borderWidth
    const borderColor = settings.borderColor
    const backgroundColor = settings.backgroundColorLight
    const backgroundImage = settings.backgroundImage?`url(${apiBaseUrl + settings.backgroundImage})`:''
    const backgroundSize="50% 100%"
    const borderStyle=settings.borderStyle
    /*
    const style = settings.backgroundImage?
        {textAlign:'center', fontSize:16, color, width:300, height:150, backgroundSize, backgroundImage, backgroundColor, borderStyle, borderWidth, borderColor}
    :
        {width:300, height:150, fontSize:16, textAlign:'center', color, background, borderStyle:'solid', borderWidth, borderColor}
    */
    const style =
        backgroundImage?
        {color,
          //border, 
          //borderWidth, 
          //borderColor, 
          backgroundImage,
          backgroundPosition: 'center center',   
          backgroundRepeat:'auto', 
          backgroundSize:'cover', 
          backgroundColor,
          textAlign:'center',
          width:300,
          height:150, 
      }
    :  
        {
            color, 
            background, 
            borderStyle, 
            borderWidth, 
            borderColor,
            width:300,
            height:150, 
            fontSize:12,
        }
    

    return(    
        <div style={style}>
            {settings.backgroundImage?
                <span>Image:{settings.backgroundImage}</span>
            :
                <ul>
                <li>Text color:{settings.color}</li>
                <li>Bgcolor top left:{settings.backgroundColorLight}</li>
                <li>Bgcolor bottom right:{settings.backgroundColorDark}</li>
                </ul>
            }    
        </div>
    )
}        
