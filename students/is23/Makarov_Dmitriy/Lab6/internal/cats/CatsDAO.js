const { CatsRepository } = require("./CatsRepository");

class CatsDAO {
  static getAll() {
    return CatsRepository.read();
  }

  static getById(id) {
    const cats = CatsRepository.read();
    return cats.find((c) => c.id === id);
  }
}

module.exports = { CatsDAO };
