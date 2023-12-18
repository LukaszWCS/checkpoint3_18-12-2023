const tables = require("../tables");

const tileExists = async (req, res, next) => {
  const { coord_x: coordX, coord_y: coordY } = req.body;
  try {
    const tiles = await tables.tile.readByCoordinates(coordX, coordY);

    if (tiles.length > 0) next();
    else res.sendStatus(422);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = tileExists;
