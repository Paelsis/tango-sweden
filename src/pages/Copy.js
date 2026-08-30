import React, {useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom'
import AddEvent from '../components/AddEvent'

const styles={
    container:{
        paddingTop:30,
        /*
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth:'100%'   
        */
    },
    button:{
        color:'black',
        border:'1px solid red'
    }    

}
 
export default () => {
    const location = useLocation();
    const event = location.state
   
    const adjustEvent = () => {
        if (event) {
            return {...event,
                    startTime:event.startDateTime?event.startDateTime.substring(11, 16):undefined,
                    endTime:event.endDateTime?event.endDateTime.substring(11,16):undefined,
            }
        } else {
            return {}
        }
    }
    let props = adjustEvent()

    return (
        <div style={styles.container}>
            <div className='classes m-2 is-centered'>
                <div className='column is-three-quarters'>
                    <AddEvent {...props} />
                </div>
            </div>    
        </div>    
   )
}

// {JSON.stringify(value)}
