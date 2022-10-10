import serverPost from '../services/serverPost'

export function transferAnitasCalendar(list) {
    const irl = '/addEvents'
    const handleReply = reply => {alert(reply.message)}
    const sendListToCalendar = list => {serverPost(irl, '', '', list, handleReply)}
    const changeToDbEntry = ev => ({
        eventId:ev.eventId, 
        title:ev.title, 
        description:ev.description,
        startDateTime:ev.start.substring(0, 16),
        endDateTime:ev.end.substring(0, 16),
        location:ev.location,
        email:'admin@tangosweden.se',
    })
    const dbList = list.map(it=>changeToDbEntry(it))
    
    // alert(JSON.stringify(dbList.map(it => ({startDateTime:it.startDateTime, title:it.title}))))
    sendListToCalendar(dbList) 
}
