$(".generate-user").on("click", async function () {
  let team = $(".team").val();
  let year = $(".year").val();
  const fillterBirthDay: boolean = $(".accept").is(":checked");
  let init: Team = await creatAll(team, year, fillterBirthDay);
  Renderer(init);
});

$(".quote-container").on("click", ".add_dream_team", async function () {
  let id = $(this).closest(".card-body").attr("id");
  // $(this).remove();
  addToDreamTeam(id);
  // console.log("Hello");
});

$(".btn-dream-team").on("click", async function () {
  let dreamTeam = await GetDreamTeam();
  // console.log(dreamTeam);
  Renderer(dreamTeam);
});

$("body").on("click", ".remove-from-dream-team", function () {
  let id = $(this).closest(".card-body").attr("id");
  removeFromDreamTeam(id);
});

$(".submit-stat").on("click", async function () {
  console.log("hey");
  let firstName = $(".first-player-name").val();
  let lastName = $(".last-player-name").val();
  console.log(lastName, firstName);
  let init: Statistic = await GetPlayerStatistic(firstName, lastName);
  Renderer2(init);
});
