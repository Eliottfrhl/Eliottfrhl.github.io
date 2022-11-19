let reponse
let Candidates
let nbre = 8 - reponse
let Ligues =['LFL','LEC','LCK']

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/*document.getElementById("nombreReponses").innerText = `Il vous reste ${nbre} tentatives restantes`*/

/* Show the popup text when clicking on the info button */
function Information() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

/* Sets the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Sets the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

/* Chooses a random ProPlayer in the list of candidates*/
function choosePlayer(Players) {
    let PlayerList = Object.keys(Players)
    let Player = Players[PlayerList[Math.floor(Math.random() * PlayerList.length)]]
    return Player
}

/* Creates a new game corresponding to the new parameters */
function nouvellePartie() {
    reponse = 0
    effacerHistorique()
    Candidates = extract(Players, Ligues)
    ProPlayer = choosePlayer(Candidates)
    alert("Nouvelle partie !")

}

function effacerHistorique() {
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 6; j++) {
            document.getElementById(`cell${i}.${j}`).innerHTML = "";
        }
    }
}

/* Add the information when a new answer is given */
async function nouvelleReponse(ele) {
    if (ProPlayer[0] == ele.value) {
        document.getElementById("imgJoueur").src = "data/images/"+ProPlayer[3]+"/"+ProPlayer[2]+"/"+ProPlayer[0]+'.png';
    } if (Object.keys(Players).includes(ele.value)) {
        reponse += 1
        document.getElementById(`cell${reponse}.1`).innerHTML = Players[ele.value][0];
        if (Players[ele.value][3] == ProPlayer[3]) {
            addDot(`cell${reponse}.2`, 'green', Players[ele.value][3]);
        } else { addDot(`cell${reponse}.2`, 'red', Players[ele.value][3]); }
        if (Players[ele.value][2] == ProPlayer[2]) {
            addDot(`cell${reponse}.3`, 'green', Players[ele.value][2]);
        } else { addDot(`cell${reponse}.3`, 'red', Players[ele.value][2]) }
        if (Players[ele.value][1] == ProPlayer[1]) {
            addDot(`cell${reponse}.4`, 'green', Players[ele.value][1])
        } else { addDot(`cell${reponse}.4`, 'red', Players[ele.value][1]) }
        if (Players[ele.value][4] == ProPlayer[4]) {
            addDot(`cell${reponse}.5`, 'green', Players[ele.value][4]);
        } else { addDot(`cell${reponse}.5`, 'red', Players[ele.value][4]); }
    } else {
        alert("Ce joueur n'existe pas")
    } if (reponse == 8) {
        alert("Le joueur est : " + ProPlayer[0])
    }
}

/* Triggers the arrival of a new answer when enter is pressed */
function search(ele) {
    if (event.key === 'Enter') {
        nouvelleReponse(ele);
        document.getElementById("ProInput").value = "";
    }
}

/* Creates a new Object with all Candidates corresponding to the new parameters */
function extract(Data, Input) {
    const DataEntries = Object.entries(Data)
    let Candidates = {}
    for (let i = 0; i < DataEntries.length; i++) {
        if (Input.includes(DataEntries[i][1][3])) {
            var Name = DataEntries[i][0]
            var Info = DataEntries[i][1]
            Candidates[Name] = Info
        }
    }
    return Candidates
}

function addDot(place, color, text) {
    const dot = document.createElement("span")
    dot.appendChild(document.createTextNode(text))
    if (color == "red") {
        dot.className = "rdot"
    } if (color == "green") {
        dot.className = "gdot"
    }
    document.getElementById(place).appendChild(dot)
}

