import React, {useState} from 'react';
import Button from '@mui/material/Button';

const SwedishUsage = () => 
<div>
    <h1 style={{textAlign:'center', color:'red'}}>Manual för administratörer</h1>

    <h3>Manual tangosweden.se</h3>

    Hemsidan tangosweden.se är öppen för alla arrangörer i Sverige/Danmark/Norge/Finland som önskar ha en tangokalender för sin ort eller region.
    På förstasidan finns knappar för de regioner och städer som är aktiva i kalendern. Helsingborg, Göteborg och Danmark har sina egna kalendrar 
    som även dessa nås via knappar på förstasidan.

    <h3>Lägga till, ta bort och ändra händelser</h3>

    <h4>Registrera dig som användare</h4>

    För att kunna lägga ut event måste du först ha ett konto. Detta får du genom att göra "Signup" i menyn uppe till höger.
    Vid Signup anger du din email och ett lösenord. Föreningar med många administratörer bör ha en gemensam email eftersom 
    eventen ägs av email-adressen, dvs endast den email som loggat in kan ändra eller ta bort event för denna email.  
    Önskar man ändra password för en given email gör man det via länken som finns på sidan "Signin".
    
    <h4>Logga in</h4>
.
    När man har skapat ett konto med Signin kan man logga in på tangosweden.se. Som inloggad har du tillgång till att registrera lägga till events 
    för din region och stad. Om du är DJ kan du ladda upp bild och skriva information om din själv.
    När ni loggat in första gången skall ni gå in i menyn <i>Settings</i>.
    
    <h3>Inställningar</h3>

    I menyn uppe till höger finns där en meny option "Settings". Här fyller du i stad och region (Skåne, Väst, Mitt eller Norr).
    Det finns ingen begränsning på antalet städer.  
    På förstasidan hos tangosweden.se finns knappar för regioner och städer.
    Endast städer och regioner som lagt in events visas med knappar.
    <p/>
    På Settings sidan gör du även färgval för text och bakgrund för dina händelser (Detta gäller ej användare i Stockholm som valt fixt färgschema). 
    Tanken är att varje arrangör gör sina egna unika färgval som representerar företaget/föreningen.
    Man knn göra 3 färgval: text-färg, bakgrundsfärg övre vänstra hörnet, backgroundsfärg nedre högra hörnet. 
    Bakgrundsfärgen tonas succesivt från färgen i övre högre ned till färgen i nedre vänstra hörnet.

    Värden på färgerna anges med text (ex red, green, blue, lightYellow), eller med ett hexadeimalt värde. 
    Hexasdecimala färg-värden består av ett #-tecken följt av 6 siffror 0-9 eller bokstäverna a-f (eller A-F), ex #fa23e8. 
    Hexademimala färger finner du genom att googla på något i stil med "hex color wine red". Då får du som sök-svar upp massor av hex-koder på nyanser av vinrött. 
    Totalt har du med hex-koder tillgång till drygt 16 miljoner färger. På settingssidan
    förhandsvisas dina färgval. Man kan även välja en ram av variabel tjocklek och färg. Ytterligare ett alternativ är att man använder en bild som bakgrund,
    men då måste bilden vara upplagd på nätet med en given url (ex: https://tangokompaniet.com/images/anna.jpg).
    Om man använder bilder kommer ingen ram visas.

    Tryck på <i>Save</i> knappen när du ärklar med dina val i inställningar (Settings). 
    Om du ändrat dina färgval i inställningar så ändras de bara på nya events eftersom varje event i kalendern får sina färger sparade när du lägger till dem. 
    Om du vill ändra färgen på redan existerande händelser skall du 
    kryssa i rutan "Change colors to latest settings" när du uppdaterar eventet (med pennan).
    Detta för att du skall ha möjlighet att uppdatera färg på nya events utan att för den skull ändra färgen på events som skapats tidigare. 
    Nya events får alltid automatiskt färgvalen som är definierade på sidan Settings.

    <h3>Lägga till events</h3>

    För att lägga till ett event går du som in i menyn uppe till höger och klickar på "Add Event". Fyll sen i dina data.
    Om du önskar lägga in repeterade händelser med en viss frekvens kryssar du i Repeat. Då visas 3 nya värden för offset, enhet och antal repetitioner. 
    Sättes tex <i>offset</i> till 2 och enhet till <i>weeks</i> betyder det varannan vecka. Fältet <i>repeat number of times</i> anger det antalet repetitioner med den angivna frekvensen.
    När du därefter klickar på knappen <i>Add to list</i>, så visas en lista på genererade datumen. 
    Du kan lägga till eller ta bort datum från listan. Därefter klickar du på knappen <i>ADD TO CALENDAR</i>
    Om du fyller i starttid 00:00 och sluttid 23:59 kommer tidsfältet visas för kunden som “Hela dagen” på mobilkalendern. 
    Detta kan vara lämpligt för heldags-events, festivaler och marathon som sträcker sig över men än en dag. För events längre än 11 timmar och som
    sträcker sig över flera dagar blir texten större i mobil-kalendern. Detta för att ge lite promotion till de som gör sig besväret att
    arrangera flerdagsevents.

    <h3>Ta bort events</h3>

    Den som är inloggad kan ändra eller ta bort sina event genom att klicka på eventet. Du kan endast ta bort events som din email äger, dvs events som skapats under den email du loggat på med.
    Det finns 2 typer av ta birt <i>En Spann</i> och <i>En spann med streck</i>.
    Den första <i>Spann</i>-knappen tar endast bort edet event du klickat på. 
    Den andra, <i>Spann med streck</i> knappen, tar bort hela listan som du skapade med <i>Add Event</i> och eventuellt <i>Repeat/Frequency</i>.
    
    <h3>Ändra existerande events</h3>

    Du kan ändra ditt event. Om du skapat en hel serie och vill ändra alla på samma sätt är det ochså möjligt.
    I fönstret som kommer upp finns längst ned en knapp som ser ut som en <i>Penna</i>. 
    Klicka på denna och uppdatera de uppgifter du önskar. Om du vill att samtliga events i serien skall uppdateras kryssar du i översta krysset på sidan.
    När du är klar med dina nya uppgifter klicka på <i>Update</i> knappen längst ned på settingssidan. Om du önskar uppdatera alla events i serien med samma data, 
    markera översta kryssboxen (Change all events in same group). En serie är den lista du skapar när du lägger till nya events med meny option
    <i>Add Event</i>. Här skapar du först en lista och som sen du sendan uppdaterar kalendern med. Alla envents som tillhör en lista får samma eventId.
    Detta eventId användes sedan om vi väljer att ta bort en hel serie. 
    
    <h3>Kopiera data till nya events</h3>

    För den som vill återanvända samma information från tidigare events till nya använda knappen <i>Kopiera</i>.
    Det typiska exemplet är att du har en återkommande milonga eller praktika under hösten som vill skall fortsätta med nästa säsong.
    <p/>
    Som inloggad klickar du då först på eventet som du vill kopiera data från och sen på knappen <i>Kopiera</i>. I fönstet som poppar upp finns nu förifylda data 
    samt tomma fält för datum och tid. Fyll i ditt nya datum och din nya tid samt eventuell upprepad frekvens med <i>Repeat</i>.
    För att underlätta för dem som glömt kopiera finns där kalender-historik bakåt i tiden. Dessa kalnder data nås om man klickar på klockan längst ned till vänster under kalendern.
    Historik finns för cirka 6 månader tillbaka. 

    <h3>Anmälan via knapp i kalendern</h3>

    När du är inloggad kan du lägga till en registreringsknapp så att dansare kan registrera sig till eventet. Du kan sen se och editera de registreringar som folk gjort.
    En dansare kan även registrera sin danspartner så hen slipper att göra detta själv.
    <p/>
    Gör så här för att introducera anmälan-knappen i ditt event.
    <ul>
        <li>Logga in med din e-post och password uppe i menyn till höger.</li>
        <li>Klicka på den händelsen du önskar ändra i kalendern</li>
        <li>Redigera nu händelsen med penn-ikonen enligt följande</li>
        <li>Markera rutan "Use registration button"</li>
        <li>Om du önskar begränsa antalet tillåtna anmälningar fyller du i fältet "Maximalt antal anmälningar". Då går det inte att anmäla sig när eventet är fullbokat
        </li>.
        <li>Klicka till sist på uppdaterings-knappen</li>
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

    <h3>Förslagslåda:</h3>
    Om du har några fantastiska förslag på ändringar för viddareutveckling av kalendern, 
    skicka dessa i en email till per.eskilson@gmail.com eller till anita.e.dobi@gmail.com.
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

    <h4>Signin</h4>
    Once you have created an account with Signin, you can log in to tangosweden.se. As logged in, you have access to register and add events 
    for your region and city. If you are a DJ, you can upload a picture and write information about yourself.
    When you log in for the first time, you must enter the <i>Settings</i> menu.

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
  
    <h3>Add new events</h3>

    Click on the menu (the menu at the top right corner) and click on the menu item "Add Event". Then you will see a website that is relatively easy to understand.
    If you wish to enter repeated events with a certain frequency, check repeat. Then 3 new values ​​for offset, unit and number of repetitions appear.
    This means that if this is set to 1 and the radio button below is set to weeks, the event is repeated every week.
    An offset of 2 and a unit set to 'weeks' is translated to every two weeks. The field <i>repeat number of times</i> specifies the number of times the event is to be repeated.
    When you then click on the button <i>Add to list</i>, you will get a list with the dates that have been generated.
    You can add or remove more dates to/from the list. When you are satisfied with the list, click the button <i>ADD TO CALENDAR</i>
    If you enter start time 00:00 and end time 23:59, the time field will be displayed to the customer as "Whole day" on the mobile calendar.
    This is suitable for weekend events, festivals and marathons that span more than one day. For events longer than 11 hours and which
    extends over several days, the text becomes larger in the mobile calendar. This is to give a little promotion to those who take the trouble to
    create multi-day events.

    hoices defined on the Settings page.

    <h3>Remove events</h3>

    Those who are logged in can change or delete their events by clicking on the event. You can only delete events that your email owns, i.e. events that were created under the email you signed in with.
    There are 2 types of ta birt <i>A Spann</i> and <i>A spann with dash</i>.
    The first <i>Span</i> button only removes the event you clicked on. 
    The second, the <i>Span with dashes</i> button, removes the entire list you created with <i>Add Event</i> and possibly <i>Repeat/Frequency</i>.


    <h3>Modify existing events</h3>

    You can change your existing events. If you have created a whole series and want to change them all in the same way, that is also possible.
    In the window that appears, at the bottom there is a button that looks like a <i>Pen</i>. 
    Click on this and update the information you want.
    When you are done with your new information, click the <i>Update</i> button at the bottom of the settings page. 
    If you want all events in the series to be updated, check the top checkbox with name
     <i>Change all events in same group</i>). A series is the list you create when you add new events with the menu option
    <i>Add Event</i>. Here you first create a list which you when ready the calendar with. All events that belong to a list get the same eventId.
    This eventId was then used if we choose to delete an entire series.
 
    <h3>Duplicate existing events to upcoming events</h3>

    For those who want to reuse the same information from previous events for new ones, use the <i>Copy</i> button.
    The typical example is that you have a recurring milonga or practika during the fall that you want to continue with next season.
    <p/>
    As logged in, you then first click on the event you want to copy data from and then on the <i>Copy</i> button. In the window that pops up there is now pre-filled data 
    as well as empty fields for date and time. Fill in your new date and time as well as any repeat frequency with <i>Repeat</i>.
    To make it easier for those who forgot to copy, there is a calendar history going back in time. These calendar data can be accessed by clicking on the 
    clock at the bottom left under the calendar.
    History is available for about 6 months back.

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