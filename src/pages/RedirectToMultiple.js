
import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {COLORS} from '../services/const'
import { NoBackpackSharp } from '@mui/icons-material';

const styles = {
    container:{
        style:'absolute',
        top:0,
        paddingTop:50,
        width:'100%',
        height:'100vh',
        textAlign:'center',
        backgroundColor:COLORS.BLACK,
    },
    buttonContainer:{
        style:'absolute',
        width:'100%',
        height:'50vh',
        width:'100%',
    },
    button: color => ({
        borderWidth:'2px',
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        color,
        borderColor:color,
        backgroundColor:'transparent'
    }),
}


const RedirectToMultiple = props => {
    return(
            <div style={styles.container}>
                <h3 style={{color:COLORS.YELLOW}}>Redirect to calendars</h3>
                <div style={styles.buttonContainer}>
                    {Object.entries(props).map(it =>
                            <Button style={styles.button(COLORS.YELLOW)} variant="outlined"  type="submit" onClick={()=>window.location.replace(it[1])}>{it[0]}</Button>
                    )}
                </div>
            </div>
    )
}

export default RedirectToMultiple