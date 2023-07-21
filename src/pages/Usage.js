import React, {useState} from 'react';

const swedishUsage = () => 
<div>
    <h2 style={{textAlign:'center', width:'100%'}}>Manual för administratörer</h2>

    <h3>    Manual tangosweden.se</h3>

    Hemsidan tangosweden.se är öppen för alla arrangörer i Sverige som önskar ha en egen tangokalender för sin ort eller region.
    Kalendern kan sen nås för varje specifik ort kan nås via länken: 
    <p>
    https://tangosweden.se/calendar/<i>kalender-namn</i>
    </p>
    , där <i>kalender-namn</i> är det värde som står i fältet calenderName under meny-punkt Settings. 
    Variabeln kalende-namn är normalt satt till värden som Stockholm, Malmo, Ystad, Helsingborg, Gothenburg, Jamtland, Halmstad. 
    <br/>
    För Malmö ser länken ut så här:
    <p/>
    https://tangosweden.se/calendar/malmo
    <p/>
    På förstasidan finns knappar för direktval av Skåne, Danmark, Malmö, Helsingborg, Ystad och Stockholm. Direktknapparna  
    kommer ändras till främst de större städer som använder kalendern. Alla städer har sin egen view som visas i  
    med meny-val <i>All calendars</i>. Det finns också några orter och föreningar som föredrar att använda sin egen kalender.
    Till dessa har vi länkar som nås via knappar längst ner på sidan <i>All calendars</i>. 
    Där finns också en länk till Danmarks tangokalender som ligger som kallar kalender-undersidan på tango.dk.
    


<h3>Lägga till, ta bort och ändra händelser</h3>

<h4>Login</h4>

För att lägga ut ett event måste du först ha fått login uppgifter som 
arrangör. Dessa får du genom att skicka ett mail till Per Eskilson på email per.eskilson@gmail.com
eller Anita Dobi på anita.e.dobi@gmail.com. De uppgifter vi behöver från dig är din email adress som du vill nyttja för att logga in på hemsidan.
När vi erhållit email skickar vi dig ett initialt password som du själv kan ändra på login sidan. När du loggat in första gången skall du 
gå in i menyn <h1>Settings</h1> och sätta värden så att dina kalender events hamnar i rätt stad. 

<h4>Settings</h4>

I menyn uppe till höger finns där en menypunkt Settings. I denna fyller du i din stad och region (skane, norr).
Värdet på stad och region skall enbart bestå av ett bokstäverna a-zA-Z utan mellarum och utan bokstäverna 
å, ä och ö. Dvs Göteborg måste stå som Goteborg eller Gothenburg. Om olika arrangörer (login-namn) lägger in events under samma calendarName (stad) 
hamnar i samma samma orts kalender. Där finns ingen begränsning på antalet tillåtna orter. På förstasidan dyker enbart upp Skåne, Danmark, 
samt städerna Malmö/Lund, Helsingborg, Ystad, Stockholm, Göteborg och Halmstad. Mindre orter ser du under menyn <i>Alla kalendrar</i>.
<p/>
På Settings sidan kan du även dina färgval för just dina händelser. 
Tanken är att varje arrangör gör sina egna unika färgval som representerar företaget/föreningen.
Du skall göra 3 färgval: color, backgroundColorLight och backgroundColorDark. Värdet <i>color</i> anger färgen på texten. 
Bakgrundsfärgen tonas från backgroundColorLight i vänster hörn till backgroundColorDark i höger hörn.

Värden på färgerna anges med text eller som hexadecimalt värde. Text färger är tex yellow, blue, organge, green, brow, lightBlue, lightYellow. 
Hexasdecimal färg-värden besstår av ett #-tecken följt av 6 siffror 0-9 eller bokstäverna A-F (eller samma resultat med små bokstäver a-f), ex #A322F5. 
Hexademimala färger finner du genom attgoogla på något i stil med "hex color wine red". Då får du som sök-svar upp massor av hex-koder på nyanser av vinrött. 
Totalt kan du med hex-koder möjlighet att välja mellan drygt 16 miljoner färger. På settingssidan
förhandsvisas dina färgval när du tryckt på <i>Save</i>. Vill du aktivera ditt nya settings färgval på existerande händelser i tabellen måste du 
för varje gammalt event du har gå in och uppdatera eventet manuellt och kryssa i rutan "Change colors to latest settings".
 Detta för att du skall ha möjlighet att välja färg för nya events utan att för den skull ändra färgen på de events som du tidigare skapat. 
 Nya events som skapats under meny-punkten <i>Add Event</i> får automatiskt de färgvalen som står i Settings.

 <h4>Automatiskt färgval (endast Malmö/Lund)</h4>
