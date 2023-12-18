const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const boatControllers = require("./controllers/boatControllers");

router.get("/boats", boatControllers.browse);

const gameControllers = require("./controllers/gameControllers");

router.post("/games", gameControllers.add);

/* ************************************************************************* */

const tileControllers = require("./controllers/tileControllers");
const tileExists = require("./services/tileExists");

router.get("/tiles", tileControllers.browse);

router.put("/boats/:id", tileExists, boatControllers.edit);

/* ************************************************************************* */

module.exports = router;
