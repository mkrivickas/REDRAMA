REDRAMA - Asmeninio biudžeto analizės aplikacija
Versija 0.1
Apie aplikaciją
Tai - asmeninio biudžeto analizės aplikacija skirta išmintingai valdyti savo finansus: vesti pajamų ir išlaidų biudžetą. Kiekvienas aplikacijos vartotojas turi galimybę realiu laiku patikrinti bendro biudžeto likutį, susipažinti su jį analizuojančiais grafikais. Aplikacijoje vartotojas gali priskirti tam tikras sumas skirtingoms kategorijoms, o vėliau fiksuoti savo išlaidas, stengiantis neviršyti numatyto biudžeto. šiuo metu aplikacija yra pritaikyta naudotis namų arba nešiojamame kompiuteryje, bet artimiausiuose planuose numatoma ir telefono aplikacija. Esame dėkingi už jūsų susidomėjimą ir palaikymą. Nesivaržykite nurodydami pastebėtus trūkumus ar klaidas.

Pradėtas plėtoti 2022 m. balandžio 14 d., ketvirtadienį, buvo išdalintas į 3 sprintus and o numatoma atidavimo data 2022 m. birželio 1 d., trečiadienis.

Kuriant buvo panaudoti šie įrankiai ir technologijos:

* Windows ir MacBook kompiuteriai su Windows 10, Windows11 ir macOS BigSur ir Monterey operacinėmis sistemomis.
* Naršyklės Google Chrome, Edge ir Firefox.
* Terminalai: PowerShell, iTerm, su juose įdiegtomis git bash, zsh, node.js, Express, nodemon, mongoose technologijomis. 
* React@17
* Mongo DB virtuali duomenų bazė.
* Visual Studio Code su keletu priedų, kaip Better Comments, Prettier, Tabnine, Live-server, Monokai Pro ir įprasta Default Dark spalvų tema.
* Github repozitorijos.



(1)
ReDrama
Asmeninio biudžeto analizės aplikacijos naudojimo instrukcija.

Turinys

1. Registracijos/Prisijungimo puslapis				
1.1. Registracija	
1.2. Prisijungimas

2. Namų puslapis

3. Puslapio navigacijos juosta

4. Pajamų puslapis

5. Išlaidų puslapis

6. Valdymo puslapis



1. Registracijos/Prisijungimo puslapis

Įsijungus aplikaciją vartotojui duoti du pasirinkimai:
	a) Užregistruoti naują vartotoją;
	b) Prisijungti su jau turimu vartotoju.

Paspaudus kurį nors mygtuką vartotojas perkeliamas atitinkamą puslapį, kuriame gali atlikti tolimesnius veiksmus:

1.1. Registracija

Registracijos puslapyje asmuo gali užregistruoti vartotoją tolimesniam darbui, nurodant:
	Vartotojo vardą;
	Vartotojo elektroninį paštą;
	Vartotojo slaptažodį.

Registracija forma turi šias validacijas:
	Vartotojo vardas turi būti nuo 3 iki 40 simbolių ir negali turėti specialių simbolių;
	Vartotojo elektroninis paštas turi buti nuo 3 iki 40 simboliu ir turi būti tinkamo el. pašto formato;
	Vartotojo slaptažodis turi turėti nors vieną didžiąją raidę ir būti iki 40 simbolių.

*Slaptažodis gali būti matomas paspaudus akies ikoną.

Įvedus duomenis ir paspaudus “Registruotis”, vartotojo duomenys tikrinami ir jiems esant teisingiems vartotojas perkeliamas į namų puslapį.
Neteisingai įvedus duomenis, vartotojui nurodoma kuriame laukelyje buvo įvesti neteisingi duomenys.

Vartotojui persigalvojus, galima paspausti mygtuką “Prisijungti” kuriuo jis perkeliamas į prisijungimo puslapį.

1.2. Prisijungimas

Prisijungimo puslapyje vartotojas, norėdamas prisijungti turėtų įvesti galiojantį elektroninio pašto adresą ir slaptažodį.

*Norėdamas ateičiai išsaugoti įvestus duomenis vartotojas gali paspausti “Prisiminti mane” laukeli.

Vartotojui įvedus teisingus duomenis ir paspaudus mygtuką “Prisijungti”, jis yra perkeliamas į namų puslapį.

Neteisingai įvedus duomenis, vartotojui pranešimu nurodoma, jog duomenys buvo neteisingi. Pranešime paspaudęs mygtuką “Gerai”, vartotojas grąžinamas į prisijungimo formą, kur gali pakartotinai įvesti duomenis.

Vartotojui persigalvojus, galima paspausti mygtuką “Registruotis” kuriuo jis perkeliamas į registracijos puslapį.



2. Namų puslapis

Namų puslapyje vartotojas mato pajamų/išlaidų balansą, atvaizduotą apskritimo formos diagramoje, dešinėje pusėje vartotojas gali matyti paskutinių 10 įrašų detalų sąrašą.

Vartotojas norėdamas matyti tam tikro mėnesio pajamas/išlaidas gali pasirinkti mėnesį išsiskleidžiančiame sąraše.