Notera att om du vill nyttja de färgval du gjort under <i>Settings</i> skall boxen näst längst ner med titeln <i>Use default settings</i> inte vara ikryssad.
Denna nyttjas enbart för de föreningar i Malmö/Lund som önskar förbestämda färgval som Per och Anita valt initialt för Lund/Malm. Om detta fält kryssas i kommer en ny rad Company.
Company kan tex sättas till CAMARIN, ARRIBA, URBANA, eller liknande. Med detta värde identifieras automatiskt det standard färgval som Per gjort till de olika arrangörerna.
Endast om fältet "Company" är tomt kommer dina färger tas från de värden som står i <i>Settings</i>.


<h4>Lägga till events</h4>

Klicka på menyn (hamburger-menyn uppe till höger) och klicka på menyunkt "Add Event". Då ser du en hemsida som är relativt enkel att förstå. 
Om du önskar lägga in repeterade events med en viss frekvens kryssar du i repeat. Då kommer det upp 3 nya värden för offset, enhete och antal repetitioner. 
Det betyder att om detta sättes till 1 och radio-knappen under sättes till weeks, så repeteras eventet varje vecka. 
Sättes offset till 2 och enhet till vecka betyder det varannan vecka. Fältet <i>repeat number of times</i> anger det antalet gånger eventet skall repeteras.
 När du därefter klickar på knappen <i>Add to list</i>, så får du upp en lista på de datum som genererats. 
 Du kan lägga till eller ta bort datum från listan. När du är nöjd med listan klickar du på knappen <i>ADD TO CALENDAR</i>
 Om du fyller i starttid 00:00 och sluttid 23:59 kommer tidsfältet visas för kunden som “Whole day” på mobilkalendern. 
 Detta är lämpligt för helg-events, festivaler och marathon som sträcker sig över men än en dag.

<h4>Ta bort events</h4>

Om du som inloggad klickar på eventet i kalendern finns där två knappar för att ta bort ditt/dina event/s i kalendern, <i>Delete</i> och <i>Delete All</i>.
<i>Delete</i> knappen tar bort enbart det event du klickat på, medan <i>Delete All</i> tar bort hela listan av den grupp events du skapat med <i>Add to calender</i>, 
, dvs om du kryssade <i>Repeat</i> så kommer samtliga repeterade events i denna serie tas bort. Du kan bara ta bort de events som du själv skapat, dvs 
de som skapats med inloggning under din email. Detta för att undvika att någon gör misstaget att ta bort någon annan event. Om ni är en förening där många 
skall kunna lägga till, ändra, eller ta bort events, är det bra att använda föreningens gemensamma email som login eftersom samtliga events
då skapas under samma email.


<h4>Ändra existerande events</h4>

Gå till kalendern och klicka på eventet du önskar ändra. I fönstret som kommer upp finns längst ned en Update knapp. 
Klicka på denna och ändra de uppgifter du önskar. Klcka därefter på Update knappen längst ned och sen är du klar.

<h4>Duplicera existerande events till framtiden</h4>

Om du vill skapa nya events med samma information som du haft förr kan du använda knappen <i>Copy</i>.
Typiskt har du en milonga som återkommer varje vecka under hösten som vill skall fortsätta under nästa säsong.
<p/>
Som inloggad klickar du på eventet som du vill kopiera data från. I fönstret som kommer klicka på <i>Update</i>  knappen längst ned. I update-fönstret klickar du på knappen 
<i>Copy</i> längst ned. Nu poppar det upp ett nytt fönster med förifylda data från eventet du klickade på. Detta fönster ser precis ut 
som <i>Add</i> fönstret fast med fälten för datum och tider tomma. Fyll i dina nya datum och tider och eventuellt med viken frekvens de de skall repeteras med <i>Repeat</i>.

<h4>Förslagslåda:</h4>
Om du har förslag på ändringar eller vidareutveckling av kalendern skicka dessa i email till per.eskilson@gmail.com eller till anita.e.dobi@gmail.com.
</div>

const englishUsage = () => <h4>Yet no translation to english. Coming up if demand comes in.</h4>



export default () => {
    const [language, setLanguage] = useState('SV')
    return(
        <div style={{width:'90%', maxWidth:800, margin:'auto'}}>
            {language==='SV'?swedishUsage():englishUsage()}
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <button className='button' onClick={()=>{setLanguage(language==='EN'?'SV':'EN')}}>{language}</button>
            </div>
        </div>
    )


}