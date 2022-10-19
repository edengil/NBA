from consts import teams_id, statistic_key
import re
from fastapi.responses import FileResponse
from fastapi import FastAPI, Request
import uvicorn
import requests

from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


app = FastAPI()
dream_team = []


def fix_str(str):
    str = re.sub(r"(\w)([A-Z])", r"\1_\2", str)
    str = str.lower()
    return str


app.mount("/frontend", StaticFiles(directory="backend/frontend"), name="frontend")


@app.get("/")
async def get_client():
    return FileResponse('backend\\frontend\index.html')


def get_plyers_year_and_team(year, team, fillterBirthDay):
    year_cheack = int(year)
    if (year_cheack < 2012):
        print("The first year you can search is 2012")
        return None
    # get the team spicle code
    num_team_id = teams_id[team]
    res = requests.get(f'http://data.nba.net/10s/prod/v1/{year}/players.json')
    all_league = (res.json())["league"]
    standard_league = all_league["standard"]

    all_team_plyaers = [
        player for player in standard_league if player["teamId"] == num_team_id]
    all_team_plyaers = filter_daybirth(all_team_plyaers, fillterBirthDay)

    for player in all_team_plyaers:
        first_name = fix_str(player["firstName"])
        last_name = fix_str(player["lastName"])
        player["picture"] = f"http://nba-players.herokuapp.com/players/{last_name}/{first_name}"
    return all_team_plyaers


def filter_daybirth(players, fillterBirthDay):
    asBirthday = False
    if fillterBirthDay == "false":
        asBirthday = False
    elif fillterBirthDay == "true":
        asBirthday = True
    if asBirthday:
        return [player for player in players if not (player["dateOfBirthUTC"] == "")]
    else:
        return players


@app.get("/team")
async def query_params(year, team, fillterBirthDay=False):
    return get_plyers_year_and_team(year, team, fillterBirthDay)


@app.post("/dreamteam")
async def add_to_dreamTeam(playerRequest: Request):
    player = await playerRequest.json()
    dream_team.append(player)
    return


@app.get('/dreamteam')
def get_dream_team():
    return dream_team


@app.delete('/dreamteam')
async def remove_player_from_dreamteam(request: Request):
    id_to_remove = await request.json()
    print(id_to_remove)
    global dream_team

    dream_team = [p for p in dream_team if p["personId"] != id_to_remove]
    # return dream_team
    return "Remove"


@app.get('/player/statistic/{first_name}/{last_name}')
async def get_player_statistic(first_name, last_name):
    return await get_statistic(first_name, last_name)


async def get_statistic(first_name, last_name):
    statistic = requests.get(
        f'https://nba-players.herokuapp.com/players-stats/{last_name}/{first_name}')
    statistic = statistic.json()
    return {key: val for key, val in statistic.items() if key in statistic_key}

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=4000, reload=True)
