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

    <h4>Login</h4>

    För att lägga ut ett event måste ha login-uppgifter som du erhåller genom att skicka ett mail till Per Eskilson på email per.eskilson@gmail.com
    eller Anita Dobi på anita.e.dobi@gmail.com. De enda uppgifter vi behöver från dig är den email-adress ni vill nyttja för att logga in när ni
    lägger till events i kalendern. Föreningar med många administratörer bör ha en gemensam email för föreningen så att alla administratörer
    kan ändra eller ta bort events. När vi erhållit er email skickar vi dig ett initialt password som ni själva därefter kan ändra på login sidan. 
    När ni loggat in första gången skall ni gå in i menyn <i>Settings</i> och sätta värden på stad, region och färger så att dina events. 
    
    <h3>Settings</h3>

    I menyn uppe till höger finns där en menypunkt Settings. I denna fyller du i stad och region (Skåne, Väst, Mitt eller Norr).
    Det finns för nuvarande bara 4 regioner men detta kan ändras. Det finns ingen begränsning på antalet städer.  
    På förstasidan hos tangosweden.se finns knappar för regioner och städer.
    Städer eller regioner som för tillfället saknar uppkommande arrangemang visas ej med knappar i kalendern.
    <p/>
    På Settings sidan gör du även färgval för text och bakgrund för dina händelser. 
    Tanken är att varje arrangör gör sina egna unika färgval som representerar företaget/föreningen.
    Du skall göra 3 färgval: color, backgroundColorLight och backgroundColorDark. Värdet <i>color</i> anger färgen på texten. 
    Bakgrundsfärgen tonas från backgroundColorLight i vänster hörn till backgroundColorDark i höger hörn.

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

    Gå in i menyn uppe till höger och klicka på "Add Event". Fyll sen i dina data.
    Om du önskar lägga in repeterade händelser med en viss frekvens kryssar du i Repeat. Då visas 3 nya värden för offset, enhet och antal repetitioner. 
    Sättes tex <i>offset</i> till 2 och enhet till <i>weeks</i> betyder det varannan vecka. Fältet <i>repeat number of times</i> anger det antalet repetitioner med den angivna frekvensen.
    När du därefter klickar på knappen <i>Add to list</i>, så visas en lista på genererade datumen. 
    Du kan lägga till eller ta bort datum från listan. Därefter klickar du på knappen <i>ADD TO CALENDAR</i>
    Om du fyller i starttid 00:00 och sluttid 23:59 kommer tidsfältet visas för kunden som “Hela dagen” på mobilkalendern. 
    Detta kan vara lämpligt för heldags-events, festivaler och marathon som sträcker sig över men än en dag. För events längre än 11 timmar och som
    sträcker sig över flera dagar blir texten större i mobil-kalendern. Detta för att ge lite promotion till de som gör sig besväret att
    arrangera flerdagsevents.

    <h3>Ta bort events</h3>

    Om du som inloggad klickar på eventet i kalendern finns där två knappar för att ta bort ditt/dina event/s i kalendern, <i>Spann</i> och <i>Spann med streck</i>.
    Den första knappen <i>Spann</i> knappen tar bort enbart det event du klickat på. Den andra knappen <i>Spann med streck</i> tar bort hela serien du skapat då du använd <i>Repeat</i> 
    Du har bara möjlighet att ta bort de events som skapats under din email-adress (som ägs av emailen du loggat in med). Detta för att undvika att man av misttag 
    tar bort någon annan arrangörs events. Om ni är en förening med många   administratörer så är det lämpligt att använda föreningens gemensamma email
    som login eftersom alla då kan ändra eller ta bort existerande events.


    <h3>Ändra existerande events</h3>

    Logga in på kalendern och klicka på eventet du önskar ändra. I fönstret som kommer upp finns längst ned en knapp som ser ut som en <i>Penna</i>. 
    Klicka på denna och uppdatera de uppgifter du önskar. Klicka därefter på Update knappen längst ned. Om du önskar uppdatera alla events i serien med samma data, 
    markera översta kryssboxen. En serie är den lista du skapar när du lägger till nya events med <i>Add</i> meny option och som du därefter lägger till kalendern med 
    
    <h3>Kopiera data till nya events</h3>

    Om du vill återanvända samma information som du haft förr kan du använda knappen <i>Kopiera</i>.
    Typiskt har du en milonga eller praktika som återkommer varje vecka under hösten och som vill skall fortsätta under nästa säsong.
    <p/>
    Som inloggad klickar du då först på eventet som du vill kopiera data från och sen på knappen <i>Kopiera</i>. I fönstet som poppar upp finns nu förifylda data 
    samt tomma fält för datum och tid. Fyll i ditt nya datum och din nya tid samt eventuell upprepad frekvens med <i>Repeat</i>.

    <h3>Använda registreringsknappen och granska registreringar</h3>

    När du är inloggad kan du lägga till en registreringsknapp så att dansare kan registrera sig till eventet. Du kan sen se och editera de registreringar som folk gjort.
    En dansare kan även registrera sin danspartner så hen slipper att göra detta själv.
    <p/>
    Gör så här för att introducera registreringsknappen i ditt event.
    <ul>
        <li>Logga in med din e-post och password uppe i menyn till höger.</li>
        <li>Klicka på den händelsen du önskar ändra i kalendern</li>
        <li>Redigera nu händelsen med pennikonen enligt följande</li>
        <li>Markera rutan "Use registration button"</li>
        <li>Om du önskar begränsa antalet tillåtna dansare fyller du i "Maximalt antal registrerade". Då går det inte att boka om det är fullbokat</li>
        <li>Klicka på uppdateringsknappen</li>
    </ul>
    <p/>
    För att granska de registreringar som gjorts gör du enligt följande:
    <ul>
        <li>Klicka på händelsen i kalendern (inte på registreringsknappen).</li>
        <li>Klicka på personikonen (längst ned är det andra iconen från höger)</li>
        <li>Här är listan på de registreringar som gjorts. </li>
        <li>Man kan redigera och ta bort dansare från den här listan med knapparna till vänster.</li>
    </ul>

    <h3>Förslagslåda:</h3>
    Om du har några fantastiska förslag på ändringar för viddareutveckling av kalendern, 
    skicka dessa i en email till per.eskilson@gmail.com eller till anita.e.dobi@gmail.com.
