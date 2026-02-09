import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SchoolIcon from '@mui/icons-material/School';
import { TbVinyl } from "react-icons/tb";

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';

export default () => 
<div>
    <h1 style={{textAlign:'center', color:'red'}}>Manual för administratörer</h1>
    <h5 style={{textAlign:'center', color:'red'}}>Shift language to english with button to the right</h5>

    <h4>Manual tangosweden.se</h4>
    Hemsidan tangosweden.se är öppen för arrangörer i Sverige/Danmark/Norge/Finland som önskar ha en tangokalender för sin ort.
    På förstasidan finns knappar för de regioner och städer som är aktiva i kalendern. 
    Helsingborg, Göteborg och Danmark har sina egna kalendrar 
    som även dessa nås via knappar på förstasidan.
    <p/>

    <h5>Registrera dig som användare</h5>

    För att kunna lägga in en händelse i kalendern måste du först ha ett konto. 
    Detta erhålles du genom att göra "Signup" i menyn uppe till höger.
    Vid Signup anger du din email och ett lösenord. Föreningar med många administratörer bör ha en gemensam email eftersom 
    händelsen ägs av email-adressen, dvs endast den email som loggat in kan ändra eller ta bort händelse för denna email.  
    Önskar man ändra password för en given email gör man det via länken som finns på sidan "Signin".
    När du loggat in första gången skall du  gå in i menyn <i>Settings</i> och sätta din stad och region.
    För Stockholm skall både stad och region stå som Stockholm.
    <p/>    
    <h5>Logga in</h5>

    När man har skapat ett konto med Signup kan man logga in genom att klicka på Signin och ange din 
    email och sitt lösenord. Som inloggad har du tillgång till att lägga till händelser och makera dig som DJ eller Privatlärare.
        <p/>
    <h4>Inställningar</h4>
    I menyn uppe till höger finns där en meny option "Settings". Här fyller du i stad och region (Skåne, Västra Götaland, Mitt, Norr, ...).
    För Stockholm skall både stad och region stå som Stockholm. Det finns ingen begränsning på antalet städer. 
    På förstasidan hos tangosweden.se finns knappar för de regioner som har händelser.
    Om du är DJ eller privatlärare kan du kryssa i rutan för detta samt lägga till foto och beskrivande text.
    Då finns du synlig som DJ eller privatlärare via undersidorna som nås via <SchoolIcon/> och <TbVinyl /> längst uppe på sidan.
    Tryck på knappen <i>Save</i> när du är klar med dina val. 
    <p/>
    <h4>Lägg till / ändra / ta bort händelse</h4>

    <h5>Lägga till händelse &nbsp; <AddIcon /></h5>

    <ol>
        <li>Logga på med email och lösenord</li>
        <li>Klicka på din stads eller regions kalender</li>
        <li>Klicka på <AddIcon /> ikonen ute till höger i kalendern för din stad/region.</li>
        <li>Fyll i formuläret med data för din händelse</li>
        <li>Klicka på <button>ADD TO LIST</button></li>
        <li>Klicka på <button>ADD TO CALENDAR</button></li>
        <li>Efter detta är händelsen inlagd och visas nu i kalendern</li>
    </ol>
    <h5>Varför först skapa en lista ?</h5>
    För upprepade händelser med samma innehåll är det onödigt att skapa ett enskild händelse åt gången. 
    Man kan då kan man använda Repeat funktionen som beskrivs nedan. Då kommer det skapas en lista fram till slutdatumet 
    för repetitonerna. Datumen kan viefieras innan man lägger till listan till kalendern. 
    Alla händelser i den grupp som listan formar får samma eventId. Om man efterföljande
    vill ändra alla sina händelser med samma titel och beskrivning och plats kan när man editerar händelsen med <EditIcon /> kryssa i 
    boxen <i>Change multiple events at one time (special case)</i>. När man därefter klockar på update uppdateas alla händelser 
    som tillhör gruppen samtidigt. Om man klicka på <DeleteSweepIcon /> tas samtliga händelse i gruppen bort samtidigt. 
    
    <h5>Repeterade händelser (grupp-hantering)</h5>
    Om du önskar lägga in repeterade händelser med en viss frekvens kryssar du i Repeat. Då visas 3 
    nya fält för Varje, enhet och sista repetionsdag. 
    Om du vill att ditt händelse skall repeteras varje vecka fram till 2026-05-31 så sätter du <i>Every</i> till 1, enhet till <i>weeks</i>
    och <i> Last repeat date </i> till 2026-05-31. Klicka därefter på knappen <button>ADD TO LIST</button>. 
    Då visas din grupp/lista med repeterade datum fram till 2026-05-31. 
    När du är klar med gruppen/listan sänder du den slutligen till kalendern med knappen <button>ADD TO CALENDAR</button>.
    <p/>
    <h5>Ta bort enstaka händelser från listan</h5>
    Önskar du ta bort en händelse från listan ovan klickar du på minus knappen till höger om händelsen i listan.
    Om du önskar rensa hela listan du på knappen <button>CLEAR LIST</button> under listan. 
    När du är klar med listan skickar du den till kalendern 
    med knappen <button>ADD TO CALENDAR</button> under formuläret.
    <p/>
    Samtliga händelser i en list tillhör en och samma grupp. Detta är praktiskt om man senare vill ändrat värden 
    för hela gruppen (<i>Change multiple events at one time (special case)</i>) eller ta bort samtliga händelse i hela gruppen <DeleteSweepIcon/>. 
    <p/>
    <h5>Heldagshändelse</h5>
    Om du fyller i starttid 00:00 och sluttid 23:59 kommer tidsfältet visas ditt händelse som <i>Hela dagen</i> på mobilkalendern. 
    Detta kan vara lämpligt för heldags-händelser, festivaler och maraton som sträcker sig över mer än en dag. För händelser som varar 
    längre än 11 timmar och som sträcker sig över flera dagar blir texten större i mobil-kalendern. Detta för att ge lite extra 
    promotion till dem som gör sig besväret att arrangera flerdagarsevenemang.
    <p/>

    <h5>Ändra händelse &nbsp;<EditIcon /></h5>

    Som inloggad kan du ändra din händelse genom att klicka på händelsen i kalendern och därefter klicka på edit knappen <EditIcon />.
    Då dyker ditt formulär med händelsen upp. Om du önskar ändra en hel grupp av händelsen skall du kryssa i 
    <i>Change multiple events at one time (special case)</i> överst i formuläret.
    När du är klar med dina nya uppdaterade uppgifter klicka på <button>UPDATE</button> knappen längst ned. 
    Efter detta återvänder sidan till den vecka i kalendern som du just ändrade.
    <p/>
    
    <h5>Kopiera händelse &nbsp;<ContentCopyIcon/></h5>

    Med knappen <ContentCopyIcon/> kan du kopiera data från en existerande händelse in i ett nytt.
    Det typiska exemplet är att du har en återkommande milonga eller praktika under hösten 
    som önskar skall fortsätta nästa säsong med samma titel plats och beskrivning.
    Då behöver du bara fylla i tiderna. Processen beskrivs nedan.
    <p/>
    <ol>
    <li>Klickar du på händelsen i kalendern som du önskar kopiera data från.</li> 
    <li>Klicka på kopiera knappen <ContentCopyIcon/></li>  
    <li>I formuläret finns nu data för det gamla eventet men tomma fält för datum och tid.</li>    
    <li>Fyll i ditt ny datum och din nya tid (samt för upprepade händelser <i>Repeat</i>)</li> 
    <li>För upprepade händelser kryssa i <i>Repeat</i>)</li> 
    <li>Click on the button <i>ADD TO LIST</i></li>
    <li>Click on the button <i>ADD TO CALENDAR</i></li>

    </ol>
    För att underlätta för dem som glömt kopiera finns där kalender-historik bakåt i tiden. 
    Events före dagens datum visas om man klickar på <i class="fa fa-history"></i> 
    längst upp till höger i kalendern. Historik visas då cirka 6 månader tillbaka. 
    <p/>
    <h5>Ta bort händelse&nbsp;&nbsp;<DeleteIcon /></h5>
    Som inloggad kan ändra eller ta bort dina händelser.
    <ol>
        <li>Klicka på händelsen i kalendern.</li>
        <li>Klicka på <DeleteIcon /></li>
    </ol>
    Om du önskar ta bort samtliga händelser i en grupp klickar du på <DeleteSweepIcon />.
    Med en grupp menas hela den lista du skapade med 
    <i>ADD TO LIST</i> när händlsen/händelserna upprättades.
    <p/>

    <h4>Anmälan till händelse via knapp i kalendern</h4>

    När du är inloggad kan du lägga till en anmälningknapp så att dansare kan anmäla 
    sig till händelsen. Du kan sen som inloggad se och editera de registreringar som gjorts.
    En dansare kan även anmöla sin danspartner så att hen slipper göra det själv.
    <p/>
    Gör så här för att introducera anmälan-knappen i ditt händelse.
    <ol>
        <li>Du skall vara inloggad.</li>
        <li>Klicka på händelsen du önskar ändra i kalendern</li>
        <li>Redigera händelsen med <EditIcon /> enligt följande</li>
        <li>Markera rutan "Use registration button"</li>
        <li>Om du önskar begränsa antalet tillåtna anmälningar fyller du i fältet "Maximalt antal anmälningar".
             Då går det inte att anmäla sig när händelsen är fullbokat.</li>
        <li>Klicka på uppdaterings-knappen</li>
    </ol>
    <p/>
    För att granska de anmälningar som gjorts gör du enligt följande:
    <ol>
        <li>Du skall vara inloggad.</li>
        <li>Klicka på händelsen i kalendern (inte på knappen anmälan).</li>
        <li>Klicka på <PeopleAltIcon /></li>
        <li>Nu ser du listan på de anmälningar som gjorts. </li>
        <li>Man kan editera eller ta bort anmälningar från den här listan med knapparna <EditIcon /> och <DeleteIcon />till vänster.</li>
    </ol>
    Det sänds svars-mails till den som anmält sig.
    <ul>
            <li>När någon anmäler sig via registreringsknappen i kalendern så sändes ett svars-mail ut till anmälarens email-adress (inte dans-partners)</li>
            <li>Det sändes även en kopia av mailet till organisatörens email-adress, dvs den som ni loggat in med.</li>
            <li>I mailet som sändes till kund finns även en cancellerings-länk med vilken man kan ta bort sin anmälan.</li>
            <li>P.S. Om någon så önskar kan vi ändra funktionaliteten så att det inte går att cancellera sin anmälan 
            14 dagar efter anmälan gjorts efetersom då anses lagmässigt anmälan vara bindande.</li>
    </ul>
  </div>