import React, {useState} from 'react';
import Button from '@mui/material/Button';

const SwedishUsage = () => 
<div>
    <h1 style={{textAlign:'center', color:'red'}}>Manual för administratörer</h1>

    <h3>Manual tangosweden.se</h3>

    Hemsidan tangosweden.se är öppen för alla arrangörer i Sverige/Danmark/Norge/Finland som önskar ha en tangokalender för sin ort eller region.
    På förstasidan finns knappar för de regioner och städer som är aktiva i kalendern. Helsingborg, Göteborg och Danmark har sina egna kalendrar 
    som även dessa nås via knappar på förstasidan.
    <p/>

    <h4>Registrera dig som användare</h4>

    För att kunna lägga ut event måste du först ha ett konto. Detta får du genom att göra "Signup" i menyn uppe till höger.
    Vid Signup anger du din email och ett lösenord. Föreningar med många administratörer bör ha en gemensam email eftersom 
    eventen ägs av email-adressen, dvs endast den email som loggat in kan ändra eller ta bort event för denna email.  
    Önskar man ändra password för en given email gör man det via länken som finns på sidan "Signin".
    <p/>    
    <h4>Logga in</h4>

    När man har skapat ett konto med Signin kan man logga in på tangosweden.se. Som inloggad har du tillgång till att lägga till events 
    för din region och stad. 
    Du kan lista och beskriva dig som privatlärare samt lägga till en bild på dig själv. 
    Detsamma gäller om du är DJ. Kunder kan då hitta dig via hatt ikonen (privatlärare) och cd-ikonen (diskjockey) längst upp till höger.
    När ni loggat in första gången skall ni gå in i menyn <i>Settings</i>.
    <p/>
    <h3>Inställningar</h3>

    I menyn uppe till höger finns där en meny option "Settings". Här fyller du i stad och region (Skåne, Västra Götaland, Mitt, Norr, ...).
    Det finns ingen begränsning på antalet städer. På förstasidan hos tangosweden.se finns knappar för de regioner som har händelser.
    Om du är DJ eller privatlärare kan du kryssa i rutan för detta samt lägga till foto och beskrkivande text.
    Man kan inte längre göra egna färgval för sina events. Då blir sidan enligt experter alldeles för rörig.
    Tryck på <i>Save</i> knappen när du är klar med dina val i inställningar (Settings). 
    <p/>
    <h3>Lägg till / ändra / ta bort händelser</h3>

    <h4>Lägga till händelse &nbsp; <i class="fa fa-plus"/></h4>

    <ol>
        <li>Logga på</li>
        <li>Klicka till din stads kalender</li>
        <li>Klicka på <i class="fa fa-plus"/> ikonen till höger i kalendern.</li>
        <li>Fyll i formuläret med data</li>
        <li>Klicka på <button>ADD TO LIST</button></li>
        <li>Klicka på <button>PUSH TO CALENDAR</button></li>
        <li>Nu syns eventet i din stads kalender</li>
    </ol>
    <h4>Repeterade händelser</h4>
    Om du önskar lägga in repeterade händelser med en viss frekvens kryssar du i Repeat. Då visas 3 
    nya värden för offset, enhet och antal repetitioner. 
    Om du vill att ditt event skall repteras 9 gånger varannan vecka sätter du  <i>offset</i> till 2 och enhet till <i>weeks</i>
    och <i>Repeat number of times</i>  till 9. Klicka sem på knappen <button>ADD TO LIST</button>. 
    Då visas en lista med dina 9 datum. Du kan lägga till eller ta bort (med minus knappen) från denna list upprepade gånger. 
    Du avslutar med att sända öistan till kalendern med knappen <button>PUSH TO CALENDAR</button>.
    <p/>
    <h4>Modifiera listan av händelser</h4>
    Önskar du ta bort en enstaka händelse från listan ovan klickar du på knappen <i class="fa fa-trash-o"/> 
    till höger i listan om datumet du vill ta bort. Om du önksar rensa hela listan du på knappen <button>CLEAR LIST</button>.
    När du är klar med den skapade med listan skickar du denna till kalendern 
    med knappen <button>SEND LIST TO CALENDAR</button>.
    <p/>
    Samtliga händelser i en given lista har ett och samma samma unika eventId. Detta är praktiskt om man senare vill ändra 
    eller ta bort samtliga event i hel en serie. 
    <p/>
    <h4>Heldagsevent</h4>
    Om du fyller i starttid 00:00 och sluttid 23:59 kommer tidsfältet visas ditt event som <i>Hela dagen</i> på mobilkalendern. 
    Detta kan vara lämpligt för heldags-events, festivaler och maraton som sträcker sig över mer än en dag. För events som varar 
    längre än 11 timmar och som sträcker sig över flera dagar blir texten större i mobil-kalendern. Detta för att ge lite extra promotion till dem som gör sig besväret att
    arrangera flerdagarsevenemang.
    <p/>

    <h4>Ändra existerande händelse &nbsp;<i class="fa fa-pencil" /></h4>

    Som inloggad kan du ändra din händelse genom att klicka på händelesen och därefter klicka på edit knappen <i class="fa fa-pencil" />.
    Då dyker det upp ett formulär där man kan beskriva händelsen. Om du önskar ändra hela listan för en given eventId kryssa i <i>Change all events in list</i>.
    När du är klar med dina nya uppgifter klicka på <button>UPDATE</button> knappen längst ned. 
    <p/>
    
    <h4>Kopiera händelser till nya händelser &nbsp; <i class="fa fa-copy"></i></h4>

    För den som vill återanvända samma information från tidigare events till nya använda knappen <i class="fa fa-copy"/>.
    Det typiska exemplet är att du har en återkommande milonga eller praktika under hösten som önskar skall 
    fortsätta nästa säsong.
    <p/>
    Som inloggad klickar du på eventet i kalendern som du vill kopiera data från. Därfter klickar du på copy knappen <i class="fa fa-copy"/>. 
    I fönstet som poppar upp finns nu förifylda data  samt tomma fält för datum och tid. Fyll i dina nya datum och tider samt eventuell upprepad frekvens med <i>Repeat</i>.
    För att underlätta för dem som glömt kopiera finns där kalender-historik bakåt i tiden. Dessa kalender data nås om man klickar på <i class="fa fa-history"></i> längst upp till höger.
    Historik finns för cirka 6 månader tillbaka. 
    <p/>
    <h4>Ta bort händelse från kalender <i class="fa fa-trash-o"/></h4>

    Den som är inloggad kan ändra eller ta bort dina händelser genom att klicka på händelsen i kalendern. 
    Du kan endast ta bort events som din email äger, dvs events som skapats under den email du loggat på med.
    Det finns 2 varianter av att ta bort händelser från kalender.
    <ul>
        <li><i class="fa fa-trash-o"/> tar endast bort edet event du klickat på.</li>
        <li><i class="fa fa-trash-o"/> med tre streck efter knappen, tar bort hela listan av händelser som du skapade med <button>SEND LIST TO CALENDAR</button></li>
    </ul>
    <p/>

    <h3>Anmälan till händelse via knapp i kalendern</h3>

    När du är inloggad kan du lägga till en registreringsknapp så att dansare kan registrera sig till händelsen. 
    Du kan sen editera de registreringar som gjorts.
    En dansare kan även registrera sin danspartner så att hen slipper göra det själv.
    <p/>
    Gör så här för att introducera anmälan-knappen i ditt event.
    <ul>
        <li>Logga in med din e-post och password uppe i menyn till höger.</li>
        <li>Klicka på den händelsen du önskar ändra i kalendern</li>
        <li>Redigera händelsen med penn-ikonen enligt följande</li>
        <li>Markera rutan "Use registration button"</li>
        <li>Om du önskar begränsa antalet tillåtna anmälningar fyller du i fältet "Maximalt antal anmälningar". Då går det inte att anmäla sig när eventet är fullbokat
        </li>.
        <li>Klicka på uppdaterings-knappen</li>
    </ul>
    <p/>
    För att granska de anmälningar som gjorts gör du enligt följande:
    <ul>
        <li>Klicka på händelsen i kalendern (inte på registreringsknappen).</li>
        <li>Klicka på personikonen (längst ned är det andra iconen från höger)</li>
        <li>Här är listan på de registreringar som gjorts. </li>
        <li>Man kan redigera och ta bort dansare från den här listan med knapparna till vänster.</li>
    </ul>
    Det sändes även svars-mails vid anmälan.
    <ul>
            <li>När någon anmäler sig via registreringsknappen i kalendern så sändes ett svars-mail ut till anmälarens email-adress (inte dans-partners)</li>
            <li>Det sändes även en kopia av mailet till organisatörens email-adress, dvs den som ni loggat in med.</li>
            <li>I mailet som sändes till kund finns även en cancellerings-länk med vilken kunden enkelt kan ta bort sin anmälan.</li>
            <li>Om någon så önskar kan vi lägga ändra funktionaliteten så att det inte går att cancellera sin anmälan 
            14 dagar efter anmälan gjorts efetersom då anses lagmässigt anmälan vara bindande.</li>
    </ul>

    <h3>Privatlektioner <i class="fa fa-graduation-cap"/></h3>
    <p/>
    <h4>Markera dig som privatlärare</h4>
    I meny option "My profile" kryssa i fältet <i>Is private teacher</i> så kommer ditt namn listas som privatlärare  
    under din region när kunder klickar på knappen <i class="fa fa-graduation-cap"/> uppe till höger. 
    <p/>
    <h4>Beskriv dig själv som privatlärare</h4>
    När man markerat "Is private teacher" dyker det upp ett text-fält där du kan beskriva sig själv som privatlärare.
    Klickar du på kameran kan du även ladda upp en bild på dig själv som du sparat på den dator eller mobil du befinner dig.
    <p/>
    <h4>Privatlärarens kalender</h4>
    Som privatlärare har du även tillgång till din egen kalender där du kan lägga in tider för dina privatlektioner som eleverna därefter kan boka in sig på.
    Kalendern syns i form av en kalender ikon på sidan där du beskrivs som provatlärare (<i class="fa fa-graduation-cap"/> | region | namn).
    <p/>
    <h5>Lägga till privatlektion till kalendern</h5>
    För att lägga till tider till din privatlektions-kalender går du till din kalender via <i class="fa fa-graduation-cap"/> överst på sidan. 
    Du klickar sedan på  <i class="fa fa-plus"/> ikonen längst ute till höger. Resten fungerar som när du lägger till händelser till 
    den vanliga händelse-kalendern vilket finns bekrivet ovan.
    <p/>
    <h5>Så här bokar kunden en privatlektion via kalendern</h5>
    För att boka en privatlektion klickar man på kalendern för önskad privatlärare och leter därefter upp en önskad ledig tid.
    När man klickar på denna privatlektion dyker det upp ett anmälan-formulär. När eleven fyllt i sina uppgifter och skickat anmälan 
    registreras anmälan och därefter sändes två mails, ett bekräftelsemail till kunden och ett mail till privatläraren. 
    När anmälan genomförts tonas tiden i kalendern grå som betyder att tiden är 
    uppbokad och ingen kan då boka denna tid.
    <p/>
    <h5>Se/Editera/Ta bort bokningen  <i class="fa fa-users"/></h5>
    I kalendern kan du som inloggad klicka på eventet och få fram fler uppgifter än de kunderna kan se (som inte loggat på med din email).
    För att se namnet och eventuellt editera den person som bokat klickar du på knappen <i class="fa fa-users"/>.
    Du kan även ta bort lektionen helt om du vill.
    <p/>
    <h5>Direktlänkar till kalendern</h5>
    Om du önskar eller dina kunder vill kunna nå kalendern direkt så skall nyttja tangoswedens direkt-länk till din privatlärar-kalender.    
    http://tangosweden.se/calendar/Region/PRIVATE_LESSON/email, där Region är den Region du har angivit in din profil (Ex: Skåne) och email är den email 
    som du loggat på med (Exempel per.eskilson@gmail.com). Med dessa 2 nycklar som exempel ser länken ut enligt 
    http://tangosweden.se/calendar/Skåme/PRIVATE_LESSON/per.eskilson@gmail.com.
    <p/>
    <h4>Kommentar</h4>
    För tillfället är denna service gratis men framöver (om cirka 3 månader) kommer den sannolikt avgiftsbeläggas med en låg avgift, 
    så vi kan fortsatt kan hålla sidan uppe och hålla borta privatlärare med alltför få elever. 
    Ni kan testa sidan och se om den fungerar bra. 

    <h3>Förslagslåda:</h3>
    Om du har några fantastiska förslag på ändringar för vidareutveckling av kalendern, 
    skicka dessa i en email till mig på email per.eskilson@gmail.com.
