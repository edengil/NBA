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
$(".generate-user").on("click", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let team = $(".team").val();
        let year = $(".year").val();
        const fillterBirthDay = $(".accept").is(":checked");
        let init = yield creatAll(team, year, fillterBirthDay);
        Renderer(init);
    });
});
$(".quote-container").on("click", ".add_dream_team", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let id = $(this).closest(".card-body").attr("id");
        // $(this).remove();
        addToDreamTeam(id);
        // console.log("Hello");
    });
});
$(".btn-dream-team").on("click", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let dreamTeam = yield GetDreamTeam();
        // console.log(dreamTeam);
        Renderer(dreamTeam);
    });
});
$("body").on("click", ".remove-from-dream-team", function () {
    let id = $(this).closest(".card-body").attr("id");
    removeFromDreamTeam(id);
});
$(".submit-stat").on("click", function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("hey");
        let firstName = $(".first-player-name").val();
        let lastName = $(".last-player-name").val();
        console.log(lastName, firstName);
        let init = yield GetPlayerStatistic(firstName, lastName);
        Renderer2(init);
    });
});
