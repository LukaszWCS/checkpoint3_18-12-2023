// Import required dependencies
const { app, request, tables } = require("./setup");

const boatControllers = require("../src/controllers/boatControllers");

describe("PUT /api/boats/:id", () => {
  test("you added an update method in BoatManager.js", async () => {
    expect(typeof tables.boat.update).toBe("function");
  });
  test("your update method in BoatManager.js takes a 'boat' parameter", async () => {
    expect(tables.boat.update).toHaveLength(1);
  });
  test("your update method in BoatManager.js performs the SQL request 'update boat set coord_x=???, coord_y=??? where id=???'", async () => {
    const [flyingDutchman] = await tables.boat.readAll({
      name: "Flying Dutchman",
    });

    flyingDutchman.coord_x = 2;
    flyingDutchman.coord_y = 2;

    const result = await tables.boat.update(flyingDutchman);

    expect(result.affectedRows).toBe(1);

    const [updatedFlyingDutchman] = await tables.boat.readAll({
      name: "Flying Dutchman",
    });

    expect(updatedFlyingDutchman.coord_x).toBe(2);
    expect(updatedFlyingDutchman.coord_y).toBe(2);
  });
  test("you declared and exported an edit function from boatControllers.js", async () => {
    expect(typeof boatControllers.edit).toBe("function");
  });
  test("your edit function has 3 parameters: req, res and next", async () => {
    expect(boatControllers.edit).toHaveLength(3);
  });
  test("you declared the route PUT /api/boats/:id in router.js, and it is functional", async () => {
    const [flyingDutchman] = await tables.boat.readAll({
      name: "Flying Dutchman",
    });

    flyingDutchman.coord_x = 3;
    flyingDutchman.coord_y = 3;

    const response = await request(app)
      .put(`/api/boats/${flyingDutchman.id}`)
      .send(flyingDutchman);

    expect(response.status).toBe(204);

    const [updatedFlyingDutchman] = await tables.boat.readAll({
      name: "Flying Dutchman",
    });

    expect(updatedFlyingDutchman.coord_x).toBe(3);
    expect(updatedFlyingDutchman.coord_y).toBe(3);
  });
});
