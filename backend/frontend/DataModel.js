"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Statistic {
    constructor() {
        this.games_played = "";
        this.minutes_per_game = "";
        this.field_goals_attempted_per_game = "";
        this.field_goals_made_per_game = "";
        this.field_goal_percentage = "";
    }
}
class Person {
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.jersey = "";
        this.pos = "";
        this.picture = "";
        this.dateOfBirthUTC = "";
        this.personId = "";
        this.teamId = "";
    }
}
class Team {
    constructor(players) {
        this.team = [];
    }
    fetchTeam(team_name, year_playing, fillterBirthDay) {
        return __awaiter(this, void 0, void 0, function* () {
            yield $.get(`http://localhost:4000/team?year=${year_playing}&team=${team_name}&fillterBirthDay=${fillterBirthDay}`).then((p) => {
                for (let i = 0; i < p.length; i++) {
                    let person = new Person();
                    person.firstName = p[i]["firstName"];
                    person.lastName = p[i]["lastName"];
                    person.personId = p[i]["personId"];
                    person.teamId = p[i]["teamId"];
                    person.jersey = p[i]["jersey"];
                    person.pos = p[i]["pos"];
                    person.dateOfBirthUTC = p[i]["dateOfBirthUTC"];
                    person.picture = p[i]["picture"];
                    this.team.push(person);
                }
            });
        });
    }
}
let all_team = new Team();
function creatAll(team, year, fillterBirthDay) {
    return __awaiter(this, void 0, void 0, function* () {
        all_team = new Team();
        yield all_team.fetchTeam(team, year, fillterBirthDay).then((x) => { });
        return all_team;
    });
}
let dream_team = new Team();
function addToDreamTeam(id) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const player of all_team.team) {
            if (id === player.personId) {
                let in_dream_team = false;
                for (const p of dream_team.team) {
                    if (p.personId === id) {
                        in_dream_team = true;
                    }
                }
                if (in_dream_team) {
                    console.log("Player is alrdy in the dream team");
                }
                else {
                    dream_team.team.push(player);
                    $.ajax({
                        url: "/dreamteam",
                        type: "POST",
                        data: JSON.stringify(player),
                        success: function () {
                            console.log("Player added successfully");
                        },
                    });
                }
            }
        }
    });
}
function removeFromDreamTeam(id) {
    return __awaiter(this, void 0, void 0, function* () {
        $.ajax({
            url: "/dreamteam",
            type: "DELETE",
            data: JSON.stringify(id),
            success: function () {
                console.log("Player remove successfully");
            },
        });
    });
}
function GetDreamTeam() {
    return __awaiter(this, void 0, void 0, function* () {
        let dreamTeamRespuns = yield $.get(`http://localhost:4000/dreamteam`);
        let dreamTeam = new Team();
        for (const player of dreamTeamRespuns) {
            let person = new Person();
            person.firstName = player.firstName;
            person.lastName = player.lastName;
            person.personId = player.personId;
            person.teamId = player.teamId;
            person.jersey = player.jersey;
            person.pos = player.pos;
            person.dateOfBirthUTC = player.dateOfBirthUTC;
            person.picture = player.picture;
            dreamTeam.team.push(person);
        }
        return dreamTeam;
    });
}
let stat = new Statistic();
function GetPlayerStatistic(first_name, last_name) {
    return __awaiter(this, void 0, void 0, function* () {
        let dreamTeamRespuns = yield $.get(`http://localhost:4000/player/statistic/${first_name}/${last_name}`);
        stat = new Statistic();
        stat.games_played = dreamTeamRespuns["games_played"];
        stat.minutes_per_game = dreamTeamRespuns["minutes_per_game"];
        stat.field_goals_attempted_per_game =
            dreamTeamRespuns["field_goals_attempted_per_game"];
        stat.field_goals_made_per_game =
            dreamTeamRespuns["field_goals_made_per_game"];
        stat.field_goal_percentage = dreamTeamRespuns["field_goal_percentage"];
        return stat;
    });
}
