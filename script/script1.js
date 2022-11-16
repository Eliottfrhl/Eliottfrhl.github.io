let reponse
let Candidates
let nbre = 8 - reponse

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
    var Ligues = []
    var LFL = document.querySelector('#test1');
    if (LFL.checked) { Ligues.push('LFL') }
    var LEC = document.querySelector('#test2');
    if (LEC.checked) { Ligues.push('LEC') }
    var LCK = document.querySelector('#test3');
    if (LCK.checked) { Ligues.push('LCK') }
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
function nouvelleReponse(ele) {
    if (ProPlayer[0] == ele.value) {
        /*document.getElementById("imgReponse").src = ProPlayer[0];*/
        alert("Bien joué!")
    } if (Object.keys(Candidates).includes(ele.value)) {
        reponse += 1
        document.getElementById(`cell${reponse}.1`).innerHTML = Candidates[ele.value][0];
        if (Candidates[ele.value][1] == ProPlayer[1]) {
            addDot(`cell${reponse}.4`, 'green', Candidates[ele.value][1])
        } else { addDot(`cell${reponse}.4`, 'red', Candidates[ele.value][1]) }
        if (Candidates[ele.value][2] == ProPlayer[2]) {
            addDot(`cell${reponse}.3`, 'green', Candidates[ele.value][2]);
        } else { addDot(`cell${reponse}.3`, 'red', Candidates[ele.value][2]) }
        if (Candidates[ele.value][3] == ProPlayer[3]) {
            addDot(`cell${reponse}.2`, 'green', Candidates[ele.value][3]);
        } else { addDot(`cell${reponse}.2`, 'red', Candidates[ele.value][3]); }
        if (Candidates[ele.value][4] == ProPlayer[4]) {
            addDot(`cell${reponse}.5`, 'green', Candidates[ele.value][4]);
        } else { addDot(`cell${reponse}.5`, 'red', Candidates[ele.value][4]); }
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
    //input query length
    //alert(((Players['Cabochard'][0].toLowerCase()).indexOf(value.toLowerCase())) > -1)
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

const Players = {
    'Jactroll': ['Jactroll', 'Poland', 'Vitality.Bee', 'LFL', 'Support'], 'Jeskla': ['Jeskla', 'Sweden', 'Vitality.Bee', 'LFL', 'Bot Laner'], 'Diplex': ['Diplex', 'Germany', 'Vitality.Bee', 'LFL', 'Mid Laner'], 'Skeanz': ['Skeanz', 'France', 'Vitality.Bee', 'LFL', 'Jungler'], 'Szygenda': ['Szygenda', 'Denmark', 'Vitality.Bee', 'LFL', 'Top Laner'], 'Doss': ['Doss', 'Denmark', 'LDLC OL', 'LFL', 'Support'], 'Exakick': ['Exakick', 'France', 'LDLC OL', 'LFL', 'Bot Laner'], 'Eika': ['Eika', 'France', 'LDLC OL', 'LFL', 'Mid Laner'], 'Yike': ['Yike', 'Sweden', 'LDLC OL', 'LFL', 'Jungler'], 'Ragner': ['Ragner', 'Turkey', 'LDLC OL', 'LFL', 'Top Laner'], 'Xicor': ['Xicor', 'Tunisia', 'Team Oplon', 'LFL', 'Bot Laner'], 'Nono': ['Nono', 'France', 'Team Oplon', 'LFL', 'Bot Laner'], 'Twiizt': ['Twiizt', 'Sweden', 'Team Oplon', 'LFL', 'Support'], 'Bung (Jakob Gramm)': ['Bung (Jakob Gramm)', 'Austria', 'Team Oplon', 'LFL', 'Bot Laner'], 'Peng (Pengcheng Shen)': ['Peng (Pengcheng Shen)', 'China', 'Team Oplon', 'LFL', 'Mid Laner'], 'Shernfire': ['Shernfire', 'Malaysia', 'Team Oplon', 'LFL', 'Jungler'], 'Darlik': ['Darlik', 'France', 'Team Oplon', 'LFL', 'Top Laner'], 'Veignorem': ['Veignorem', 'France', 'Team GO', 'LFL', 'Support'], 'SMILEY (Ludvig Granquist)': ['SMILEY (Ludvig Granquist)', 'Sweden', 'Team GO', 'LFL', 'Bot Laner'], 'Ronaldo': ['Ronaldo', 'Romania', 'Team GO', 'LFL', 'Mid Laner'], 'Karim kt': ['Karim kt', 'France', 'Team GO', 'LFL', 'Jungler'], 'NuQ': ['NuQ', 'Turkey', 'Team GO', 'LFL', 'Top Laner'], 'Jaylink': ['Jaylink', 'France', 'Team BDS Academy', 'LFL', 'Sub/Bot'], 'Erdote': ['Erdote', 'Poland', 'Team BDS Academy', 'LFL', 'Support'], 'Dreamer Ace': ['Dreamer Ace', 'Austria', 'Team BDS Academy', 'LFL', 'Support'], 'Crownshot': ['Crownshot', 'Slovenia', 'Team BDS Academy', 'LFL', 'Bot Laner'], 'Reeker': ['Reeker', 'Germany', 'Team BDS Academy', 'LFL', 'Mid Laner'], 'Sheo': ['Sheo', 'France', 'Team BDS Academy', 'LFL', 'Jungler'], 'Adam (Adam Maanane)': ['Adam (Adam Maanane)', 'France', 'Team BDS Academy', 'LFL', 'Top Laner'], 'Steeelback': ['Steeelback', 'France', 'Solary', 'LFL', 'Support'], 'Asza': ['Asza', 'Netherlands', 'Solary', 'LFL', 'Bot Laner'], 'Scarlet (Marcel Wiederhofer)': ['Scarlet (Marcel Wiederhofer)', 'Austria', 'Solary', 'LFL', 'Mid Laner'], 'Djoko': ['Djoko', 'France', 'Solary', 'LFL', 'Jungler'], 'Kio': ['Kio', 'Slovakia', 'Solary', 'LFL', 'Top Laner'], 'Diamante': ['Diamante', 'France', 'Misfits Premier', 'LFL', 'Mid Laner'], 'Vander': ['Vander', 'Poland', 'Misfits Premier', 'LFL', 'Support'], 'Woolite': ['Woolite', 'Poland', 'Misfits Premier', 'LFL', 'Bot Laner'], 'Czajek': ['Czajek', 'Poland', 'Misfits Premier', 'LFL', 'Mid Laner'], 'Shlatan': ['Shlatan', 'Poland', 'Misfits Premier', 'LFL', 'Jungler'], 'Kackos': ['Kackos', 'Poland', 'Misfits Premier', 'LFL', 'Top Laner'], 'Herazor': ['Herazor', 'France', 'Mirage Elyandra', 'LFL', 'Mid Laner'], 'Raxxo': ['Raxxo', 'Poland', 'Mirage Elyandra', 'LFL', 'Support'], 'Cody Sun': ['Cody Sun', 'China', 'Mirage Elyandra', 'LFL', 'Bot Laner'], 'FEBIVEN': ['FEBIVEN', 'Netherlands', 'Mirage Elyandra', 'LFL', 'Mid Laner'], 'Memento': ['Memento', 'Sweden', 'Mirage Elyandra', 'LFL', 'Jungler'], 'Badlulu': ['Badlulu', 'France', 'Mirage Elyandra', 'LFL', 'Top Laner'], 'Wao': ['Wao', 'France', 'Karmine Corp', 'LFL', 'Sub/Top'], 'Hantera': ['Hantera', 'France', 'Karmine Corp', 'LFL', 'Support'], 'Rekkles': ['Rekkles', 'Sweden', 'Karmine Corp', 'LFL', 'Bot Laner'], 'Saken': ['Saken', 'France', 'Karmine Corp', 'LFL', 'Mid Laner'], '113': ['113', 'Turkey', 'Karmine Corp', 'LFL', 'Jungler'], 'Cabochard': ['Cabochard', 'France', 'Karmine Corp', 'LFL', 'Top Laner'], 'iCrash': ['iCrash', 'France', 'GameWard', 'LFL', 'Substitute'], 'Kamilius': ['Kamilius', 'Slovakia', 'GameWard', 'LFL', 'Support'], 'Innaxe': ['Innaxe', 'Bulgaria', 'GameWard', 'LFL', 'Bot Laner'], 'Czekolad': ['Czekolad', 'Poland', 'GameWard', 'LFL', 'Mid Laner'], 'Akabane': ['Akabane', 'France', 'GameWard', 'LFL', 'Jungler'], 'Melonik': ['Melonik', 'Poland', 'GameWard', 'LFL', 'Top Laner']
}