Vartotojas, norėdamas matyti daugiau negu 10 įrašų, turėtų spausti mygtuką “Rodyti daugiau”, kuris sąrašą perkels į apačią ir rodys visus įrašus.



3. Puslapio navigacijos juosta
Vartotojas, prisijungęs prie sistemos, kairėje pusėje mato siaurą navigacijos juostą, ant kurios užvedus pelę, juosta išsiplečia, atskleisdama aplikacijos pavadinimą ir galimus puslapius su jų pavadinimais.

Navigacijos juostos apačioje yra mygtukas “Atsijungti” su kartu nurodytais vartotojo prisijungimo duomenimis. Paspaudus mygtuką, pranešimo lange pasirodo klausimas “Ar tikrai norite atsijungti?”; patvirtinus, vartotojas yra atjungiamas nuo sistemos ir grąžinamas į registracijos/prisijungimo puslapį.

    • Logotipas/Nuoroda į namų puslapį
    • Nuoroda į pajamų puslapį
    • Nuoroda į išlaidų puslapį
    • Nuoroda į valdymo puslapį
    • Atsijungimo nuoroda.



4. Pajamų puslapis

Pajamų puslapyje vartotojas mato pajamų balansą, atvaizduotą apskritimo formos diagramoje, dešinėje pusėje vartotojas gali matyti paskutinių 10 įrašų detalų sąrašą.

Vartotojas, norėdamas matyti daugiau negu 10 įrašų, turėtų spausti mygtuką “Rodyti daugiau”, kuris sąrašą perkels į apačią ir rodys visus įrašus.

Vartotojas, norėdamas pridėti naują pajamos įrašą, gali formoje:
	  • Pasirinkti kategoriją;
	  • Įvesti pajamų pavadinimą;
	  • Įvesti pajamų sumą;
	  • Nustatyti pajamų datą.

Duomenis suvedus, ir paspaudus mygtuką “Pridėti”, įrašas pasirodo žemiau esančio sąrašo viršuje.
Norėdamas pakeisti arba ištrinti duomenis, vartotojas turėtų pasirinkti vieną iš mygtukų dešinėje įrašo pusėje:
	  • Kairysis mygtukas su planšete ir pieštuku, skirtas redagavimui;
	  • Dešinysis mygtukas su šiukšlių dėže, skirtas įrašui ištrinti.

Taisant įrašą vartotojo įrašo duomenys perkeliami į pridėjimo formą, kurioje duomenis galima pakeisti, spaudžiant mygtuką “Atnaujinti”.
Trinant įrašą, paspaudus ikoną su šiukšlių dėže, vartotojo paklausiama pranešimo forma ar jis tikrai nori pašalinti įrašą, ir patvirtinus mygtuku “Gerai”, įrašas šalinamas iš sąrašo.



5. Išlaidų puslapis

Išlaidų puslapyje vartotojas mato išlaidų balansą, atvaizduotą apskritimo formos diagramoje; dešinėje pusėje vartotojas gali matyti paskutinių 10 įrašų detalų sąrašą.

Vartotojas, norėdamas matyti daugiau negu 10 įrašų, turėtų spausti mygtuką “Rodyti daugiau”, kuris sąrašą perkels į apačią ir rodys visus įrašus.

Vartotojas, norėdamas pridėti naują išlaidų įrašą, gali formoje:
	  • Pasirinkti kategoriją;
	  • Įvesti išlaidų pavadinimą;
	  • Įvesti išlaidų sumą;
	  • Nustatyti išlaidų datą.

Duomenis suvedus, ir paspaudus mygtuką “Pridėti”, įrašas pasirodo žemiau esančio sąrašo viršuje.
Norėdamas pakeisti arba ištrinti duomenis, vartotojas turėtų pasirinkti vieną iš mygtukų dešinėje įrašo pusėje:
	  • Kairysis mygtukas su planšete ir pieštuku, skirtas redagavimui;
	  • Dešinysis mygtukas su šiukšlių dėže, skirtas įrašui ištrinti.

Taisant įrašą vartotojo įrašo duomenys perkeliami į pridėjimo formą, kurioje duomenis galima pakeisti, spaudžiant mygtuką “Atnaujinti”.
Trinant įrašą, paspaudus ikoną su šiukšlių dėže, vartotojo paklausiama pranešimo forma ar jis tikrai nori pašalinti įrašą, ir patvirtinus mygtuku “Gerai”, įrašas šalinamas iš sąrašo.


6. Valdymo puslapis

Valdymo puslapyje, kurį mato tik administratoriaus teises turintis vartotojas, kuris, taip pat gali suteikti administravimo teises kitiems vartotojams, matome meniu juostą skirtą kategorijoms, vartotojams ir vartotojų veiksmų istorijai valdyti, o taip pat pridėti, redaguoti ir pašalinti vartotoją.


