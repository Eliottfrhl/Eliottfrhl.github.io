from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import urllib
import csv

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

    driver.close()
    

path = 'Compo LOL - LFL Spring 2023.csv'

Players = getPlayers(path)

scrapeImg(Players)