const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await tables.boat.readAll(req.query);

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const { coord_x: coordX, coord_y: coordY } = req.body;
  try {
    // Fetch all boats from the database
    const result = await tables.boat.update(id, coordX, coordY);

    if (result.affectedRows !== 0) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browse,
  edit,
};