</div>

const EnglishUsage = () => 
<div>
    <h1 style={{textAlign:'center', color:'red'}}>Manual for administrators</h1>

    <h3>Manual for tangosweden.se</h3>

    The website tangosweden.se is open to all oranizers in Sweden/Denmark/Norway/Finland that wish to have their own tango calendar for their locality or region.
    On the front page there are direct-buttons for all the regions and cities that are in the loaded  calendar. Denmark, Gothenburg and Halmstad have their own 
    calenders. The buttons for those redirect you to their home pages or calendars.
    
    <h3>Add, change and remove events</h3>

    <h4>Login</h4>

    To post an event, you must first receive login details such as
    organizer. You can obtain these by sending an email to Per Eskilson at email per.eskilson@gmail.com
    or Anita Dobi at anita.e.dobi@gmail.com. The information we need from you is the email address that you want to use for login to the tangosweden.se when you
    want to add events for your organisation. Please use a commona common email for the whole organization so that different actors are able to change/delete events.
    After we received your email, we will send you an initial password, which you can change on the login page. When you log in for the first time, you must
    go to the <i>Settings</i> menu and initialize values ​for region and city.
    Here you also set the color for text and background for your events in the calendar.

    <h3>Settings</h3>

    In the menu at the top right there is a menu item Settings. In this you fill in the city and region. 
    Currently there are 4 regions, Skåne, West, Middle or North. There is no limitations on the number of cities.
    On the front page of tangosweden.se there are buttons for all active regions and cities.
    Cities or regions that with no upcoming events are not shown with buttons in the calendar.
    <p/>
    On the Settings page, you make color choices for text and background for your events in the calendar.
    The idea is that each organizer uses their own unique colors.
    You must make 3 color choices: color, backgroundColorLight and backgroundColorDark. The <i>color</i> value specifies the color of the text.
    The background color fades from backgroundColorLight in the upper left corner to backgroundColorDark in the lower right corner.

    The values ​​of the colors are specified with text or as a hexadecimal value. For example, you can choose simple text colors such as yellow, blue, organge, green, brow, lightBlue, lightYellow, etc.
    You can also use hexadecimal color values ​​consisting of a # sign followed by 6 numbers 0-9 or the letters A-F (alternatively the same result with lowercase letters a-f), eg #A322F5.
    You can find hexadecimal colors by googling something like "hex color wine red". Then you will get lots of hex codes for shades of burgundy as a search response.
    In total, you can choose from roughly 16 million colors with hex codes. On the settings page
    your color choices shown in a square. You also have theoption to chose a solid frame with variable a particular thickness and color.
    Another option is to use an image as a background (you give an url to the image).
    If you use images, no frame will be displayed for images.

    Don't forget to press <i>Save</i> when you have finished testing your choices in settings (Settings).
    If you changed your color choices in settings, they will only change on new events. If you also want to change the color of an already existing event, you must
    go in and update the event and check the checkbox "Change colors to latest settings".
    This will ensure to update the color from the latest values in the settings meny.
    New events created under the menu item <i>Add Event</i> will always take the color choices from the Settings menu.
  
    <h3>Add new events</h3>

    Click on the menu (the hamburger menu at the top right) and click on the menu item "Add Event". Then you will see a website that is relatively easy to understand.
    If you wish to enter repeated events with a certain frequency, check repeat. Then 3 new values ​​for offset, unit and number of repetitions appear.
    This means that if this is set to 1 and the radio button below is set to weeks, the event is repeated every week.
    An offset of 2 and a unit set to 'weeks' is translated to every two weeks. The field <i>repeat number of times</i> specifies the number of times the event is to be repeated.
    When you then click on the button <i>Add to list</i>, you will get a list with the dates that have been generated.
    You can add or remove more dates to/from the list. When you are satisfied with the list, click the button <i>ADD TO CALENDAR</i>
    If you enter start time 00:00 and end time 23:59, the time field will be displayed to the customer as "Whole day" on the mobile calendar.
    This is suitable for weekend events, festivals and marathons that span more than one day. For events longer than 11 hours and which
    extends over several days, the text becomes larger in the mobile calendar. This is to give a little promotion to those who take the trouble to
    create multi-day events.
    <h3>Remove events</h3>

    If you click on the event in the calendar as logged in, there are two buttons to delete your event(s) in the calendar.
    The first delete button deletes only the single event you clicked on. The second button (Sweep delete) deletes the entire series of events you created
    if you checked <i>Repeat</i> button when adding a series of events. Then the whole series is deleted. You can only delete the events created owned by your logi email address
    This is to avoid other organizer by mistake removing your events. For oragnizations with many
    administratiors it is good that all users use the same email to login. Then all administrations can  
    handle change or delete all evetns for the organization.

    <h3>Modify existing events</h3>

    Log in to the calendar and go to the event you wish to change. In the window that appears, there is an PEN-button at the bottom.
    Click on this and change the information you want. Then click on the Update button at the bottom.
     
    <h3>Duplicate contents from existing events to upcoming events</h3>

    If you want to create new events with the same data as you had before, use the COPY-button.
    Typically, you have a milonga or practia that occurs every week during the fall and that you want to continue during the next season.
    <p/>
    As logged in, you then first click on the event from which you want to copy data. In the window that appears, click the COPY-button.
    In the windo that pops up there is a prefilled template but with date and time fields empty.
    Fill in your new dates and times and any frequency they are to be repeated with <i>Repeat</i>.
    Then you just continue as you did with Add.
    

 
    <h3>Duplicate contents from existing events to upcoming events</h3>

    If you want to create new events with the same data as you had before, use the COPY-button.
    Typically, you have a milonga or practia that occurs every week during the fall and that you want to continue during the next season.
    <p/>
    As logged in, you then first click on the event from which you want to copy data. In the window that appears, click the COPY-button.
    In the windo that pops up there is a prefilled template but with date and time fields empty.
    Fill in your new dates and times and any frequency they are to be repeated with <i>Repeat</i>.
    Then you just continue as you did with Add.

    <h3>Use the registration button and review registrations</h3>

    Once logged in, you can add a registration button so dancers can register for the event. You can then see and edit the registrations that people have made.
    A dancer can also register his dance partner so he does not have to do this himself.
    <p/>
    Follow these steps to introduce the registration button in your event.
    <ul>
        <li>Log in with your e-mail and password in the menu on the right.</li>
        <li>Click on the event you wish to change in the calendar</li>
        <li>Now edit the pencil icon event as follows</li>
        <li>Check the box "Use registration button"</li>
        <li>If you wish to limit the number of permitted dancers, fill in "Maximum number of registered". Then it is not possible to book if it is fully booked</li>
        <li>Click the refresh button</li>
    </ul>
    <p/>
    To review the registrations that have been made, proceed as follows:
    <ul>
        <li>Click on the event in the calendar (not the registration button).</li>
        <li>Click on the person icon (at the bottom it is the second icon from the right)</li>
        <li>Here you now have the list of registrations that have been made. </li>
        <li>You can edit and remove dancers from this list using the edit and remove buttons.</li>
    </ul>



    <h3>Proposals:</h3>
    If you have suggestions for changes or further development of the calendar, send them by email to per.eskilson@gmail.com or to anita.e.dobi@gmail.com.</div>



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