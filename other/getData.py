import json
import sys
import csv 

nat ={'Agresivoo': 'Poland', 'Maxi': 'Denmark', 'Reeker': 'Germany', 'xMatty': 'United Kingdom', 'Erdote': 'Poland', 'Ragner': 'Turkey', 'Lyncas': 'Lithuania', 'Toucouille': 'France', 'Jezu': 'France', 'kamilius': 'Slovakia', 'Skewmond': '', 'twohoyrz': '', 'Cabochard': 'France', 'Skeanz': 'France', 'Saken': 'France', 'Kaori': 'Turkey', 'Whiteinn': 'Romania', 'Kryze': 'Sweden', 'White': '', 'Backlund': 'Sweden', 'Jesklaa': 'Sweden', 'Zoelys': 'France', 'Eika': 'France', 'Shiganari': 'Latvia', 'Hantera': 'France', 'Howling': '', 'Czekolad': 'Poland', 'Trigger (Kim Eui-joo)': '', 'Veignorem': 'France', 'Melonik': 'Poland', 'Shlatan': 'Poland', 'Peng (Pengcheng Shen)': '', 'Steeelback': 'France', 'Patkicaa': '', 'Daglas': 'Poland', 'Innaxe': '', 'Jactroll': 'Poland', 'BrokenBlade': 'Germany', 'Yike': 'Sweden', 'Caps': 'Denmark', 'Hans Sama': 'France', 'Mikyx': 'Slovenia', 'Wunder': 'Denmark', 'Razork': 'Spain', 'Humanoid': 'Czechia', 'Rekkles': 'Sweden', 'Rhuckz': 'Portugal', 'Chasy': '', 'Elyoya': 'Spain', 'Nisqy': 'Belgium', 'Carzzy': 'Czechia', 'Hylissang': '', 'Evi': '', 'Jankos': 'Poland', 'Ruby (Lee Sol-min)': '', 'Jackspektra': 'Norway', 'Mersa': 'Greece', 'Finn': 'Sweden', '113': 'Turkey', 'Dajor': 'Germany', 'Kobbe': 'Denmark', 'Jeonghoon': '', 'Photon': '', 'Bo': '', 'Perkz': 'Croatia', 'Neon (Matúš Jakubčík)': '', 'Kaiser': 'Germany', 'Adam (Adam Maanane)': '', 'Sheo': 'France', 'Nuclearint': 'France', 'Crownie': 'Slovenia', 'Labrov': '', 'Irrelevant': 'Germany', 'Markoon ': 'Netherlands', 'Sertuss': 'Germany', 'Exakick': 'France', 'Doss': 'Denmark', 'Szygenda': 'Denmark', 'Malrang': '', 'Larssen': 'Sweden', 'Comp': '', 'Trymbi': 'Poland', 'Odoamne': 'Romania', 'Xerxe': 'Romania', 'Vetheo': 'France', 'Patrik': 'Czechia', 'Targamas': 'Belgium'}

Ligues = {
    "LEC": ["Excel", "Fnatic", "Rogue", "G2 Esports", "Astralis", "MAD Lions", "SK Gaming", "Team BDS", "Misfits Gaming", "Team Vitality"],
    "LFL": ["Mirage Elyandra", "Team Oplon", "Karmine Corp", "LDLC OL", "Vitality.Bee", "Misfits Premier", "Team GO", "GameWard", "Team BDS Academy", "Solary"],
    "LCK": ["DRX", "DWG KIA", "Fredit BRION", "Gen.G", "Hanwha Life", "KT Rolster", "Kwangdong Freecs", "Liiv SANDBOX", "NS RedForce", "T1"]
}

Teams ={
    "Excel":"XL", 
    "Fnatic":"FNC", 
    "KOI":"KOI", 
    "G2 Esports":"G2",
    "Astralis":"AST",
    "MAD Lions":"MAD", 
    "SK Gaming":"SK", 
    "Team BDS":"BDS", 
    "Heretics":"HRT",
    "Team Vitality":'VIT',
    "Izidream":"IZI", 
    "BK ROG":"ROG", 
    "Karmine Corp":"KC",
    "LDLC OL":"LDLC", 
    "Vitality.Bee":"VITB", 
    "Aegis":"AEG", 
    "Team GO":"GO", 
    "GameWard":"GW", 
    "Team BDS Academy":"BDSA", 
    "Solary":"SLY"
}


def ligue(equipe):
    if equipe in Ligues['LEC']:
        return 'LEC'
    elif equipe in Ligues['LFL']:
        return 'LFL'
    elif equipe in Ligues['LCK']:
        return 'LCK'


def valid(data):
    leagueBool = data['team'] in Ligues['LEC'] or data['team'] in Ligues['LFL']
    roleBool = data['role'] in ['Top Laner',
                                'Jungler', 'Mid Laner', 'Bot Laner', 'Support']
    return roleBool and leagueBool

def getRoles(index):
    if index == 2:
        return 'Top Laner'
    elif index == 3:
        return 'Jungler'
    elif index == 4:
        return 'Mid Laner'
    elif index == 5:
        return 'Bot Laner'
    elif index == 6:
        return 'Support'


# Opening JSON file
with open('Compo LOL - LFL Spring 2023.csv',encoding='UTF8') as f:
    reader = csv.reader(f)
    
    output = {}

    for row in reader:
        for index in range(2,7):
            if row[index]!='':
                output[row[index]] = [row[index], nat[row[index]], row[1],
                                    row[0], getRoles(index)]


with open('filename.txt', encoding='utf8', mode='w+') as f:
    original_stdout = sys.stdout  # Save a reference to the original standard output
    sys.stdout = f  # Change the standard output to the file we created.
    print(output)
    sys.stdout = original_stdout  # Reset the standard output to its original value
