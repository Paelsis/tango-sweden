import React, {useState, useEffect} from 'react';
import { useSharedState } from '../store';
import {useLocation} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AddEvent from '../components/AddEvent'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { generateEditorStateFromValue, emptyEditorState } from '../components/DraftEditor'

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

const development = process.env.NODE_ENV === 'development'

 
export default props => {
    const navigate = useNavigate() 
    const location = useLocation();
   
    const initEvent = () => {
        const event = location.state?location.state:undefined
        if (event) {
            const changeAll = event.changeAll
            return {...event,
                    startTime:event.startDateTime.substring(11, 16),
                    endTime:event.endDateTime.substring(11,16),
                    // startDateTime:changeAll?undefined:event.startDateTime.substring(0,16),
                    // endDateTime:changeAll?undefined:event.endDateTime.substring(0,16),
                    draft_description: generateEditorStateFromValue(event.description),
            }
        } else {
            // Draft editor init without value
            const draft_description = emptyEditorState()
            return {draft_description}
        }
    }
    let init = initEvent()
    return (
        <div style={styles.container}>
            <div className='classes m-2 is-centered'>
                <div className='column is-three-quarters'>
                    <AddEvent 
                        //{...props}
                        init={init} 
                    />
                </div>
            </div>    
        </div>    
   )
}

// {JSON.stringify(value)}
