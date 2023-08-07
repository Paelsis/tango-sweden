import React, {useState} from 'react';

const swedishUsage = () => 
<div>
    <h2 style={{textAlign:'center', width:'100%'}}>Manual för administratörer</h2>

    <h3>    Manual tangosweden.se</h3>

    Hemsidan tangosweden.se är öppen för alla arrangörer i Sverige/Danmark/Norge/Finland som önskar ha en egen tangokalender för sin ort eller region.
    På förstasidan finns knappar för alla regioner och städer som finns i kalendern. Alla regioner och städer filtrerar fram  
    sina egna events. Det finns också några orter och föreningar som hare en egen kalender (Danmark, Göteborg, Halmstad).
    Till städer har vi externa länkar som nås via knapparna. Där finns också en länk till Danmarks tangokalender 
    som ligger som kallar kalender-undersidan på tango.dk.
    

<h3>Lägga till, ta bort och ändra händelser</h3>

<h4>Login</h4>

För att lägga ut ett event måste du först få login-uppgifter som 
arrangör. Dessa erhåller du genom att skicka ett mail till Per Eskilson på email per.eskilson@gmail.com
eller Anita Dobi på anita.e.dobi@gmail.com. De enda uppgifter vi behöver från dig är den email-adress som du/ni vill nyttja för att logga in på hemsidan när ni
lägger in events för er förening. Det är bra om ni har en gemensam email för hela föreningen om olika personer skall kunna ändra/ta bort events.
När vi erhållit email skickar vi dig ett initialt password som du/ni själv därefter kan ändra på login sidan. När du/ni loggat in första gången skall du 
gå in i menyn <i>Settings</i> och sätta värden så att dina kalender events hamnar i rätt region och stad. 
Här sätter du även färg på text och bakgrund för dina events i kalendern. 

<h3>Settings</h3>

I menyn uppe till höger finns där en menypunkt Settings. I denna fyller du i region (Skåne, Väst, Mitt eller Norr) samt stad.
Det finns 4 regioner men ingen begränsning på antalet städer.  
På förstasidan hos tangosweden.se dyker sen först knappar för regionerna upp och därefter knappar för städerna.
Städer eller regioner som saknar för tillfället inte har några uppkommande arrangemang syns ej i kalendern.
<p/>
På Settings sidan gör du färgvalen på text och bakgrund för dina händelser. 
Tanken är att varje arrangör använder sina egna unika färgval som representerar företaget/föreningen.
Du skall göra 3 färgval: color, backgroundColorLight och backgroundColorDark. Värdet <i>color</i> anger färgen på texten. 
Bakgrundsfärgen tonas från backgroundColorLight i vänster hörn till backgroundColorDark i höger hörn.

Värden på färgerna anges med text eller som hexadecimalt värde. Som exempel kan du välja enkla text färger som yellow, blue, organge, green, brow, lightBlue, lightYellow, etc. 
Man kan också använda hexasdecimala färg-värden besstår av ett #-tecken följt av 6 siffror 0-9 eller bokstäverna A-F (alternativt samma resultat med små bokstäver a-f), ex #A322F5. 
Hexademimala färger finner du genom att googla på något i stil med "hex color wine red". Då får du som sök-svar upp massor av hex-koder på nyanser av vinrött. 
Totalt kan du med hex-koder möjlighet att välja mellan drygt 16 miljoner färger. På settingssidan
förhandsvisas dina färgval. Glöm inte trycka på  <i>Save</i> när du testat klart dina färgval. 
Om du ändrat dina färgval så ändras de bara på nya events. Om du även vill ändra färgen på redan skapade händelser måste du 
för varje gammalt event du har gå in och uppdatera eventet manuellt samt kryssa i rutan "Change colors to latest settings".
Detta för att du skall ha möjlighet att uppdatera färg på nya events utan att för den skull ändra färgen på de events som tidigare skapats. 
Nya events som skapats under meny-punkten <i>Add Event</i> får automatiskt de färgvalen som står i Settings.

 <h4>Automatiskt färgval (endast Malmö/Lund)</h4>