</div>

const EnglishUsage = () => 
<div>
    <h1 style={{textAlign:'center', color:'red'}}>Manual for administrators</h1>

    <h3>Manual tangosweden.se</h3>

    The website tangosweden.se is open to all organizers in Sweden/Denmark/Norway/Finland who wish to have a tango calendar for their locality or region.
    On the front page there are buttons for the regions and cities that are active in the calendar. Helsingborg, Gothenburg and Denmark have their own calendars 
    as these are also accessed via buttons on the front page.

    <h3>Add, remove and modify events</h3>

    <h4>Signup</h4>
    In order to post events, you must first have an account. You get this by doing "Signup" in the menu at the top right.
    At Signup, you enter your email and a password. Associations with many administrators should have a common email because 
    the events are owned by the email address, i.e. only the email that logged in can change or delete events for this email.  
    If you wish to change the password for a given email, you do so via the link on the "Signin" page.
    <p/>
    <h4>Signin</h4>
    Once you have created an account with Signin, you can log in to tangosweden.se. As logged in, you have access to register and add events 
    for your region and city. If you are a DJ, you can upload a picture and write information about yourself.
    When you log in for the first time, you must enter the <i>Settings</i> menu.
    <p/>
    <h3>Settings</h3>
    I menyn uppe till höger finns där en meny option Settings. Här fyller du i stad och region (Skåne, Väst, Mitt eller Norr).
    Det finns ingen begränsning på antalet städer.  
    På förstasidan hos tangosweden.se finns knappar för regioner och städer.
    Endast städer och regioner med events visas med knappar.
    <p/>
    På Settings sidan gör du även färgval för text och bakgrund för dina händelser (Detta gäller ej användare i Stockholm som valt fixt färgshema). 
    Tanken är att varje arrangör gör sina egna unika färgval som representerar företaget/föreningen.
    Man knn göra 3 färgval: text-färg, bakgrundsfärg övre vänstra hörnet, backgroundsfärg nedre högra hörnet. 
    Bakgrundsfärgen tonas succesivt från färgen i övre högre ned till färgen i nedre vänstra hörnet.
    <p/>
    The values ​​of the colors are specified with text (eg red, green, blue, lightYellow), or with a hexadecimal value. 
    Hexadecimal color values ​​consist of a # sign followed by 6 numbers 0-9 or the letters a-f (or A-F), eg #fa23e8. 
    You can find hexadecimal colors by googling something like "hex color wine red". Then you will get lots of hex codes for shades of burgundy as a search response. 
    In total, you have access to roughly 16 million colors with hex codes. On the settings page
    your color choices are previewed. You can also choose a frame of variable thickness and color. Another option is to use an image as a background,
    but then the image must be posted online with a given url (eg: https://tangokompaniet.com/images/anna.jpg).
    If you use images, no frame will appear.
    <p/>
    Press the <i>Save</i> button when you agree with your choices in settings (Settings). 
    If you changed your color choices in settings, they only change on new events because each event in the calendar gets its colors saved when you add them. 
    If you want to change the color of already existing events, you must 
    check the box "Change colors to latest settings" when you update the event (with the pen).
    This is so that you can update the color of new events without changing the color of previously created events. 
    New events always automatically get the color c
    <p/>

    <h3>Add new events  <i class="fa fa-plus"/></h3>
    <ol>
        <li>
            Log in with your email and password klick on your city calendar. 
        </li>
        <li>Click on the add icon <i class="fa fa-plus"/> e right at top on your laptop (in bottom of mobile).</li>
        <li>Fill in the form with title, location, date and time</li>
        <li>If you want to repeat an event check box repeat and, otherwise jump to 4. 
            If you want to repeat your event 14 times every week set <i>offset</i>1 and unit to <i>weeks</i> and <i>Repeat number of times.</i> to 14</li>
        <li>Click button <button>ADD TO LIST</button> to add your entry to the list</li>
        <li>Repeat the procedure from bullet point 1</li>
        <li>When your list of events (shown to the right) is ready, send it to the calendar with the button <button>SEND LIST TO CALENDAR</button></li>
    </ol>    
    <h3>Remove an event <i class="fa fa-trash-o"></i></h3>
    <p/>
    If you wish to remove a single event from the list, click the <i class="fa fa-trash-o"></i> button to the right of the event you want to remove. 
    If you wish to clear the entire list, click the button <button>CLEAR LIST</button> on the right.
    <p/>
    All events in the list are given a unique identity key eventId. This key is used later if you want to change or delete a specific event, alternatively a list if it is one you have inserted.
    After you press <button>SEND LIST TO CALENDAR</button>, the events appear in the calendar for your region and city.
    If you enter start time 00:00 and end time 23:59, the time field will be displayed to the customer as <i>All day</i> on the mobile calendar. 
    This can be suitable for all-day events, festivals and marathons that span more than one day. For events that last longer than 11 hours and which
    extends over several days, the text becomes larger in the mobile calendar. This is to give a little extra promotion to those who take the trouble to
    organize multi-day events.
    <p/>

    <h3>Modify events <i class="fa fa-pencil" /></h3>

    As logged in, you can change your event by clicking on the event and then clicking on the edit button <i class="fa fa-pencil" />. 
    A form will then appear where you can describe the event. If you wish to change the entire list for a given eventId, check <i>Change all events in list</i>.
    When you are done with your new information, click the <button>UPDATE</button> button at the bottom.
    <p/>

    <h3>Duplicate existing events to upcoming events <i class="fa fa-copy"/></h3>

    For those who want to reuse the same information from previous events for new ones, use the <i>Copy</i> button.
    The typical example is that you have a recurring milonga or practika during the fall that you want to continue with next season.
    <p/>
    As logged in, you click on the event that you want to copy data from and press the copy button <i class="fa fa-copy"/>. In the window that pops up there is now pre-filled data 
    as well as empty fields for date and time. Fill in your new date and time as well as any repeat frequency with <i>Repeat</i>.
    To make it easier for those who forgot to copy, there is a calendar history going back in time. This calendar data is accessed by clicking on <i class="fa fa-history"></i> at the top right.
    History is available for about 6 months back.
    <p/>

    <h3>Remove events <i class="fa fa-trash-o"/></h3>

    As logged in you can delete your events by clicking on the event in the calendar. 
    You can only delete events that your created under your login email.
    There are 2 variants of deleting events from calendar.
    <ul>
        <li>The first delete button <i class="fa fa-trash-o"/> only deletes the event you clicked on.</li>
        <li>The second delete button<i class="fa fa-trash-o"/> with three dashes after the button, deletes the entire list of events that you created with <button>SEND LIST TO CALENDAR</button></li>
    </ul>
    <p/>


    <h3>Registration button</h3>

    Once logged in, you can turn on a registration button so dancers can register for the event. You can then see and edit the registrations that people have made.
    A dancer can also register his dance partner so he does not have to do this himself.
    <p/>
    Do this to introduce the registration button in your event.
    <ul>
        <li>Log in with your e-mail and password in the menu on the right</li>
        <li>Click on the event you wish to change in the calendar</li>
        <li>Now edit the event with the pen icon as follows</li>
        <li>Check the box "Use registration button"</li>
        <li>
            If you wish to limit the number of permitted entries, fill in the "Maximum number of entries" field. Then it is not possible to register when the event is fully booked
        </li>
        <li>Finally click on the update button</li>
    </ul>
    <p/>
    To review the reports that have been made, proceed as follows:
    <ul>
        <li>Click on the event in the calendar (not the registration button)</li>
        <li>Click on the person icon (at the bottom it is the second icon from the right)</li>
        <li>Here is the list of the registrations that have been made</li>
        <li>You can edit and remove dancers from this list using the buttons on the left</li>
    </ul>
    Response emails were also sent upon registration.
    <ul>
        <li>When someone registers via the registration button in the calendar, a response email is sent to the email address of the applicant (not dance partners)</li>
        <li>A copy of the email was also sent to the organizer's email address, i.e. the one you logged in with</li>
        <li>In the email that was sent to the customer, there is also a cancellation link with which the customer can easily remove their registration</li>
        <li>If someone so wishes, we can change the functionality so that it is not possible for customer to cancel 
        14 days after the registration was been made, since then the notification is legally considered to be binding</li>
    </ul>

    <h3>Private lessons <i class="fa fa-graduation-cap"></i></h3>

    <h4>Mark yourself as a private teacher</h4>
    In the menu option "My profile" check the field <i>Is private teacher</i> and your name will be listed as a private teacher  
    under your region when customers click the <i class="fa fa-graduation-cap"/> button in the top right.
    <p/>
    <h4>Describe yourself as a private teacher</h4>
    When you have checked "Is private teacher", a text field appears where you can describe yourself as a private teacher.
    If you click on the camera, you can also upload a picture of yourself that you have saved on your computer or mobile phone.
    <p/>
    <h4>The private teacher's calendar</h4>
    As a private teacher, you also have access to your own calendar where you can enter times for your private lessons that students can then book in.
    The calendar is visible in the form of a calendar icon on the page where you are described as a probationary teacher (accessed via the school hat | region | name).
    <p/>
    <h5>Add private lesson to calendar</h5>
    To add lessons to your private-teacher-calendar, go to your private-teacher-calendar via the school-hat button at the top of the page. 
    You then press the  <i class="fa fa-plus"/> icon the far right. The rest works as when you add events to 
    the regular event calendar described above.
    <p/>
    <h5>How a customer books a private lesson via the calendar</h5>
    To book a private lesson, click on the calendar for the desired private teacher and then look for a desired free time.
    When you click on this private lesson, a registration form appears. When the student has filled in their information and sent the report 
    registration is registered and two emails are then sent, a confirmation email to the customer and an email to the private tutor. 
    When the registration has been completed, the time in the calendar is grayed out, which means that the time is 
    booked up and no one can then book this time.
    <p/>
    <h5>View/Edit/Delete the booking  <i class="fa fa-users"/></h5>
    In the calendar, you can click on the event as a logged-in user and get more information than customers can see (who are not logged in with your email).
    To see the name and possibly edit the person who booked, click on the <i class="fa fa-users"/> icon
    You can also delete the lesson completely if you want.
    <p/>
    <h5>Direct links to calendar</h5>
    For the customer, the calendar is visible via the calendar icon on your page for private lessons accessed via the school hat icon. The customer can also reach this by
    direct https-link https://tangosweden.se/calendar/Region/PRIVATE_LESSON/email, where Region is the Region you have given in your profile (Ex: Skåne) and email is the email 
    you logged in with (Exempel per.eskilson@gmail.com). With thosw two keys the link will be http://tangosweden.se/calendar/Skåme/PRIVATE_LESSON/per.eskilson@gmail.com.
    Right now this service is free, but will probaly have a small fee later.

    <h3>Suggestion box:</h3>
    If you have any great suggestions for changes to further develop the calendar,
    send these in an email to per.eskilson@gmail.com or to anita.e.dobi@gmail.com.
</div> 


export default () => {
    const [language, setLanguage] = useState('SV')
    return(
        <div className='content' style={{width:'100%', maxWidth:800, padding:'2%', margin:'auto'}}>
            {language==='SV'?<SwedishUsage />:<EnglishUsage/>}
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Button variant='outlined' color='inherit' onClick={()=>{setLanguage('SV')}}>SV</Button>
                <Button variant='outlined' color='inherit' onClick={()=>{setLanguage('EN')}}>EN</Button>
            </div>
        </div>
    )
}