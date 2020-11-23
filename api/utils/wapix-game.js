class WapixGame {
    constructor() {
        this.wapix = '';
        this.date = Date();
        this.players = [];
        this.results = [];
        this.question = {};
    }

    getWapixId() {
        return this.wapix;
    }

    getWapixDate() {
        return this.date;
    }

    getPlayers() {
        return this.players;
    }

    getResults() {
        return this.results;
    }

    setWapixId(wapixId) {
        this.wapix = wapixId;
    }

    setWapixDate(date) {
        this.date = date;
    }

    fillbasicInfo(wapixInfo) {
        this.setWapixId(wapixInfo.wapixId);
    }

    newPlayer(username, hostId) {
        let player = {
            id = `${Date()}${Math.random() * 1000}`,
            username = username,
            hostId = hostId
        }
        return player;
    }

    addPlayer(player) {
        this.players.push(player);
    }
}