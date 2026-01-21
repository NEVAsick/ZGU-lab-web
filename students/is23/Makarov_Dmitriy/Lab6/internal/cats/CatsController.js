const { CatsService } = require("./CatsService");

class CatsController {
  static getCats(req, res) {
    const cats = CatsService.getAll();
    res.json(cats);
  }

  static getCatById(req, res) {
    const id = Number.parseInt(req.params.id);

    const result = CatsService.getById(id);

    if (result && result.error) {
      if (result.error.includes("number")) {
        res.status(400).json({ status: "Bad Request", message: result.error });
      } else {
        res.status(404).json({ status: "Not Found", message: result.error });
      }
      return;
    }

    res.json(result);
  }
}

module.exports = { CatsController };
