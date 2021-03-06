const Scoreboard = require("./scoreboard.js");
const BEGINNING_SEARCH_YEAR = require("../commands/cutoff").BEGINNING_SEARCH_YEAR;
const DEFAULT_LIMIT = require("../commands/limit").DEFAULT_LIMIT;
const GENDER = require("../commands/gender").GENDER;
const DEFAULT_OPTIONS = { beginningYear: BEGINNING_SEARCH_YEAR, gender: [GENDER.FEMALE], limit: DEFAULT_LIMIT };
const { getUserIdentifier, areUserAndBotInSameVoiceChannel } = require("../helpers/utils.js");
module.exports = class GameSession {

    constructor() {
        this._song = null;
        this._artist = null;
        this._link = null;
        this._inSession = false;
        this._gameOptions = DEFAULT_OPTIONS;
        this._skippers = new Set();
        this.scoreboard = new Scoreboard();
    }

    startRound(song, artist, link) {
        this._song = song;
        this._artist = artist;
        this._link = link;
        this._inSession = true;
    }

    endRound() {
        this._song = null;
        this._artist = null;
        this._link = null;
        this._inSession = false;
        this._skippers.clear();
    }

    endGame() {
        this.endRound();
        this.scoreboard = new Scoreboard();
    }

    getSong() {
        return this._song;
    }

    getArtist() {
        return this._artist;
    }

    getLink() {
        return this._link;
    }

    gameInSession() {
        return this._inSession;
    }

    setLimit(limit) {
        this._gameOptions.limit = limit;
    }

    resetLimit() {
        this._gameOptions.limit = DEFAULT_LIMIT;
    }

    getLimit() {
        return this._gameOptions.limit;
    }
    setBeginningCutoffYear(year) {
        this._gameOptions.beginningYear = year;
    }

    resetBeginningCutoffYear() {
        this._gameOptions.beginningYear = BEGINNING_SEARCH_YEAR;
    }

    getBeginningCutoffYear() {
        return this._gameOptions.beginningYear;
    }

    getDefaultBeginningCutoffYear() {
        return BEGINNING_SEARCH_YEAR;
    }

    resetGender() {
        this._gameOptions.gender = [GENDER.FEMALE];
    }

    setGender(genderArr) {
        let tempArr = genderArr.map(gender => gender.toLowerCase());
        this._gameOptions.gender = [...new Set(tempArr)];
        return this._gameOptions.gender;
    }

    getSQLGender() {
        return this._gameOptions.gender.join(",");
    }

    userSkipped(user) {
        this._skippers.add(user);
    }

    getNumSkippers() {
        return this._skippers.size;
    }
};
