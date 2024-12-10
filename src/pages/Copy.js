import React, {useState, useEffect} from 'react';
import { useSharedState } from '../store';
import { useLocation, useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AddEvent from './AddEvent'
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

 
export default () => {
    const location = useLocation();
    const event = location.state
   
    const adjustEvent = () => {
        if (event) {
            return {...event,
                    startTime:event.startDateTime?event.startDateTime.substring(11, 16):undefined,
                    endTime:event.endDateTime?event.endDateTime.substring(11,16):undefined,
                    // startDateTime:changeAll?undefined:event.startDateTime.substring(0,16),
                    // endDateTime:changeAll?undefined:event.endDateTime.substring(0,16),
                    draft_description: event.description?generateEditorStateFromValue(event.description):emptyEditorState(),
            }
        } else {
            // Draft editor init without value
            const draft_description = emptyEditorState()
            return {draft_description}
        }
    }
    let adjustedEvent = adjustEvent()

    return (
        <div style={styles.container}>
            <div className='classes m-2 is-centered'>
                <div className='column is-three-quarters'>
                    <AddEvent 
                        init={adjustedEvent} 
                    />
                </div>
            </div>    
        </div>    
   )
}

// {JSON.stringify(value)}
