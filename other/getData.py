import json
import sys
Ligues = {
    "LEC": ["Excel", "Fnatic", "Rogue", "G2 Esports", "Astralis", "MAD Lions", "SK Gaming", "Team BDS", "Misfits Gaming", "Team Vitality"],
    "LFL": ["Mirage Elyandra", "Team Oplon", "Karmine Corp", "LDLC OL", "Vitality.Bee", "Misfits Premier", "Team GO", "GameWard", "Team BDS Academy", "Solary"],
    "LCK": ["DRX", "DWG KIA", "Fredit BRION", "Gen.G", "Hanwha Life", "KT Rolster", "Kwangdong Freecs", "Liiv SANDBOX", "NS RedForce", "T1"]
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


# Opening JSON file
f = open('data\players.json', encoding="utf8")
output = {}

data = json.load(f)

for i in data:
    if valid(i):
        output[i['name']] = [i['name'], i['country'], i['team'],
                             ligue(i['team']), i['role']]

f.close()

with open('filename.txt', encoding='utf8', mode='w+') as f:
    original_stdout = sys.stdout  # Save a reference to the original standard output
    sys.stdout = f  # Change the standard output to the file we created.
    print(output)
    sys.stdout = original_stdout  # Reset the standard output to its original value
