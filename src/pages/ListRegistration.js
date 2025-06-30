import React from 'react';
import { useLocation } from 'react-router-dom'
import EditRegistration from '../components/EditRegistration'

// ListRegistration
export default () => {
    const location = useLocation()
    const {eventIdExtended, tblRegistration} = location?.state?location.state:{}
    return(
       <EditRegistration eventIdExtended={eventIdExtended} tblRegistration={tblRegistration} />
    )
        
}