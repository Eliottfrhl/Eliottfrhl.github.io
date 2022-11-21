import sqlite3
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from time import sleep

def getPlayers():
    conn = sqlite3.connect("data\data.db")
    output =[]
    cursor = conn.execute("SELECT * FROM PLAYERS")
    
    for row in cursor:
        output.append(row[1])
    
    cursor.close()
    
    return output

def newInfo(Players):
    driver = webdriver.Edge()
    output={}
    for player in Players:
        if player != '':
                driver.get('https://lol.fandom.com/wiki/'+player)
                output[player]=[player]
                try :
                    Team = driver.find_element(By.XPATH,'//*[@class="catlink-teams tWACM tWAFM tWAN to_hasTooltip"]')
                    output[player].append(Team.text)
                except:
                    print(player + " doesn't have a team")
                    output[player].append('')
                try :
                    Nationality = driver.find_element(By.XPATH,'//*[@class="markup-object country-object"]/span[1]')
                    output[player].append(Nationality.get_attribute("title"))
                except :
                    print(player + " doesn't have a country of birth")
                    output[player].append('')
                try :
                    Role = driver.find_element(By.XPATH,'//*[@class="sprite role-sprite" and ../@class="markup-object"]')
                    output[player].append(Role.get_attribute("title"))
                except :
                    print(player + " doesn't have a role")
                    output[player].append('')
        sleep(0.5)
    driver.close()
    return output

def updatePlayers(Info):
    conn = sqlite3.connect("data\data.db")
    for player in Info:
        conn.execute(f"UPDATE PLAYERS SET TEAM = '{Info[player][1]}', ROLE= '{Info[player][3]}', NATIONALITY= '{Info[player][2]}' WHERE PSEUDO = '{Info[player][0]}';")
    
    conn.commit()
    
    conn.close()


Players = getPlayers()

Info = newInfo(Players)

updatePlayers(Info)