const Renderer = function (init: any) {
  const person = init.team;

  const renderKanye = function () {
    $(".quote-container").empty();
    const source = $("#kanye-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(person);
    $(".quote-container").append(newHTML);
  };
  renderKanye();
};

const Renderer2 = function (init: any) {
  const stat = init;

  const renderStat = function () {
    $(".quote-container2").empty();
    const source = $("#statistic-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(stat);
    $(".quote-container2").append(newHTML);
  };
  renderStat();
};
