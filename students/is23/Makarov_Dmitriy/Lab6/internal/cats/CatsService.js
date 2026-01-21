const { CatsDAO } = require("./CatsDAO");

class CatsService {
  static getAll() {
    return CatsDAO.getAll();
  }

  static getById(id) {
    if (Number.isNaN(id)) {
      return { error: "id must be number" };
    }
    const cat = CatsDAO.getById(id);
    if (!cat) return { error: `cat with id ${id} not found` };
    return cat;
  }
}

module.exports = { CatsService };
