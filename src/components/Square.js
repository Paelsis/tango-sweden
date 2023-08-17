import React from 'react'

// Square
export default ({settings})=>{
    const color = settings.color
    const background = 'linear-gradient(to bottom right, ' + settings.backgroundColorLight + ' ,' + settings.backgroundColorDark + ')'
    const borderWidth = settings.borderWidth
    const borderColor = settings.borderColor
    const backgroundColor = settings.backgroundColorLight
    const backgroundImage = settings.backgroundImage?`url(${settings.backgroundImage})`:''
    const backgroundSize="50% 100%"
    const style = settings.backgroundImage?
        {textAlign:'center', fontSize:16, color, width:300, height:150, backgroundSize, backgroundImage, backgroundColor, borderStyle:'solid', borderWidth, borderColor}
    :
        {width:300, height:150, fontSize:16, textAlign:'center', color, background, borderStyle:'solid', borderWidth, borderColor}

    return(    
        <div style={style}>
            {settings.backgroundImage?
                <span>Text color:{settings.color}</span>
            :
                <ul>
                <li>Text color:{settings.color}</li>
                <li>Background color light:{settings.backgroundColorLight}</li>
                <li>Background color dark:{settings.backgroundColorDark}</li>
                </ul>
            }    
        </div>
    )
}        
