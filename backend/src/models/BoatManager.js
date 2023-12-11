const AbstractManager = require("./AbstractManager");

class BoatManager extends AbstractManager {
  constructor() {
    super({ table: "boat" });
  }

  async readAll(where) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await this.database.query(
      `select boat.id, boat.coord_x, boat.coord_y, boat.name, tile.type, tile.has_treasure
        from ${this.table}
        join tile on boat.coord_x=tile.coord_x and boat.coord_y=tile.coord_y
        where name=?`,
      [where.name]
    );

    // Return the array of boats
    return rows;
  }

  async update(boat) {
    const [result] = await this.database.query(
      `update ${this.table} set coord_x=?, coord_y=? where id=?`,
      [boat.coord_x, boat.coord_y, boat.id]
    );

    return result;
  }
}

module.exports = BoatManager;
