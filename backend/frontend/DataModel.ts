class Statistic {
  games_played: string;
  minutes_per_game: string;
  field_goals_attempted_per_game: string;
  field_goals_made_per_game: string;
  field_goal_percentage: string;
  constructor() {
    this.games_played = "";
    this.minutes_per_game = "";
    this.field_goals_attempted_per_game = "";
    this.field_goals_made_per_game = "";
    this.field_goal_percentage = "";
  }
}
class Person {
  firstName: string;
  lastName: string;
  jersey: string;
  pos: string;
  picture: string;
  dateOfBirthUTC: string;
  personId: string;
  teamId: string;

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
  team: Person[];
  constructor(players: Person[]) {
    this.team = [];
  }
  async fetchTeam(
    team_name: string,
    year_playing: string,
    fillterBirthDay: boolean
  ) {
    await $.get(
      `http://localhost:4000/team?year=${year_playing}&team=${team_name}&fillterBirthDay=${fillterBirthDay}`
    ).then((p) => {
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
  }
}

let all_team = new Team();

async function creatAll(team: string, year: string, fillterBirthDay: boolean) {
  all_team = new Team();
  await all_team.fetchTeam(team, year, fillterBirthDay).then((x) => {});
  return all_team;
}

let dream_team = new Team();

async function addToDreamTeam(id: string) {
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
      } else {
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
}

async function removeFromDreamTeam(id: string) {
  $.ajax({
    url: "/dreamteam",
    type: "DELETE",
    data: JSON.stringify(id),
    success: function () {
      console.log("Player remove successfully");
    },
  });
}

async function GetDreamTeam() {
  let dreamTeamRespuns = await $.get(`http://localhost:4000/dreamteam`);
  let dreamTeam: Team = new Team();

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
}

let stat = new Statistic();

async function GetPlayerStatistic(first_name: string, last_name: string) {
  let dreamTeamRespuns = await $.get(
    `http://localhost:4000/player/statistic/${first_name}/${last_name}`
  );
  stat = new Statistic();
  stat.games_played = dreamTeamRespuns["games_played"];
  stat.minutes_per_game = dreamTeamRespuns["minutes_per_game"];
  stat.field_goals_attempted_per_game =
    dreamTeamRespuns["field_goals_attempted_per_game"];
  stat.field_goals_made_per_game =
    dreamTeamRespuns["field_goals_made_per_game"];
  stat.field_goal_percentage = dreamTeamRespuns["field_goal_percentage"];
  return stat;
}
