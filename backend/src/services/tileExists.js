const tables = require("../tables");

const tileExists = async (req, res, next) => {
  try {
    const rows = await tables.tile.readByCoordinates(req.body);
    if (rows.length !== 0) {
      next();
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = tileExists;
