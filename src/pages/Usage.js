export default props => 
<div style={{width:'90%', maxWidth:800, margin:'auto'}}>
    <h2 style={{textAlign:'center', width:'100%'}}>Manual för administratörer</h2>

<h3>    Manual tangosweden.se</h3>

    Hemsidan tangosweden.se har nu öppnat upp för samtliga orter i Sverige som önskar använda kalendern för att annonsera sina events.
    På förstasidan finns direktknappar för Malmö, Stockholm och Köpenhamn. Direktknapparna på förstasidan kommer eventuell ändras till
    de städer som använder kalendern mest. 
    Uppe i menyn till höger finns menyval som heter <i>All calendars</i> där ni ser samtliga kalendrar.
    Här finns också några orter som har egna kalendrar men som vill vara med.
    Kalendern för varje specifik ort kan nås via länken: 
    <p>
    https://tangosweden.se/calendar/<i>kalender-namn</i>
    </p>

, där <i>kalender-namn</i> är det som står i fältet calenderName i meny-punkt Settings. 
Variabeln calendarName är typsikt satt till värden som Stockholm, Malmo, Gothenburg, Helsingborg, Aas, Orkeljunga eller Halmstad
<br/>
För Malmö ser länken ut som följer:
<p/>
https://tangosweden.se/calendar/malmo



<h3>Lägga till och modifiera händelser</h3>

<h4>Login</h4>

För att lägga ut ditt event måste du först och främst fått login uppgifter som 
administratör. Dessa får du genom att skicka ett mail till mig Per Eskilson på email per.eskilson@gmail.com
eller Anita Dobi på anita.e.dobi@gmail.com. De uppgifter vi behöver från dig är de email adresser som du vill skall kunna logga in på hemsidan.
När vi erhållit email ger vi dig ett initialt password som du sen själv kan ändra på login sidan via en länk.

<h4>Settings</h4>

I menyn uppe till höger finns där en menypunkt Settings. I denna fyller du i kalender namn (calendarName) som normalt är din stads namn (använd ej å, ä och ö).
Om man vill ha 2 eller 3 kalendrar för varje stad går det också bra (tex lektioner, marathon, milongor). Värdet på calendarName måste dock bara bestå av ett ord utan å, ä och ö eftersom
vi använder strängen i http-länken för att hitta rätt kalender. Alla händelser som läggs in imed samma kalender namn (stad) läggs i samma kalender.
<p/>
I Settings sidan kan du också sätta in ditt färgval som dina händelser i kalendern skall visas med. 
Tanken är att varje arrangör gör sina egna unika färgval.
Färgerna anges med värdena yellow, blue, organe, brown etc eller i hex code  #722F37 (som är vinrött). 
Hexademimala färger finner du genom att googla på tex "hex color wine red". Då får massor av alternativ för vinrött. 
Du skall göra 3 färgval color, backgroundColorLight, backgroundColorDark. Värdet på color anger färgen på texten. 
Bakggrundensfärgen anges med 2 färger backgroundColorLight och backgroundColorDark. 
Bakgrunden tonas från ljus färg (backgorundColorLight) till mörk (backgroundColorDark).
Notera att COMPANY inte skall fyllas när du lägger till eller ändrar dina händelser. Om man fyller i detta fält kommer färgerna anta default värden 
Default värden finns bara definierade för Malmö och Lund regionen. Alla andra orter bör undvika att fylla i Company. 
Om intresset är stort kan vi eventuellt specialkod för Company även för andra orter än Malmö/Lund men sådant tar lite tid.

<h4>Lägga till events</h4>

Klicka på högermenyn (hamburgar-menyn) och klicka på Add. Då ser du en hemsida som är intuitivt att fylla i. 
Om du önskar repeterade events med en viss frekvens kryssar du i repeat. Då står kommer följet offset between events. 
Det betyder att om detta sättes till 1 och radio-knappen under sättes till weeks, så repeteras eventet varje vecka. 
Sättes offset till 2 betyder det varannan vecka. Fältet repeat number of times säger hur många gånger du villl att eventet skall repeteras.
 När du sen klickar på Submit så får du upp en lista på de datum som genererats. 
 Är du nöjd med dessa kan du klicka på “Add To Calendar”. 
 Vill du ta bort några före gör du detta först med minus-knappen till höger. 
 Notera att om man fyller i starttid 00:00 och sluttid 23:59 så står det “Whole day” i rutan för  

<h4>Ta bort events</h4>

Gå in i din kalender och klicka på eventet du vill ta bort. 
I rutan som kommer upp finns längst ned en Delete knapp. Klicka på denna och bekräfta sen ditt val med OK i pop-up boxen som visas på skärmen. 
Klart.

<h4>Ändra existerande events</h4>

Gå därefter till kalendern och klicka på eventet du vill ändra. I rutan som kommer upp finns längst ned en Update knapp. 
Klicka på denna och ändra de uppgifter du önskar och klicka på bekräfta sen ditt val med en Update knappen längst ned. Klart.

<h4>Kopiera existerande events</h4>

Kopiering av events är smart om du vill kopiera information från ett existerande event till nya datum och tidpunkter, 
typiskt en vecko-milonga från vårterminen som du vill även ha på höstterminenen med ungefär samma text. Detta är nu superenkelt med Copy knappen
som återanvänder gammal information och stoppar in som startvärden till nya events. 
<p/>
För att kopiera logga först in och gå sen till din kalendern och klicka på 
eventet som du vill kopiera data från.  I rutan som kommer upp finns längst ned en Update knapp. Klicka på denna så får du upp Update fönstret, 
Längst ner i denna fönser finnes en Copy knapp som du skall klicka på. Nu dyker det upp ett nytt fönster med förifylda data. Detta fönster ser precis ut 
som Add fönstret fast med data. Det enda du nu behöver fylla i är datum, tider och eventuellt repetition (repeat) med tillhörande frekvens i dagar, veckor eller månader.

<h4>Förslagslåda:</h4>
Om ni har bra förslag på ändringar eller vidareutveckling av kalendern kan ni skicka dessa i email till per.eskilson@gmail.com eller till anita.e.dobi@gmail.com.
</div>
