const staticStyle={
    position:'fixed',
    left:0,
    bottom:0,
    height:30,
    width:'100vw',
    textAlign:'center'
}    

export default props =>  {
    const {text, style} = props
    return (
        text?<div style={{...staticStyle, ...style}}>{props.text}</div>:null
    )
}