Paspaudus mygtuką kategorijos, atsidaro naujas sąrašas su meniu juosta, skirta pridėti arba rodyti pajamų arba išlaidų kategorijas.
Paspaudus mygtuką “Pridėti”, jis pasikeičia į mygtuką “Atšaukti pridėjimą”, o apačioje atsiranda kategorijos ivedimo laukelis su pajamų arba išlaidų tipo pasirinkimo opcija ir mygtuku “Pridėti”.
Įvedus norimą kategorijos pavadinimą ir pasirinkus jos tipą, vartotojas turėtų spausti mygtuką “Pridėti” ir kategorija turėtų pasirodyti sąrašo apačioje.
Paspaudus mygtuką “Rodyti tik pajamų kategorijas” arba “Rodyti tik išlaidų kategorijas” mygtukas pasikeičia į mygtuką “Atšaukti filtravimą”, o sąrašas apačioje rodo tik pasirinkto tipo kategorijas.
Paspaudus mygtuką “Atšaukti filtravimą”, mygtukas pasikeičia atgal į “Rodyti tik pajamų kategorijas” arba “Rodyti tik išlaidų kategorijas” atitinkamai.
Paspaudus taisymo mygtuką su planšete ir pieštuku, pasirodo įvedimo laukelis su mygtuku “Atnaujinti” ir kategorijos duomenimis:

Norint ištrinti kategoriją iš sąrašo, spaudžiame ikoną su šiukšlių dėže, kurią paspaudus pasirodo pranešimas “Ar esate tikri?” su dviem pasirinkimais “Taip, pašalinti!” ir “Atšaukti”. Patvirtinus pranešimą, kategorija pašalinama, atšaukus - grįžtama į kategorijų sąrašą.

Valdymo puslapyje paspaudus mygtuką “Vartotojai” atsidaro naujas sąrašas su meniu juosta, skirta pridėti arba rodyti vartotojus.
Paspaudus “Pridėti naują vartotoją”, atsidaro duomenų įvedimo juosta su forma, skirta vartotojo vardui, elektroniniam paštui, slaptažodžiui ir vartotojo teisėms suteikti, o taip pat mygtukas “Pridėti” vartotojui į sąrašą.
Vartotojų sąrašo juostoje matome vartotojų duomenis:
	Vartotojų vardus;
	Vartotojų elektroninius paštus;
	Vartotojui suteiktas teises;
	Redagavimo ir pašalinimo mygtukus.
Paspaudus redagavimo mygtuką, atsidaro nauja meniu juosta su atitinkamais pasirinkimais, ir formoje atsiranda redaguojamo vartotojo duomenys:
	
Paspaudus mygtuką “Atnaujinti”, vartotojo duomenys pasikeičia ir pasirodo pranešimas su patvirtinimu.
Paspaudus trynimo mygtuką, pasirodo pranešimas “Ar esate tikri?” su dviem pasirinkimais “Taip, pašalinti!” ir “Atšaukti”, kuriuos paspaudus įvyksta atitinkamas veiksmas.

Norint peržiūrėti visą vartotojų sąrašą, galima tai atlikti sukant pelės ratuką.

Valdymo puslapyje paspaudus mygtuką “Istorija”, pasirodo visų vartotojų atliktų veiksmų sąrašas su laiko žyma, vartotojo vardu, atliktu veiksmu ir veiksmo aprašymu, ir ištrynimo mygtuku ir daugelio įrašų ištrynimo laukeliais.

Paspaudus kurį nors iš filtravimo pasirinkimų, sąrašas pasikeičia atitinkamai su pasirinktu įrašo veiksmu arba vartotoju.

Spaudžiant šiukšliadėžės ikoną, pasirodo pranešimas “Ar esate tikri?” su “Taip pašalinti!” arba “Atšaukti” pasirinkimais, kurie atlieka atitinkamus veiksmus.

Varnele pažymėjus vieną ar daugiau įrašų, juos galima pašalinti viršuje pasirodžiusiu mygtuku “Ištrinti pasirinktus”.			



(2)
ReDrama
Asmeninio biudžeto analizės aplikacijos diegimo ir paleidimo instrukcija.

# klonuojame projektą atidarytame terminale:
git clone https://mkrivickas.github.io/REDRAMA/

# atidarome Visual Studio Code programą:
code .

# terminale pasirenkame susikurtą backendo direktoriją:
cd ../REDRAMA/back

# vykdome šias komandas sudiegti ir paleisti sudiegtiems ir sukurtiems elementams Visual Studio Code terminale:
npm install
npm start

# terminale pasirenkame susikurtą frontendo direktoriją:
cd ../REDRAMA/front

# vykdome šias komandas sudiegti ir paleisti sudiegtiems ir sukurtiems elementams Visual Studio Code terminale:
npm install
npm start

# Programos puslapis turėtų atsidaryti nustatytos naršyklės (Chrome, Edge, Firefox) lange adresu:
http://localhost:3000

Linkime sklandaus ir patogaus naudojimosi!

Kūrėjai: Ramūnas, Danguolė, Jurgita, Mindaugas, Artur, Domantas, Tomas, Augustas a.k.a. SCRUM MASTER ir Justina a.k.a. PRODUCT OWNER. 

&copy; Copyright 2022. Visos teisės saugomos.