function ac(value) {
    document.getElementById('datalist').innerHTML = '';
    //setting datalist empty at the start of function
    //if we skip this step, same name will be repeated
    for (const player in Players) {
        if (((Players[player][0].toLowerCase()).indexOf(value.toLowerCase())) > -1) {
            //comparing if input string is existing in tags[i] string

            var node = document.createElement("option");
            var val = document.createTextNode(Players[player][0]);
            node.appendChild(val);

            document.getElementById("datalist").appendChild(node);
            //creating and appending new elements in data list
        }
    }
}


const Data = {
    'CABOCHARD': ['FR', 'KC', 'LFL', 'TOP'], 'BUMM': ['TR', 'KC', 'LFL', 'JGL'], 'SAKEN': ['FR', 'KC', 'LFL', 'MID'], 'REKKLES': ['SE', 'KC', 'LFL', 'ADC'], 'HANTERA': ['FR', 'KC', 'LFL', 'SUP'], 'DJOKO': ['FR', 'SLY', 'LFL', 'JGL'], 'STEELBACK': ['FR', 'SLY', 'LFL', 'SUP'], 'EIKA': ['FR', 'LDLC', 'LFL', 'MID'], 'VETHEO': ['FR', 'MSF', 'LEC', 'MID'], 'ODOAMNE': ['ROU', 'RGE', 'LEC', 'TOP'], 'TOUCOUILLE': ['FR', 'FLY', 'LCS', 'MID'], 'CINKROFF': ['POL', 'BDS', 'LEC', 'JGL'], 'FAKER': ['KOR', 'T1', 'LCK', 'MID'], 'KERIA': ['KOR', 'T1', 'LCK', 'SUP'], 'CZEKOLAD': ['POL', 'GW', 'LFL', 'MID'], 'RONALDO': ['ROU', 'GO', 'LFL', 'MID'], 'RANGJUN': ['KOR', 'ME', 'LFL', 'MID'], 'CZAJEK': ['POL', 'MSFP', 'LFL', 'MID'], 'SCARLET': ['AUT', 'SLY', 'LFL', 'MID'], 'XICO': ['PRT', 'BDSA', 'LFL', 'MID'], 'PENG': ['SE', 'OPL', 'LFL', 'MID'], 'DIPLEX': ['DEU', 'VITB', 'LFL', 'MID'], 'BADLULU': ['FR', 'ME', 'LFL', 'TOP'], 'MELONIK': ['POL', 'GW', 'LFL', 'TOP'], 'RAGNER': ['TR', 'LDLC', 'LFL', 'TOP'], 'VIZICSACSI': ['HUN', 'GO', 'LFL', 'TOP'], 'IRRELEVANT': ['DEU', 'MSFP', 'LFL', 'TOP'], 'KIO': ['SVK', 'SLY', 'LFL', 'TOP'], 'SZYGENDA': ['DNK', 'VITB', 'LFL', 'TOP'], 'AGRESIVOO': ['POL', 'BDSA', 'LFL', 'TOP'], 'SKEANZ': ['FR', 'VITB', 'LFL', 'JGL'], 'TYNX': ['DNK', 'MSFP', 'LFL', 'JGL'], 'BRUNESS': ['POL', 'OPL', 'LFL', 'JGL'], 'SHEO': ['FR', 'BDSA', 'LFL', 'JGL'], 'MEMENTO': ['SE', 'ME', 'LFL', 'JGL'], 'YIKE': ['SE', 'LDLC', 'LFL', 'JGL'], 'AKABANE': ['FR', 'GW', 'LFL', 'JGL'], 'KARIMKT': ['FR', 'GO', 'LFL', 'JGL'], 'ENJAWVE': ['FR', 'GO', 'LFL', 'SUP'], 'SMILEY': ['SE', 'GO', 'LFL', 'ADC'], 'INNAXE': ['BGR', 'GW', 'LFL', 'ADC'], 'KAMILIUS': ['SVK', 'GW', 'LFL', 'SUP'], 'DOSS': ['DNK', 'LDLC', 'LFL', 'SUP'], 'EXAKICK': ['FR', 'LDLC', 'LFL', 'ADC'],
    'CODY SUN': ['CAN', 'ME', 'LFL', 'ADC'], 'RAXXO': ['POL', 'ME', 'LFL', 'SUP'], 'WOOLITE': ['POL', 'MSFP', 'LFL', 'ADC'], 'VANDER': ['POL', 'MSFP', 'LFL', 'SUP'], 'ASZA': ['NLD', 'SLY', 'LFL', 'ADC'], 'CROWNSHOT': ['SVN', 'BDSA', 'LFL', 'ADC'], 'ERDOTE': ['POL', 'BDSA', 'LFL', 'SUP'], 'TIGER': ['FR', 'OPL', 'LFL', 'ADC'], 'XICOR': ['TUN', 'OPL', 'LFL', 'ADC'], 'ABSOLUTE': ['TR', 'OPL', 'LFL', 'SUP'], 'JESKLA': ['SE', 'VITB', 'LFL', 'ADC'], 'JACTROLL': ['POL', 'VITB', 'LFL', 'SUP'], 'WHITEKNIGHT': ['FIN', 'AST', 'LEC', 'TOP'],
    'ZANZARAH': ['RUS', 'AST', 'LEC', 'JGL'], 'DAJOR': ['DEU', 'AST', 'LEC', 'MID'], 'KOBBE': ['DNK', 'AST', 'LEC', 'ADC'], 'PROMISQ': ['SE', 'AST', 'LEC', 'SUP'], 'FINN': ['SE', 'XL', 'LEC', 'TOP'], 'MARKOON': ['NLD', 'XL', 'LEC', 'JGL'], 'NUKEDUCK': ['NOR', 'XL', 'LEC', 'MID'], 'PATRIK': ['CZE', 'XL', 'LEC', 'ADC'], 'ADVIENNE': ['NLD', 'XL', 'LEC', 'SUP'], 'MIKYX': ['SVN', 'XL', 'LEC', 'SUP'], 'WUNDER': ['DNK', 'FNC', 'LEC', 'TOP'], 'RAZORK': ['ESP', 'FNC', 'LEC', 'JGL'], 'HUMANOID': ['CZE', 'FNC', 'LEC', 'MID'], 'UPSET': ['DEU', 'FNC', 'LEC', 'ADC'], 'HYLISSANG': ['BGR', 'FNC', 'LEC', 'SUP'], 'BROKENBLADE': ['DEU', 'G2', 'LEC', 'TOP'], 'JANKOS': ['POL', 'G2', 'LEC', 'JGL'], 'CAPS':
        ['DNK', 'G2', 'LEC', 'MID'], 'FLAKKED': ['ESP', 'G2', 'LEC', 'ADC'], 'TARGAMAS': ['BEL', 'G2', 'LEC', 'SUP'], 'ARMUT': ['TR', 'MAD', 'LEC', 'TOP'], 'ELYOYA': ['ESP', 'MAD', 'LEC', 'JGL'], 'REEKER': ['DEU', 'MAD', 'LEC', 'MID'], 'UNFORGIVEN': ['SE', 'MAD', 'LEC', 'ADC'], 'KAISER': ['DEU', 'MAD', 'LEC', 'SUP'], 'HIRIT': ['KOR', 'MSF', 'LEC', 'TOP'], 'SHLATAN': ['POL', 'MSF', 'LEC', 'JGL'], 'NEON': ['SVK', 'MSF', 'LEC', 'ADC'], 'MERSA': ['GRC', 'MSF', 'LEC', 'SUP'], 'MALRANG': ['KOR', 'RGE', 'LEC', 'JGL'], 'LARSSEN': ['SE', 'RGE', 'LEC', 'MID'], 'COMP': ['GRC', 'RGE', 'LEC', 'ADC'], 'TRYMBI': ['POL',
            'RGE', 'LEC', 'SUP'], 'JENAX': ['DEU', 'SK', 'LEC', 'TOP'], 'GILIUS': ['DEU', 'SK', 'LEC', 'JGL'], 'SERTUSS': ['DEU', 'SK', 'LEC', 'MID'], 'JEZU': ['FR', 'SK', 'LEC', 'ADC'], 'TREATZ': ['SE', 'SK', 'LEC',
                'SUP'], 'ADAM': ['FR', 'BDS', 'LEC', 'TOP'], 'NUCLEARINT': ['FR', 'BDS', 'LEC', 'MID'], 'XMATTY': ['GBR', 'BDS', 'LEC', 'ADC'], 'LIMIT': ['HRV',
                    'BDS', 'LEC', 'SUP'], 'ALPHARI': ['GBR', 'VIT', 'LEC', 'TOP'], 'SELFMADE': ['POL', 'VIT', 'LEC', 'JGL'], 'PERKZ': ['HRV', 'VIT', 'LEC', 'MID'], 'CARZZY': ['CZE', 'VIT', 'LEC', 'ADC'], 'LABROV': ['GRC', 'VIT', 'LEC', 'SUP']
}

