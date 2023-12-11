// Import required dependencies
const { app, request, tables } = require("./setup");

const tileExists = require("../src/services/tileExists");

describe("The tileExists middleware", () => {
  test("you added a readByCoordinates method in TileManager.js", async () => {
    expect(typeof tables.tile.readByCoordinates).toBe("function");
  });
  test("your readByCoordinates method in TileManager.js takes a 'coords' parameter", async () => {
    expect(tables.tile.readByCoordinates).toHaveLength(1);
  });
  test("you exported a middleware from tileExists.js", async () => {
    expect(typeof tileExists).toBe("function");
  });
  test("your tileExists middleware has 3 parameters: req, res and next", async () => {
    expect(tileExists).toHaveLength(3);
  });
  test("you used the tileExists middleware in the route PUT /api/boats/:id in router.js, and it is functional", async () => {
    const [flyingDutchman] = await tables.boat.readAll({
      name: "Flying Dutchman",
    });

    flyingDutchman.coord_x = 0;
    flyingDutchman.coord_y = 0;

    const response1 = await request(app)
      .put(`/api/boats/${flyingDutchman.id}`)
      .send(flyingDutchman);

    expect(response1.status).toBe(204);

    flyingDutchman.coord_x = 666;
    flyingDutchman.coord_y = 666;

    const response2 = await request(app)
      .put(`/api/boats/${flyingDutchman.id}`)
      .send(flyingDutchman);

    expect(response2.status).toBe(422);
  });
});
