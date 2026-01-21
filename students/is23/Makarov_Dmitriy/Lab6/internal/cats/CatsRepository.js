const { DBConnector } = require("../../modules/DBConnector");

class CatsRepository {
  static db = new DBConnector("cats.json");

  static read() {
    const file = this.db.readFile();
    return JSON.parse(file);
  }

  static write(json) {
    this.db.writeFile(JSON.stringify(json, null, 2));
  }
}

module.exports = { CatsRepository };