const Players = {'Agresivoo': ['Agresivoo', 'Poland', 'BDSA', 'LFL', 'Top Laner'], 'Maxi': ['Maxi', 'Denmark', 'BDSA', 'LFL', 'Jungler'], 'Reeker': ['Reeker', 'Germany', 'BDSA', 'LFL', 'Mid Laner'], 'xMatty': ['xMatty', 'United Kingdom', 'BDSA', 'LFL', 'Bot Laner'], 'Erdote': ['Erdote', 'Poland', 'BDSA', 'LFL', 'Support'], 'Ragner': ['Ragner', 'Turkey', 'GO', 'LFL', 'Top Laner'], 'Lyncas': ['Lyncas', 'Lithuania', 'GO', 'LFL', 'Jungler'], 'Toucouille': ['Toucouille', 'France', 'GO', 'LFL', 'Mid Laner'], 'Jezu': ['Jezu', 'France', 'GO', 'LFL', 'Bot Laner'], 'kamilius': ['kamilius', 'Slovakia', 'GO', 'LFL', 'Support'], 'Skewmond': ['Skewmond', '', 'GW', 'LFL', 'Jungler'], 'twohoyrz': ['twohoyrz', '', 'GW', 'LFL', 'Mid Laner'], 'Cabochard': ['Cabochard', 'France', 'KC', 'LFL', 'Top Laner'], 'Skeanz': ['Skeanz', 'France', 'KC', 'LFL', 'Jungler'], 'Saken': ['Saken', 'France', 'KC', 'LFL', 'Mid Laner'], 'Kaori': ['Kaori', 'Turkey', 'KC', 'LFL', 'Bot Laner'], 'Whiteinn': ['Whiteinn', 'Romania', 'KC', 'LFL', 'Support'], 'Kryze': ['Kryze', 'Sweden', 'LDLC', 'LFL', 'Top Laner'], 'White': ['White', '', 'LDLC', 'LFL', 'Jungler'], 'Backlund': ['Backlund', 'Sweden', 'LDLC', 'LFL', 'Mid Laner'], 'Jesklaa': ['Jesklaa', 'Sweden', 'LDLC', 'LFL', 'Bot Laner'], 'Zoelys': ['Zoelys', 'France', 'LDLC', 'LFL', 'Support'], 'Eika': ['Eika', 'France', 'AEG', 'LFL', 'Mid Laner'], 'Shiganari': ['Shiganari', 'Latvia', 'AEG', 'LFL', 'Bot Laner'], 'Hantera': ['Hantera', 'France', 'AEG', 'LFL', 'Support'], 'Howling': ['Howling', '', 'ROG', 'LFL', 'Top Laner'], 'Czekolad': ['Czekolad', 'Poland', 'ROG', 'LFL', 'Mid Laner'], 'Trigger (Kim Eui-joo)': ['Trigger (Kim Eui-joo)', '', 'ROG', 'LFL', 'Bot Laner'], 'Veignorem': ['Veignorem', 'France', 'ROG', 'LFL', 'Support'], 'Melonik': ['Melonik', 'Poland', 'SLY', 'LFL', 'Top Laner'], 'Shlatan': ['Shlatan', 'Poland', 'SLY', 'LFL', 'Jungler'], 'Peng (Pengcheng Shen)': ['Peng (Pengcheng Shen)', '', 'SLY', 'LFL', 'Mid Laner'], 'Steeelback': ['Steeelback', 'France', 'SLY', 'LFL', 'Support'], 'Patkicaa': ['Patkicaa', '', 'VITB', 'LFL', 'Top Laner'], 'Daglas': ['Daglas', 'Poland', 'VITB', 'LFL', 'Jungler'], 'Innaxe': ['Innaxe', '', 'VITB', 'LFL', 'Bot Laner'], 'Jactroll': ['Jactroll', 'Poland', 'VITB', 'LFL', 'Support'], 'BrokenBlade': ['BrokenBlade', 'Germany', 'G2', 'LEC', 'Top Laner'], 'Yike': ['Yike', 'Sweden', 'G2', 'LEC', 'Jungler'], 'Caps': ['Caps', 'Denmark', 'G2', 'LEC', 'Mid Laner'], 'Hans Sama': ['Hans Sama', 'France', 'G2', 'LEC', 'Bot Laner'], 'Mikyx': ['Mikyx', 'Slovenia', 'G2', 'LEC', 'Support'], 'Wunder': ['Wunder', 'Denmark', 'FNC', 'LEC', 'Top Laner'], 'Razork': ['Razork', 'Spain', 'FNC', 'LEC', 'Jungler'], 'Humanoid': ['Humanoid', 'Czechia', 'FNC', 'LEC', 'Mid Laner'], 'Rekkles': ['Rekkles', 'Sweden', 'FNC', 'LEC', 'Bot Laner'], 'Rhuckz': ['Rhuckz', 'Portugal', 'FNC', 'LEC', 'Support'], 'Chasy': ['Chasy', '', 'MAD', 'LEC', 'Top Laner'], 'Elyoya': ['Elyoya', 'Spain', 'MAD', 'LEC', 'Jungler'], 'Nisqy': ['Nisqy', 'Belgium', 'MAD', 'LEC', 'Mid Laner'], 'Carzzy': ['Carzzy', 'Czechia', 'MAD', 'LEC', 'Bot Laner'], 'Hylissang': ['Hylissang', '', 'MAD', 'LEC', 'Support'], 'Evi': ['Evi', '', 'HRT', 'LEC', 'Top Laner'], 'Jankos': ['Jankos', 'Poland', 'HRT', 'LEC', 'Jungler'], 'Ruby (Lee Sol-min)': ['Ruby (Lee Sol-min)', '', 'HRT', 'LEC', 'Mid Laner'], 'Jackspektra': ['Jackspektra', 'Norway', 'HRT', 'LEC', 'Bot Laner'], 'Mersa': ['Mersa', 'Greece', 'HRT', 'LEC', 'Support'], 'Finn': ['Finn', 'Sweden', 'AST', 'LEC', 'Top Laner'], '113': ['113', 'Turkey', 'AST', 'LEC', 'Jungler'], 'Dajor': ['Dajor', 'Germany', 'AST', 'LEC', 'Mid Laner'], 'Kobbe': ['Kobbe', 'Denmark', 'AST', 'LEC', 'Bot Laner'], 'Jeonghoon': ['Jeonghoon', '', 'AST', 'LEC', 'Support'], 'Photon': ['Photon', '', 'VIT', 'LEC', 'Top Laner'], 'Bo': ['Bo', '', 'VIT', 'LEC', 'Jungler'], 'Perkz': ['Perkz', 'Croatia', 'VIT', 'LEC', 'Mid Laner'], 'Neon (Matúš Jakubčík)': ['Neon (Matúš Jakubčík)', '', 'VIT', 'LEC', 'Bot Laner'], 'Kaiser': ['Kaiser', 'Germany', 'VIT', 'LEC', 'Support'], 'Adam (Adam Maanane)': ['Adam (Adam Maanane)', '', 'BDS', 'LEC', 'Top Laner'], 'Sheo': ['Sheo', 'France', 'BDS', 'LEC', 'Jungler'], 'Nuclearint': ['Nuclearint', 'France', 'BDS', 'LEC', 'Mid Laner'], 'Crownie': ['Crownie', 'Slovenia', 'BDS', 'LEC', 'Bot Laner'], 'Labrov': ['Labrov', '', 'BDS', 'LEC', 'Support'], 'Irrelevant': ['Irrelevant', 'Germany', 'SK', 'LEC', 'Top Laner'], 'Markoon ': ['Markoon ', 'Netherlands', 'SK', 'LEC', 'Jungler'], 'Sertuss': ['Sertuss', 'Germany', 'SK', 'LEC', 'Mid Laner'], 'Exakick': ['Exakick', 'France', 'SK', 'LEC', 'Bot Laner'], 'Doss': ['Doss', 'Denmark', 'SK', 'LEC', 'Support'], 'Szygenda': ['Szygenda', 'Denmark', 'KOI', 'LEC', 'Top Laner'], 'Malrang': ['Malrang', '', 'KOI', 'LEC', 'Jungler'], 'Larssen': ['Larssen', 'Sweden', 'KOI', 'LEC', 'Mid Laner'], 'Comp': ['Comp', '', 'KOI', 'LEC', 'Bot Laner'], 'Trymbi': ['Trymbi', 'Poland', 'KOI', 'LEC', 'Support'], 'Odoamne': ['Odoamne', 'Romania', 'XL', 'LEC', 'Top Laner'], 'Xerxe': ['Xerxe', 'Romania', 'XL', 'LEC', 'Jungler'], 'Vetheo': ['Vetheo', 'France', 'XL', 'LEC', 'Mid Laner'], 'Patrik': ['Patrik', 'Czechia', 'XL', 'LEC', 'Bot Laner'], 'Targamas': ['Targamas', 'Belgium', 'XL', 'LEC', 'Support']}


