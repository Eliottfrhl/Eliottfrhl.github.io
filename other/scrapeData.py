from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import urllib
import csv
from time import sleep

def getPlayers(path):
    output =[]
    Leagues = {
        'LFL':['BDSA','KC','SLY','VITB','AEG','GO','GW','ROG','IZI','LDLC']
    }
    with open(path, encoding='UTF8') as file:
        reader = csv.reader(file)
        
        for row in reader:
            for i in range(2,7):
                output.append({
                    'Name':row[i],
                    'Team':row[1],
                    'League':row[0]
                })
    return output
        
def scrapeNat(Players):

    driver = webdriver.Edge()
    output={}
    for player in Players:
        
        pseudo = player['Name']
        team = player['Team']
        league = player['League']
        if pseudo != '':
            try :
                driver.get('https://liquipedia.net/leagueoflegends/'+pseudo)

                Player = driver.find_element(By.XPATH,'//*[@id="mw-content-text"]/div/div[2]/div[1]/div[5]/div[2]/a')
                output[pseudo] = Player.text
            except :
                print("Nous n'avons pas pu récupéré la nationalité de :" + pseudo)
                output[pseudo] = ''
        sleep(0.5)
    driver.close()
    return output

def scrapeImg(Players):
    driver = webdriver.Edge()
    for player in Players:
        
        pseudo = player['Name']
        team = player['Team']
        league = player['League']
        if pseudo != '':
            try :
                driver.get('https://lol.fandom.com/wiki/'+pseudo)

                Player = driver.find_element(By.XPATH,"//*[@id='infoboxPlayer']/tbody/tr[3]/td/div/div/a/img")
                urllib.request.urlretrieve(Player.get_attribute('src'), "data/images/"+league+'/'+team+'/'+ pseudo+".png")
            except :
                print("Nous n'avons pas pu récupéré l'image de :" + pseudo)
        sleep(0.5)
    driver.close()
   
"""
driver=webdriver.Edge()
driver.get('https://lol.fandom.com/wiki/Hylissang')

Player = driver.find_element(By.XPATH,'//*[@id="mw-content-text"]/div/div[2]/div[1]/div[5]/div[2]/a')
print(Player.text)
   
"""
path = 'Compo LOL - LFL Spring 2023.csv'

Players = getPlayers(path)

nat = scrapeNat(Players)

print(nat)
