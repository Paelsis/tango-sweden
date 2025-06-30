
import { useParams } from 'react-router-dom';
import AddEvent from '../components/AddEvent'

// Add
export default () => {
    const params = useParams()
    const {calendarType} = params
    return (
        <AddEvent calendarType={calendarType} />
    )
}    
