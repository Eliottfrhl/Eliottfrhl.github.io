import sqlite3
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from time import sleep

def CreateTable(Name):
    conn = sqlite3.connect('data\data.db')
    
    conn.execute(f'''CREATE TABLE {Name} (
    "ID" INTEGER NOT NULL UNIQUE,
    "PSEUDO" TEXT NOT NULL UNIQUE,
    "TEAM" TEXT,
    "ROLE" TEXT,
    "NATIONALITY" TEXT,
    PRIMARY KEY("ID" AUTOINCREMENT));''')
    
    conn.close()

def getCardDB(page):
    driver = webdriver.Edge()
    driver.get(page)
    card = 1
    bool= True
    while bool:
        try :
            driver.find_element(By.XPATH,f'//*[@class="cargoTable sortable jquery-tablesorter"]/tbody/tr[{card}]')
            card+=1
        except :
            return card

def getPlayers(page, card):
    failure = 0
    driver = webdriver.Edge()
    output={}

    driver.get(page)
    sleep(1)
    for i in range(1,card +1):
        try :
            player = driver.find_element(By.XPATH,f'//*[@class="cargoTable sortable jquery-tablesorter"]/tbody/tr[{i}]/td[3]/a').get_attribute("title")
            output[player]=[player]
            
            team = driver.find_element(By.XPATH,f'//*[@class="cargoTable sortable jquery-tablesorter"]/tbody/tr[{i}]/td[1]/span/a[1]').get_attribute("title")
            output[player].append(team)
            
            role = driver.find_element(By.XPATH,f'//*[@class="cargoTable sortable jquery-tablesorter"]/tbody/tr[{i}]/td[2]/span').get_attribute("title")
            output[player].append(role)
            
            nationality = driver.find_element(By.XPATH,f'//*[@class="cargoTable sortable jquery-tablesorter"]/tbody/tr[{i}]/td[3]/span').get_attribute("title")
            output[player].append(nationality)
            
        except :
            failure += 1


    driver.close()
    print(str(failure) + " profils manquants.")
    return output

def addToDB(output, Name):
    conn = sqlite3.connect('data\data.db')
    
    for player in output:
        if output[player][2] in ['Top Laner','Jungler','Mid Laner','Bot Laner','Support']:
            conn.execute(f'''INSERT INTO {Name} (PSEUDO,TEAM,ROLE,NATIONALITY) VALUES ("{output[player][0]}","{output[player][1]}","{output[player][2]}","{output[player][3]}")''')
    conn.commit()
    conn.close()

def main(page, Name):
    print(f'Creating the {Name} Table if not yet done...')
    try :
        CreateTable(Name)
    except :
        pass
    print('Getting number of profils to extract...')   
    card = getCardDB(page)
    print('Extracting profils...')
    output = getPlayers(page,card)
    print('Adding the players to the database...')
    addToDB(output, Name)
    print('Done !')


# Ex. https://lol.fandom.com/wiki/Special:RunQuery/TournamentPlayerInformation?TPI%5Bpage%5D=LFL%2F2022+Season%2FSummer+Season&_run=
page = 'https://lol.fandom.com/wiki/Special:RunQuery/TournamentPlayerInformation?TPI%5Bpage%5D=LCK%2F2022+Season%2FSummer+Season&_run=&pfRunQueryFormName=TournamentPlayerInformation&wpRunQuery=&pf_free_text='
# Ex. LFL_Summer_2022
Name = 'LCK_Summer_2022'

main(page,Name)