Notera att om du vill nyttja de färgval du gjort under <i>Settings</i> skall boxen näst längst ner med titeln <i>Use default settings</i> inte vara ikryssad.
Denna nyttjas enbart för de föreningar i Malmö/Lund som önskar förbestämda färgval som Per och Anita valt initialt för Lund/Malmö. Om detta fält kryssas i kommer en ny rad Company.
Company kan tex sättas till CAMARIN, ARRIBA, URBANA, eller liknande. Med detta värde identifieras automatiskt det standard färgval som Per gjort till de olika arrangörerna.
Endast om fältet "Company" är tomt kommer dina färger tas från de värden som står i <i>Settings</i>.

<h3>Lägga till events</h3>

Klicka på menyn (hamburger-menyn uppe till höger) och klicka på menyunkt "Add Event". Då ser du en hemsida som är relativt enkel att förstå. 
Om du önskar lägga in repeterade events med en viss frekvens kryssar du i repeat. Då kommer det upp 3 nya värden för offset, enhete och antal repetitioner. 
Det betyder att om detta sättes till 1 och radio-knappen under sättes till weeks, så repeteras eventet varje vecka. 
Sättes offset till 2 och enhet till vecka betyder det varannan vecka. Fältet <i>repeat number of times</i> anger det antalet gånger eventet skall repeteras.
När du därefter klickar på knappen <i>Add to list</i>, så får du upp en lista på de datum som genererats. 
Du kan lägga till eller ta bort datum från listan. När du är nöjd med listan klickar du på knappen <i>ADD TO CALENDAR</i>
Om du fyller i starttid 00:00 och sluttid 23:59 kommer tidsfältet visas för kunden som “Whole day” på mobilkalendern. 
Detta är lämpligt för helg-events, festivaler och marathon som sträcker sig över men än en dag. För events längre än 11 timmar och som
sträcker sig över flera dagar blir texten större i mobil-kalendern. Detta för att ge lite promotion till de som gör sig besväret att
skapa flerdagsevents.

<h3>Ta bort events</h3>

Om du som inloggad klickar på eventet i kalendern finns där två knappar för att ta bort ditt/dina event/s i kalendern, <i>Delete</i> och <i>Delete All</i>.
Den första knappen <i>Delete</i> knappen tar bort enbart det event du klickat på. Den anrdra knappen <i>Delete All</i> tar bort hela serien av eventsdu skapat med <i>Add to calender</i>, 
om du kryssade i <i>Repeat</i>. Då tas samtliga repeterade events skapade i denna serie att tas bort. Du kan bara ta bort de events som skapats under den email-adress som du 
loggat på med, dvs events som ägs av denna email. Detta för att undvika att någon arrangör gör misstaget att ta bort någon annans event. Om ni är en förening där många 
personer i föreningen skall kunna lägga till, ändra, eller ta bort events, då är det bra att använda föreningens gemensamma email som login eftersom samtliga events
då skapats under ett och samma email.


<h3>Ändra existerande events</h3>

Logga in på kalendern och gå till eventet du önskar ändra. I fönstret som kommer upp finns längst ned en Update knapp. 
Klicka på denna och ändra de uppgifter du önskar. Klicka därefter på Update knappen längst ned.

<h3>Duplicera existerande events till framtiden</h3>

Om du vill skapa nya events med samma information som du haft förr kan du använda knappen <i>Copy</i>.
Typiskt har du en milonga eller praktika som återkommer varje vecka under hösten och som vill skall fortsätta under nästa säsong.
<p/>
Som inloggad klickar du då först på eventet som du vill kopiera data från. I fönstret som kommer upp klicka på <i>Update</i>  knappen längst ned.
Längst ned i fönstret klickar du därefter på knappen <i>Copy</i> l. I fönstet som poppar upp finns förifylda data som du nu kan ändra på. 
Detta fönster ser precis ut som <i>Add</i> fönstret fast med fälten för datum och tider tomma. Fyll i dina nya datum och tider och eventuell frekvens de de skall repeteras med <i>Repeat</i>.
Sen fortsätter du bara som du gjorde med Add.

<h3>Förslagslåda:</h3>
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