function test() {
    alert(Ligues)
}

function toLCK(){
    const index = Ligues.indexOf('LCK');
    const input = document.getElementById('LCKinput')
    if (index > -1) { // only splice array when item is found
        Ligues.splice(index, 1); // 2nd parameter means remove one item only
        input.classList.remove('leaguechecked')
        input.classList.add('leagueunchecked')
    } else {
        Ligues.push('LCK')
        input.classList.remove('leagueunchecked')
        input.classList.add('leaguechecked')
    }
}

function toLEC(){
    const index = Ligues.indexOf('LEC');
    const input = document.getElementById('LECinput')
    if (index > -1) { // only splice array when item is found
        Ligues.splice(index, 1); // 2nd parameter means remove one item only
        input.classList.remove('leaguechecked')
        input.classList.add('leagueunchecked')
    } else {
        Ligues.push('LEC')
        input.classList.remove('leagueunchecked')
        input.classList.add('leaguechecked')
    }
}
function toLFL(){
    const index = Ligues.indexOf('LFL');
    const input = document.getElementById('LFLinput')
    if (index > -1) { // only splice array when item is found
        Ligues.splice(index, 1); // 2nd parameter means remove one item only
        input.classList.remove('leaguechecked')
        input.classList.add('leagueunchecked')
    } else {
        Ligues.push('LFL')
        input.classList.remove('leagueunchecked')
        input.classList.add('leaguechecked')
    }
}
