import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import SchoolIcon from '@mui/icons-material/School';
import { TbVinyl } from "react-icons/tb";



export default () => 
<div>
    <h1 style={{textAlign:'center', color:'red'}}>Manual for administrators</h1>
    <h5 style={{textAlign:'center', color:'red'}}>Skifta språk till svenska med knappen till höger</h5>

    The website tangosweden.se is open to organizers in Sweden/Denmark/Norway/Finland who wish to have a tango calendar for their location.
    On the front page there are buttons for the regions and cities that are active in the calendar. 
    Helsingborg, Gothenburg and Denmark have their own calendars 
    which are also accessed via buttons on the front page.
    <p/>

    <h5>Log in</h5>

    Once you have created an account with Signup, you can log in by clicking Signin and entering your
    email and password. Once logged in, you have access to add events and make yourself a DJ or Private Teacher.
    <p/>
    <h4>Settings</h4>
    In the menu at the top right there is a menu option "Settings". Here you fill in the city and region (Skåne, Västra Götaland, Mitt, Norr, ...).
    For Stockholm, both city and region should be Stockholm. There is no limit to the number of cities.
    On the front page of tangosweden.se there are buttons for the regions that have events.
    If you are a DJ or private teacher, you can check the box for this and add a photo and descriptive text.
    Then you are visible as a DJ or private teacher via the subpages reached by <SchoolIcon/> and <TbVinyl /> at the top of the page.
    Press the <i>Save</i> button when you are finished with your settings selections.
    <p/>

    <h4>Settings</h4>
        In the menu at the top right there is a menu option "Settings". Here you fill in the city and region (Skåne, Västra Götaland, Mitt, Norr, ...).
        There is no limit to the number of cities. On the front page of tangosweden.se there are buttons for the regions that have events.
        If you are a DJ or private teacher you can check the box for this and add a photo and descriptive text.
        Press the <i>Save</i> button when you are finished with your choices in the settings.
    <p/>
    Press the <i>Save</i> button when you agree with your choices in settings (Settings). 
    <p/>

    <h4>Add new events  <AddIcon /></h4>
        <ol>
        <li>Log in with email and password</li>
        <li>Click on your city or region's calendar</li>
        <li>Click on the <AddIcon /> icon on the right side of the calendar.</li>
        <li>Fill in the form for the event</li>
        <li>Click on <button>ADD TO LIST</button></li>
        <li>Click on <button>ADD TO CALENDAR</button></li>
        <li>After this, the event is added and now appears in the calendar</li>
        </ol>

    <h5>Repeated events (group management)</h5>
        If you want to add repeated events with a certain frequency, check Repeat. This will display 3
        new fields for Every, unit and last repeat date.
        If you want your event to repeat every week until 2026-05-31, set <i>Every</i> to 1, unit to <i>weeks</i>
        and <i>Last repeat date</i> to 2026-05-31. Then click the <button>ADD TO LIST</button> button.
        Your group/list with repeated dates until 2026-05-31 will then be displayed.
        When you are finished with the group/list, finally send it to the calendar with the <button>ADD TO CALENDAR</button> button.
        <p/>
    <h5>Remove individual events from the list</h5>
        If you wish to remove an event from the list above, click the minus button to the right of the event in the list.
        If you wish to clear the entire list, click the <button>CLEAR LIST</button> button below the list.
        When you are finished with the list, send it to the calendar
        using the <button>ADD TO CALENDAR</button> button below the form.
        <p/>
        All events in a list belong to the same group. This is practical if you later want to change the values ​​
        for the entire group (Change all events in group) or remove all events in the entire group (span with dash).
        <p/>
    <h5>All-day event</h5>
        If you fill in a start time of 00:00 and an end time of 23:59, the time field will show your event as <i>All day</i> on the mobile calendar.
        This can be suitable for all-day events, festivals and marathons that span more than one day. For events that last
        longer than 11 hours and span several days, the text will be larger in the mobile calendar. This is to give a little extra
        promotion to those who take the trouble to arrange multi-day events.
        <p/>
    <h5>Edit event &nbsp;<EditIcon /></h5>

        As a logged in user, you can edit your event by clicking on the event in the calendar and then clicking on the edit button <EditIcon />.
        Your form with the event will then appear. If you wish to change the entire group event, check
        <i>Change all event in group</i> at the top of the form.
        When you are finished with your new information, click the <button>UPDATE</button> button at the bottom.
        The page will then return to the calendar (on a computer to the week in which you changed the event).
    <p/>
    <h5>Copy event &nbsp;<ContentCopyIcon/></h5>

    With the <ContentCopyIcon/> button you can copy data from an existing event into a new one.
    The typical example is that you have a recurring milonga or practica during the fall
    that you want to continue next season with the same title, location and description.
    Then you just need to fill in the times. The process is described below.
    <p/>
    <ol>
    <li>Once logged in, click on the event in the calendar that you want to copy data from.</li>
    <li>Click on the copy button <ContentCopyIcon/></li>
    <li>The form now contains pre-filled data with empty fields for date and time.</li>
    <li>Fill in your dates and times</li>
    <li>For repeated events use <i>Repeat</i> and its 3 fields)</li>
    <li>Click on the button <i>ADD TO LIST</i></li>
    <li>Click on the button <i>ADD TO CALENDAR</i></li>
    </ol>
    To make it easier for those who forgot to copy, there is a calendar history going back in time.
    Events before today's date are displayed if you click on <i class="fa fa-history"></i>
    at the top right of the calendar. History is then displayed about 6 months back.
    <p/>
    <h5>Delete event&nbsp;&nbsp;<DeleteIcon /></h5>
    As a logged in user you can change or delete your events.
    <ol>
    <li>Click on the event in the calendar.</li>
    <li>Click on <DeleteIcon /></li>
    </ol>
    If you wish to delete all events in a group, click on <DeleteSweepIcon />.
    A group means the entire list you created with
    <i>ADD TO LIST</i> when the event/events were created.
    <p/>    
    
    <h4>Event registration via calendar button</h4>

    Once logged in, you can add a registration button so that dancers can register for the event.
    You can then edit the registrations that have been made.
    A dancer can also register their dance partner so that they don't have to do it themselves.
    <p/>
    Do this to introduce the registration button in your event.
    <ol>
        <li>Log in with your email and password in the menu on the right.</li>
        <li>Click on the event you want to change in the calendar</li>
        <li>Edit the event with the pencil icon as follows</li>
        <li>Check the box "Use registration button"</li>
        <li>If you want to limit the number of registrations allowed, fill in the field "Maximum number of registrations".
        Then it is not possible to register when the event is fully booked.</li>
        <li>Click on the update button</li>
    </ol>
    <p/>
    To review the registrations that have been made, do the following:
    <ol>
    <li>Click on the event in the calendar (not on the registration button).</li>
    <li>Click on the person icon (at the bottom it is the second icon from the right)</li>
    <li>Here is the list of the registrations that have been made. </li>
    <li>You can edit and remove dancers from this list with the buttons on the left.</li>
    </ol>
    Response emails were also sent when registering.
    <ol>
    <li>When someone registers via the registration button in the calendar, a response email is sent to the registrant's email address (not dance partners)</li>
    <li>A copy of the email is also sent to the organizer's email address, i.e. the one you logged in with.</li>
    <li>The email sent to the customer also contains a cancellation link with which the customer can easily delete their registration.</li>
    <li>If someone so wishes, we can change the functionality so that it is not possible to cancel their registration
    14 days after the registration has been made, after which the registration is considered legally binding.</li>
    </ol>

    <h4>Private lessons <SchoolIcon /></h4>
    <p/>
    <h5>Mark yourself as a private teacher</h5>
    In the menu option "My profile" check the field <i>Is private teacher</i> and your name will be listed as a private teacher
    under your region when customers click on the button <SchoolIcon /> in the top right.
    <p/>
    <h5>Describe yourself as a private teacher</h5>
    When you have checked "Is private teacher", a text field appears where you can describe yourself as a private teacher.
    If you click on the camera, you can also upload a picture of yourself that you have saved on the computer or mobile you are on.
    <p/>
    <h5>The private teacher's calendar</h5>
    As a private teacher, you also have access to your own calendar where you can enter times for your private lessons that students can then book in for.
    The calendar appears in the form of a calendar icon on the page where you are described as a probationary teacher (<SchoolIcon /> | region | name).
    <p/>
    <h5>Add private lesson to the calendar</h5>
    To add times to your private lesson calendar, go to your calendar via <SchoolIcon /> at the top of the page.
    You then click on the <AddIcon /> icon on the far right. The rest works like when you add events to
    the regular event calendar, which is described above.
    <p/>
    <h5>This is how the customer books a private lesson via the calendar</h5>
    To book a private lesson, click on the calendar for the desired private teacher and then look for a desired free time.
    When you click on this private lesson, a registration form appears. When the student has filled in their details and sent the registration
    the registration is registered and then two emails are sent, a confirmation email to the customer and an email to the private teacher.
    When the registration is completed, the time in the calendar is grayed out, which means that the time is
    booked and no one can then book this time.
    <p/>
    <h5>View/Edit/Delete the booking <i class="fa fa-users"/></h5>
    In the calendar, you can click on the event as a logged-in user and get more information than the customers can see (who are not logged in with your email).
    To see the name and possibly edit the person who booked, click on the button <i class="fa fa-users"/>.
    You can also delete the lesson completely if you want.
    <p/>
    <h5>Direct links to the calendar for private lessons</h5>
    If you wish or your customers want to be able to access the calendar directly, use tangosweden's direct link to your private teacher calendar.
    http://tangosweden.se/calendar/Region/PRIVATE_LESSON/email, where Region is the Region you have entered in your profile (Ex: Skåne) and email is the email
    that you have logged in with (Example per.eskilson@gmail.com). With these 2 keys as an example, the link looks like
    http://tangosweden.se/calendar/Skåme/PRIVATE_LESSON/per.eskilson@gmail.com.
    <p/>
    <h5>Comment</h5>
    At the moment this service is free but in the future (in about 3 months) it will probably be charged a low fee,
    so we can continue to keep the page up and keep away private teachers with too few students.
    You can test the page and see if it works well.

    <h4>Suggestion box:</h4>
    If you have any great suggestions for changes to further develop the calendar,
    please send them to me in an email at per.eskilson@gmail.com.
</div>
